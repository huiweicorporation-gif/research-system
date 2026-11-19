# Skill sources

| Skill | From | Commit | Installed |
|---|---|---|---|
| `diagnosing-bugs` | https://github.com/mattpocock/skills (`skills/engineering/`) | `5beb35b` (2026-10-19) | 2026-10-23 |
| `tdd` | same | `5beb35b` | 2026-10-23 |
| `codebase-design` | same (referenced by `tdd`) | `5beb35b` | 2026-10-23 |

| `ponytail` | https://github.com/DietrichGebert/ponytail (`skills/`) | `09c434a` (2026-10-18) | 2026-10-24 |
| `ponytail-review` | same | `09c434a` | 2026-10-24 |
| `ponytail-audit` | same | `09c434a` | 2026-10-24 |
| `ponytail-debt` | same | `09c434a` | 2026-10-24 |

| `yt-audit`, `yt-chapters`, `yt-comment`, `yt-edit`, `yt-package`, `yt-plan`, `yt-retention`, `yt-script`, `yt-seo`, `yt-shorts`, `yt-viral` | https://github.com/jakeschincariol/youtube-agent-skill (`skills/`) | `a2feb21` (2026-09-16) | 2026-11-08 |

- Licence: MIT, Copyright (c) 2026 Matt Pocock, see `LICENSE-mattpocock-skills`.
- youtube-agent-skill licence: MIT, see `LICENSE-youtube-agent-skill`. Owner asked for it on 2026-11-08.
  - **Skills only**, copied unchanged after a read-through and a SkillSpector scan (all 11 SAFE, score 0). The
    plugin and marketplace entry are not installed. `templates/voice.md` is kept in `yt-templates/` (no SKILL.md,
    so it is not a skill).
  - The six Python tools (`hookscore.py`, `title.py`, `deadair.py`, `chapters.py`, `retention.py`, `swipe.py`)
    only read the file given to them: standard library, no network, no subprocess. They run only when called. On
    this PC call them with `py`, not `python3`.
  - The skills read `~\.claude\youtube\voice.md` (outside this workspace). Fill it for the channel being worked
    on; it is not created by the install.
  - How they fit here (CLAUDE.md and `HIEN-PHAP-AGENT.md` stand above them):
    - None publishes; every one ends in a block the owner copies. Upload and "public" stay the owner's steps.
    - `/yt-script` does not replace the debate meeting or the dossier script format (`kich-ban-*.md` with a
      sources table). Use its hook panel (`hookscore.py`) and retention beats on our scripts. Its 150 wpm runtime
      is not ours: Why Humans narration is 172 wpm.
    - `/yt-viral` overlaps the radar; the radar stays the source. Its `yt-dlp` collection reads public listings
      only, never a logged-in account, and never the owner's Chinese accounts.
    - `/yt-plan` suggests 3 Shorts a week; the agreed plan is 1 long + 2 Shorts.
    - `/yt-retention` reads a Studio retention CSV; the commander's analytics pull is the data source for
      everything else.
    - `/yt-edit` cuts dead air in a recorded take; little use for AI narration.
- ponytail licence: MIT, Copyright (c) 2026 DietrichGebert, see `LICENSE-ponytail`.
- ponytail: **skills only**, copied unchanged. The plugin is not installed, so none of its hooks run:
  - no `node` at session start, at each prompt or for subagents;
  - no project file map injected;
  - the "band" never reads `~\.claude\projects` transcripts and never writes `~\.config\ponytail`;
  - no webhook.
  `/ponytail lite|full|ultra` works only as a request inside the session: nothing is stored.
- `CLAUDE.md` stands above every skill here (see its "Skills" section).
- Copied unchanged, after a read-through: no hooks, no scripts run by themselves, no network calls.
- Pinned on purpose (not the self-updating plugin): any update is read before it is copied here.

## Not installed, and why

- `code-review`: same name as Claude Code's built-in `/code-review`, which is the correctness review that found
  the 2026-10-23 bugs. It also needs an issue tracker set up by `/setup-matt-pocock-skills`.
- Ticket and spec flows (`to-spec`, `to-tickets`, `triage`, `wayfinder`, `implement`…): they need that tracker.
- `ponytail-help`: it describes the plugin (auto-activation every session, the band, `/plugin` updates, a config
  file), none of which exists in a skills-only install, so it would mislead.
