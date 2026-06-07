Câu A1

1. Đoạn 1:

console.log(x); // undefined
var x = 5;

- Giải thích: var bị\*hoisting — JavaScript tự động "kéo" khai báo lên đầu scope. Thực chất JS đọc như:
  var x; // khai báo được kéo lên, giá trị = undefined
  console.log(x); // undefined (khai báo rồi nhưng chưa gán = 5)
  x = 5;

2. Đoạn 2:
   console.log(y); // ReferenceError: Cannot access 'y' before initialization
   let y = 10;

- Giải thích: let cũng bị hoisting NHƯNG không được khởi tạo — nằm trong Temporal Dead Zone (TDZ) từ đầu block đến dòng khai báo. Truy cập trong TDZ → ReferenceError.

3. Đoạn 3:
   const z = 15;
   z = 20; // TypeError: Assignment to constant variable.
   console.log(z); // Dòng này KHÔNG chạy vì dòng trên đã throw error

- Giải thích: const không cho phép gán lại giá trị sau khi đã khai báo.

4. Đoạn 4:

const arr = [1, 2, 3];
arr.push(4);
console.log(arr);

- Giải thích:const chỉ ngăn reassign (gán lại biến), KHÔNG ngăn mutate (thay đổi nội dung). arr vẫn trỏ vào cùng 1 array trong bộ nhớ, chỉ là array đó được thêm phần tử. Nếu viết arr = [1,2,3,4] thì mới lỗi.

5. Đoạn 5:

let a = 1;
{
let a = 2;
console.log("Trong block:", a);
}
console.log("Ngoài block:", a);

- Giải thích: let có block scope. let a = 2 bên trong {} là biến KHÁC hoàn toàn với let a = 1 bên ngoài. Hai biến cùng tên nhưng sống ở phạm vi khác nhau.

Câu A2

| Expression         | Kết quả             | Giải thích                                                                                        |
| :----------------- | :------------------ | :------------------------------------------------------------------------------------------------ |
| `typeof null`      | `"object"`          | Bug lịch sử từ JS 1995, null KHÔNG phải object nhưng typeof trả "object"                          |
| `typeof undefined` | `"undefined"`       | Bình thường                                                                                       |
| `typeof NaN`       | `"number"`          | NaN = "Not a Number" nhưng type là number — nghe buồn cười nhưng đúng!                            |
| `"5" + 3`          | `"53"`              | Có string → `+` là nối chuỗi, 3 chuyển thành "3"                                                  |
| `"5" - 3`          | `2`                 | Không có cách nào "nối" với `-`, JS convert "5" → 5, tính bình thường                             |
| `"5" * "3"`        | `15`                | `*` luôn numeric, cả hai string convert sang number                                               |
| `true + true`      | `2`                 | `true` = 1 trong số học, 1 + 1 = 2                                                                |
| `[] + []`          | `""`                | Cả hai array convert sang string = "", "" + "" = ""                                               |
| `[] + {}`          | `"[object Object]"` | `[]` → "", `{}` → "[object Object]", nối lại                                                      |
| `{} + []`          | `0`                 | Khi `{}` đứng đầu dòng, JS đọc là **empty block** (không phải object!), còn lại `+[]` = `+""` = 0 |

- Toán tử + có 2 nhiệm vụ: cộng số và nối chuỗi. Khi gặp string, nó ưu tiên nối chuỗi → 3 bị chuyển thành "3" → "5" + "3" = "53".

- Toán tử - chỉ có 1 nhiệm vụ: trừ số. Không biết nối chuỗi → JS bắt buộc convert "5" thành 5 → 5 - 3 = 2.

Câu A3

| Expression           | Kết quả | Ghi chú                                     |
| :------------------- | :------ | :------------------------------------------ |
| `5 == "5"`           | `true`  | `==` tự convert type, `"5"` → 5             |
| `5 === "5"`          | `false` | `===` không convert, khác type → false      |
| `null == undefined`  | `true`  | Đặc biệt: null và undefined `==` nhau       |
| `null === undefined` | `false` | Khác type (null vs undefined)               |
| `NaN == NaN`         | `false` | NaN không bằng chính nó — quy tắc đặc biệt! |
| `0 == false`         | `true`  | false → 0, 0 `==` 0                         |
| `0 === false`        | `false` | Khác type (number vs boolean)               |
| `"" == false`        | `true`  | `""` → 0, false → 0, 0 `==` 0               |

Nên dùng === (strict equality) vì:

- == tự ý convert type → kết quả bất ngờ, khó debug
- === kiểm tra CẢ giá trị lẫn type → rõ ràng, an toàn
- Trong code review, dùng == thường bị reject ngay

Câu A4

- 6 giá trị FALSY trong JavaScript:

false, 0, "", null, undefined, NaN

