var soAnh = 9;
var viTri = 0;
var dangChay = false;
var timer = null;

var gallery = document.getElementById("gallery");
var mainImage = document.getElementById("mainImage");
var imageCounter = document.getElementById("imageCounter");
var prevBtn = document.getElementById("prevBtn");
var nextBtn = document.getElementById("nextBtn");
var playBtn = document.getElementById("playBtn");
var commandPalette = document.getElementById("commandPalette");
var commandInput = document.getElementById("commandInput");
var commandList = document.getElementById("commandList");
var imageModal = document.getElementById("imageModal");
var modalImage = document.getElementById("modalImage");
var closeBtn = document.getElementById("closeBtn");

function taoThumbnails() {
    var i = 0;
    while (i < soAnh) {
        var img = document.createElement("img");
        img.src = "https://placehold.co/80x60?text=" + (i + 1);
        img.id = "thumb" + i;
        if (i === 0) {
            img.className = "thumb active";
        } else {
            img.className = "thumb";
        }
        gallery.appendChild(img);
        i = i + 1;
    }
}

function capNhatAnh() {
    mainImage.src = "https://placehold.co/600x400?text=Anh+" + (viTri + 1);
    imageCounter.textContent = (viTri + 1) + " / " + soAnh;
    
    var i = 0;
    while (i < soAnh) {
        var thumb = document.getElementById("thumb" + i);
        if (i === viTri) {
            thumb.className = "thumb active";
        } else {
            thumb.className = "thumb";
        }
        i = i + 1;
    }
}

function anhSau() {
    viTri = viTri + 1;
    if (viTri >= soAnh) {
        viTri = 0;
    }
    capNhatAnh();
}

function anhTruoc() {
    viTri = viTri - 1;
    if (viTri < 0) {
        viTri = soAnh - 1;
    }
    capNhatAnh();
}

function denAnh(so) {
    viTri = so;
    capNhatAnh();
}

function playPause() {
    if (dangChay === false) {
        dangChay = true;
        playBtn.textContent = "⏸️ Pause";
        timer = setInterval(anhSau, 2000);
    } else {
        dangChay = false;
        playBtn.textContent = "▶️ Play";
        clearInterval(timer);
    }
}

function moCommand() {
    commandPalette.className = "command-palette show";
    commandInput.value = "";
    commandInput.focus();
    hienCommand();
}

function dongCommand() {
    commandPalette.className = "command-palette";
}

function hienCommand() {
    commandList.innerHTML = "";
    
    var li1 = document.createElement("li");
    li1.innerHTML = "Ảnh tiếp theo <span class='shortcut'>→</span>";
    commandList.appendChild(li1);
    
    var li2 = document.createElement("li");
    li2.innerHTML = "Ảnh trước <span class='shortcut'>←</span>";
    commandList.appendChild(li2);
    
    var li3 = document.createElement("li");
    li3.innerHTML = "Play/Pause <span class='shortcut'>Space</span>";
    commandList.appendChild(li3);
    
    var li4 = document.createElement("li");
    li4.innerHTML = "Đóng <span class='shortcut'>Esc</span>";
    commandList.appendChild(li4);
}

function moModal() {
    modalImage.src = "https://placehold.co/600x400?text=Anh+" + (viTri + 1);
    imageModal.className = "image-modal show";
}

function dongModal() {
    imageModal.className = "image-modal";
}

gallery.onclick = function(e) {
    if (e.target.tagName === "IMG") {
        var id = e.target.id;
        var so = id.charAt(5);
        denAnh(Number(so));
    }
};

prevBtn.onclick = anhTruoc;
nextBtn.onclick = anhSau;
playBtn.onclick = playPause;

mainImage.onclick = moModal;
closeBtn.onclick = dongModal;

imageModal.onclick = function(e) {
    if (e.target === imageModal) {
        dongModal();
    }
};

commandInput.oninput = hienCommand;

commandPalette.onclick = function(e) {
    if (e.target === commandPalette) {
        dongCommand();
    }
};

document.onkeydown = function(e) {
    var paletteHien = commandPalette.className === "command-palette show";
    var modalHien = imageModal.className === "image-modal show";
    
    if (paletteHien === true) {
        if (e.key === "Escape") {
            dongCommand();
        }
        return;
    }
    
    if (modalHien === true) {
        if (e.key === "Escape") {
            dongModal();
        }
        if (e.key === "ArrowRight") {
            anhSau();
            modalImage.src = "https://placehold.co/600x400?text=Anh+" + (viTri + 1);
        }
        if (e.key === "ArrowLeft") {
            anhTruoc();
            modalImage.src = "https://placehold.co/600x400?text=Anh+" + (viTri + 1);
        }
        return;
    }
    
    if (e.ctrlKey === true && e.key === "k") {
        e.preventDefault();
        moCommand();
        return;
    }
    
    if (e.key === "ArrowRight") {
        anhSau();
    }
    if (e.key === "ArrowLeft") {
        anhTruoc();
    }
    if (e.key === " ") {
        e.preventDefault();
        playPause();
    }
    if (e.key === "Escape") {
        dongModal();
    }
    
    if (e.key === "1") { denAnh(0); }
    if (e.key === "2") { denAnh(1); }
    if (e.key === "3") { denAnh(2); }
    if (e.key === "4") { denAnh(3); }
    if (e.key === "5") { denAnh(4); }
    if (e.key === "6") { denAnh(5); }
    if (e.key === "7") { denAnh(6); }
    if (e.key === "8") { denAnh(7); }
    if (e.key === "9") { denAnh(8); }
};

taoThumbnails();
capNhatAnh();