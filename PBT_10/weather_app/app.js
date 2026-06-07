const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const loadingEl = document.getElementById("loading");
const errorEl = document.getElementById("error");
const weatherInfoEl = document.getElementById("weather-info");

const cityNameEl = document.getElementById("cityName");
const tempEl = document.getElementById("temp");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const historyTagsEl = document.getElementById("historyTags");

// 1. Khởi chạy khi load trang
window.addEventListener("load", () => {
    renderHistory();
});

// Sự kiện khi click nút Tìm
searchBtn.addEventListener("click", () => {
    const cityName = cityInput.value.trim();
    if (cityName) {
        getWeatherData(cityName);
    }
});

// Sự kiện khi nhấn Enter trong ô input
cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const cityName = cityInput.value.trim();
        if (cityName) getWeatherData(cityName);
    }
});

// 2. Hàm chính gọi API và điều khiển các State
async function getWeatherData(city) {
    // [STATE 1]: Kích hoạt Trạng thái Loading
    showState("loading");

    try {
        // Kiểm tra kết nối mạng trước
        if (!navigator.onLine) {
            throw new Error("Mất kết nối internet. Vui lòng kiểm tra lại mạng.");
        }

        // BƯỚC A: Chuyển đổi tên thành phố sang tọa độ (Geocoding API của Open-Meteo)
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
        const geoRes = await fetch(geoUrl);
        
        if (!geoRes.ok) throw new Error("Không thể kết nối với máy chủ tìm kiếm vị trí.");
        
        const geoData = await geoRes.json();
        
        // Nếu không tìm thấy thành phố
        if (!geoData.results || geoData.results.length === 0) {
            throw new Error("Không tìm thấy thành phố này. Hãy thử lại!");
        }

        const { latitude, longitude, name, country } = geoData.results[0];

        // BƯỚC B: Gọi API lấy thời tiết thực tế dựa vào tọa độ vừa tìm được
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&relative_humidity_2m=true`;
        const weatherRes = await fetch(weatherUrl);
        
        if (!weatherRes.ok) throw new Error("Không thể lấy dữ liệu thời tiết.");
        
        const weatherData = await weatherRes.json();

        // [STATE 2]: Thành công - Hiển thị dữ liệu lên giao diện
        cityNameEl.textContent = `${name}, ${country}`;
        tempEl.textContent = weatherData.current_weather.temperature;
        windEl.textContent = weatherData.current_weather.windspeed;
        
        // Open-meteo trả về mảng humidity theo giờ, ta lấy giá trị hiện tại gần nhất
        humidityEl.textContent = weatherData.hourly ? weatherData.hourly.relative_humidity_2m[0] : "N/A";

        showState("success");
        
        // Lưu vào LocalStorage
        saveToHistory(name);

    } catch (err) {
        // [STATE 3]: Thất bại - Hiện thông báo lỗi
        errorEl.textContent = err.message;
        showState("error");
    }
}

// 3. Hàm điều khiển ẩn/hiện 3 States
function showState(state) {
    loadingEl.style.display = "none";
    errorEl.style.display = "none";
    weatherInfoEl.style.display = "none";

    if (state === "loading") loadingEl.style.display = "block";
    if (state === "error") errorEl.style.display = "block";
    if (state === "success") weatherInfoEl.style.display = "block";
}

// 4. Quản lý LocalStorage Lịch sử (Tối đa 5 thành phố gần nhất)
function saveToHistory(cityName) {
    let history = JSON.parse(localStorage.getItem("weather_history")) || [];
    
    // Loại bỏ thành phố trùng cũ nếu có để đẩy lên đầu
    history = history.filter(item => item.toLowerCase() !== cityName.toLowerCase());
    
    // Thêm thành phố mới vào đầu mảng
    history.unshift(cityName);
    
    // Giới hạn cắt lấy đúng 5 phần tử đầu tiên
    if (history.length > 5) {
        history = history.slice(0, 5);
    }
    
    localStorage.setItem("weather_history", JSON.stringify(history));
    renderHistory();
}

// 5. Render danh sách lịch sử ra HTML
function renderHistory() {
    const history = JSON.parse(localStorage.getItem("weather_history")) || [];
    historyTagsEl.innerHTML = ""; // Clear cũ

    if (history.length === 0) {
        historyTagsEl.innerHTML = "<span style='color:#aaa; font-size:14px;'>Chưa có lịch sử</span>";
        return;
    }

    history.forEach(city => {
        const btn = document.createElement("button");
        btn.className = "history-btn";
        btn.textContent = city;
        
        // Click vào tag lịch sử -> tìm lại thành phố đó
        btn.addEventListener("click", () => {
            cityInput.value = city;
            getWeatherData(city);
        });
        
        historyTagsEl.appendChild(btn);
    });
}