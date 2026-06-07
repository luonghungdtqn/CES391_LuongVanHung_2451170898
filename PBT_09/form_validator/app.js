var form = document.getElementById("registerForm");
var nameInput = document.getElementById("name");
var emailInput = document.getElementById("email");
var passwordInput = document.getElementById("password");
var confirmInput = document.getElementById("confirmPassword");
var phoneInput = document.getElementById("phone");
var submitBtn = document.getElementById("submitBtn");
var modal = document.getElementById("successModal");
var userInfo = document.getElementById("userInfo");
var closeModal = document.getElementById("closeModal");

var nameOk = false;
var emailOk = false;
var passwordOk = false;
var confirmOk = false;
var phoneOk = false;

function kiemTraSubmit() {
    if (nameOk === true && emailOk === true && passwordOk === true && confirmOk === true && phoneOk === true) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}

function kiemTraTen() {
    var ten = nameInput.value;
    var status = document.getElementById("nameStatus");
    var error = document.getElementById("nameError");
    
    if (ten.length < 2) {
        nameInput.className = "invalid";
        status.textContent = "❌";
        error.textContent = "Tên phải có ít nhất 2 ký tự";
        nameOk = false;
    } else {
        nameInput.className = "valid";
        status.textContent = "✅";
        error.textContent = "";
        nameOk = true;
    }
    
    kiemTraSubmit();
}

function kiemTraEmail() {
    var email = emailInput.value;
    var status = document.getElementById("emailStatus");
    var error = document.getElementById("emailError");
    
    var coA = false;
    var coCham = false;
    var i = 0;
    while (i < email.length) {
        if (email[i] === "@") {
            coA = true;
        }
        if (email[i] === ".") {
            coCham = true;
        }
        i = i + 1;
    }
    
    if (email === "") {
        emailInput.className = "invalid";
        status.textContent = "❌";
        error.textContent = "Vui lòng nhập email";
        emailOk = false;
    } else if (coA === false || coCham === false) {
        emailInput.className = "invalid";
        status.textContent = "❌";
        error.textContent = "Email không hợp lệ";
        emailOk = false;
    } else {
        emailInput.className = "valid";
        status.textContent = "✅";
        error.textContent = "";
        emailOk = true;
    }
    
    kiemTraSubmit();
}

function kiemTraPassword() {
    var pass = passwordInput.value;
    var status = document.getElementById("passwordStatus");
    var bar = document.getElementById("strengthBar");
    var text = document.getElementById("strengthText");
    
    if (pass.length === 0) {
        bar.className = "strength-bar";
        text.className = "strength-text";
        status.textContent = "";
        text.textContent = "";
        passwordOk = false;
        kiemTraSubmit();
        return;
    }
    
    if (pass.length < 8) {
        bar.className = "strength-bar weak";
        text.className = "strength-text weak";
        text.textContent = "Yếu - Cần ít nhất 8 ký tự";
        status.textContent = "❌";
        passwordOk = false;
    } else {
        var coSo = false;
        var coChu = false;
        
        var i = 0;
        while (i < pass.length) {
            var c = pass[i];
            if (c >= "0" && c <= "9") {
                coSo = true;
            }
            if (c >= "a" && c <= "z") {
                coChu = true;
            }
            if (c >= "A" && c <= "Z") {
                coChu = true;
            }
            i = i + 1;
        }
        
        if (coSo === true && coChu === true) {
            bar.className = "strength-bar strong";
            text.className = "strength-text strong";
            text.textContent = "Mạnh";
            status.textContent = "✅";
        } else {
            bar.className = "strength-bar medium";
            text.className = "strength-text medium";
            text.textContent = "Trung bình";
            status.textContent = "⚠️";
        }
        passwordOk = true;
    }
    
    if (confirmInput.value !== "") {
        kiemTraConfirm();
    }
    
    kiemTraSubmit();
}

function kiemTraConfirm() {
    var pass = passwordInput.value;
    var confirm = confirmInput.value;
    var status = document.getElementById("confirmStatus");
    var error = document.getElementById("confirmError");
    
    if (confirm === "") {
        confirmInput.className = "invalid";
        status.textContent = "❌";
        error.textContent = "Vui lòng xác nhận mật khẩu";
        confirmOk = false;
    } else if (confirm !== pass) {
        confirmInput.className = "invalid";
        status.textContent = "❌";
        error.textContent = "Mật khẩu không khớp";
        confirmOk = false;
    } else {
        confirmInput.className = "valid";
        status.textContent = "✅";
        error.textContent = "";
        confirmOk = true;
    }
    
    kiemTraSubmit();
}

function kiemTraPhone() {
    var raw = phoneInput.value;
    var sdt = "";
    
    var i = 0;
    while (i < raw.length) {
        var c = raw[i];
        if (c >= "0" && c <= "9") {
            sdt = sdt + c;
        }
        i = i + 1;
    }
    
    phoneInput.value = sdt;
    
    var status = document.getElementById("phoneStatus");
    var error = document.getElementById("phoneError");
    
    if (sdt.length === 0) {
        phoneInput.className = "invalid";
        status.textContent = "❌";
        error.textContent = "Vui lòng nhập số điện thoại";
        phoneOk = false;
    } else if (sdt.length !== 10) {
        phoneInput.className = "invalid";
        status.textContent = "❌";
        error.textContent = "Số điện thoại phải có 10 chữ số";
        phoneOk = false;
    } else {
        phoneInput.className = "valid";
        status.textContent = "✅";
        error.textContent = "";
        phoneOk = true;
    }
    
    kiemTraSubmit();
}

nameInput.oninput = kiemTraTen;
emailInput.oninput = kiemTraEmail;
passwordInput.oninput = kiemTraPassword;
confirmInput.oninput = kiemTraConfirm;
phoneInput.oninput = kiemTraPhone;

form.onsubmit = function(e) {
    e.preventDefault();
    
    userInfo.innerHTML = "<p><strong>Họ tên:</strong> " + nameInput.value + "</p>" +
        "<p><strong>Email:</strong> " + emailInput.value + "</p>" +
        "<p><strong>SĐT:</strong> " + phoneInput.value + "</p>";
    
    modal.className = "modal show";
};

closeModal.onclick = function() {
    modal.className = "modal";
    form.reset();
    
    nameInput.className = "";
    emailInput.className = "";
    passwordInput.className = "";
    confirmInput.className = "";
    phoneInput.className = "";
    
    document.getElementById("nameStatus").textContent = "";
    document.getElementById("emailStatus").textContent = "";
    document.getElementById("passwordStatus").textContent = "";
    document.getElementById("confirmStatus").textContent = "";
    document.getElementById("phoneStatus").textContent = "";
    
    document.getElementById("nameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("confirmError").textContent = "";
    document.getElementById("phoneError").textContent = "";
    
    document.getElementById("strengthBar").className = "strength-bar";
    document.getElementById("strengthText").textContent = "";
    
    nameOk = false;
    emailOk = false;
    passwordOk = false;
    confirmOk = false;
    phoneOk = false;
    
    submitBtn.disabled = true;
};