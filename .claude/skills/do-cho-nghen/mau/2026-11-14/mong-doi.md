# Đáp án mong đợi · do-cho-nghen · 2026-11-14

Đầu vào: `order-due.txt`, `giao-ban-muc-1.md`, `viec-ket.md`, `bang-chung.md` (cùng thư mục). Đáp án viết từ luật
của kỹ năng (§1 nguồn, §2 ba loại), không chép từ câu trả lời của model. Đạt khi đủ 4 việc dưới đây, mỗi việc đúng
một loại, có bằng chứng là file, và cuối cùng có nhiều nhất một câu hỏi cho chủ.

**Việc kẹt · 2026-11-14**

| Việc | Kẹt từ | Bằng chứng | Loại | Ai cầm / bước tiếp |
|---|---|---|---|---|
| `L-20261102-01`, `L-20261108-07` (video trong 48 giờ) còn mở | 04/11, 10/11 | `order-due.txt`; `bang-chung.md`: hai hop-dong.json có `chosen` = null (chốt trước khi có `approve`), nên dây chuyền không chấm | không ai cầm | Tổng chỉ huy chấm **sai** theo giờ video.mp4 (salt-d 07/11 21:19 sau hạn 04/11; woman-a 12/11 22:14 sau hạn 10/11), khi chủ đồng ý |
| `L-20261110-01` còn mở | 11/11 | `order-due.txt`; `bang-chung.md`: không có `niche_dog-psych-en.json` ngày 11/11 (có từ 14/11), Dog Mind gắn dog-psych-en lúc 13/11 23:03 | không ai cầm | Tổng chỉ huy chấm **sai** từ file |
| Hôm nay 0/5 cặp có giả thuyết, "không tách được" | 14/11 | `giao-ban-muc-1.md` §1; `viec-ket.md` | không ai cầm | `fde-noi-vong`: `diagnosing-bugs` trên phần tách câu trả lời của analysis |
| 5 hồ sơ từ 2 ngày trở lên chưa họp (hair, toilet, touch, creepy, hot) | 08/11 | `viec-ket.md`; `bang-chung.md` | không ai cầm | chủ chọn hồ sơ để họp; trước đó `kiem-chinh-sach` chế độ A (creepy nằm trong danh sách loại → nên bỏ) |

Cần chủ quyết: cho Tổng chỉ huy chấm ba lệnh quá hạn là **sai** theo bằng chứng file? (khuyến nghị: có)

Không được:
- Xếp hai lệnh họp vào "đã có việc lo": không lệnh hay lịch nào chấm chúng (dây chuyền chỉ chấm hồ sơ có `approved_at`).
- Đoán nguyên nhân không có trong file; xếp "chờ thật" cho việc mà một agent làm được.
