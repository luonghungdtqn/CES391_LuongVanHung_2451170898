const order = [
  { name: "Phở bò", price: 65000, qty: 2 },
  { name: "Trà đá", price: 5000, qty: 3 },
  { name: "Bún chả", price: 55000, qty: 1 },
];

let total = 0;

for (let i = 0; i < order.length; i++) {
  total += order[i].price * order[i].qty;
}

let discount = 0;

if (total > 1000000) {
  discount = 15;
} else if (total > 500000) {
  discount = 10;
}

let today = new Date().getDay();

if (today === 3) {
  discount += 5;
}

let discountMoney = (total * discount) / 100;

let afterDiscount = total - discountMoney;

let vat = afterDiscount * 0.08;

let hasTip = true;

let tip = 0;

if (hasTip) {
  tip = afterDiscount * 0.05;
}

let finalTotal = afterDiscount + vat + tip;

console.log("╔══════════════════════════════════════╗");
console.log("║          HÓA ĐƠN NHÀ HÀNG           ║");
console.log("╠══════════════════════════════════════╣");

for (let i = 0; i < order.length; i++) {
  let item = order[i];
  let itemTotal = item.price * item.qty;

  console.log(
    "║ " +
      (i + 1) +
      ". " +
      item.name +
      " x" +
      item.qty +
      " = " +
      itemTotal.toLocaleString("vi-VN") +
      "đ",
  );
}

console.log("╠══════════════════════════════════════╣");

console.log("║ Tổng cộng: " + total.toLocaleString("vi-VN") + "đ");

console.log(
  "║ Giảm giá (" +
    discount +
    "%): " +
    discountMoney.toLocaleString("vi-VN") +
    "đ",
);

console.log("║ VAT (8%): " + vat.toLocaleString("vi-VN") + "đ");

console.log("║ Tip (5%): " + tip.toLocaleString("vi-VN") + "đ");

console.log("╠══════════════════════════════════════╣");

console.log("║ THANH TOÁN: " + finalTotal.toLocaleString("vi-VN") + "đ");

console.log("╚══════════════════════════════════════╝");
