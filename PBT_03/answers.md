PHẦN A — KIỂM TRA ĐỌC HIỂU

Câu A1 — 3 Cách nhúng CSS

1. Inline CSS — trong attribute style
<h1 style="color: #2563eb; font-size: 32px;">Tiêu đề</h1>

Nhược điểm: không tái sử dụng, khó maintain

2. Internal CSS — trong thẻ <style>
<head>
    <style>
        h1 { color: #2563eb; font-size: 32px; }
    </style>
</head>

Ưu điểm: Chấp nhận cho prototype hoặc trang đơn

3. External CSS — file riêng
<head>
    <link rel="stylesheet" href="styles.css">
</head>

/_ styles.css _/
h1 { color: #2563eb; font-size: 32px;

Ưu điểm: Chuẩn production — dùng cho mọi dự án thật

Câu A2 — CSS Selectors — Dự đoán kết quả

1. h1 → Chọn: ShopTLU
2. .price → Chọn: 25.990.000đ và 45.990.000đ
3. #app header → Chọn: chọn toàn bộ thẻ <header class="top-bar dark"> (chứa ShopTLU và nav)
4. nav a:first-child → Chọn: Home
5. .product.featured h2 → Chọn: Macbook Pro
6. article > p → Chọn: Mô tả sản phẩm... x2 và 25.990.000đ ,45.990.000đ
7. a[href="/"] → Chọn: Home
8. .top-bar.dark h1 → Chọn: ShopTLU

Câu A3 — Tính toán kích thước

/_ Trường hợp 1: content-box (mặc định) _/
.box-1 {
width: 400px;
padding: 20px;
border: 5px solid black;
margin: 10px;
}
→ Chiều rộng hiển thị = 450px
→ Không gian chiếm trên trang = 470px

/_ Trường hợp 2: border-box _/
.box-2 {
box-sizing: border-box;
width: 400px;
padding: 20px;
border: 5px solid black;
margin: 10px;
}
→ Chiều rộng hiển thị = 400px
→ Kích thước content thực tế = 350px
→ Không gian chiếm trên trang = 420px

/_ Trường hợp 3: Margin collapse _/
.box-a { margin-bottom: 25px; }
.box-b { margin-top: 40px; }
→ Khoảng cách giữa box-a và box-b = 40px
→ Giải thích tại sao KHÔNG PHẢI 65px: Hai margin gặp nhau theo chiều dọc không cộng lại — chúng collapse (sụp vào nhau), chỉ giữ giá trị lớn hơn.

Câu A4 — Specificity (Độ ưu tiên)

1. Tính specificity score (a, b, c) cho mỗi rule
   Rule A:(0,0,1)
   Rule B:(0,1,0)
   Rule C:(1,0,0)
   Rule D:(0,1,1)

2. Element sẽ có màu gì? Giải thích
   Màu đỏ vì Rule C thắng (có thứ tự ưu tiên cao nhất)

3. Nếu thêm <p class="price" id="main-price" style="color: orange;">, element có màu gì?
   element sẽ có màu cam vì Inline style có specificity mạnh hơn cả ID

4. Nếu Rule A thêm !important, element có màu gì? Tại sao?
   màu đen vì !important bỏ qua tất cả specificity

PHẦN B — THỰC HÀNH CODE

Câu B1 - Style trang Profile

5 loại selector sử dụng:

1. Element — body, header, table, footer
2. Class — .active
3. ID — #About, #Contact
4. Descendant — nav a, thead tr, tbody td
5. Pseudo-class — nav a:hover, tbody tr:nth-child(even), tbody tr:hover

Câu B2 - Box Model Lab

Hộp 1 (content-box): chiều rộng thực tế = 350 px (đo từ DevTools)
Hộp 2 (border-box): chiều rộng thực tế = 300 px (đo từ DevTools)

Giải thích sự khác biệt:

content-box (mặc định): width chỉ tính phần nội dung. Padding và border cộng thêm ra ngoài.
→ Thực tế = 300 (content) + 20×2 (padding) + 5×2 (border) = 350px
border-box: width bao gồm luôn padding và border bên trong.
→ Thực tế = 300px, content bị thu lại còn 250px để vừa.

Câu B3 - Specificity Battle

10 CSS rules

1. p -> Specificity: 0,0,1
2. .text -> Specificity: 0,1,0
3. .highlight -> Specificity: 0,1,0
4. p.text -> Specificity: 0,1,1
5. .text.highlight -> Specificity: 0,2,0
6. p.text.highlight -> Specificity: 0,2,1
7. #demo -> Specificity: 1,0,0
8. #demo.text -> Specificity: 1,1,0
9. p#demo.text.highlight -> Specificity: 1,2,1
10. p{important} -> Specificity: cao nhất

Màu hiển thị: gold — vì !important ghi đè tất cả specificity.
Đổi thứ tự rules: không ảnh hưởng khi specificity khác nhau.
Chỉ ảnh hưởng khi 2 rules có cùng specificity (rule đến sau thắng).

PHẦN C — DEBUG & SUY LUẬN

Câu C1 — Debug CSS Layout

1. Tính chiều rộng thực tế của sidebar và content (content-box!)
2. Giải thích tại sao layout bị vỡ
3. Đưa ra 2 cách sửa khác nhau (1 cách dùng border-box, 1 cách không dùng)
4. Tạo file debug_layout.html + debug_layout.css chứng minh cả 2 cách sửa hoạt động

Câu C2 - Cascade Puzzle

1. "Sản phẩm A" (h2) có `font-size` = ? và `color` = ?

.title được 20px từ .card .title selector → font-size = 20px
color = green:
.card { color: blue; } → h2 không kế thừa
#featured .title { color: red; } → Specificity 1,1,0 = 100
.highlight { color: green !important; } → Specificity 0,1,0 với !important nên color = green

2. "Mô tả sản phẩm" (p trong card featured) có `color` = ?

.card p { color: inherit; } → kế thừa từ .card
.card { color: blue; } không chỉ định cho p nhưng qua inherit
→ color = BLUE kế thừa từ .card do inherit

3. "Sản phẩm B" (h2) có `font-size` = ? và `color` = ?

→ font-size = 20px (từ .card .title)
color ANSWER:

.card { color: blue; } nhưng h2 không kế thừa color từ .card
body { color: #333; } → h2 kế thừa từ body
→ color = #333 (từ body)

4. "Mô tả sản phẩm B" (p.highlight) có `color` = ?

.highlight { color: green !important; } ← Specificity ∞
.card p { color: inherit; } ← Specificity 0,1,1
!important thắng
→ color = GREEN
