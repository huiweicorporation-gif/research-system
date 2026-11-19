---
name: kiem-chinh-sach
description: Policy and rights checks (Pháp chế & An toàn, Kiểm duyệt, Phát hành) in three modes - A screen a new dossier's zone against the owner's exclusions before any meeting, B rate episode options in the debate meeting (agent kiem-duyet), C the checklist before the owner presses upload (gate 2). Use for "vùng này làm được không", "soát chính sách", "kiểm trước khi đăng", and inside hop-tranh-luan.
---

# Kiểm chính sách

Departments: **Pháp chế & An toàn** (rules), **Kiểm duyệt** (`kiem-duyet` in the meeting), **Phát hành**
(gate 2). This skill only checks and reports. Uploading, scheduling, editing a live video and replying to
comments stay with the owner (constitution §2, gates 2 and 4).

Policies change. When a point depends on a rule you are not sure is current, say so and put the risk one step
higher, never lower (`kiem-duyet.md`).

## Mode A: zone screen (a new dossier, before a meeting)

Input: `ho-so\<day>-<zone>\de-bai.txt` and `hop-dong.json`.

1. Read the market (`niche_id`), the zone terms and the example video title.
2. Check them against the owner's exclusions:
   - Why Humans (`evo-psych-en`): `ho-so\ke-hoach-10-video.md`, "Bỏ có chủ đích": dating and sex psychology
     zones (off the channel, policy risk), `creepy`, `mediev`, `roman`, `cats`; `iron`, `lost`, `farm` only as Shorts.
   - Any market: real living people, content made for children, health or money advice spoken by an AI character.
   - A market with no written exclusion list (Dog Mind today): do not guess one; ask the owner.
3. Answer one of three:
   - **ổn**: no exclusion touched;
   - **cần chủ quyết**: close to an exclusion, or the example video is borderline;
   - **nên bỏ**: inside an exclusion; name the rule and the line it comes from.

Examples (`evo-psych-en` daily briefs; all still drafts on 2026-11-14):
- `2026-11-11-creepy` (84/100): "creepy" is on the list by name: **nên bỏ**.
- `2026-11-12-hot` (84/100): example video about compliments in dating, zone held by a dating-psychology channel:
  **cần chủ quyết** (close to "tâm lý hẹn hò").
- `2026-11-14-inch` (85/100, rank 1/152): example video about sexual anatomy: **nên bỏ**, unless the owner says otherwise.

## Mode B: the debate meeting (`kiem-duyet`)

Follow `kiem-duyet.md` exactly: per option a risk `thap` / `trung-binh` / `cao`, the rule behind it and what would
lower it; scores `rui_ro` and `doc_dao`; one JSON block. An option rated `cao` is out whatever its score.
Also say when an option breaks mode A's exclusions.

## Mode C: before the owner uploads (gate 2)

Input: the Studio project `studio-projects\<project>\` and its dossier. Check each line and give the evidence:

| # | Check | Evidence |
|---|---|---|
| 1 | The video file exists, is not empty, and has real narration | file and size; narration audio present |
| 2 | Every fact in the script has a source | the sources table of the script |
| 3 | No footage, music, title, thumbnail or story copied from another video | compare with the dossier's source videos |
| 4 | AI disclosure ("altered or synthetic content" in YouTube Studio), decided by this rule, not by feel: **yes** when any picture could pass for a photo or film of real people, places or events, including a realistic "scientific reconstruction" of early humans; **not required** when every picture is plainly drawn, painted or animated; **unsure = yes**. Never try to avoid YouTube's own detection: it can add the label itself | name the scene that decides it (`scenes\` image), then yes or not required |
| 5 | No AI-origin marks removed (C2PA, SynthID) | the project's pictures keep their metadata |
| 6 | Right channel: the handle given with `--channel` (none = Why Humans); never TL4-T7 | the command the owner will run |
| 7 | Not a repeat of a sister channel's recent idea | titles in `kenh-minh\<other channel>\<latest day>.json` |
| 8 | Title and thumbnail keep the promise of the chosen option, and serve the video's mission | `ho-so\<dossier>\de-bai-<X>.txt` and its MISSION line; for `search`, the title holds the words people type (the query in that line) |
| 9 | Not mass-produced or repetitive content (YouTube monetization policy "inauthentic content", 2025-07-15; its example: picture slideshows with the same narration reused) | the script, title and scene list against the channel's last 3 long videos (`studio-projects\*\script.md`): its own question, its own research and sources, its own story; no narration lines (beyond the closing call to action) or scene images reused. Our c1 format (stills, pan/zoom, AI voice, one template) is exactly the kind the policy names, so the content must be clearly its own: any reused narration or picture is ✗, and the report always names the shared format as a standing risk |

| 10 | Audience set explicitly, never left blank: `channel upload` sends `selfDeclaredMadeForKids: false` (`commander\channel.py`), so the video must not be made for children (child characters as the audience, nursery style, a topic or language aimed at kids). If it is, ✗: stop, the owner decides; the flag is never changed silently | the script's audience and the thumbnail; after upload, YouTube Studio shows "No, it's not made for kids" |

Line 9 was added by the owner on 2026-11-16 after reading a summary of YouTube's published rules. It touches monetization,
not distribution; when in doubt, rate it one step higher. Line 4's rule and line 10 were added on 2026-11-18 (owner, from
the Agentic Studio comparison `commander\docs\doi-chieu-agentic-studio.md`, item 3).

Then show the owner the command and stop: `py -m commander channel upload [--channel @handle] <project>`
uploads as **private**; making it public stays the owner's step in YouTube Studio.

## Output (Vietnamese)

Mode A: one line of verdict, the rule, the line it comes from. Mode B: per `kiem-duyet.md`. Mode C: the table with
✓ / ✗ / "chưa kiểm được", then one question to the owner.
