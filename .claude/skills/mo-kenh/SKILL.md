---
name: mo-kenh
description: Checklist for bringing a new channel or a new market into the system (Mở kênh / thị trường), learned from Dog Mind (2026-11-10 to 11-14) - owner decisions, connecting the channel, the radar market block and its quota, competitor review, the scout card and market isolation, dossiers, hand-off, the own-channel loop, when it counts as done, and the day-30 GO / TEST / NO-GO decision for a market. Use for "thị trường này có nên làm không", "ngày 30", "mở kênh mới", "thêm thị trường", "đổi thị trường chính", and by the fde-kenh agent.
---

# Mở kênh và thị trường

Department: FDE (`fde-kenh`), between **Trinh sát**, **Kênh mình** and **Xưởng**. Use the `trien-khai` skill for
any code change and the `so-cai` skill for one ledger line per step that has a result to check.

## 0. The owner decides first (ask once, with a recommended option)

- Channel handle, language and region; the market id(s) (`<niche>-<lang>`, like `dog-psych-en`); the **main** market.
- Which scout owns it: an existing family (`trinh-sat` for evo-psych-*, `trinh-sat-cho` for dog-psych-*) or a new one.
- Whether the machine should make videos for it (today only `evo-psych-en` is produced by machine; see step 6).

Lesson (2026-11-13): Dog Mind's main market moved from `dog-psych-de` to `dog-psych-en` the same evening. Settle the
main market before the first radar run; a market kept as a fallback can stay cheap with `comments = false`.

## 1. Connect the channel (gate 3: the owner runs it)

`py -m commander channel connect [--client <oauth client file>]` from `L:\System-research\commander`. It writes
`kenh-minh\<channel>\kenh.json`; from then on the briefing reads the channel's numbers every morning.

- **Main market:** set it on the Channel tab of the HQ page. It writes `niche` in `kenh.json` and one line in
  `thi-truong.jsonl` (kept since the owner's note of 2026-11-09: nobody could say when Why Humans' market changed).
- **Extra markets** (`markets` in `kenh.json`, as Dog Mind + `dog-psych-de`): there is no button yet. Change it only
  on the owner's word, and add the matching line to `thi-truong.jsonl` as on 2026-11-13.

## 2. The radar market (the owner's config file)

- A new market is a `[[niche]]` block in the live `L:\System-research\radar\config\radar.toml`; no code change
  (`radar-dev\CONTRIBUTING.md`). `deploy.py` never copies this file: write the block from an existing market
  (`id, name, enabled, region, language, queries, seed_channels`, `comments`), show it, and let the owner paste it
  or say "ghi vào".
