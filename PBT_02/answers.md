Câu A1:
Dưới đây là 10 input types phổ biến trong HTML5 kèm theo đặc điểm và ứng dụng thực tế trong lĩnh vực Thương mại điện tử (E-commerce):

    type="email" → Ô nhập text kèm bàn phím tối ưu ký tự @; tự động kiểm tra định dạng email hợp lệ → Dùng cho form Đăng ký tài khoản hoặc nhận bản tin (Newsletter).

    type="password" → Các ký tự nhập vào được ẩn đi (thay bằng dấu chấm hoặc sao) → Dùng cho ô Nhập mật khẩu khi thanh toán hoặc đăng nhập.

    type="number" → Ô nhập chỉ cho phép số, thường có nút tăng/giảm ở góc; tự động chặn ký tự chữ → Dùng để chọn Số lượng sản phẩm trong giỏ hàng.

    type="tel" → Ô nhập văn bản, trên di động sẽ tự động hiển thị bàn phím số (numpad) → Dùng để nhập Số điện thoại nhận hàng.

    type="date" → Hiển thị giao diện chọn lịch (Date picker) trực quan; tự động chuẩn hóa định dạng YYYY-MM-DD → Dùng để chọn Ngày giao hàng dự kiến hoặc ngày sinh khách hàng để nhận ưu đãi.

    type="search" → Ô nhập văn bản có nút "X" để xóa nhanh nội dung; tối ưu cho hành vi tìm kiếm → Dùng cho thanh Tìm kiếm sản phẩm đầu trang web.

    type="range" → Thanh trượt (slider) để chọn giá trị trong một khoảng nhất định → Dùng cho bộ lọc Khoảng giá (Price Filter) để khách hàng kéo chọn ngân sách.

    type="color" → Hộp thoại chọn màu sắc từ bảng màu hệ thống → Dùng khi khách hàng muốn Tùy chỉnh màu sắc cho các sản phẩm thiết kế theo yêu cầu (ví dụ: in áo thun).

    type="file" → Nút bấm mở cửa sổ duyệt file từ thiết bị; có thể giới hạn loại file (ảnh, pdf) → Dùng cho mục Gửi ảnh phản hồi/đánh giá sản phẩm (Review) sau khi mua hàng.

    type="url" → Ô nhập text; tự động kiểm tra định dạng đường dẫn web hợp lệ (phải có http:// hoặc https://) → Dùng trong form Liên kết trang cá nhân/Social Media của nhà bán hàng (Seller profile).

Câu A2:

    Trường hợp 1: <input type="text" required value="">
    Kết quả: Trình duyệt chặn lại và hiển thị thông báo lỗi (thường là "Please fill out this field").

    Tại sao: Thuộc tính required bắt buộc trường này không được để trống. Vì value hiện tại là một chuỗi rỗng, nó vi phạm điều kiện bắt buộc.

    Trường hợp 2: <input type="email" value="abc">
    Kết quả: Trình duyệt chặn lại và báo lỗi định dạng (thường là "Please include an '@' in the email address...").

    Tại sao: type="email" yêu cầu nội dung phải khớp với cú pháp địa chỉ email chuẩn. Chuỗi "abc" thiếu ký tự @ và tên miền, nên bị coi là không hợp lệ.

    Trường hợp 3: <input type="number" min="1" max="10" value="15">
    Kết quả: Trình duyệt chặn lại và báo lỗi giới hạn (thường là "Value must be less than or equal to 10").

    Tại sao: Thuộc tính max="10" thiết lập giá trị tối đa được phép. Giá trị 15 vượt quá giới hạn này nên vi phạm quy tắc Validation.

    Trường hợp 4: <input type="text" pattern="[0-9]{10}" value="abc123">
    Kết quả: Trình duyệt chặn lại và báo lỗi không khớp định dạng (thường là "Please match the requested format").

    Tại sao: Thuộc tính pattern sử dụng Biểu thức chính quy (Regex). [0-9]{10} yêu cầu người dùng phải nhập đúng 10 chữ số. Chuỗi "abc123" vừa chứa chữ cái, vừa không đủ độ dài nên bị từ chối.

    Trường hợp 5: <input type="password" minlength="8" value="123">
    Kết quả: Trình duyệt chặn lại và báo lỗi độ dài (thường là "Please lengthen this text to 8 characters or more...").

    Tại sao: Thuộc tính minlength="8" yêu cầu tối thiểu phải có 8 ký tự. Chuỗi "123" chỉ có 3 ký tự, không đáp ứng được yêu cầu về bảo mật tối thiểu đã thiết lập.

Câu A3:
Trong chương 07 về Accessibility (Khả năng truy cập), việc thiết kế form không chỉ là để đẹp mà còn là để đảm bảo mọi người dùng, bao gồm cả những người khiếm thị sử dụng trình đọc màn hình (Screen Reader), đều có thể tương tác được.

    Dưới đây là giải thích ngắn gọn cho các thắc mắc của bạn:

    1. Tại sao <label for="email"> quan trọng cho Screen Reader?
    Tạo liên kết logic: Trình đọc màn hình sẽ đọc nội dung của thẻ <label> khi người dùng di chuyển con trỏ vào ô <input> tương ứng. Nếu không có for (liên kết với id của input), người dùng khiếm thị sẽ chỉ nghe thấy "Edit text" mà không biết ô đó yêu cầu nhập gì (email, họ tên hay mật khẩu).

    Mở rộng vùng tương tác: Khi có thẻ <label>, người dùng có thể click vào chính dòng chữ đó để kích hoạt ô nhập liệu. Điều này cực kỳ hữu ích cho những người bị run tay hoặc gặp khó khăn khi điều khiển chuột chính xác.

    2. Khi nào dùng <fieldset> và <legend>?
    Chúng được dùng khi bạn muốn nhóm các trường thông tin có liên quan mật thiết với nhau lại thành một khối.

    <fieldset>: Dùng để bao quanh nhóm các input.

    <legend>: Dùng để đặt tiêu đề cho nhóm đó.
    3. Khi nào dùng aria-label?

Khi dùng: Dùng khi giao diện không có văn bản hiển thị để làm nhãn nhưng vẫn cần mô tả cho trình đọc màn hình. Thường thấy nhất là các nút chỉ có icon (ví dụ: nút "X" để đóng form, nút hình kính lúp để tìm kiếm).

Ví dụ: <button aria-label="Đóng cửa sổ">X</button>

Tại sao KHÔNG nên dùng khi đã có <label>?

Gây nhiễu: Nếu dùng cả hai, trình đọc màn hình có thể bị xung đột hoặc ghi đè thông tin của <label> bằng aria-label.

Nguyên tắc ưu tiên: HTML thuần (<label>) luôn tốt hơn và ổn định hơn trên mọi trình duyệt so với các thuộc tính ARIA bổ trợ. aria-label không hiển thị trên màn hình, nên nó không hỗ trợ được những người dùng bình thường khác
Câu A4:
Dưới đây là giải thích chi tiết về cách tối ưu hóa hình ảnh và video trong HTML5:

1. Thuộc tính loading="lazy" trên thẻ <img>
Thuộc tính này cho phép trình duyệt hoãn việc tải hình ảnh cho đến khi người dùng cuộn trang đến gần vị trí của hình ảnh đó (gọi là Lazy Loading).

Cải thiện điều gì?

Tốc độ tải trang đầu tiên: Giảm lượng dữ liệu cần tải ban đầu, giúp trang hiện ra nhanh hơn.

Tiết kiệm băng thông: Chỉ tải ảnh khi người dùng thực sự xem chúng, rất hữu ích cho người dùng dùng mạng 4G/5G.

Hiệu năng thiết bị: Giảm tải cho CPU và bộ nhớ vì không phải xử lý quá nhiều tài nguyên cùng lúc.

Khi nào KHÔNG nên dùng?

Ảnh ở "Above the fold": Những ảnh xuất hiện ngay khi vừa mở trang (như Logo, Banner chính - Hero Image) nên để mặc định (loading="eager") để người dùng thấy ngay lập tức. Nếu dùng lazy load ở đây, ảnh sẽ bị hiện ra trễ (giật), gây trải nghiệm xấu.

2. Tại sao nên cung cấp nhiều <source> trong <video>?
Mỗi trình duyệt (Chrome, Safari, Firefox) hỗ trợ các bộ giải mã (codec) video khác nhau. Việc cung cấp nhiều thẻ <source> giúp:

Khả năng tương thích tối đa: Trình duyệt sẽ quét từ trên xuống dưới, thấy file nào nó "đọc" được thì sẽ phát file đó.

Tối ưu dung lượng: Bạn có thể cung cấp các định dạng nén tốt (dung lượng nhẹ) cho trình duyệt hiện đại và file cũ hơn cho trình duyệt lỗi thời.

3 format video web phổ biến:

MP4 (H.264): Phổ biến nhất, hỗ trợ hầu hết mọi trình duyệt và thiết bị.

WebM (VP8/VP9): Định dạng của Google, nén cực tốt, dung lượng nhẹ hơn MP4 nhưng Safari đời cũ có thể không hỗ trợ.

Ogg (Theora): Một định dạng mã nguồn mở, hiện nay ít dùng hơn hai loại trên nhưng vẫn là một lựa chọn thay thế.

3. Thuộc tính alt trên thẻ <img>
Thuộc tính alt (Alternative Text) dùng để cung cấp mô tả bằng chữ cho hình ảnh. Nó hiển thị khi ảnh bị lỗi không tải được và là nội dung mà Screen Reader sẽ đọc cho người khiếm thị.

Cách viết alt tốt cho 3 trường hợp:

Ảnh sản phẩm iPhone 16:

Viết tốt: alt="Điện thoại iPhone 16 Pro Max màu Titan Sa mạc nhìn từ mặt lưng" (Mô tả rõ ràng model và đặc điểm để hỗ trợ SEO và người dùng).

Ảnh trang trí (Decorative):

Viết tốt: alt="" (Để trống). Khi alt trống, trình đọc màn hình sẽ hiểu đây là ảnh trang trí và bỏ qua, tránh làm phiền người dùng bằng những thông tin vô ích như "đường kẻ trang trí".

Ảnh biểu đồ doanh thu Q1/2026:

Viết tốt: alt="Biểu đồ cột cho thấy doanh thu Q1/2026 tăng 15% so với cùng kỳ năm ngoái, đạt mức 500 tỷ đồng" (Tóm tắt thông tin quan trọng nhất của biểu đồ thay vì chỉ nói "đây là cái biểu đồ").
Câu A5:
Được nhé! Để ngắn gọn và trực quan nhất, đây là sự khác biệt giữa hai cách dùng:

Cách 1: Chỉ dùng <img>
Mục đích: Dùng cho những ảnh mang tính chất trang trí hoặc là một phần hòa trộn hoàn toàn vào giao diện mà không cần giải thích thêm bằng lời.

Đặc điểm: Không có chú thích đi kèm cho người dùng đọc; nếu xóa ảnh thì bố cục có thể trống trải nhưng nội dung chữ vẫn giữ nguyên ý nghĩa.

Ví dụ 1: Logo công ty trên thanh menu (Navigation bar).

Ví dụ 2: Icon tiện ích (hình chiếc xe tải nhỏ cạnh dòng chữ "Giao hàng miễn phí").

Cách 2: Dùng <figure> và <figcaption>
Mục đích: Dùng khi hình ảnh là một nội dung độc lập (giống như một tấm hình trong sách giáo khoa) cần có dòng mô tả hoặc chú thích đi kèm.

Đặc điểm: Tạo ra một khối nội dung có ngữ nghĩa chặt chẽ; phần chú thích (figcaption) giúp người dùng hiểu rõ ngữ cảnh của ảnh.

Ví dụ 1: Ảnh chi tiết sản phẩm trong trang mô tả, kèm chú thích về thông số (ví dụ: "Mặt lưng kính nhám của iPhone 16 Pro").

Ví dụ 2: Biểu đồ so sánh giá trong một bài viết đánh giá thị trường, kèm dòng chú thích "Hình 1.1: Biến động giá smartphone phân khúc cao cấp 2026".

Câu C1:

    Lỗi 1: Dòng 2 — Input "Tên" không có <label for> (accessibility kém)
    Sửa:
    <label for="name">Tên:</label>
    <input type="text" id="name" name="name" required>

    Lỗi 2: Dòng 4 — Input email thiếu name + không bắt buộc nhập
    Sửa:
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" placeholder="Email của bạn" required>

    Lỗi 3: Dòng 6 — Input password không có label (accessibility)
    Sửa:
    <label for="password">Mật khẩu:</label>
    <input type="password" id="password" name="password" required>

    Lỗi 4: Dòng 7 — Input "Nhập lại mật khẩu" không có label + không phân biệt
    Sửa:
    <label for="confirm-password">Nhập lại mật khẩu:</label>
    <input type="password" id="confirm-password" name="confirm_password" required>

    Lỗi 5: Dòng 9 — Phone dùng type="text" (sai semantic)
    Sửa:
    <label for="phone">Phone:</label>
    <input type="tel" id="phone" name="phone" placeholder="0901234567" required>

    Lỗi 6: Dòng 9 — Không nên dùng value làm dữ liệu mặc định (UX kém)
    Sửa: chuyển sang placeholder (đã sửa ở trên)

    Lỗi 7: Dòng 11 — <select> không có label + thiếu name
    Sửa:
    <label for="city">Thành phố:</label>
    <select id="city" name="city" required>
        <option value="">-- Chọn --</option>
        <option value="hn">Hà Nội</option>
        <option value="hcm">TP.HCM</option>
    </select>

    Lỗi 8: Dòng 16 — Checkbox "đồng ý điều khoản" sai cấu trúc + thiếu input
    Sửa:
    <label>
        <input type="checkbox" name="terms" required>
        Tôi đồng ý điều khoản
    </label>
Câu C2:
    1. Regex pattern
        CMND/CCCD (đúng 12 chữ số): pattern="^\d{12}$"
        Số tài khoản (10–15 chữ số): pattern="^\d{10,15}$"
    2. HTML5 validation có đủ an toàn cho ngân hàng không?
    KHÔNG 
    Lý do:
    HTML5 validation chỉ chạy ở frontend (trình duyệt)
    Người dùng có thể:
    Tắt validation
    Sửa request bằng Postman hoặc Burp Suite
    Gửi request trực tiếp lên server
     Nghĩa là: server vẫn có thể nhận dữ liệu sai / độc hại
    Trong hệ thống ngân hàng:
    Validation frontend = trải nghiệm người dùng
    Validation backend = bảo mật thật sự   
    3 loại validation HTML5 KHÔNG làm được:
    So sánh giữa nhiều field
    (ví dụ: xác nhận mật khẩu, ngày bắt đầu < ngày kết thúc)
    Kiểm tra dữ liệu với server / database
    (ví dụ: email đã tồn tại, CMND đã đăng ký chưa)
    Validation theo logic phức tạp / ngữ cảnh
    (ví dụ: chặn email tạm, PIN yếu như 123456)