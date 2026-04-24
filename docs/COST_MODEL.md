# Cost Model

**Project:** Narrate
**Last updated:** 2026-04-24
**Template version:** 1.1.0

This file tracks per-action costs for every external paid API and service. Per constitution §7.1, it is updated whenever a new integration is added, pricing changes, or observed costs diverge from modeled costs.

**Call-site discipline (constitution §7.3, added in v1.1).** For the first 90 days of the project, every paid-API call site in code carries a comment with the unit cost, formatted like:

```typescript
// ~$0.003 per call (Claude Sonnet, ~200 input + 50 output tokens @ current pricing)
const response = await claude.messages.create({...});
```

The discipline forces cost awareness into the developer's direct view during implementation. After 90 days, comments can be stripped if costs have been internalized. Before then, they stay. This complements — does not replace — the entries below.

## How to read this file

Each service has an entry with modeled and observed costs. Modeled costs are estimates produced before integration; observed costs come from measurement after a meaningful usage window (typically 30 days post-integration or 100 paying customers, whichever comes first).

The **pricing-to-cost ratio** section at the bottom aggregates the per-customer variable cost against the subscription price and flags structural problems.

Price figures are captured as of the update date. Real pricing must be verified against the vendor's current rate card before integration — especially before any ratified integration node (§9.8 of the constitution).

---

## Claude API (Anthropic)

