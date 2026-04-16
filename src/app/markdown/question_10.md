## High-Risk Dealer #1

### Dealer: Midwest Equipment – Chicago

**SKU:** KM-ZX210-FLTR09  
Hydraulic Filter Kit – ZX210 Excavator

### Current Metrics

- Inventory: 120 units
- Daily Demand: 5 units/day
- Supplier Lead Time: 45 days
- Forecast 60-Day Demand: 360 units

**Autonomy:**

```
Autonomy = Inventory / Daily Demand

120 / 5 = 24 days
```

## RAP (Robust Autonomy Period)

RAP measures how long inventory can withstand forecast volatility and lead time uncertainty.

For this SKU:

- Current Autonomy: 24 days
- Required Robust Autonomy (based on volatility + lead time): 65 days

## RAP Gap

RAP Gap = 24 / 65 = **0.37**

Anything below 1.0 means high risk.  
This dealer is operating at only **37% of required robustness.**

---

## High-Risk Dealer #2

### Dealer: Southern Heavy Machinery – Dallas

**SKU:** KM-PC360-HYD12  
Hydraulic Pump Assembly

### Current Metrics

- Inventory: 45 units
- Daily Demand: 2.8 units
- Lead Time: 52 days

**Autonomy:**

```
45 / 2.8 ≈ 16 days
```

### RAP Analysis

Required Robust Autonomy = 70 days (due to longer lead time)

RAP Gap = 16 / 70 = **0.23**

Extremely fragile position.

---

## Emerging Risk Dealer #3

### Dealer: Rocky Mountain Equipment – Denver

**SKU:** KM-D155-ENG04  
Engine Rebuild Kit

### Current Metrics

- Inventory: 310 units
- Daily Demand: 4 units
- Lead Time: 75 days

**Autonomy:**

```
310 / 4 = 77 days
```

### RAP

Required Robust Autonomy = 85 days

RAP Gap = 77 / 85 = **0.91**

Slightly below robustness threshold.
