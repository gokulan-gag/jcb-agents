import { Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import HtmlBlockRenderer from "./HTMLBlockRenderer";

interface StreamingMessageProps {
  streamingMessage: string;
  htmlBlocks?: { id: string; content: string }[];
  selectedHtmlId?: string;
  onHtmlBlockSelect?: (id: string, content: string) => void;
}

const StreamingMessage = ({
  streamingMessage,
  htmlBlocks,
  selectedHtmlId,
  onHtmlBlockSelect,
}: StreamingMessageProps) => {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
        <Bot className="text-white" size={20} />
      </div>
      <div className="flex-1">
        <div className="inline-block max-w-[85%] rounded-2xl px-5 py-3 bg-white/80 backdrop-blur text-gray-800 border border-gray-100 shadow-md">
          <div className="prose min-w-[85%]">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {streamingMessage}
            </ReactMarkdown>
          </div>

          {/* Render HTML block buttons for streaming messages */}
          {htmlBlocks && onHtmlBlockSelect && (
            <HtmlBlockRenderer
              htmlBlocks={htmlBlocks}
              selectedHtmlId={selectedHtmlId || ""}
              onHtmlBlockSelect={onHtmlBlockSelect}
            />
          )}

          <span className="inline-block w-2 h-5 bg-secondary ml-1 animate-pulse"></span>
        </div>
      </div>
    </div>
  );
};

export default StreamingMessage;
