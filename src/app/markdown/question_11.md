## Overstocked Dealer #1

### Dealer: Pacific Heavy Equipment – Seattle

**SKU:** KM-PC360-TRN08  
Transmission Assembly – PC360

## Current Metrics

- Inventory: 420 units
- Daily Demand: 2 units/day
- Autonomy:
    ```
    Autonomy = Inventory / Daily Demand

    420 / 2 = 210 days
    ```

**Target Robust Autonomy (RAP Requirement)**

- Required Robust Autonomy: 90 days

- Current RAP Ratio:  
   ```
   210 / 90 = 2.33  
   ```

Meaning: Dealer has **2.3× more inventory than needed for robustness.**

**PAR Score:**

- Current PAR: 99%
- Target PAR: 95%

Inventory is excessively safe — but inefficient.

---

### Working Capital Impact

- Unit Cost: $4,800

- Excess Inventory (above 90 days):

  ```
  Required units = 2 × 90 = 180 units
  Current = 420 units
  Excess = 240 units
  ```

- Working Capital Locked:  
  240 × $4,800 = **$1.15M tied up**

---

## Understocked Dealer (Swap Candidate)

### Dealer: Spokane Heavy Machinery – Spokane

**Same SKU:** KM-PC360-TRN08

- Inventory: **65 units**
- Daily Demand: **3 units/day**
- Autonomy: **21 days**
- Required Robust Autonomy: **95 days**

**RAP:**

```
21 / 95 = 0.22
```

**PAR:**

- Current PAR: **54%**

High probability of disruption.

---

## Swap Opportunity Analysis

If we transfer **120 units** from Seattle → Spokane:

### Seattle After Swap

- New Inventory: 300 units  
- Autonomy: 150 days  
- RAP: 1.67  
- PAR: 97%
- Still healthy

### Spokane After Swap

- New Inventory: 185 units  
- Autonomy: 61 days  
- RAP: 0.64  
- PAR improves to: 82%

**This swap:**

- Reduces working capital inefficiency
- Increases revenue protection
- Avoids emergency production
- Improves network balance

---

# Overstocked Dealer #2

**Dealer:** Midwest Equipment – Chicago  
**SKU:** KM-ZX210-ENG04 — Engine Overhaul Kit (ZX210)

**Current Metrics (Chicago)**  
- Inventory: **310 units**  
- Avg Daily Demand: **1.2 units/day**
- Autonomy Calculation: 310 / 1.2 ≈ **258 days**
- Required Robust Autonomy (RAP target): **120 days**  
- RAP Ratio: 258 / 120 = **2.15** (significant excess)  
- PAR: **99.5%** (very safe, but inefficient)

---

## Excess Units + Working Capital Tied Up

**Required units for robust coverage:**  
- 1.2 × 120 = 144 units

**Excess:**  
- 310 − 144 = 166 units

**Unit Cost (assumed):** $3,200

**Working Capital Tied Up:**  
- 166 × $3,200 = **$531,200**

---

## Swap Candidate Dealer (Understocked)

### Dealer: Northeast Construction Supply – Newark  
**SKU:** KM-ZX210-ENG04

**Current Metrics (Newark)**  
- Inventory: **38 units**  
- Avg Daily Demand: **1.6 units/day**
- Autonomy: 38 / 1.6 ≈ **24 days**
- Required Robust Autonomy (RAP target): **110 days**  
- RAP Ratio: 24 / 110 = **0.22** (fragile)  
- PAR: **49%** (high probability of stockout disruption)

**Why Newark is Understocked**

- Higher service activity (more rebuild jobs)
- 2 large customer fleet maintenance contracts starting next month
- Demand volatility is higher → needs stronger robust buffer

---

## Recommended Swap Plan

**Transfer:** 100 units of KM-ZX210-ENG04 from Chicago → Newark

### Chicago After Swap

- New Inventory: **210 units**  
- Autonomy: 210 / 1.2 ≈ **175 days** 
- RAP Ratio: 175 / 120 = **1.46**  
- PAR: drops slightly but still strong: **~97%**

Chicago remains healthy (still above robust threshold) and reduces excess carrying.

### Newark After Swap

- New Inventory: **138 units**  
- Autonomy: 138 / 1.6 ≈ **86 days**  
- RAP Ratio: 86 / 110 = **0.78**  
- PAR: improves significantly: **~82%**

Newark moves from “likely stockout” to “much safer,” and service revenue risk is reduced.
