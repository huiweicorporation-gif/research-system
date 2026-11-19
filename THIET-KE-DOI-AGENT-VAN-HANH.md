# Thiết kế đội agent vận hành hệ thống

Ngày 01/11/2026. Bản đề xuất để chủ duyệt, chưa xây gì.
- Đứng dưới `CLAUDE.md` và `HIEN-PHAP-AGENT.md`.
- Nối tiếp `KE-HOACH-BO-SUNG-DOI-AGENT.md`, không thay nó.

**Nguồn đối chiếu:**
- Hai bảng tính chủ gửi ngày 01/11:
  - **"Hệ thống Agent"**: 30 agent cho kênh YouTube làm phim AI, có Họp tranh luận, tiêu chí lọc radar, chính sách YouTube.
  - **"He_thong_Agent_Quy_Trinh_Moi"**: 29 agent tiếp thị nội dung chạy trên AutoGen.
- Code đang chạy trên máy này: radar, analysis, commander.

---

## 1. Kết luận ngắn

- **Lấy bảng "Hệ thống Agent" làm khung.** Bảng này viết cho YouTube và khớp với hệ thống hiện có. Ví dụ, nó nhắc đúng ngách
  `evo-psych-en` và ngưỡng Shorts 180 giây của radar.
- **Không làm theo bảng 29 agent AutoGen.** Lý do ở mục 4.
- **Phần lớn agent trong bảng đã tồn tại dưới dạng code chạy hằng ngày**, không cần xây lại thành agent AI.
  Theo hiến pháp, code làm đường ống, AI chỉ phán xét.
- **Mảnh mới đáng xây nhất là Họp tranh luận** (mục 3), để chọn đề tài từ hồ sơ cơ hội trước khi chuyển sang xưởng.
  Mảnh này nối nghiên cứu với sản xuất. Đây chính là chỗ hở làm Bộ Não chỉ đoán đúng 12,5%.

### 1.1 So sánh hai bảng với hệ thống (chủ hỏi 02/11)

| Tiêu chí | Bảng 1: "He_thong_Agent_Quy_Trinh_Moi" (29 agent AutoGen) | Bảng 2: "Hệ thống Agent" (30 agent YouTube) |
|---|---|---|
| Viết cho việc gì | Tiếp thị nội dung: blog, LinkedIn, WordPress, SEO trang web | Kênh YouTube làm phim AI, video dài + Shorts |
| Khớp radar đang chạy | Không: phải xây lại từ đầu | Rất khớp với `radar\config\radar.toml`: cùng vùng US/GB/CA/AU, Shorts ≤ 180 giây, mốc 10.000 view, mức thường tính riêng cho video dài và Shorts; nhắc đúng ngách `evo-psych-en` |
| Số cổng chủ phải duyệt | 8 cổng, đều dồn về một người | 3 điểm: chốt bản thống nhất, chốt kịch bản, duyệt bản dựng; khớp 4 cổng của hiến pháp |
| Chi phí | 29 agent đều gọi model trả phí, thêm Redis, PostgreSQL, Docker | Không ép hạ tầng; có luật cắt lượt phản biện để giảm chi phí; phần radar làm được bằng code |
| Chính sách YouTube | Không có | Có trang riêng: nội dung lặp khuôn, khai báo AI, làm rõ chính sách tháng 7/2026 |
| Tiêu chí số liệu | Chung chung | Có ngưỡng lọc, công thức chấm điểm, mẫu báo cáo cơ hội |
| Kỹ thuật vận hành | **Mạnh hơn**: kiểm khuôn dữ liệu giữa các bước, đường dự phòng, ngắt mạch khi API lỗi, ghi vết, chia model theo độ khó, canh chi phí | Ít nói tới |

**Chọn bảng 2 làm khung.** Lấy thêm 4 ý kỹ thuật từ bảng 1:
1. kiểm khuôn dữ liệu trước khi chuyển bước (radar đã làm với `radar.v1`; họp tranh luận làm với bản thống nhất);
2. mỗi bước có đường dự phòng (analysis đã có Claude → Gemini);
3. canh chi phí, tự hạ xuống model rẻ (Tài vụ, kế hoạch 25/10 mục 3.7);
4. rút kinh nghiệm từ kết quả (Bộ Não chấm dự đoán).

**Ba chỗ của bảng 2 không lấy nguyên:**
- **9 agent AI của cụm "Radar dữ liệu":** giữ là code. Radar đã làm phần lớn việc đó mỗi ngày, 0 đ. AI chỉ thêm ở chỗ cần
  phán xét (mẫu tiêu đề, thumbnail).
- **Ngưỡng lọc của bảng** (vượt trội ≥ 3 lần, tương tác ≥ 2%, Shorts ≥ 100.000 view): đối chiếu với ngưỡng radar ở GĐ2
  bằng dữ liệu thật, không thay ngay.
