# Kế hoạch bổ sung: đội agent tự vận hành, một người chỉ huy

Ngày 25/10/2026. Bổ sung cho `LO-TRINH.md`, không thay nó. Luật "một viên gạch một lúc" vẫn giữ.

Nguồn đối chứng (đọc ngày 24–25/10, ghi chú đầy đủ trong `Documents\research_notes\Doi agent mot nguoi\`):
- `tam_nhin_chu.md`: 16 ảnh và bản ghi trong `Documents\he-thong-research`.
- `nguon_repos.md`: 5 repo trong `Documents\nguon`.
- `reality_check.md`: thị trường, khung agent, hạn mức LLM, luật YouTube (khoảng 60 nguồn, có link và ngày).
- Báo cáo dò youtube-main (bản trên máy này, 2.144.1) và `Documents\Claude outputs\existing-factory-notes.md` (số liệu xưởng thật, 21/10).

---

## 1. Đối chứng thực tế: hệ thống đang ở đâu

### 1.1 Bạn đã có một đội agent, chỉ chưa có người chỉ huy

Phần "đội agent có phòng ban" không phải xây từ đầu. Nó đang chạy, ở hai nơi:

| Phòng ban (tên trên dashboard vps1) | Đã có | Ở đâu |
|---|---|---|
| Trinh sát thị trường (Chiến trường) | Radar 1.4.9 chạy 06:30 mỗi ngày, 0 đ; radar-dev 1.6.0 có bản đồ vùng và bàn giao | Máy này |
| Giải mã video nổ | Analysis chạy 07:40, so cặp video nổ/đối chứng, diễn giải bằng Claude Pro → Gemini | Máy này |
| Tổng tham mưu (Não) | Ra lệnh và dự đoán có ngày chấm, sổ bài học (261 bài, 34 "thật"), 15 não bộ phận | Máy sản xuất / VPS |
| Phòng thí nghiệm | 8 giả thuyết chọn nguồn, chia khe bằng Thompson sampling, chạy bóng 7 ngày | VPS |
| Xưởng sản xuất (Hậu cần) | MyTool 8 khâu, `tu_chay` tự chạy hằng ngày, van ngân sách, khoá từng kênh | Máy sản xuất |
| Phát hành | Máy ảo nhận việc qua trạm HTTP, đăng theo giờ | VPS + VM |
| Tài vụ | Sổ ví ShopAPI, ước chi trước khi chạy, trần chi trong Studio | Rải rác |
| Bảng điều khiển | vps1 (5 trang), Studio (máy này), giao diện MyTool | Ba nơi |

Điều **chưa có**: một chỗ duy nhất để bạn nói chuyện và ra lệnh. Hôm nay bạn phải mở MyTool, vps1, Studio, và các phiên Claude Code riêng. Phần "Tổng chỉ huy" là phần thiếu thật.

Lưu ý quan trọng: bộ não và các file dashboard **không nằm trong bản youtube-main trên máy này**. Mình không đọc được code của Não. Mọi điều về Não ở đây lấy từ trang vps1 đã lưu và ghi chú 21/10.

### 1.2 Chỗ đau thật không phải thiếu agent

Số liệu trên chính trang Giới thiệu của bạn (21/10):
- Chi AI khoảng 1,3 triệu đ/ngày, ước 2,0 triệu đ/ngày, tức **khoảng 40–60 triệu đ/tháng**; khoảng 201 nghìn đ mỗi video.
- 11 kênh, 162 video, 347 nghìn view/tháng, thị phần 0,24%.
- Mục tiêu 30.000 $ trong 6 tháng, cần 2 triệu view/tháng, tức gấp 5,8 lần hiện tại.

Ước tính của mình từ chính các số đó: 347 nghìn view × RPM 2,5 $ ≈ 870 $/tháng ≈ 22 triệu đ. **Xưởng đang chi gấp 2–3 lần số nó thu về.** Con số này mình suy ra, chưa đối chiếu với sổ ví và AdSense thật.

Vì sao view chưa lên, theo chính các bảng của hệ thống:
- Não đoán đúng **12,5%** (1/8). Phần lớn dự đoán "không tính" vì nguồn được chọn không vào sản xuất trong 48 giờ. Chọn nguồn và làm video chưa nối với nhau, nên não không học được.
- Phòng thí nghiệm: **không giả thuyết chọn nguồn nào vượt mức nền 51%** (88 video đã chấm). Chọn ngẫu nhiên cùng tầng cũng được gần như vậy.
- Bộ phận lỗi nhiều nhất là thumbnail và ảnh (nhân vật lệch kênh, 35 lỗi đang mở). CTR là cổng đầu, và chưa có tín hiệu CTR nào chảy ngược về radar.

Kết luận đối chứng: **thêm agent không làm view tăng. Nối vòng lặp quyết định → sản xuất → đo → học, và chấm từng agent bằng kết quả thật, mới làm được.** Kế hoạch dưới đây xây "đội agent" theo nghĩa đó.

### 1.3 Thị trường nói gì (có nguồn, trong `reality_check.md`)

- **Không có trường hợp nào được kiểm chứng** về doanh nghiệp media "gần như toàn bộ do agent chạy". Ca được ghi chép tốt nhất (Adavia Davis, Fortune 30/12/2025, có sổ AdSense): 40–60 nghìn $/tháng doanh thu, nhưng có đội ngách trả lương, người vẫn làm hook, định dạng, chiến lược, khoảng 2 giờ/ngày giám sát, và chính anh ta cho rằng cửa này đóng "khoảng 2027". Các con số của người bán khoá học là lời quảng cáo, chưa kiểm chứng.
- 16 ảnh trong `Documents\he-thong-research` là **bản demo của người giảng khoá học** (dự án `yt-trend-radar`, máy "Admin", mở trong Antigravity), không phải hệ thống của bạn. Radar hiện tại đã làm đúng và vượt mẫu đó: cùng 7 mục, cùng công thức Trend Score 40/20/20/10/10, thêm ngách, video nổ và vùng đề tài.
- **YouTube** (chính sách nội dung không xác thực, đổi tên 15/07/2025; làm rõ 07/2026): cấm nội dung hàng loạt theo khuôn, không cấm AI. Từ 01/02/2027 kênh mới vào YPP cần 8.000 giờ xem (nay 4.000). Tự động hoá toàn phần vừa chưa được chứng minh vừa đi sát ranh chính sách.
- **Thuê bao không nuôi được agent chạy 24/7.** Anthropic đặt hạn mức tuần (28/08/2025) đích danh để chặn dùng "liên tục nền"; chặn OAuth thuê bao cho harness bên thứ ba (04/04/2026); chỉ `claude -p` và Antigravity `agy -p` là cửa hợp lệ cho thuê bao, và hạn mức Antigravity không công bố. Tuần này chính hệ thống đã chạm hạn mức Claude Pro sau vài ngày dùng nhẹ. Mọi khung agent (Claude Agent SDK, OpenAI Agents, Google ADK, LangGraph, CrewAI…) đều cần API key.
- **Giá API** (10/2026): Haiku 5.5 0,10/0,50 $; Sonnet 5.5 2/10 $; Gemini 2.5 Flash 0,30/2,50 $ mỗi triệu token. Một đội agent "vừa" (30 lần gọi/ngày, 20 nghìn token vào, 2 nghìn ra) tốn khoảng **2,7 $/tháng trên Haiku, 10 $ trên Gemini Flash, 54 $ trên Sonnet**; bậc miễn phí Gemini (250 lượt/ngày) có thể đủ, 0 đ. So với 40–60 triệu đ/tháng tiền tạo ảnh và clip, tiền suy luận là không đáng kể. Ràng buộc thật của thuê bao là **độ tin cậy**, không phải tiền.
- **Agent hỏng kiểu gì** (MAST, NeurIPS 2025; các bài kỹ thuật của Anthropic): tự khai "xong" quá sớm, sinh agent con tràn lan (gấp 15 lần token), lỗi dồn qua các bước, bị tiêm lệnh từ nội dung web. Cách chữa đã kiểm chứng: một agent trước khi nhiều agent; code tất định làm đường ống, LLM chỉ ở điểm phán xét; chấm kết quả cuối, không chấm lời khai; sổ tiến độ và điểm dừng; cổng duyệt cho tiền và đăng bài.

### 1.4 Năm repo trong `Documents\nguon`

| Repo | Giá trị | Quyết định |
|---|---|---|
| `youtube-automation-agent` (MIT) | Mẫu tốt: pipeline có điểm dừng và chạy tiếp, phát hành "đóng khi thiếu" (không có lời đọc thật thì không đăng), cổng duyệt (kiểm chứng sự thật, quyền sử dụng, công bố AI), chỉ dùng API chính thức với OAuth của chủ | Học mẫu, viết lại bằng Python của mình. Không `npm install` bản này: README chứa địa chỉ memecoin và link Telegram lạ |
| `ECC` (MIT) | Mẫu thẻ vai trò agent (tên, mô tả, công cụ, model, bước, khuôn kết quả), "hook thay lời nhắc", bộ nhớ có giới hạn, vòng tự học, bộ chấm điểm | Học định dạng thẻ vai trò và vòng chấm. Bỏ các kỹ năng cào web và điều khiển trình duyệt |
| `skills` (Google, Apache-2.0) | Danh mục SKILL.md cho GCP, Ads, Analytics | Chỉ tham khảo cách viết SKILL.md và phần GA4 |
| `awesome-opus5-5-videos` | 703 lời nhắc hoạt hình, không có code; 207 mục chép nguyên bài của người khác | Chỉ mượn ý "HTML animation → ghi hình → MP4" cho B-roll. Không dùng lại clip hay chữ |
| `watermarks-remover` | Ba việc: (1) bỏ ký tự Unicode ẩn trong văn bản; (2) xoá metadata; (3) xoá dấu nguồn gốc AI (C2PA, SynthID) và viết lại văn để qua mặt máy dò | **Chủ quyết 25/10: giữ thư mục, làm phần hợp lệ.** Đã làm trong Studio (commit `pipeline:` 25/10, 118 test): làm sạch ký tự ẩn trước TTS, và xem/xoá metadata riêng tư (máy ảnh, vị trí, tên) **giữ nguyên dấu công bố AI**. Phần (3) không làm: trái quy định công bố của YouTube và là rủi ro cho cả 11 kênh. Kiểm thực tế: clip của xưởng chỉ có nhãn `encoder`, ảnh Gemini có C2PA, nên phần (2) chủ yếu là bước kiểm trước khi đăng |

Phát hiện an toàn trong bản youtube-main trên máy này (chuyển lại để bạn xem): agent xây tool chạy `claude -p --dangerously-skip-permissions` (`core/developer_agent.py:78-86`); một khoá proxy viết thẳng trong `vm/may_cmt.py:100`; trạm HTTP 8765 không xác thực (chỉ chặn theo dải IP). Không có cái nào thuộc phạm vi mình sửa.

---

## 2. Nguyên tắc của đội agent

1. **Tổ chức theo cổng, không theo chức danh.** Chức danh là để bạn hình dung. Dưới nắp, mỗi phòng ban = một module tất định + một hoặc vài điểm phán xét bằng LLM + một sổ cái để chấm. Không có sổ cái thì không có phòng ban.
2. **Code làm đường ống, LLM phán xét.** Radar, hàng đợi, xưởng 8 khâu là code. LLM chỉ đọc số và quyết: chọn nguồn, viết đề bài, giải thích vì sao nổ, viết kịch bản.
3. **Mỗi lệnh có ngày chấm.** Mọi quyết định của agent ghi thành một dòng: lệnh, lý do, dự đoán, ngày kiểm, kết quả. Dự đoán chỉ được tính khi video thật tồn tại (bịt lỗ 12,5% của Não).
4. **Chấm kết quả cuối, không chấm lời khai.** Một agent nói "đã xong" không có giá trị; file có trên đĩa, số Studio sau 48 giờ mới có.
5. **Cổng người ở bốn chỗ:** tiền vượt trần, đăng bài, danh tính kênh, và mọi việc tác động ra ngoài (mở tài khoản, gửi tin). Còn lại máy tự làm.
6. **Thuê bao cho suy luận nặng khi có bạn; API key rẻ cho điểm phán xét theo lịch.** Không agent nào chạy nền bằng thuê bao.
7. **Một người chỉ huy, một bàn làm việc.** Bạn chỉ nói với Tổng chỉ huy. Nó đọc mọi sổ cái, ra lệnh cho các phòng, và báo cáo theo một mẫu.
8. **Luật nhà áp cho mọi agent:** không cookie, không đăng nhập hộ, không vượt chặn, chỉ API chính thức, dữ liệu cá nhân chỉ ở dạng tổng hợp (Luật 91/2025), công bố AI đúng quy định YouTube, bí mật không nằm trong code.
9. **"Huấn luyện" nghĩa là:** thẻ vai trò và kỹ năng có phiên bản trong git; sổ bài học với trạng thái giả thuyết → thật (Não đã có luật 3 cộng, cộng ≥ 2× trừ); bộ đề chấm cho từng điểm phán xét; tổng kết tuần tự sinh rồi sửa luật. Không tinh chỉnh model.

---

## 3. Sơ đồ tổ chức

```
                         BẠN (chủ)
                            │  nói tiếng Việt, duyệt 4 cổng
                            ▼
                  TỔNG CHỈ HUY (Claude Code, dự án System-research)
                  đọc giao ban · ra lệnh · ghi sổ · hỏi khi cần duyệt
        ┌──────────┬───────────┬───────────┬───────────┬───────────┐
        ▼          ▼           ▼           ▼           ▼           ▼
   TRINH SÁT   GIẢI MÃ    THAM MƯU    XƯỞNG       PHÁT HÀNH    TÀI VỤ
   (radar)     (analysis) (Não/Lab)   (MyTool)    (VM)         (sổ chi)
        └──────────┴───────────┴─────┬─────┴───────────┴───────────┘
                                     ▼
                     PHÁP CHẾ & AN TOÀN · KIỂM ĐỊNH (cổng, test, chấm)
                                     ▼
                           CHIẾN TRƯỜNG (dashboard vps1, Studio)
```

**Thêm 14/11 (cài 14/11 tối):** hai agent FDE, `fde-noi-vong` (nối các chỗ giữa radar, commander, analysis, Studio)
và `fde-kenh` (đưa từng kênh, thị trường vào hệ thống). Chỉ hai agent này được viết code, chỉ ở chỗ dev, lên máy
thật qua kỹ năng `trien-khai` khi chủ đồng ý trong phiên. Kỹ năng các phòng ban: `giao-ban`, `so-cai`, `doc-radar`,
`giai-ma-cap-no`, `kiem-chinh-sach`, `trien-khai`, `mo-kenh`, `do-cho-nghen`, `tong-ket-tuan`.

### 3.1 Tổng chỉ huy

- **Là gì:** phiên Claude Code của dự án `L:\System-research`, với `CLAUDE.md` (luật), `.claude\agents\*.md` (thẻ vai trò các phòng), `.claude\skills` (kỹ năng), bộ nhớ dài hạn. Đây chính là phiên bạn đang nói chuyện. Kế hoạch này chỉ **viết thành văn** vai của nó và cho nó một bàn làm việc.
- **Bàn làm việc = Giao ban sáng.** Một script Python nhỏ (0 đ, tất định) chạy sau radar và analysis, gom thành `giao-ban\<ngày>.md`: báo cáo radar tóm tắt, cặp video nổ có giả thuyết, vùng đề tài nổi, bàn giao đang chờ, lượt `tu_chay` hôm qua (nếu có bản xuất), chi hôm qua, dự đoán đến hạn chấm, sự cố. Bạn mở phiên, nói "giao ban", Tổng chỉ huy đọc file và trình bày theo một mẫu cố định, rồi hỏi đúng những việc cần bạn quyết.
- **Ra lệnh thế nào:** mỗi lệnh ghi một dòng JSON trong `so-cai\lenh.jsonl`: `id, luc, phong, lenh, ly_do, du_doan, kiem_ngay, trang_thai, cham`. Cùng khuôn với `hanh_dong[]` của Não trên vps1, để sau này gộp.
- **Khi bạn vắng:** máy chạy theo lịch (Task Scheduler), Tổng chỉ huy không chạy nền. Việc gì cần phán xét ngoài giờ thì dùng điểm phán xét bằng API key (mục 3.7) hoặc chờ giao ban.

### 3.2 Phòng Trinh sát (radar) — đã có

- Việc: thu thập, ngách, video nổ, vùng đề tài, bàn giao (Gạch 1–4).
- Agent: `trinh-sat` chỉ đọc bản xuất và trả lời câu hỏi của chỉ huy. Không LLM trong đường ống.
- Sổ cái: `exports\<ngày>\*.json`, `run-history.txt`.
- Chấm: vùng đề tài có điểm cơ hội cao có cho video thắng không (đo ở Gạch 7).

### 3.3 Phòng Giải mã (analysis) — đã có

- Việc: tải tối đa 10 video/ngày, so cặp, giả thuyết "Vì sao nó nổ" (Gạch 2).
- Điểm phán xét: Claude Pro → Gemini (ChainCLI). Đề xuất thêm bậc 3: API key rẻ, để không hụt ngày khi cả hai thuê bao chạm hạn mức.
- Chấm: giả thuyết được dùng vào đề bài có ra video thắng không.

### 3.4 Tổng tham mưu (Não + Phòng thí nghiệm) — đã có trên VPS, chưa nối

- Việc: ra lệnh, dự đoán, bài học, thử giả thuyết chọn nguồn.
- Lỗ cần bịt: dự đoán không vào sản xuất → "không tính". Cách bịt: **hồ sơ cơ hội có hạn** (mục 4), và dự đoán chỉ bắt đầu tính khi video tồn tại.
- Tuyến tiếng Anh: giữ **sổ cái nhỏ riêng** (`so-cai\du-doan.jsonl`) cho tới khi mình đọc được code Não; sau đó gộp bằng cùng khuôn.
- Phòng thí nghiệm: thêm giả thuyết `H-RADAR-EN` (chọn nguồn theo vùng đề tài + video nổ của radar) chạy bóng 7 ngày theo đúng phương pháp của bạn, chấm bằng "nổ +7 ngày".

### 3.5 Xưởng (MyTool 8 khâu) — đã có, không xây lại

- 8 khâu đã là 8 agent có vai (các file `prompt\1-tieu-de … 10-nguoi-ke`).
- Việc bổ sung: viết thẻ vai trò cho từng khâu (đầu vào, đầu ra, tiêu chí đạt, chi phí cho phép), và một số đo chất lượng cho bộ phận lỗi nhiều nhất: **tỉ lệ ảnh/thumbnail được nhận không phải tạo lại**.
- Cổng: `tu_duyet` tắt cho tới khi tỉ lệ thắng 48 giờ ổn định.

### 3.6 Phát hành (VM) — đã có

- Chỉ API chính thức và OAuth của chủ. Trước khi đăng, checklist 4 điều (học từ `youtube-automation-agent`): lời đọc thật có trên đĩa, quyền sử dụng tư liệu đã rõ, công bố AI khi là nội dung mô phỏng thật, không trùng ý tưởng với kênh anh em.

### 3.7 Tài vụ — gom lại

- Một sổ chi chung `so-cai\chi.jsonl`: ví ShopAPI (thực chi, không phải ước), API key điểm phán xét, Studio. Ba số theo dõi hằng ngày: **đ/video, đ/1.000 view, đ/ngày so với trần**.
- Luật dừng: chi/ngày vượt trần → xưởng dừng, chỉ huy hỏi bạn. Đây đã có trong `tu_chay` ở dạng ước tính; nâng lên thực chi.
- API key cho điểm phán xét theo lịch: bắt đầu bằng bậc miễn phí Gemini hoặc Haiku 5.5, trần 10 $/tháng. Thuê bao giữ cho việc nặng khi có bạn.

### 3.8 Pháp chế & An toàn — viết thành văn

- Một file `HIEN-PHAP-AGENT.md` mọi thẻ vai trò phải dẫn: 8 luật ở mục 2.8, cộng: không chạy `--dangerously-skip-permissions` ở máy này; không khoá trong code; không đọc `~\.claude`, `~\.gemini`; dữ liệu người xem chỉ tổng hợp.
- Kiểm định: test đỏ trước (CLAUDE.md), `/code-review` trước triển khai, bộ đề chấm cho từng điểm phán xét (mục 5).

### 3.9 Chiến trường (dashboard) — Gạch 6

- Bộ chuyển radar → `chien-truong.json` theo bảng ánh xạ đã có. Trang Não và Hậu cần đọc từ VPS, giữ nguyên.

---

## 4. Hồ sơ cơ hội: mảnh ghép nối nghiên cứu với sản xuất

Đây là thứ đổi 12,5% thành số đo được. Mỗi hồ sơ là một thư mục `ho-so\<ngày>-<mã vùng>\`:

| Phần | Nguồn | Ai viết |
|---|---|---|
| `de-bai.txt` | Vùng đề tài có điểm cơ hội cao nhất chưa có hồ sơ + 1–2 video nổ trong vùng + giả thuyết "Vì sao nó nổ" của chúng | Điểm phán xét (LLM, 1 lần gọi) |
| `hop-dong.json` | `zone_id`, video nguồn, kênh đích, **hạn vào sản xuất 48 giờ**, dự đoán (nổ +7 ngày? CTR?), ngày chấm | Code |
| Bàn giao | `de-bai.txt` → `0-tu-lieu.txt` của lượt sản xuất; link nguồn → `doi-thu.txt`; vùng → `tuyen.csv` (đã có ở radar 1.6.0) | Code |
| Chấm | Sau 48 giờ: có video không? Sau 7 ngày: nổ không? Ghi vào `so-cai\du-doan.jsonl` | Code đọc Studio (Gạch 7) |

Hồ sơ không vào sản xuất đúng hạn thì ghi "trễ", không ghi "không tính", để thấy chỗ nghẽn.

---

## 5. Huấn luyện đội agent: cụ thể là làm gì

1. **Thẻ vai trò** (`.claude\agents\<phong>.md`, theo mẫu ECC): tên, nhiệm vụ, được đọc gì, được ghi gì, công cụ, model, bước làm, khuôn kết quả, tiêu chí đạt, điều cấm. Có phiên bản trong git.
2. **Bộ đề chấm** cho mỗi điểm phán xét, giá trị kỳ vọng độc lập (theo CLAUDE.md): ví dụ 20 cặp video nổ đã biết kết quả → giả thuyết có nêu đúng khác biệt đo được không; 30 đề bài → video có vào sản xuất và có thắng không.
3. **Sổ bài học** dùng chung khuôn của Não: `kenh, cum, huong, noi_dung, cong, tru, nguon, trang_thai`. Luật thăng "thật": ≥ 3 cộng và cộng ≥ 2× trừ.
4. **Tổng kết tuần** tự sinh (`tong-ket\<tuần>.md`): tỉ lệ dự đoán tính được, tỉ lệ đúng, đ/video, đ/1.000 view, bài học mới thăng "thật", lỗi theo phòng. Bạn đọc 15 phút, Tổng chỉ huy đề xuất sửa luật hoặc thẻ vai trò; sửa bằng commit.
5. **Không tinh chỉnh model.** Mọi "học" nằm trong luật, kỹ năng, sổ bài học và bộ đề.

---

## 6. Lộ trình bổ sung (xếp vào các gạch, không phá luật một viên)

| Giai đoạn | Việc | Điều kiện bắt đầu | Xong khi |
|---|---|---|---|
| **0. Viết thành văn** (tuần này, 0 đ, gần như không code) | `HIEN-PHAP-AGENT.md`; thẻ vai trò cho Tổng chỉ huy, Trinh sát, Giải mã; script giao ban sáng; sổ cái `lenh.jsonl`; xoá `watermarks-remover`; chốt API key rẻ cho điểm phán xét; chốt khuôn hồ sơ cơ hội | Ngay | Một buổi "giao ban" chạy thật trên dữ liệu ngày 25–27/10 |
| **1. Nối vòng lặp** (sau nghiệm thu Gạch 2 và 3) | Hồ sơ cơ hội có hạn (mục 4) cho kênh tiếng Anh mới; bàn giao `radar handoff` chạy thật; sổ dự đoán riêng; bộ chuyển `chien-truong.json` (Gạch 6 phần radar) | Gạch 2, 3 đạt "Xong khi"; kênh tiếng Anh có thư mục | 10 hồ sơ liên tiếp vào sản xuất đúng hạn 48 giờ; dashboard hiện số thật |
| **2. Gộp với Não** | Đọc code Não (cần bạn cấp), gộp sổ dự đoán và bài học, `H-RADAR-EN` vào phòng thí nghiệm, 3 bậc LLM cho điểm phán xét | Có bản sao code và JSON mẫu của Não | Dự đoán của tuyến tiếng Anh xuất hiện trên trang Não với tỉ lệ "tính được" ≥ 80% |
| **3. Đo và học** (Gạch 7) | Số Studio 48 giờ về radar qua API chính thức; bộ đề chấm; tổng kết tuần tự sinh; thẻ vai trò 8 khâu với số đo thumbnail | Kênh tiếng Anh có ≥ 10 video | 10 dự đoán đã chấm; một luật được sửa từ tổng kết tuần |
| **4. Nhân rộng** | Thị trường thứ hai, nền tảng mới (TikTok Discovery API, phiếu Trung Quốc) | **đ/1.000 view thấp hơn RPM** trên tuyến tiếng Anh, 4 tuần liền | Theo `LO-TRINH.md` |

**Tiến độ giai đoạn 0 (25/10):**
- Đã có: `HIEN-PHAP-AGENT.md`; thẻ vai trò `.claude\agents\trinh-sat.md` và `giai-ma.md` (chỉ đọc, model sonnet).
- Đã có (25/10, module mới `commander\`, 15 test): `py -m commander briefing` viết `giao-ban\<ngày>.md`
  (máy chạy, nghiệm thu Gạch 2, thị trường, lệnh đến hạn); `py -m commander order add|due|grade` giữ sổ cái
  `so-cai\lenh.jsonl`. Không AI, 0 đ.
- Còn lại:
  1. chủ chốt API key cho điểm phán xét;
  2. khuôn hồ sơ cơ hội;
  3. ~~giao ban tự chạy~~ đã cài 25/10: tác vụ `YouTubeResearchBriefing_Daily` chạy 08:30 (tự đánh thức máy) và
     90 phút sau khi đăng nhập (commander commit fdbfc07).

Chỉ số của cả kế hoạch, đọc mỗi tuần: tỉ lệ dự đoán tính được (mục tiêu ≥ 80%, nay 12,5% đúng/phần lớn không tính); tỉ lệ đúng (mục tiêu > 51% nền); đ/video và đ/1.000 view; giờ của bạn mỗi ngày (mục tiêu ≤ 1 giờ giao ban); 0 sự cố chính sách.

---

## 7. Tài liệu và quyền mình cần bạn cung cấp

Xếp theo mức cần:

1. **Bản sao chỉ đọc code bộ não trên VPS**: `core/nao*.py`, `nao_bo_phan`, `radar_dot_bien`, `phong_thi_nghiem`, và các module ghi `nao.json`, `chien-truong.json`, `kinh-te.json`, `dong-ho.json`, `su-kien.json`, `day-du.json`. Cộng cách file lên `shopapi.vn/vps1` (script hay API). Không có thì giai đoạn 2 và 6 không làm được.
2. **Một ngày JSON thật của vps1** (6 file trên), để bộ chuyển ghi đúng khuôn thay vì đoán từ JavaScript.
3. **Sổ cái 30 ngày của xưởng**: `tu-chay\<ngày>.json` các kênh, `so-chon-v7.csv`, và bản xuất Studio (hiển thị, CTR ở 48 giờ). Để đo vòng lặp hiện tại trước khi sửa.
4. **Sổ ví ShopAPI** theo ngày và theo kênh (thực chi), để tính đ/video và đ/1.000 view thật và kiểm lại ước tính "chi gấp 2–3 lần thu" ở mục 1.2.
5. **Quyết định**: API key nào cho điểm phán xét theo lịch (bậc miễn phí Gemini hay Haiku 5.5) và trần tháng; thuê bao Claude bạn đang dùng cho `viet_max.py` là Pro hay Max.
6. **Kênh tiếng Anh mới**: mã kênh, giọng, phong cách, khuôn ngách (`why-humans-explainer` có sẵn); quyền API YouTube của kênh đó khi tới Gạch 7 (OAuth chính chủ, không mật khẩu).
7. **Xác nhận** 6 luật đã ghi trên trang Giới thiệu vẫn còn hiệu lực (chọn ngách theo tuổi kênh thắng; số AI phải nêu mẫu; nổ ≥ 8×; đo 48 giờ; kéo view chéo; một kênh một tệp, một vùng một kênh chủ).
8. **Kỹ năng**: không cần bạn cung cấp. Thẻ vai trò và kỹ năng mình viết được từ ECC và tài liệu Claude Code. Tài liệu khoá học research không cần: radar đã vượt bản demo.

---

## 8. Điều mình cố ý không đề xuất

- Không xây framework agent mới hay dùng Claude Agent SDK, LangGraph, CrewAI: đều cần API key chạy nền, thêm một tầng mã để bảo trì, và không giải quyết lỗ 12,5%.
- Không dùng n8n, Make (theo yêu cầu) và cũng không cần: Task Scheduler + Python + file đã là bộ điều phối, đã chạy 5 ngày không lỗi.
- Không cho agent nào chạy nền bằng thuê bao, không mượn tài khoản, không cookie.
- Không nhân kênh hay nền tảng trước khi đ/1.000 view thấp hơn RPM.
- Không xoá dấu nguồn gốc AI khỏi media tự tạo và không viết lại văn để qua mặt máy dò (phần 3 của
  `watermarks-remover`), dù thư mục được giữ theo quyết định của chủ.
