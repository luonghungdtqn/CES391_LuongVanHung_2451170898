// Global State quản lý danh sách user tạm thời trên Client để CRUD mượt mà không reload
let state = {
    users: [],
    isEditing: false
};

// ==========================================
// 1. API LAYER
// ==========================================
const api = {
    baseURL: "https://jsonplaceholder.typicode.com",
    
    async _request(endpoint, options = {}) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, options);
            if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error(`API Call failed (${endpoint}):`, error);
            throw error; // Ném tiếp lỗi ra ngoài để UI catch
        }
    },

    async getUsers() { 
        return this._request("/users"); 
    },
    
    async getUser(id) { 
        return this._request(`/users/${id}`); 
    },
    
    async createUser(data) { 
        return this._request("/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });
    },
    
    async updateUser(id, data) { 
        return this._request(`/users/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });
    },
    
    async deleteUser(id) { 
        return this._request(`/users/${id}`, { 
            method: "DELETE" 
        });
    }
};

// ==========================================
// 2. UI LAYER
// ==========================================
const ui = {
    userGrid: document.getElementById("userGrid"),
    userForm: document.getElementById("userForm"),
    formTitle: document.getElementById("formTitle"),
    submitBtn: document.getElementById("submitBtn"),
    cancelBtn: document.getElementById("cancelEditBtn"),
    
    // Form Inputs
    idInput: document.getElementById("userIdField"),
    nameInput: document.getElementById("nameField"),
    emailInput: document.getElementById("emailField"),
    searchInput: document.getElementById("searchInput"),

    renderUsers(users) {
        this.userGrid.innerHTML = "";
        if(users.length === 0) {
            this.userGrid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; color:#888; padding:20px;">Không tìm thấy user thích hợp.</div>`;
            return;
        }

        users.forEach(user => {
            const card = document.createElement("div");
            card.className = "user-card";
            card.dataset.id = user.id;
            card.innerHTML = `
                <div class="user-name">${this._escapeHTML(user.name)}</div>
                <div class="user-email">${this._escapeHTML(user.email)}</div>
                <div class="card-actions">
                    <button class="btn-action btn-edit" onclick="actions.prepareEdit(${user.id})">Sửa</button>
                    <button class="btn-action btn-delete" onclick="actions.handleDelete(${user.id})">Xóa</button>
                </div>
            `;
            this.userGrid.appendChild(card);
        });
    },

    showLoading() {
        this.userGrid.innerHTML = "";
        // Render 6 ô Skeleton Loader
        for (let i = 0; i < 6; i++) {
            const skeletonCard = document.createElement("div");
            skeletonCard.className = "skeleton skeleton-card";
            this.userGrid.appendChild(skeletonCard);
        }
    },

    hideLoading() {
        // Hàm render đã tự động clear khung skeleton trước khi nạp data mới
    },

    showError(message) {
        this._createToast(message, "error");
    },

    showSuccess(message) {
        this._createToast(message, "success");
    },

    fillForm(user) {
        state.isEditing = true;
        this.formTitle.textContent = "Cập Nhật User";
        this.submitBtn.textContent = "Cập nhật";
        this.cancelBtn.style.display = "block";
        
        this.idInput.value = user.id;
        this.nameInput.value = user.name;
        this.emailInput.value = user.email;
    },

    resetForm() {
        state.isEditing = false;
        this.formTitle.textContent = "Thêm User Mới";
        this.submitBtn.textContent = "Lưu lại";
        this.cancelBtn.style.display = "none";
        
        this.userForm.reset();
        this.idInput.value = "";
    },

    // Bảo mật tránh XSS Injection
    _escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
        );
    },

    _createToast(message, type) {
        const container = document.getElementById("toast-container");
        const toast = document.createElement("div");
        toast.className = `toast ${type}`;
        toast.textContent = message;
        
        container.appendChild(toast);
        setTimeout(() => toast.remove(), 4000); // 4 giây tự ẩn
    }
};

