---
name: trien-khai
description: Deploy checklist (Triển khai) for moving a change from the dev copy or branch into the running system - radar-dev to radar with deploy.py, or a branch of commander, analysis or Studio into main - with red tests, /code-review, an offline replay on a copy of the data, the run windows, a backup, verification, the ledger line and a safe rollback. Use for "triển khai", "deploy", "đưa bản mới lên", "rollback", and by both FDE agents before anything reaches the live system.
---

# Triển khai

Departments: **Kiểm định** (under Pháp chế & An toàn), used by `fde-noi-vong`, `fde-kenh` and the commander.
`CLAUDE.md` stands above this skill: red test first, `/code-review` before deploying, never 05:30–07:30.

**The owner says yes in this session before step 5.** Show the dry-run plan and the replay result, then ask.

## 0. Where code lives and when it runs

| Module | Dev place | Live place | Scheduled runs to avoid |
|---|---|---|---|
| radar | `L:\System-research\radar-dev` (tags `vX.Y.Z`) | `L:\System-research\radar` (copied by `deploy.py`) | 06:30 daily, 08:30 catch-up, 5 min after log-on; fast radar every 30 min once `install_fast_schedule.bat` is installed |
| analysis | a git branch in `analysis\` | `analysis\` main | 07:40, and 45 min after log-on |
| commander | a git branch in `commander\` | `commander\` main | briefing 08:30 and 90 min after log-on; production every hour (`Xuong YouTube - San xuat`) |
| studio | a git branch in `studio\` | `studio\` main | called by the hourly production task |

Before deploying, check in Task Scheduler that the module's task is not "Running". `deploy.py` refuses
05:30–07:30 by itself; the other modules have no guard, so you are the guard.

## 1. Tests in the dev place

- The bug has a test that failed before the fix (show the red run), and the whole suite is green now.
- radar: `cd /d L:\System-research\radar-dev` then `py -m unittest discover -s tests -t .`
- commander: the same command from `L:\System-research\commander`. analysis, studio: the suite named in their README.

## 2. Review

Run `/code-review` on the change. Fix or explicitly accept each finding, and write the count ("9 điểm: sửa 7,
chấp nhận 2") in the CHANGELOG entry or the commit message.

## 3. Offline replay on a copy

Never on the live data. For the radar: copy the radar-dev checkout to a scratch folder, put a copy of the live
`data\radar.db` and `exports\` in it, then `py -m radar run --date <today> --offline` there. Compare with today's
live export: what must stay the same (queue, trending, summary) and what is meant to change. Write the result in
one paragraph ("SUCCESS, mã 0; hàng đợi giống hệt; thêm …").

For commander, analysis and studio: run the changed command on a copy of the data it reads
(`py -m commander --root <copy> <command>`, with `COMMANDER_DATA_DIR` pointed at a copy as in the sandbox entries of
`.claude\launch.json`; `breakouts.py <day> --no-ai` on a copied day; a copy of a Studio project).

## 4. Dry run

radar: `py deploy.py --target L:\System-research\radar --dry-run`. Read the plan:
- `config/radar.toml differs from the release`: the owner edited it. Never overwrite it. List every new config
  key the release needs (from `CHANGELOG.md`) and give the owner the lines to add.
- Files only in the target are left in place: name them.

## 5. Deploy (after the owner's yes)

- radar: `py deploy.py --target L:\System-research\radar`. Keep the backup folder and the rollback command it prints.
- branch modules: merge into main. Note the commit before and after.

## 6. Verify

- radar: `cd /d L:\System-research\radar`, then `py -c "import radar; print(radar.__version__)"`, the suite, and
  `py -m radar doctor` ("Ready"). The version printed must be the one you deployed.
- every module: the next scheduled run ends with exit 0. That is the prediction of the ledger line below.

## 7. Record

- One ledger line (`so-cai` skill): `lenh` "triển khai <module> <version>", `du_doan` "lượt <giờ> ngày <ngày>
  chạy bản <version>, mã 0", `kiem_ngay` the day of that run.
- `LO-TRINH.md`: one line under the brick (version, time, tests, review count, backup folder).
- The live radar folder is its own git repository: commit `deploy: radar <version>` only when the owner allows.

## 8. Rollback

- Only on the owner's word, and only with the exact backup folder of the deploy being undone:
  `py deploy.py --target L:\System-research\radar --rollback <backup folder>` (also refused 05:30–07:30).
- Lesson of 2026-10-31 (a rollback pressed by mistake left 1.6.2 running while the commit said 1.6.3): after any
  rollback, print the live version, write it in the ledger and in `LO-TRINH.md`, and check the next morning's
  `run-history.txt`. Never leave a rollback command where it can be run by accident (a shortcut, a pinned terminal).

## Never

- Deploy in 05:30–07:30, during a running task, or with a red suite.
- Copy `data\`, `exports\`, `reports\`, `config\` or `.env` into the live folder.
- Change a scheduled task (`install_*schedule*`) without the owner's word.
- Push to a remote.
