# Vòng 2 · phản biện · 2026-11-10

## Phản biện (phan-bien) — hut, doc_dao
A 3/3 · B 3/2 · C 2/2 · D 2/3.

Bốn điểm chính:
1. Hàn: video dài tâm lý chó chỉ có MỘT kênh (강아지의 비밀). Chưa chứng minh được 9 chủ đề còn lại có người xem.
2. Đức: bằng chứng dựa vào nhân vật AI hư cấu bị chê. Phương án A lại đi ngược kiểu tiêu đề đã thắng (A bỏ giật gân) và
   làm video ngắn hơn (10–12 phút so với 15–23).
3. Một ngày dữ liệu không đủ để chọn thị trường. Không lấy RPM chưa đo làm lý do. Không lấy con số 74 triệu view
   (phần lớn là Shorts Jindo) làm lý do.
4. Chủ không đọc được hai thứ tiếng này, nên ba video đầu cần người bản ngữ kiểm tra.

Về các phương án:
- A và B gần như là cùng một danh sách chủ đề, chỉ dịch sang hai thứ tiếng: 8/10 chủ đề trùng nhau.
- C: bỏ ý mỗi ngày một Short. Chỉ cắt Short từ video dài.
- D: dùng làm kho chủ đề phụ, không làm phương án riêng.

13 điểm cần sửa (bản đầy đủ đã gửi agent Ý tưởng):
1. ghi mức tin cậy cho từng phương án;
2. tìm thêm kênh;
3. đặt điều kiện dừng;
4. gộp A với B;
5. nêu lý do người xem chọn kênh này;
6. tra lại nguồn khoa học;
7. có người bản ngữ kiểm tra;
8. thử giọng trước;
9. tiêu đề không bám đối thủ;
10. Short chỉ cắt từ video dài;
11. D làm kho chủ đề;
12. gắn nhãn AI, không có chuyên gia hư cấu;
13. không dùng RPM chưa đo làm lý do.

## Chủ trì kiểm tra thêm (cùng ngày)

**Thử giọng OmniVoice (sửa điểm 8)**
- Đọc 2 câu tiếng Đức và 2 câu tiếng Hàn bằng giọng narrator.pt.
- Cho Whisper large-v3-turbo nghe lại rồi chép thành chữ:
  - Đức: khớp gần như 100%, chỉ khác chữ hoa và một dấu phẩy.
  - Hàn: khớp, trừ một từ "빤히" bị nghe thành "빠이" (đọc chưa rõ), và một khoảng trắng.
- Kết luận: cả hai thứ tiếng đều không hỏng phát âm, nên không loại thị trường nào.
- Phép thử này chưa kiểm được ngữ điệu tự nhiên. Vẫn cần người bản ngữ nghe (điểm 7).
- File nghe thử: scratchpad `voice-test/test-de.wav`, `test-ko.wav`.

**Tìm thêm kênh video dài (sửa điểm 2), lấy từ outliers_by_format.long của lần chạy thử**
- Hàn: không có kênh thứ hai.
  - 강아지의 비밀 có 3 video thắng: 211K, 154K, 39,9K ("산책하면 뇌에 이런 변화").
  - 루크아빠 (huấn luyện viên thật) có 20K view, gấp 2,3 lần mức thường của kênh.
  - Các video dài thắng còn lại là kênh tàu cá, livestream, truyền hình. Không phải tâm lý chó.
  - Kết luận: bằng chứng Hàn vẫn là 1 kênh, tin cậy thấp.
- Đức: có thêm kênh nhỏ người thật, giải thích hành vi.
  - Hundeo - Hundetraining (19,4K sub): "Welche Hunderasse ist wirklich für Anfänger geeignet?" 7.825 view, gấp 32 lần mức thường.
  - Die Weisheit der Pfoten (14,9K sub): "99 Prozent aller Probleme mit deinem Hund sind ein einziges Problem" 10.325 view, gấp 3,2 lần.
  - Dog4 – Hundeverhalten verstehen (703 sub): 1.345 view, gấp 5,5 lần.
  - Katja Pohlers (2.970 sub): gấp 2,5 lần.
  - Kết luận: ở Đức, cầu cho kiểu "giải thích hành vi" có ở nhiều kênh, nhưng mức view nhỏ (1–10K). Mức lớn
    (100K trở lên) chỉ có Gerd Hallmann, kênh dùng tiêu đề cảm xúc.

