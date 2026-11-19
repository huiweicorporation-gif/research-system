---
name: do-cho-nghen
description: Find where the loop radar → dossier → meeting → Studio → upload → own numbers → radar is stuck (Dò chỗ nghẽn), read-only, and sort every stuck item into three kinds - really waiting, nobody holds it, already handled - with evidence and the next step. Use for "việc gì đang kẹt", "vì sao hồ sơ chưa thành video", "lệnh quá hạn", in the morning briefing when anything is overdue, and by fde-noi-vong before any fix.
---

# Dò chỗ nghẽn

Department: FDE (`fde-noi-vong`), for the **Tổng chỉ huy**. Read-only: this skill writes nothing, grades nothing
and fixes nothing. A fix is a separate job (`diagnosing-bugs` and `tdd` skills, then `trien-khai`).
Idea from Paperclip's "diagnose why work stopped" (`HOC-TU-PAPERCLIP.md` §9).

## 1. Look in this order (stop when the list is clear)

| # | Where | Stuck when |
|---|---|---|
| 1 | `giao-ban\<today>.md` §1; `radar\data\logs\run-history.txt`; `analysis\logs\run-history.txt` | a run failed, is missing, or "started" has no end line |
| 2 | `analysis\<today>\breakouts.json` (`giai-ma-cap-no` §1) | no hypotheses for a reason other than the subscription limit |
| 3 | `py -m commander order due` (from `commander\`) | an open order past its `kiem_ngay`: count the days |
| 4 | `py -m commander produce --dry-run` | `stuck` (a project failed 3 runs in a row), `errors`, a project `busy` for hours; read `studio-projects\produce-log.txt` |
| 5 | `ho-so\*\` | a dossier with no `ban-thong-nhat.md` after 2 days; `chosen` set but no `handoff.studio_project`; no `video.mp4` 48 hours after `approved_at` |
| 6 | `kenh-minh\<channel>\<today>.json` for each connected channel | missing: the morning read failed (the briefing prints why) |
| 7 | `LO-TRINH.md` against the files | the plan says one thing, the files another (a version, a "chưa triển khai"): low priority |

`produce --dry-run` grades nothing and writes nothing: it only shows what the hourly task would do.

## 2. Sort each item (one kind only)

| Kind | Means | Next step |
|---|---|---|
| **Chờ thật** | the owner or the outside world must act: a gate decision, YouTube's 2–3 day delay on watch time, a subscription limit that resets at a known time | say who and until when; ask the owner only if it is their move |
| **Không ai cầm** | an agent could do it, but no order, task or agent owns it | name who should (`fde-noi-vong`, `fde-kenh`, a scout, the commander), the first step, and propose one ledger order |
| **Đã có việc lo** | an open order or a scheduled task already covers it | name the order id or the task, and its date |

When the evidence does not settle the kind, write "chưa rõ" and what would settle it. Never guess a cause.

## 3. Output (Vietnamese)

```
**Việc kẹt · <ngày>**

| Việc | Kẹt từ | Bằng chứng | Loại | Ai cầm / bước tiếp |
|---|---|---|---|---|

Cần chủ quyết: <một câu hỏi, kèm lựa chọn khuyến nghị> | không có
```

## Example (2026-11-14, to show the shape; verify before acting)

| Việc | Kẹt từ | Bằng chứng | Loại | Ai cầm / bước tiếp |
|---|---|---|---|---|
| `L-20261102-01`, `L-20261108-07` (video within 48 h) still open | 04/11, 10/11 | `order due`; the production line grades only dossiers approved with `py -m commander approve` (since 12/11) | không ai cầm (chưa rõ) | `fde-noi-vong`: check `chosen.approved_at` in their `hop-dong.json`, then the commander grades with the `video.mp4` time |
| `L-20261110-01` still open | 11/11 | `order due`; `kenh-minh\dogmindus\thi-truong.jsonl` | không ai cầm | the commander grades it from the files |
| Today 0/5 pairs with a hypothesis, "không tách được" | 14/11 | giao-ban §1 | không ai cầm | `fde-noi-vong`: `diagnosing-bugs` on the analysis reply parsing |
| 3 of the last 4 daily dossiers (`creepy` 11/11, `hot` 12/11, `inch` 14/11) sit in or near excluded zones; none met | 11/11 | `kiem-chinh-sach` mode A; `ho-so\ke-hoach-10-video.md` | không ai cầm | radar: the daily brief should skip excluded zones (code); meanwhile the owner picks which dossier to meet on |
