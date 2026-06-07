// Cấu hình ban đầu
const galleryGrid = document.getElementById("galleryGrid");
const loadTrigger = document.getElementById("load-trigger");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

let page = 1;
const limit = 20;
let isLoading = false;

// 1. Fetch dữ liệu từ API (Sử dụng Picsum Photos để có ảnh chất lượng cao tốt hơn)
async function fetchPhotos(pageNumber, limitNumber) {
    const response = await fetch(`https://picsum.photos/v2/list?page=${pageNumber}&limit=${limitNumber}`);
    if (!response.ok) throw new Error("Không thể tải hình ảnh từ máy chủ.");
    return await response.json();
}

// 2. Tạo phần tử và cấu hình Lazy Loading cho từng ảnh đơn lẻ
function createPhotoCard(photo) {
    const card = document.createElement("div");
    card.className = "photo-card";
    
    // Tạo tag ảnh, sử dụng thuộc tính 'data-src' thay vì 'src' để trì hoãn việc tải file ảnh gốc
    const img = document.createElement("img");
    img.className = "photo-img";
    img.dataset.src = `https://picsum.photos/id/${photo.id}/500/400`; // Ảnh nén vừa phải cho Grid view
    img.alt = `Photo by ${photo.author}`;
    
    // Lưu link ảnh chất lượng cao để mở trong lightbox sau này
    card.dataset.fullsrc = `https://picsum.photos/id/${photo.id}/1200/900`;

    card.appendChild(img);
    galleryGrid.appendChild(card);

    // Kích hoạt theo dõi Lazy Loading cho bức ảnh vừa tạo này
    lazyLoadObserver.observe(img);
}

// 3. Hàm kích hoạt load thêm dữ liệu (Phối hợp với Infinite Scroll)
async function loadMorePhotos() {
    if (isLoading) return; // Khóa chặn chống trùng lặp request khi đang fetch dở
    isLoading = true;
    loadTrigger.style.visibility = "visible";

    try {
        const photos = await fetchPhotos(page, limit);
        
        if (photos.length === 0) {
            loadTrigger.innerHTML = "🎉 Bạn đã xem hết tất cả các bức ảnh.";
            infiniteObserver.unobserve(loadTrigger); // Ngắt kết nối không quan sát nữa
            return;
        }

        photos.forEach(photo => createPhotoCard(photo));
        page++; // Tăng trang lên chuẩn bị cho đợt scroll tiếp theo
    } catch (error) {
        console.error("Lỗi:", error.message);
    } finally {
        isLoading = false;
    }
}

// ==========================================
// 4. KỸ THUẬT OBSERVERS (YÊU CẦU BÀI TOÁN)
// ==========================================

// A. Trình theo dõi Infinite Scroll (Khi chạm gần đáy màn hình)
const infiniteObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !isLoading) {
        loadMorePhotos();
    }
}, {
    rootMargin: "200px" // Kích hoạt tải trước khi người dùng chạm đáy thật 200px giúp tăng trải nghiệm
});

// B. Trình theo dõi Lazy Loading cho từng Ảnh riêng lẻ
const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            // Di chuyển link từ data-src sang src thật để trình duyệt nạp ảnh
            img.src = img.dataset.src;
            
            img.onload = () => {
                img.classList.add("loaded"); // Tạo hiệu ứng mượt fadeIn
            };
            
            // Đã load ảnh xong thì hủy bỏ theo dõi phần tử này để tiết kiệm RAM
            observer.unobserve(img);
        }
    });
});

// Bắt đầu theo dõi khối trigger ở đáy trang để kích hoạt đợt fetch đầu tiên
infiniteObserver.observe(loadTrigger);

// ==========================================
// 5. EVENT DELEGATION CHO LIGHTBOX (MODAL)
// ==========================================

// Gắn đúng 1 Listener duy nhất lên Grid cha để bắt sự kiện click của các thẻ con
galleryGrid.addEventListener("click", (e) => {
    const card = e.target.closest(".photo-card");
    if (card) {
        const fullSizeUrl = card.dataset.fullsrc;
        lightboxImg.src = fullSizeUrl;
        lightbox.classList.add("active");
        document.body.style.overflow = "hidden"; // Khóa thanh cuộn màn hình chính
    }
});

// Đóng Lightbox khi click nút Close hoặc click ra vùng đen bên ngoài ảnh
lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target === lightboxClose) {
        lightbox.classList.remove("active");
        lightboxImg.src = ""; // Xóa src ảnh lớn cũ để giải phóng bộ nhớ tạm
        document.body.style.overflow = "auto"; // Mở lại thanh cuộn màn hình chính
    }
});