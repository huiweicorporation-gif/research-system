# Vòng 1 · đánh giá độc lập · 2026-11-08

Mỗi agent chấm riêng, không thấy ý kiến của agent khác. Phương án: `phuong-an.md`.

## Trinh sát (hut, hop_kenh)

- Radar chỉ có bằng chứng cầu trực tiếp cho kiểu C (mỡ, đường cong: ×338; bản sao "It Was Never About Beauty" ×21 trên kênh 795 sub). A, B, D, E không có video nổ cùng đề tài; điểm `hut` của chúng là suy luận, không phải số đo.
- Tín hiệu gần: "7,000 Years Ago Only 1 Man Had Kids for Every 17 Women" ×51,5 (gần D); "What Ancient Humans Invented When Mothers Couldn't Make Milk" ×10,2 (gần B, E).
- A: câu đố sạch, cầu trung bình. B: khung phá lầm tưởng, không có số trực tiếp. C: cầu mạnh nhất nhưng dính "hips/beauty". D: có tín hiệu cầu gián tiếp. E: rất hợp kênh, cầu thấp hơn.

```json
{"A": {"hut": 3, "hop_kenh": 5}, "B": {"hut": 3, "hop_kenh": 5}, "C": {"hut": 4, "hop_kenh": 3}, "D": {"hut": 4, "hop_kenh": 4}, "E": {"hut": 2, "hop_kenh": 5}}
```

## Ý tưởng (hut, hop_kenh, doc_dao)

- A: câu đố rõ, con số mạnh; đã có Kurzgesagt, PBS kể. B: ngược trực giác, giả thuyết năng lượng ít kênh nhắc. C: hợp kênh thấp nhất, đi theo video nổ. D: hook mạnh, nhiều video về "women hunters" rồi, nguy cơ chính trị hoá. E: hook mới, độc đáo nhất, chủ đề trừu tượng hơn.

```json
{"A": {"hut": 4, "hop_kenh": 5, "doc_dao": 3}, "B": {"hut": 4, "hop_kenh": 5, "doc_dao": 4}, "C": {"hut": 4, "hop_kenh": 2, "doc_dao": 2}, "D": {"hut": 4, "hop_kenh": 4, "doc_dao": 3}, "E": {"hut": 3, "hop_kenh": 5, "doc_dao": 5}}
```

## Kiểm duyệt (rui_ro, doc_dao, policy_risk)

- Chung: bật khai báo "altered or synthetic content"; mỗi video cần góc riêng để tránh "inauthentic content"; giữ nguyên dấu SynthID/C2PA; chủ đề sức khoẻ chỉ là giả thuyết tiến hoá, không đưa lời khuyên.
- A thấp. B thấp: EGG chưa đồng thuận, "It's Not the Hips" nên thành câu hỏi; em bé dạng minh hoạ, không cảnh sinh nở gây sốc. C **cao**: nội dung cơ thể nữ, dễ bị coi là gợi dục, hạn chế quảng cáo. D trung bình: Haas 2020 và con số "30–50% thợ săn là nữ" phải kiểm; tiêu đề "Everyone Got Wrong" dễ thành tuyên bố sai; bình luận gay gắt. E thấp: câu "linh trưởng duy nhất" là tuyệt đối, cần kiểm.

```json
{"A": {"rui_ro": 4, "doc_dao": 3, "policy_risk": "thap"}, "B": {"rui_ro": 4, "doc_dao": 3, "policy_risk": "thap"}, "C": {"rui_ro": 1, "doc_dao": 3, "policy_risk": "cao"}, "D": {"rui_ro": 3, "doc_dao": 2, "policy_risk": "trung-binh"}, "E": {"rui_ro": 5, "doc_dao": 4, "policy_risk": "thap"}}
```

## Đạo diễn (lam_ai, chi_phi)

- A dễ và rẻ nhất: bà già, trẻ lớn (không phải sơ sinh), cá voi minh hoạ, đồ thị; cần 2 ref mới. B khó: sơ sinh, sinh nở, tinh tinh con, tay; dễ làm lại ảnh và vượt quota. C làm được nhưng phải lọc ảnh lệch, hình trừu tượng dễ nhàm. D vừa: cảnh săn và đám đông khó, dùng xương, bản đồ. E khó nhất: nhiều người, sơ sinh truyền tay, hai loài.

```json
{"A": {"lam_ai": 4, "chi_phi": 4}, "B": {"lam_ai": 2, "chi_phi": 2}, "C": {"lam_ai": 3, "chi_phi": 3}, "D": {"lam_ai": 3, "chi_phi": 3}, "E": {"lam_ai": 2, "chi_phi": 2}}
```
