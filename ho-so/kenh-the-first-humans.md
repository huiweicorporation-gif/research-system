# Hồ sơ kênh: Why Humans

Chủ chốt tên "The First Humans" ngày 2026-11-03. Cùng tối đó YouTube báo lỗi "Failed to create channel", nên chủ
đổi sang **Why Humans**. Thư mục và tên file vẫn giữ chữ `the-first-humans`. Kênh tiếng Anh, khán giả Mỹ trước (ngách `evo-psych-en`). Khuôn xưởng:
`why-humans-explainer` + `why-humans-original` (youtube-main).

**Kênh đã tạo 2026-11-03, handle `@whyhumansus`** (youtube.com/@whyhumansus). Chủ tự tạo. Tạo tài khoản và đăng bài
là việc của chủ, thuộc cổng danh tính và cổng đăng bài.

## 1. Kiểm trước khi tạo (chủ làm, khoảng 5 phút)

"Why Humans" ngắn và là cụm từ thường gặp, nên rất dễ trùng.
1. Tìm "Why Humans" trên YouTube. Nếu đã có kênh trùng tên mà đang hoạt động, chỉ cần đổi handle; tên hiển thị
   vẫn giữ được vì YouTube không bắt tên hiển thị phải là duy nhất.
2. Thử @handle theo thứ tự. Đừng nhận handle có đuôi ngẫu nhiên do YouTube tự gợi ý (kiểu `-u1g`):

| Thứ tự | Handle | Ghi chú |
|---|---|---|
| 1 | @WhyHumans | Tốt nhất, khả năng cao đã có người lấy |
| 2 | @WhyHumansTV | Đuôi TV phổ biến cho kênh giải thích |
| 3 | @WhyHumansStory | Hợp kiểu kể chuyện |
| 4 | @WhyDoHumans | Khớp câu hỏi mở đầu mỗi video |
| 5 | @WhyHumansHQ | Dự phòng |

3. Nếu tạo kênh vẫn báo lỗi "Failed to create channel": đổi handle; nếu vẫn lỗi thì tạo bằng tên tạm rồi đổi tên
   sau trong Studio; nếu vẫn lỗi thì dùng cửa sổ ẩn danh. Cách cuối là xác minh số điện thoại tại youtube.com/verify
   rồi đợi khoảng 24 giờ.
4. Sau này mở thị trường khác thì giữ tên, thêm đuôi ngôn ngữ: Why Humans Hindi, Why Humans Español.

## 2. Mô tả kênh (Studio → Tùy chỉnh → Thông tin cơ bản → Description)

Khoảng 640 ký tự, dưới giới hạn 1.000. Khoảng 150 ký tự đầu hiện trong kết quả tìm kiếm, nên câu hỏi mở đầu
và tên kênh nằm ở đó.

```
Why do you crave salt? Why are you afraid of the dark? Why does a warm fire feel like home?

Why Humans answers the questions you never thought to ask about yourself.

Every video takes one everyday thing about your body or your mind and follows the clues back in time, through archaeology, fossils and evolution, to the early humans who shaped it. Real science, told as a story. When the experts disagree, we tell you that too.

New stories every week. Got your own "why do humans..." question? Ask it in the comments, and it might become the next episode.
```

"Every week" chỉ giữ nếu chủ chốt nhịp đăng một tuần một video; nếu chưa chốt thì xóa hai chữ đó.

## 3. Từ khóa kênh (Studio → Cài đặt → Kênh → Từ khóa)

Khoảng 330 ký tự, dưới giới hạn 500. Dán nguyên dòng; mỗi cụm cách nhau bằng dấu phẩy.

```
why humans, why do humans, early humans, prehistoric humans, ancient humans, human evolution, evolutionary psychology, human origins, stone age, archaeology explained, human instincts, human body explained, science explained, science documentary, history explained
```

## 3b. Tag và hashtag cho video

**Tag mặc định**: Studio → Cài đặt → Thông tin tải lên mặc định → Thẻ. Dán một lần, mọi video mới đều có sẵn.
Khoảng 200 ký tự, chừa chỗ cho tag riêng của từng tập (giới hạn 500).
```
why do humans, why humans, early humans, prehistoric life, human evolution, evolutionary psychology, stone age, archaeology, science explained, documentary
```

**Mô tả mặc định**: cùng chỗ trên, ô Mô tả. Dòng cuối là hashtag. YouTube hiện 3 hashtag đầu phía trên tiêu
đề. Không dùng quá 15 hashtag, quá thì YouTube bỏ qua tất cả.
```
Why Humans: one everyday thing about your body or mind, traced back to the early humans who shaped it.
Subscribe for a new "why do humans..." story every week.

#WhyHumans #HumanEvolution #EarlyHumans
```

