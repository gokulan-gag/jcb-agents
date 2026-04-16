import { Bot } from "lucide-react";

const BotLoader = () => {
  return (
    <>
      <div className="flex gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
          <Bot className="text-white" size={20} />
        </div>
        <div className="bg-white/80 backdrop-blur text-gray-800 border border-gray-100 rounded-2xl px-5 py-3 shadow-md">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-2 h-2 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BotLoader;
