# Product Doctrine

**Version:** 1.0
**Last updated:** 2026-04-24

This document defines what the product is and, more importantly, what it is not. Scope boundaries live here.

## What the product is

**[NARRATE]** Narrate is a web application that converts PowerPoint decks into interactive, AI-powered HTML experiences. Users upload a .pptx, collaborate with Claude to draft narration and anticipated Q&A, and publish a shareable HTML experience with tabbed slide navigation, three narration modes (author voice / AI voice / translated subtitles), and a grounded chat panel where viewers ask questions answered from the deck content plus author-curated notes.

## Who it's for

**[NARRATE]** Small businesses and solo professionals: restaurants, trades, agents, coaches, consultants, independent instructors. Sharing small, polished experiences with small, identifiable audiences. Not enterprise. Not internal training at scale. Not compliance-critical use cases.

## What it is explicitly not

**[NARRATE]** — the line is drawn in blood:

- Not enterprise SaaS. No SSO, no RBAC beyond owner/member, no complex admin dashboards.
- Not compliance tooling. No SCORM export, no HIPAA mode, no state-specific content libraries, no signature ceremonies as a core feature.
- Not per-seat licensing. Flat tiers, always.
- Not a video platform. Short interactive experiences, not long-form content.
- Not a general-purpose chatbot. Chat is grounded in the deck; off-topic questions are refused.
- Not a presentation builder. Users bring their own decks.

## Expansion boundary

HR compliance vertical (harassment prevention, state-aware content, audit trails) is a documented deferred expansion, not V1. Revisit only after the core product demonstrates retention. See `docs/DECISIONS.md` DR-007.

## Anti-features

Features explicitly rejected for V1, listed here so future sessions do not re-propose them as innovations:

- Enterprise features (SSO, RBAC beyond basics, audit logs beyond basics)
- Compliance tiering (SOC 2, HIPAA, ISO)
- Signature ceremonies
- Per-seat pricing
- Complex admin dashboards
- Multi-tenant org hierarchies
- SCORM export
- Video recording / editing
- General-purpose chatbot framing

If any of these surface as "we should add X," fire a drift notice and reference this section.

## Change log

| Date | Change |
|---|---|
| 2026-04-24 | Initial doctrine drafted, consolidating Narrate product scope from strategic plan |