- **Danh mục thể loại** (thần thoại, lịch sử, khoa học viễn tưởng…): radar hiện chỉ quét ngách `evo-psych-en` (thuộc nhóm A
  của bảng). Thêm thể loại là thêm ngách, chủ quyết riêng.

## 2. Ba mươi agent trong bảng, đối chiếu với hệ thống thật

Cột "Giai đoạn": **có** = đã chạy; **GĐ1–3** = xây theo mục 5; **xưởng** = thuộc youtube-main trên máy sản xuất,
không xây lại ở đây.

| # | Agent trong bảng | Hiện có gì | Giai đoạn |
|---|---|---|---|
| 1 | Điều phối | Tổng chỉ huy (phiên Claude Code này), giao ban 08:30, sổ cái lệnh | có |
| 2 | Phản biện | Chưa có | GĐ1: thẻ `phan-bien` |
| 3 | Thu nhận và chuẩn hoá | Radar: lưu ảnh chụp mỗi ngày theo mã video, xuất khuôn `radar.v1` | có (code) |
| 4 | Làm sạch | Radar: một mã video một dòng mỗi ngày, gộp từ khoá trùng | có (code) |
| 5 | Lọc ngách và rủi ro | Radar lọc đúng ngách, đúng ngôn ngữ. **Chưa có cờ rủi ro chính sách** | có một phần; cờ rủi ro ở GĐ2 |
| 6 | Chấm điểm hiệu suất | Radar: hệ số vượt mức thường của kênh, Trend Score, view/giờ | có (code) |
| 7 | Phát hiện xu hướng | Radar: từ khoá đang lên so 7 ngày, vùng đề tài so hôm trước | có (code) |
| 8 | Phân tích bình luận | Chưa có. Cần `commentThreads` (API chính thức, tốn quota), chỉ lưu dạng tổng hợp | GĐ3 |
| 9 | Phân tích tiêu đề và thumbnail | Analysis đã đo mở đầu, nhịp cắt, lời đọc. **Chưa có tiêu đề và thumbnail** | GĐ2 |
| 10 | Tìm cơ hội | Radar: điểm cơ hội từng vùng; `radar brief` viết hồ sơ cơ hội hạn 48 giờ | có (code) |
| 11 | Kiểm chứng số liệu | Analysis có cặp đối chứng và cờ. **Chưa có mức tin cậy, chưa dò view bất thường** | GĐ2 |
| 12 | Nghiên cứu | Thẻ `trinh-sat` (đọc radar), `giai-ma` (đọc analysis) | có |
| 13 | Ý tưởng | Chưa có | GĐ1: thẻ `y-tuong` |
| 14–16 | Thumbnail, SEO, Biên kịch | Xưởng 8 khâu | xưởng |
| 17 | Biên tập và Kiểm duyệt | Xưởng soát kịch bản. **Trong họp cần một góc nhìn chính sách** | GĐ1: thẻ `kiem-duyet` (chỉ đánh giá) |
| 18–19 | Đạo diễn, Thiết kế nhân vật | Xưởng. **Trong họp cần góc nhìn "làm được bằng AI không, tốn bao nhiêu"** | GĐ1: thẻ `dao-dien` (chỉ đánh giá) |
| 20–23 | Tạo hình, video, giọng, nhạc | Xưởng | xưởng |
| 24–26 | Dựng, phụ đề, kiểm tra chất lượng | Xưởng; số đo "tỉ lệ ảnh phải tạo lại" (kế hoạch 25/10, mục 3.5) | xưởng |
| 27 | Shorts | Xưởng | xưởng |
| 28 | Đăng tải | Máy ảo đăng bài; **cổng 2: chủ duyệt** | có, giữ cổng |
| 29 | Cộng đồng | Chưa có. Gửi trả lời là cổng 4, nên chỉ soạn nháp | GĐ3 |
| 30 | Phân tích kênh mình | Gạch 7, chờ kênh tiếng Anh có video | GĐ3 |

## 3. Họp tranh luận: mảnh xây trước

Theo đúng trang "Họp tranh luận" và "Chấm điểm phương án" trong bảng, điều chỉnh cho hợp hiến pháp.

- **Khi nào chạy:** khi chủ gõ "họp chọn đề tài" trong phiên Tổng chỉ huy, thường ngay sau giao ban.
  - Chạy bằng thuê bao, vì chủ đang ngồi đó.
  - **Không chạy nền, không chạy theo lịch** (hiến pháp mục 3).
