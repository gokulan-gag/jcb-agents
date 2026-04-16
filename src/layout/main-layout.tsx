import { useGlobal } from "@/hooks";
import {
  Boxes,
  Building2,
  ChartSpline,
  ClipboardListIcon,
  Lightbulb,
  MonitorCog,
} from "lucide-react";
import SideBar from "./side-bar";
import InventoryAnalysisChat from "@/screens/agents/intelligent-replenishment/components/InventoryAnalysisChat";

const menus = [
  {
    to: "/agents/demand-forecasting",
    label: "Demand Forecasting",
    icon: ChartSpline,
  },
  {
    to: "/agents/intelligent-replenishment",
    label: "Intelligent Replenishment",
    icon: ClipboardListIcon,
  },
  {
    to: "/agents/proactive-marketing",
    label: "Proactive Marketing for Maintenance Contractors",
    icon: MonitorCog,
  },
  {
    to: "/agents/project-scheduler",
    label: "Project Scheduler",
    icon: Lightbulb,
  },
  {
    to: "/agents/market-insights",
    label: "Market Insights",
    icon: Building2,
  },
  {
    to: "/agents/assortment-optimization",
    label: "Assortment Optimization",
    icon: Boxes,
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { activeMenuName } = useGlobal();

  return (
    <div className="min-h-screen bg-white">
      <div className="flex h-full bg-secondary">
        {/* Sidebar - Hidden on mobile */}
        <SideBar menus={menus} />

        {/* Main Content */}
        <div className="flex-1 md:overflow-hidden md:h-screen rounded-tl-[13px] rounded-bl-[15px]">
          <div className="md:h-full">
            <div className="md:h-full pt-16 md:pt-0">
              <div className="flex flex-col h-screen bg-warm-off-white">
                {/* Header */}
                <div className="bg-warm-off-white backdrop-blur-lg border-b border-gray-200/50 px-6 py-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div>
                        <h1 className="text-lg font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                          {activeMenuName}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>

                <InventoryAnalysisChat />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
