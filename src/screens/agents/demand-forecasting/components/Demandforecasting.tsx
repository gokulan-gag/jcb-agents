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
import { triggerProjectNotifications } from "@/utils/toast";

interface StreamResponse {
  type: string;
  content?: string;
}

export default function DemandForecastingChat() {
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
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
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
      const response = await fetch("/api/chat", {
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

  return (
    <>
      {/* Messages Container */}
      <div className="flex-1 w-[100%] overflow-hidden flex items-start justify-start">
        <div className={`flex flex-col  h-[100%] flex-1 py-8`}>
          {messages.length === 0 && !streamingMessage ? (
            <InitialContainer
              setInput={setInput}
              questions={
                [
                  // "For the dealer N&S Tractor give me the forecast for series SA2 for the next 6 months",
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
          <div className="px-4 bg-white/50 backdrop-blur-lg border-t border-gray-200/50 pt-6">
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

        {htmlContent && (
          <div className="h-[100%] w-[40%] border-l-2 border-gray-200/50">
            <ChartWithIframe html={htmlContent} />
          </div>
        )}
      </div>

      <button className="opacity-0" onClick={triggerProjectNotifications}>
        Notification
      </button>
    </>
  );
}
