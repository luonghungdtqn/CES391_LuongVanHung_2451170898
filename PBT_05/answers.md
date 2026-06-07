# 📋 PHIẾU BÀI TẬP 05
## PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)
### Câu A1 (5đ) — Viewport & Mobile-First
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

* `width=device-width` Chiều rộng trang bằng chiều rộng màn hình thiết bị.

* `initial-scale=1.0` Mức zoom ban đầu = 100%.

Nếu thiếu thẻ này iPhone sẽ giả lập trang như desktop (~980px),nội dung bị thu nhỏ,chữ nhỏ, phải zoom mới đọc được.
- Mobile-First
```css
.box{
    width: 100%;
}

@media (min-width:768px){
    .box{
        width: 50%;
    }
}
```
- Desktop-First
```css
.box{
    width: 50%;
}

@media (max-width:768px){
    .box{
        width: 100%;
    }
}
```
Mobile-First được khuyên dùng:

* Tối ưu cho điện thoại trước.
* Code gọn hơn.
* Hiệu năng tốt hơn trên mobile.
* Phù hợp xu hướng người dùng điện thoại hiện nay.
### Câu A2 (5đ) — Breakpoints

| Tên | Kích thước | Thiết bị | Ví dụ lưới sản phẩm |
|-----|-----------|---------|-------------------|
| **Extra Small (xs)** | `<576px` | Điện thoại nhỏ | 1 cột |
| **Small (sm)** | `≥576px` | Điện thoại lớn | 2 cột |
| **Medium (md)** | `≥768px` | Tablet | 2–3 cột |
| **Large (lg)** | `≥992px` | Laptop | 3–4 cột |
| **Extra Large (xl)** | `≥1200px` | Desktop lớn | 4–5 cột |
| **XXL** | `≥1400px` | Màn hình rất lớn | 5–6 cột |

### Câu A3 (5đ) — Media Queries

```css
.container { width: 100%; padding: 10px; }

@media (min-width: 576px) { .container { width: 540px; } }
@media (min-width: 768px) { .container { width: 720px; } }
@media (min-width: 992px) { .container { width: 960px; } }
@media (min-width: 1200px) { .container { width: 1140px; } }
```

| Chiều rộng màn hình | `.container` width |
|--------------------|-------------------|
| 375px (iPhone SE) | 100% |
| 600px | 540px |
| 800px | 720px |
| 1000px | 960px |
| 1400px | 1140px |

### Câu A4 (5đ) — SCSS Basics

#### 4 Tính năng chính:

**1. Variables**
```scss
$primary-color: #7c3aed;
$space-4: 16px;

.btn { background: $primary-color; padding: $space-4; }
```
→ Sửa 1 biến tự động cập nhật tất cả nơi dùng.

**2. Nesting**
```scss
.navbar {
    background: #1a202c;
    
    &__logo { color: white; }
    &__link { color: rgba(white, 0.8); 
        &:hover { color: white; }
    }
}
```
→ CSS lồng theo cấu trúc HTML → code sạch hơn.

**3. Mixins**
```scss
@mixin flex-center {
    display: flex; justify-content: center; align-items: center;
}

@mixin respond-to($bp) {
    @if $bp == tablet { @media (min-width: 768px) { @content; } }
}

.modal { @include flex-center; }
.grid { @include respond-to(tablet) { grid-template-columns: 2fr; } }
```
→ Hàm CSS tái sử dụng cho logic & responsive.

