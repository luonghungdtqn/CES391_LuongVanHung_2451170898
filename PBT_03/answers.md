Câu A1: Có 3 cách nhúng CSS vào HTML. 
1. Inline CSS: dùng trực tiếp trong thẻ HTML bằng thuộc tính style. 

Ví dụ: <p style="color:red;">Hello</p>. Ưu điểm: nhanh, dễ test. Nhược điểm: khó quản lý, không tái sử dụng. Dùng khi cần chỉnh nhanh 1 element riêng lẻ. 

2. Internal CSS: viết trong thẻ <style> bên trong file HTML. 

Ví dụ: <style> p{color:blue;} </style>. Ưu điểm: dễ quản lý hơn inline, không cần file ngoài. Nhược điểm: chỉ dùng cho 1 trang, file HTML dài. Dùng cho website nhỏ hoặc bài thực hành. 

3. External CSS: dùng file .css riêng. 

Ví dụ: <link rel="stylesheet" href="style.css"> và trong style.css có p{color:green;}. Ưu điểm: quản lý tốt, tái sử dụng nhiều trang, chuyên nghiệp. Nhược điểm: cần thêm file CSS. Dùng cho dự án thực tế. Nếu cả 3 cùng áp dụng thì Inline CSS thắng vì có độ ưu tiên cao nhất.

Câu A2:

1. h1 → chọn “ShopTLU”
2. .price → chọn “25.990.000đ” và “45.990.000đ”
3. #app header → chọn thẻ <header class="top-bar dark">
4. nav a:first-child → chọn “Home”
5. .product.featured h2 → chọn “MacBook Pro”
6. article > p → chọn “25.990.000đ”, “Mô tả sản phẩm...”, “45.990.000đ”, “Mô tả sản phẩm...”
7. a[href="/"] → chọn “Home”
8. .top-bar.dark h1 → chọn “ShopTLU”


Câu A3:

Trường hợp 1 (content-box):

width:400px, padding:20px, border:5px, margin:10px
→ Chiều rộng hiển thị = 400 + 20*2 + 5*2 = 450px
→ Không gian chiếm trên trang = 450 + 10*2 = 470px

Trường hợp 2 (border-box):

→ Chiều rộng hiển thị = 400px
→ Kích thước content thực tế = 400 - 20*2 - 5*2 = 350px
→ Không gian chiếm trên trang = 400 + 10*2 = 420px

Trường hợp 3 (Margin collapse):

.box-a { margin-bottom:25px; }
.box-b { margin-top:40px; }
→ Khoảng cách giữa 2 box = 40px
→ Không phải 65px vì margin dọc bị collapse, browser chỉ lấy margin lớn hơn.
Nếu .box-a có margin-bottom:-10px và .box-b có margin-top:40px thì khoảng cách = 30px.

Câu A4:

Rule A: p { color:black; } → specificity (0,0,1)
Rule B: .price { color:blue; } → specificity (0,1,0)
Rule C: #main-price { color:red; } → specificity (1,0,0)
Rule D: p.price { color:green; } → specificity (0,1,1)

Element sẽ có màu đỏ vì Rule C có specificity cao nhất. 
Nếu thêm inline style: <p class="price" id="main-price" style="color:orange;"> thì element có màu cam vì inline style ưu tiên cao hơn CSS thường. 
Nếu Rule A thêm !important thì element có màu đen vì !important ưu tiên cao hơn specificity thông thường.

Câu B2:

Hộp 1 (content-box): Chiều rộng thực tế = 350px

Tính toán: 300 (width) + 20 (padding-left) + 20 (padding-right) + 5 (border-left) + 5 (border-right) = 350px.

Hộp 2 (border-box): Chiều rộng thực tế = 300px

Tính toán: Tổng toàn bộ đã được gói gọn trong 300px. Phần nội dung thực tế (content) chỉ còn 250px.

Giải thích sự khác biệt:

Với content-box, kích thước bạn đặt cho width chỉ là phần lõi chứa nội dung, padding và border bị đẩy ra ngoài làm hộp to lên.

Với border-box, kích thước width là kích thước cuối cùng của hộp; trình duyệt tự động co phần content lại để "nhường chỗ" cho padding và border.

Câu B3:
Thứ tự  Selector                SpecificityScore    Màu sắc
1         p                       (0, 0, 1)           Gray

2       .text                      (0, 1, 0)           Silver

3     [id="demo"]                   (0, 1, 0)         Maroon

4       p.text                      (0, 1, 1)          Olive

5    .text.highlight                 (0, 2, 0)          Orange

6       #demo                        (1, 0, 0)          Blue

7       p#demo                        (1, 0, 1)         Green

8       #demo.text                    (1, 1, 0)       Purple

9   p#demo.highlight                  (1, 1, 1)         Red

10  body p#demo.text.highlight        (0, 1, 2, 2)        Navy

2. Kết quả hiển thịMàu sắc: Phần tử hiển thị màu Navy (xanh biển đậm).  Tại sao: Vì selector body p#demo.text.highlight có điểm số Specificity cao nhất (1 ID, 2 Classes, 2 Elements). Trong CSS, trình duyệt ưu tiên quy tắc có trọng số lớn nhất bất kể vị trí của nó trong file.

3. Thay đổi thứ tự RulesKết quả có đổi không?Không đổi: Đối với các rule có điểm Specificity khác nhau. Quy tắc cao điểm hơn vẫn luôn thắng.  Có đổi: Nếu hai rule có cùng điểm số (ví dụ rule số 2 và số 3). Khi đó, quy tắc nào được viết sau cùng trong file CSS sẽ được áp dụng (luật Cascade - ưu tiên từ trên xuống dưới).  