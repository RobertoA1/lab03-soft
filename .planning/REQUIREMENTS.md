# Requirements: Sistema de Información de Agricultura de Precisión

**Defined:** 2026-05-02
**Core Value:** Ayudar al agrónomo a decidir rápido con una vista clara del rendimiento estimado, el estado hídrico y las alertas relevantes.

## v1 Requirements (COMPLETE)

### Data

- [x] **DATA-01**: User can load manual and seed data for crops, lots, climate, soil, irrigation, and production.

### Dashboard

- [x] **DASH-01**: Agronomist can view an interactive dashboard with estimated yield, current water status, and early alerts.
- [x] **DASH-02**: Agronomist can explore historical climate, soil, irrigation, and production charts filtered by crop, season, and lot.

### Alerts

- [x] **ALRT-01**: Agronomist receives alerts driven by threshold rules and predictive suggestions with enough context to act.

## v1.1 Requirements

### Authentication & Authorization

- [ ] **AUTH-01**: Frontend routes protected — redirect to /login if no valid JWT.
- [ ] **AUTH-02**: Backend tRPC endpoints protected — reject calls without valid JWT (authedProcedure).

### Real-Time Alerts & n8n

- [ ] **ALRT-02**: Webhook endpoint `POST /webhooks/n8n/alertas` for n8n to push alerts into the backend.
- [ ] **ALRT-03**: Real-time alert delivery to frontend via SSE or polling (live notification badge).

### ML Integration

- [ ] **ML-01**: Backend calls Python ML service (FastAPI) for ensemble predictions instead of rule-based stubs.
- [ ] **ML-02**: Python service implements ensemble learning (VotingRegressor) for yield prediction.

## v2 Requirements (Future)

### Reporting

- **REPT-01**: User can generate PDF operational reports.
- **REPT-02**: User can generate PDF management reports with comparisons and trends.

### Integrations

- **INTG-01**: System can ingest data from external weather APIs.
- **INTG-02**: System can ingest data from IoT sensors.
- **INTG-03**: System can automate predictive model execution in n8n.
- **INTG-04**: System can trigger alerts and report generation via n8n workflows.

## Out of Scope

| Feature | Reason |
|---------|--------|
| External weather APIs | v1.1 still uses manual/seed data |
| IoT sensor ingestion | v1.1 avoids live integration complexity |
| Autonomous prescriptions | Only recommendations, never automatic execution |
| Full n8n orchestration | Webhook inbound only; no outbound automation yet |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| DATA-01 | Phase 1 | Complete |
| DASH-01 | Phase 2 | Complete |
| DASH-02 | Phase 2 | Complete |
| ALRT-01 | Phase 3 | Complete |
| AUTH-01 | v1.1 | Pending |
| AUTH-02 | v1.1 | Pending |
| ALRT-02 | v1.1 | Pending |
| ALRT-03 | v1.1 | Pending |
| ML-01 | v1.1 | Pending |
| ML-02 | v1.1 | Pending |

**Coverage:**
- v1 requirements: 4 total — 4 complete ✓
- v1.1 requirements: 6 total — 6 pending
- v2 requirements: 6 total — future

---
*Requirements defined: 2026-05-02*
*Last updated: 2026-05-02 after initialization*
