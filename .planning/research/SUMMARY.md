# Research Summary

**Project:** Precision agriculture information system  
**Researched:** 2026-05-02

## Key Decisions

- Build v1 as a simple agronomist-first dashboard, not a reporting or automation platform.
- Use manual uploads and seed data to validate the workflow before live integrations.
- Make alerts explainable and actionable, combining threshold rules with predictive suggestions.
- Defer PDF reports, external APIs, IoT ingestion, and full n8n automation.

## Stack Summary

- Next.js + React + TypeScript
- Tailwind CSS + shadcn/ui
- PostgreSQL
- Prisma
- Python 3.12 with scikit-learn-style tabular ML
- Vitest, RTL, Playwright, pytest

## Feature Summary

- Table stakes: registries, manual loading, dashboard, trends, filters, alerts, drill-downs.
- Differentiators: prioritization, explainable suggestions, “what changed” summaries, benchmarking.
- Anti-features: PDFs, live integrations, automation, autonomous actions, heavy BI scope.

## Architecture Summary

- Ingest and normalize data first.
- Store everything in a relational model.
- Query history for dashboard and alert inputs.
- Keep prediction logic narrow and explainable.

## Pitfalls Summary

- Do not confuse charts with decisions.
- Do not launch integrations before the core workflow works.
- Do not hide why an alert fired.
- Do not let the product drift into generic BI.
