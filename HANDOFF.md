# HANDOFF

<!--
This file is the current-session handoff. It is OVERWRITTEN at the end of
every substantive session. The next session reads this before doing anything.

Rules (constitution §3.5, §5.6, §11.4, §11.5):
- Self-contained. Every code artifact referenced here is embedded verbatim
  in this file — no ephemeral file-path references like /home/claude/xyz.py.
- A handoff must rebuild the system cold, on a new laptop, with nothing but
  itself.
- Current commit SHA is recorded.
- Next action is stated.
- The signature-check and git-state diagnostics are explicit.

This is the v1.1 template. Replace placeholders on first session close.
-->

**Last updated:** <YYYY-MM-DD HH:MM timezone>
**Session:** <sequential session ID or descriptor>
**Commit at close:** <git sha — output of `git rev-parse HEAD`>
**Branch:** <e.g., main | node/n-007-tts-openai>
**Active node:** <node ID + short name, or "none">

---

## Next action

<!-- One sentence. What is the next session supposed to do first? -->



## Current state

<!-- What has been done up to this handoff. Short narrative, not a log. -->



## Session-start diagnostic

The next session must run this before writing any code. If any check fails,
stop and reconcile.

```bash
# 1. Git state
git status                    # must be clean
git log -1 --oneline          # must match commit SHA above

# 2. Environment
just --list                   # recipes available
cat .nvmrc .python-version    # runtimes pinned

# 3. Dependencies
pnpm install --frozen-lockfile  # or equivalent
just typecheck
just lint
just test
```

<!-- Add project-specific signature checks here if applicable.
For Python surfaces with known-patched signatures, mirror Discovery's
`inspect.signature` pattern:

```python
import inspect
from src.some_module import some_function
sig = inspect.signature(some_function)
assert 'expected_param' in sig.parameters, 'PATCH MISSING'
```
-->

## Code artifacts (embedded verbatim)

<!-- Every file referenced in "current state" or "next action" lives here
as a fenced code block with filename. Not linked. Not summarized.
The next session can reconstruct state from this file alone. -->

<!-- Example:
### src/parse/pptx.ts

```typescript
// ~$0 per call (local parsing, no external API)
export async function parsePptx(buffer: Buffer): Promise<ParsedDeck> {
  // ... actual code embedded here ...
}
```
-->

## Parked items touched this session

<!-- Anything from PARKED.md that became relevant this session or was
resolved. Reference by parked-item date. -->



## Cross-project impact

<!-- Did this session's work affect any other project? (Other software
projects, the Stokes case, any standalone project.) If yes, what was
noted where. If no, state "none". -->

none

## Open questions for next session

<!-- Specific questions the next session needs to resolve. If there are
no open questions, state "none". -->

- 

## Doctrine touched

<!-- Which doctrine documents did this session interact with?
If none, state "none". -->

- 

---

## How to use this handoff (read at session start)

1. Read this entire document.
2. Run the session-start diagnostic. All checks must pass.
3. Skim `PARKED.md` for items that have become relevant.
4. State the current scope (active node, definition of done, envelope).
5. Execute "next action" above.
6. At session close, rewrite this file in place per §11.5.
