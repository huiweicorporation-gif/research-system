# Lộ trình xây hệ thống — doanh nghiệp một người

~~Mỗi viên gạch chỉ được đặt khi viên trước đã chạy thật và đạt tiêu chí "Xong khi". Không đặt hai viên một lúc.~~

**Chủ quyết 26/10: xây tất cả các gạch song song**, không chờ từng giai đoạn.
- Mỗi gạch vẫn giữ tiêu chí "Xong khi" để chấm.
- Vẫn giữ nguyên CLAUDE.md: test đỏ trước, `/code-review` trước khi triển khai, không triển khai 05:30–07:30, không push.
- Vẫn giữ bốn cổng phải hỏi chủ trong `HIEN-PHAP-AGENT.md`.
- Triển khai vào hệ thống đang chạy vẫn làm từng bản một, có chạy lại trên bản sao dữ liệu.

## Kiến trúc đã chốt (20/10/2026)

| Module | Vai trò | Thư mục |
|---|---|---|
| **Radar** | Đánh ở đâu: tìm ngách, đo thị trường, bắt video đột biến | `radar\` |
| **OpenMontage** | Vì sao nó thắng: mổ xẻ video nổ, làm thử định dạng mới | `OpenMontage-main\` |
| **youtube-main** | Làm đều mỗi ngày: sản xuất 8 khâu, máy ảo đăng, đo Studio | `youtube-main\` |

Ba module nối với nhau bằng file và cổng có sẵn, không trộn code. Mọi video đều gắn nhãn
nguồn (cơ hội nào, xưởng nào, định dạng nào) để kết quả Studio chấm ngược lại radar.

**Kế hoạch bổ sung đội agent (25/10):** `KE-HOACH-BO-SUNG-DOI-AGENT.md`. Một Tổng chỉ huy (phiên Claude Code
của dự án) với giao ban sáng và sổ cái lệnh; các phòng ban là các module đã có; mảnh thiếu là hồ sơ cơ hội có hạn
48 giờ nối nghiên cứu với sản xuất. Giai đoạn 0 (viết thành văn, 0 đ) làm ngay; các giai đoạn sau xếp vào Gạch 4–7.

**Hai radar, hai việc (chủ chốt 24/10):**
- **Radar của chúng ta** (`radar\`): nghiên cứu thị trường rộng và chuyên nghiệp. Thu thập trend và dữ liệu
  trên toàn thị trường. Hôm nay mới chạy YouTube; hướng tới thêm TikTok, Facebook và các trang media Trung Quốc.
- **Radar trong youtube-main** (`core.radar_dot_bien`): chỉ theo dõi kênh đối thủ để chọn video làm lại.
  Nó vẫn nuôi trang Phòng thí nghiệm của vps1.

**Hướng mở rộng nền tảng (chưa xếp thành gạch):**
- Mỗi nền tảng mới là một viên riêng.
- Viên đó chỉ đặt sau khi các gạch hiện tại đạt tiêu chí "Xong khi", theo luật một viên một lúc.
- Trước khi xây, phải kiểm cách lấy dữ liệu hợp lệ của từng nền tảng (API chính thức, điều khoản, chi phí).
  Áp cùng luật như với YouTube: không cookie, không đăng nhập hộ, không vượt chặn.
- Đã nghiên cứu 24/10: `Documents\reports\Dữ liệu TikTok Facebook Trung Quốc.md`.
  - Tự động hoá hợp lệ được: TikTok Discovery API (cần tài khoản quảng cáo; "VN" và chi phí chưa xác nhận),
    Instagram Business Discovery / Hashtag Search, Threads keyword search.
  - Chỉ xem bằng tay: Creative Center, 巨量算数, 热搜 Weibo, 热门 Bilibili.
  - Trung Quốc: cần pháp nhân, số +86 hoặc hợp đồng doanh nghiệp.
  - Luật 91/2025 (PDPL) đẩy radar về chỉ số tổng hợp, lưu tại Việt Nam.
  - Việc của chủ trước viên nền tảng đầu tiên: thử Discovery API, cân nhắc đăng ký hộ kinh doanh hoặc công ty,
    nhờ luật sư rà 3 điểm trong báo cáo.

---

## Gạch 1: Nền dữ liệu Radar ← ĐÃ NGHIỆM THU 23/10 (đủ cả 7 tiêu chí từ 24/10)

Chạy thật hằng ngày từ 20/10 (`radar\`, bản hiện tại xem `git describe` trong `radar\`).
Nghiệm thu: `Documents\Claude outputs\brick1-signoff-2026-10-23.md`.

**Xong khi:**
- [x] `chay-lan-dau.bat` chạy qua bước kiểm tra (`doctor --online` báo "Sẵn sàng") — 20/10
- [x] Lượt chạy đầu cho mã 0 và báo cáo có: — 20/10
  - bảng trending đủ thời lượng thật và số subs;
  - ngách có ít nhất 5 đối thủ được tự phát hiện;
  - mục Radar đột biến có dữ liệu nền.
- [x] Quota một lượt dưới 2.000 đơn vị — 1.150 → 1.201 mỗi lượt
- [x] Ngày thứ 2: có số ở +View 24h, video MỚI lọt bảng, từ khoá đang lên — 21/10
- [x] Lịch 06:30 tự chạy 3 ngày liên tiếp — 21, 22/10 theo lịch; 23/10 chạy bù (chấp nhận theo phương án A);
  24/10 lịch mới (06:30 + 08:30 + khi đăng nhập) tự chạy lúc 06:33. Nhật ký: `radar\data\logs\run-history.txt`
- [x] Đã duyệt danh sách đối thủ — 24/10 20:45: bỏ 9 kênh lạc ngách, giữ 11 kênh lõi
  (theo `Documents\Claude outputs\advisor-check-2026-10-23.md`). Còn để chủ tự quyết: ICR, Zoomology,
  Female Seduction, Psychology with Dr Ms, History of India Explained
- [x] Đã tắt lịch cũ `YouTubeTrendRadar_DailyPipeline` — chủ tắt 24/10 07:05

## Gạch 2: Mổ xẻ video nổ ← ĐÃ NGHIỆM THU 29/10 (3 ngày liên tiếp 25–27/10 đạt: 5, 5, 4 cặp có giả thuyết)

VideoAnalyzer của OpenMontage chạy trên top video đột biến mỗi ngày, cho ra cách mở đầu,
nhịp cắt, cấu trúc và độ dài. Kết quả ghi thành mục "Vì sao nó nổ" trong báo cáo.

**Xong khi:** báo cáo có phân tích cho ít nhất 3 video nổ/ngày, không tốn API trả phí.

Tiến độ (24/10):
- Phân tích video chạy hằng ngày 07:40 (`analysis\`), 7 video/ngày từ 22/10, 0đ.
- `analysis\<ngày>\breakouts.md`: so video nổ với video đối chứng cùng kênh (số liệu + diễn giải).
  Diễn giải bằng Claude Pro, tự chuyển sang Gemini (Google AI Pro) khi Claude Pro hết hạn mức; cả hai 0đ.
  22, 23, 24/10 đã có giả thuyết (Gemini).
- Báo cáo radar có mục "Vì sao nó nổ" dưới B1.2 (radar 1.4.6).
- Hàng đợi chỉ còn video đúng ngách, đúng ngôn ngữ, mỗi video nổ có đối chứng (radar 1.4.7–1.4.9):
  chạy lại trên dữ liệu thật 23 và 24/10 đều được 5/5 cặp.
- Đề xuất nghiệm thu: 3 ngày liên tiếp (25–27/10) báo cáo có ≥ 3 cặp có giả thuyết, 0đ.
  - **Ngày 1/3 (25/10): ĐẠT — 5/5 cặp có giả thuyết** (Gemini, 0đ; radar chạy 08:55 khi đăng nhập, phân tích
    09:32–09:51; 8 phân tích đủ, 2 chỉ phụ đề).
  - **Ngày 2/3 (26/10): ĐẠT — 5/5 cặp có giả thuyết** (`interpretation.gia_thuyet` trong
    `analysis\2026-10-26\breakouts.json`; kiểm 26/10 11:05, khớp giao ban 08:30).
    - Máy chạy đúng lịch: radar 06:33 (lượt 06:30); phân tích 07:40–08:00, 9 phân tích đủ, 1 bỏ qua vì đã làm ngày
      trước, 0 lỗi, 0 timeout.
    - Diễn giải bằng Gemini (Google AI Pro), 0đ, vì Claude Pro hết hạn mức tuần tới 26/10 10:00.
    - Còn ngày 3/3 (27/10).
  - Cách đếm: `analysis\<ngày>\breakouts.md` của ngày 25, 26 và 27/10, mỗi file ≥ 3 cặp có giả thuyết.
    Báo cáo radar hiện lại kết quả đó vào sáng hôm sau, trong mục "Vì sao nó nổ".
  - Sẵn sàng (kiểm 24/10 22:55): radar 1.4.9 chạy 06:30 (có lượt bù 08:30 và khi đăng nhập), phân tích chạy 07:40,
    Gemini CLI đã cài, ổ L còn 370 GB.
    - Ngày 25 và 26 diễn giải bằng Gemini; ngày 27 bằng Claude Pro, vì hạn mức mở lại 26/10 10:00.
  - Đã sửa 24/10 23:25 (analysis commit 5155a68, đã cài lại tác vụ): phân tích chạy 07:40 và **tự đánh thức máy**,
    thêm một lượt 45 phút sau khi đăng nhập.
    - Cả hai lượt đều dùng `--if-missed`: ngày đã phân tích xong thì thoát ngay, không làm lại.
    - Máy tắt lúc 07:40 vẫn phân tích được trong ngày, sau khi radar (đăng nhập + 5 phút) tạo xong hàng đợi.
    - Bản cũ lưu ở scratchpad.

## Gạch 3: Bản đồ vùng đề tài

Gom video đối thủ thành cụm chủ đề. Mỗi vùng có: quy mô view/tháng, ai đang giữ, đà tăng,
và điểm cơ hội.

**Xong khi:** báo cáo có bảng vùng và các vùng có điểm cơ hội cao nhất, đọc thấy hợp lý.

Tiến độ (24/10, chủ quyết định làm trước khi Gạch 2 nghiệm thu):
- radar-dev 1.5.0 (commit 1e3f3e8): mục B1.9 "Bản đồ vùng đề tài" và `zones` trong `niche_<id>.json`.
  Gom theo tiêu đề, 0đ. Chạy thử trên bản sao dữ liệu 24/10: 868/1.402 video vào 70 vùng; cao nhất
  sex (90), women (77), homes (77).
- radar-dev 1.5.1 (commit bb27b4b): theo quyết định của chủ (dùng chung cửa sổ 30 ngày với dashboard vps1),
  kênh giữ vùng và độ mở tính trên 30 ngày như quy mô. Cao nhất trên dữ liệu 24/10: hair (84), homes (83), stay warm (82).
- **Đã triển khai 1.6.2 sang `radar\` ngày 29/10 lúc 22:08** (bằng `radar-dev\deploy.py`).
  - Chuẩn bị: kiểm Gạch 2 ngày 27/10 đạt (4 cặp có giả thuyết); `/code-review` bản `deploy.py` ra 7 điểm, chấp nhận cả 7
    (điểm chính: công cụ không tự biết radar đang chạy, nên đã kiểm tay, cả hai tác vụ đều "Ready").
  - Chạy lại offline trên bản sao dữ liệu 29/10: SUCCESS; hàng đợi 10 mục giống hệt bản 1.4.9; chỉ thêm `zones`,
    `zone_id`, `handle`.
  - Sau triển khai: bản 1.6.2, 156 test pass, `doctor` báo Ready. Cấu hình giữ 4 vùng xu hướng US, GB, CA, AU (đổi 29/10).
  - Bản sao lưu để quay lại: `radar\data\backups\code-20261029-220823-1.4.9` (lệnh `--rollback` trong `deploy-1.6.2.md`).
  - Lượt thật đầu tiên có bảng vùng: 06:30 ngày 30/10. Còn chờ chủ đọc bảng vùng thật và chấm "hợp lý" để nghiệm thu.
  - 31/10: bảng thật xếp "science" đầu (86) vì Short tiếng Hindi lọt vào. **radar-dev 1.6.3** (commit cafba7e, tag v1.6.3)
    loại tiêu đề chữ khác Latin khỏi bảng vùng và đưa "science" vào từ khung. Test đỏ trước, 160 test pass,
    `/code-review` 6 điểm (sửa 4, chấp nhận 2), chạy lại offline 31/10 SUCCESS.
  - **Đã triển khai 1.6.3 sang `radar\` ngày 31/10 lúc 11:10** (8 file; 160 test pass, `doctor` Ready; commit 2662d23
    trong `radar\`). Sao lưu để quay lại: `radar\data\backups\code-20261031-111041-1.6.2`. Lượt thật đầu tiên: 06:30 ngày 1/11.
  - Thay đổi trong `radar-dev` (`deploy.py`, test, cấu hình) và trong `radar\` chưa commit.
- **Chuẩn bị triển khai (26/10):**
  - `/code-review` trên `v1.4.9..da6004d` (1.5.0–1.6.0) ra 8 điểm: sửa 6, 1 điểm review nhận định sai, chấp nhận 1 điểm chỉ về cách viết.
  - Bản sửa là **radar-dev 1.6.1** (commit 779b224, tag v1.6.1). 134 test pass, mỗi lỗi có test đỏ trước.
    - `handoff --apply` **từ chối kênh khác ngôn ngữ** (ví dụ TL4-T7), trừ khi có `--allow-language-mismatch`.
    - `--date` không có bản xuất thì báo lỗi, không lấy nhầm `latest`.
    - `tuyen.csv` thiếu cột `Mã` thì từ chối, không ghi trùng.
    - Chỉ bàn giao kênh chủ giữ hoặc kênh chuyên ngách đã đo; kênh chưa đo độ hợp ngách thì không.
    - Vùng đề tài đếm cả video 0 giờ tuổi.
  - Chạy lại offline trên bản sao dữ liệu 26/10 (kèm lịch sử export 20–25/10): SUCCESS, 0 cảnh báo.
    - Export vẫn là `radar.v1`; 40 video đột biến, chỉ số sức khỏe và hàng đợi 10 mục **giống hệt bản 1.4.9 đang chạy**.
    - Có thêm `zones`: 1.172/1.792 video vào 87 vùng; 33/40 video đột biến có vùng.
    - Cao nhất: hair (91), women (84), sex·hiding (80), stay·warm (78), salt (76), sleep (75).
    - Bàn giao: chạy thử trên kênh giả tiếng Anh được 56 link đối thủ và 10 tuyến; lần hai thêm 0; kênh giả tiếng Nhật bị từ chối.
  - Triển khai: sáng 27/10, sau khi ngày 3/3 của Gạch 2 đạt và sau 07:30 (sau lượt phân tích 07:40).
- **Đã sửa 26/10, radar-dev 1.6.2** (commit bd50860, tag v1.6.2). 140 test pass, test đỏ trước; `/code-review` bản sửa
  ra 5 điểm: sửa 2, thêm 1 test, chấp nhận 2.
  - Chạy lại bản sao 26/10 (SUCCESS, 0 cảnh báo):
    - "women/woman" thành một vùng (52 video, 81 điểm);
    - không còn vùng "stay";
    - hàng đợi chỉ khác bản thật ở chỗ cặp InkAncient (tiếng Hindi) bị thay bằng kênh tiếng Anh.
  - Ảnh hưởng tới Gạch 2: InkAncient lọt vào ngày 22, 25 và 26/10. Ngày 25 và 26 mỗi ngày vẫn còn 4 cặp tiếng Anh có
    giả thuyết (≥ 3), nên kết quả nghiệm thu không đổi.
  - **Bản triển khai sáng 27/10 là 1.6.2.**
- Phát hiện khi đọc bảng vùng 26/10 (nay đã sửa ở trên):
  - "women" (84 điểm) và "woman" (43 điểm) là hai vùng riêng: bộ rút gọn từ không nhận số nhiều bất quy tắc,
    nên một chủ đề bị tách đôi.
  - Vùng "stay·warm" có ví dụ "…Staying Single": chữ "stay" kéo đề tài lạc vào vùng.
  - Gạch 2: video nổ 3sW7CSK9ogI (vùng salt) lời đọc tiếng **Hindi**, tiêu đề tiếng Anh. Bộ lọc ngôn ngữ của hàng
    đợi dựa vào tiêu đề nên để lọt; runner biết ngôn ngữ phụ đề sau khi phân tích.
- Hồ sơ cơ hội **mẫu** (chưa bàn giao, để chủ chốt khuôn): `ho-so\2026-10-26-salt\de-bai.txt`, `hop-dong.json`.
  - **Chủ chốt khuôn 26/10:** theo mẫu salt.
    - `de-bai.txt`: vùng và số đo, video nổ nguồn và giả thuyết, cấu trúc thử, các dữ kiện cần kiểm.
    - `hop-dong.json`: vùng, nguồn, kênh đích, **hạn vào sản xuất 48 giờ**, dự đoán và ngày chấm; trễ hạn ghi "trễ".
  - Chủ yêu cầu sửa 3 lỗi ở trên trong radar-dev **trước khi triển khai** (test đỏ trước, `/code-review`).
- radar-dev 1.5.2 (commit ea317c4): mỗi vùng có `zone_id` (gốc từ chính), và mỗi video đột biến biết mình
  thuộc vùng nào. Dữ liệu 24/10: 70 vùng / 70 mã, 29/40 video đột biến có vùng.
- Chuẩn bị Gạch 6: bảng ánh xạ dashboard vps1 ← radar ở `commander\docs\vps1-design\vps1-anh-xa-radar-2026-10-24.md`.
  Hai khoảng trống mã vùng và vùng của video đã lấp (1.5.2).
- **Triển khai 17/11 19:06: radar 1.15.1** (radar-dev `c0322da`). Tiêu đề tiếng Hàn được gom theo danh từ: bỏ trợ từ
  (니체가 → 니체) và từ đệm (가지, 이유, 방법…).
  - Bản sạch gồm 1.15.0 đang chạy + 4 file của bản sửa. Không có 1.16.0 `skip_zones`, nên bản radar-dev sau phải
    mang mục 1.15.1.
  - 304 test qua; /code-review 7 điểm: sửa 1, chấp nhận 6.
  - Replay offline 17/11 mã 0: các thị trường khác giống hệt; dog-psych-ko 106 vùng, sạch hơn; evo-psych-ko vẫn 0 vùng.
    Lý do: chỉ 62/890 video qua ngưỡng topic fit 0.3, và ngưỡng này chủ chưa quyết.
  - `doctor` báo Ready. Lệnh sổ cái `L-20261117-09`. Backup: `radar\data\backups\code-20261117-190636-1.15.0`.
- **17/11 22:08: evo-psych-ko, chủ chọn không hạ ngưỡng 0.3 mà thêm kênh đúng đề tài.** Đã xác nhận 2 kênh tiến hóa loài
  người (이상희가 보는 인류의 진화, 인류의 발자국) và thêm query "인류 진화" (+101 đơn vị/ngày, ước tính ~7.776/8.000).
  Thử trên bản sao: 131 video được tính nhưng vẫn 0 vùng, vì cần kênh thứ ba nói về 인류/진화; query mới để tìm kênh đó.
  Bản sao cấu hình `config\radar.toml.bak-20261117`. Lệnh sổ cái `L-20261117-13`.

## Gạch 4: Hồ sơ cơ hội và bộ chuyển sang youtube-main

Radar xuất hồ sơ theo khuôn `research_brief`. Bộ chuyển đẩy đối thủ vào `/doi-thu` và gợi ý
tuyến cho `tuyen.csv`.

**Xong khi:** một kênh youtube-main nhận được đối thủ và tuyến từ radar mà không phải sửa code
lõi của youtube-main.

Tiến độ (25/10, chủ quyết định code trước trong radar-dev, chưa triển khai):
- Đã dò youtube-main: **không có khuôn `research_brief`**. Cổng nhận thật của nó là hai file trong
  `CHANNEL\<mã kênh>\nghien-cuu\`: `doi-thu.txt` (hộp thư đối thủ, mỗi dòng một link) và `tuyen.csv`
  (các tuyến nội dung, 10 cột tiếng Việt). Ngoài ra có "đề bài" dạng chữ tự do cho từng lượt sản xuất
  (`PROJECTS\AUTO\<kênh>\<lượt>\0-tu-lieu.txt`).
- radar-dev 1.6.0 (commit da6004d): mỗi lượt xuất `handoff_<ngách>.json`; lệnh
  `py -m radar handoff <ngách> <thư mục kênh>` cho xem trước, thêm `--apply` thì ghi vào hai file trên.
  Chỉ thêm, không sửa dòng của chủ; chạy lại không thêm trùng; mỗi kênh nhận 10 tuyến tốt nhất.
  Chạy thử trên bản sao dữ liệu 24/10 và bản sao kênh TL4-T7: 45 link đối thủ, 10 tuyến, lần hai 0.
- Chủ quyết 25/10: **tạo một kênh youtube-main tiếng Anh mới** cho ngách `evo-psych-en`; không bàn giao cho
  TL4-T7 (tiếng Nhật). youtube-main đã có sẵn khuôn ngách `_KHUON\nganh\why-humans-explainer` (chắt từ chính
  ngách này) và chiến lược `_KHUON\chien-luoc\why-humans-original`. Lệnh bàn giao chạy thật lần đầu khi kênh
  mới có thư mục `CHANNEL\<mã>\`.
- **31/10, radar-dev 1.7.0** (commit a661407, tag v1.7.0, chưa triển khai): lệnh `py -m radar brief <ngách>` viết hồ sơ cơ hội
  theo khuôn salt chủ chốt 26/10: `ho-so\<ngày>-<vùng>\de-bai.txt` và `hop-dong.json`.
  - Vùng có điểm cao nhất chưa có hồ sơ; kèm tối đa 3 video nổ đã phân tích của vùng và giả thuyết Gạch 2; hạn 48 giờ;
    dự đoán "≥ 5 lần mức thường trong 7 ngày", chỉ tính khi video đăng đúng hạn. Chỉ code, không AI, 0 đ.
  - Chạy thử mặc định, `--write` mới ghi; không bao giờ ghi đè. Test đỏ trước, 194 test pass; `/code-review` 9 điểm, sửa cả 9.
  - Chạy thử trên bản sao dữ liệu 31/10: mẫu đọc ở `Documents\Claude outputs\ho-so-thu-2026-10-31-freez.txt`.
  - Chủ đọc mẫu, chấm "đạt". **Đã triển khai 1.7.0 sang `radar\` ngày 31/10 lúc 20:06** (commit 23da8b2 trong `radar\`;
    194 test pass, `doctor` Ready). Sao lưu để quay lại: `radar\data\backups\code-20261031-200602-1.6.2`.
  - **Sự cố 31/10:** lúc 11:19:40 bản 1.6.3 bị rollback nhầm (chủ xác nhận nhấn nhầm), radar thật chạy lại code 1.6.2 dù
    commit vẫn ghi 1.6.3. Bản 1.7.0 đưa sửa lỗi 1.6.3 trở lại. Chạy lại offline 31/10 trên hai bản sao (1.6.2 và 1.7.0):
    hàng đợi, trending, tóm tắt giống hệt; vùng 139 → 137, mất "science", đầu bảng freezing 85, women 84, sex 80.
    Lượt 06:30 ngày 1/11 là lượt thật đầu tiên chạy 1.7.0 (gồm sửa lỗi 1.6.3); lệnh L-20261031-01 vẫn chấm như cũ.
- Còn chờ chủ quyết:
  - "hồ sơ cơ hội" sẽ là gì: đề xuất là viết `0-tu-lieu.txt` (đề bài) cho một lượt sản xuất từ vùng đề tài
    có điểm cơ hội cao nhất, kèm giả thuyết "Vì sao nó nổ" của Gạch 2. Chưa làm.
    - **6/11, chủ duyệt hướng khác: hồ sơ đi thẳng vào Studio** (`studio\` main, commit e10fcda, merge 6/11).
      Lệnh `python -m studio.pipeline dossier ho-so\<ngày>-<vùng> [--option D] [--write]` lấy phương án buổi họp đã
      chọn (`de-bai-<X>.txt`, không có thì `de-bai.txt`), viết `studio-projects\<dự án>\brief.md`, ghi giờ bàn giao
      và hạn 48 giờ vào `hop-dong.json`. Mặc định chỉ xem trước; không ghi đè, không bàn giao hai lần; 0 đ.
      Thử trên bản sao hồ sơ muối: ra dự án `2026-10-26-salt-d`, đúng tên an toàn chủ chọn.
    - **6/11 22:45, radar 1.13.0 triển khai:** lượt sáng tự ghi 1 hồ sơ/ngày cho `evo-psych-en`
      (`[brief] daily` trong `radar.toml`), vùng tốt nhất chưa có hồ sơ; chạy lại cùng ngày không ghi thêm, chạy lại
      ngày cũ không ghi. Lỗi chỉ thành ghi chú của lượt chạy. Chạy thử offline trên bản sao 6/11: ra `2026-11-06-woman`.
      Code ở radar-dev nhánh `daily-brief` (commit dedbe58). Quay lại: sao lưu `radar\data\backups\code-20261106-224531-1.12.1`.
  - có nên bàn giao cả 45 kênh `auto` chuyên ngách, hay chỉ kênh đã `confirm`?

## Gạch 5: Bộ Não

Mỗi ngày AI đọc số liệu, đưa ra nhận định và dự đoán kèm ngày kiểm. Đến hạn, hệ thống tự chấm
đúng/sai và ghi sổ bài học.

**Xong khi:** có ít nhất 10 dự đoán đã được chấm, xem được tỉ lệ đúng.

**31/10: bản v0 xong, chạy từ 1/11** (commander, commit b2a8ded):

- **Luật trước, AI sau.** Bộ Não v0 là một luật thuần (`growth-3d-v0`), chưa dùng AI:
  - Lấy video nổ còn non (≤ 72 giờ, mức breakout/viral), tối đa 5 video mỗi ngày.
  - Video nào nhận ≥ 30% tổng view trong 24 giờ qua thì đoán: sau 3 ngày đạt ≥ 1,5 lần view hôm nay.
    Video còn lại thì đoán: không đạt.
  - Chạy thử trên số liệu 22–28/10: đúng 63%, còn nếu cứ đoán theo số đông thì đúng 54%.
  - Sau này AI muốn thay luật thì phải thắng con số này trên cùng sổ lệnh.
- **Tự ghi, tự chấm.**
  - Mỗi sáng, lệnh giao ban 08:30 chấm các dự đoán đến hạn bằng số view radar chụp, rồi ghi dự đoán mới vào
    `so-cai\lenh.jsonl` (phòng `nao`).
  - Thiếu số view ngày kiểm thì chờ thêm 2 ngày, sau đó ghi "không tính".
  - Lệnh do chủ ghi thì Bộ Não không bao giờ chấm.
- **Giao ban có thêm một dòng** tỉ lệ đúng của Bộ Não.
- **Không ghi bù** dự đoán cho những ngày đã qua: dự đoán phải có trước khi biết kết quả.
- **Chạy thử trên bản sao số liệu 31/10:** ra 4 dự đoán (kiểm 3/11); chạy lần hai không ghi thêm.
- **4 dự đoán thật đầu tiên đã ghi lúc 20:33 ngày 31/10** (L-20261031-02 đến -05, kiểm 3/11). Giao ban
  08:30 bị lỡ vì máy tắt, nên tác vụ chạy bù tối 31/10, sau khi Bộ Não đã vào code.
- **Dự kiến:** khoảng 5/11 có đủ 10 dự đoán đã chấm.
- **Triển khai 15/11 21:28: kho bài học, bước 1 của `commander\docs\thiet-ke-co-so-du-lieu-tu-hoc.md`** (commander `99f4bba`,
  gồm `a605690` và `99f4bba`; nhánh `bai-hoc` gộp thẳng vào `gach-8-format-test`, bản trước `30c5b39`).
  `so-cai\bai-hoc.db` (SQLite) với lệnh `lesson add/list/show/status`: bài học ghi rõ thị trường, khi nào áp dụng, khi
  nào không, dự đoán; đi giả thuyết → đang thử → xác nhận, hoặc bỏ có lý do; người đề xuất không tự đẩy được; mọi lần
  đổi ghi vào `lich_su`. Tệp chỉ được tạo khi có bài học đầu tiên. Trang Đội agent: 9 nguồn dữ liệu của phòng họp vẽ
  bằng tháp dữ liệu xanh theo hình của chủ. 472 test qua; /code-review 6 điểm: sửa 6; chạy thử trên bản sao `so-cai`
  mã 0. Lệnh sổ cái `L-20261115-09`. Quay lại: `git reset --keep 30c5b39`, rồi khởi động lại web.
- **Triển khai 15/11 22:20: vòng tự học bước 2–6** (commander `4b6dc29`, gồm `e782c7c` và `4b6dc29`; bản trước `99f4bba`).
  `lesson observe` / `observations` (quan sát có số và tệp, trùng thì bị từ chối), `lesson add --obs`; lệnh own-7d ghi
  `kiem.bai_hoc` khi video làm theo bài học; `lesson score` so video dùng bài học với video không dùng cùng thời gian
  (kết luận khi có ≥ 6 video và hơn ≥ 10 điểm); đề bài Studio có mục `LESSONS WE ARE TESTING`, video thử và video đối
  chứng xen kẽ, mỗi phòng thử 1 bài học một lúc; trang Não có bảng "Sổ bài học tự học". Skill `giam-sat-kenh` và
  `tong-ket-tuan` đã có cách ghi quan sát và chấm. 493 test qua; /code-review 8 điểm: sửa 6, chấp nhận 2. Chạy thử
  trên bản sao `so-cai` và `produce --dry-run` trên dữ liệu thật mã 0. Lệnh sổ cái `L-20261115-10`.
  Quay lại: `git reset --keep 99f4bba`, rồi khởi động lại web.

## Gạch 6: Dashboard

`vps1` đọc `radar\exports\latest\*.json` (Chiến trường phía đối thủ, Radar, Não).

**Xong khi:** mở trình duyệt thấy số của ngày hôm nay, không còn dữ liệu mẫu.

**31/10: trung tâm chỉ huy `/hq/` chạy trên máy này** (commander f4570ef).

- **Cách xây:** dựng mới hoàn toàn theo `commander\docs\vps1-design\y_u_c_u_coding.md` của chủ. Code tiếng Anh,
  không dùng lại code, cấu trúc hay tên của vps1 cũ. Ảnh chụp và 5 trang HTML chỉ để tham khảo giao diện.
  Mọi chữ hiển thị nằm trong `commander\web\hq\vi.json`.
- **Mở:** chạy `commander\web.bat`, vào http://localhost:8765/hq/. Cửa sổ web đang mở từ trước phải đóng rồi
  mở lại thì mới có trang mới.
- **5 trang:**
  - Chiến trường: bản đồ lục giác 139 vùng, màu theo điểm cơ hội; 6 ô số; bảng xếp hạng; điểm nóng;
    biểu đồ diễn biến 12 ngày.
  - Hậu cần: dây chuyền radar → mổ xẻ → hồ sơ → bàn giao → sản xuất; nhật ký chạy 14 ngày; lộ trình.
  - Não: tỉ lệ đúng so với mốc 54%; dự đoán chờ ngày kiểm; nhật ký quyết định.
  - Phòng thí nghiệm: video nổ; giả thuyết Gạch 2; từ khoá đang lên.
  - Giới thiệu.
- **Còn trống:** mọi ô số của kênh mình, vì chưa có kênh. Gạch 6 chỉ đạt "Xong khi" khi có số kênh thật
  (Gạch 7).
- **Đã kiểm:** 64 test đạt; mở trên trình duyệt cả 5 trang với số thật 31/10, không lỗi; khổ điện thoại
  không bị tràn ngang.

**31/10 tối: bổ sung sau khi soát lại ảnh vps1 của chủ.**

- Chiến trường: thanh tua bản đồ theo 12 ngày; cờ #1/#2/#3 trên vùng do 3 kênh đầu bảng giữ; điểm nóng
  có thêm chế độ 14 ngày.
- Hậu cần: 6 ô vận hành (quota API, ổ đĩa, radar.db, cảnh báo, hồ sơ, kênh mình); đồng hồ 24 giờ giờ hẹn so
  với giờ chạy thật; cảnh báo lần chạy lỗi/thiếu 2 ngày và cảnh báo radar; 20 dòng nhật ký radar, khóa API
  đã che.
- Não: nhật ký quyết định có lý do và dự đoán; kho bài học (giả thuyết Gạch 2 của 14 ngày); bảng các phòng.
- Phòng thí nghiệm: chip đếm; cột xem/giờ và cột "não đang theo dõi".
- Giới thiệu: bảng học được → luật → con số sống, mỗi dòng có link sang trang.
- Bỏ qua (chưa có dữ liệu): thẻ quân đoàn/YPP/mùa/thành tích của kênh mình, não 3D, hội đồng, kinh tế
  (chi phí), bảng xếp hạng giả thuyết.
- Đã kiểm: 73 test đạt; mở cả 5 trang trên trình duyệt với số thật, không lỗi console.

**15/11 22:37: phễu radar chuyển động ở đầu tab Radar** (commander `1b265e9`, gồm `46905fc`; bản trước `4b6dc29`).
Theo 3 ảnh của chủ. Mỗi chấm là một video 30 ngày của thị trường (đỏ = nổi bật/bứt phá/viral), xoáy qua kênh theo dõi,
video nổi bật, vùng đề tài, về hồ sơ mới nhất của thị trường; bên trái sức khoẻ radar theo lượt, bên phải video nổi bật
mới nhất (✓ đã vào vùng, ? chưa có vùng). Đổi màu theo nút Nền sáng, dừng khi rời tab. 496 test qua; /code-review
7 điểm: sửa 7. Lệnh sổ cái `L-20261115-11`. Quay lại: `git reset --keep 4b6dc29`, rồi khởi động lại web.

**15/11 23:15: trụ kho tự học trên sơ đồ agent, bảng kho ở đầu trang Não** (commander `ca47443`, gồm `8d53c13`,
`ee7c1d5`; bản trước `1b265e9`). Theo ảnh của chủ (khoanh đỏ góc phải). Tháp dữ liệu xanh đứng cạnh Chủ duyệt, ghi số
quan sát và bài học, mờ khi kho trống; 5 luồng xanh: Kênh mình, FDE, Chủ duyệt ghi vào; Não và Sản xuất đọc ra. Bấm trụ
sang trang Não, nơi bảng kho (5 bảng, vòng học) nay nằm đầu trang, hiện cả khi trống. 501 test qua; /code-review 2 lượt:
3 điểm sửa 3, 3 điểm sửa 3. Lệnh sổ cái `L-20261115-12`. Quay lại: `git reset --keep 1b265e9`, rồi khởi động lại web. Hướng tiếp theo của chủ: trụ là
tài sản của cả hệ thống, mọi dữ liệu về đây; cần bản thiết kế trước khi gom.

**16/11 07:35: trụ dữ liệu gạch 1, `tru/tru.db`** (commander `8eb71e5`; bản trước `ca47443`). Theo thiết kế
`docs/thiet-ke-tru-du-lieu.md` chủ duyệt ("Duyệt cả 5"). Trụ có tầng 0 (10 nguồn, mỗi lần nạp kèm dấu vân tay tệp) và
danh mục (thị trường, kênh, kênh–thị trường, chỉ số); sổ bài học dọn vào trụ trước khi có dòng đầu. Lệnh mới
`py -m commander tru status | tru nap`. Lần nạp đầu trên dữ liệu thật: 12 tệp, 3 kênh, 9 thị trường, 10/10 nguồn tươi.
Tab Agent: trụ ghi số nguồn tươi, mỗi nguồn một dòng khi rê chuột; trang Não liệt kê nguồn, đường dẫn, độ tươi.
514 test qua; /code-review 2 điểm: sửa 2. Lệnh sổ cái `L-20261116-02`. Quay lại: `git reset --keep ca47443`, rồi khởi
động lại web. Gạch tiếp: nạp số kênh mình hằng ngày vào trụ.

**16/11 21:47: dây chuyền tự làm gói đăng, nút đăng tự hiện** (commander `016197c`; bản trước `8eb71e5`). Chủ đã
yêu cầu nút đăng 11/11, hỏi lại 13/11 và 16/11. Nguyên nhân: `produce` dừng ở `video.mp4`, không bao giờ gọi
`pack` của Studio, nên video xong vẫn thiếu gói đăng và ảnh bìa. Nay mỗi lượt sản xuất làm gói cho video đã kiểm
chất lượng, không còn ảnh giữ chỗ, chưa đăng; hỏng 3 lần với cùng một video thì để chủ xem. 522 test qua;
/code-review 6 điểm: sửa 5, nhận 1 (ảnh bìa tự làm chưa có nhãn AI; chủ bảo chưa sửa Studio, cổng C vẫn bắt).
Lệnh sổ cái `L-20261116-08`. Quay lại: `git reset --keep 8eb71e5`, rồi khởi động lại web. Còn thiếu: tác vụ mỗi giờ
"Xuong YouTube - San xuat" chưa đăng ký (`commander\dang-ky-san-xuat.ps1`), dây chuyền chỉ chạy khi gọi tay.

**17/11 03:47: Studio có thẻ lời hứa và thẻ số** (studio `f65beba` trên `packaging-qc`; bản trước `f6abcb3`). Chủ
"Có, làm Studio" 16/11, "Có, triển khai" 17/11; bài học BH-002 và BH-003. Cảnh 1 hiện tiêu đề họp bằng chữ lớn
(hoặc `--promise`); cảnh có năm, "… năm trước" hay phần trăm hiện con số lớn, tối đa 1/5 số cảnh; cảnh có thẻ chỉ
zoom; `--no-cards` để tắt. 261 test qua; /code-review 8 điểm: sửa 6, nhận 2. Dựng thử bản sao video 3: 1 thẻ lời
hứa, 14 thẻ số. Lệnh sổ cái `L-20261117-01`. Quay lại: trong `studio\` chạy `git reset --keep f6abcb3`.

**17/11 11:07: Studio có khoảng lặng trước chương và nhạc nền** (studio `c4d42a5` trên `packaging-qc`; bản trước `f65beba`). Chủ "làm tiếp nhạc nền và khoản lặng" rồi "Có, triển khai" 17/11; bài học BH-005. Sau giây 30, trước mỗi chương giọng đọc dừng 1,5 s ngay đầu đoạn văn, hình tối rồi sáng lại; phụ đề và mốc chương dời theo (`pauses.json`). Nhạc từ giây 30, nén dưới giọng đọc, lên lại ở khoảng lặng: bài trong `%APPDATA%\Studio\music`, không có thì tự soạn (`music.json` ghi nguồn); `--no-pauses`, `--no-music` để tắt. 276 test qua; /code-review 8 điểm: sửa 6, nhận 2. Dựng thử bản sao video 3: 6 khoảng lặng, +9 s, -19,7 LUFS. Lệnh sổ cái `L-20261117-08`. Quay lại: trong `studio\` chạy `git reset --keep f65beba`.

**17/11 19:55: thị trường chưa có vùng hiện quả địa cầu của chủ** (commander `d510b61`, gồm `5d9cfce`; bản trước
`016197c`). Chủ gửi ảnh ô Địa cầu vùng đề tài trống ở thị trường Hàn (evo-psych-ko có 0 vùng) và bảo dùng file
`qua-dia-cau 2.html` của mình. File được giữ nguyên, thành `web/hq/globe-idle.html`, hiện trong ô đó khi thị trường có
0 vùng, kèm lý do: một vùng cần ít nhất 8 video từ 3 kênh trong 90 ngày. Trang này tải three.js và ảnh trái đất từ
internet; server gửi nó kèm `Content-Security-Policy: sandbox allow-scripts`, nên script từ CDN không chạm được API
của HQ. 524 test qua; /code-review 7 điểm: sửa 2, chấp nhận 5. Đã xem trên HQ thật cổng 8765. Lệnh sổ cái
`L-20261117-10`. Quay lại: `git reset --keep 016197c`, rồi khởi động lại web.

**17/11 20:38: bảng Lộ trình 9 gạch hết nhãn "chưa bắt đầu" sai** (commander `e03380d`, gồm `d6b2827`; bản trước
`d510b61`). Chủ gửi ảnh bảng lộ trình, "hãy hoàn thiện các phần còn lại", chọn sửa nhãn rồi "có" triển khai. Nguyên nhân:
HQ chỉ coi gạch là đang làm khi có dòng bắt đầu bằng "Tiến độ"; gạch 5, 6, 7, 9 ghi tiến độ bằng dòng in đậm có ngày
("**31/10: …**"), gạch 8 chưa có dòng nào (nay đã viết). Nay dòng in đậm có ngày trước dấu hai chấm cũng tính; "**Xong
khi:** …" thì không. 526 test qua (test đỏ trước); /code-review 3 điểm: sửa 1, chấp nhận 2 (phân số in đậm như "**3/5**"
cũng bị tính; trạng thái vẫn đoán từ cách viết). Đã xem trên HQ thật cổng 8765: gạch 1–2 đã nghiệm thu, 3–9 đang làm.
Lệnh sổ cái `L-20261117-11`. Quay lại: `git reset --keep d510b61`, rồi khởi động lại web.

**17/11 21:02: ô Ngách trang Hôm nay ghi đúng thị trường** (commander `0dc1eb0`, gồm `e04c0f2`; bản trước `e03380d`).
Chủ hỏi nhãn thị trường Hàn có đúng không: ô Ngách hiện đánh giá của thị trường đang chọn nhưng dòng dưới luôn ghi
"Evolutionary psychology, tiếng Anh". Nay dòng đó là tên thị trường đang chọn (Hàn: "Evolutionary psychology (Korean,
KR)"). 526 test qua; /code-review 4 điểm: sửa 1, chấp nhận 3. Đã xem trên HQ thật cổng 8765. Lệnh sổ cái
`L-20261117-12`. Quay lại: `git reset --keep e03380d` (chỉ đổi tệp trang, không cần khởi động lại web).

**18/11 00:04: tab Trending** (commander `a933922`; bản trước `0dc1eb0`). Chủ hỏi vì sao @drdinin là "đối thủ": trang
xu hướng dùng nhãn cột "Video đối thủ" của trang Vì sao nó nổ. Nay trang tên Trending, cột ghi "Video thịnh hành", và có
bảng "Kênh trending (30 ngày)" đọc từ `radar.db` (Mỹ 7.508 kênh; lọc theo danh mục, tìm theo tên) làm nguồn đối chiếu khi
xây kênh mới. 536 test qua; /code-review 6 điểm: sửa 4, chấp nhận 2. Đã xem trên HQ thật cổng 8765. Lệnh sổ cái
`L-20261118-01`. Quay lại: `git reset --keep 0dc1eb0`, rồi khởi động lại web.

**18/11 04:00: trụ dữ liệu giữ kênh trending** (commander `13d9ace`; bản trước `a933922`). `tru nap` nay ghi bảng
`kenh_trending` trong `tru.db`: mỗi vùng mỗi kênh từng lên bảng thịnh hành một dòng, tính trên mọi ngày radar có (ngày
đầu, ngày cuối, số ngày, số video, hạng tốt nhất, hạng bảng chung, danh mục, sub, tuổi kênh, video tiêu biểu); chỉ nạp
lại vùng có ngày radar mới. Review thấy "Hạng tốt nhất" gộp cả 12 bảng danh mục (@drdinin #1 ở bảng danh mục, chưa từng
lên bảng chung Mỹ), nên thêm cột "Hạng bảng chung". Lần nạp đầu trên trụ thật: 24.212 dòng (US 7.535, GB 5.850, CA
5.752, AU 5.075), 3,3 s, `tru.db` 94 KB → 4,1 MB; lần hai bỏ qua cả 16 nguồn. 542 test qua; /code-review 4 điểm: sửa 3,
chấp nhận 1. `tru nap` vẫn chạy tay, chưa có lịch. Lệnh sổ cái `L-20261118-02`. Bản sao trụ trước khi nạp:
`%TEMP%\tru-before-trending-20261118.db`. Quay lại: `git reset --keep a933922`, khởi động lại web.

**18/11 07:32: lịch nạp trụ 7 giờ** (commander `b972d31`; bản trước `13d9ace`). Chủ: "có đặt lịch 7 gio". Tác vụ mới
"Xuong YouTube - Nap tru" chạy `tru-nap.cmd` lúc 07:00, lặp mỗi 30 phút tới 09:30 (radar 06:30 thường xong 06:50–07:02,
lượt bù 08:30). Lần nào không có dữ liệu mới thì bỏ qua (khoảng 1 giây). Chạy khi máy thức nếu lỡ giờ, không đánh thức
máy. Log: `commander\logs\tru-nap.log`. `tru nap` nay trả mã 1 khi một nguồn nạp lỗi. 543 test qua; /code-review 3 điểm:
sửa 1, chấp nhận 2. Chạy thử 07:32 mã 0. Lệnh sổ cái `L-20261118-03`. Gỡ lịch:
`Unregister-ScheduledTask -TaskName 'Xuong YouTube - Nap tru'`; quay lại code: `git reset --keep 13d9ace`.

**18/11 07:58: 5 đề xuất đối chiếu Agentic Studio** (commander `3301476`, bản trước `b972d31`; studio `0926041`, bản
trước `c4d42a5`). Chủ: "ok làm 5 đề xuất", rồi "Có, triển khai". Sổ nợ `py -m commander debt` (bảng `so_no` trong
trụ, mục Sổ nợ trong giao ban); hậu kiểm 48 giờ và 28 ngày trong giao ban; QC Studio thử ngược 9 lỗi cài sẵn, phần không
có gì để kiểm báo `nothing_checked`; kỹ năng kiem-chinh-sach (Made for Kids, nhãn AI), mo-kenh (bước 8 ngày 30),
giam-sat-kenh (48 giờ, 28 ngày), giao-ban (đọc Sổ nợ) đã quét SkillSpector sạch. Test: commander 557, studio 290;
/code-review 7 điểm: sửa 7. Nợ đầu: NO-001 chấp nhận (QC chỉ cảnh báo, lời chủ 12/11), NO-002 đến NO-004 mở. Lệnh ngày
30: `L-20261118-04` đến `-12`; lệnh triển khai `L-20261118-13`, `-14`. Kỹ năng cũ sao lưu ở
`%TEMP%\claude\...\scratchpad\skills-backup-20261118`. Quay lại: commander `git reset --keep b972d31` rồi khởi động lại
web; studio `git reset --keep c4d42a5`.

**31/10 khuya: bản đồ não sống ở đầu trang Não** (commander 199c4f6). Dựng mới, không lấy gì từ
`nao-do-thi` của vps1. 12 bộ phận thật của hệ thống (giác quan, suy nghĩ, trí nhớ, hành động), sáng theo số
liệu; điều đã học treo quanh từng bộ phận; xung chạy theo sự kiện thật 7 ngày. Kênh mình và sản xuất còn tắt.
76 test đạt; đã mở trên trình duyệt, cả khổ điện thoại.

**31/10 khuya (2): theo 4 ảnh Hậu cần mới của chủ** (commander 1204419). Hậu cần: thẻ trạng thái + báo động,
10 ô máy (radar, giải mã, giao ban, trang chỉ huy, RAM, ổ đĩa, quota, radar.db, hồ sơ, kênh mình), biểu đồ 24 giờ
có vạch BÂY GIỜ và giờ chạy kế tiếp. Bản đồ não: mỗi điều đã học là một chấm (200 chấm), dải số, ô tìm, lọc bộ
phận. Chưa làm vì chưa có dữ liệu: xưởng sản xuất 8 khâu, chăm kênh, kéo view chéo, ví/chi phí AI, kho đạn cổng AI.
77 test đạt.

**1/11: /code-review và phần ảnh còn lại** (commander d2d8e13, 8300a17). Review ra 9 điểm, sửa cả 9 (lịch trước
06:30, cảnh báo cũ, che bí mật trong nhật ký, chọn file log, lọc bản đồ, ô quota, tốc độ vẽ...). Não: dòng thời gian
quyết định dạng thẻ, phong độ cộng dồn, sổ tay giao ban, thẻ bài học. Giới thiệu: mục tiêu tính ngược từ số sống,
lộ trình 9 gạch, chủ làm gì / máy làm gì. Không làm vì chưa có dữ liệu: thử nghiệm giả thuyết (Phòng thí nghiệm),
đội kênh, kinh tế. 84 test đạt.

## Gạch 7: Vòng phản hồi từ kênh của mình

Số liệu Studio (hiển thị, CTR, % xem ở mốc 48 giờ) chảy về radar để chấm lại điểm cơ hội và
định dạng.

**Xong khi:** có kênh thật và ít nhất 10 video được chấm thắng/thua.

**Bổ sung 04/11/2026.** Chủ xem sơ đồ "Open Loop" của một khoá học (GitMind). So với sơ đồ đó, phần tìm và lọc
đề tài bên mình đã đủ, thậm chí sâu hơn. Phần còn thiếu chính là gạch này, gồm các bước 7, 8, 10 của sơ đồ.
Kênh thật đã có: **Why Humans** (`@whyhumansus`, youtube-main `CHANNEL\why-humans-us`). Gạch này bắt đầu khi
kênh có 3–5 video.

Ba mảnh, theo thứ tự:
1. **Đọc số kênh mình mỗi sáng** bằng YouTube Analytics API chính thức.
   - Số cần đọc: lượt hiển thị, CTR, thời lượng xem, % giữ chân theo giây.
   - Chủ cấp quyền OAuth một lần, thuộc cổng danh tính.
   - Không chụp màn hình hay tự động hoá YouTube Studio bằng phiên đăng nhập của chủ, vì dễ vỡ và rủi ro cho
     tài khoản.
   - Chạy sau radar (sau 07:00), đặt số video của mình cạnh số đối thủ cùng vùng đề tài.
2. **Thử tiêu đề/thumbnail** bằng Test & Compare có sẵn trong YouTube Studio (tối đa 3 bản).
   - Không tự xây bộ chia người xem.
   - Bản nào thắng thì ghi vào sổ, để `1-tieu-de.md` và `8-thumbnail.md` học theo.
   - Cách chia tiêu đề/thumbnail theo 3 nhóm người xem (người mới, người đã xem kênh, fan) chỉ thử khi kênh
     đã có người đăng ký.
3. **Thử hook bằng Shorts.**
   - Một tập dài cắt 3 Shorts, mỗi Short một hook khác nhau. Kịch bản D đã có sẵn 3 Shorts.
   - So độ giữ chân 3 giây đầu và % xem hết.
   - Hook thắng đưa vào `2-viet.md`.
   - Không làm A/B 2 bản video dài, vì quá đắt cho một kênh mới.

Kết quả của cả ba mảnh đổ về sổ lệnh/điểm cơ hội. Một vùng đề tài mà radar chấm cao nhưng video của mình thua
thì bị hạ điểm cho kênh này.

**12/11: code xong mảnh 1–3, chưa deploy radar, chưa commit.**
- **Hạ điểm vùng** (chủ chọn đặt ở radar): radar 1.14.0 trong radar-dev đọc `so-cai/lenh.jsonl` (`[own] ledger`).
  - Mỗi trận thua ròng (thua trừ thắng) theo own-7d-v0 trong 90 ngày làm vùng mất 20 điểm, không xuống dưới 0. Sau đó xếp hạng lại, nên hồ sơ cơ hội hằng ngày và bàn giao bỏ qua vùng thua.
  - Điểm gốc của thị trường giữ ở `opportunity_market`. Báo cáo có dòng "Hạ điểm cho kênh mình". HQ hiện chip "hạ điểm (gốc …)" và không coi phần bị trừ là vùng tụt.
  - Hạ điểm theo thị trường: hai kênh của mình chung một thị trường thì chịu chung. Lệnh cũ chưa ghi thị trường được tính vào evo-psych-en.
- **Sổ Test & Compare và sổ thử hook** (commander `thu.py`): chủ nhập ở tab Kênh, mục "Sổ thử của kênh".
  - Hai sổ: `kenh-minh/<kênh>/thu-tieu-de.jsonl` và `thu-hook.jsonl`.
  - Test & Compare thắng theo kết luận của Studio. Hook thắng theo tỷ lệ giữ chân 3 giây cao nhất; bằng nhau thì xét % đã xem.
  - Bản thắng được ghi vào một khối riêng trong `youtube-main/.../why-humans-us/prompt/` (1-tieu-de.md, 8-thumbnail.md, 2-viet.md). Không bao giờ ghi vào TL4-T7.
- **Đã kiểm:** radar 274 test, commander 342 test. Đã chạy /code-review cho cả hai, sửa 15/16 điểm; điểm còn lại (lệnh cũ chưa ghi thị trường) giữ nguyên có chủ ý. Đã mở thử HQ trên bản sao dữ liệu tạm.
- **Còn lại:** đủ 10 video được chấm.
- **Cập nhật 14/11:** radar 1.14.0 đã triển khai (commit `ed59d17` trong `radar\`), rồi 1.14.1 (`cca1ffa`, 13/11).
  Radar đang chạy ghi `radar_version` 1.15.0 (radar nhanh), nhưng bản 1.15.0 chưa commit ở cả `radar-dev\` lẫn `radar\`.
- **Triển khai 15/11 07:32:** commander `3fc8896` (nhánh `agent-map` gộp thẳng vào `gach-8-format-test`, bản trước `8c635c2`).
  Trang Đội agent có 15 phòng, luồng hình chữ U, phòng họp gom 9 nguồn dữ liệu có màu độ tươi, và `nguon.json` cho mỗi buổi họp.
  423 test qua; /code-review 9 điểm: sửa 8, chấp nhận 1 (đọc trùng file, chỉ tốn công); chạy thử trên bản sao mã 0.
  Lệnh sổ cái `L-20261115-01`. Quay lại: reset về `8c635c2`, rồi khởi động lại web.
- **Triển khai 15/11 10:14:** commander `702eef6` (nhánh `agent-map` gộp thẳng vào `gach-8-format-test`, bản trước `3fc8896`).
  Trang Đội agent: phòng giãn ra không đè nhau; phòng 5 là phòng họp tròn 6 ghế, dây dữ liệu cắm vào ghế; mỗi phòng
  ban một màu dây; FDE (màu #003399) có agent trực ở mọi phòng, dây chấm mờ, phòng cần FDE viền đỏ; SEO và FDE đã nối.
  433 test qua; /code-review 21 điểm: sửa 2, chấp nhận 19 (phần #003399 được review sau khi gộp; dòng sổ cái ghi nhầm
  "sửa 3, chấp nhận 15"). Lệnh sổ cái `L-20261115-07`. Quay lại: reset về `3fc8896`, rồi khởi động lại web.
- **Triển khai 15/11 11:04:** commander `30c5b39` (gồm `05b89d1`, `526f9db`, `30c5b39`; gộp thẳng, bản trước `702eef6`).
  Tầng Sản xuất: phòng Thumbnail, FDE, màu dây theo bảng màu CSS; hai phòng nguồn Giải mã và Giám sát kênh nối vào
  Kịch bản, Thumbnail, Kiểm định. (a) Đề bài Studio nhận 3 bài học video nổ mới nhất cùng thị trường; (b) phòng 10 là
  đội giám sát, mỗi kênh một agent (`giam-sat-whyhumans`, `giam-sat-dogmind`, skill `giam-sat-kenh`), mục
  "FOR THE NEXT VIDEO" của báo cáo vào đề bài. 449 test qua; /code-review 9 điểm: sửa 2, chấp nhận 7. Chạy thử
  `produce --dry-run` trên dữ liệu thật mã 0. Lệnh sổ cái `L-20261115-08`. Quay lại: reset về `702eef6`, khởi động lại web.

## Gạch 8: Sản xuất và thử định dạng

youtube-main sản xuất hằng ngày theo hồ sơ cơ hội. OpenMontage làm thử định dạng mới, định
dạng nào thắng thì đóng thành khuôn kênh.

**Xong khi:** chưa đặt; chủ quyết.

**12/11: dây chuyền sản xuất và sổ thử định dạng** (commander `ec9d841`, `6e3de10`, nhánh `gach-8-format-test`).
- `py -m commander approve <hồ sơ> <X> [--format …]` ghi quyết định của chủ vào sổ lệnh và `chosen` vào `hop-dong.json`.
- `produce` (`san-xuat.cmd`): giao hồ sơ evo-psych-en đã duyệt cho Studio, chạy hoặc chạy tiếp một dự án mỗi lượt;
  hỏng 3 lần liên tiếp thì để chủ xem. Dog Mind và tiếng Đức vẫn do chủ làm.
- `format`: so view ngày 7 (own-7d) của từng định dạng với định dạng của kênh, kết luận sau 5 video mỗi định dạng;
  `format adopt` chỉ khi bản thử tốt hơn. Bảng ở tab Sản xuất. Chưa định dạng nào được chọn.
- 16/11: tác vụ mỗi giờ "Xuong YouTube - San xuat" đã đăng ký; dây chuyền tự làm gói đăng (`016197c`, xem Gạch 6).
- 17/11: Studio có thẻ lời hứa, thẻ số, khoảng lặng và nhạc nền (xem Gạch 6).
- 19/11 07:31: gửi prompt và ảnh đối chiếu qua Telegram khi có clip mới còn thẻ chờ (chủ 18/11: ảnh làm tay
  trong Google Flow). Commander `20ec37f`, Studio `8aac8c2` (lệnh `prompts`), gộp nhanh, không cần bản dự phòng.
  - Test: 574 commander và 306 Studio đạt; test mới chạy đỏ trước.
  - Code-review 8 điểm: sửa 4, chấp nhận 4.
  - Bot dùng chung chat với báo cáo kênh; mọi tin bắt đầu bằng "🖼 Ảnh tự tạo — Dây chuyền sản xuất".
  - Còn thiếu: ảnh trong `tu-tao` chưa tự vào clip và clip chưa tự dựng lại.
  - Lệnh sổ cái L-20261119-01.

## Gạch 9: Phiếu nhập tay tín hiệu Trung Quốc (chủ thêm 24/10; code xong 31/10, radar 1.8.0)

**31/10: chủ cho làm trước thứ tự ("Làm Gạch 9 ngay"). Radar 1.8.0 đã chạy thật lúc 20:41**
(radar-dev 61a41ef và 55d3d14, live bf87522; bản dự phòng `radar\data\backups\code-20261031-204140-1.7.0`).

- **Phiếu:** `tin-hieu-tq\phieu.csv`, đang trống, chủ điền bằng Excel. Hướng dẫn điền: `tin-hieu-tq\HUONG-DAN.txt`.
- **Radar đọc phiếu:**
  - Lấy các dòng của 7 ngày gần nhất và khớp cột `keywords_en` với vùng đề tài YouTube theo gốc từ.
  - Thêm mục "Tín hiệu Trung Quốc" ở cuối báo cáo.
  - Không bao giờ ghi vào phiếu.
- **Dòng sai** (ngày, nền tảng, thiếu chủ đề) được liệt kê dưới bảng và không làm dừng lượt chạy.
  Dòng Xiaohongshu bị bỏ.
- **Đọc được phiếu do Excel lưu:**
  - Ngày dạng 01/11/2026 hoặc 2026-11-01.
  - Dấu ";" làm dấu phân cách cột.
  - Phiếu lưu bằng kiểu "CSV" thường (không phải UTF-8) thì báo cáo nhắc lưu lại thay vì coi là trống.
  - Ba lỗi này tìm ra khi rà soát. Mỗi lỗi được viết một test đỏ trước khi sửa.
- **Đã kiểm:**
  - 212 test đạt.
  - Chạy thử trên bản sao radar với phiếu mẫu: 2 dòng khớp vùng sleep và salt; dòng Xiaohongshu và dòng
    sai ngày được liệt kê đúng.
- **Còn lại để đạt "Xong khi":** 4 tuần phiếu thật do chủ ghi.

Chủ dùng tài khoản cá nhân của mình để **xem bằng tay** các bảng hot, rồi ghi vào một phiếu. Radar đọc phiếu
đó và đặt cạnh số liệu YouTube. Không tự động hoá qua tài khoản: không cookie, không giả lập đăng nhập, không script.

- **Nguồn:**
  - 热搜 Weibo;
  - 热门 và 排行榜 Bilibili;
  - bảng hot Douyin;
  - 巨量算数 (nếu đăng nhập được).
- **Xiaohongshu để ngoài** cho tới khi luật sư rà §3.4: điều khoản cấm cả thống kê thủ công cho mục đích thương mại.
- **Mỗi dòng phiếu:**
  - ngày, nền tảng, nguồn;
  - từ khoá hoặc chủ đề (chữ gốc, kèm nghĩa tiếng Việt);
  - hạng hoặc chỉ số nhiệt, link;
  - ghi chú: hợp ngách nào.
- **Chỉ ghi chủ đề và chỉ số**, không ghi hồ sơ từng người (tên kênh, handle), để giữ dữ liệu ở dạng tổng hợp
  theo Luật 91/2025.
- **Radar:** đọc phiếu, gắn từ khoá vào vùng đề tài (Gạch 3) nếu khớp, thêm một mục "Tín hiệu Trung Quốc" trong
  báo cáo. Phiếu do chủ ghi, nên radar không bao giờ ghi đè.
- **Cơ sở:** `Documents\reports\Dữ liệu TikTok Facebook Trung Quốc.md`.

**Xong khi:** đủ 4 tuần phiếu thật; báo cáo radar có mục tín hiệu Trung Quốc đặt cạnh vùng đề tài YouTube;
chủ đọc thấy có ích. Gạch này chỉ được đặt sau khi các gạch trước đã đạt "Xong khi".

## Gạch 10: Cắt phụ thuộc vào shopapivn (chủ quyết 19/11/2026)

**Chủ quyết 19/11:** `youtube-main` của shopapivn **là tài liệu tham khảo**, không phải thứ hệ thống được dựa
vào. Kho GitHub cũng chuyển sang tài khoản mới (`huiweicorporation-gif`), mỗi module một kho riêng.

### Vì sao phải làm

`L:\System-research\youtube-main\youtube-main` **không phải bản làm việc** — nó là bản **cài đặt** của một sản
phẩm đã phát hành (`VERSION` 2.144.2, kho công khai `shopapivn/youtube`, xem `core/cap_nhat_github.py`). Nó tự
cập nhật bằng cách tải zip của nhánh rồi **dọn ruột thư mục cài và chép ruột mới vào**
(`core/safe_update.apply_tai_cho`). Nghĩa là **mọi thứ mình sửa trong đó sẽ bị lượt cập nhật tới xoá**, trừ thư
mục kênh có `kenh_rieng: true`. Bản sạch cùng phiên bản đã có ở `Documents\youtube-main` (36 MB) để đọc.

### Bốn chỗ nối, và chúng đã chết tới đâu (đo lại 19/11, tối)

Không chỗ nào chạy theo lịch, và **ba trong bốn chưa bao giờ chạy thật**. Đây là dọn ống chết, không phải di dời.

| # | Chỗ nối | Lần cuối dùng | Bằng chứng |
|---|---|---|---|
| 1 | `studio/pipeline/cli.py` `_volume()`, chỉ khi `pack --volume` | **chưa bao giờ** | `produce-log.txt` không có chữ `volume` nào; `commander produce` gọi `pack <tên>` |
| 2 | `commander/thu.py` `feed()`, gọi từ trang HQ | **chưa bao giờ** | không prompt nào của kênh có khối `<!-- commander:own-tests BEGIN -->` mà `feed()` ghi ra |
| 3 | `CHANNEL/why-humans-us/prompt/` | 21/10, một tháng không đụng | xem mục dưới |
| 4 | `radar handoff <channel_dir>` | 03/11 | `CHANNEL/why-humans-us/nghien-cuu/` dừng ở 03/11 |

### Sửa lại: prompt kênh KHÔNG phải khuôn sản xuất

Bản đầu của gạch này (19/11, chiều) viết `CHANNEL/why-humans-us/prompt/` là "khuôn sản xuất thật" và gọi đó là
việc nặng nhất. **Sai.** Đo lại buổi tối cho thấy:

- **Studio có bộ prompt riêng đầy đủ** — `studio/pipeline/prompts.py`: `script_user`, `review_user`,
  `revise_user`, `scenes_system`, `image_prompt`, `packaging` — và **không đọc gì** từ youtube-main
  (`studio/core/paths.py` chỉ giữ `youtube_main` cho đúng công cụ từ khoá).
- Các file prompt ấy đề ngày **21/10**, một tháng không ai sửa.
- Bản cài youtube-main **không có thư mục `PROJECTS/`** — dây chuyền bàn làm việc của nó chưa từng dựng video nào ở máy này.

Nghĩa là video của Why Humans do **Studio** làm, bằng prompt của Studio. Mớ prompt trong youtube-main là đồ
dựng ngày 21/10 rồi bỏ đó. **Không có gì phải di dời.**

### Chủ đã chốt (19/11, tối)

1. **Đo lượng tìm kiếm: viết lại trong Studio.**
   **Điều chỉnh so với lúc chốt:** `core/tu_khoa_youtube.do_tu_khoa` dùng **Google Trends** qua thư viện
   `trendspy`, **không** dùng YouTube Data API. Nên việc này **không tốn một đơn vị quota nào** và nợ NO-006
   không liên quan — rẻ hơn hẳn bản mô tả lúc hỏi. Cần thêm `trendspy` vào phụ thuộc của Studio
   (`studio/.venv` hiện chưa có). Cách đo giữ nguyên thuật toán cũ: đo theo lô tối đa 5 từ, lô đầu chọn từ
   đông nhất làm **neo**, các lô sau đều kèm neo rồi quy hết về một thang.
2. **`thu.feed()`: nối lại vào Studio.** Cho nó ghi tiêu đề và hook thắng vào prompt của Studio thay vì
   `CHANNEL/<kênh>/prompt/` của youtube-main. Giữ nguyên cơ chế khối có mốc `BEGIN`/`END` để ghi đè được nhiều
   lần mà không đụng phần luật của prompt. Đây là Gạch 7 (lấy cái thắng nuôi ngược sản xuất) lần đầu chạy thật.
3. **Prompt kênh:** không di dời gì, chỉ cần không còn ai đọc tới.
4. **`radar handoff`: tôi kiểm Studio rồi quyết — kết quả kiểm và đề xuất ở dưới.**

### `radar handoff`: Studio không có chỗ nhận, nhưng hồ sơ thì có

Tìm khắp `studio/` **không có khe nào** cho "đối thủ" hay "tuyến khán giả" (mấy chữ `lane` trong `core/jobs.py`
là làn chạy song song của hàng đợi việc, không liên quan).

Nhưng radar **đã xuất sẵn** `exports/latest/handoff_<thị trường>.json` mỗi ngày, mang đúng hai khoá
`competitors` và `tuyen` — còn **hồ sơ cơ hội hiện không có một dòng nào về đối thủ**.

**Đề xuất:** thay vì ghi sang thư mục kênh youtube-main, **gộp đối thủ và tuyến khán giả vào hồ sơ** (`de-bai.txt`).
Hồ sơ đã là cây cầu từ nghiên cứu sang sản xuất và đã chảy thẳng vào Studio, nên đó là nhà đúng. Việc này vừa cắt
được dây sang youtube-main, vừa bịt một lỗ thật: người viết kịch bản hiện không thấy đối thủ của vùng đề tài.
Đây là **việc thêm**, không phải việc dọn — chủ duyệt rồi mới làm.

### Xong khi

- `grep -rn "youtube_main\|youtube-main" --include=*.py` trong `radar`, `commander`, `studio`, `analysis` **không
  còn chỗ nào đọc hay ghi vào bản cài** (còn lại chỉ là chú thích lịch sử).
- Một video chạy hết dây chuyền (hồ sơ → duyệt → Studio → gói đăng) **sau khi đã đổi tên thư mục
  `youtube-main\` thành `youtube-main.tat\`** — tức là chứng minh bằng việc tắt nó đi, không phải bằng đọc code.
- Bộ test của cả bốn module xanh.
- `Documents\youtube-main` và `youtube-main\` chỉ còn là chỗ đọc; theo luật thư mục Documents, hệ thống không
  được phụ thuộc vào chúng.