// ==========================================
// 3. ACTIONS & APP LOGIC LAYER
// ==========================================
const actions = {
    // Khởi chạy ứng dụng
    async init() {
        ui.showLoading();
        try {
            state.users = await api.getUsers();
            ui.renderUsers(state.users);
        } catch (error) {
            ui.showError("Không thể kết nối danh sách người dùng toàn hệ thống.");
        }
    },

    // Client-side Search Filter
    handleSearch(keyword) {
        const cleanKeyword = keyword.toLowerCase().trim();
        const filtered = state.users.filter(user => 
            user.name.toLowerCase().includes(cleanKeyword) || 
            user.email.toLowerCase().includes(cleanKeyword)
        );
        ui.renderUsers(filtered);
    },

    // Xử lý Submit Form (Cả Create lẫn Update)
    async handleFormSubmit(e) {
        e.preventDefault();
        const name = ui.nameInput.value.trim();
        const email = ui.emailInput.value.trim();
        
        if(!name || !email) return;

        if (state.isEditing) {
            // [UPDATE CODE PATH]
            const id = parseInt(ui.idInput.value);
            try {
                const updatedData = await api.updateUser(id, { name, email });
                
                // Đồng bộ cập nhật mảng local state (không reload trang)
                state.users = state.users.map(u => u.id === id ? { ...u, name, email } : u);
                ui.renderUsers(state.users);
                ui.resetForm();
                ui.showSuccess("Cập nhật thông tin thành viên thành công!");
            } catch (error) {
                ui.showError("Thất bại: API không chấp nhận bản cập nhật này.");
            }
        } else {
            // [CREATE CODE PATH]
            try {
                const newUser = await api.createUser({ name, email });
                
                // Mẹo JSONPlaceholder luôn trả về mock id 11, ta ép ID ngẫu nhiên để tránh trùng key giao diện
                newUser.id = state.users.length > 0 ? Math.max(...state.users.map(u=>u.id)) + 1 : 1;
                
                state.users.unshift(newUser); // Đẩy lên đầu danh sách local
                ui.renderUsers(state.users);
                ui.userForm.reset();
                ui.showSuccess("Tạo mới thành viên thành công!");
            } catch (error) {
                ui.showError("Lỗi hệ thống: Không thể khởi tạo thành viên mới.");
            }
        }
    },

    // Điền sẵn data cũ lên form chuẩn bị sửa
    prepareEdit(id) {
        const targetUser = state.users.find(u => u.id === id);
        if(targetUser) ui.fillForm(targetUser);
    },

    // Xử lý nút xóa
    async handleDelete(id) {
        if (!confirm("Bạn có chắc chắn muốn xóa thành viên này ra khỏi danh bạ?")) return;
        
        try {
            await api.deleteUser(id);
            // Xóa trực tiếp trên mảng local state
            state.users = state.users.filter(u => u.id !== id);
            ui.renderUsers(state.users);
            ui.showSuccess("Đã xóa vĩnh viễn thành viên ra khỏi danh bạ.");
            
            // Nếu đang sửa chính user vừa bị xóa thì reset form
            if(state.isEditing && parseInt(ui.idInput.value) === id) {
                ui.resetForm();
            }
        } catch (error) {
            ui.showError("Lỗi: Không thể thực thi yêu cầu xóa vào lúc này.");
        }
    }
};

// ==========================================
// 4. EVENT LISTENERS ATTACHMENT
// ==========================================
document.addEventListener("DOMContentLoaded", () => actions.init());
ui.userForm.addEventListener("submit", (e) => actions.handleFormSubmit(e));
ui.cancelBtn.addEventListener("click", () => ui.resetForm());

// Debounce input tìm kiếm nhẹ để tránh render quá liên tục
ui.searchInput.addEventListener("input", (e) => actions.handleSearch(e.target.value));