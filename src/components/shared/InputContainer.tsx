import { Send } from "lucide-react";

const InputContainer = ({
  textareaRef,
  input,
  setInput,
  handleKeyDown,
  isLoading,
  handleSubmit,
}: {
  textareaRef: React.Ref<HTMLTextAreaElement>;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  isLoading: boolean;
  handleSubmit: () => Promise<void>;
}) => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-end gap-3 bg-white rounded-2xl shadow-lg border border-gray-200 p-2">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-1 px-4 py-3 bg-transparent focus:outline-none resize-none text-gray-800 placeholder-gray-400"
          rows={1}
          style={{ maxHeight: "200px", height: "48px" }}
          disabled={isLoading}
        />
        <button
          onClick={handleSubmit}
          disabled={!input.trim() || isLoading}
          className="cursor-pointer bg-gradient-to-br from-primary to-secondary text-white p-3 rounded-xl hover:from-primary hover:to-secondary disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl disabled:shadow-none flex-shrink-0"
        >
          <Send size={20} />
        </button>
      </div>
      <p className="text-xs text-gray-500 text-center mt-3">
        Press Enter to send, Shift+Enter for new line
      </p>
    </div>
  );
};

export default InputContainer;
