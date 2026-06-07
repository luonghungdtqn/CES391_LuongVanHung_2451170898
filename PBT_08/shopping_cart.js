function createCart() {
    // Private data - Không thể truy cập từ bên ngoài
    let items = [];
    let discountCode = "";

    return {
        // 1. Thêm sản phẩm (nếu đã có → tăng quantity)
        addItem(product, quantity = 1) {
            if (quantity <= 0) return;
            
            // Tìm xem sản phẩm đã tồn tại trong giỏ hàng chưa
            const existingItem = items.find(item => item.id === product.id);
            
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                // Sử dụng spread operator để copy thuộc tính và thêm trường quantity
                items.push({ ...product, quantity });
            }
        },

        // 2. Xóa sản phẩm theo id
        removeItem(productId) {
            items = items.filter(item => item.id !== productId);
        },

        // 3. Cập nhật số lượng
        updateQuantity(productId, newQuantity) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
                return;
            }
            const item = items.find(item => item.id === productId);
            if (item) {
                item.quantity = newQuantity;
            }
        },

        // 4. Tính tổng tiền (đã áp dụng coupon nếu có)
        getTotal() {
            // Tính tổng tiền gốc trước khi giảm giá
            const subTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            // Tính toán dựa trên mã giảm giá đã lưu
            switch (discountCode) {
                case "SALE10":
                    return subTotal * 0.9;
                case "SALE20":
                    return subTotal * 0.8;
                case "FREESHIP":
                    // Giảm 30.000đ, nếu tổng tiền nhỏ hơn 30k thì trả về 0 chứ không âm
                    return Math.max(0, subTotal - 30000);
                default:
                    return subTotal;
            }
        },

        // 5. Áp dụng mã giảm giá
        applyDiscount(code) {
            const validCodes = ["SALE10", "SALE20", "FREESHIP"];
            if (validCodes.includes(code)) {
                discountCode = code;
                console.log(`\n[Hệ thống] Áp dụng mã giảm giá "${code}" thành công!`);
            } else {
                console.log(`\n[Hệ thống] Mã giảm giá "${code}" không hợp lệ.`);
            }
        },

        // 6. Lấy tổng số sản phẩm (tổng các quantity)
        getItemCount() {
            return items.reduce((sum, item) => sum + item.quantity, 0);
        },

        // 7. Xóa toàn bộ giỏ hàng
        clearCart() {
            items = [];
            discountCode = "";
        },

        // 8. In giỏ hàng dạng bảng "xịn sò" bằng console.table
        printCart() {
            if (items.length === 0) {
                console.log("\nGiỏ hàng trống rỗng!");
                return;
            }

            // Tạo một mảng mới đã format dữ liệu đẹp mắt để hiển thị dạng bảng
            const tableData = items.map((item, index) => ({
                "STT": index + 1,
                "Sản phẩm": item.name,
                "SL": item.quantity,
                "Đơn giá": item.price.toLocaleString("vi-VN") + "đ",
                "Tổng dòng": (item.price * item.quantity).toLocaleString("vi-VN") + "đ"
            }));

            console.log("\n=== CHI TIẾT GIỎ HÀNG ===");
            console.table(tableData, ["STT", "Sản phẩm", "SL", "Đơn giá", "Tổng dòng"]);
            
            if (discountCode) {
                console.log(`Mã giảm giá đang dùng: ${discountCode}`);
            }
            console.log(`👉 TỔNG CỘNG THANH TOÁN: ${this.getTotal().toLocaleString("vi-VN")}đ`);
            console.log("-----------------------------------------");
        }
    };
}

// ==========================================
// THỰC HIỆN KỊCH BẢN TEST
// ==========================================

const cart = createCart();

// Thêm sản phẩm lần 1
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);

// Thêm trùng sản phẩm iPhone 16 để kiểm tra việc cộng dồn số lượng
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1); 

// In giỏ hàng lần đầu (chưa giảm giá)
cart.printCart();

// Áp mã giảm giá 10% và in lại giỏ hàng
cart.applyDiscount("SALE10");
cart.printCart();

// Kiểm tra hàm đếm tổng số lượng items (Kỳ vọng: 2 iPhone + 2 AirPods = 4)
console.log("Số SP trong giỏ hiện tại:", cart.getItemCount()); // → 4

// Thử xóa AirPods Pro (id: 3) khỏi giỏ hàng
cart.removeItem(3);
console.log("\n[Hệ thống] Đã xóa AirPods Pro.");

// Kiểm tra lại số lượng sau khi xóa (Kỳ vọng còn 2 iPhone)
console.log("Số SP sau khi xóa:", cart.getItemCount()); // → 2

// In lại cấu trúc giỏ hàng cuối cùng để kiểm định trực quan
cart.printCart();