**4. @extend**
```scss
.btn { padding: 10px; border: none; cursor: pointer; }
.btn-primary { @extend .btn; background: $primary-color; }
```
→ Kế thừa style từ class khác → DRY (Don't Repeat Yourself).

#### Tại sao browser KHÔNG đọc .scss?
- SCSS có logic (`@if`, `@else`, biến) → browser không hiểu
- Browser chỉ đọc CSS tĩnh

#### Cách compile SCSS → CSS:
- **VS Code**: Cài "Live Sass Compiler" → Click "Watch Sass"
- **CLI**: `sass --watch scss:css`
- **Auto**: Webpack/Vite tự compile khi build

## PHẦN C — PHÂN TÍCH (20 điểm)

### Câu C1 (10đ) — Phân tích trang web thực
**Trang web được chọn:** YouTube

**2. Phân tích chi tiết:**

- **Navigation thay đổi thế nào?**
  - Mobile: Hamburger ☰ ở góc trái top, click mở sidebar
  - Tablet: Vẫn hamburger ☰, sidebar ẩn nhưng click để mở
  - Desktop: Sidebar mở rộng sẵn ≥240px, menu đầy đủ với icons

- **Lưới content thay đổi mấy cột?**
  - Mobile: 1 cột (video xếp dọc toàn chiều rộng)
  - Tablet: 2 cột (video tiêu chuẩn + suggestions rút gọn)
  - Desktop: 4 cột (lưới sản phẩm đầy đủ) + suggestions sidebar bên phải

- **Elements nào bị ẩn trên mobile?**
  - Sidebar trái (Menu chính)
  - Comments phía bên phải
  - Suggestions videos
  - Thông tin chi tiết video (thumbnails to)
  - Search bar che khuất

- **Font size có thay đổi không?**
  - Mobile: 14px (chữ nhỏ để vừa màn hình)
  - Tablet: 16px (bình thường)
  - Desktop: 18px+ (lớn hơn, dễ đọc)

### Câu C2 (10đ) — Thiết kế Responsive Strategy

**Trang: Đặt bàn nhà hàng**

#### **1. Wireframe (Sơ đồ bố cục)**

**Mobile (375px) — Xếp dọc:**
```
┌────────────────────┐
│     HEADER         │
├────────────────────┤
│  HERO IMAGE        │
├────────────────────┤
│  Grid ảnh (1 cột)  │
│  [Ảnh 1]           │
│  [Ảnh 2]           │
│  ...               │
├────────────────────┤
│   FORM ĐẶT BÀN     │
├────────────────────┤
│   MAPS             │
├────────────────────┤
│    FOOTER          │
└────────────────────┘
```
- **Những gì bị ẩn?** Không ẩn gì (all xếp dọc)
- **Form nằm đâu?** Dưới grid ảnh, trên maps

---

**Tablet (768px):**
```
┌─────────────────────────────┐
│        HEADER               │
├─────────────────────────────┤
│     HERO IMAGE              │
├──────────┬──────────────────┤
│  FORM    │ Grid (2 cột)     │
│  ĐẶT BÀN │ [1] [2]          │
│          │ [3] [4]          │
│          │ [5] [6]          │
├──────────┴──────────────────┤
│        MAPS                 │
├─────────────────────────────┤
│       FOOTER                │
└─────────────────────────────┘
```
- **Grid ảnh mấy cột?** 2 cột
- **Bản đồ nằm đâu?** Dưới form + grid, trên footer

---

**Desktop (1440px):**
```
┌────────────────────────────────────────┐
│            HEADER                      │
├────────────────────────────────────────┤
│         HERO IMAGE                     │
├─────────┬────────────────────┬────────┤
│  FORM   │ Grid (3 cột)       │SIDEBAR │
│ ĐẶT BÀN │ [1][2][3]          │Giờ mở  │
│         │ [4][5][6]          │Địa chỉ │
├─────────┴────────────────────┴────────┤
│          MAPS                          │
├────────────────────────────────────────┤
│         FOOTER                         │
└────────────────────────────────────────┘
```
- **Layout bao nhiêu cột?** 3 cột (Form + Grid + Sidebar)
- **Sidebar có không?** Có (bên phải, chứa giờ mở + địa chỉ)

---

#### **2. CSS Skeleton (Mobile-First)**

```css
body { font-size: 14px; }

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
}

.hero-image {
    width: 100%;
    height: 250px;
    background: url(...) center/cover;
}

.food-grid {
    display: grid;
    grid-template-columns: 1fr;  
    gap: 16px;
    padding: 32px 16px;
}

.form-book {
    padding: 32px 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.form-book input, .form-book textarea {
    width: 100%;
    padding: 12px;
}

.map-container {
    width: 100%;
    height: 300px;
}

/* ===== TABLET (768px+) ===== */
@media (min-width: 768px) {
    body { font-size: 16px; }

    .main-content {
        display: grid;
        grid-template-columns: 250px 1fr;  
        gap: 32px;
        padding: 32px;
    }

    .food-grid {
        grid-template-columns: repeat(2, 1fr); 
    }

    .form-book {
        position: sticky;
        top: 20px;
    }
}

/* ===== DESKTOP (1024px+) ===== */
@media (min-width: 1024px) {
    body { font-size: 18px; }

    .main-content {
        display: grid;
        grid-template-columns: 250px 1fr 280px;  
        gap: 32px;
        padding: 40px;
    }

    .food-grid {
        grid-template-columns: repeat(3, 1fr);  
    }

    .sidebar {
        background: #f5f5f5;
        padding: 20px;
        border-radius: 8px;
    }
}
```
### Bài B3 (20đ) — SCSS Refactor
# Lệnh biên dịch SCSS sang CSS (Compile)

Để biên dịch cấu trúc thư mục SCSS thành file `responsive.css`, sử dụng lệnh sau trong Terminal tại thư mục `PBT_05`:

```bash
sass scss/style.scss responsive.css