**Integration node:** n-015, n-019 (primary consumers)
**Pricing model:** Per-token, input and output priced separately; tiered by model
**Unit cost:** Varies by model. Verify current rates at https://docs.claude.com/en/docs/about-claude/models before pricing decisions.
**Typical per-user-action cost:**
- Narration drafting (one slide, full conversation turn): TBD — model on first integration
- Chat panel query (one viewer question, grounded retrieval + answer): TBD — model on first integration
**Modeled per-customer-month cost:** TBD
**Observed per-customer-month cost:** Not yet measured
**Cost trap conditions:**
- Long context windows compound per-request cost quickly (pricing scales with input tokens)
- Retries on rate limits double cost
- Large deck context held across chat sessions without trimming
- Author iterating many times on narration drafts per slide
- Tool use / agentic loops with multiple turns before resolution
**Mitigations in place:** None yet — to be designed at n-015 integration
**Planned mitigations:**
- Context trimming: send only relevant slides + author notes for chat queries, not full deck
- Session caching: cache drafted narration; regenerate only on explicit request
- Model tiering: use smaller/cheaper models where quality delta is negligible
- Rate limit handling with exponential backoff, capped retries
- Prompt caching for stable system prompts and repeated deck context (Anthropic's prompt caching feature)

---

## OpenAI TTS

**Integration node:** n-016
**Pricing model:** Per-character of input text; varies by voice model tier
**Unit cost:** Verify current rates at https://platform.openai.com/docs/pricing before pricing decisions.
**Typical per-user-action cost:**
- Generate TTS for one slide of narration (estimate 500 characters of script): TBD — price on first integration
**Modeled per-customer-month cost:** TBD — depends on deck count and slide count per customer
**Observed per-customer-month cost:** Not yet measured
**Cost trap conditions:**
- Regenerating unchanged audio (must cache by content hash)
- Author regenerating narration repeatedly before settling
- Long-form narration per slide (verbose scripts)
**Mitigations in place:** None yet — to be designed at n-016 integration
**Planned mitigations:**
- Content-hash cache: key is SHA-256 of (voice_id, script_text, voice_params); cache forever until content changes
- Preview mode uses shorter narration text to let authors iterate cheaply before final generation
- Audio stored in R2; regeneration gated behind explicit author action
- Character count budget surfaced to author before generation

---

## ElevenLabs (teams tier only)

**Integration node:** TBD — deferred until teams tier implementation
**Pricing model:** Per-character of generated audio + per-voice-clone setup fee
**Unit cost:** Verify current rates at https://elevenlabs.io/pricing before pricing decisions.
**Typical per-user-action cost:** TBD
**Modeled per-customer-month cost:** TBD
**Observed per-customer-month cost:** Not applicable until teams tier ships
**Cost trap conditions:**
- Voice cloning setup fees on every new team member
- Character costs higher than OpenAI TTS; solo tier must not have access
**Mitigations in place:** Tier-gate enforced at feature level — voice cloning is team-tier exclusive per constitution §7.4
**Planned mitigations:** Same caching strategy as OpenAI TTS; per-team character budget with overage notifications

---

## Cloudflare R2

**Integration node:** n-008
**Pricing model:** Storage per GB/month + operation costs (Class A writes, Class B reads) + free egress
**Unit cost:** Verify current rates at https://developers.cloudflare.com/r2/pricing/ before pricing decisions.
**Typical per-user-action cost:**
- Upload one pptx (average 5–20 MB): effectively negligible per upload; storage cost compounds over time
- Serve one HTML experience asset: free egress, Class B read cost
**Modeled per-customer-month cost:** TBD — model once deck sizes observed
**Observed per-customer-month cost:** Not yet measured
**Cost trap conditions:**
- Unbounded retention of old pptx uploads and generated audio
- Users uploading very large decks (need file-size limits)
- Generated audio files accumulating without cleanup for canceled subscriptions
**Mitigations in place:** None yet — to be designed at n-008 integration
**Planned mitigations:**
- File size limit on upload (default 100 MB; adjustable)
- Retention policy: delete source pptx N days after parse completes (configurable, default 30)
- Cancellation cleanup: soft-delete customer assets 30 days post-cancellation; hard-delete after 90
- Storage metrics surfaced per customer

---

## Supabase

**Integration node:** n-007
**Pricing model:** Tiered flat plans (Free, Pro, Team, Enterprise); overage pricing on database, bandwidth, storage, auth users
**Unit cost:** Verify current rates at https://supabase.com/pricing before pricing decisions.
**Typical per-user-action cost:** Effectively flat until tier caps are hit
**Modeled per-customer-month cost:** Not per-customer — flat infrastructure cost amortized across customer base
**Observed per-customer-month cost:** Not yet measured
**Cost trap conditions:**
- Tier transitions at scale (Free → Pro → Team) can step costs significantly
- Auth user count growth outpacing paying customer count (trial users, free tier)
- Database compute cap requiring higher tier before revenue supports it
**Mitigations in place:** None yet — monitor from n-007
**Planned mitigations:**
- Monthly review of Supabase tier utilization
- Query optimization before scaling up
- Auth user cleanup: delete unverified accounts after N days
- Bandwidth-heavy operations (large asset serving) offloaded to R2

---

## Vercel

**Integration node:** n-009
**Pricing model:** Tiered flat plans (Hobby, Pro, Enterprise); bandwidth, build minutes, serverless execution overage
**Unit cost:** Verify current rates at https://vercel.com/pricing before pricing decisions.
**Typical per-user-action cost:** Effectively flat
**Modeled per-customer-month cost:** Flat infrastructure cost
**Observed per-customer-month cost:** Not yet measured
**Cost trap conditions:**
- Build minute overage from frequent deploys with slow CI
- Bandwidth overage from serving large assets directly from Vercel instead of R2
- Function invocation overage from high-traffic chat endpoints
**Mitigations in place:** None yet
**Planned mitigations:**
- CI time budget: 5 minutes per run per constitution §9.6
- Assets served from R2, not Vercel
- Function invocations monitored for runaway loops

---

## Stripe

**Integration node:** n-023
**Pricing model:** Percentage + fixed fee per successful transaction; additional fees for international, disputes, subscription management features
**Unit cost:** Verify current rates at https://stripe.com/pricing before pricing decisions.
**Typical per-user-action cost:** Transaction fee on every subscription renewal
**Modeled per-customer-month cost:** Fee against each subscription payment
**Observed per-customer-month cost:** Not yet measured
**Cost trap conditions:**
- Chargebacks (flat dispute fee + reserves if rate climbs)
- International card surcharges
- Failed payment retries
**Mitigations in place:** None yet
**Planned mitigations:**
- Clear cancellation flow to reduce chargeback risk
- Failed payment flow with notification before retry
- Monitor chargeback rate; if it crosses threshold, investigate source

---

## Sentry

**Integration node:** n-024
**Pricing model:** Tiered by event volume; free tier for low-volume projects
**Unit cost:** Verify current rates at https://sentry.io/pricing/ before pricing decisions.
**Typical per-user-action cost:** Per error event captured
**Modeled per-customer-month cost:** Near-zero at current scale assumptions
**Observed per-customer-month cost:** Not yet measured
**Cost trap conditions:**
- Error loops producing high event volume (one bug, thousands of events)
- Chatty client-side errors from third-party scripts
**Mitigations in place:** None yet
**Planned mitigations:**
- Event sampling for non-critical error categories
- Rate limiting per error fingerprint
- Environment filtering (exclude development from production quota)

---

## Resend (transactional email)

**Integration node:** TBD — opens when auth flows need email verification and password reset
**Pricing model:** Tiered by monthly email volume; free tier for low volume
**Unit cost:** Verify current rates at https://resend.com/pricing before pricing decisions.
**Typical per-user-action cost:** Per email sent
**Modeled per-customer-month cost:** Low (auth verification, occasional notifications)
**Observed per-customer-month cost:** Not yet measured
**Cost trap conditions:** Transactional volume growing with customer base
**Mitigations in place:** None yet
**Planned mitigations:** Only transactional email initially; marketing email via separate system later

---

## PostHog (analytics)

**Integration node:** TBD — opens when a measurement need justifies it
**Pricing model:** Tiered by event volume; free tier for low volume
**Unit cost:** Verify current rates at https://posthog.com/pricing before pricing decisions.
**Typical per-user-action cost:** Per event tracked
**Modeled per-customer-month cost:** Low
**Observed per-customer-month cost:** Not yet measured
**Cost trap conditions:** Over-instrumenting with high event cardinality
**Mitigations in place:** None yet
**Planned mitigations:** Explicit event schema; resist ad-hoc event creation; review monthly

---

## Pricing-to-cost ratio analysis

Per constitution §7.4, variable cost per customer per month must stay ≤ 30% of subscription price at typical usage. Above 40%, the tier is structurally broken.

### Solo tier ($15–25/mo)

- Target variable cost ceiling: $4.50–$7.50/mo per customer (30% of price)
- Critical boundary: $6.00–$10.00/mo per customer (40% — structural redesign required)
- Primary variable cost drivers: Claude API (chat, narration), OpenAI TTS (AI voice)
- Structural mitigation: solo tier does NOT include voice cloning (ElevenLabs)
- Key questions to resolve at integration time:
  - How many chat queries per customer per month at typical usage?
  - How many narration generations per customer per month?
  - What is the per-query Claude cost at the chosen model tier?
  - What is the per-slide TTS cost at the chosen OpenAI voice?

### Team tier (~$49/mo)

- Target variable cost ceiling: ~$15/mo per customer (30% of price)
- Critical boundary: ~$20/mo per customer (40%)
- Primary variable cost drivers: Claude API, OpenAI TTS, ElevenLabs voice cloning
- Structural considerations:
  - Voice cloning has both per-clone setup fees and ongoing character costs
  - Team tier must support multiple authors without character cost explosion
  - Per-team character budget with overage handling is not optional

---

## Kill-switch readiness

Per constitution §10.4, every service must have a kill-switch plan. The table below flags readiness of each service's fallback.

| Service | Kill-switch plan | Status |
|---|---|---|
| Claude API | Degrade to GPT-4 or similar; chat quality drops; narration drafting manual | Not designed |
| OpenAI TTS | Degrade to Web Speech API browser-native TTS; quality drop substantial | Not designed |
| ElevenLabs | Team tier feature degrades; revert to OpenAI TTS for team voice | Not designed |
| Cloudflare R2 | S3-compatible; migrate to AWS S3 with egress cost implications | Not designed |
| Supabase | Self-host Postgres or migrate to Neon / Railway | Not designed |
| Vercel | Migrate to Railway / Render / self-hosted | Not designed |
| Stripe | No practical alternative for bootstrap — treat as critical vendor | — |

Kill-switch plans are designed during the integration node for each service, not retroactively.

---

## Change log

| Date | Change |
|---|---|
| 2026-04-23 | Initial cost model drafted; no integrations yet — all entries are modeled placeholders |
| 2026-04-24 | Updated for template v1.1: call-site discipline documented in header |
