# Sửa phân phối · Why Humans (@whyhumansus) · 2026-11-18

Lý do: lệnh `L-20261116-01` chấm đúng. YouTube gần như không hiển thị video dài của mình: 6a9tjVX45e0 có 4 lượt, WuXtQ3rk_qw có 1 lượt. Theo `ho-so\thi-truong\evo-psych-en-ngay-30.md`, phải sửa phân phối trước, chưa đụng ảnh bìa.

## Đọc được gì (số liệu 28 ngày, đến 16/11; lượt hiển thị có đến 14/11)

| Dấu hiệu | Số | Nguồn |
|---|---|---|
| Video dài đầu tiên (muối, bmmtuMAZlZk) | 448 lượt hiển thị, CTR 1,79%, 14 view, xem trung bình 21% | `2026-11-18.analytics.json` |
| Ba video dài sau | 4, 1 và chưa có lượt hiển thị | `reach\*.csv` |
| Lượt hiển thị theo nguồn | video liên quan 429, tìm kiếm 101 (CTR 0%), người đăng ký 16 | `reach_28d.sources` |
| Nước xem, cả kênh | VN 1.898 view, US 197, KE 29, IN 20 | `countries` |
| Short "chip" (bGCMnMGW5gQ) | 79 trên 82 view đến từ VN | YouTube Analytics, đọc 18/11 |
| Short "muối" (1AIjdSiKDxA) | US 146, KE 29, IN 20 | YouTube Analytics, đọc 18/11 |
| Video cũ trên kênh | 9 video tiếng Việt và lạc đề từ 02/2025 (Thích Minh Tuệ, Achan Báu, "I Tried NEW TECHNIQUE") | `2026-11-18.json` |

Diễn giải, **chưa chứng minh**:
1. YouTube đã thử video muối với khoảng 450 lượt hiển thị. Tỉ lệ bấm thấp (1,8%) và người xem chỉ xem 21%, nên YouTube dừng đẩy. Mấy video sau gần như không được thử.
2. Lịch sử của kênh là tiếng Việt và phần lớn người xem ở Việt Nam. Vì vậy YouTube khó biết nên đưa video tiếng Anh cho ai.
3. Tiêu đề và mô tả đã có từ khoá tìm kiếm (mô tả mở đầu bằng câu hỏi, tag đúng chủ đề). Đây không phải lỗi chính, nhưng một số tiêu đề chưa đúng câu người ta gõ.

## Việc sửa

| # | Việc | Ai làm | Đảo ngược được |
|---|---|---|---|
| 1 | Chuyển 9 video cũ sang **riêng tư**, không xoá: uETQxxiSVUs, cDVnYzRj1rs, R6Bz0XZtnIU, BgBLeViKgM8, eFWkpjBqYHs, L0pQm-isIjM, hixbBY1e_Qg, bPRdjrBxVWs, i_mubuNXO4g | Chủ, trong YouTube Studio (hệ thống không bao giờ đổi quyền riêng tư) | Có |
| 2 | Đổi 3 tiêu đề theo đúng câu tìm kiếm (bảng dưới) | Hệ thống, `py -m commander channel edit`; tiêu đề cũ được ghi vào `youtube-edits.jsonl` | Có |
| 3 | Gắn "Video liên quan" của 2 Short (muối 1AIjdSiKDxA, chip bGCMnMGW5gQ) vào video dài muối bmmtuMAZlZk | Chủ, trong Studio: Shorts → Chi tiết → Video liên quan | Có |
| 4 | Từ video dài kế tiếp: mỗi video dài có 1–2 Short cắt từ chính nó, gắn video liên quan về nó | Dây chuyền sản xuất, đề xuất sau | — |

Tiêu đề (ngắn hơn, dạng câu hỏi giống các kênh nhỏ đang thắng, như "Why Did Humans Start Wearing Clothes?" 942 sub với 325 nghìn view):

| Video | Tiêu đề hiện tại | Tiêu đề mới |
|---|---|---|
| salt-d · bmmtuMAZlZk | Why Humans Crave Salt: A 100-Million-Year-Old Instinct | Why Do Humans Crave Salt? The Ancient Reason |
| woman-a · WuXtQ3rk_qw | Why Women Live After 50: The Grandmother Puzzle | Why Do Women Live So Long After Menopause? |
| pilot-a-2min · 6a9tjVX45e0 | How Did Early Humans Tell Time Without Clocks? | How Did Ancient Humans Tell Time Without Clocks? |
| 2026-11-08-hair-b · f2Zc2LLKqUQ | When Did Humans Lose Their Fur? A Gene Holds a Clue | giữ nguyên (đã đúng câu tìm kiếm; video mới 2 ngày) |