- **Quota:** run `py -m radar doctor` in `radar\` and read the estimate against `[quota] daily_budget`. A search
  costs about 101 units, comments up to 200 per market. The 2026-11-14 run used 5,992 units for 9 markets.

## 3. First runs

A market needs one to two weeks of daily runs before rising keywords (`keywords.history_days`) and zones mean much.
Until then the scout says so (`doc-radar` §3–4) and never fills the gap with another market's numbers.

## 4. Competitor review (as in Brick 1, 2026-10-24)

After 3–5 runs: `py -m radar channels <market> list`. Propose to the owner which to **ignore** (off-niche: a
`generalist` with low `topic_fit`; example `5-Minute Crafts Recycle`, 0.06, in `dog-psych-en` on 2026-11-14) and
which to **confirm**. The owner approves; then `py -m radar channels <market> ignore|confirm <UC…>`.

## 5. The scout and market isolation

- New family: a new card modelled on `trinh-sat-cho.md` (markets it owns, files it may read, files it must never open).
- Every other scout's card gets the matching "never read" line: isolation goes both ways.
- Test with three questions (a number, a zone, a competitor): every answer names its market and none uses
  another market's file. A card change is a `.claude\` change: scan it with SkillSpector (`.claude\skills\SOURCES.md`).

## 6. Dossiers and production

- Daily dossiers: add the market to `[brief] daily` in `radar.toml` only if the owner wants one per day.
- Machine production covers only `STUDIO_NICHES = ("evo-psych-en",)` in `commander\commander\production.py`,
  because Studio's prompts are written for "why did early humans X". Other markets go dossier → meeting → owner.
  Widening that list is a product decision for the owner, then a code change with `trien-khai`.
- youtube-main channel: `py -m radar handoff <market> <channel folder>` (preview). `--apply` is gate 4; it refuses
  a channel in another language.

## 7. Done when

- [ ] `kenh.json` connected, main market set, `thi-truong.jsonl` has the change.
- [ ] 7 daily runs in a row with the market, exit 0 (`radar\data\logs\run-history.txt`).
- [ ] Competitor list approved by the owner.
- [ ] Scout isolation test passed (step 5).
- [ ] First dossier taken to a meeting, and a video made within 48 hours, or "trễ" recorded with the reason.
- [ ] A day-30 order in the ledger, checked on the market's 30th radar day (step 8).

## 8. Day-30 decision: GO / TEST / NO-GO (owner 2026-11-18)

A market is judged on data over time, never on one day: 7 radar days to compare, 14 to judge, **30 to decide**
(`commander\docs\doi-chieu-agentic-studio.md`, item 5). Each market has a ledger order whose check date is its 30th
radar day; the briefing shows it when due.

- **When:** the market has 30 days with `radar\exports\<day>\niche_<market>.json`. Count the folders; a missed day
  moves the date. Fewer than 30 on the check date: say how many, and move the order on with a note. A strong early
  signal may be reviewed at day 14, but then the answer is at most TEST with confidence at most MEDIUM.
- **Evidence (only this market's files, `doc-radar` skill):**
  - health verdict per day (OPEN / SIGNAL / NO OPENING YET): how many of the 30 days each;
  - zones: how many per day, and the zones that stayed in the top 5 on most days (a zone of one day is noise);
  - breakouts and viral videos per week (rising, steady or falling);
  - small or new channels that won (`wins`, channels younger than 180 days with a breakout): the best sign a new
    channel can enter;
  - concentration: share of the top 3 competitors in 30-day views;
  - the market's quota per run, and whether our own channel already serves it (`kenh-minh\*\kenh.json`).
- **Decision (the commander proposes, the owner decides):**

  | Decision | When |
  |---|---|
  | **GO** | demand steady or rising, zones that persist, new channels win, competition not held by 3 channels, a format we can make, no red policy risk (`kiem-chinh-sach` mode A) |
  | **TEST** | good signs but a gap (few zones, no new-channel win yet, format unproven); the kill and promote criteria are written **before** the first video, from `ho-so\ke-hoach-10-video.md` (CTR ≥ 4% at 3 videos, average view ≥ 35% at 5, videos 6–10 above 1–5 at 10) |
  | **NO-GO** | no persistent zone, demand falling, or one or two channels hold the market; write the condition that would reopen it (e.g. "≥ 3 zones on 7 days in a row") and propose `comments = false` or `enabled = false` to save quota |

  Confidence: **HIGH** 30 days consistent across the evidence · **MEDIUM** 14–29 days or one gap · **LOW** less, or the
  signs disagree. A score never decides alone.
- **Output:** `ho-so\thi-truong\<market>-ngay-30.md` (decision, confidence, the evidence table with days and files,
  kill/promote criteria for TEST, reopen condition for NO-GO), then grade the order and, after the owner's answer, one
  new order with the decision and its own check date (`so-cai` skill).

## 9. Learn back (FDE step 4)

After each channel, propose to the commander one dated line for "Bài học" below, with its evidence. The commander
changes this file after the owner agrees.

## Bài học

- 2026-11-13 · Dog Mind: main market changed twice in one evening; decide it before the first run.
- 2026-11-14 · `dog-psych-en`: the radar's reach discovery added a generalist (topic fit 0.06) on day 1; review
  competitors early.
- Open: `kenh-minh\tiandyvietnam2145\` ("hari Shu") has no market and is not connected; step 0 is waiting for the owner.
