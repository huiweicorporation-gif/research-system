---
name: so-cai
description: Order ledger (Sổ cái lệnh) rules for the commander and every agent that makes a decision - how to add an order with a check date and a checkable prediction, how to list what is due, and how to grade only with evidence, through py -m commander order. Use when the owner says "ghi lệnh", "chấm lệnh", "lệnh nào đến hạn", or after any decision an agent makes (a deploy, a new market, a fix).
---

# Sổ cái lệnh

Departments: **Tổng chỉ huy**, the two FDE agents, and any department that decides something.
`HIEN-PHAP-AGENT.md` §4: every order has a check date; grade results, not claims.

The ledger is `L:\System-research\so-cai\lenh.jsonl`, one JSON object per line: `id, luc, phong, lenh, ly_do,
du_doan, kiem_ngay, trang_thai (mo | xong), cham (dung | sai | khong_tinh), cham_luc, ghi_chu_cham`, plus `kiem`
for machine-graded orders. **Never edit the file by hand**; commander rewrites it atomically.

## Commands (from `L:\System-research\commander`)

```bat
py -m commander order add <phong> "<lenh>" --check YYYY-MM-DD --why "<ly do>" --predict "<du doan>"
py -m commander order due [--day YYYY-MM-DD]
py -m commander order grade <id> dung|sai|khong_tinh --note "<bang chung>"
```

## Who writes and who grades

| `phong` | Written by | Graded by |
|---|---|---|
| `nao` | the brain (`growth-3d-v0`) in the briefing | the brain, by code. Never grade by hand |
| `kenh` | the brain's `own-7d-v0` rule, one order per video of ours | by code on day 7. Never grade by hand |
| `hop-tranh-luan` | `py -m commander approve` after the owner chooses | the production line; overdue ones go to `do-cho-nghen` |
| `tong-chi-huy` | the commander, on the owner's word | the commander, with evidence |
| `fde-noi-vong`, `fde-kenh` | the FDE agent, one line per job | the commander, with evidence; never the same agent |
| an owner's own order | the owner | the owner; the brain never grades it |

## Writing a good order

- **`lenh`:** one action, with the market or channel named (`dog-psych-en`, `@whyhumansus`).
- **`ly_do`:** the number or file behind it, with its day ("vùng inch 85/100, radar 2026-11-14").
- **`du_doan`:** something a file or a number can prove on the check date. Good: "Sáng 2026-11-16
  `run-history.txt` có lượt 06:30 của radar 1.15.0 kết thúc mã 0". Bad: "radar chạy tốt hơn".
- **`kiem_ngay`:** the first day the proof can exist. A video prediction counts only once the video exists.

## Grading

- `dung` / `sai`: the note names the file, line or number checked ("`analysis\2026-11-16\breakouts.json`: 4/5 cặp
  có giả thuyết").
- `khong_tinh`: only when the precondition never happened (the video was never made), and the note says why.
  A dossier that missed its 48 hours is "trễ", which is a finding for `do-cho-nghen`, not a reason to hide it.
- An agent saying "done" is not evidence (constitution §4). No file, no grade: leave it open and report it.
