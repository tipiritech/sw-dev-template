# Infrastructure Doctrine

**Version:** 1.0
**Last updated:** 2026-04-24

This document defines infrastructure choices and the reasoning behind them.

## Vendor selection

**[NARRATE]**

| Layer | Vendor | Rationale |
|---|---|---|
| Hosting / CI/CD | Vercel | Next.js-native; edge functions; generous free tier |
| Database / Auth | Supabase | Postgres with managed auth; open-source fallback path |
| Object storage | Cloudflare R2 | Egress-free; S3-compatible for portability |
| LLM (chat, narration) | Anthropic Claude | Quality for grounded retrieval; prompt caching |
| AI voice | OpenAI TTS | Quality/cost trade-off at target price point |
| Voice cloning | ElevenLabs | Team tier only; gated behind tier price |
| Billing | Stripe | Standard bootstrap choice |
| Email | Resend (or Postmark) | Transactional only, not marketing |
| Error tracking | Sentry | Free tier sufficient for launch window |
| Analytics | PostHog or Plausible | Privacy-respecting; no ad-tech |

No vendor sprawl. Every service is in `docs/COST_MODEL.md` with a unit-cost comment at each call site (§7.3 of constitution) for the first 90 days.

## Principles

1. **Managed over self-hosted at the bootstrap stage.** Solo founder cannot afford to operate infrastructure. Every vendor is chosen so the exit path exists (S3-compatibility for R2, open-source Postgres for Supabase, Stripe's data portability) but operation is not the founder's problem today.

2. **Egress-free storage.** Cloudflare R2 over AWS S3 for static assets and generated audio specifically because of egress pricing. Serving audio from Vercel or S3 with heavy use would blow the variable-cost ceiling.

3. **Every service has a kill-switch plan.** `docs/COST_MODEL.md` includes a kill-switch row for every service. If a service fails or becomes unaffordable, the fallback is identified in advance. Kill-switch design happens during the integration node, not after.

4. **Secrets in environment variables only.** Never in code. Never in committed files. `.env.example` is committed and exhaustive; `.env` is gitignored. Production secrets live in the platform's environment config (Vercel, Supabase, Cloudflare). If a secret is ever committed, rotate before fixing history.

5. **Pin dependency versions.** No `^` or `~` in `package.json`. Lockfile committed. Renovate or Dependabot configured for weekly PRs. New dependencies require a DR entry.

6. **Configuration externalized and locked.** Runtime configuration comes from environment variables (infra) and a Postgres config table (tenant-level) and committed `config/` defaults (product). Locked at deploy time. No drift. Every config value documented.

## Cost observability

Production code that hits paid APIs emits cost events. Cost events aggregate to a dashboard visible to the owner at all times. Cost surprise in production is avoidable with correct observability at integration time.

## Resumable long-running jobs

Any job that can exceed 60 seconds (deck parsing, TTS batch generation, vector indexing) is built resumable from day one. Checkpoint state after every unit to disk or durable queue. Never assume a single invocation will complete. A timeout must not mean starting over.

## Deployment

- `main` is always deployable; CI runs on every push.
- Vercel auto-deploy on push to `main`.
- Preview deployments on every PR.
- No staging environment at launch — the preview URL serves as staging. Add staging only when a production incident demonstrates the need.

## Database migrations

- Every migration is reversible, or the reversal plan is documented.
- Migrations tested against production-like data before merge.
- Breaking schema changes use zero-downtime patterns (additive changes, backfill, cutover, remove).

## Change log

| Date | Change |
|---|---|
| 2026-04-24 | Initial doctrine drafted — Narrate tech stack and vendor selection |
