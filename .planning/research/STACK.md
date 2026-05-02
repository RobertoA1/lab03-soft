# Technology Stack

**Project:** Precision agriculture information system  
**Researched:** 2026-05-02

## Recommended Stack

### Frontend + Backend

| Technology | Recommendation | Why | Confidence |
|------------|----------------|-----|------------|
| Next.js | Current stable App Router | One codebase is enough for v1; handles dashboard, forms, and server logic cleanly | High |
| React | 19.x | Current ecosystem baseline | High |
| TypeScript | Strict mode | Prevents data-shape bugs in analytics-heavy UI | High |
| UI | Tailwind CSS + shadcn/ui | Fast, accessible dashboard UI without design-system overhead | High |
| State/Data | TanStack Query + URL state | This app is server-state heavy; avoid Redux | High |
| Forms/Validation | React Hook Form + Zod | Best fit for manual uploads, filters, and alert rules | High |
| Charts | Apache ECharts | Better for time-series, annotations, and dense agronomic charts | Medium-High |

### Backend

| Technology | Recommendation | Why | Confidence |
|------------|----------------|-----|------------|
| App server | Next.js route handlers + server actions | v1 does not need a separate API tier | High |
| API style | REST | Easier than tRPC once Python/other clients enter the picture | High |
| Background work | Minimal scheduled jobs only when needed | Keep automation out of v1 unless it solves a real problem | High |

### Database

| Technology | Recommendation | Why | Confidence |
|------------|----------------|-----|------------|
| PostgreSQL | 17+ | Best fit for relational history, filtering, and reporting | High |
| PostGIS | Enable if lots/fields need spatial queries | Cheap insurance for agriculture data; costly to retrofit later | Medium-High |

### ORM

| Technology | Recommendation | Why | Confidence |
|------------|----------------|-----|------------|
| Prisma | Main ORM | Best TypeScript DX, migrations, and schema ergonomics | High |
| Raw SQL | For aggregates/reporting | ORM is not ideal for heavy analytical queries | High |

### ML / Runtime

| Technology | Recommendation | Why | Confidence |
|------------|----------------|-----|------------|
| Python | 3.12 | Safe, current ML ecosystem baseline | High |
| Libraries | pandas, scikit-learn, joblib; LightGBM/XGBoost if needed | Fits tabular yield/risk prediction well | High |
| Serving | Start as a library or batch worker; add FastAPI only if endpoints become necessary | v1 does not justify model-serving infrastructure | High |

### Workflow Automation

- Do not use n8n in v1.
- Use manual uploads and seed data only.
- Add cron/worker jobs only for genuine recurring tasks.
- Reintroduce n8n later when external APIs/IoT are back in scope.

### Testing

- Vitest for unit/component tests
- React Testing Library for UI behavior
- Playwright for end-to-end flows
- pytest for ML code

### Deployment

- Docker everywhere
- GitHub Actions for CI
- Managed PostgreSQL
- Container platform (Render/Fly.io/Cloud Run) for app/worker
- Use Vercel only if the app stays frontend-heavy and ML stays off the request path

## What Not to Use

| Technology | Why Not |
|------------|---------|
| Sequelize | Weaker TypeScript ergonomics and migration story than Prisma |
| tRPC | Too coupled for a Python-augmented product; REST is safer |
| GraphQL | Unnecessary complexity for v1 |
| n8n | Premature for the current scope |
| TensorFlow/PyTorch | Overkill for explainable tabular predictions |
| Kubernetes/Kafka/microservices | Ops burden with no v1 payoff |
| Redux | Unnecessary; TanStack Query + local state is enough |

## Bottom Line

Build v1 as a single TypeScript web app with Next.js, Prisma, and PostgreSQL, plus a small Python ML module for scoring. Keep the system simple, explainable, and deployment-light; postpone n8n, separate backend services, and heavy infra until the data and integration surface actually justify them.
