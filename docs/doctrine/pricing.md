# Pricing Doctrine

**Version:** 1.0
**Last updated:** 2026-04-24

This document defines the pricing architecture and the principles behind it.

## Tier structure

**[NARRATE]**

- **Solo tier:** $15–25/month flat
- **Team tier:** ~$49/month flat, with voice cloning
- **No enterprise tier**

## Principles

1. **Flat, not per-seat.** Target market does not buy per-seat. Flat pricing reduces sales friction and matches how small businesses actually buy — predictable monthly subscription, known cost.

2. **No compliance tier.** Compliance tiering pulls the product toward enterprise, away from the bootstrap small-business market. If compliance-specific demand materializes post-launch, it becomes a separate product, not a tier.

3. **No usage-based pricing.** Usage-based pricing creates anxiety at small-business scale and deters usage of the thing the customer is paying for. Fair-use limits are enforced at the platform level to protect unit economics, but pricing is not directly usage-proportional.

4. **Variable cost discipline.** Because pricing is flat, variable cost overruns are absorbed, not passed on. The cost model in `docs/COST_MODEL.md` must show variable cost per customer per month at ≤30% of subscription price at typical usage. Above 40%, the tier is structurally broken and requires redesign before shipping.

## Unit economics targets

**[NARRATE]**

### Solo tier ($15–25/mo)

- Target variable cost ceiling: $4.50–$7.50/mo per customer (30% of price)
- Critical boundary: $6.00–$10.00/mo per customer (40% — structural redesign required)
- Primary cost drivers: Claude API, OpenAI TTS

### Team tier (~$49/mo)

- Target variable cost ceiling: ~$15/mo per customer (30% of price)
- Critical boundary: ~$20/mo per customer (40%)
- Primary cost drivers: Claude API, OpenAI TTS, ElevenLabs voice cloning

## Anti-patterns

Pricing-adjacent features explicitly rejected:

- Per-seat licensing (see product doctrine)
- Usage-based metering visible to users
- Custom pricing / "contact us for pricing"
- Annual discounts disguising high monthly prices
- Free tier (consider a time-limited trial instead; permanent free tier has wrong unit economics at this scale)

## Change log

| Date | Change |
|---|---|
| 2026-04-24 | Initial doctrine drafted from strategic plan |
