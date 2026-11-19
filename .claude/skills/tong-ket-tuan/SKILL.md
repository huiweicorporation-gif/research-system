---
name: tong-ket-tuan
description: Weekly review (Tổng kết tuần, KE-HOACH-BO-SUNG-DOI-AGENT.md §5.4 and §6) - the week's numbers per department from the ledger, the brain's hit rate against its baseline, our channels against the 10-video plan's thresholds, the dossier funnel, then at most three proposed rule or card changes with evidence. Writes tong-ket/<YYYY>-W<ww>.md. Use when the owner says "tổng kết tuần", on Sunday or Monday, and by fde-noi-vong.
---

# Tổng kết tuần

Department: FDE (`fde-noi-vong`), for the **Tổng chỉ huy** and the owner (about 15 minutes of reading).
It writes one file, `L:\System-research\tong-ket\<YYYY>-W<ww>.md` (ISO week), and proposes; the owner decides.
Until a `py -m commander` command makes this file by code, build it by reading, with the steps below.

## 1. Numbers (each with its source and sample)

| # | Number | Source | Target |
|---|---|---|---|
| 1 | Predictions that could be graded: (`dung` + `sai`) ÷ all graded this week | `so-cai\lenh.jsonl` | ≥ 80% |
| 2 | Brain `growth-3d-v0`: hit rate, and the majority-guess baseline | the briefing's brain line; `nao` orders | above its baseline (54% on 22–28/10) |
| 3 | Our videos `own-7d-v0`: wins, losses, not counted | `kenh` orders (rule `own-7d-v0`) | — |
| 4 | Per department: orders, open, `dung`, `sai`, `khong_tinh` | `commander.ledger.tally` (below) | open orders past due = 0 |
| 5 | Dossier funnel: made → met → approved → `video.mp4` within 48 h → uploaded | `ho-so\*\`, `studio-projects\` | 10 in a row on time (KE-HOACH §6) |
| 6 | Each channel against `ho-so\ke-hoach-10-video.md`: CTR ≥ 4% at 3 videos, average view ≥ 35% at 5, videos 6–10 above 1–5 at 10 | `kenh-minh\<channel>\<day>.analytics.json` | per the plan |
| 7 | Format test | `py -m commander format show` | — |
| 8 | Cost: đ/video, đ/1,000 views | `so-cai\chi.jsonl` | lower than RPM |
| 9 | Policy incidents | the week's notes | 0 |

Per-department tally, read-only, from `L:\System-research\commander`:

```bat
py -c "from pathlib import Path;from commander.ledger import read_orders,tally;import json;print(json.dumps(tally(read_orders(Path(r'..\so-cai\lenh.jsonl'))),ensure_ascii=False,indent=1))"
```

`so-cai\chi.jsonl` does not exist yet: write "chưa có sổ chi" for row 8, never an estimate dressed as a number.

## 2. What went wrong

Run the `do-cho-nghen` skill for the week and keep the items still open. Name each item's kind.

## 3. Proposals (at most three)

Each one: what to change (a rule in `HIEN-PHAP-AGENT.md`, a card, a skill, a prompt such as `1-tieu-de.md`), the
evidence (file, number, sample), and the check that will show it worked. Each accepted proposal becomes one ledger
order with a check date (`so-cai` skill). A change to `.claude\` is scanned with SkillSpector before it is installed.

**The lesson store (owner 2026-11-15, `commander\docs\thiet-ke-co-so-du-lieu-tu-hoc.md`).** Per market, never mixed:
- Write each number of the week that points somewhere as an observation: `py -m commander lesson observe "<text>"
  --by tong-ket-tuan --market <market> --data "<file>: <number>"` (a repeat is refused).
- `py -m commander lesson list --market <market>` and, for each lesson `dang_thu`, `lesson score <id>`: the videos
  that used it against those made in the same weeks without it. `tot_hon` → propose `lesson status <id> xac_nhan`;
  `khong_hon` → propose `bo` with the reason; `chua_du_mau` → say how many videos are still needed (6 tried).
- Move a lesson another agent proposed (`lesson status <id> dang_thu --by tong-ket-tuan`) only when it names at
  least two observations; at most three new lessons a week.

## Template (Vietnamese)

```
# Tổng kết tuần <YYYY>-W<ww> (<từ ngày> → <đến ngày>)

## 1. Đã đúng / đã xong
## 2. Số của tuần        (bảng §1, mỗi số kèm nguồn và cỡ mẫu)
## 3. Chưa xong / đang kẹt   (bảng của do-cho-nghen)
## 4. Đề xuất sửa (tối đa 3)
## 5. Cần chủ quyết       (một câu hỏi)
```

Rules: numbers only from files; a target not yet measurable says "chưa đo được"; do not rewrite last week's file.
