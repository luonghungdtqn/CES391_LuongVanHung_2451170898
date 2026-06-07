var products = [
    { id: 1, name: "iPhone 16", price: 25990000, category: "phone", image: "https://placehold.co/200", rating: 4.5, inStock: true },
    { id: 2, name: "Samsung S24", price: 22990000, category: "phone", image: "https://placehold.co/200", rating: 4.3, inStock: true },
    { id: 3, name: "Xiaomi 14", price: 15990000, category: "phone", image: "https://placehold.co/200", rating: 4.0, inStock: false },
    { id: 4, name: "MacBook Pro", price: 45990000, category: "laptop", image: "https://placehold.co/200", rating: 4.8, inStock: true },
    { id: 5, name: "Dell XPS 15", price: 35990000, category: "laptop", image: "https://placehold.co/200", rating: 4.5, inStock: true },
    { id: 6, name: "Asus ROG", price: 32990000, category: "laptop", image: "https://placehold.co/200", rating: 4.4, inStock: true },
    { id: 7, name: "iPad Pro", price: 28990000, category: "tablet", image: "https://placehold.co/200", rating: 4.7, inStock: true },
    { id: 8, name: "Samsung Tab S9", price: 18990000, category: "tablet", image: "https://placehold.co/200", rating: 4.2, inStock: false },
    { id: 9, name: "Xiaomi Pad 6", price: 8990000, category: "tablet", image: "https://placehold.co/200", rating: 4.0, inStock: true },
    { id: 10, name: "AirPods Pro", price: 5990000, category: "accessory", image: "https://placehold.co/200", rating: 4.6, inStock: true },
    { id: 11, name: "Apple Watch", price: 9990000, category: "accessory", image: "https://placehold.co/200", rating: 4.5, inStock: true },
    { id: 12, name: "Samsung Buds", price: 3990000, category: "accessory", image: "https://placehold.co/200", rating: 4.1, inStock: false }
];

var productList = document.getElementById("productList");
var searchInput = document.getElementById("searchInput");
var categoryFilters = document.getElementById("categoryFilters");
var sortSelect = document.getElementById("sortSelect");
var modal = document.getElementById("modal");
var modalBody = document.getElementById("modalBody");
var closeBtn = document.querySelector(".close-btn");
var cartBadge = document.getElementById("cartBadge");
var darkModeBtn = document.getElementById("darkModeBtn");

var currentCategory = "all";
var cartCount = 0;
var darkMode = false;

function hienThiSanPham(list) {
    productList.innerHTML = "";
    
    for (var i = 0; i < list.length; i++) {
        var p = list[i];
        
        var card = document.createElement("div");
        card.className = "product-card";
        card.id = "product-" + p.id;
        
        var img = document.createElement("img");
        img.src = p.image;
        card.appendChild(img);
        
        var info = document.createElement("div");
        info.className = "product-info";
        
        var ten = document.createElement("h3");
        ten.textContent = p.name;
        info.appendChild(ten);
        
        var gia = document.createElement("div");
        gia.className = "price";
        gia.textContent = p.price.toLocaleString("vi-VN") + "đ";
        info.appendChild(gia);
        
        var rating = document.createElement("div");
        rating.className = "rating";
        var sao = "";
        for (var j = 1; j <= p.rating; j++) {
            sao = sao + "⭐";
        }
        rating.textContent = sao + " " + p.rating;
        info.appendChild(rating);
        
        var stock = document.createElement("div");
        if (p.inStock === true) {
            stock.className = "stock in-stock";
            stock.textContent = "Còn hàng";
        } else {
            stock.className = "stock out-of-stock";
            stock.textContent = "Hết hàng";
        }
        info.appendChild(stock);
        
        var btn = document.createElement("button");
        btn.className = "add-cart-btn";
        btn.textContent = "🛒 Thêm vào giỏ";
        btn.id = "btn-" + p.id;
        if (p.inStock === false) {
            btn.disabled = true;
        }
        info.appendChild(btn);
        
        card.appendChild(info);
        productList.appendChild(card);
    }
}

