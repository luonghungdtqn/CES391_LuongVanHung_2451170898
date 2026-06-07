# Câu A1 (5đ) — Sync vs Async
 - Kết quả Output: 1 - Start -> 4 - End -> 3 - Promise -> 6 - Promise 2 -> 2 - Timeout 0ms -> 7 - Nested timeout -> 5 - Timeout 100ms
 - Giải thích:
    + Call Stack: Nơi chạy code đồng bộ (Sync). Chạy ngay lập tức, xong trước tất cả mọi thứ khác (1, 4).
    + Microtask Queue (Ưu tiên cao): Chứa các callback của Promise. Sau khi Call Stack trống, Event Loop sẽ vét sạch hàng đợi này rồi mới sang việc khác (3, 6).
    + Macrotask Queue (Ưu tiên thấp): Chứa các callback của setTimeout. Chỉ được chạy từng cái một sau khi Microtask Queue đã trống hoàn toàn (2, 7, 5).
 - Tại sao 7 lại chạy trước 5? Vì 7 có thời gian chờ là 0ms nên nó được đẩy vào hàng đợi Macrotask và sẵn sàng thực thi ngay lập tức, trong khi 5 phải đợi đủ 100ms mới đủ điều kiện lọt vào hàng đợi.

# Câu A2 (5đ) — Fetch API
 * Giải thích từng dòng code
 - 1: async function getData() {
    -> Định nghĩa một hàm bất đồng bộ bằng từ khóa async. Hàm này sẽ luôn trả về một Promise.
 - 2: try {
    -> Bắt đầu một khối lệnh giám sát lỗi. Nếu bất kỳ dòng code nào bên trong try xảy ra lỗi, chương trình sẽ lập tức nhảy xuống khối catch
 - 3: const response = await fetch("https://api.example.com/data");
    -> Gửi một yêu cầu HTTP đến API. Từ khóa await tạm dừng hàm để đợi server phản hồi và trả về một đối tượng Response, gán vào biến response.
 - 4: if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
    -> Kiểm tra nếu phản hồi từ server không thành công (status code nằm ngoài khoảng 200–299). Nếu đúng, chủ động tự ném (throw) ra một lỗi kèm mã trạng thái HTTP để nhảy xuống catch.
 - 5: const data = await response.json();
    -> Đọc và chuyển đổi nội dung phản hồi (vốn là text dạng JSON) thành một đối tượng JavaScript. Việc này tốn thời gian nên cần await tiếp.
 - 6: return data;
    -> Trả về dữ liệu đã parse thành công. Thực tế, dữ liệu này sẽ được bọc bên trong một Promise đã hoàn thành (resolved).
 - 7: } catch (error) {
        console.error("Failed:", error.message);
        return null;
    }
}
    -> Nơi xử lý khi có lỗi xảy ra ở khối try. In thông báo lỗi ra tab console của trình duyệt và trả về null để ứng dụng không bị crash.

 1. await fetch(...) — fetch trả về gì? Tại sao cần await?
  - fetch() trả về: Một Promise, và Promise này sẽ resolve ra một đối tượng Response (chứa thông tin chung về phản hồi như headers, status, nhưng chưa chứa body dữ liệu).
  - Tại sao cần await: Vì gửi yêu cầu qua mạng internet là một tác vụ tốn thời gian (bất đồng bộ). await giúp tạm dừng dòng code, đợi cho đến khi server phản hồi xong xuôi rồi mới chạy tiếp dòng dưới, giúp code viết trông giống như đồng bộ (gần gũi, dễ đọc).
 
 2. response.ok — Khi nào false? Liệt kê 3 status codes tương ứng.
  - Khi nào false: Khi mã trạng thái HTTP (status code) trả về từ server nằm ngoài khoảng 200 - 299 (tức là yêu cầu thất bại).
  - 3 status codes ví dụ:
    + 404 (Not Found - Không tìm thấy đường dẫn).
    + 500 (Internal Server Error - Lỗi hệ thống phía server).
    + 403 (Forbidden - Bị từ chối truy cập / Không có quyền).

 3. response.json() — Tại sao cần await lần nữa?
  - Lý do: Khi fetch hoàn thành, trình duyệt mới chỉ nhận được phần Header của HTTP. Phần thân dữ liệu (Body) có thể rất lớn và vẫn đang được tải về ngầm dưới dạng luồng dữ liệu (Stream).
  - Hàm .json() đảm nhận nhiệm vụ đọc toàn bộ luồng dữ liệu đó và parse nó sang Object. Việc đọc luồng dữ liệu này cũng là tác vụ bất đồng bộ, do đó nó tiếp tục trả về một Promise và bắt buộc bạn phải dùng await lần 2.

 4. try...catch — Catch những lỗi gì?
  - Khối catch trong đoạn code trên sẽ bắt được các lỗi sau:
    + Network error (Lỗi mạng): Có bắt được. (Ví dụ: Đứt cáp, mất mạng, sai tên miền, lỗi CORS). Lúc này hàm fetch() sẽ thất bại ngay lập tức và tự ném lỗi xuống catch.
    + JSON parse error (Lỗi cú pháp JSON): Có bắt được. Nếu API bị lỗi và trả về một chuỗi HTML (như trang 500 của server) thay vì chuỗi JSON, hàm response.json() sẽ bị lỗi cú pháp cấu trúc và ném lỗi xuống catch.
    + Lỗi HTTP (404, 500,...): Bản thân hàm fetch() của JavaScript không tự ném lỗi khi gặp 404 hay 500. Tuy nhiên, nhờ đoạn code if (!response.ok) { throw new Error(...) } mà bạn chủ động viết, các lỗi này sẽ được chuyển tiếp xuống khối catch thành công.

