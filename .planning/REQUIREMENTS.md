# Requirements: Sistema de Información de Agricultura de Precisión

**Defined:** 2026-05-02
**Core Value:** Ayudar al agrónomo a decidir rápido con una vista clara del rendimiento estimado, el estado hídrico y las alertas relevantes.

## v1 Requirements

### Data

- [ ] **DATA-01**: User can load manual and seed data for crops, lots, climate, soil, irrigation, and production.

### Dashboard

- [ ] **DASH-01**: Agronomist can view an interactive dashboard with estimated yield, current water status, and early alerts.
- [ ] **DASH-02**: Agronomist can explore historical climate, soil, irrigation, and production charts filtered by crop, season, and lot.

### Alerts

- [ ] **ALRT-01**: Agronomist receives alerts driven by threshold rules and predictive suggestions with enough context to act.

## v2 Requirements

### Reporting

- **REPT-01**: User can generate PDF operational reports.
- **REPT-02**: User can generate PDF management reports with comparisons and trends.

### Integrations

- **INTG-01**: System can ingest data from external weather APIs.
- **INTG-02**: System can ingest data from IoT sensors.
- **INTG-03**: System can automate predictive model execution in n8n.
- **INTG-04**: System can trigger alerts and report generation via n8n workflows.

### ML Platform

- **ML-01**: System can run a full ensemble-learning prediction pipeline for yield and irrigation optimization.

## Out of Scope

| Feature | Reason |
|---------|--------|
| PDF reports | Deferred until the operational core proves value |
| External weather APIs | v1 uses manual and seed data only |
| IoT sensor ingestion | v1 avoids live integration complexity |
| n8n automation | Not needed to validate the first release |
| Full ML training pipeline | v1 only needs useful predictive suggestions |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| DATA-01 | Phase 1 | Pending |
| DASH-01 | Phase 2 | Pending |
| DASH-02 | Phase 2 | Pending |
| ALRT-01 | Phase 3 | Pending |

**Coverage:**
- v1 requirements: 4 total
- Mapped to phases: 4
- Unmapped: 0 ✓

---
*Requirements defined: 2026-05-02*
*Last updated: 2026-05-02 after initialization*