- **Đầu vào:**
  - Hồ sơ cơ hội mới nhất `ho-so\<ngày>-<vùng>\` (`de-bai.txt`, `hop-dong.json`).
  - Cặp video nổ và giả thuyết trong `analysis\<ngày>\breakouts.json`.
  - Số liệu kênh mình, khi có (Gạch 7).
- **Các vòng:**

  | Vòng | Việc | Ai làm |
  |---|---|---|
  | 0 | Trình bày cơ hội kèm mức tin cậy; đưa 3–5 phương án kèm logline, hướng tiêu đề và thumbnail | `trinh-sat`, `y-tuong` |
  | 1 | Mỗi thẻ đánh giá độc lập, không xem ý kiến thẻ khác (chạy song song) | `trinh-sat`, `kiem-duyet`, `dao-dien`, `y-tuong` |
  | 2 | Phản biện, tối đa 2 lượt; mỗi thẻ phải nêu ít nhất một điểm yếu của phương án mình ủng hộ | `phan-bien` và các thẻ trên |
  | 3 | Chấm điểm 1–5 theo 6 tiêu chí, trọng số 25/20/20/15/10/10 như bảng | các thẻ chấm; **code tính điểm** |
  | 4 | Gộp thành bản thống nhất, ghi cả ý kiến chưa đồng thuận | Tổng chỉ huy |
  | 5 | Chủ chốt, hoặc bác kèm lý do (lý do được ghi lại để rút kinh nghiệm) | **chủ** |

- **Luật giữ nguyên từ bảng:**
  - Phương án bị `kiem-duyet` chấm rủi ro chính sách cao thì loại, dù điểm cao.
  - Hai phương án đầu chênh nhau dưới 0,3 điểm thì đưa cả hai cho chủ chọn.
- **Đầu ra:**
  - `ho-so\<…>\ban-thong-nhat.md` theo mẫu 10 mục của bảng.
  - Một dòng lệnh trong `so-cai\lenh.jsonl`, kèm dự đoán đã có trong `hop-dong.json` (≥ 5 lần mức thường trong 7 ngày,
    chỉ tính khi video được đăng đúng hạn).
- **Bàn giao sang youtube-main** vẫn là cổng 4 (`--apply`): chủ duyệt riêng.
- **Chi phí:** 0 đ tiền mặt. Mỗi cuộc họp khoảng 6–8 lượt gọi agent con, trừ vào hạn mức tuần của thuê bao.

## 4. Vì sao không làm theo bảng 29 agent AutoGen

- **Bảng viết cho blog, LinkedIn, WordPress và SEO trang web.** Khoảng một phần ba số agent không có việc trong một kênh YouTube.
- **Tốn hơn nhiều so với cách hiện tại.**
  - Bảng cần 29 agent gọi model trả phí (GPT-4o, Claude Sonnet), cộng Redis, PostgreSQL, Docker.
  - Xưởng hiện đã chi khoảng 1,3 triệu đ/ngày tiền AI (số trên vps1 ngày 21/10, chưa đối chiếu sổ ví).
- **8 cổng duyệt dồn hết về một người.** Hiến pháp chỉ giữ 4 cổng: tiền, đăng bài, danh tính, tác động ra ngoài.
- **Trái với quyết định ngày 25/10:** tự viết bằng Python, không dựng framework agent mới (kế hoạch 25/10, mục 8).
- **Ý tốt giữ lại**, đã có chỗ trong thiết kế này:
  - kiểm khuôn dữ liệu giữa các bước (radar đã làm với `radar.v1`);
  - đường dự phòng cho từng bước;
  - một chỗ canh chi phí (Tài vụ, kế hoạch 25/10, mục 3.7);
  - rút kinh nghiệm từ kết quả (Bộ Não chấm dự đoán).

## 5. Các giai đoạn

| Giai đoạn | Việc | Chi phí | Xong khi |
|---|---|---|---|
| **GĐ1** (làm ngay nếu chủ đồng ý) | 4 thẻ agent mới (`phan-bien`, `y-tuong`, `kiem-duyet`, `dao-dien`, chỉ đọc); kỹ năng `hop-tranh-luan`; lệnh tính điểm `py -m commander score` (test đỏ trước); mẫu bản thống nhất | 0 đ | Một cuộc họp thật trên hồ sơ `2026-10-26-salt` ra bản thống nhất và chủ chốt |
| **GĐ2** | Radar thêm cờ rủi ro chính sách, mức tin cậy cho từng cơ hội, dò view bất thường (code, trong radar-dev, test đỏ trước); mẫu tiêu đề và thumbnail của video nổ (điểm phán xét AI) | 0 đ nếu chạy khi chủ có mặt; chạy theo lịch thì cần chủ chốt API key có trần | Hồ sơ cơ hội có mức tin cậy và cờ rủi ro, chạy 3 ngày liền |
| **GĐ3** | Phân tích bình luận (tổng hợp); số liệu kênh mình (Gạch 7); nháp trả lời bình luận | Quota YouTube; OAuth chính chủ (cổng 3) | Có kênh tiếng Anh với ≥ 10 video |
| **Xưởng** | Thẻ vai trò cho 8 khâu và số đo chất lượng | Cần chủ cấp code xưởng và Não (kế hoạch 25/10, mục 7) | Theo kế hoạch 25/10 |

Sau GĐ1, sơ đồ hệ thống (`Documents\Claude outputs\so-do-he-thong.html`) sẽ được thêm khối "Họp tranh luận" giữa Hồ sơ cơ hội và
youtube-main.
