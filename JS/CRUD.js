function addRow() {
    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value.trim();
    const city = document.getElementById("city").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!name || name.length < 2 || name.length > 20) return alert("Név mező érvénytelen.");
    if (!age || age < 1 || age > 120) return alert("Kor mező érvénytelen.");
    if (!city || city.length < 2 || city.length > 20) return alert("Város mező érvénytelen.");
    if (!email || !email.includes("@")) return alert("Email mező érvénytelen.");

    const table = document.getElementById("dataTable").getElementsByTagName('tbody')[0];
    const row = table.insertRow();
    row.innerHTML = `
        <td>${name}</td>
        <td>${age}</td>
        <td>${city}</td>
        <td>${email}</td>
        <td>
            <button onclick="editRow(this)">Szerkeszt</button>
            <button onclick="deleteRow(this)">Törlés</button>
        </td>
    `;
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("city").value = "";
    document.getElementById("email").value = "";
}

function deleteRow(btn) {
    const row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function editRow(btn) {
    const row = btn.parentNode.parentNode;
    const cells = row.getElementsByTagName("td");
    const name = prompt("Név:", cells[0].innerText);
    const age = prompt("Kor:", cells[1].innerText);
    const city = prompt("Város:", cells[2].innerText);
    const email = prompt("Email:", cells[3].innerText);

    if (!name || name.length < 2 || name.length > 20) return alert("Név érvénytelen.");
    if (!age || age < 1 || age > 120) return alert("Kor érvénytelen.");
    if (!city || city.length < 2 || city.length > 20) return alert("Város érvénytelen.");
    if (!email || !email.includes("@")) return alert("Email érvénytelen.");

    cells[0].innerText = name;
    cells[1].innerText = age;
    cells[2].innerText = city;
    cells[3].innerText = email;
}

function sortTable(colIndex) {
    const table = document.getElementById("dataTable");
    let switching = true;
    let dir = "asc";
    while (switching) {
        switching = false;
        const rows = table.rows;
        for (let i = 1; i < rows.length - 1; i++) {
            let shouldSwitch = false;
            const x = rows[i].getElementsByTagName("TD")[colIndex];
            const y = rows[i + 1].getElementsByTagName("TD")[colIndex];
            const valX = x.innerText.toLowerCase();
            const valY = y.innerText.toLowerCase();
            if ((dir === "asc" && valX > valY) || (dir === "desc" && valX < valY)) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        } else if (dir === "asc") {
            dir = "desc";
            switching = true;
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("keyup", function () {
        const filter = this.value.toLowerCase();
        const rows = document.getElementById("dataTable").getElementsByTagName("tbody")[0].rows;
        for (let i = 0; i < rows.length; i++) {
            const rowText = rows[i].innerText.toLowerCase();
            rows[i].style.display = rowText.includes(filter) ? "" : "none";
        }
    });
});
