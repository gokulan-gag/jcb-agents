import type { Message } from "@/types/chat";
import { ulid } from "ulid";

export const getInitialLetter = (words: string) => {
  return words
    .split(" ")
    .map((word) => word[0]?.toUpperCase())
    .join("");
};

export const extractHtmlFromText = (text: string) => {
  const htmlRegex = /<!DOCTYPE html>[\s\S]*?<\/html>/i;
  const htmlMatch = text.match(htmlRegex);

  if (htmlMatch) {
    const htmlContent = htmlMatch[0];
    const textWithoutHtml = text.replace(htmlRegex, "").trim();
    return {
      htmlContent,
      textContent: textWithoutHtml,
    };
  }

  return {
    htmlContent: "",
    textContent: text,
  };
};

export const extractHtmlBlocksFromText = (text: string) => {
  const htmlBlockRegex = /```html\s*([\s\S]*?)```/gi;
  const htmlBlocks: { id: string; content: string; isTrailing: boolean; isHtmlOnly?: boolean }[] = [];

  // First pass: collect all block positions
  const matches: { end: number; content: string }[] = [];
  let match;
  while ((match = htmlBlockRegex.exec(text)) !== null) {
    const htmlContent = match[1].trim();
    if (htmlContent) {
      matches.push({ end: match.index + match[0].length, content: htmlContent });
    }
  }

  // Determine isTrailing: a block is trailing if there is no significant text after it
  matches.forEach(({ end, content }) => {
    const textAfter = text.slice(end).trim();
    htmlBlocks.push({
      id: ulid().slice(0, 10),
      content,
      isTrailing: textAfter.length === 0,
    });
  });

  // Remove HTML blocks from text and replace with placeholders
  let cleanText = text;
  htmlBlocks.forEach((block) => {
    cleanText = cleanText.replace(
      /```html\s*[\s\S]*?```/,
      `[VISUAL_CHART_${block.id}]`
    );
  });

  // Detect HTML-only: if removing all placeholders leaves no significant text,
  // the entire message is HTML. In that case render inline (not in side panel).
  const textWithoutPlaceholders = cleanText.replace(/\[VISUAL_CHART_[A-Z0-9]+\]/g, "").trim();
  if (textWithoutPlaceholders.length === 0 && htmlBlocks.length > 0) {
    htmlBlocks.forEach((block) => {
      block.isTrailing = false;
      block.isHtmlOnly = true;
    });
  }

  return {
    htmlBlocks,
    textContent: cleanText,
  };
};

