# Rules for every session in this workspace

Applies to radar, radar-dev, analysis, studio and any code written here. Skills are in `.claude/skills/`.

## Fixing a bug
- Follow the `diagnosing-bugs` skill.
- Before changing the code, write a test that fails on this exact bug, and run it to show it is red.
- Then fix it, show the same test is green, and run the module's whole test suite.
- State the real cause in the commit message.

## Writing tests
- Follow the `tdd` skill.
- Expected values come from an independent source: a worked example, the spec, or a known-good literal.
  Never copy what the code currently outputs, and never recompute it the way the code does.
- If a fix makes an old test fail, do not just update the assertion. First show that the old expected value was
  wrong (on 2026-10-23 a radar test asserted "new" only because the bug produced "new"), and say so in the commit.

## Before deploying
- Run `/code-review` on the changes and fix or explicitly accept each finding.
- Then deploy as usual: tests pass, offline replay on a copy of the data, outside the radar's 05:30–07:30 window.

## Skills from other sources (`.claude/skills/SOURCES.md`)
- These rules stand above every skill, ponytail included.
- Where ponytail says a change is too small for a test, a bug fix still gets its red test first.
- `/ponytail-review` and `/ponytail-audit` may be run as well, but `/code-review` stays the review required
  before deploying.
- Code stays English. Reports and explanations for the owner are in Vietnamese, also when a skill asks for
  "simple English".
