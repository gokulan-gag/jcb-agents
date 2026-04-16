import { Sparkles } from "lucide-react";

const InitialContainer = ({
  setInput,
  questions,
}: {
  setInput: React.Dispatch<React.SetStateAction<string>>;
  questions: string[];
}) => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center space-y-6 max-w-md">
        <div className="bg-gradient-to-br from-primary to-secondary p-6 rounded-3xl shadow-2xl mx-auto w-24 h-24 flex items-center justify-center">
          <Sparkles className="text-white" size={48} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Hi, How can I help you today?
          </h2>
          <p className="text-gray-500">
            Start a conversation by typing a message below
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 mt-8">
          {questions.map((prompt, i) => (
            <button
              key={i}
              onClick={() => setInput(prompt)}
              className="cursor-pointer px-4 py-3 bg-white/80 backdrop-blur rounded-xl border border-gray-200 hover:border-secondary hover:shadow-md transition-all text-sm text-gray-700 text-left"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InitialContainer;
