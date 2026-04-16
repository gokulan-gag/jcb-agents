import React from "react";

interface HtmlBlockRendererProps {
  htmlBlocks: { id: string; content: string }[];
  selectedHtmlId: string;
  onHtmlBlockSelect: (id: string, content: string) => void;
}

const HtmlBlockRenderer: React.FC<HtmlBlockRendererProps> = ({
  htmlBlocks,
  selectedHtmlId,
  onHtmlBlockSelect,
}) => {
  if (!htmlBlocks || htmlBlocks.length <= 1) return null;

  return (
    <div className="mt-3 space-y-2">
      <div className="text-sm text-gray-600 font-medium">
        Available Visualizations:
      </div>
      <div className="flex flex-wrap gap-2">
        {htmlBlocks.map((block, i) => (
          <button
            key={i}
            onClick={() => onHtmlBlockSelect(block.id, block.content)}
            className={`cursor-pointer px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedHtmlId === block.id
                ? "bg-primary text-white shadow-md"
                : "bg-muted text-gray-700 hover:bg-primary hover:text-white"
            }`}
          >
            {i === 0 ? "Map" : "Chart"}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HtmlBlockRenderer;