(Ngoài 6 cái này, TẤT CẢ còn lại đều truthy — kể cả "0", [], {}, -1)

| Biểu thức   | Truthy/Falsy                               | In ra không? |
| :---------- | :----------------------------------------- | :----------- |
| `if ("0")`  | Truthy — string không rỗng dù là "0"       | In "A"       |
| `if ("")`   | Falsy — string rỗng                        | Không in "B" |
| `if ([])`   | Truthy — array rỗng VẪN truthy!            | In "C"       |
| `if ({})`   | Truthy — object rỗng VẪN truthy!           | In "D"       |
| `if (null)` | Falsy                                      | Không in "E" |
| `if (0)`    | Falsy                                      | Không in "F" |
| `if (-1)`   | Truthy — số âm vẫn truthy (chỉ 0 là falsy) | In "G"       |
| `if (" ")`  | Truthy — space không phải empty string     | In "H"       |

Câu A5

// Cách 1:
const greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;

// Cách 2:
const url = `https://api.example.com/users/${userId}/orders?page=${page}`;

// Cách 3 — template literal giúp tránh hoàn toàn escape quote:
const html = `<div class="card">
<h2>${title}</h2>
    <p>${description}</p>
<span>Giá: ${price}đ</span>

</div>`;

- Lợi ích template literal vs nối chuỗi:
- Không cần escape dấu " trong HTML
- Đọc code dễ hơn nhiều, thấy ngay ${variable} nằm chỗ nào
- Hỗ trợ multiline string không cần \n
- Có thể đặt expression bên trong: ${price \* 1.1}, ${arr.length}

Câu C1

// CODE GỐC (có lỗi)
function tinhGiaGiamGia(giaBan, phanTramGiam) {
if (phanTramGiam < 0 || phanTramGiam > 100) {
return "Phần trăm giảm không hợp lệ"
}

    var giamGia = giaBan * phanTramGiam / 100        // LỖI 1, 2
    let giaSauGiam = giaBan - giamGia

    if (giaSauGiam = 0) {                             // LỖI 3
        console.log("Sản phẩm miễn phí!")
    }

    return giaSauGiam

}

const gia = tinhGiaGiamGia("100000", 20) // LỖI 4
console.log("Giá sau giảm: " + gia + "đ")

const gia2 = tinhGiaGiamGia(50000, 110)
console.log("Giá: " + gia2)

for (var i = 0; i < 5; i++) { // LỖI 5 (ẩn!)
setTimeout(function() {
console.log("Item " + i) // LỖI 6
}, 1000)
}

LỖI 1 — Dùng var thay vì const/let:

var giamGia = giaBan _ phanTramGiam / 100;
// Sửa thành:
const giamGia = giaBan _ phanTramGiam / 100;
var có function scope và hoisting → dễ gây bug. Luôn dùng const/let.

LỖI 2 — Không validate input là số:

// giaBan = "100000" (string) — hàm không kiểm tra
// Sửa: thêm validation ở đầu hàm
if (isNaN(giaBan) || isNaN(phanTramGiam)) {
return "Lỗi: Input phải là số";
}
LỖI 3 — Assignment thay vì so sánh (nghiêm trọng nhất):

if (giaSauGiam = 0) { // GÁN giaSauGiam = 0, luôn falsy → không bao giờ vào if
// Sửa thành:
if (giaSauGiam === 0) { // SO SÁNH

Đây là lỗi rất nguy hiểm vì JS không báo lỗi, chỉ âm thầm chạy sai.

LỖI 4 — Không convert string sang number:

tinhGiaGiamGia("100000", 20)
// "100000" \* 20 = 2000000 (type coercion tự làm), nhưng giaBan - giamGia:
// "100000" - 20000 = 80000 (JS convert, may mắn vẫn đúng vì dùng -)
// Tuy nhiên đây là BAD PRACTICE và thiếu validation
// Nên gọi: tinhGiaGiamGia(100000, 20) hoặc tinhGiaGiamGia(Number("100000"), 20)

LỖI 5+6 — var i trong vòng lặp với setTimeout (LỖI ẨN):

// Code gốc:
for (var i = 0; i < 5; i++) {
setTimeout(function() {
console.log("Item " + i) // In ra "Item 5" năm lần!
}, 1000)
}
var i có function scope (không phải block scope). Khi setTimeout chạy sau 1 giây, vòng lặp đã chạy xong, i = 5. Tất cả 5 callback cùng tham chiếu đến biến i đó → in ra "Item 5" × 5 lần.
// Sửa bằng let:
for (let i = 0; i < 5; i++) {
setTimeout(function() {
console.log("Item " + i) // In ra Item 0, 1, 2, 3, 4
}, 1000)
}

let có block scope → mỗi vòng lặp tạo ra một biến i riêng → closure capture đúng giá trị.
