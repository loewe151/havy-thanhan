# Hướng dẫn: Website cưới Hà Vy & Thanh An

Website là một thư mục file tĩnh. **Không cần cài gì, không cần server.**

```
website/
├── index.html              ← trang chính (mở file này)
├── content.js              ← MỌI NỘI DUNG, chỉ cần sửa file này
├── styles.css, app.js      ← giao diện và logic (không cần sửa)
├── google-apps-script.gs   ← dán vào Google Apps Script (Bước 2)
└── *.jpg                   ← ảnh (t-*.jpg là ảnh nhỏ cho thư viện)
```

## Bước 1. Xem thử trên máy

Bấm đúp vào `index.html`. Trang mở bằng trình duyệt, cần có internet để tải font và bản đồ.

Lúc này form RSVP đang ở **chế độ demo**: dữ liệu chỉ lưu trong trình duyệt của người nhập, cô dâu chú rể sẽ **không nhận được**. Làm Bước 2 để nhận RSVP thật.

## Bước 2. Nhận RSVP và bài hát vào Google Sheet (khoảng 5 phút)

1. Vào [sheets.new](https://sheets.new), đặt tên bảng tính, ví dụ `RSVP Hà Vy & Thanh An`.
2. Menu **Tiện ích mở rộng → Apps Script**.
3. Xoá hết code mẫu, mở file `google-apps-script.gs`, sao chép toàn bộ và dán vào. Bấm **Lưu**.
4. Chọn hàm `setup` ở thanh trên, bấm **Chạy**. Cho phép quyền truy cập khi Google hỏi (Google có thể cảnh báo "chưa xác minh": chọn *Nâng cao → Tiếp tục*, vì đây là script của chính bạn). Hai tab `RSVP` và `Songs` sẽ xuất hiện trong bảng tính.
5. Bấm **Triển khai → Tùy chọn triển khai mới**:
   - Loại: **Ứng dụng web**
   - Thực thi dưới tư cách: **Tôi**
   - Ai có quyền truy cập: **Bất kỳ ai**
   - Bấm **Triển khai** và sao chép **URL ứng dụng web** (dạng `https://script.google.com/macros/s/.../exec`).
6. Mở `content.js`, dán URL vào dòng `endpoint: ""`:
   ```js
   endpoint: "https://script.google.com/macros/s/XXXX/exec",
   ```
7. **Thử ngay:** mở trang, gửi một RSVP thử và kiểm tra có dòng mới trong tab `RSVP`. Gửi lại cùng số điện thoại sẽ **cập nhật dòng cũ**, không tạo dòng mới. Xoá dòng thử trước khi gửi link cho khách.

> Nếu sau này sửa `google-apps-script.gs`, vào **Triển khai → Quản lý triển khai → Sửa → Phiên bản mới → Triển khai**. URL giữ nguyên.

## Bước 3. Điền thông tin còn thiếu trong `content.js`

Tìm các dòng có chữ `TODO`:

| Thông tin | Mục trong `content.js` |
|---|---|
| Hạn RSVP | `rsvp.deadline` (hiện là 07.10.2026; tài liệu gốc ghi 20.09 nhưng đã qua) |
| Tên và số điện thoại người hỗ trợ khách | `contact` |
| Giờ Lễ Gia Tiên | `events[0].start`, `end`, `schedule`, rồi đổi `confirmed: true` để bỏ nhãn "dự kiến" |
| Địa chỉ cụ thể ở Villa Park | `venues.villa.address` |
| Tên sảnh ở Park Hyatt | `venues.hyatt.address` |
| Ghi chú gửi xe | `venues.*.notes` |
| Câu trả lời cho các câu hỏi đang ẩn (gửi xe, trẻ em, món chay) | `faq`: điền `a` và đổi `show: true` |
| Quà mừng / QR | `gifts` (đổi `enabled: true`). Chỉ dùng QR xuất từ app ngân hàng. |

Lưu file rồi tải lại trang (F5) để thấy thay đổi. Mọi chữ có hai bản `{ vi: "...", en: "..." }`.


## Bước 4. Đăng lên mạng để gửi link cho khách

Cách dễ nhất: **Netlify Drop**.
1. Vào [app.netlify.com/drop](https://app.netlify.com/drop).
2. Kéo thả cả thư mục `website` vào. Bạn nhận ngay một link công khai. Có thể đổi tên link trong phần cài đặt site.
3. **Quan trọng:** mở `index.html`, tìm hai dòng `og:image` và thay `og-image.jpg` bằng link đầy đủ, ví dụ `https://ten-cua-ban.netlify.app/og-image.jpg`. Nếu không, khi dán link vào Zalo/Messenger sẽ không hiện ảnh xem trước. Đăng lại thư mục sau khi sửa.
4. Mỗi lần sửa nội dung, kéo thả lại thư mục (hoặc dùng *Deploys → kéo thả* trong site của bạn).

## Link cá nhân hoá cho từng khách

Thêm `?guest=Tên` vào cuối link, ví dụ `https://.../?guest=Anh%20Minh`. Trang sẽ chào "Thân gửi Anh Minh" và điền sẵn tên vào form. Thêm `&lang=en` để mở bằng tiếng Anh.

## Xem kết quả

Mở Google Sheet:
- Tab `RSVP`: mỗi khách một dòng (tham dự, sự kiện, số người, món ăn, dị ứng, lời nhắn). Dùng **Dữ liệu → Tạo bộ lọc** để lọc, và hàm `=SUMIF(G:G,"Có",I:I)` để cộng tổng số khách đến.
- Tab `Songs`: playlist. Có thể chia sẻ riêng cho DJ.

## Riêng tư

- Trang có thẻ `noindex` nên Google không liệt kê. Chỉ người có link mới vào được.
- Danh sách bài hát công khai chỉ hiện tên gọi của người gửi, không hiện họ tên hay số điện thoại.
- Số điện thoại chỉ nằm trong Google Sheet của bạn. Không chia sẻ Sheet này công khai.

## Nếu có sự cố

| Triệu chứng | Cách xử lý |
|---|---|
| Form báo "Chưa gửi được" | Kiểm tra lại URL `endpoint`; triển khai phải đặt "Bất kỳ ai" có quyền truy cập |
| Gửi xong nhưng không có dòng trong Sheet | Chạy lại `setup` và triển khai phiên bản mới (Bước 2, mục lưu ý) |
| Khách thấy "Đã lưu trên máy này và sẽ tự gửi" | Khách đang mất mạng; dữ liệu tự gửi khi có lại mạng và họ mở lại trang |
| Trang trắng khi mở `index.html` | Kiểm tra `content.js` có bị sửa thiếu dấu `,` hoặc `"` không |
