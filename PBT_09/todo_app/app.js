var form = document.getElementById("todoForm");
var input = document.getElementById("todoInput");
var list = document.getElementById("todoList");
var itemCount = document.getElementById("itemCount");
var clearBtn = document.getElementById("clearCompleted");

var todos = [];
var currentFilter = "all";

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
    var data = localStorage.getItem("todos");
    if (data) {
        todos = JSON.parse(data);
        hienThiTodos();
    }
}

function hienThiTodos() {
    list.innerHTML = "";
    
    for (var i = 0; i < todos.length; i++) {
        var todo = todos[i];
        
        if (currentFilter === "active" && todo.completed === true) {
            continue;
        }
        if (currentFilter === "completed" && todo.completed === false) {
            continue;
        }
        
        var li = document.createElement("li");
        li.id = "todo-" + todo.id;
        
        if (todo.completed === true) {
            li.className = "completed";
        }
        
        var span = document.createElement("span");
        span.className = "todo-text";
        span.textContent = todo.text;
        
        var btn = document.createElement("button");
        btn.className = "delete-btn";
        btn.textContent = "❌";
        
        li.appendChild(span);
        li.appendChild(btn);
        list.appendChild(li);
    }
    
    demTodo();
}

function demTodo() {
    var count = 0;
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].completed === false) {
            count = count + 1;
        }
    }
    itemCount.textContent = count + " việc còn lại";
}

function themTodo(text) {
    var todo = {
        id: Date.now(),
        text: text,
        completed: false
    };
    todos.push(todo);
    saveTodos();
    hienThiTodos();
}

function xoaTodo(id) {
    var arr = [];
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].id !== id) {
            arr.push(todos[i]);
        }
    }
    todos = arr;
    saveTodos();
    hienThiTodos();
}

function toggleTodo(id) {
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].id === id) {
            if (todos[i].completed === true) {
                todos[i].completed = false;
            } else {
                todos[i].completed = true;
            }
        }
    }
    saveTodos();
    hienThiTodos();
}

form.addEventListener("submit", function(e) {
    e.preventDefault();
    var text = input.value.trim();
    if (text !== "") {
        themTodo(text);
        input.value = "";
    }
});

list.addEventListener("click", function(e) {
    var clicked = e.target;
    var li = clicked.parentElement;
    
    if (li.tagName !== "LI") {
        return;
    }
    
    var liId = li.id;
    var id = Number(liId.replace("todo-", ""));
    
    if (clicked.className === "delete-btn") {
        xoaTodo(id);
    }
    
    if (clicked.className === "todo-text") {
        toggleTodo(id);
    }
});

list.addEventListener("dblclick", function(e) {
    if (e.target.className !== "todo-text") {
        return;
    }
    
    var li = e.target.parentElement;
    var liId = li.id;
    var id = Number(liId.replace("todo-", ""));
    
    var todo = null;
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].id === id) {
            todo = todos[i];
        }
    }
    
    var editInput = document.createElement("input");
    editInput.type = "text";
    editInput.className = "edit-input";
    editInput.value = todo.text;
    
    e.target.style.display = "none";
    li.insertBefore(editInput, e.target);
    editInput.focus();
    
    editInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            var newText = editInput.value.trim();
            if (newText !== "") {
                todo.text = newText;
                saveTodos();
            }
            hienThiTodos();
        }
    });
    
    editInput.addEventListener("blur", function() {
        hienThiTodos();
    });
});

var filterBtns = document.querySelectorAll(".filter-btn");
for (var i = 0; i < filterBtns.length; i++) {
    filterBtns[i].addEventListener("click", function() {
        for (var j = 0; j < filterBtns.length; j++) {
            filterBtns[j].className = "filter-btn";
        }
        this.className = "filter-btn active";
        
        if (this.textContent === "Tất cả") {
            currentFilter = "all";
        }
        if (this.textContent === "Chưa xong") {
            currentFilter = "active";
        }
        if (this.textContent === "Đã xong") {
            currentFilter = "completed";
        }
        
        hienThiTodos();
    });
}

clearBtn.addEventListener("click", function() {
    var arr = [];
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].completed === false) {
            arr.push(todos[i]);
        }
    }
    todos = arr;
    saveTodos();
    hienThiTodos();
});

loadTodos();