# Câu A3 (5đ) — Promise States
 1. Sơ đồ 3 trạng thái của Promise

             +-----------+
            |  Pending  |
            +-----------+
             /         \
            /           \
 resolve() /             \ reject()
          /               \
         v                 v
 +---------------+   +--------------+
 |   Fulfilled   |   |   Rejected   |
 +---------------+   +--------------+
  
  - Pending: trạng thái ban đầu, chưa hoàn thành.
  - Fulfilled: Promise thực hiện thành công (resolve() được gọi).
  - Rejected: Promise thất bại (reject() được gọi).
 
 2. Callback Hell là gì?
  - Callback Hell là tình trạng các hàm callback lồng nhau quá nhiều tầng, khiến mã nguồn khó đọc, khó bảo trì và khó xử lý lỗi.
  - Ví dụ cấu trúc thường có dạng:
  
  function1(function(result1) {
    function2(result1, function(result2) {
        function3(result2, function(result3) {
            function4(result3, function(result4) {
                console.log(result4);
            });
        });
    });
});

  -> Càng nhiều tầng callback thì code càng bị "thụt lề sang phải", tạo thành hình tam giác (Pyramid of Doom).
 
 3. Ví dụ Callback Hell 4 cấp
  - Code:
    setTimeout(() => {
    console.log("Bước 1");

    setTimeout(() => {
        console.log("Bước 2");

        setTimeout(() => {
            console.log("Bước 3");

            setTimeout(() => {
                console.log("Bước 4");
            }, 1000);

        }, 1000);

    }, 1000);

}, 1000);

  - Kết quả:
    Bước 1
    Bước 2
    Bước 3
    Bước 4

 4. Refactor bằng async/await
  - Code: 
    function waitStep(step) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Bước ${step}`);
            resolve();
        }, 1000);
    });
}

async function run() {
    await waitStep(1);
    await waitStep(2);
    await waitStep(3);
    await waitStep(4);
}

run();

 - Ưu điểm của async/await
    + Code ngắn gọn hơn.
    + Dễ đọc như mã đồng bộ.
    + Dễ xử lý lỗi bằng try...catch.
    + Tránh Callback Hell.


# Câu C1 (10đ) — Error Handling Strategy

1. Network Errors (Mất mạng giữa chừng)
 - Chiến lược: * Phát hiện chủ động: Sử dụng sự kiện window.addEventListener('online'/'offline') để cập nhật trạng thái kết nối toàn ứng dụng.
 - Xử lý giao diện (UX): Hiển thị một thanh thông báo cố định (Sticky Banner) báo mất kết nối. Đối với các hành động quan trọng như nhấn nút "Thanh toán", hệ thống sẽ vô hiệu hóa (disable) nút bấm ngay lập tức và đưa đơn hàng vào hàng đợi local (IndexedDB hoặc LocalStorage) để tự động đồng bộ lại khi có mạng.

2. API Errors (Server trả về mã lỗi HTTP)
 - Mỗi nhóm mã lỗi phản ánh một nguyên nhân khác nhau, do đó cần có kịch bản ứng phó riêng biệt:
    + Mã 404 Not Found (Sai đường dẫn/Sản phẩm không tồn tại): Xử lý: Không retry. Điều hướng người dùng về trang lỗi 404 tùy biến (Custom 404 Page) kèm nút "Quay lại trang chủ" hoặc gợi ý các sản phẩm tương tự để giữ chân khách hàng.
    + Mã 429 Too Many Requests (Bị giới hạn tần suất gọi API - Rate Limit): Xử lý: Đọc giá trị từ HTTP Header Retry-After do server trả về (nếu có) để biết cần đợi chính xác bao lâu. Nếu không có header này, áp dụng thuật toán Exponential Backoff (chờ lũy tiến: 2s -> 4s -> 8s) trước khi tự động gửi lại request.
    + Mã 500 Internal Server Error (Lỗi hệ thống phía Backend):  Xử lý: Đây thường là lỗi tạm thời của server. Hệ thống sẽ tự động kích hoạt Retry logic (thử lại tối đa 3 lần). Nếu sau 3 lần vẫn lỗi, hiển thị Toast thông báo: "Hệ thống đang quá tải, vui lòng thử lại sau vài phút".

3. Timeout (API phản hồi quá chậm > 10 giây)
 - Chiến lược: Trình duyệt không nên treo đợi API vô thời hạn vì sẽ làm đơ giao diện. Chúng ta sử dụng AbortController để chủ động hủy (cancel) request fetch nếu vượt quá thời gian cấu hình.
 - Code triển khai fetchWithTimeout:
 async function fetchWithTimeout(url, options = {}, ms = 10000) {
    // Tạo bộ điều khiển hủy tín hiệu
    const controller = new AbortController();
    const { signal } = controller;

    // Thiết lập đếm ngược thời gian, hết hạn sẽ kích hoạt abort()
    const timeoutId = setTimeout(() => controller.abort(), ms);

    try {
        const response = await fetch(url, { ...options, signal });
        clearTimeout(timeoutId); // Xóa bộ đếm nếu fetch về kịp lúc
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
            throw new Error(`Yêu cầu bị hủy do quá thời gian phản hồi (${ms}ms)`);
        }
        throw error;
    }
}
 - Giải thích:Trình duyệt mặc định không có cơ chế tự ngắt lệnh fetch nếu server bị treo. Để làm được việc này, chúng ta phải dùng một "nút bấm tự hủy ngầm" tên là AbortController.
    + const controller = new AbortController(): Tạo ra một bộ điều khiển tín hiệu hủy. Nó cung cấp một chiếc chìa khóa tên là signal.
    + fetch(url, { signal }): Bạn cắm chiếc chìa khóa signal này vào trong hàm fetch. Trình duyệt sẽ hiểu là: "Hãy vừa tải ảnh/dữ liệu, vừa chú ý nhìn vào chiếc chìa khóa này. Nếu chiếc khóa này bị bẻ, lập tức dừng ngay việc tải, không chờ nữa".
    + setTimeout(() => controller.abort(), ms): Đây là cái đồng hồ bấm giờ. Nếu đồng hồ chạy hết ms (ví dụ 10.000ms = 10 giây) mà dữ liệu vẫn chưa về, nó sẽ kích hoạt lệnh .abort(). Lệnh này chính là hành động "bẻ khóa", ép fetch phải dừng lại ngay lập tức và ném ra một lỗi có tên là AbortError.
    + clearTimeout(timeoutId): Nếu mạng nhanh, dữ liệu về trước 10 giây, dòng lệnh này sẽ đập tan cái đồng hồ bấm giờ đi, không cho nó kích hoạt lệnh tự hủy nữa.

4. Retry Logic (Thử lại tự động khi gặp lỗi mạng hoặc 5xx)
 - Chiến lược: Tự động gửi lại request tối đa 3 lần, kết hợp cơ chế hoãn tăng dần (Delay) để tránh làm nghẽn thêm hệ thống đang quá tải.
 - Code triển khai fetchWithRetry:
 // Hàm helper tạo độ trễ (delay) dạng chân thực bằng Promise
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchWithRetry(url, options = {}, maxRetries = 3, delayMs = 1500) {
    let lastError;

    for (let i = 0; i < maxRetries; i++) {
        try {
            // Kết hợp hàm timeout ở mục 3 vào trong vòng lặp retry
            const response = await fetchWithTimeout(url, options, 10000);

            // Nếu kết nối thành công nhưng server trả lỗi 5xx hoặc 429, ta vẫn ép thử lại
            if (!response.ok) {
                if (response.status === 500 || response.status === 503 || response.status === 429) {
                    throw new Error(`HTTP_${response.status}`);
                }
                // Nếu là lỗi 404 hoặc 403, trả về luôn chứ không retry vô ích
                return response; 
            }

            return response; // Thành công mỹ mãn, trả về kết quả
        } catch (error) {
            lastError = error;
            console.warn(`Lần thử ${i + 1} thất bại. Lỗi: ${error.message}. Đang thử lại sau ${delayMs}ms...`);
            
            // Nếu là lần thử cuối cùng thì không cần đứng đợi delay nữa
            if (i < maxRetries - 1) {
                // Áp dụng Exponential Backoff nhân đôi thời gian chờ ở các hiệp sau
                await delay(delayMs * Math.pow(2, i)); 
            }
        }
    }

    // Sau khi đã cạn kiệt số lần thử mà vẫn thất bại
    throw new Error(`Yêu cầu thất bại hoàn toàn sau ${maxRetries} lần thử. Lỗi gốc: ${lastError.message}`);
}
 - Giải thích: Ý tưởng của hàm này là dùng một vòng lặp for chạy từ 0 đến maxRetries (3 lần). Nếu một lần thử bị lỗi, thay vì làm sập app, nó sẽ nuốt lỗi đó vào biến lastError, đứng đợi một chút rồi chạy tiếp vòng lặp để thử lại.
    + if (!response.ok): Dòng này cực kỳ quan trọng. Khi bạn bị mất mạng, fetch sẽ tự nhảy vào khối catch. Nhưng nếu mạng không mất, server chỉ bị quá tải và trả về mã 500 hoặc 429, thì đối với trình duyệt, request đó vẫn tính là "thành công" (vì có phản hồi). Do đó, ta phải dùng lệnh throw new Error để ép nó biến thành một lỗi, bắt nó phải nhảy xuống khối catch để kích hoạt vòng lặp thử lại lần sau.
    + if (response.status === 404): Đoạn này để tối ưu hệ thống. Nếu server báo 404 (đường dẫn này không tồn tại), thì bạn có thử lại 100 lần kết quả vẫn là không tồn tại. Nên ta dùng lệnh return response để trả kết quả về luôn, không kích hoạt thử lại làm nghẽn mạng.
    + await delay(delayMs * Math.pow(2, i)): Đây là thuật toán Exponential Backoff (Lùi bước lũy tiến).
    + throw new Error(...) ở cuối hàm: Dòng này chỉ chạy khi vòng lặp for đã quay hết cả 3 lần mà vẫn dính lỗi. Lúc này hệ thống chính thức "buông xuôi", báo cáo lỗi cuối cùng lên màn hình cho người dùng biết.

# Câu C2 (10đ) — Promise.all vs Promise.allSettled vs Promise.race vs Promise.any

| Method                 | Khi nào resolve?                                       | Khi nào reject?                | Use case                                 |
| ---------------------- | ------------------------------------------------------ | ------------------------------ | ---------------------------------------- |
| `Promise.all()`        | Tất cả Promise đều thành công                          | Chỉ cần 1 Promise lỗi          | Tải nhiều dữ liệu bắt buộc phải có đủ    |
| `Promise.allSettled()` | Khi tất cả Promise kết thúc (thành công hoặc thất bại) | Không reject                   | Thống kê kết quả của nhiều tác vụ        |
| `Promise.race()`       | Promise đầu tiên hoàn thành (resolve hoặc reject)      | Nếu Promise đầu tiên bị reject | Timeout, chọn server phản hồi nhanh nhất |
| `Promise.any()`        | Promise đầu tiên resolve                               | Khi tất cả Promise đều reject  | Tìm nguồn dữ liệu đầu tiên thành công    |

