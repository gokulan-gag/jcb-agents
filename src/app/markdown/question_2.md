Here are the products where we're carrying more inventory than needed to cover lead time plus 60 extra days of upcoming demands:

- **SKU**: M-WM-B

  - **Inventory coverage**: 365 days of Demand
  - **On-hand inventory**: 1,212 units
  - **Unproductive stock**: 1,207 units (≈ 99% idle)
  - **Insight**: Inventory significantly exceeds demand coverage, indicating potential overstocking.

- **SKU**: BL-CL36BOC

  - **Inventory coverage**: 365 days of Demand
  - **On-hand inventory**: 59 units
  - **Unproductive stock**: 59 units (≈ 100% idle)
  - **Insight**: No active demand, consider liquidation or substitution

- **SKU**: BL-CLRDH22UCSLRB

  - **Inventory coverage**: 365 days of Demand
  - **On-hand inventory**: 125 units
  - **Unproductive stock**: 120 units (≈ 96% idle)
  - **Insight**: Overstocked, potential for consolidation or promotion.

- **SKU**: BL-CRS36B

  - **Inventory coverage**: 365 days of Demand
  - **On-hand inventory**: 38 units
  - **Unproductive stock**: 38 units (≈ 100% idle)
  - **Insight**: No current sales; assess for product update or clearance.

- **SKU**: EBUUP1751E0200A
  - **Inventory coverage**: 151 days of Demand
  - **On-hand inventory**: 182 units
  - **Unproductive stock**: 38 units (≈ 21% idle)
  - **Insight**: Slight surplus, monitor demand closely for adjustments.

### Major Insights:

- Majority of SKUs have very high stock coverage exceeding 60 days of inventory on hand.

- Indicates excess stock and low turnover across multiple SKUs.

- Several products have most of their stock identified as idle/unproductive, signaling a need for review.

Here's an interactive breakdown of the inventory situation:

[VISUAL_CHART_01KE8X8NDF]

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>99% Robust Autonomy Days by SKU</title>
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
        height: 650px;
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
    <h1>Days of Inventory Coverage per SKU</h1>
    <div id="chart"></div>

    <script>
      const skus = [
        "M-WM-B",
        "BL-CL36BOX",
        "BL-CLRDH22UCSLRB",
        "BL-CLRS36B",
        "EBUUP1751E0200A",
      ];

      // Base target stock (dark bar)
      const targetStock = {
        x: skus,
        y: [365, 365, 365, 365, 151],
        name: "Target Stock",
        type: "bar",
        marker: { color: "#4b5563" },
      };

      // Excess / unproductive inventory (striped bar)
      const unproductiveInventory = {
        x: skus,
        y: [247, 235, 220, 235, 38],
        name: "Unproductive Inventory",
        type: "bar",
        marker: {
          color: "#d97706",
          pattern: {
            shape: "/",
            bgcolor: "#fcd34d",
            fgcolor: "#d97706",
            size: 8,
            solidity: 0.5,
          },
        },
        text: [
          "Units: 1207",
          "Units: 59",
          "Units: 120",
          "Units: 38",
          "Units: 38",
        ],
        textposition: "inside",
        textangle: -90,
        hovertemplate: "%{text}<extra></extra>",
      };

      // No replenishment required
      const replenishment = {
        x: skus,
        y: [0, 0, 0, 0, 0],
        name: "Replenishment required",
        type: "bar",
        marker: {
          color: "#7c3aed",
          pattern: {
            shape: "+",
            bgcolor: "#ddd6fe",
            fgcolor: "#7c3aed",
            size: 8,
            solidity: 0.5,
          },
        },
      };

      const layout = {
        barmode: "stack",
        plot_bgcolor: "hsl(30, 67%, 99%)",
        paper_bgcolor: "hsl(30, 67%, 99%)",
        yaxis: {
          title: "99% Robust Autonomy days",
          gridcolor: "#e5e7eb",
        },
        xaxis: {
          title: "SKU",
        },
        legend: {
          orientation: "h",
          y: -0.25,
        },
        margin: { t: 40, b: 120 },
      };

      Plotly.newPlot(
        "chart",
        [targetStock, unproductiveInventory, replenishment],
        layout,
        { responsive: true }
      );
    </script>
  </body>
</html>
```