export const sampleMessages: Message[] = [
  {
    role: "user",
    content: "Do we already have enough stock of Product M-WM-B?",
  },
  {
    role: "assistant",
    content:
      "Product M-WM-B currently has insufficient stock. Here are the details:\n\n- **On-hand inventory**: 1212 units\n- **Target inventory**: 2 units\n- **Current robust autonomy**: 365 days\n- **Unproductive inventory**: 251 units\n- **Replenishment required**: 0 units\n\nThe available inventory (1212 units) significantly exceeds the target inventory (2 units). However, the presence of unproductive inventory (251 units) indicates that a portion of your stock is not being utilized effectively.\n\nNext, I will generate a chart to visualize this data. Let's plot the relevant figures.Product M-WM-B does not have enough stock available. Your current on-hand inventory is 1,212 units, which is significantly higher than the target inventory of just 2 units. However, the analysis indicates that there is excess inventory, categorized as unproductive, with 251 units that are not actively contributing to your stock sufficiency.\n\nHere’s a breakdown of the inventory analysis:\n- **On-Hand Inventory**: 1,212 units\n- **Target Inventory**: 2 units\n- **Current Robust Autonomy**: 365 days\n- **Unproductive Inventory**: 251 units\n- **Replenishment Required**: 0 units\n\nThe data indicates that while you have sufficient overall inventory, a significant portion of it is classified as unproductive. It's crucial to manage this excess stock effectively to avoid potential carrying costs and optimize your inventory levels.\n\nHere's an interactive visualization of your inventory data:\n\n[HTML_BLOCK_html-block-0]\n\n### Recommendations:\n1. **Evaluate Unproductive Stock**: Consider reviewing the reasons behind the unproductive inventory (251 units) and make decisions on how to either utilize, discount, or dispose of it.\n2. **Focus on Demand Planning**: With a robust autonomy of 365 days, ensure that future forecasts align better with inventory levels to avoid excessive stock accumulation.\n3. **Monitor Metrics Regularly**: Regular evaluations of stock levels and autonomy will enhance your inventory management strategy moving forward.",
    htmlBlocks: [
      {
        id: "html-block-0123",
        content:
          "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>99% Robust Autonomy Levels per SKU</title>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/plotly.js/2.26.0/plotly.min.js\"></script>\n    <style>\n        body {\n            margin: 0;\n            padding: 20px;\n            background-color: hsl(30, 67%, 99%);\n            font-family: Arial, sans-serif;\n        }\n        #chart {\n            width: 100%;\n            height: 600px;\n        }\n        h1 {\n            color: #111827;\n            font-size: 24px;\n            font-weight: bold;\n            margin-bottom: 20px;\n        }\n    </style>\n</head>\n<body>\n    <h1>99% Robust Autonomy Levels per SKU</h1>\n    <div id=\"chart\"></div>\n    <script>\n        const skus1 = [\"Gokulan\"];\n\n        const currentRobust = {\n            x: skus1,\n            y: undefined,\n            name: 'Current Robust Autonomy',\n            type: 'bar',\n            marker: { color: '#4b5563' }\n        };\n\n        const unproductive = {\n            x: skus1,\n            y: [251],\n            name: 'Unproductive Inventory',\n            type: 'bar',\n            marker: {\n                color: '#d97706',\n                pattern: { shape: '/', bgcolor: '#fcd34d', fgcolor: '#d97706', size: 8, solidity: 0.5 }\n            }\n        };\n\n        const replenishment = {\n            x: skus1,\n            y: undefined,\n            name: 'Replenishment required',\n            type: 'bar',\n            marker: {\n                color: '#7c3aed',\n                pattern: { shape: '+', bgcolor: '#ddd6fe', fgcolor: '#7c3aed', size: 8, solidity: 0.5 }\n            }\n        };\n\n        const layout = {\n            barmode: 'stack',\n            plot_bgcolor: 'hsl(30, 67%, 99%)',\n            paper_bgcolor: 'hsl(30, 67%, 99%)',\n            xaxis: { title: { text: 'SKU', font: { color: '#111827', size: 14 } }, tickfont: { color: '#111827', size: 12 }, gridcolor: '#e5e7eb' },\n            yaxis: { title: { text: '99% Robust Autonomy days', font: { color: '#111827', size: 14 } }, tickfont: { color: '#111827', size: 12 }, gridcolor: '#e5e7eb' },\n            legend: { font: { color: '#111827', size: 12 }, bgcolor: 'rgba(255, 255, 255, 0.8)', bordercolor: '#d1d5db', borderwidth: 1, x: 1, xanchor: 'right', y: -0.25, yanchor: 'top', orientation: 'h' },\n            margin: { l: 80, r: 50, t: 50, b: 120 }\n        };\n\n        const config = { responsive: true, displayModeBar: true, displaylogo: false };\n\n        Plotly.newPlot('chart', [currentRobust, unproductive, replenishment], layout, config);\n    </script>\n</body>\n</html>",
      },
    ],
  },
  {
    role: "user",
    content: "Is the product M-WM-B in excess?",
  },
  {
    role: "assistant",
    content: "Sorry, there was an error processing your request.",
  },
  {
    role: "user",
    content: "Is the product M-WM-B in excess?\n\n",
  },
  {
    role: "assistant",
    content:
      "Yes, the product M-WM-B is indeed in excess. Here's a summary of the inventory analysis:\n\n- **On-Hand Inventory**: 1,212 units\n- **Target Inventory**: 2 units\n- **Excess Inventory**: Yes (The inventory is in excess)\n- **Unproductive Inventory**: 251 units\n- **Current Robust Autonomy**: 365 days\n- **Replenishment Required**: 0 units\n\n### Key Insights:\n- You have significantly more inventory than needed, given the low target inventory of 2 units. This indicates that stock levels are not just sufficient, but considerably beyond necessary levels.\n- A portion of this excess stock (251 units) is classified as unproductive, which may incur unnecessary carrying costs.\n\nHere’s an interactive visualization of your inventory data:\n\n[HTML_BLOCK_html-block-0]\n\n### Recommendations:\n1. **Evaluate Excess Stock**: Analyze the reasons behind this excess stock and consider potential actions like discounts or clearance strategies.\n2. **Prevent Future Accumulation**: Consider adjusting your purchase orders or forecasting needs to avoid future excess inventory situations.\n3. **Regularly Monitor Inventory Levels**: Continuous monitoring will help keep your inventory aligned with operational needs and demand fluctuations.",
    htmlBlocks: [
      {
        id: "html-block-0442",
        content:
          "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>99% Robust Autonomy Levels per SKU</title>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/plotly.js/2.26.0/plotly.min.js\"></script>\n    <style>\n        body {\n            margin: 0;\n            padding: 20px;\n            background-color: hsl(30, 67%, 99%);\n            font-family: Arial, sans-serif;\n        }\n        #chart {\n            width: 100%;\n            height: 600px;\n        }\n        h1 {\n            color: #111827;\n            font-size: 24px;\n            font-weight: bold;\n            margin-bottom: 20px;\n        }\n    </style>\n</head>\n<body>\n    <h1>99% Robust Autonomy Levels per SKU</h1>\n    <div id=\"chart\"></div>\n    <script>\n        const skus2 = [\"M-WM-B\"];\n\n        const currentRobust = {\n            x: skus2,\n            y: undefined,\n            name: 'Current Robust Autonomy',\n            type: 'bar',\n            marker: { color: '#4b5563' }\n        };\n\n        const unproductive = {\n            x: skus2,\n            y: [251],\n            name: 'Unproductive Inventory',\n            type: 'bar',\n            marker: {\n                color: '#d97706',\n                pattern: { shape: '/', bgcolor: '#fcd34d', fgcolor: '#d97706', size: 8, solidity: 0.5 }\n            }\n        };\n\n        const replenishment = {\n            x: skus2,\n            y: undefined,\n            name: 'Replenishment required',\n            type: 'bar',\n            marker: {\n                color: '#7c3aed',\n                pattern: { shape: '+', bgcolor: '#ddd6fe', fgcolor: '#7c3aed', size: 8, solidity: 0.5 }\n            }\n        };\n\n        const layout = {\n            barmode: 'stack',\n            plot_bgcolor: 'hsl(30, 67%, 99%)',\n            paper_bgcolor: 'hsl(30, 67%, 99%)',\n            xaxis: { title: { text: 'SKU', font: { color: '#111827', size: 14 } }, tickfont: { color: '#111827', size: 12 }, gridcolor: '#e5e7eb' },\n            yaxis: { title: { text: '99% Robust Autonomy days', font: { color: '#111827', size: 14 } }, tickfont: { color: '#111827', size: 12 }, gridcolor: '#e5e7eb' },\n            legend: { font: { color: '#111827', size: 12 }, bgcolor: 'rgba(255, 255, 255, 0.8)', bordercolor: '#d1d5db', borderwidth: 1, x: 1, xanchor: 'right', y: -0.25, yanchor: 'top', orientation: 'h' },\n            margin: { l: 80, r: 50, t: 50, b: 120 }\n        };\n\n        const config = { responsive: true, displayModeBar: true, displaylogo: false };\n\n        Plotly.newPlot('chart', [currentRobust, unproductive, replenishment], layout, config);\n    </script>\n</body>\n</html>",
      },
    ],
  },
  {
    role: "user",
    content:
      "Can you show me all products where the Autonomy levels are more than the Lead time + buffer of 363 days?",
  },
  {
    role: "assistant",
    content:
      "I've found a list of products where the autonomy levels exceed the combined lead time and buffer of 363 days. Here are the details for those products:\n\n### Products with Autonomy Levels Greater than 363 Days\n1. **SKU**: G5KIT2\n   - **On-Hand Inventory**: 0\n   - **Total Inventory**: 2040\n   - **Current Robust Autonomy**: 365 days\n   - **Target Inventory**: 123\n   - **Unproductive Inventory**: 335\n   - **Replenishment Required**: 0\n\n2. **SKU**: G5KIT4\n   - **On-Hand Inventory**: 1073\n   - **Total Inventory**: 1073\n   - **Current Robust Autonomy**: 365 days\n   - **Target Inventory**: 62\n   - **Unproductive Inventory**: 335\n   - **Replenishment Required**: 0\n\n3. **SKU**: G5KIT6\n   - **On-Hand Inventory**: 167\n   - **Total Inventory**: 1195\n   - **Current Robust Autonomy**: 365 days\n   - **Target Inventory**: 23\n   - **Unproductive Inventory**: 335\n   - **Replenishment Required**: 0\n\n4. **SKU**: G5KIT1\n   - **On-Hand Inventory**: 16\n   - **Total Inventory**: 1136\n   - **Current Robust Autonomy**: 365 days\n   - **Target Inventory**: 16\n   - **Unproductive Inventory**: 335\n   - **Replenishment Required**: 0\n\n5. **SKU**: L4-QMECECR1\n   - **On-Hand Inventory**: 0\n   - **Total Inventory**: 0\n   - **Current Robust Autonomy**: 365 days\n   - **Target Inventory**: 0\n   - **Unproductive Inventory**: 335\n   - **Replenishment Required**: 0\n\n6. **SKU**: L2-QMGCCR1\n   - **On-Hand Inventory**: 0\n   - **Total Inventory**: 0\n   - **Current Robust Autonomy**: 365 days\n   - **Target Inventory**: 0\n   - **Unproductive Inventory**: 335\n   - **Replenishment Required**: 0\n\n7. **SKU**: MTGCOVER\n   - **On-Hand Inventory**: 545\n   - **Total Inventory**: 545\n   - **Current Robust Autonomy**: 365 days\n   - **Target Inventory**: 6\n   - **Unproductive Inventory**: 335\n   - **Replenishment Required**: 0\n\n8. **SKU**: GROUNDSTAKE\n   - **On-Hand Inventory**: 19\n   - **Total Inventory**: 470\n   - **Current Robust Autonomy**: 365 days\n   - **Target Inventory**: 25\n   - **Unproductive Inventory**: 335\n   - **Replenishment Required**: 0\n\n9. **SKU**: JBOXB-4TH\n   - **On-Hand Inventory**: 116\n   - **Total Inventory**: 116\n   - **Current Robust Autonomy**: 365 days\n   - **Target Inventory**: 11\n   - **Unproductive Inventory**: 335\n   - **Replenishment Required**: 0\n\n10. **SKU**: SKFHBLC277-15\n    - **On-Hand Inventory**: 0\n    - **Total Inventory**: 0\n    - **Current Robust Autonomy**: 365 days\n    - **Target Inventory**: 0\n    - **Unproductive Inventory**: 335\n    - **Replenishment Required**: 0\n\n### Interactive Visualization\nHere's an interactive chart representing the autonomy levels and unproductive inventory of these products:\n\n[HTML_BLOCK_html-block-0]\n\n### Summary\nThese results indicate that multiple products possess robust levels of autonomy, outpacing the expected lead time plus buffer. Such insight is crucial for managing inventory effectively, particularly to address potential overproduction or unnecessary inventory accumulation.\n\n### Recommendations:\n1. **Review Excess Inventory**: For items with substantial unproductive inventory, consider promotions or discounts to optimize stock levels.\n2. **Plan Future Orders**: Align orders and production with realistic needs to prevent overstocking issues.\n3. **Continue Monitoring Levels**: This insight should be part of regular reviews to enhance stock management strategies.",
    htmlBlocks: [
      {
        id: "html-block-0313",
        content:
          "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>99% Robust Autonomy Levels per SKU</title>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/plotly.js/2.26.0/plotly.min.js\"></script>\n    <style>\n        body {\n            margin: 0;\n            padding: 20px;\n            background-color: hsl(30, 67%, 99%);\n            font-family: Arial, sans-serif;\n        }\n        #chart {\n            width: 100%;\n            height: 600px;\n        }\n        h1 {\n            color: #111827;\n            font-size: 24px;\n            font-weight: bold;\n            margin-bottom: 20px;\n        }\n    </style>\n</head>\n<body>\n    <h1>99% Robust Autonomy Levels per SKU</h1>\n    <div id=\"chart\"></div>\n    <script>\n        const skus3 = [\"G5KIT2\",\"G5KIT4\",\"G5KIT6\",\"G5KIT1\",\"L4-QMECECR1\",\"L2-QMGCCR1\",\"MTGCOVER\",\"GROUNDSTAKE\",\"JBOXB-4TH\",\"SKFHBLC277-15\"];\n\n        const currentRobust = {\n            x: skus3,\n            y: undefined,\n            name: 'Current Robust Autonomy',\n            type: 'bar',\n            marker: { color: '#4b5563' }\n        };\n\n        const unproductive = {\n            x: skus3,\n            y: [335,335,335,335,335,335,335,335,335,335],\n            name: 'Unproductive Inventory',\n            type: 'bar',\n            marker: {\n                color: '#d97706',\n                pattern: { shape: '/', bgcolor: '#fcd34d', fgcolor: '#d97706', size: 8, solidity: 0.5 }\n            }\n        };\n\n        const replenishment = {\n            x: skus3,\n            y: undefined,\n            name: 'Replenishment required',\n            type: 'bar',\n            marker: {\n                color: '#7c3aed',\n                pattern: { shape: '+', bgcolor: '#ddd6fe', fgcolor: '#7c3aed', size: 8, solidity: 0.5 }\n            }\n        };\n\n        const layout = {\n            barmode: 'stack',\n            plot_bgcolor: 'hsl(30, 67%, 99%)',\n            paper_bgcolor: 'hsl(30, 67%, 99%)',\n            xaxis: { title: { text: 'SKU', font: { color: '#111827', size: 14 } }, tickfont: { color: '#111827', size: 12 }, gridcolor: '#e5e7eb' },\n            yaxis: { title: { text: '99% Robust Autonomy days', font: { color: '#111827', size: 14 } }, tickfont: { color: '#111827', size: 12 }, gridcolor: '#e5e7eb' },\n            legend: { font: { color: '#111827', size: 12 }, bgcolor: 'rgba(255, 255, 255, 0.8)', bordercolor: '#d1d5db', borderwidth: 1, x: 1, xanchor: 'right', y: -0.25, yanchor: 'top', orientation: 'h' },\n            margin: { l: 80, r: 50, t: 50, b: 120 }\n        };\n\n        const config = { responsive: true, displayModeBar: true, displaylogo: false };\n\n        Plotly.newPlot('chart', [currentRobust, unproductive, replenishment], layout, config);\n    </script>\n</body>\n</html>",
      },
    ],
  },
];

