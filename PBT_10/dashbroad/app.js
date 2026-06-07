const refreshBtn = document.getElementById("refreshBtn");
const fetchTimeEl = document.getElementById("fetchTime");

// Helper function: Tự động ném lỗi nếu HTTP response không ok
const fetchJson = async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Lỗi máy chủ (Mã: ${res.status})`);
    return await res.json();
};

// ==========================================
// 1. CHỨC NĂNG CHÍNH: LOAD DASHBOARD (Promise.allSettled)
// ==========================================
async function loadDashboard() {
    const startTime = performance.now(); // Sử dụng performance.now() để tính ms chính xác tuyệt đối
    
    // Giai đoạn 1: Bật trạng thái Loading đồng loạt cho toàn bộ Widget
    for (let i = 0; i < 3; i++) {
        renderWidgetLoading(i);
    }
    fetchTimeEl.textContent = "Hệ thống đang đồng bộ tất cả luồng dữ liệu...";
    refreshBtn.disabled = true; // Khóa nút chống click phá hoại khi đang chạy dữ liệu

    // Giai đoạn 2: Khởi chạy SONG SONG 3 luồng API không phụ thuộc nhau
    const results = await Promise.allSettled([
        fetchJson("https://api.open-meteo.com/v1/forecast?latitude=21.03&longitude=105.85&current_weather=true"),
        fetchJson("https://randomuser.me/api/"),
        fetchJson("https://dog.ceo/api/breeds/image/random")
    ]);
    
    // Giai đoạn 3: Phân tích kết quả trả về của từng API độc lập
    results.forEach((result, index) => {
        if (result.status === "fulfilled") {
            renderWidgetSuccess(index, result.value);
        } else {
            // Chỉ Widget này bị lỗi, các Widget kia vẫn chạy mượt mà
            renderWidgetError(index, result.reason.message || "Lỗi mất kết nối.");
        }
    });
    
    // Giai đoạn 4: Tính toán thời gian thực thi của luồng
    const duration = (performance.now() - startTime).toFixed(0);
    fetchTimeEl.textContent = `Data loaded in ${duration} ms (Vừa cập nhật)`;
    refreshBtn.disabled = false;
}

// ==========================================
// 2. LAYER RENDER GRAPHICS (Giao diện cấu trúc Widget)
// ==========================================

// A. Trạng thái Loading của từng ô
function renderWidgetLoading(index) {
    const container = document.getElementById(`content-${index}`);
    container.innerHTML = `
        <div class="w-loading">
            <div class="spinner"></div>
            <span style="font-size:13px;">Đang nạp dữ liệu...</span>
        </div>
    `;
}

// B. Trạng thái Error biệt lập của từng ô
function renderWidgetError(index, message) {
    const container = document.getElementById(`content-${index}`);
    container.innerHTML = `
        <div class="w-error">
            <div class="w-error-icon">⚠️</div>
            <strong>Tải thông tin thất bại</strong>
            <span style="font-size:12px; opacity:0.8;">${message}</span>
        </div>
    `;
}

// C. Trạng thái Success: Render data chuẩn xác theo cấu trúc riêng của từng API
function renderWidgetSuccess(index, data) {
    const container = document.getElementById(`content-${index}`);
    container.innerHTML = ""; // Clear loader trước đó

    switch (index) {
        case 0: // Xử lý Data từ Open-Meteo Weather API
            const weather = data.current_weather;
            container.innerHTML = `
                <div class="weather-info">
                    <p style="font-weight:600; color:var(--text-muted)">Hà Nội, VN</p>
                    <div class="weather-temp">${weather.temperature}°C</div>
                    <p class="stats-text">💨 Tốc độ gió: ${weather.windspeed} km/h</p>
                </div>
            `;
            break;

        case 1: // Xử lý Data từ Random User API
            const user = data.results[0];
            container.innerHTML = `
                <div class="user-info">
                    <img class="user-avatar" src="${user.picture.medium}" alt="Avatar">
                    <div>
                        <h4 style="font-size:16px;">${user.name.first} ${user.name.last}</h4>
                        <p style="font-size:13px; color:var(--text-muted); margin-top:2px;">📍 ${user.location.city}, ${user.location.country}</p>
                        <p style="font-size:12px; color:var(--primary); margin-top:4px; word-break: break-all;">✉️ ${user.email}</p>
                    </div>
                </div>
            `;
            break;

        case 2: // Xử lý Data từ Dog API
            container.innerHTML = `
                <img class="dog-img" src="${data.message}" alt="Dog Picture" onload="this.style.opacity=1" style="transition: opacity 0.3s; opacity:0;">
            `;
            break;
    }
}

// ==========================================
// 3. EVENT LISTENERS
// ==========================================
document.addEventListener("DOMContentLoaded", loadDashboard);
refreshBtn.addEventListener("click", loadDashboard);