# Roadmap: Sistema de Información de Agricultura de Precisión

## Phase 1: Base de datos y carga manual

**Goal:** Put the v1 data foundation in place so the agronomist can work from manual and seed inputs.

**Requirements:** DATA-01

**Success criteria:**
1. Seed/manual records can be stored for crops, lots, climate, soil, irrigation, and production.
2. The core dataset can be queried consistently by later phases.
3. The project has a stable shape for adding dashboard and alert logic.

## Phase 2: Dashboard agronómico

**Goal:** Give the agronomist an interactive view of yield, water status, and history.

**Requirements:** DASH-01, DASH-02

**Success criteria:**
1. The dashboard shows estimated yield, current water status, and early alert indicators.
2. Historical charts render for climate, soil, irrigation, and production.
3. Filters for crop, season, and lot change the visible data.
4. The dashboard reflects the currently loaded manual/seed data.

## Phase 3: Alertas y sugerencias

**Goal:** Turn the dashboard into an actionable tool with threshold alerts and predictive recommendations.

**Requirements:** ALRT-01

**Success criteria:**
1. Threshold-based alerts fire when incoming data crosses configured limits.
2. Predictive suggestions appear alongside rule-based alerts.
3. Alert messages include enough context for an agronomist to decide what to do next.

---

## Summary

| # | Phase | Goal | Requirements | Success Criteria |
|---|-------|------|--------------|------------------|
| 1 | Base de datos y carga manual | Put the v1 data foundation in place | DATA-01 | 3 |
| 2 | Dashboard agronómico | Give the agronomist an interactive view | DASH-01, DASH-02 | 4 |
| 3 | Alertas y sugerencias | Make the dashboard actionable | ALRT-01 | 3 |

All v1 requirements are covered ✓

---
*Last updated: 2026-05-02 after initialization*
