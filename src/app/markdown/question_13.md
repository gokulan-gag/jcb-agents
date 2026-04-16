```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Project Alpha — Dashboard</title>
    <style>
      *,
      *::before,
      *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        color: #1a1a1a;
      }
      .container {
        width: 100%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      /* ── Alert Banner ── */
      .alert-banner {
        background: #fef9e7;
        border: 1px solid #f0dfa0;
        border-radius: 10px;
        padding: 16px 20px;
        display: flex;
        align-items: flex-start;
        gap: 12px;
        line-height: 1.55;
        font-size: 14px;
      }
      .alert-icon {
        width: 26px;
        height: 26px;
        flex-shrink: 0;
        background: #e6a817;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-weight: 700;
        font-size: 15px;
        margin-top: 1px;
      }
      .alert-banner b {
        font-weight: 600;
      }

      /* ── Card ── */
      .card {
        background: #fff;
        border: 0.5px solid rgba(0, 0, 0, 0.12);
        border-radius: 10px;
        padding: 20px 24px;
      }
      .card-title {
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.07em;
        text-transform: uppercase;
        color: #6b6b68;
        margin-bottom: 16px;
      }

      /* ── Two-column row ── */
      .row-2 {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
      }

      /* ── Key-value table ── */
      .kv-table {
        width: 100%;
        border-collapse: collapse;
      }
      .kv-table td {
        padding: 7px 0;
        font-size: 13.5px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        vertical-align: top;
      }
      .kv-table tr:last-child td {
        border-bottom: none;
      }
      .kv-table td:first-child {
        color: #4a4a4a;
        padding-right: 16px;
      }
      .kv-table td:last-child {
        text-align: right;
        font-weight: 500;
      }

      .badge {
        display: inline-block;
        font-size: 10px;
        font-weight: 600;
        padding: 2px 8px;
        border-radius: 4px;
        vertical-align: middle;
        margin-left: 6px;
      }
      .badge-red {
        background: #fce4e4;
        color: #a02e2e;
      }

      .text-red {
        color: #b91c1c;
      }
      .text-orange {
        color: #92400e;
      }
      .text-amber {
        color: #a16207;
      }
      .text-dark-red {
        color: #7f1d1d;
      }
      .text-green-dark {
        color: #166534;
      }

      /* ── Financial Impact ── */
      .fi-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
      }
      .fi-box {
        border-radius: 8px;
        padding: 18px 20px;
        border: 1px solid;
      }
      .fi-box-red {
        background: #fef2f2;
        border-color: #f5c6c6;
      }
      .fi-box-green {
        background: #f0fdf4;
        border-color: #bbf7d0;
      }
      .fi-box-title {
        font-size: 10.5px;
        font-weight: 600;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        margin-bottom: 8px;
      }
      .fi-box-red .fi-box-title {
        color: #92400e;
      }
      .fi-box-green .fi-box-title {
        color: #166534;
      }
      .fi-amount {
        font-size: 28px;
        font-weight: 700;
        margin-bottom: 12px;
      }
      .fi-box-red .fi-amount {
        color: #991b1b;
      }
      .fi-box-green .fi-amount {
        color: #1a1a1a;
      }
      .fi-line {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
        padding: 3px 0;
      }
      .fi-line-label {
        color: #4a4a4a;
      }
      .fi-line-value {
        font-weight: 500;
      }
      .fi-divider {
        border: none;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        margin: 8px 0;
      }
      .fi-total .fi-line-label {
        font-weight: 600;
      }
      .fi-total .fi-line-value {
        font-weight: 700;
      }
      .fi-box-red .fi-total .fi-line-label,
      .fi-box-red .fi-total .fi-line-value {
        color: #991b1b;
      }
      .fi-box-green .fi-total .fi-line-label,
      .fi-box-green .fi-total .fi-line-value {
        color: #166534;
      }
      .fi-footnote {
        font-size: 12px;
        color: #6b6b68;
        padding-top: 4px;
      }

      /* ── Net savings bar ── */
      .net-bar {
        background: #f9fafb;
        border: 0.5px solid rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        padding: 14px 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
      }
      .net-bar-amount {
        font-size: 18px;
        font-weight: 700;
        color: #166534;
      }

      /* ── Schedule View ── */
      .tl-bars {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .tl-row {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .tl-row-label {
        font-size: 11px;
        color: #6b6b68;
        width: 90px;
        flex-shrink: 0;
        text-align: right;
        white-space: nowrap;
      }
      .tl-row-track {
        flex: 1;
        position: relative;
        height: 22px;
      }
      .tl-seg {
        position: absolute;
        top: 0;
        height: 22px;
        border-radius: 3px;
        display: flex;
        align-items: center;
        overflow: hidden;
      }
      .tl-seg-label {
        font-size: 10px;
        font-weight: 500;
        white-space: nowrap;
        padding: 0 6px;
      }
      .tl-today {
        position: absolute;
        top: -4px;
        bottom: -4px;
        width: 1.5px;
        background: #6b6b68;
        opacity: 0.35;
      }
      .tl-legend {
        display: flex;
        gap: 14px;
        margin-top: 10px;
        flex-wrap: wrap;
      }
      .tl-legend span {
        font-size: 10px;
        color: #6b6b68;
        display: flex;
        align-items: center;
        gap: 5px;
      }
      .tl-legend i {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 2px;
        flex-shrink: 0;
      }
      .tab-btn {
        font-family: inherit;
        font-size: 11px;
        font-weight: 500;
        padding: 5px 14px;
        border-radius: 8px;
        border: 0.5px solid rgba(0, 0, 0, 0.2);
        background: #fff;
        color: #1a1a1a;
        cursor: pointer;
        transition:
          background 0.12s,
          color 0.12s;
      }
      .tab-btn:hover {
        background: #f5f5f3;
      }
      .tab-btn.active {
        background: #0c447c;
        color: #e6f1fb;
        border-color: #0c447c;
      }
      .tab-btn.active:hover {
        background: #042c53;
      }

      /* ── Alternate SKUs ── */
      .sku-row {
        display: flex;
        align-items: center;
        padding: 14px 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        gap: 12px;
      }
      .sku-row:last-child {
        border-bottom: none;
      }
      .sku-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        flex-shrink: 0;
      }
      .sku-info {
        flex: 1;
      }
      .sku-name {
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 2px;
      }
      .sku-sub {
        font-size: 12px;
        color: #6b6b68;
      }
      .sku-right {
        text-align: right;
        flex-shrink: 0;
      }
      .sku-stock {
        font-size: 14px;
        font-weight: 600;
      }
      .sku-stock-red {
        color: #b91c1c;
      }
      .sku-stock-green {
        color: #166534;
      }
      .sku-detail {
        font-size: 11px;
        color: #6b6b68;
      }

      /* ── Execute Decision ── */
      .exec-title {
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.07em;
        text-transform: uppercase;
        color: #6b6b68;
        margin-bottom: 12px;
      }
      .exec-header {
        display: grid;
        grid-template-columns: 2fr 1fr 2fr 1.2fr;
        gap: 12px;
        padding: 0 0 8px 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        margin-bottom: 4px;
      }
      .exec-header span {
        font-size: 10px;
        font-weight: 600;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: #6b6b68;
      }
      .exec-row {
        display: grid;
        grid-template-columns: 2fr 1fr 2fr 1.2fr;
        gap: 12px;
        align-items: center;
        padding: 14px 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      }
      .exec-row:last-child {
        border-bottom: none;
      }
      .exec-action-name {
        font-size: 13.5px;
        font-weight: 600;
      }
      .exec-action-sub {
        font-size: 11.5px;
        color: #6b6b68;
        margin-top: 1px;
      }
      .exec-badge {
        display: inline-block;
        font-size: 10.5px;
        font-weight: 500;
        padding: 3px 10px;
        border-radius: 5px;
      }
      .exec-badge-blue {
        background: #EAF3DE;
        color: #27500A;
      }
      .exec-badge-amber {
        background: #FAEEDA;
        color: #633806;
      }
      .exec-impact-main {
        font-size: 13px;
        font-weight: 500;
      }
      .exec-impact-sub {
        font-size: 11.5px;
        color: #6b6b68;
        margin-top: 1px;
      }

      /* ── Execute Buttons with smooth confirmed state ── */
      .exec-btn {
        font-family: inherit;
        font-size: 12px;
        font-weight: 500;
        padding: 8px 18px;
        border-radius: 8px;
        cursor: pointer;
        min-width: 170px;
        text-align: center;
        transition:
          background 0.4s ease,
          color 0.4s ease,
          border-color 0.4s ease,
          box-shadow 0.3s ease;
        position: relative;
        overflow: hidden;
      }
      .exec-btn-primary {
        background: #0c447c;
        color: #fff;
        border: 1px solid #0c447c;
      }
      .exec-btn-primary:hover {
        background: #042c53;
        border-color: #042c53;
      }
      .exec-btn-outline {
        background: #fff;
        color: #1a1a1a;
        border: 1px solid rgba(0, 0, 0, 0.2);
      }
      .exec-btn-outline:hover {
        background: #f5f5f3;
      }

      .exec-btn-blue-outline {
        background: #ffffff;
        color: #0C447C;
        border: 1px solid #85B7EB;
      }
      .exec-btn-blue-outline:hover {
        background: #e8f5fc;
      }

      /* Confirmed green state */
      .exec-btn.confirmed {
        background: #f0fdf4;
        color: #166534;
        border: 1px solid #bbf7d0;
        cursor: default;
        font-weight: 600;
        box-shadow: 0 0 0 0 rgba(22, 101, 52, 0);
      }
      .exec-btn.confirmed:hover {
        background: #f0fdf4;
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
      .exec-btn.confirming {
        animation: confirmPulse 0.6s ease-out;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <!-- ═══════════ 1. ALERT BANNER ═══════════ -->
      <div class="alert-banner">
        <div class="alert-icon">!</div>
        <div>
          <b>Project Alpha is at risk of a 5-day delay</b> — MFR 1 ESD slipped
          from May 12 to May 17, leaving 6 crew members idle for 3 days and
          pushing completion to May 26. Total financial exposure: $21,760.
        </div>
      </div>

      <!-- ═══════════ 2. ESD CHANGE + SCHEDULE IMPACT ═══════════ -->
      <div class="row-2">
        <div class="card">
          <div class="card-title">ESD Change — What Happened</div>
          <table class="kv-table">
            <tr>
              <td>Spec</td>
              <td>LED 2×4, 30/35/40W, 35K/40K/50K</td>
            </tr>
            <tr>
              <td>Supplier</td>
              <td>MFR 1 <span class="badge badge-red">ESD slipped</span></td>
            </tr>
            <tr>
              <td>Original ESD</td>
              <td>May 12</td>
            </tr>
            <tr>
              <td>Updated ESD</td>
              <td class="text-orange">May 17 (+5 days)</td>
            </tr>
            <tr>
              <td>Units affected</td>
              <td>2,800 units</td>
            </tr>
            <tr>
              <td>Reason given</td>
              <td class="text-amber">Component shortage</td>
            </tr>
          </table>
        </div>
        <div class="card">
          <div class="card-title">Schedule Impact</div>
          <table class="kv-table">
            <tr>
              <td>Crew mobilisation</td>
              <td>May 13 — 6 electricians</td>
            </tr>
            <tr>
              <td>Material now arrives</td>
              <td class="text-red">May 17 — 4 days late</td>
            </tr>
            <tr>
              <td>Idle crew</td>
              <td class="text-red">3 days · 6 electricians</td>
            </tr>
            <tr>
              <td>Ceiling grid ready, fixtures missing</td>
              <td class="text-amber">May 13–16 at risk</td>
            </tr>
            <tr>
              <td>Commissioning + punch list</td>
              <td class="text-amber">
              Pushed — owner walkthrough at risk</b>
              </td>
            </tr>
            <tr>
              <td>Project completion</td>
              <td class="text-red">May 21 → May 26</td>
            </tr>
          </table>
        </div>
      </div>

      <!-- ═══════════ 3. FINANCIAL IMPACT ═══════════ -->
      <div class="card">
        <div class="card-title">
          Financial Impact — Do Nothing vs Substitute
        </div>
        <div class="fi-grid">
          <div class="fi-box fi-box-red">
            <div class="fi-box-title">Option 2 — Wait for MFR 1</div>
            <div class="fi-amount">$21,760</div>
            <div class="fi-line">
              <span class="fi-line-label"
                >Idle crew · 3 days · 6 electricians</span
              ><span class="fi-line-value">$18,400</span>
            </div>
            <div class="fi-line">
              <span class="fi-line-label">Project delay penalty (contract)</span
              ><span class="fi-line-value">$2,100</span>
            </div>
            <div class="fi-line">
              <span class="fi-line-label">Remobilisation cost</span
              ><span class="fi-line-value">$1,260</span>
            </div>
            <hr class="fi-divider" />
            <div class="fi-line fi-total">
              <span class="fi-line-label">Total loss</span
              ><span class="fi-line-value">$21,760</span>
            </div>
            <div class="fi-line fi-footnote">
              <span>Material cost delta</span><span>$0</span>
            </div>
          </div>
          <div class="fi-box fi-box-green">
            <div class="fi-box-title">Option 1 — Substitute MFR 2</div>
            <div class="fi-amount">$3,360</div>
            <div class="fi-line">
              <span class="fi-line-label">Idle crew cost</span
              ><span class="fi-line-value">$0</span>
            </div>
            <div class="fi-line">
              <span class="fi-line-label">Delay penalty</span
              ><span class="fi-line-value">$0</span>
            </div>
            <div class="fi-line">
              <span class="fi-line-label">Remobilisation</span
              ><span class="fi-line-value">$0</span>
            </div>
            <hr class="fi-divider" />
            <div class="fi-line fi-total">
              <span class="fi-line-label">Total loss</span
              ><span class="fi-line-value">$0</span>
            </div>
            <div class="fi-line fi-footnote">
              <span>Material cost premium</span><span>+$3,360</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ═══════════ 4. NET SAVINGS BAR ═══════════ -->
      <div class="net-bar">
        <span>Net savings by approving substitute today</span>
        <span class="net-bar-amount">Save $18,400</span>
      </div>

      <!-- ═══════════ 5. SCHEDULE VIEW ═══════════ -->
      <div class="card">
        <div class="card-title">Project Alpha — Schedule View</div>
        <div style="display:flex;gap:8px;margin-bottom:10px;">
          <button class="tab-btn active" id="tb1" onclick="showTab(1)">
            Current — delayed
          </button>
          <button class="tab-btn" id="tb2" onclick="showTab(2)">
            If substitute approved
          </button>
        </div>
        <div id="tl1"></div>
        <div id="tl2" style="display:none"></div>
        <div class="tl-legend">
          <span><i style="background:#B5D4F4;"></i>On track</span>
          <span><i style="background:#F09595;"></i>Idle — no material</span>
          <span><i style="background:#FAC775;"></i>Delayed</span>
          <span><i style="background:#C0DD97;"></i>Resolved (substitute)</span>
        </div>
      </div>

      <!-- ═══════════ 6. ALTERNATE SKUS ═══════════ -->
      <div class="card">
        <div class="card-title">Alternate SKUs — Same Spec, Available Now</div>
        <div class="sku-row">
          <div class="sku-dot" style="background:#c0392b;"></div>
          <div class="sku-info">
            <div class="sku-name">MFR 1 — original order</div>
            <div class="sku-sub">
              LED 2×4 WS/CCT · ESD slipped · component shortage
            </div>
          </div>
          <div class="sku-right">
            <div class="sku-stock sku-stock-red">Arrives May 17</div>
            <div class="sku-detail">Too late for install window</div>
          </div>
        </div>
        <div class="sku-row">
          <div class="sku-dot" style="background:#27ae60;"></div>
          <div class="sku-info">
            <div class="sku-name">MFR 2 — Atlanta branch</div>
            <div class="sku-sub">
              Same spec · field-selectable W + CCT · interchangeable · no
              re-submittal
            </div>
          </div>
          <div class="sku-right">
            <div class="sku-stock sku-stock-green">3,200 in stock</div>
            <div class="sku-detail">
              Ships today · +$1.20/unit (+$3,360 total)
            </div>
          </div>
        </div>
        <div class="sku-row">
          <div class="sku-dot" style="background:#2980b9;"></div>
          <div class="sku-info">
            <div class="sku-name">MFR 3 — Charlotte branch</div>
            <div class="sku-sub">
              Same spec · field-selectable W + CCT · interchangeable · no
              re-submittal
            </div>
          </div>
          <div class="sku-right">
            <div class="sku-stock sku-stock-green">1,800 in stock</div>
            <div class="sku-detail">
              Ships today · +$3.00/unit (+$8,400 total)
            </div>
          </div>
        </div>
      </div>

      <!-- ═══════════ 7. EXECUTE DECISION ═══════════ -->
      <div style="padding: 0 4px;">
        <div class="exec-title">Execute Decision</div>
        <div class="exec-header">
          <span>Action</span>
          <span>For</span>
          <span>Financial Impact</span>
          <span>Execute</span>
        </div>
        <div class="exec-row">
          <div>
            <div class="exec-action-name">Approve MFR 2 substitute</div>
            <div class="exec-action-sub">
              2,800 units · ships today from ATL
            </div>
          </div>
          <div><span class="exec-badge exec-badge-blue">Option 1</span></div>
          <div>
            <div class="exec-impact-main" style="color:#166534;">
              Saves $18,400
            </div>
            <div class="exec-impact-sub">
              $3,360 material premium vs $21,760 loss
            </div>
          </div>
          <div>
            <button
              class="exec-btn exec-btn-primary"
              onclick="confirmBtn(this, '✓ Substitute approved')"
            >
              Approve substitute
            </button>
          </div>
        </div>
        <div class="exec-row">
          <div>
            <div class="exec-action-name">Reassign crew to Project Beta</div>
            <div class="exec-action-sub">May 13–15 · 6 electricians</div>
          </div>
          <div><span class="exec-badge exec-badge-amber">Option 2</span></div>
          <div>
            <div class="exec-impact-main" style="color:#b91c1c;">
              $21,760 loss
            </div>
            <div class="exec-impact-sub">Idle + penalty + remobilisation</div>
          </div>
          <div>
            <button
              class="exec-btn exec-btn-blue-outline"
              onclick="confirmBtn(this, '✓ Schedule updated')"
            >
              Adjust schedule
            </button>
          </div>
        </div>
        <div class="exec-row">
          <div>
            <div class="exec-action-name">Enable MFR 1 ESD tracking</div>
            <div class="exec-action-sub">
              Auto-alert on next slip · this SKU
            </div>
          </div>
          <div><span class="exec-badge exec-badge-amber">Either</span></div>
          <div>
            <div class="exec-impact-sub">
              Earlier warning — more time to act
            </div>
          </div>
          <div>
            <button
              class="exec-btn exec-btn-outline"
              onclick="confirmBtn(this, '✓ Tracking enabled')"
            >
              Enable tracking
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ═══════════ SCRIPTS ═══════════ -->
    <script>
      /* ── Gantt Chart ── */
      var totalDays = 26;
      var rows = [
        {
          label: "Material",
          segs: [
            { s: 1, e: 12, c: "#B5D4F4", t: "MFR 1 in transit" },
            { s: 12, e: 17, c: "#F09595", t: "ESD slipped +5d" },
          ],
        },
        {
          label: "Ceiling grid",
          segs: [{ s: 6, e: 13, c: "#B5D4F4", t: "Grid install" }],
        },
        {
          label: "Fixture install",
          segs: [
            { s: 13, e: 17, c: "#F09595", t: "Crew idle — no fixtures" },
            { s: 17, e: 22, c: "#FAC775", t: "Delayed install" },
          ],
        },
        {
          label: "Circuit / controls",
          segs: [{ s: 18, e: 24, c: "#FAC775", t: "Pushed" }],
        },
        {
          label: "Punch list",
          segs: [{ s: 23, e: 26, c: "#FAC775", t: "Delayed closeout" }],
        },
      ];
      var altRows = [
        {
          label: "Material",
          segs: [
            { s: 1, e: 12, c: "#B5D4F4", t: "MFR 1 in transit" },
            { s: 10, e: 13, c: "#C0DD97", t: "MFR 2 ships" },
          ],
        },
        {
          label: "Ceiling grid",
          segs: [{ s: 6, e: 13, c: "#B5D4F4", t: "Grid install" }],
        },
        {
          label: "Fixture install",
          segs: [{ s: 13, e: 18, c: "#C0DD97", t: "On schedule" }],
        },
        {
          label: "Circuit / controls",
          segs: [{ s: 16, e: 21, c: "#B5D4F4", t: "On schedule" }],
        },
        {
          label: "Punch list",
          segs: [{ s: 20, e: 22, c: "#C0DD97", t: "On schedule" }],
        },
      ];
      var textColor = {
        "#F09595": "#791F1F",
        "#FAC775": "#633806",
        "#C0DD97": "#27500A",
        "#B5D4F4": "#0C447C",
      };

      function buildTl(data, containerId) {
        var h = '<div class="tl-bars">';
        data.forEach(function (r) {
          h +=
            '<div class="tl-row"><div class="tl-row-label">' +
            r.label +
            '</div><div class="tl-row-track">';
          r.segs.forEach(function (s) {
            var l = (((s.s - 1) / totalDays) * 100).toFixed(1) + "%";
            var w = (((s.e - s.s) / totalDays) * 100).toFixed(1) + "%";
            h +=
              '<div class="tl-seg" style="left:' +
              l +
              ";width:" +
              w +
              ";background:" +
              s.c +
              ';"><span class="tl-seg-label" style="color:' +
              (textColor[s.c] || "#0C447C") +
              '">' +
              s.t +
              "</span></div>";
          });
          h +=
            '<div class="tl-today" style="left:' +
            ((12 / totalDays) * 100).toFixed(1) +
            '%"></div>';
          h += "</div></div>";
        });
        h += "</div>";
        h +=
          '<div style="display:flex;margin:4px 0 0 100px;position:relative;height:14px;">';
        [1, 5, 9, 13, 17, 21, 25].forEach(function (d) {
          h +=
            '<span style="position:absolute;left:' +
            (((d - 1) / totalDays) * 100).toFixed(1) +
            '%;font-size:9px;color:#6b6b68;transform:translateX(-50%)">May ' +
            d +
            "</span>";
        });
        h += "</div>";
        document.getElementById(containerId).innerHTML = h;
      }

      buildTl(rows, "tl1");
      buildTl(altRows, "tl2");

      function showTab(n) {
        document.getElementById("tl1").style.display =
          n === 1 ? "block" : "none";
        document.getElementById("tl2").style.display =
          n === 2 ? "block" : "none";
        document.getElementById("tb1").className =
          "tab-btn" + (n === 1 ? " active" : "");
        document.getElementById("tb2").className =
          "tab-btn" + (n === 2 ? " active" : "");
      }

      /* ── Button confirm handler ── */
      function confirmBtn(btn, label) {
        if (btn.classList.contains("confirmed")) return;

        // Remove any existing style classes and add confirmed
        btn.className = "exec-btn confirmed confirming";
        btn.textContent = label;

        // Remove the pulse animation class after it plays
        setTimeout(function () {
          btn.classList.remove("confirming");
        }, 600);
      }
    </script>
  </body>
</html>
```