## Vòng 2b · Ý tưởng sửa phương án

**Điểm chung cho mọi video**
- Gắn nhãn nội dung do AI tạo. Không dựng chuyên gia hư cấu.
- Người bản ngữ duyệt video 1.
- Short chỉ cắt từ video dài, 2–3 Short mỗi video.
- Không dùng chữ "빤히".
- Lý do người xem chọn kênh (giả thuyết, chưa đo): mỗi video trả lời MỘT hành vi cụ thể theo câu hỏi "chó đang cố làm gì". Video kết bằng một việc bạn thử được ngay tối nay. Không hù doạ.

**A + B dùng chung một khung**
- Cùng 10 chủ đề hành vi.
- Tiêu đề viết riêng cho từng thị trường.

**Các phương án sau khi sửa**
- **A · Đức · video dài 13–15 phút.** Phương án chính. Tin cậy trung bình thấp.
  - Dừng nếu cả 3 video đầu đều dưới 500 view sau 30 ngày.
  - Tiêu đề giữ cảm xúc nhẹ và không bám Hallmann.
- **B · Hàn · video dài.** Chạy thử. Tin cậy thấp, vì chỉ có 1 kênh làm bằng chứng.
  - Dừng nếu cả 3 video đầu đều dưới 1.500 view sau 30 ngày.
  - Tránh các chữ 부모 / 엄마.
- **C:** gộp vào A và B. Shorts chỉ cắt từ video dài.
- **D:** thành kho chủ đề phụ.

**10 tiêu đề**

| # | Đức | Hàn | Nghĩa |
|---|---|---|---|
| 1 | Warum legt Ihr Hund die Pfote auf Sie? Was er damit wirklich will | 강아지가 앞발을 내 몸에 올리는 이유, 뭘 원하는 걸까? | Vì sao chó đặt chân lên bạn |
| 2 | Hund gähnt ohne müde zu sein: 4 Situationen | 졸리지 않은데 하품하는 강아지, 4가지 상황 | Chó ngáp khi không buồn ngủ |
| 3 | Schwanzwedeln heißt nicht immer Freude | 꼬리를 흔든다고 다 기분 좋은 건 아닙니다 | Vẫy đuôi không luôn là vui |
| 4 | Warum dreht sich Ihr Hund vor dem Hinlegen im Kreis? | 강아지가 눕기 전에 빙글빙글 도는 이유 | Xoay vòng trước khi nằm |
| 5 | Warum legt Ihr Hund den Kopf schief? | 강아지가 고개를 갸웃거리는 이유 | Nghiêng đầu |
| 6 | 8 leise Stresssignale beim Hund | 강아지가 보내는 조용한 스트레스 신호 8가지 | 8 dấu hiệu căng thẳng thầm lặng |
| 7 | Hund schaut weg, wenn Sie schimpfen: Schlechtes Gewissen? | 혼날 때 눈을 피하는 강아지, 죄책감일까? | Quay đi khi bị mắng |
| 8 | Warum folgt Ihnen Ihr Hund auf Schritt und Tritt? | 강아지가 화장실까지 따라오는 이유 | Theo bạn từng bước |
| 9 | 5 Hundemythen, die sich hartnäckig halten | 강아지에 대한 흔한 오해 5가지 | 5 lầm tưởng về chó |
| 10 | Warum Schnüffeln beim Spaziergang so wichtig ist | 산책 중 냄새 맡게 해줘야 하는 이유 | Vì sao để chó đánh hơi |

**Điểm của Ý tưởng sau khi sửa**

| | hut | hop_kenh | doc_dao |
|---|---|---|---|
| A | 3 | 4 | 3 |
| B | 3 | 4 | 2 |
| C | 2 | 3 | 2 |
| D | 2 | 3 | 3 |