Giữ cố định theo kế hoạch 10 video: vùng chủ đề, kiểu hình, giọng, độ dài, ảnh bìa.

## Đã làm

- 18/11 19:24: chủ nói "Đồng ý đổi". Đã đổi 3 tiêu đề và đọc lại từ YouTube: cả ba công khai, đúng tiêu đề mới, giữ nguyên tag và mô tả. Tiêu đề cũ lưu trong `studio-projects\<dự án>\youtube-edits.jsonl`.
- Việc 1: chủ đã chuyển 9 video cũ sang riêng tư. Đọc lại từ YouTube ngày 18/11: 9/9 `private`.
- Việc 3 (video liên quan của 2 Short): chủ báo 18/11 rằng kênh chưa xác minh nên Studio không cho gắn video liên quan. Muốn mở được thì chủ xác minh kênh bằng số điện thoại tại youtube.com/verify. Cách thay thế không cần xác minh: thêm dòng đầu mô tả của 2 Short (dự án salt-d-short1, salt-d-short2) dẫn tới https://youtu.be/bmmtuMAZlZk. Chủ đồng ý, nhưng khi đọc mô tả thật trên YouTube thì cả 2 Short đã có sẵn dòng "The full story: https://www.youtube.com/watch?v=bmmtuMAZlZk" ngay câu đầu, nên không sửa gì. Chủ kiểm 18/11: điện thoại đã xác minh (tính năng bậc trung đã bật); tính năng nâng cao chỉ "Đủ điều kiện", không tự bật được. YouTube tự bật khi kênh đăng đều khoảng 30 ngày. Khi mục đó thành "Đã bật", chủ gắn video liên quan cho 2 Short. Đến lúc đó, link trong mô tả là đủ.
- Cập nhật 18/11 tối: chủ đã gửi xác minh qua video cho tính năng nâng cao; Google báo xác minh xong trong vòng 24 giờ. Khi "Đã bật": (a) chủ gắn video liên quan cho 2 Short; (b) video dài kế tiếp dùng thử nghiệm A/B của YouTube với các cặp tiêu đề và ảnh bìa A/B/C Studio đã làm.
- Cập nhật 18/11: chủ báo đã có quyền dùng "Video liên quan", rồi báo đã gắn xong cho 2 Short (1AIjdSiKDxA, bGCMnMGW5gQ) sang bmmtuMAZlZk. API YouTube không trả trường này nên chưa đọc lại được; ngày 25/11 xem nguồn "SHORTS" và "RELATED_VIDEO" của video muối.
- Việc 1–3 xong. Còn: việc 4 (Short cắt từ mỗi video dài mới) và thử A/B cho video dài kế tiếp.
- Việc 4, 18/11 tối: chủ bảo cắt Short cho video lông và bà ngoại. Đã cắt 4 Short, theo cách cắt Short muối hôm 9/11, nhưng dừng 0,3 giây sau chữ cuối (cách cũ lọt nửa chữ của câu sau). Chủ "Đồng ý tải lên"; đã tải lên ở chế độ riêng tư:
  - aKMa_QeXVOk "Humans never really lost their fur" (lông, 272–317 giây) → f2Zc2LLKqUQ
  - MOU5LOGXqhc "When did humans lose their fur?" (lông, 354–408 giây) → f2Zc2LLKqUQ
  - 3fAffTSxHos "Why do women live so long after menopause?" (bà ngoại, 0–35 giây) → WuXtQ3rk_qw
  - gnOycMZXogo "Grandmother killer whales lead the pod" (bà ngoại, 198–240 giây) → WuXtQ3rk_qw

  Chủ làm trong Studio: nhãn AI, video liên quan, công khai.
- Lệnh kiểm: `L-20261118-21`, ngày 2026-11-25.

## Kiểm lại

Sau 7 ngày (2026-11-25), cộng lượt hiển thị của 4 video dài từ ngày sửa. Có thêm từ 50 lượt mỗi video trở lên là phân phối đã mở; vẫn dưới 50 thì xét bước kế tiếp (đổi giờ đăng, Short dẫn sang).
