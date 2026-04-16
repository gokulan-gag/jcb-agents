import type { Message } from "@/types/chat";
import { Bot, User } from "lucide-react";
import HtmlBlockRenderer from "./HTMLBlockRenderer";
import ChartWithIframe from "./Chart";
import { MarkdownRenderer } from "./MarkdownComponents";

interface MessagesListProps {
  messages: Message[];
  selectedHtmlId?: string;
  onHtmlBlockSelect?: (id: string, content: string) => void;
}

function renderContentWithInlineHtml(
  content: string,
  htmlBlocks: {
    id: string;
    content: string;
    isTrailing?: boolean;
    isHtmlOnly?: boolean;
  }[],
) {
  const blockMap = new Map(htmlBlocks.map((b) => [b.id, b]));

  // Split on placeholders like [VISUAL_CHART_ABC123]
  const parts = content.split(/(\[VISUAL_CHART_[A-Z0-9]+\])/);

  return parts.map((part, i) => {
    const placeholderMatch = part.match(/^\[VISUAL_CHART_([A-Z0-9]+)\]$/);
    if (placeholderMatch) {
      const id = placeholderMatch[1];
      const block = blockMap.get(id);
      if (block && !block.isTrailing) {
        if (block.isHtmlOnly) {
          // Auto-size to content — no fixed height, no inner scroll
          return (
            <div key={i} className="w-full overflow-hidden rounded-xl">
              <ChartWithIframe html={block.content} autoHeight />
            </div>
          );
        }
        // Regular inline chart — fixed height
        return (
          <div
            key={i}
            className="my-4 w-full rounded-xl overflow-hidden border border-gray-200 shadow-sm"
            style={{ height: "400px" }}
          >
            <ChartWithIframe html={block.content} />
          </div>
        );
      }
      // Trailing blocks go to the right panel — skip placeholder
      return null;
    }
    if (part.trim()) {
      return <MarkdownRenderer key={i}>{part}</MarkdownRenderer>;
    }
    return null;
  });
}

const MessagesList = ({
  messages,
  selectedHtmlId,
  onHtmlBlockSelect,
}: MessagesListProps) => {
  return (
    <>
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex gap-4 ${
            message.role === "user" ? "flex-row-reverse" : "flex-row"
          }`}
        >
          <div
            className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg bg-linear-to-br from-primary to-secondary`}
          >
            {message.role === "user" ? (
              <User className="text-white" size={20} />
            ) : (
              <Bot className="text-white" size={20} />
            )}
          </div>
          <div
            className={`flex-1 min-w-0 ${
              message.role === "user" ? "flex justify-end" : ""
            }`}
          >
            <div
              className={`min-w-0 max-w-[85%] rounded-2xl px-5 py-3 shadow-md bg-white/80 backdrop-blur text-gray-800 border border-gray-100 overflow-hidden`}
            >
              <div className="**:wrap-break-word [&_*]:overflow-wrap-anywhere">
                {message.role === "user" ? (
                  <span>{message.content}</span>
                ) : message.role === "assistant" && message.htmlBlocks?.length ? (
                  renderContentWithInlineHtml(
                    message.content,
                    message.htmlBlocks,
                  )
                ) : (
                  <MarkdownRenderer>
                    {message.content.replace(/\[VISUAL_CHART_[A-Z0-9]+\]/g, "")}
                  </MarkdownRenderer>
                )}
              </div>

              {/* Render HTML block buttons for assistant messages with multiple blocks */}
              {message.role === "assistant" &&
                message.htmlBlocks &&
                onHtmlBlockSelect && (
                  <HtmlBlockRenderer
                    htmlBlocks={message.htmlBlocks}
                    selectedHtmlId={selectedHtmlId || ""}
                    onHtmlBlockSelect={onHtmlBlockSelect}
                  />
                )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default MessagesList;
