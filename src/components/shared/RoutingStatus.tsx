import { Bot, Check } from "lucide-react";

export interface RoutingAgent {
  name: string;
  done: boolean;
}

interface RoutingStatusProps {
  agents: RoutingAgent[];
}

const RoutingStatus = ({ agents }: RoutingStatusProps) => {
  return (
    <div className="flex gap-4">
      <div className="shrink-0 w-10 h-10 rounded-xl bg-linear-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
        <Bot className="text-white" size={20} />
      </div>
      <div className="bg-white/80 backdrop-blur border border-gray-100 rounded-2xl px-5 py-4 shadow-md">
        <div className="flex flex-col gap-3">
          {agents.map((agent, i) => (
            <div key={i} className="flex items-center gap-3">
              {agent.done ? (
                <Check size={16} strokeWidth={2.5} className="text-gray-400 shrink-0" />
              ) : (
                <div className="w-4 h-4 rounded-full border-2 border-gray-300 border-t-primary animate-spin shrink-0" />
              )}
              <span
                className={
                  agent.done
                    ? "text-sm text-gray-500"
                    : "text-sm text-gray-800 font-semibold"
                }
              >
                {agent.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoutingStatus;
