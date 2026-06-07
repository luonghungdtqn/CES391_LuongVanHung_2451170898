### PHẦN A — ĐỌC HIỂU (20 điểm)
#### Câu A1 (10đ) — Grid System
| Kích thước | < 768px | 768px - 991px | ≥ 992px |
|------------|---------|---------------|---------|
| Số cột | 1 cột | 2 cột | 4 cột |
| Box layout | Mỗi box chiếm 12/12, xếp dọc | Mỗi box chiếm 6/12, 2 box / hàng| Mỗi box chiếm 3/12, 4 box / hàng |

- Vẽ layout
< 768px:
[ Box 1 ]
[ Box 2 ]
[ Box 3 ]
[ Box 4 ]

768px - 991px:
[ Box 1 ][ Box 2 ]
[ Box 3 ][ Box 4 ]

≥ 992px:
[ Box 1 ][ Box 2 ][ Box 3 ][ Box 4 ]

**Câu hỏi thêm:**
 -  `col-md-6` nghĩa là từ kích thước md (768px) trở lên, mỗi cột sẽ chiếm 6/12 cột của hàng, tương đương 50% chiều rộng.
- Không cần viết `col-sm-12` vì đã có `col-12`. Class `col-12` áp dụng cho mọi kích thước nhỏ hơn md, nên trên mobile mỗi box tự động chiếm toàn bộ chiều ngang.

### Câu A2 - Utilities & Components

#### 1. Class `d-none d-md-block`

- `d-none`: ẩn phần tử (display: none).
- `d-md-block`: từ màn hình md (768px) trở lên sẽ hiển thị dạng block.

=> Kết quả:
- Dưới 768px: phần tử bị ẩn.
- Từ 768px trở lên: phần tử được hiển thị.

---

#### 2. Một số spacing utilities

- `mt-3`: margin-top = 1rem (16px).
- `mb-4`: margin-bottom = 1.5rem (24px).
- `ms-2`: margin-left = 0.5rem (8px).
- `px-4`: padding trái và phải = 1.5rem (24px).
- `mb-auto`: margin-bottom tự động (auto).

Ngoài ra còn có:
- `p-3`: padding tất cả các phía.
- `py-2`: padding trên và dưới.
- `mx-auto`: căn giữa phần tử theo chiều ngang.

---

#### 3. Phân biệt `.container`, `.container-fluid`, `.container-md`

- `.container`
  - Có max-width theo từng breakpoint.
  - Nội dung được căn giữa màn hình.
  - Thường dùng nhất.

- `.container-fluid`
  - Luôn chiếm 100% chiều rộng màn hình.
  - Thường dùng cho banner, hero section, footer.

- `.container-md`
  - Dưới 768px: full width.
  - Từ 768px trở lên: hoạt động giống `.container`, có max-width theo breakpoint.

### PHẦN C — PHÂN TÍCH (20 điểm)

#### Câu C1 (10đ) — Tùy biến Bootstrap
#### 1. Đổi màu `$primary` sang `#E63946`

Để đổi màu mặc định của Bootstrap, cần sử dụng SASS và Bootstrap source code.

Các bước thực hiện:
   * Cài đặt Bootstrap và Sass bằng npm:
```bash
npm install bootstrap
npm install sass
```

  * Tạo file `custom.scss`.

  * Trong file `custom.scss`, ghi đè biến `$primary` trước khi import Bootstrap:

```scss
$primary: #E63946;

@import "bootstrap/scss/bootstrap";
```

  * Build file SCSS thành CSS:

```bash
sass custom.scss style.css
```

  * Sau đó liên kết file `style.css` vào trang HTML.

Kết quả: tất cả các thành phần dùng màu primary như button, alert, badge, link,... sẽ tự động đổi sang màu `#E63946`.

---

#### 2. Tại sao không nên override trực tiếp `.btn-primary`?

Không nên viết:

```css
.btn-primary{
    background:red;
}
```

