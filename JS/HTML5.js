// Tabok közötti váltás
function showTab(id) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.style.display = 'none');
    document.getElementById(id).style.display = 'block';
}

// Web Worker példa
let worker;
function startWorker() {
    if (typeof(Worker) !== "undefined") {
        if (!worker) {
            worker = new Worker(URL.createObjectURL(new Blob([`
                onmessage = function(e) {
                    let result = 0;
                    for (let i = 0; i < 1000000000; i++) {
                        result += i;
                    }
                    postMessage(result);
                };
            `])));
        }
        worker.onmessage = function(event) {
            document.getElementById("workerResult").textContent = "Számolás eredménye: " + event.data;
        };
        worker.postMessage("Start");
    } else {
        document.getElementById("workerResult").textContent = "A böngésződ nem támogatja a Web Workereket.";
    }
}

// Drag & Drop példa
function allowDrop(ev) {
    ev.preventDefault();
}
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id || "dragItem");
    ev.target.id = "dragItem"; // biztosítjuk, hogy legyen id-je
}
function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const draggedElem = document.getElementById(data);
    ev.target.appendChild(draggedElem);
}

// Canvas példa
window.onload = function() {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "red";
    ctx.fillRect(10, 10, 150, 75);
};


// Szimulált SSE példa szerver nélkül
function simulateSSE() {
    const container = document.getElementById("sse");

    // Ellenőrizzük, hogy már ne induljon el újra
    if (container.dataset.active === "true") return;
    container.dataset.active = "true";

    // Létrehozunk vagy újra felhasználunk egy <p> elemet
    let display = document.getElementById("sse-output");
    if (!display) {
        display = document.createElement("p");
        display.id = "sse-output";
        container.appendChild(display);
    }

    const intervalId = setInterval(() => {
        display.textContent = "Jelenlegi idő: " + new Date().toLocaleTimeString();
    }, 1000);

    // Leállítás ha elnavigálunk máshová
    container.dataset.intervalId = intervalId;
}


// showTab módosítása, hogy az SSE simulatort csak akkor indítsa el
const originalShowTab = showTab;
showTab = function(id) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.style.display = 'none';
        if (tab.dataset.intervalId) {
            clearInterval(tab.dataset.intervalId);
            tab.dataset.active = "false";
        }
    });
    document.getElementById(id).style.display = 'block';
    if (id === 'sse') simulateSSE();
};
