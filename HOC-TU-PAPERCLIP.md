# Học từ Paperclip (đọc 2026-11-08)

Nguồn: https://github.com/paperclipai/paperclip (MIT, khoảng 112 nghìn sao, TypeScript, khoảng 14.800 file).
Đã đọc: `README.md`, `doc/GOAL.md`, `doc/SPEC.md` (§1–7, 12–13), `doc/TASK-WATCHDOG.md`,
`doc/agent-permission-defaults.md`, skill `diagnose-why-work-stopped`.
Chỉ đọc để học, **không cài**.

## Paperclip là gì

Đây là một "bảng điều khiển" cho cả công ty agent: sơ đồ tổ chức, việc giao theo phiếu, ngân sách, cổng duyệt,
"nhịp tim" đánh thức agent theo lịch. Nó tự nhận là không chạy agent mà chỉ điều phối; agent (Claude Code,
Codex, Gemini CLI…) chạy ở chỗ khác rồi báo về.

## Không cài, vì sao

- Nó được làm cho agent chạy 24/7 bằng Claude Code hoặc Codex chạy nền. `HIEN-PHAP-AGENT.md` §3 cấm agent chạy
  nền bằng thuê bao Claude Pro hay Google AI Pro.
- Gồm máy chủ Node, cơ sở dữ liệu và giao diện web, khoảng 14.800 file. Kênh mình có một chủ và vài phòng; trang
  Tổng chỉ huy cùng sổ cái đã làm phần lõi.
- Cùng lý do đã từ chối OpenSquilla: trùng thiết kế Tổng chỉ huy, thêm một khung lớn phải bảo trì.

## Học được (theo thứ tự đáng làm)

1. **Ngân sách ba tầng** (SPEC §6):
   - nhìn thấy chi tiêu theo agent, theo việc, theo dự án;
   - cảnh báo mềm ở 80%;
   - trần cứng thì tự dừng và báo chủ, chủ có thể nâng trần.
   Studio mới có trần cứng. Thêm: ghi chi phí theo từng lệnh trong `so-cai`, báo khi chạm 80% trần ngày, tháng
   (`api-keys.json`, `monthly_cap_vnd`).
2. **Một việc, một người làm, có khoá** (nguyên tắc 7). Ngày 08/11 suýt có hai tiến trình Studio cùng ghi
   `woman-a/state.json` khi chạy lại SEO trong lúc đang đọc giọng. Thêm: file khoá cho mỗi dự án Studio; tiến trình
   thứ hai phải dừng và báo.
3. **Người gác việc đã dừng** (Task Watchdog). Khi cả cây việc đứng yên, một agent đọc bằng chứng xem dừng có đúng
   không: "xong" có bằng chứng chưa, có bị chặn thật không.
   - Ở mình, `finish.ps1` ghi `STOP` vào log nhưng không ai được báo.
   - Thêm (bằng code, không phải agent chạy nền): mỗi sáng đọc `so-cai/lenh.jsonl` và log các đường ống; lệnh
     quá `kiem_ngay` hoặc đường ống `STOP` thì hiện lên trang Tổng chỉ huy.
4. **Hai nhóm cổng duyệt của Hội đồng** (SPEC §1): "thuê agent mới" và "kế hoạch chiến lược của CEO trước khi chạy".
   Áp vào thiết kế tự vận hành: máy đề xuất kế hoạch tuần (đề tài, lịch, chi phí ước tính), chủ duyệt **một lần**,
   sau đó máy tự chạy trong khuôn đó. Bốn cổng của mình vẫn giữ.
5. **Dừng phải êm** (Heartbeat, Pause): báo dừng, để bước đang chạy kết thúc gọn, không mở bước mới. Mỗi đường
   ống cần lệnh `pause` và `status` thay vì giết tiến trình như hôm nay.
6. **Mọi việc gắn mục tiêu** (nguyên tắc 4). Lệnh trong sổ cái đã có `ly_do` và `du_doan`. Thêm trường mục tiêu
   (ví dụ "Why Humans 1.000 sub") để đo việc nào thật sự đẩy mục tiêu.
7. **Báo lỗi, không tự sửa lặng lẽ; không tự giao lại việc** (nguyên tắc 6, Anti-Requirements). Trùng hiến pháp
   của mình, giữ nguyên.
8. **Skill có bộ thử** (Skill Studio: saved test inputs, version history). Cho `hop-tranh-luan` và các skill tự
   viết một vài đầu vào mẫu cùng kết quả mong đợi, để sửa skill không làm hỏng âm thầm.
9. **Ba loại "dừng"** (diagnose-why-work-stopped):
   - đang chờ thật (chủ hoặc bên ngoài phải làm);
   - việc agent làm được nhưng không ai cầm;
   - đã có việc khác lo.
   Dùng cách chia này khi báo cáo việc tồn.

## Gắn vào kế hoạch

Các mục 1–5 đưa vào bản thiết kế tự vận hành đang chờ trình chủ (đường ống radar → hồ sơ → họp → kịch bản →
Studio → tải lên riêng tư → báo chủ), cùng bản sửa `HIEN-PHAP-AGENT.md` §3.
