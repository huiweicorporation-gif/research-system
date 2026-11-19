# Sơ đồ hệ thống

`he-thong.architecture.json` là **bản gốc**. `he-thong.html` chỉ là bản in ra từ nó.
Sửa thì sửa file JSON rồi dựng lại — **đừng sửa thẳng vào HTML**, lần dựng sau sẽ ghi đè.

Xem trên dashboard: mở HQ (`py -m commander web`) rồi vào tab **Sơ đồ hệ thống**.
Trang này được phục vụ ở `/hq/diagram.html`, đọc thẳng từ thư mục này chứ không chép sang `commander/web/hq/`.

## Dựng lại sau khi sửa JSON

Cần [Archify](https://github.com/tt-a1i/archify) (Node.js, không có phụ thuộc nào). Bản dùng ngày 19/11/2026
là v2.16.0, nằm ở `Documents/archify-main/archify`. **Documents là thư mục tham khảo và sẽ bị xoá**, nên khi
không còn thì lấy bản mới bằng `npx skills add tt-a1i/archify -g` hoặc clone kho trên.

```bash
cd <thư mục archify>
node bin/archify.mjs validate architecture "L:/System-research/diagrams/he-thong.architecture.json" --quality showcase --json
node bin/archify.mjs deliver  architecture "L:/System-research/diagrams/he-thong.architecture.json" "L:/System-research/diagrams/he-thong.html" --quality showcase --json
```

`deliver` chỉ được coi là đạt khi báo **9/9 kiểm tra, 0 lỗi, 0 cảnh báo**. Mã thoát khác 0 thì bản HTML cũ vẫn
còn nguyên — nghĩa là lần dựng đó hỏng, không phải đã thành công.

## Mấy chỗ dễ vấp (đã trả giá ngày 19/11)

- **Hộp không nhận `variant`**, chỉ dây nối mới nhận. Muốn ghi trạng thái lên hộp thì dùng `tag`.
- **Ghi chú của một góc nhìn tối đa 140 ký tự.**
- **Chiều rộng `viewBox` phải dưới ~1390.** Ở màn 1440px, phần vẽ chỉ rộng 930px; rộng hơn thì chữ phụ 9px co
  xuống dưới 6px và `composition/desktop-readability` sẽ bác.
- **Hai hộp xếp dọc phải trùng tâm.** Lệch 5px là bộ định tuyến bẻ khúc và báo `endpoint-side-direction`.
- **Nhãn mặc định hay đè lên hộp.** Dây ngang thì nhấc lên bằng `labelDy` âm, dây dọc thì đẩy xuống giữa khe
  bằng `labelDy` dương.

## Nguyên tắc nội dung

Sơ đồ này ghi **trạng thái thật**, không ghi ý định: đường liền là dây đang chạy, đường đứt nét là dây giữ lại
để tham khảo. Trước khi vẽ một dây là "đang chạy", phải có dấu vết của lần dùng thật — một dòng log, một file
đầu ra, một mốc thời gian. Một đường dẫn phân giải được **không** phải bằng chứng.
