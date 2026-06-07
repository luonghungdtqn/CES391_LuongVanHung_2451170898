// ==========================================
// 1. pipe() — Nối chuỗi các hàm từ trái qua phải
// ==========================================
function pipe(...fns) {
    // Trả về một hàm nhận vào giá trị ban đầu (v)
    // Dùng reduce để truyền kết quả của hàm trước làm đầu vào cho hàm sau
    return (initialValue) => fns.reduce((acc, fn) => fn(acc), initialValue);
}

// Test pipe
const process = pipe(
    x => x * 2,        // 5 → 10
    x => x + 10,       // 10 → 20
    x => x.toString(), // 20 → "20"
    x => "Kết quả: " + x
);
console.log("=== TEST PIPE ===");
console.log(process(5)); // → "Kết quả: 20"


// ==========================================
// 2. memoize() — Lưu trữ (Cache) kết quả tính toán
// ==========================================
function memoize(fn) {
    // Tạo một vùng nhớ ẩn (cache) nhờ vào Closure
    const cache = {};
    
    return function(...args) {
        // Chuyển các tham số đầu vào thành một chuỗi key duy nhất (ví dụ: "[1000000]")
        const key = JSON.stringify(args);
        
        // Nếu key đã tồn tại trong cache, trả về kết quả luôn không cần tính lại
        if (key in cache) {
            return cache[key];
        }
        
        // Nếu chưa có, tính toán kết quả, lưu vào cache rồi trả về
        const result = fn(...args);
        cache[key] = result;
        return result;
    };
}

// Test memoize
const expensiveCalc = memoize((n) => {
    console.log("Đang tính...");
    let result = 0;
    for (let i = 0; i < n; i++) result += i;
    return result;
});

console.log("\n=== TEST MEMOIZE ===");
console.log(expensiveCalc(1000000)); // → In ra "Đang tính..." rồi in kết quả
console.log(expensiveCalc(1000000)); // → Lấy trực tiếp từ cache, KHÔNG in "Đang tính..."


// ==========================================
// 3. debounce() — Trì hoãn thực thi cho tới khi người dùng ngừng thao tác
// ==========================================
function debounce(fn, delay) {
    let timeoutId;
    
    return function(...args) {
        // Mỗi khi hàm được kích hoạt, xóa ngay cái hẹn giờ cũ trước đó
        clearTimeout(timeoutId);
        
        // Thiết lập một hẹn giờ mới
        timeoutId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

// Test debounce
const search = debounce((query) => {
    console.log("Searching:", query);
}, 500);

console.log("\n=== TEST DEBOUNCE ===");
search("iPh");
search("iPho");
search("iPhone 16"); 
// Chạy file này bằng Node.js, bạn sẽ chỉ thấy duy nhất dòng `Searching: iPhone 16` hiện lên sau 500ms.


// ==========================================
// 4. retry() — Tự động chạy lại hàm bất đồng bộ nếu xảy ra lỗi
// ==========================================
async function retry(fn, maxAttempts = 3) {
    let attempts = 0;
    
    while (attempts < maxAttempts) {
        try {
            attempts++;
            // Thử thực thi hàm (phải dùng await vì là hàm bất đồng bộ)
            return await fn();
        } catch (error) {
            console.log(`Thử lần ${attempts} thất bại...`);
            // Nếu đã chạm tới giới hạn số lần thử, ném lỗi ra ngoài
            if (attempts >= maxAttempts) {
                throw new Error(`Đã thử ${maxAttempts} lần nhưng vẫn lỗi: ${error.message}`);
            }
        }
    }
}

// Test retry
// Giả lập một hàm gọi API lúc được lúc lỗi
let count = 0;
const fetchUnstableData = async () => {
    count++;
    if (count < 3) {
        throw new Error("Lỗi kết nối Server!");
    }
    return "Dữ liệu e-commerce lấy thành công!";
};

console.log("\n=== TEST RETRY ===");
(async () => {
    try {
        const result = await retry(fetchUnstableData, 4);
        console.log("👉 Kết quả cuối cùng:", result);
    } catch (err) {
        console.error("👉 Thất bại hoàn toàn:", err.message);
    }
})();