```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Replenishment Intelligence — Full Dashboard</title>
    <link
      href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
      rel="stylesheet"
    />
    <style>
      :root {
        --bg: #faf9f7;
        --surface: #ffffff;
        --border: #e8e4df;
        --border-light: #f0ede9;
        --text-primary: #1a1714;
        --text-secondary: #6b6560;
        --text-muted: #9c9590;
        --accent-gold: #c8a84e;
        --accent-gold-bg: #fdf8ec;
        --red: #c0392b;
        --red-light: #fbeae8;
        --red-text: #a0302a;
        --red-alert-bg: #fdf0ee;
        --red-alert-border: #f5d0ca;
        --green: #3d7a3d;
        --green-dark: #2d6b2d;
        --green-light: #edf5ed;
        --orange: #d4860a;
        --orange-light: #fff4e0;
        --orange-text: #9e6508;
        --blue-stage: #5b8fb9;
        --blue-light: #e8f0f8;
        --olive: #7a8b3d;
        --olive-light: #f0f3e4;
        --closing-red: #c0392b;
        --closing-bg: #fbeae8;
        --btn-dark: #0c447c;
        --btn-dark-hover: #042c53;
        --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.04);
        --shadow-md: 0 2px 8px rgba(0, 0, 0, 0.06);
        --radius: 8px;
        --radius-sm: 5px;
        --radius-lg: 12px;
      }
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family:
          "DM Sans",
          -apple-system,
          sans-serif;
        color: var(--text-primary);
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
        max-width: 1320px;
        margin: 0 auto;
        padding: 32px 40px;
      }
      .card {
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        padding: 28px 32px;
        margin-bottom: 24px;
        box-shadow: var(--shadow-sm);
      }
      .section-title {
        font-family: "JetBrains Mono", monospace;
        font-size: 11px;
        font-weight: 500;
        letter-spacing: 1.6px;
        text-transform: uppercase;
        color: var(--text-secondary);
        margin-bottom: 20px;
      }
      table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0;
      }
      thead th {
        font-family: "JetBrains Mono", monospace;
        font-size: 10px;
        font-weight: 500;
        letter-spacing: 1.2px;
        text-transform: uppercase;
        color: var(--text-muted);
        text-align: left;
        padding: 0 16px 14px;
        border-bottom: 1px solid var(--border);
      }
      tbody td {
        padding: 16px 16px;
        vertical-align: middle;
        border-bottom: 1px solid var(--border-light);
        font-size: 14px;
      }
      tbody tr:last-child td {
        border-bottom: none;
      }
      tbody tr:hover {
        background: #fdfcfb;
      }
      .num {
        font-variant-numeric: tabular-nums;
      }

      /* Alert Banner */
      .alert-banner {
        background: var(--red-alert-bg);
        border: 1px solid var(--red-alert-border);
        border-radius: var(--radius-lg);
        padding: 20px 28px;
        margin-bottom: 24px;
        display: flex;
        gap: 14px;
        align-items: flex-start;
        font-size: 15px;
        line-height: 1.6;
        color: #3a2a28;
      }
      .alert-icon {
        flex-shrink: 0;
        width: 28px;
        height: 28px;
        background: var(--red);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-weight: 700;
        font-size: 15px;
        margin-top: 1px;
      }
      .alert-banner strong {
        font-weight: 700;
        color: #2a1a18;
      }

      /* Spec Grid */
      .spec-grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        border: 1px solid var(--border);
        border-radius: var(--radius);
        overflow: hidden;
        margin-bottom: 24px;
      }
      .spec-cell {
        padding: 14px 18px;
        border-right: 1px solid var(--border);
      }
      .spec-cell:last-child {
        border-right: none;
      }
      .spec-label {
        font-family: "JetBrains Mono", monospace;
        font-size: 10px;
        font-weight: 500;
        letter-spacing: 1.2px;
        text-transform: uppercase;
        color: var(--text-muted);
        margin-bottom: 6px;
      }
      .spec-value {
        font-size: 16px;
        font-weight: 700;
        color: var(--text-primary);
      }
      .spec-sub {
        font-size: 12px;
        color: var(--text-muted);
        margin-top: 2px;
      }

      .mfr-name {
        font-weight: 600;
        font-size: 15px;
      }
      .mfr-sku,
      .branch-code {
        font-family: "JetBrains Mono", monospace;
        font-size: 11px;
        color: var(--text-muted);
        margin-top: 2px;
      }
      .branch-name {
        font-weight: 600;
        font-size: 15px;
      }

      .flagged {
        display: inline-block;
        font-size: 10px;
        font-weight: 600;
        color: var(--red-text);
        background: var(--red-light);
        padding: 2px 7px;
        border-radius: 3px;
        margin-left: 8px;
        vertical-align: middle;
      }

      .val-red {
        color: var(--red);
        font-weight: 600;
      }
      .val-green {
        color: var(--green);
      }
      .val-amber {
        color: var(--orange);
        font-weight: 500;
      }
      .val-dark-red {
        color: #8b2020;
        font-weight: 700;
      }
      .val-bold {
        font-weight: 700;
      }

      /* Role badges */
      .role-badge {
        display: inline-block;
        font-size: 11px;
        font-weight: 600;
        padding: 4px 14px;
        border-radius: 20px;
      }
      .role-primary {
        color: var(--green);
        background: var(--green-light);
      }
      .role-alternate {
        color: var(--blue-stage);
        background: var(--blue-light);
      }

      /* Stage badges */
      .stage-badge {
        display: inline-block;
        font-size: 11px;
        font-weight: 600;
        padding: 4px 14px;
        border-radius: 20px;
      }
      .stage-negotiation {
        color: var(--olive);
        background: var(--olive-light);
      }
      .stage-closing {
        color: var(--orange-text);
        background: var(--orange-light);
      }
      .stage-proposal {
        color: var(--blue-stage);
        background: var(--blue-light);
      }

      /* Status badges */
      .badge {
        display: inline-block;
        font-size: 11px;
        font-weight: 600;
        padding: 4px 12px;
        border-radius: 20px;
      }
      .badge-critical {
        color: var(--red-text);
        background: var(--red-light);
      }
      .badge-at-risk {
        color: var(--orange-text);
        background: var(--orange-light);
      }
      .badge-sufficient {
        color: var(--green);
        background: var(--green-light);
      }

      /* On-time bar */
      .ot-bar-wrap {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .ot-bar {
        width: 72px;
        height: 8px;
        background: #eceae7;
        border-radius: 4px;
        overflow: hidden;
      }
      .ot-bar-fill {
        height: 100%;
        border-radius: 4px;
      }
      .ot-bar-fill.high {
        background: var(--green-dark);
      }
      .ot-bar-fill.mid {
        background: var(--red);
      }
      .ot-pct {
        font-weight: 600;
        font-size: 14px;
      }

      /* Probability bar */
      .prob-bar-wrap {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .prob-bar {
        width: 48px;
        height: 7px;
        background: #eceae7;
        border-radius: 4px;
        overflow: hidden;
      }
      .prob-bar-fill {
        height: 100%;
        border-radius: 4px;
      }
      .prob-high {
        background: var(--olive);
      }
      .prob-mid {
        background: var(--blue-stage);
      }
      .prob-low {
        background: #8b8580;
      }

      /* AI Callout */
      .ai-callout {
        background: var(--accent-gold-bg);
        border-left: 3px solid var(--accent-gold);
        border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
        padding: 16px 20px;
        margin-top: 20px;
        font-size: 13px;
        line-height: 1.65;
        color: #4a4235;
      }
      .ai-callout strong {
        font-weight: 700;
        color: #3a3325;
      }

      /* Two-column layout */
      .row-2col {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 24px;
        margin-bottom: 24px;
      }
      .row-2col .card {
        margin-bottom: 0;
      }

      /* Summary row */
      .summary-row td {
        background: #fafaf8;
        font-weight: 600;
        border-top: 1px solid var(--border);
        border-bottom: none !important;
        padding-top: 14px;
        padding-bottom: 14px;
      }

      /* KV list */
      .kv-list {
        list-style: none;
      }
      .kv-list li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 11px 0;
        border-bottom: 1px solid var(--border-light);
        font-size: 14px;
      }
      .kv-list li:last-child {
        border-bottom: none;
      }
      .kv-list .kv-value {
        font-weight: 600;
        font-variant-numeric: tabular-nums;
      }
      .kv-list .kv-total {
        font-weight: 700;
        font-size: 15px;
        padding-top: 14px;
        border-top: 1px solid var(--border);
      }

      /* Bar chart */
      .bar-chart {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .bar-row {
        display: grid;
        grid-template-columns: 52px 1fr 50px;
        align-items: center;
        gap: 12px;
      }
      .bar-label {
        font-size: 12px;
        color: var(--text-secondary);
        text-align: right;
        line-height: 1.2;
      }
      .bar-track {
        height: 22px;
        background: #f0edea;
        border-radius: 3px;
        overflow: hidden;
        display: flex;
      }
      .bar-seg {
        height: 100%;
      }
      .bar-seg.flow {
        background: #a8d0e6;
      }
      .bar-seg.project {
        background: #cc4b37;
      }
      .bar-val {
        font-size: 12px;
        font-weight: 600;
        color: var(--text-secondary);
        text-align: right;
        font-variant-numeric: tabular-nums;
      }
      .chart-legend {
        display: flex;
        gap: 24px;
        margin-top: 14px;
        padding-top: 12px;
        border-top: 1px solid var(--border-light);
      }
      .legend-item {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 12px;
        color: var(--text-secondary);
      }
      .legend-dot {
        width: 12px;
        height: 12px;
        border-radius: 2px;
      }
      .legend-dot.flow {
        background: #a8d0e6;
      }
      .legend-dot.project {
        background: #cc4b37;
      }

      /* Pipeline summary */
      .pipeline-summary {
        background: #fafaf8;
        border: 1px solid var(--border);
        border-radius: var(--radius);
        padding: 14px 18px;
        margin-top: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        color: var(--text-secondary);
      }
      .pipeline-summary .ps-right {
        font-weight: 600;
        color: var(--text-primary);
      }
      .pipeline-summary .ps-highlight {
        color: var(--red);
        font-weight: 700;
      }

      /* Action cells */
      .action-primary {
        font-weight: 600;
        font-size: 14px;
        margin-bottom: 2px;
      }
      .action-detail {
        font-family: "JetBrains Mono", monospace;
        font-size: 11px;
        color: var(--text-muted);
        margin-top: 2px;
      }
      .action-note {
        font-size: 12px;
        color: var(--orange);
        margin-top: 4px;
        font-weight: 500;
      }

      /* Buttons */
      .btn {
        display: inline-block;
        font-family: "DM Sans", sans-serif;
        font-size: 13px;
        font-weight: 600;
        padding: 9px 22px;
        border-radius: 6px;
        border: none;
        cursor: pointer;
        white-space: nowrap;
        text-align: center;
        min-width: 160px;
        transition:
          background 0.4s ease,
          color 0.4s ease,
          border-color 0.4s ease,
          box-shadow 0.3s ease;
      }
      .btn-primary {
        background: var(--btn-dark);
        color: #fff;
        border: 1px solid var(--btn-dark);
      }
      .btn-primary:hover {
        background: var(--btn-dark-hover);
        border-color: var(--btn-dark-hover);
        box-shadow: var(--shadow-md);
      }
      .btn-outline {
        background: transparent;
        color: var(--text-secondary);
        border: 1px solid var(--border);
      }
      .btn-outline:hover {
        border-color: #8b8580;
        color: var(--text-primary);
        background: #f5f5f3;
      }
      .btn-disabled {
        background: #e0dcd8;
        color: #a09a94;
        cursor: default;
        border: 1px solid #e0dcd8;
      }
      .btn-stack {
        display: flex;
        flex-direction: column;
        gap: 8px;
        align-items: stretch;
      }
      .btn-stack .btn {
        width: 100%;
      }

      /* Confirmed green state */
      .btn.confirmed {
        background: #f0fdf4;
        color: #166534;
        border: 1px solid #bbf7d0;
        cursor: default;
        font-weight: 600;
      }
      .btn.confirmed:hover {
        background: #e2f9e8;
        border-color: #a3edba;
        box-shadow: none;
      }

      /* Pulse animation on confirm */
      @keyframes confirmPulse {
        0% {
          box-shadow: 0 0 0 0 rgba(22, 101, 52, 0.25);
        }
        70% {
          box-shadow: 0 0 0 8px rgba(22, 101, 52, 0);
        }
        100% {
          box-shadow: 0 0 0 0 rgba(22, 101, 52, 0);
        }
      }
      .btn.confirming {
        animation: confirmPulse 0.6s ease-out;
      }

      @media (max-width: 960px) {
        body {
          padding: 16px;
        }
        .card {
          padding: 18px 16px;
          overflow-x: auto;
        }
        .row-2col {
          grid-template-columns: 1fr;
        }
        .spec-grid {
          grid-template-columns: repeat(2, 1fr);
        }
        table {
          min-width: 700px;
        }
      }
    </style>
  </head>
  <body>
    <!-- SECTION 1: ALERT BANNER -->
    <div class="alert-banner">
      <div class="alert-icon">⚠</div>
      <div>
        <strong>High stockout risk across 3 of 5 Southeast branches —</strong>
        project demand spikes create a ~6,400 unit gap. Spec matches 3
        interchangeable SKUs across 3 manufacturers. Primary manufacturer MFR 1
        averages a 12-day delivery slip.
      </div>
    </div>

    <!-- SECTION 2: SPEC RESOLVED TO STOCKED SKUS -->
    <div class="card">
      <div class="section-title">Spec Resolved to Stocked SKUs</div>
      <div class="spec-grid">
        <div class="spec-cell">
          <div class="spec-label">Form Factor</div>
          <div class="spec-value">LED 2×4 troffer</div>
          <div class="spec-sub">Recessed, lay-in</div>
        </div>
        <div class="spec-cell">
          <div class="spec-label">Wattage</div>
          <div class="spec-value">30 / 35 / 40W</div>
          <div class="spec-sub">Field selectable</div>
        </div>
        <div class="spec-cell">
          <div class="spec-label">Color Temp</div>
          <div class="spec-value">3500 / 4000 / 5000K</div>
          <div class="spec-sub">Field selectable</div>
        </div>
        <div class="spec-cell">
          <div class="spec-label">Voltage</div>
          <div class="spec-value">120–277V</div>
          <div class="spec-sub">Universal</div>
        </div>
        <div class="spec-cell">
          <div class="spec-label">Dimming</div>
          <div class="spec-value">0–10V</div>
          <div class="spec-sub">Standard</div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th style="width:12%">Supplier</th>
            <th style="width:24%">SKU</th>
            <th style="width:15%">Role</th>
            <th style="text-align:right">Network Stock</th>
            <th style="text-align:right">Unit Cost</th>
            <th style="text-align:left">Lead Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="mfr-name">MFR 2</td>
            <td>
              <span class="mfr-sku" style="font-size:13px"
                >M2-2X4-WS-CCT-UNV</span
              >
            </td>
            <td><span class="role-badge role-primary">Primary</span></td>
            <td class="num" style="text-align:right">6,200</td>
            <td class="num" style="text-align:right">$48</td>
            <td style="text-align:left">
              <span class="val-green">21d avg</span>
            </td>
          </tr>
          <tr>
            <td class="mfr-name">MFR 1</td>
            <td>
              <span class="mfr-sku" style="font-size:13px"
                >M1-24T-WS-3CCT-DIM</span
              >
            </td>
            <td><span class="role-badge role-alternate">Alternate</span></td>
            <td class="num" style="text-align:right">4,800</td>
            <td class="num" style="text-align:right">$44</td>
            <td style="text-align:left">
              <span class="val-red">33d actual</span>
              <span class="flagged">flagged</span>
            </td>
          </tr>
          <tr>
            <td class="mfr-name">MFR 3</td>
            <td>
              <span class="mfr-sku" style="font-size:13px"
                >M3-2X4-SEL-W-CCT</span
              >
            </td>
            <td><span class="role-badge role-alternate">Alternate</span></td>
            <td class="num" style="text-align:right">3,100</td>
            <td class="num" style="text-align:right">$51</td>
            <td style="text-align:left">
              <span class="val-green">26d avg</span>
            </td>
          </tr>
          <tr class="summary-row">
            <td colspan="3" style="font-weight:600">
              Combined network stock (all SKUs, interchangeable spec)
            </td>
            <td class="num" style="text-align:right; font-weight:700">
              14,100
            </td>
            <td></td>
            <td style="text-align:right; color:var(--text-secondary)">
              vs 20,500 demand
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- SECTION 3: DEMAND BREAKDOWN + ON-HAND -->
    <div class="row-2col">
      <div class="card">
        <div class="section-title">Demand Breakdown</div>
        <ul class="kv-list">
          <li>
            <span>Flow demand (60d, all branches)</span
            ><span class="kv-value">5,500</span>
          </li>
          <li>
            <span>Project demand — 80–100% prob</span
            ><span class="kv-value val-amber">7,800</span>
          </li>
          <li>
            <span>Project demand — 50–79% prob</span
            ><span class="kv-value val-amber">7,200</span>
          </li>
          <li>
            <span>Total expected demand</span
            ><span class="kv-value val-red">20,500</span>
          </li>
          <li>
            <span>Combined network stock</span
            ><span class="kv-value">14,100</span>
          </li>
          <li class="kv-total">
            <span style="font-weight:700">Net gap</span
            ><span class="kv-value val-dark-red">−6,400 units</span>
          </li>
        </ul>
      </div>
      <div class="card">
        <div class="section-title">On-Hand by Branch (All SKUs)</div>
        <ul class="kv-list">
          <li>
            <span>Atlanta (ATL)</span
            ><span class="kv-value val-amber">2,400</span>
          </li>
          <li>
            <span>Charlotte (CLT)</span
            ><span class="kv-value val-amber">2,900</span>
          </li>
          <li><span>Orlando (ORL)</span><span class="kv-value">4,100</span></li>
          <li>
            <span>Nashville (BNA)</span
            ><span class="kv-value val-red">900</span>
          </li>
          <li>
            <span>Jacksonville (JAX)</span><span class="kv-value">3,800</span>
          </li>
          <li class="kv-total">
            <span style="font-weight:700">Total on-hand</span
            ><span class="kv-value">14,100</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- SECTION 4: FLOW VS PROJECT DEMAND CHART -->
    <div class="card">
      <div class="section-title">
        Flow Demand vs Project-Driven Demand Spikes — Next 60 Days
      </div>
      <div class="bar-chart">
        <div class="bar-row">
          <div class="bar-label">Apr<br />W3</div>
          <div class="bar-track">
            <div class="bar-seg flow" style="width:7.5%"></div>
            <div class="bar-seg project" style="width:2%"></div>
          </div>
          <div class="bar-val">1,100</div>
        </div>
        <div class="bar-row">
          <div class="bar-label">Apr<br />W4</div>
          <div class="bar-track">
            <div class="bar-seg flow" style="width:10%"></div>
            <div class="bar-seg project" style="width:4.5%"></div>
          </div>
          <div class="bar-val">1,750</div>
        </div>
        <div class="bar-row">
          <div class="bar-label">May<br />W1</div>
          <div class="bar-track">
            <div class="bar-seg flow" style="width:11%"></div>
            <div class="bar-seg project" style="width:23%"></div>
          </div>
          <div class="bar-val">4,120</div>
        </div>
        <div class="bar-row">
          <div class="bar-label">May<br />W2</div>
          <div class="bar-track">
            <div class="bar-seg flow" style="width:11%"></div>
            <div class="bar-seg project" style="width:47%"></div>
          </div>
          <div class="bar-val">6,280</div>
        </div>
        <div class="bar-row">
          <div class="bar-label">May<br />W3</div>
          <div class="bar-track">
            <div class="bar-seg flow" style="width:10%"></div>
            <div class="bar-seg project" style="width:32%"></div>
          </div>
          <div class="bar-val">4,750</div>
        </div>
        <div class="bar-row">
          <div class="bar-label">May<br />W4</div>
          <div class="bar-track">
            <div class="bar-seg flow" style="width:8%"></div>
            <div class="bar-seg project" style="width:14%"></div>
          </div>
          <div class="bar-val">2,500</div>
        </div>
      </div>
      <div class="chart-legend">
        <div class="legend-item">
          <div class="legend-dot flow"></div>
          Flow demand
        </div>
        <div class="legend-item">
          <div class="legend-dot project"></div>
          Project-driven demand
        </div>
      </div>
    </div>

    <!-- SECTION 5: CRM PIPELINE -->
    <div class="card">
      <div class="section-title">
        CRM Pipeline — Probability-Weighted Demand
      </div>
      <table>
        <thead>
          <tr>
            <th style="width:28%">Project</th>
            <th>Stage</th>
            <th style="text-align:right">Units</th>
            <th>Close Prob</th>
            <th style="text-align:right">Exp Units</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="font-weight:500">Hartsfield Terminal C</td>
            <td>
              <span class="stage-badge stage-negotiation">Negotiation</span>
            </td>
            <td class="num" style="text-align:right">4,200</td>
            <td>
              <div class="prob-bar-wrap">
                <div class="prob-bar">
                  <div class="prob-bar-fill prob-high" style="width:95%"></div>
                </div>
                <span>95%</span>
              </div>
            </td>
            <td class="num val-bold" style="text-align:right">3,990</td>
          </tr>
          <tr>
            <td style="font-weight:500">Eastwood Commerce Pk</td>
            <td><span class="stage-badge stage-closing">Closing</span></td>
            <td class="num" style="text-align:right">3,800</td>
            <td>
              <div class="prob-bar-wrap">
                <div class="prob-bar">
                  <div class="prob-bar-fill prob-high" style="width:91%"></div>
                </div>
                <span>91%</span>
              </div>
            </td>
            <td class="num val-bold" style="text-align:right">3,458</td>
          </tr>
          <tr>
            <td style="font-weight:500">BoA Charlotte HQ</td>
            <td>
              <span class="stage-badge stage-negotiation">Negotiation</span>
            </td>
            <td class="num" style="text-align:right">3,100</td>
            <td>
              <div class="prob-bar-wrap">
                <div class="prob-bar">
                  <div class="prob-bar-fill prob-high" style="width:82%"></div>
                </div>
                <span>82%</span>
              </div>
            </td>
            <td class="num val-bold" style="text-align:right">2,542</td>
          </tr>
          <tr>
            <td style="font-weight:500">Universal Studios Exp</td>
            <td><span class="stage-badge stage-proposal">Proposal</span></td>
            <td class="num" style="text-align:right">2,900</td>
            <td>
              <div class="prob-bar-wrap">
                <div class="prob-bar">
                  <div class="prob-bar-fill prob-mid" style="width:65%"></div>
                </div>
                <span>65%</span>
              </div>
            </td>
            <td class="num val-bold" style="text-align:right">1,885</td>
          </tr>
          <tr>
            <td style="font-weight:500">Riviera Logistics Hub</td>
            <td><span class="stage-badge stage-proposal">Proposal</span></td>
            <td class="num" style="text-align:right">2,400</td>
            <td>
              <div class="prob-bar-wrap">
                <div class="prob-bar">
                  <div class="prob-bar-fill prob-mid" style="width:58%"></div>
                </div>
                <span>58%</span>
              </div>
            </td>
            <td class="num val-bold" style="text-align:right">1,392</td>
          </tr>
          <tr>
            <td style="font-weight:500">Durham Tech Campus</td>
            <td><span class="stage-badge stage-proposal">Proposal</span></td>
            <td class="num" style="text-align:right">2,200</td>
            <td>
              <div class="prob-bar-wrap">
                <div class="prob-bar">
                  <div class="prob-bar-fill prob-mid" style="width:55%"></div>
                </div>
                <span>55%</span>
              </div>
            </td>
            <td class="num val-bold" style="text-align:right">1,210</td>
          </tr>
          <tr>
            <td style="font-weight:500">Tampa Bay Convention</td>
            <td><span class="stage-badge stage-proposal">Proposal</span></td>
            <td class="num" style="text-align:right">1,900</td>
            <td>
              <div class="prob-bar-wrap">
                <div class="prob-bar">
                  <div class="prob-bar-fill prob-low" style="width:44%"></div>
                </div>
                <span>44%</span>
              </div>
            </td>
            <td class="num val-bold" style="text-align:right">836</td>
          </tr>
        </tbody>
      </table>
      <div class="pipeline-summary">
        <span>Probability-weighted total</span>
        <span class="ps-right"
          ><span class="ps-highlight">15,000</span> expected · 20,500 if all
          close</span
        >
      </div>
    </div>

    <!-- SECTION 6: MANUFACTURER RELIABILITY -->
    <div class="card">
      <div class="section-title">
        Manufacturer Reliability — Informing Order Routing and Quantity
      </div>
      <table>
        <thead>
          <tr>
            <th style="width:22%">Manufacturer</th>
            <th>Quoted Lead</th>
            <th>Avg Actual</th>
            <th>Slip</th>
            <th>On-Time Rate</th>
            <th>Reject Rate</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div class="mfr-name">MFR 2</div>
              <div class="mfr-sku">M2-2X4-WS-CCT-UNV</div>
            </td>
            <td class="num">18d</td>
            <td class="num val-amber">21d</td>
            <td class="num val-amber">+3d</td>
            <td>
              <div class="ot-bar-wrap">
                <div class="ot-bar">
                  <div class="ot-bar-fill high" style="width:81%"></div>
                </div>
                <span class="ot-pct">81%</span>
              </div>
            </td>
            <td class="num">1.8%</td>
          </tr>
          <tr>
            <td>
              <div class="mfr-name">
                MFR 1 <span class="flagged">flagged</span>
              </div>
              <div class="mfr-sku">M1-24T-WS-3CCT-DIM</div>
            </td>
            <td class="num">21d</td>
            <td class="num val-red">33d</td>
            <td class="num val-red">+12d</td>
            <td>
              <div class="ot-bar-wrap">
                <div class="ot-bar">
                  <div class="ot-bar-fill mid" style="width:58%"></div>
                </div>
                <span class="ot-pct">58%</span>
              </div>
            </td>
            <td class="num val-red">4.2%</td>
          </tr>
          <tr>
            <td>
              <div class="mfr-name">MFR 3</div>
              <div class="mfr-sku">M3-2X4-SEL-W-CCT</div>
            </td>
            <td class="num">25d</td>
            <td class="num val-green">26d</td>
            <td class="num val-green">+1d</td>
            <td>
              <div class="ot-bar-wrap">
                <div class="ot-bar">
                  <div class="ot-bar-fill high" style="width:89%"></div>
                </div>
                <span class="ot-pct">89%</span>
              </div>
            </td>
            <td class="num">0.9%</td>
          </tr>
        </tbody>
      </table>
      <div class="ai-callout">
        <strong>AI routing logic:</strong> MFR 2 is fastest and most reliable —
        routed as primary for all urgent branches. MFR 1 stock used only where
        MFR 2 capacity is exhausted, with PO quantities increased 8% to absorb
        MFR 1's reject rate. MFR 3 fills Nashville given MFR 2 commitment to ATL
        and CLT.
      </div>
    </div>

    <!-- SECTION 7: RECOMMENDED ACTIONS BY BRANCH -->
    <div class="card">
      <div class="section-title">
        Recommended Actions by Branch — Spec-Matched, Lead-Time Adjusted
      </div>
      <table>
        <colgroup>
          <col style="width:10%" />
          <col style="width:8%" />
          <col style="width:8%" />
          <col style="width:7%" />
          <col style="width:8%" />
          <col style="width:35%" />
          <col style="width:16%" />
        </colgroup>
        <thead>
          <tr>
            <th>Branch</th>
            <th style="text-align:right">On Hand</th>
            <th style="text-align:right">Demand</th>
            <th style="text-align:right">Gap</th>
            <th>Status</th>
            <th>Action</th>
            <th style="text-align:right">Execute</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div class="branch-name">Atlanta</div>
              <div class="branch-code">ATL</div>
            </td>
            <td class="num" style="text-align:right">2,400</td>
            <td class="num" style="text-align:right">8,200</td>
            <td class="num val-red" style="text-align:right">−5,800</td>
            <td><span class="badge badge-critical">Critical</span></td>
            <td>
              <div class="action-primary">PO via MFR 2 — 6,300 units</div>
              <div class="action-detail">
                M2-2X4-WS-CCT-UNV · +8% reject buffer · est. May 9
              </div>
              <div class="action-note">
                MFR 2: 81% on-time, 21d actual lead time
              </div>
            </td>
            <td style="text-align:right">
              <button
                class="btn btn-primary"
                onclick="confirmBtn(this, '✓ PO created')"
              >
                Place PO
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <div class="branch-name">Charlotte</div>
              <div class="branch-code">CLT</div>
            </td>
            <td class="num" style="text-align:right">2,900</td>
            <td class="num" style="text-align:right">5,900</td>
            <td class="num val-red" style="text-align:right">−3,000</td>
            <td><span class="badge badge-critical">Critical</span></td>
            <td>
              <div class="action-primary">
                PO 2,200 units + transfer 800 from ORL
              </div>
              <div class="action-detail">PO via MFR 2 · est. May 11</div>
              <div class="action-note">
                ORL buffer covers near-term gap while PO is in transit
              </div>
            </td>
            <td style="text-align:right">
              <div class="btn-stack">
                <button
                  class="btn btn-primary"
                  onclick="confirmBtn(this, '✓ PO created')"
                >
                  Place PO
                </button>
                <button
                  class="btn btn-outline"
                  onclick="confirmBtn(this, '✓ Transfer initiated')"
                >
                  Initiate transfer
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="branch-name">Orlando</div>
              <div class="branch-code">ORL</div>
            </td>
            <td class="num" style="text-align:right">4,100</td>
            <td class="num" style="text-align:right">3,800</td>
            <td class="num val-green" style="text-align:right">+300</td>
            <td><span class="badge badge-at-risk">At risk</span></td>
            <td>
              <div class="action-primary">
                Transfer 800 units to CLT · monitor
              </div>
              <div class="action-detail">
                Retains 3,300 — sufficient post-transfer
              </div>
              <div class="action-note">
                Minor shortfall covered by outbound transfer
              </div>
            </td>
            <td style="text-align:right">
              <button
                class="btn btn-outline"
                onclick="confirmBtn(this, '✓ Transfer initiated')"
              >
                Approve transfer
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <div class="branch-name">Nashville</div>
              <div class="branch-code">BNA</div>
            </td>
            <td class="num" style="text-align:right">900</td>
            <td class="num" style="text-align:right">2,400</td>
            <td class="num val-red" style="text-align:right">−1,500</td>
            <td><span class="badge badge-critical">Critical</span></td>
            <td>
              <div class="action-primary">PO via MFR 3 — 1,700 units</div>
              <div class="action-detail">
                M3-2X4-SEL-W-CCT · 89% on-time · est. May 15
              </div>
              <div class="action-note">
                MFR 2 capacity committed to ATL + CLT
              </div>
            </td>
            <td style="text-align:right">
              <button
                class="btn btn-primary"
                onclick="confirmBtn(this, '✓ PO created')"
              >
                Place PO
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <div class="branch-name">Jacksonville</div>
              <div class="branch-code">JAX</div>
            </td>
            <td class="num" style="text-align:right">3,800</td>
            <td class="num" style="text-align:right">1,800</td>
            <td class="num val-green" style="text-align:right">+2,000</td>
            <td><span class="badge badge-sufficient">Sufficient</span></td>
            <td>
              <div class="action-primary">No action required</div>
              <div class="action-detail">
                2,000 unit buffer · next review May 30
              </div>
            </td>
            <td style="text-align:right">
              <button class="btn btn-disabled">No action</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <script>
      function confirmBtn(btn, label) {
        if (btn.classList.contains("confirmed")) return;
        btn.className = "btn confirmed confirming";
        btn.textContent = label;
        setTimeout(function () {
          btn.classList.remove("confirming");
        }, 600);
      }
    </script>
  </body>
</html>
```
