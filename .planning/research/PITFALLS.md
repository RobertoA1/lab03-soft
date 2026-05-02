# Pitfalls

**Project:** Precision agriculture information system  
**Researched:** 2026-05-02

## Common Mistakes

| Pitfall | Warning Sign | Prevention | Phase |
|---------|--------------|------------|-------|
| Too much data, not enough action | Dashboard feels busy but users still ask what to do next | Lead with prioritized alerts and lot-level guidance | Phase 2-3 |
| Predictions without trust | Users ignore recommendations because they are opaque | Show rule trigger, signal source, and confidence/context | Phase 3 |
| Overbuilding integrations early | Project spends time on APIs/IoT before core value is proven | Stay with manual uploads and seed data in v1 | Phase 1 |
| Charts without agronomic meaning | Trend views exist but do not influence decisions | Tie every chart to a decision or comparison question | Phase 2 |
| Generic BI scope creep | Feature requests turn the app into a reporting platform | Keep the product focused on agronomist workflow | All phases |
| Auto-action risk | System starts making decisions for the user | Only recommend; never execute automatically in v1 | Phase 3 |
| Weak data validation | Seed/manual records create inconsistent results | Validate imports and normalize units/keys early | Phase 1 |
| No follow-up loop | Alerts fire, but nothing records what happened next | Add acknowledgement or status tracking when alerts arrive | Phase 3 |

## Phase Mapping

- **Phase 1** should protect data quality.
- **Phase 2** should protect usability and decision flow.
- **Phase 3** should protect trust and actionability.

## Bottom Line

The biggest risk is building a visually rich agronomy dashboard that still leaves the agronomist without a clear next action.