**Tập 1 (muối)**: thêm vào ngoài phần mặc định.
- Tag: `why do we crave salt, salt craving, history of salt, salt evolution, sodium and the body, why we love salty food`
- Hashtag, đặt **trước** bộ mặc định để hiện trên tiêu đề: `#Salt #WhyHumans #HumanEvolution`
- Short của tập: `#Shorts #Salt #WhyHumans`

Luật cho các tập sau:
- 3–5 tag riêng của tập, theo câu người ta gõ tìm thật. Radar có sẵn trong `rising_keywords` của ngách
  `evo-psych-en`.
- Hashtag đầu tiên là chủ đề của tập.
- Không dùng tag hay hashtag của kênh khác hoặc không liên quan: YouTube coi đó là spam/metadata gây hiểu lầm.

## 4. Ảnh đại diện, ảnh bìa, logo đóng dấu (đã vẽ 2026-11-03)

File trong `kenh-the-first-humans/`, vẽ lại bằng `py ve_nhan_dien.py` (cùng kết quả mỗi lần chạy):
- `anh-dai-dien-800.png`: ảnh đại diện (YouTube Studio → Tùy chỉnh → Xây dựng thương hiệu → Ảnh).
- `anh-bia-2560x1440.jpg` (1 MB; bản `.png` 5 MB cũng dùng được): ảnh bìa (mục Hình ảnh biểu ngữ).
- `logo-dong-dau-150.png`: hình mờ video, hiện ở góc phải dưới (mục Hình mờ video, chọn "Toàn bộ video").

Hướng vẽ ban đầu:

- **Ảnh đại diện (800×800, đọc được ở cỡ 48 px):** một bàn tay vẽ tay in trên vách đá, kiểu dấu tay hang động,
  màu đất nung trên nền xanh đậm; không chữ. Cùng bút pháp `phang-am-ve-tay` của xưởng.
- **Ảnh bìa (2560×1440, vùng an toàn 1546×423 ở giữa):** chữ "WHY HUMANS" lớn, bên dưới dòng nhỏ
  "Why your body and mind work the way they do". Hai bên là cảnh bếp lửa thời tiền sử và cảnh người hiện đại
  cầm điện thoại, nối bằng một đường kẻ mảnh như dòng thời gian.
- Chỉ dùng hình tự vẽ, không dùng ảnh hiện vật hay ảnh khai quật có bản quyền.

## 5. Gắn với tập đầu

- Tập 1: **Why Does Your Body Crave Salt? A 100-Million-Year-Old Instinct** (`2026-10-26-salt/kich-ban-D.md`).
  Câu kết của kịch bản đã khớp tên kênh ("another 'why do humans' story").
- **Đã làm 2026-11-03:**
  - Tạo kênh `youtube-main\CHANNEL\why-humans-us` bằng `core.khuon.dung_kenh`, ghép từ ngách
    why-humans-explainer, chiến lược why-humans-original, bộ vẽ phang-am-ve-tay và bộ văn hoá en-early-humans.
    Thêm `phan_tram_clip: 0`. Còn thiếu `voice_id`, chủ điền.
  - Ghi bàn giao radar ngày 03/11, đã lọc theo duyệt của chủ (cổng 4): 70/82 đối thủ, 5/10 tuyến.
  - **Bỏ 12 đối thủ:**
    - hẹn hò/quyến rũ: femaleseduction, femaleattractionguide, thereallovefile, femalepsychologymiakhalifa,
      relationshipwisdomvictoria, themiacode2.o;
    - lạc chủ đề: james.usa.455 (GTA), historyofindiaexplained (Harappa), roninbytes_kk (dầu xe, Telugu);
    - tiếng Hindi, thuộc ngách hi: stickmensss;
    - nghiêng tình dục: evo_g1rl, thecuriousviewofficial.
  - **Bỏ 5 tuyến:** radar-woman, radar-touch, radar-size, radar-interest, radar-sex. Chúng nghiêng
    hẹn hò/tình dục, dễ dính kiểm duyệt và không hợp kênh khoa học gia đình.
  - Lệnh `radar handoff --apply` chỉ chặn trùng với dòng đã có trong tệp. Vì vậy các lần sau phải chạy thử rồi
    lọc lại như trên, đừng `--apply` thẳng.
- Sau khi kênh có: chủ báo handle → tạo thư mục kênh trong youtube-main từ hai khuôn trên (`phan_tram_clip: 0`)
  → chạy thử `radar handoff evo-psych-en` không `--apply` → chủ duyệt bàn giao (cổng 4).