function locSanPham() {
    var result = [];
    var keyword = searchInput.value.toLowerCase();
    
    for (var i = 0; i < products.length; i++) {
        var p = products[i];
        var hienThi = true;
        
        if (currentCategory !== "all") {
            if (p.category !== currentCategory) {
                hienThi = false;
            }
        }
        
        if (keyword !== "") {
            var ten = p.name.toLowerCase();
            if (ten.indexOf(keyword) === -1) {
                hienThi = false;
            }
        }
        
        if (hienThi === true) {
            result.push(p);
        }
    }
    
    var sortBy = sortSelect.value;
    if (sortBy === "price-asc") {
        result.sort(function(a, b) { return a.price - b.price; });
    }
    if (sortBy === "price-desc") {
        result.sort(function(a, b) { return b.price - a.price; });
    }
    if (sortBy === "name-asc") {
        result.sort(function(a, b) { return a.name.localeCompare(b.name); });
    }
    if (sortBy === "rating-desc") {
        result.sort(function(a, b) { return b.rating - a.rating; });
    }
    
    hienThiSanPham(result);
}

function taoCategoryButtons() {
    var cats = ["all", "phone", "laptop", "tablet", "accessory"];
    var names = ["Tất cả", "Điện thoại", "Laptop", "Máy tính bảng", "Phụ kiện"];
    
    for (var i = 0; i < cats.length; i++) {
        var btn = document.createElement("button");
        if (i === 0) {
            btn.className = "category-btn active";
        } else {
            btn.className = "category-btn";
        }
        btn.textContent = names[i];
        btn.id = "cat-" + cats[i];
        categoryFilters.appendChild(btn);
    }
}

function hienModal(id) {
    var p = null;
    for (var i = 0; i < products.length; i++) {
        if (products[i].id === id) {
            p = products[i];
        }
    }
    
    modalBody.innerHTML = "";
    
    var img = document.createElement("img");
    img.src = p.image;
    modalBody.appendChild(img);
    
    var h2 = document.createElement("h2");
    h2.textContent = p.name;
    modalBody.appendChild(h2);
    
    var gia = document.createElement("div");
    gia.className = "price";
    gia.textContent = p.price.toLocaleString("vi-VN") + "đ";
    modalBody.appendChild(gia);
    
    modal.className = "modal show";
}

function dongModal() {
    modal.className = "modal";
}

searchInput.addEventListener("input", function() {
    locSanPham();
});

categoryFilters.addEventListener("click", function(e) {
    var clicked = e.target;
    
    if (clicked.tagName !== "BUTTON") {
        return;
    }
    
    var btns = document.querySelectorAll(".category-btn");
    for (var i = 0; i < btns.length; i++) {
        btns[i].className = "category-btn";
    }
    clicked.className = "category-btn active";
    
    var catId = clicked.id;
    currentCategory = catId.replace("cat-", "");
    locSanPham();
});

sortSelect.addEventListener("change", function() {
    locSanPham();
});

productList.addEventListener("click", function(e) {
    var clicked = e.target;
    
    if (clicked.className === "add-cart-btn") {
        cartCount = cartCount + 1;
        cartBadge.textContent = cartCount;
        return;
    }
    
    if (clicked.tagName === "IMG") {
        var card = clicked.parentElement;
        var cardId = card.id;
        var id = Number(cardId.replace("product-", ""));
        hienModal(id);
    }
});

closeBtn.addEventListener("click", function() {
    dongModal();
});

modal.addEventListener("click", function(e) {
    if (e.target === modal) {
        dongModal();
    }
});

darkModeBtn.addEventListener("click", function() {
    if (darkMode === false) {
        darkMode = true;
        document.body.className = "dark-mode";
        darkModeBtn.textContent = "☀️ Light Mode";
    } else {
        darkMode = false;
        document.body.className = "";
        darkModeBtn.textContent = "🌙 Dark Mode";
    }
});

taoCategoryButtons();
hienThiSanPham(products);