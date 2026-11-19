# Học từ "Hành trình 30 ngày kiếm tiền với YouTube — Ngày 14: Tối ưu footage và edit" (đọc 2026-11-16)

Nguồn: bản ghi nội dung video do chủ dán vào phiên ngày 16/11/2026. Tác giả làm nhiều kênh trên một VPS (3/20 kênh đã
bật kiếm tiền). Số liệu là **của kênh họ và của ngách khác**: 21 video từ 800 nghìn đến hơn 3 triệu lượt xem, 17 kênh
tâm lý học, có kênh tiếng Nhật. Vì vậy chỉ coi là **giả thuyết**, không phải luật. Kênh mình phải tự đo lại.

## Ý chính của bài

- Watch time và mức hài lòng của người xem là tín hiệu lõi của hệ thống đề xuất. Tác giả dẫn tài liệu của YouTube
  (Cristos Goodrow, 2021) và Google (2016).
- Đọc 3 số trong Studio ở mốc 168 giờ:
  - thời lượng xem trung bình (%);
  - Intro: còn bao nhiêu người ở giây 30;
  - đường giữ chân: mất bao nhiêu điểm trong 30 giây đầu, so với 90 giây sau đó.
  Kênh tốt nhất của tác giả: 10 giây còn 82,5%, 30 giây còn 61,6%, 1 phút còn 51,6%, 2 phút còn 43%. Tức là 30 giây
  đầu mất gấp đôi 90 giây tiếp theo.
- So với 21 video thắng, video của tác giả khác ở 5 điểm:
  - chữ lớn ngay giây đầu (21/21);
  - cắt ít hơn: 1, 4, 4 lần ở các đoạn 0–10, 10–30, 30–60 giây;
  - nói số hay nói đồ vật thì hình hiện đúng thứ đó (20/21);
  - không mở bằng nhạc;
  - không dùng ảnh nhỏ đặt giữa nền mờ.
- Cách sửa:
  - chữ lớn ở giây 0;
  - giữ cảnh lâu hơn, có pan hoặc zoom chậm;
  - thẻ số liệu, thẻ icon;
  - hình AI chỉ chiếm 60–70%;
  - có khoảng lặng: giọng dừng, hình tối dần, nhạc lên.
- Làm 30 giây đầu như một sản phẩm riêng, dồn công sức vào đó nhiều hơn cả phần còn lại.

## Kênh mình đang ở đâu (Why Humans, số ngày 16/11)

| Điểm | Kênh mình | Nhóm video thắng của nguồn |
|---|---|---|
| Đường giữ chân (video muối, **chỉ 14 lượt xem**) | 10 giây 92%, 30 giây 62%, 1 phút 46%, 2 phút 15%; xem trung bình 21% | 30 giây 60–64% |
| Mất điểm | 38 điểm trong 30 giây đầu, **thêm 47 điểm** từ 0:30 đến 2:00 | mất nhiều nhất ở 30 giây đầu |
| Chữ lớn ở giây 0 | 0/3 video (chỉ có phụ đề) | 21/21 |
| Số lần cắt ở 0–10 / 10–30 / 30–60 giây | 1–2 / 3–5 / 6–8 | 1 / 4 / 4 (**mình đã gần bằng**) |
| Nói số thì hiện thẻ số | khoảng 0 (26, 21, 41 cảnh có nói số; hình nào cũng là cảnh AI) | 20/21 |
| Tỷ lệ hình AI | 100% | 60–70% |
| Nhạc nền, khoảng lặng | không có | có |

Video phụ nữ và video giờ giấc chưa có lượt xem nên chưa có đường giữ chân. Video 3 vừa lên lúc 21:51.

Điều đáng chú ý: video muối không chỉ mất người ở 30 giây đầu mà **tiếp tục rơi đến phút 2**. Nếu điều này lặp lại ở
các video sau, phần cần sửa không chỉ là hook mà cả hình và nhịp sau hook. Nhưng 14 lượt xem là quá ít để kết luận.

## Đã đưa vào hệ thống

- **Kho bài học** (`tru\tru.db`, ghi bằng lệnh `py -m commander lesson`, không sửa tay):
  - 3 quan sát kênh mình: `QS-20261116-01` (đường giữ chân video muối), `-02` (giây 0 không có chữ, không thẻ số, 100% AI,
    không nhạc), `-03` (nhịp cắt).
  - 5 bài học ở mức **giả thuyết**, chợ `evo-psych-en`, phòng `dao-dien`:
    - `BH-001`: 30 giây đầu làm riêng;
    - `BH-002`: chữ lớn ở giây 0;
    - `BH-003`: nói số thì hiện thẻ số;
    - `BH-004`: hình AI 60–70%;
    - `BH-005`: khoảng lặng có nhạc.
    Mỗi bài có ghi khi nào áp dụng, khi nào không, và dự đoán để chấm.
- **Skill `giam-sat-kenh`**, mục 7: ở ngày 7, agent giám sát kênh luôn đọc 3 số trên, kèm số lượt xem đứng sau. Dưới
  khoảng 100 lượt xem thì ghi "mẫu nhỏ" và không rút ra bài học.
- **Thẻ agent `dao-dien`**: trong buổi họp, agent này nêu cho mỗi phương án:
  - 30 giây đầu (giây 0, 0–10 và 10–30 giây);
  - chữ ở giây 0;
  - cảnh nào cần thẻ số, bản đồ hoặc ảnh có giấy phép tự do;
  - Studio còn thiếu gì để làm được.
- **Bản thống nhất của buổi họp** có thêm dòng "30 giây đầu".

## Chưa làm, cần chủ quyết

- **Studio chưa làm được**: thẻ chữ ở giây 0, thẻ số và biểu đồ, nhạc nền, khoảng lặng. Hình ngoài AI cũng chưa có
  (ảnh tự do giấy phép phải ghi nguồn, soát theo dòng 3 của cổng C). Đây là việc sửa code Studio, chưa làm.
- **Chuyển bài học sang "đang thử"**: chỉ chủ chuyển được, hoặc một agent khác người đề xuất. Lúc này để là giả thuyết.
  Bài nào cần Studio làm thêm thì chỉ thử được khi Studio đã có bước đó.
- **Đo nhóm video thắng của chính ngách mình**: số 21/21 là của ngách khác. Phòng Giải mã có thể đếm cùng 5 điểm trên các
  video nổ của `evo-psych-en`.
- **Bật kiếm tiền từ từ, chia chặng 0 → 500 → 1.000 người đăng ký**: kênh mình mới có 13 người đăng ký nên chưa đến lúc.
  Kế hoạch 10 video đã là chặng đầu.
