function showTab(id) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

// Web Worker (minta, külön fájl nélkül működik itt)
let worker;
function startWorker() {
    if (window.Worker) {
        const blob = new Blob([`onmessage = () => postMessage("A worker működik!");`], { type: "application/javascript" });
        const url = URL.createObjectURL(blob);
        worker = new Worker(url);
        worker.onmessage = e => document.getElementById("workerResult").textContent = e.data;
        worker.postMessage("");
    } else {
        alert("A böngésző nem támogatja a Workert.");
    }
}

// Geolocation
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            document.getElementById("geoResult").innerText = 
                `Szélesség: ${pos.coords.latitude}, Hosszúság: ${pos.coords.longitude}`;
        });
    } else {
        alert("A böngésző nem támogatja a geolokációt.");
    }
}

// Drag and drop
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.innerHTML);
}

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    ev.target.innerHTML = data;
}

// Canvas rajzolás
window.onload = function () {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "red";
    ctx.fillRect(20, 20, 150, 50);
};