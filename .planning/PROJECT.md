# Sistema de Información de Agricultura de Precisión

## What This Is

Un sistema para que un agrónomo vea en un solo lugar el estado operativo de los lotes, las métricas clave y las alertas que requieren acción. En esta primera versión, el foco está en un dashboard útil con datos cargados manualmente o desde semillas, más recomendaciones basadas en reglas y señales predictivas.

## Core Value

Ayudar al agrónomo a decidir rápido con una vista clara del rendimiento estimado, el estado hídrico y las alertas relevantes.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Cargar datos manuales y semillas para cultivos, lotes, clima, suelo, riego y producción.
- [ ] Ver un dashboard interactivo con rendimiento estimado, estado hídrico y alertas tempranas.
- [ ] Explorar históricos de clima, suelo, riego y producción con filtros por cultivo, temporada y lote.
- [ ] Recibir alertas basadas en reglas y sugerencias predictivas con explicación suficiente para actuar.

### Out of Scope

- Reportes PDF — se dejan para una versión posterior.
- Integraciones con APIs externas e IoT — v1 usa carga manual y datos semilla.
- Automatización completa con n8n — no es necesaria para validar el valor inicial.

## Context

- La idea base combina dashboard, analítica histórica, reportes, n8n y machine learning con ensemble learning.
- El usuario aclaró que la versión inicial debe priorizar el dashboard operativo y las alertas.
- El usuario principal es el agrónomo.
- Para v1, la fuente de datos será carga manual y datos semilla.
- Las alertas mezclarán reglas simples con sugerencias de modelo.

## Constraints

- **Data source**: manual uploads and seed data — keep v1 lightweight.
- **Scope**: no PDF reports, external integrations, or full automation in v1 — protect the first release from bloat.
- **Quality**: recommendations must be explainable enough for an agronomist to trust them — alerts without rationale are not useful.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Agronomist-first dashboard | This is the primary daily user and the highest-value workflow | — Pending |
| Manual/seed data for v1 | Reduces integration complexity while validating the product idea | — Pending |
| Rules + predictive suggestions for alerts | Balances immediate utility with the ML direction of the project | — Pending |
| PDF reports deferred | Keeps v1 focused on operational value | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition**:
1. Requirements invalidated? -> Move to Out of Scope with reason
2. Requirements validated? -> Move to Validated with phase reference
3. New requirements emerged? -> Add to Active
4. Decisions to log? -> Add to Key Decisions
5. What This Is still accurate? -> Update if drifted

**After each milestone**:
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-02 after initialization*
