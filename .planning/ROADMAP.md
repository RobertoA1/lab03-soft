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

## Phase 4: Autenticación completa (v1.1)

**Goal:** Close the authentication gap — frontend routes and backend endpoints require valid JWT.

**Requirements:** AUTH-01, AUTH-02

**Success criteria:**
1. Unauthenticated users hitting any app route are redirected to /login.
2. tRPC endpoints reject calls without a valid Bearer token.
3. Login, register, and logout flows work end-to-end.

## Phase 5: Alertas en tiempo real y n8n (v1.1)

**Goal:** Enable external systems (n8n) to push alerts into the backend and deliver them to the frontend in real time.

**Requirements:** ALRT-02, ALRT-03

**Success criteria:**
1. `POST /webhooks/n8n/alertas` accepts alert payloads and persists them.
2. Frontend notification badge updates without page refresh (SSE or polling).
3. Existing alert CRUD remains functional.

## Phase 6: Ensemble Learning integration (v1.1)

**Goal:** Replace rule-based prediction stubs with a real ML ensemble pipeline.

**Requirements:** ML-01, ML-02

**Success criteria:**
1. Backend calls the Python ML service over HTTP for predictions.
2. Python service uses a VotingRegressor (ensemble) instead of hand-tuned rules.
3. Dashboard still shows estimated yield with confidence and factor explanations.

## Summary

| # | Phase | Goal | Requirements | Success Criteria |
|---|-------|------|--------------|------------------|
| 1 | Base de datos y carga manual | Put the v1 data foundation in place | DATA-01 | 3 |
| 2 | Dashboard agronómico | Give the agronomist an interactive view | DASH-01, DASH-02 | 4 |
| 3 | Alertas y sugerencias | Make the dashboard actionable | ALRT-01 | 3 |
| 4 | Autenticación completa | Protect frontend and backend with JWT | AUTH-01, AUTH-02 | 3 |
| 5 | Alertas real-time + n8n | Enable external alert ingestion and live push | ALRT-02, ALRT-03 | 3 |
| 6 | Ensemble Learning | Wire real ML ensemble into predictions | ML-01, ML-02 | 3 |

v1: 3 phases complete ✓ | v1.1: 3 phases pending

---
*Last updated: 2026-05-03 for v1.1 planning*
