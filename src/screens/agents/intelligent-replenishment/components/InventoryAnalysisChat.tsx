"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { ulid } from "ulid";
import { extractHtmlBlocksFromText } from "@/utils/common";
import type { Message } from "@/types/chat";
import MessagesList from "@/components/shared/MessagesList";
import StreamingMessage from "@/components/shared/StreamingMessage";
import InputContainer from "@/components/shared/InputContainer";
import InitialContainer from "@/components/shared/InitialContainer";
import BotLoader from "@/components/shared/BotLoader";
import ChartWithIframe from "@/components/shared/Chart";
import { Group, Panel, Separator } from "react-resizable-panels";

interface StreamResponse {
  type: string;
  content?: string;
}

export default function InventoryAnalysisChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [streamingMessage, setStreamingMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null); // Add ref for messages container
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [sessionId, setSessionId] = useState<string>();

  const [htmlContent, setHtmlContent] = useState<string>("");
  const [selectedHtmlId, setSelectedHtmlId] = useState<string>("");
  const [streamingHtmlBlocks, setStreamingHtmlBlocks] = useState<
    { id: string; content: string; isTrailing: boolean }[]
  >([]);

  const [url, setURL] = useState<string>("/api/chat");

  // Auto-scroll state management
  const [autoScrollEnabled, setAutoScrollEnabled] = useState<boolean>(true);

  useEffect(() => {
    setSessionId(ulid());
  }, []);

  const scrollToBottom = useCallback((): void => {
    if (autoScrollEnabled && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [autoScrollEnabled]);

  // Handle scroll events to detect when user scrolls up
  const handleScroll = useCallback(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 10; // 10px threshold

    if (isAtBottom) {
      // User is at bottom, re-enable auto-scroll
      setAutoScrollEnabled(true);
    } else if (scrollTop > 0) {
      // User has scrolled up, disable auto-scroll
      setAutoScrollEnabled(false);
    }
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    // scrollToBottom();
  }, [messages, streamingMessage, scrollToBottom]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    if (!input) {
      el.style.height = "48px";
      return;
    }
    el.style.height = "1px";
    el.style.height = Math.min(el.scrollHeight, 200) + "px";
  }, [input]);

  // Function to handle HTML block selection
  const handleHtmlBlockSelect = (htmlId: string, htmlContent: string) => {
    setSelectedHtmlId(htmlId);
    setHtmlContent(htmlContent);
  };

  const handleSubmit = async (): Promise<void> => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsLoading(true);
    setStreamingMessage("");
    setHtmlContent(""); // Clear previous HTML content
    setSelectedHtmlId("");
    setStreamingHtmlBlocks([]);

    // Re-enable auto-scroll when starting a new chat
    setAutoScrollEnabled(true);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "text/event-stream",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId: sessionId,
          content: currentInput,
        }),
      });

      if (!response.body) {
        throw new Error("No response body — streaming not supported.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          console.log("Stream finished.");
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.trim()) continue;

          try {
            const json: StreamResponse = JSON.parse(line);
            if (json.type === "item" && json.content) {
              fullText += json.content;

              // Extract HTML blocks and text content in real-time
              const { htmlBlocks, textContent } =
                extractHtmlBlocksFromText(fullText);

              setStreamingMessage(textContent);
              setStreamingHtmlBlocks(htmlBlocks);

              // Set first HTML block as default if available and none selected
              const firstTrailing = htmlBlocks.find((b) => b.isTrailing);
              if (firstTrailing && !selectedHtmlId) {
                setHtmlContent(firstTrailing.content);
                setSelectedHtmlId(firstTrailing.id);
              }
            }
          } catch (err) {
            console.error("Failed to parse line:", line, err);
          }
        }
      }

      if (fullText) {
        // Final extraction to ensure we have all content
        const { htmlBlocks: finalHtmlBlocks, textContent } =
          extractHtmlBlocksFromText(fullText);

        const assistantMessage: Message = {
          role: "assistant",
          content: textContent,
          htmlBlocks: finalHtmlBlocks,
        };

        // Set the first trailing HTML block for the right panel, or clear if none
        const firstTrailing = finalHtmlBlocks.find((b) => b.isTrailing);
        if (firstTrailing) {
          setHtmlContent(firstTrailing.content);
          setSelectedHtmlId(firstTrailing.id);
        } else {
          setHtmlContent("");
          setSelectedHtmlId("");
        }

        setMessages((prev) => [...prev, assistantMessage]);
      }
      setStreamingMessage("");
      setStreamingHtmlBlocks([]);
    } catch (error) {
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, there was an error processing your request.",
      };
      setMessages((prev) => [...prev, errorMessage]);
      console.error("Error:", error);
      setStreamingMessage("");
      setStreamingHtmlBlocks([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  console.log(messages);

  return (
    <>
      {/* Messages Container */}
      <Group orientation="horizontal" className="flex-1 w-full overflow-hidden">
        <Panel defaultSize={htmlContent ? 50 : 100} minSize={30}>
          <div className="flex flex-col h-full py-8 overflow-hidden">
            {messages.length === 0 && !streamingMessage ? (
              <InitialContainer
                setInput={setInput}
                questions={
                  [
                    // "Can you show me all products where we're carrying more inventory than needed to cover lead time plus 60 extra days of upcoming demand",
                    // "Show me the top 5 SKUs that need replenishment today",
                  ]
                }
              />
            ) : (
              <div
                ref={messagesContainerRef}
                className="flex-1 px-4 overflow-y-auto"
                onScroll={handleScroll}
              >
                <div className="max-w-7xl mx-auto space-y-6">
                  <MessagesList
                    messages={messages}
                    selectedHtmlId={selectedHtmlId}
                    onHtmlBlockSelect={handleHtmlBlockSelect}
                  />

                  {streamingMessage && (
                    <StreamingMessage
                      streamingMessage={streamingMessage}
                      htmlBlocks={streamingHtmlBlocks}
                      selectedHtmlId={selectedHtmlId}
                      onHtmlBlockSelect={handleHtmlBlockSelect}
                    />
                  )}

                  {isLoading && !streamingMessage && <BotLoader />}

                  <div ref={messagesEndRef} />
                </div>
              </div>
            )}

            {/* Input Container */}
            <div className="shrink-0 px-4 bg-white/50 backdrop-blur-lg border-t border-gray-200/50 pt-6">
              <InputContainer
                handleSubmit={handleSubmit}
                textareaRef={textareaRef}
                input={input}
                setInput={setInput}
                handleKeyDown={handleKeyDown}
                isLoading={isLoading}
              />
            </div>
          </div>
        </Panel>

        {htmlContent && (
          <>
            <Separator className="relative w-4 bg-transparent cursor-col-resize flex items-center justify-center group/sep">
              {/* Gradient divider line */}
              <div className="absolute w-px h-full bg-linear-to-b from-transparent via-gray-200 to-transparent group-hover/sep:via-primary transition-all duration-300" />
              {/* Drag handle pill */}
              <div className="relative z-10 flex flex-col gap-[4px] items-center py-2.5 px-1.5 rounded-full bg-white border border-gray-200 shadow-sm group-hover/sep:shadow-md group-hover/sep:border-primary group-hover/sep:bg-primary/10 transition-all duration-300">
                <div className="flex gap-[4px]">
                  <div className="w-[3px] h-[3px] rounded-full bg-gray-300 group-hover/sep:bg-primary transition-colors duration-300" />
                  <div className="w-[3px] h-[3px] rounded-full bg-gray-300 group-hover/sep:bg-primary transition-colors duration-300" />
                </div>
                <div className="flex gap-[4px]">
                  <div className="w-[3px] h-[3px] rounded-full bg-gray-300 group-hover/sep:bg-primary transition-colors duration-300" />
                  <div className="w-[3px] h-[3px] rounded-full bg-gray-300 group-hover/sep:bg-primary transition-colors duration-300" />
                </div>
                <div className="flex gap-[4px]">
                  <div className="w-[3px] h-[3px] rounded-full bg-gray-300 group-hover/sep:bg-primary transition-colors duration-300" />
                  <div className="w-[3px] h-[3px] rounded-full bg-gray-300 group-hover/sep:bg-primary transition-colors duration-300" />
                </div>
              </div>
            </Separator>
            <Panel defaultSize={50} minSize={20}>
              <div className="h-full">
                <ChartWithIframe html={htmlContent} />
              </div>
            </Panel>
          </>
        )}
      </Group>

      <button
        className="opacity-0"
        onClick={async () => {
          console.log("URL changed...");

          try {
            await navigator.clipboard.writeText(
              "Show me the top 5 SKUs that need replenishment today.",
            );
          } catch (err) {
            console.error("Failed to copy: ", err);
          }

          setURL("http://localhost:5678/webhook/replenishment");
        }}
      >
        Notification
      </button>
    </>
  );
}