export const sampleHtmlContent = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Fixture Life Remaining Analysis</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/plotly.js/2.26.0/plotly.min.js"></script>
    <style>
      body {
        margin: 0;
        padding: 20px;
        background-color: hsl(30, 67%, 99%);
        font-family: Arial, sans-serif;
      }

      #chart {
        width: 100%;
        height: 600px;
      }

      h1 {
        color: #111827;
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 20px;
      }
    </style>
  </head>

  <body>
    <h1>Fixture Life Remaining Status</h1>
    <div id="chart"></div>

    <script>
      const labels = [
        "🔴 Due (< 10%)",
        "🟡 Upcoming (11-30%)",
        "🟢 Healthy (> 30%)",
      ];
      const values = [1, 1, 0];
      const colors = ["#dc2626", "#fbbf24", "#10b981"];

      const pieData = [
        {
          values: values,
          labels: labels,
          type: "pie",
          hole: 0.4,
          marker: { colors: colors },
          textinfo: "label+percent",
          textposition: "outside",
          automargin: true,
        },
      ];

      const layout = {
        title: {
          text: "Distribution by Life Remaining Status",
          font: { size: 16, color: "#111827" },
        },
        plot_bgcolor: "hsl(30, 67%, 99%)",
        paper_bgcolor: "hsl(30, 67%, 99%)",
        showlegend: true,
        legend: {
          font: { color: "#111827", size: 12 },
          bgcolor: "rgba(255, 255, 255, 0.8)",
          bordercolor: "#d1d5db",
          borderwidth: 1,
          x: 1,
          xanchor: "right",
          y: -0.2,
          yanchor: "top",
          orientation: "h",
        },
        margin: { l: 20, r: 20, t: 80, b: 120 },
      };

      const config = {
        responsive: true,
        displayModeBar: true,
        displaylogo: false,
      };

      Plotly.newPlot("chart", pieData, layout, config);
    </script>
  </body>
</html>

`;