- `ponytail-gain`: a fixed benchmark scoreboard, no function for this project.
- ponytail hooks, band module and other agents' folders (`.cursor`, `.kiro`…): see above.

## Update

```bash
git clone --depth 1 https://github.com/mattpocock/skills.git <temp folder>
diff -r <temp folder>/skills/engineering/tdd .claude/skills/tdd
```

Read the diff, then copy the folder and update the commit in the table.

ponytail: the same with `https://github.com/DietrichGebert/ponytail.git` and `skills/<name>/SKILL.md`.

youtube-agent-skill: the same with `https://github.com/jakeschincariol/youtube-agent-skill.git` and
`skills/yt-<name>`; scan the copy with SkillSpector before replacing a folder.

## Scanner: SkillSpector (a tool, not a skill)

| Tool | From | Commit | Installed |
|---|---|---|---|
| `skillspector` 2.12.0 | https://github.com/NVIDIA/SkillSpector | `b5987a3` (2026-10-29) | 2026-10-29 |

- Licence: Apache-2.0 (Copyright NVIDIA), see `tools\SkillSpector\LICENSE`.
- Source in `tools\SkillSpector`, venv in `tools\.venv-skillspector` (Python 3.12, outside the repo; moved out of
  `Documents\` on 2026-11-06 because the owner will delete that folder). Not copied into
  `.claude\`: no skill, no MCP server, no hook. The repo's own `skills/skill-inspector` is not installed.
- Static only (`--no-llm`): skill code is never run and file contents stay local. Without `--no-llm` it sends file
  contents to an LLM provider, so always pass it. The SC4 check still queries `api.osv.dev` with the dependency names
  a skill declares (names and versions only); none of ours declare any.
- Scan a copy, not `.claude\` itself, before installing or updating any skill here:

```bash
cp -r .claude/skills/<name> <temp folder>/<name>
LANGCHAIN_TRACING_V2=false tools/.venv-skillspector/Scripts/skillspector.exe scan <temp folder>/<name> --no-llm --format json > <temp folder>/<name>.json
```

- 2026-11-08: the 11 `yt-*` skills SAFE (score 0, no findings).
- 2026-11-14: the department/FDE package (`Documents\Claude outputs\2026-11-14-doi-agent-fde\`, our own text):
  the 9 skills `giao-ban`, `so-cai`, `doc-radar`, `giai-ma-cap-no`, `kiem-chinh-sach`, `trien-khai`, `mo-kenh`,
  `do-cho-nghen`, `tong-ket-tuan` SAFE (score 0). The 7 cards (`fde-noi-vong`, `fde-kenh` new; `trinh-sat`,
  `trinh-sat-cho`, `giai-ma`, `kiem-duyet`, `phan-bien` with one appended section) scanned together: CAUTION 22,
  one EA5 "external model selection" hit on `claude -p` in `fde-noi-vong.md` line 46, a false positive (the line
  is in the card's "Never" list: never run `claude -p` with `--dangerously-skip-permissions` or `--bare`).
  The five changed cards were checked byte-identical to the live ones above the appended section. Installed.
- 2026-11-14: sample input sets (`mau\`, our own text, written from each skill's rules) added to `do-cho-nghen`,
  `kiem-chinh-sach`, `giai-ma-cap-no`; the three folders scanned with them: score 0, no issues; `do-cho-nghen` and
  `giai-ma-cap-no` SAFE, `kiem-chinh-sach` CAUTION only because the scan is "partial": `de-bai.txt` in SKILL.md
  line 17 now matches the two sample copies (`mau\a-inch`, `mau\a-toilet`). SKILL.md files unchanged.
- Baseline 2026-10-29: all 7 skills and both agents SAFE (score 0), except `diagnosing-bugs` CAUTION 27: one P6
  "system prompt leakage" hit on the comment `step "<instruction>" → show instruction` in
  `scripts/hitl-loop.template.sh`, a false positive (it shows a human a step, not a prompt).
- Update: `git -C tools/SkillSpector fetch`, read the diff, check out the new commit, reinstall into the venv.