vì cách này chỉ thay đổi riêng button có class `.btn-primary`, còn các thành phần khác như `alert-primary`, `text-primary`, `bg-primary`, `badge-primary` vẫn giữ màu cũ.

Khi sử dụng SASS variables:

```scss
$primary: #E63946;
```

Bootstrap sẽ tự động cập nhật toàn bộ các component liên quan đến màu primary. Cách này giúp code dễ quản lý, đồng bộ giao diện và thuận tiện khi bảo trì hoặc thay đổi màu sắc sau này.
### Câu C2 - So sánh CSS thuần và Bootstrap

#### 1. Viết CSS thuần cho navbar responsive và product card

Ví dụ CSS thuần:

```css
/* Navbar */
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #212529;
    padding: 15px 40px;
}

.logo {
    color: white;
    font-size: 22px;
    font-weight: bold;
}

.menu {
    display: flex;
    gap: 20px;
}

.menu a {
    color: white;
    text-decoration: none;
}

.search-box input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

/* Product card */
.product-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.product-card img {
    width: 100%;
    height: 220px;
    object-fit: cover;
}

.product-card .content {
    padding: 16px;
}

.product-card h3 {
    font-size: 20px;
    margin-bottom: 8px;
}

.product-card p {
    color: #666;
}

.product-card button {
    width: 100%;
    padding: 10px;
    background: #0d6efd;
    color: white;
    border: none;
    border-radius: 4px;
}

/* Responsive */
@media (max-width: 768px) {
    .navbar {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
    }

    .menu {
        flex-direction: column;
        width: 100%;
    }

    .search-box {
        width: 100%;
    }

    .search-box input {
        width: 100%;
    }
}
```

#### 2. So sánh với Bootstrap

| Tiêu chí             | CSS thuần                                                         | Bootstrap                                                         |
| -------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- |
| Số dòng CSS          | Cần khoảng 50 - 80 dòng CSS cho navbar và card cơ bản             | Hầu như không cần viết CSS riêng, chủ yếu dùng class có sẵn       |
| Thời gian phát triển | Mất nhiều thời gian hơn vì phải tự viết layout, responsive, hover | Nhanh hơn vì Bootstrap có sẵn navbar, grid, card, button          |
| Khả năng tùy biến    | Tùy biến rất cao, muốn sửa gì cũng được                           | Tùy biến được nhưng nếu sửa nhiều sẽ phải dùng SASS hoặc override |
| Responsive           | Phải tự viết media query                                          | Có sẵn hệ thống breakpoint và grid                                |
| Độ đồng bộ giao diện | Phụ thuộc vào người viết CSS                                      | Giao diện đồng bộ hơn do dùng chung hệ thống component            |

#### 3. Khi nào nên dùng Bootstrap?

Nên dùng Bootstrap khi:

* Cần làm giao diện nhanh.
* Làm dashboard, admin panel, landing page, form, table.
* Dự án không yêu cầu thiết kế quá đặc biệt.
* Làm bài tập, prototype hoặc sản phẩm cần hoàn thành trong thời gian ngắn.
* Team muốn dùng component có sẵn để code thống nhất hơn.

#### 4. Khi nào không nên dùng Bootstrap?

Không nên dùng Bootstrap khi:

* Website cần giao diện quá riêng, khác biệt hoàn toàn.
* Muốn kiểm soát từng chi tiết nhỏ của CSS.
* Dự án yêu cầu tối ưu dung lượng CSS rất cao.
* Nếu dùng Bootstrap mà phải override quá nhiều thì nên cân nhắc CSS thuần hoặc TailwindCSS.

#### Kết luận
   CSS thuần giúp mình hiểu rõ bản chất và tùy biến tốt hơn, nhưng viết lâu hơn. Bootstrap giúp làm giao diện nhanh, responsive sẵn và có nhiều component có thể dùng ngay. Vì vậy, nếu làm trang quản trị, landing page hoặc bài tập cần hoàn thành nhanh thì Bootstrap là lựa chọn phù hợp.
