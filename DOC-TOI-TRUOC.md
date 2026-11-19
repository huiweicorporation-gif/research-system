# Đọc tôi trước — bản đồ thư mục `L:\System-research`

Sắp xếp ngày 05/11/2026 theo ý chủ: **tài liệu tham khảo nằm trong `Documents\`, mọi thứ còn lại
là hệ thống.** Lối vào duy nhất để xem hệ thống: `http://localhost:8765/`.

## Hệ thống — code (đang chạy)

| Thư mục | Là gì | Chạy khi nào |
|---|---|---|
| `radar\` | Radar quét YouTube: video nổ, từ khoá, vùng đề tài, bình luận | Tự chạy 06:30 mỗi sáng |
| `radar-dev\` | Bản đang sửa của radar; sửa ở đây rồi mới đưa sang `radar\` | Không tự chạy |
| `analysis\` | Mổ xẻ video nổ, đặt giả thuyết vì sao nổ | Tự chạy 07:40 mỗi sáng |
| `commander\` | Trang web `localhost:8765` và giao ban sáng | Bật cùng máy |
| `studio\` | Studio sản xuất video (đang thử) | Mở tay |
| `youtube-main\` | My Tool, tool sản xuất có từ trước | Mở tay |
| `voice-eval\` | Môi trường giọng đọc OmniVoice và giọng người kể | Studio, My Tool gọi tới |
| `OpenMontage-main\` | Repo tham khảo **nhưng code đang dùng**: `analysis` nạp bộ mổ xẻ video từ đây. Đừng dời. | Mỗi sáng 07:40 |
| `feedback\` | Chỗ cho vòng phản hồi từ kênh (Gạch 7), chưa có code | — |
| `.claude\` | 9 agent theo vai (7 chỉ đọc, 2 FDE được viết code ở chỗ dev), kỹ năng (họp tranh luận, giao ban, sổ cái, triển khai, sửa lỗi…) | Khi gọi trong Claude Code |
| `tools\` | SkillSpector: công cụ kiểm kỹ năng trước khi cài | Khi cài/cập nhật kỹ năng |

Tài liệu thiết kế mà hệ thống còn cần để xây tiếp nằm ngay trong phần hệ thống, không ở `Documents\`:
giao diện VPS1 cho Gạch 6 ở `commander\docs\vps1-design\`, kế hoạch Studio ở `studio\docs\`, nhân vật
chính của kênh (nv1) ở `studio\assets\character\`.

## Hệ thống — dữ liệu do máy tự ghi (không sửa tay)

| Thư mục | Là gì |
|---|---|
| `dashboard-data\`, `vps1\` | Số liệu cho trang web |
| `giao-ban\` | Giao ban sáng mỗi ngày |
| `so-cai\` | Sổ lệnh và dự đoán (Bộ Não chấm) |
| `ho-so\` | Hồ sơ cơ hội, biên bản họp tranh luận |
| `studio-projects\` | Video thử của Studio |
| `tin-hieu-tq\` | Phiếu tín hiệu Trung Quốc **chủ nhập tay** |

## Hệ thống — tài liệu điều hành (code và agent đọc, nên để ở gốc)

| Tệp | Là gì |
|---|---|
| `CLAUDE.md` | Luật cho Claude trong thư mục này |
| `LO-TRINH.md` | Lộ trình 9 viên gạch; trang web đọc tệp này |
| `HIEN-PHAP-AGENT.md` | Luật chung của đội agent; agent đọc tệp này |
| `KE-HOACH-BO-SUNG-DOI-AGENT.md` | Kế hoạch đội agent; trang web đọc tệp này |
| `THIET-KE-DOI-AGENT-VAN-HANH.md` | Thiết kế vận hành đội agent; kỹ năng họp đọc tệp này |

## `Documents\` — tài liệu tham khảo (chỉ để đọc)

| Thư mục / tệp | Là gì |
|---|---|
| `nguon\` | Repo chủ đưa: youtube-automation-agent, ECC, skills (Google), watermarks-remover, archify (SkillSpector đã sang `tools\`, giao diện VPS1 sang `commander\docs\vps1-design\`) |
| `library\` | awesome-opus5-5-videos |
| `OmniVoice-master\` | Mã nguồn OmniVoice (đã cài vào `voice-eval`, bản này chỉ để đọc) |
| `he-thong-research\` | Ảnh chụp và mô tả hệ thống mẫu chủ đưa |
| `research_notes\`, `reports\` | Ghi chép nghiên cứu (đội agent, dữ liệu TikTok/Facebook Trung Quốc, thị trường) |
| `Claude outputs\` | Báo cáo, bản kiểm, nghiệm thu Claude viết |
| `youtube-trend-analysis\` | Hệ thống báo cáo xu hướng đầu tiên (16–23/10), đã thay bằng radar, lịch chạy đã tắt |
| `BAN-GIAO-NGU-CANH.md` | Bàn giao ngữ cảnh cho phiên làm việc mới |
| `xu_t_gi_i_ph_p_h_th_ng_auto_research.md` | Đề xuất ban đầu của hệ thống |

**Xoá được `Documents\`.** Ngày 06/11/2026 đã thử đổi tên thư mục này đi rồi chạy toàn bộ hệ thống:
radar, analysis, commander, Studio, giọng đọc, trang web và SkillSpector vẫn chạy đúng. Không code, lịch chạy
hay cấu hình nào còn đọc gì trong `Documents\`. Một số tài liệu điều hành (LO-TRINH, KE-HOACH…) vẫn trích
dẫn tệp trong đó làm bằng chứng lịch sử; xoá thì các trích dẫn ấy chỉ còn là tên.
