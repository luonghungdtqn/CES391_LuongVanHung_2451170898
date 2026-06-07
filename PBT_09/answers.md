# 📋 PHIẾU BÀI TẬP 09
## PHẦN A — KIỂM TRA ĐỌC HIỂU (15 điểm)
### Câu A1 (5đ) — DOM Tree
1. DOM tree
```
                        document
                            │
                          html
                            │
                          body
                            │
                      div#app
                     /        \
               header          main
              /      \        /     \
            h1       nav    form    ul#todoList
                    / | \    / \      /     \
                   a  a  a input button   li    li
```

2. querySelector

```javascript
// Chọn thẻ <h1>
document.querySelector("h1")

// Chọn input trong form
document.querySelector("#todoInput")

// Chọn tất cả .todo-item
document.querySelectorAll(".todo-item")

// Chọn link đang active
document.querySelector("a.active")

// Chọn <li> đầu tiên trong #todoList
document.querySelector("#todoList li:first-child")

// Chọn tất cả <a> bên trong <nav>
document.querySelectorAll("nav a")
```

### Câu A2 (5đ) — innerHTML vs textContent
| innerHTML | textContent |
|-----------|-------------|
| Trả về HTML bên trong (kể cả thẻ HTML) | Chỉ trả về text thuần |
| Parse HTML khi gán | Không parse HTML |
| Chậm hơn | Nhanh hơn |
| Có thể gây XSS | An toàn |

Khi nào dùng:

- innerHTML: Khi muốn thêm HTML vào trang (ví dụ: `div.innerHTML = "<b>Hello</b>"`)
- textContent: Khi chỉ muốn hiển thị text (ví dụ: `span.textContent = "Hello"`)

Câu hỏi bảo mật - XSS:

Tại sao innerHTML nguy hiểm?

Vì innerHTML sẽ parse và chạy code HTML/JS mà user nhập vào.

Ví dụ:
```javascript
// User nhập: <img src=x onerror="alert('Hacked!')">
const userInput = document.querySelector("#search").value;
document.querySelector("#result").innerHTML = userInput;  // Nguy hiểm!

// Cách sửa: Dùng textContent
document.querySelector("#result").textContent = userInput;  // An toàn!
```

### Câu A3 (5đ) — Event Bubbling
Khi click vào button:

Output:
```
BUTTON
INNER
OUTER
```

**Giải thích:** Event bubbling - sự kiện nổi bọt từ trong ra ngoài (button → inner → outer)

Nếu uncomment stopPropagation():

Output:
```
BUTTON
```

Giải thích: `stopPropagation()` ngăn event lan truyền lên parent, nên chỉ có BUTTON được log.
## PHẦN C — DEBUG & PHÂN TÍCH (15 điểm)
### Câu C1 (8đ) — Debug DOM Code
1. Lỗi 1: `addEventListener("onclick"` → sai syntax
```javascript
// SAI
document.querySelector("#decrementBtn").addEventListener("onclick", function() {

// ĐÚNG
document.querySelector("#decrementBtn").addEventListener("click", function() {
```

2. Lỗi 2: `countDisplay = count` → thiếu property
```javascript
// SAI
countDisplay = count;

// ĐÚNG
countDisplay.textContent = count;
```

3. Lỗi 3: `innerHTML = null` → nên dùng ""
```javascript
// SAI
historyList.innerHTML = null;

// ĐÚNG
historyList.innerHTML = "";
```

4. Lỗi 4: `item.remove` → thiếu ()
```javascript
// SAI
item.remove;

// ĐÚNG
item.remove();
```

5. Lỗi 5: localStorage trả về string, cần parse
```javascript
// SAI
count = localStorage.getItem("count");

// ĐÚNG
count = parseInt(localStorage.getItem("count")) || 0;
```

6. Lỗi 6: Decrement không thêm history
```javascript
// THIẾU - cần thêm code lưu history giống increment
```

7. Lỗi 7: Không kiểm tra null khi load
```javascript
// SAI
count = localStorage.getItem("count");

// ĐÚNG
const savedCount = localStorage.getItem("count");
if (savedCount !== null) {
    count = parseInt(savedCount);
}
```

### Câu C2 (7đ) — Performance
1. Tại sao bind event lên 1000 elements riêng lẻ là BAD PRACTICE?

- Tốn bộ nhớ: Mỗi element có 1 event listener riêng → 1000 listeners
- Chậm: Phải loop và bind từng cái một
- Dynamic elements: Elements tạo sau không có event

Event Delegation giải quyết:
- Chỉ bind 1 event lên parent
- Dùng `e.target` để biết click vào element nào
- Elements tạo sau vẫn hoạt động

2. Refactor dùng DocumentFragment:

```javascript
// Tạo fragment
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    fragment.appendChild(div);  // Thêm vào fragment (trong memory)
}

document.body.appendChild(fragment);  // Chỉ 1 lần append vào DOM
```

Tại sao nhanh hơn:
- DocumentFragment ở trong memory, không gây reflow
- Chỉ khi append fragment vào body mới gây 1 lần reflow
- 1 reflow thay vì 1000 reflow => nhanh hơn nhiều