# Feature Landscape

**Domain:** Precision agriculture information system for agronomists  
**Researched:** 2026-05-02

## What an Agronomist Needs Day to Day

- See which lot/crop needs attention now.
- Understand water stress and yield risk quickly.
- Compare current season vs prior periods.
- Review alerts with enough context to act.
- Record/verify field observations after a visit.

## Table Stakes

| Feature | Why Expected | V1 Fit | Notes |
|---------|--------------|--------|-------|
| Lot / crop / season registry | Core operational unit in ag work is the field block and campaign | Yes | Keep it simple; these are the primary filters everywhere |
| Manual data entry + seed data loading | v1 depends on non-integrated data | Yes | Prefer CSV/XLSX upload and seeded demo data with validation |
| Dashboard with yield, water status, and active alerts | This is the main daily decision surface | Yes | Make the “what needs attention” view the default |
| Historical charts for climate, soil, irrigation, and production | Agronomists need trend context, not just snapshots | Yes | Avoid chart overload; focus on actionable trends |
| Filters by crop, season, and lot | Essential for narrowing analysis | Yes | These are non-negotiable for real use |
| Alert center with thresholds and status | Alerts are the operational output of the system | Yes | Include acknowledge/resolve states |
| Alert explanations / rationale | Agronomists must trust why an alert fired | Yes | Show rule triggered + predictive reason + confidence |
| Lot detail drill-down | Needed to inspect signals behind a summary KPI | Yes | One page per lot with all relevant history |
| Simple comparisons across lots/seasons | Common decision pattern in agriculture | Yes | Useful for prioritization and benchmarking |
| Basic export to CSV | Users often need to share data outside the app | Maybe | Prefer CSV over PDF for v1; PDF is out of scope |

## Differentiators

| Feature | Value Proposition | V1 Fit | Notes |
|---------|-------------------|--------|-------|
| Explainable predictive suggestions | Gives next-step guidance, not just alarms | Yes | Strong differentiator if the explanation is clear and concise |
| Priority ranking of alerts/lots | Helps the agronomist decide where to go first | Yes | More useful than a long flat alert list |
| “What changed since last week?” summary | Reduces manual comparison work | Yes | Very high practical value for routine check-ins |
| Water-stress trend detection | Detects risk before it becomes visible in yield | Yes | Works well even with manual/seed data |
| Field notes linked to lots/alerts | Supports the real workflow after inspection | Yes | Light-weight record of action and outcome |
| Season-to-season benchmarking | Helps validate agronomic decisions over time | Yes | Good differentiator once enough history exists |

## Anti-Features

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| PDF reports in v1 | Adds polish but not core validation value | Use on-screen summaries + CSV export later |
| External APIs / IoT ingestion in v1 | Increases integration and reliability complexity | Start with manual uploads and seed data |
| Full n8n automation | Over-automates before workflow value is proven | Keep alerting/manual review only |
| Autonomous prescriptions / auto-actions | Risky without trusted data and validation | Provide recommendations, not automatic execution |
| Heavy ML model management UI | Not useful for agronomist users | Hide model complexity behind simple explanations |
| Real-time streaming dashboards | Unnecessary for v1’s manual-data validation | Use refreshable snapshots and historical views |
| Generic BI-style exploration | Too broad, not action-oriented | Optimize for decision and follow-up |

## Feature Dependencies

```text
Manual data model -> dashboard, filters, history views
Historical data -> trend analysis, season comparison, predictive suggestions
Explanation layer -> trust in alerts and recommendations
Alert acknowledgment -> work queue / follow-up workflow
```

## MVP Recommendation

Prioritize:
1. Manual uploads + seed data
2. Dashboard with yield / water status / alerts
3. Alert explanations and prioritization
4. Historical drill-down with season/lot filters

Defer:
- PDF reports
- External integrations
- Full automation
- Autonomous prescriptions

## Bottom Line

The product should feel like an agronomist’s daily command center: less reporting, more prioritization; less automation, more explainable action.
