# UX Doctrine

**Version:** 1.0
**Last updated:** 2026-04-24

This document defines the UX principles the product is committed to. Interaction patterns that are load-bearing appear here as rules. Interaction patterns that are forbidden also appear here.

## Load-bearing patterns

**[NARRATE]**

1. **Chat always returns citations.** Every chat-panel answer references the specific slide(s) and author notes that support it. No ungrounded responses. If the deck and notes do not contain the answer, the chat says so explicitly rather than inventing.

2. **Author voice recording in short chunks.** Author narration is recorded per-slide, with a three-minute maximum per chunk. Long-form recording is not supported. The constraint forces concise narration and preserves caching discipline.

3. **Three narration modes are first-class.** Author voice, AI voice, and subtitles-with-translation are equal citizens in the UI. None is a fallback; none is a "premium" upgrade within the tier.

4. **Viewer never needs an account.** Shareable links work anonymously. No signup wall for viewers. Authors have accounts; audiences do not.

5. **Brand is detected, not configured.** Colors, logo, and typography are extracted from the deck's theme XML on upload. The author confirms or overrides; they do not configure from scratch. The product adapts to the deck, not the other way around.

## Forbidden patterns

**[NARRATE]**

1. **No dark patterns.** No roach motel. Cancellation is one click from account settings.

2. **No friction to export.** Users can download a standalone HTML file of their experience at any time. They are not locked into the hosted platform.

3. **No hidden prompts.** The chat panel's system prompt is visible in the author's configuration view. What Claude is told, the author can see.

4. **No premium-upgrade prompts during use.** Tier upgrades surface from account settings, not from feature-blocked modals during work.

5. **No feature theater.** New UI elements must demonstrate use-value before they become permanent. The default answer to "should we add this panel" is no — revisit after ten users ask for it. (Lesson carried from Discovery: navigation-UI experiments like right-side floating panels and sticky tab bars were tried and removed because they added complexity without adding value.)

## Framework-level rules (lifted from Discovery)

These are framework-agnostic UX/implementation rules that prevent silent failures:

1. **Never use conditional expressions around side-effectful UI calls.** `x ? component() : null` can fail silently in reactive frameworks. Write the three-line if/else block instead.

2. **Treat reactive-framework state as a function of inputs on every render.** Do not assume persistence across renders unless explicitly tested. This applies to Next.js server components, client state, and any framework with a reactive rerender model.

3. **Loading states are required.** Every async operation displays a loading state. Every error state has an error message that a real human could act on.

4. **Empty states are designed, not afterthoughts.** Every list, every panel, every modal has a designed empty state.

## Change log

| Date | Change |
|---|---|
| 2026-04-24 | Initial doctrine drafted — Narrate-specific principles plus framework rules from Discovery |
