# 📋 PHIẾU BÀI TẬP 04
## PHẦN A — KIỂM TRA ĐỌC HIỂU 
### Câu A1:
| Position | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí | Cuộn theo trang? | Use case |
|----------|---------------------------|-------------------|------------------|----------|
| `static` | ✅  | không dùng(mặc định)| ✅ | Mặc định |
| `relative` | ✅ | Vị trí gốc của chính nó | ✅ | Làm điểm tựa cho con absolute, dịch chuyển  |
| `absolute` | ❌  | Cha relative gần nhất | ✅ | Badge, dropdown, tooltip, overlay |
| `fixed` | ❌ | Viewport | Không | Chat button, cookie banner, header cố định |
| `sticky` | ✅→❌ | Viewport (khi dính) | Có, dính khi scroll đến | Sticky header, sidebar |

- absolute tham chiếu body Khi không có cha nào có position khác static. Lúc đó element bay ra khỏi flow và căn dưới body.
- absolute tham chiếu parent? Khi parent (hoặc tổ tiên gần nhất) có position: relative; (hoặc absolute/fixed/sticky). Gọi là "nearest positioned ancestor".
- "Nearest positioned ancestor" là tổ tiên gần nhất có `position` không phải là static. Nó trở thành mốc tọa độ cho element con có `position: absolute`.

## Câu A2:
1. Trường hợp 1:
- 4 items → Bố cục: 4 cột đều nhau cùng hàng.
```
[  Item 1  ][  Item 2  ][  Item 3  ][  Item 4  ]
```
2. Trường hợp 2:
- 6 items →Bố cục: 3 hàng, 2 cột. mỗi hàng có 2 item và 50% mỗi item.
```
[  Item 1  ][  Item 2  ]
[  Item 3  ][  Item 4  ]
[  Item 5  ][  Item 6  ]
```
3. Trường hợp 3:
- 3 items →Bố cục: item 1 sát trái, item 2 ở giữa, item 3 sát phải
```
[  Item 1  ]       [  Item 2  ]       [  Item 3  ]
```
4. Trường hợp 4:
- 3 items →Bố cục: 3 cột trên 1 hàng. Cột 1 = 200px cố định, Cột 2 = linh hoạt (chiếm phần còn lại), Cột 3 = 200px cố định, giữa các item có gap 20px.
```
[200px]   [    1fr (co giãn)    ]   [200px]
```
5. Trường hợp 5:
- Bố cục: 3 hàng, hàng 1 hàng 2 đầy 3 item, hàng 3 chỉ có 1 item và 2 ô còn lại trống,các item có gap 10px,item cuối ở hàng 3 cột 1.
```
[ Item 1 ]  [ Item 2 ]  [ Item 3 ]
[ Item 4 ]  [ Item 5 ]  [ Item 6 ]
[ Item 7 ]  [        ]  [        ]
```
# Phần C - SUY LUẬN
## Câu C1:
1.Navigation bar ngang: Flexbox

Lý do:
- Thanh điều hướng là layout một chiều (theo hàng ngang). Các phần tử thường cần:
    - căn giữa theo chiều dọc,
    - phân bố đều theo chiều ngang,
    - số lượng item cố định.
- Flexbox phù hợp vì nó được thiết kế để xử lý layout một chiều rất linh hoạt.

2.Lưới ảnh kiểu Instagram (3 cột): Grid

Lý do:
- Đây là layout hai chiều (hàng và cột).
- Số lượng ảnh có thể thay đổi nhưng số cột thường cố định.
- CSS Grid phù hợp hơn vì cho phép kiểm soát hàng và cột trực tiếp.

3.Layout blog: Header + Main + Sidebar + Footer: Grid

Lý do:
- Đây là một layout tổng thể gồm nhiều vùng: header, sidebar, nội dung chính, footer.
- Layout này mang tính hai chiều nên Grid thường trực quan và dễ quản lý hơn Flexbox.

4.Footer gồm 4 cột: Flexbox hoặc Grid

Cả hai đều phù hợp trong trường hợp này.

- Dùng Flexbox
Phù hợp khi:
    - chỉ cần các cột nằm ngang đơn giản,
    - nội dung không quá phức tạp.

- Dùng Grid
Phù hợp khi:
    - muốn kiểm soát kích thước cột rõ ràng,
    - cần layout đồng đều hơn.

5.Card sản phẩm (ảnh + mô tả + nút nằm đáy): Flexbox

Lý do:
- Card sản phẩm thường sắp xếp nội dung theo chiều dọc: ảnh, tiêu đề, mô tả, nút bấm.
- Đây là layout một chiều nên Flexbox rất phù hợp.
- Ngoài ra, Flexbox hỗ trợ đẩy nút xuống đáy bằng margin-top: auto.
## Câu C2:
Lỗi 1: Cards không đều chiều cao — nút "Mua" bị nhảy lên/xuống
Nguyên nhân:
- `.card-container` dùng `flex-wrap: wrap` nhưng không có `align-items: stretch` hoặc `height` cố định
- Mỗi card có chiều cao khác nhau tùy content nên nút bị nhảy
Sửa:
```css
.card-container {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
}

.card {
    width: 30%;
    margin: 1.5%;
    display: flex;
    flex-direction: column;
}

.card .btn {
    margin-top: auto;
}
```

Lỗi 2: Items không nằm giữa trong container 100vh
Nguyên nhân:
- `.hero` dùng `display: flex` nhưng thiếu `justify-content: center` và `align-items: center`
- `.hero-content` chỉ dùng `text-align: center` chỉ căn ngang chữ, không căn container
Sửa:
```css
.hero {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
```

Lỗi 3: Sidebar bị co lại khi content quá dài
Nguyên nhân:
- `.sidebar` dùng `width: 250px` nhưng không có `flex-shrink: 0`
- Khi `.content` quá dài, flexbox co sidebar lại để lượt cho content
Sửa:
```css
.layout {
    display: flex;
    gap: 20px;
}

.sidebar {
    width: 250px;
    flex-shrink: 0;
    background: #f0f0f0;
    height: fit-content;
}

.content {
    flex: 1;
    min-width: 0;
}
```


