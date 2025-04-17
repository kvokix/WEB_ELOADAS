const apiUrl = 'http://gamf.nhely.hu/ajax2/';
const code = 'EP9NEQvme375';

function validateInputs(name, height, weight) {
  const maxLen = 30;
  const errors = [];
  if (!name || name.length > maxLen) errors.push("Hibás név");
  if (!height || height.length > maxLen || isNaN(height)) errors.push("Hibás magasság");
  if (!weight || weight.length > maxLen) errors.push("Hibás súly");
  return errors;
}

function showFeedback(message, isError = false) {
  const div = document.getElementById('feedback');
  div.textContent = message;
  div.className = isError ? 'feedback error' : 'feedback';
}

function readData() {
  fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ op: 'read', code })
  })
  .then(res => res.json())
  .then(data => {
    let output = '';
    let sum = 0, max = -Infinity;

    data.list.forEach(item => {
      output += `ID: ${item.id}, Név: ${item.name}, Magasság: ${item.height}, Súly: ${item.weight}<br>`;
      sum += parseFloat(item.height);
      if (parseFloat(item.height) > max) max = parseFloat(item.height);
    });

    const avg = (sum / data.list.length).toFixed(2);
    output += `<br><br><strong>Magasságok összesen:</strong> ${sum}, Átlag: ${avg}, Legnagyobb: ${max}`;
    document.getElementById('output').innerHTML = output;
  });
}

function createData() {
  const name = document.getElementById('nameInput').value;
  const height = document.getElementById('heightInput').value;
  const weight = document.getElementById('colorInput').value;

  const errors = validateInputs(name, height, weight);
  if (errors.length) return showFeedback(errors.join(', '), true);

  fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      op: 'create',
      name, height, weight, code
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data == 1) showFeedback("Sikeres hozzáadás!");
    else showFeedback("Nem sikerült hozzáadni", true);
  });
}

function getDataForId() {
  const id = document.getElementById('idInput').value;
  if (!id) return showFeedback("Add meg az ID-t!", true);

  fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      op: 'read',
      code
    })
  })
  .then(res => res.json())
  .then(data => {
    const item = data.list.find(el => el.id === id);
    if (!item) return showFeedback("Nincs ilyen ID!", true);

    document.getElementById('nameInput').value = item.name;
    document.getElementById('heightInput').value = item.height;
    document.getElementById('colorInput').value = item.weight;
    showFeedback("Adatok betöltve, módosíthatók.");
  });
}

function updateData() {
  const id = document.getElementById('idInput').value;
  const name = document.getElementById('nameInput').value;
  const height = document.getElementById('heightInput').value;
  const weight = document.getElementById('colorInput').value;

  if (!id) return showFeedback("Hiányzó ID", true);
  const errors = validateInputs(name, height, weight);
  if (errors.length) return showFeedback(errors.join(', '), true);

  fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      op: 'update',
      id, name, height, weight, code
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data == 1) showFeedback("Sikeres módosítás!");
    else showFeedback("Nem sikerült módosítani", true);
  });
}

function deleteData() {
  const id = document.getElementById('deleteIdInput').value;
  if (!id) return showFeedback("Hiányzó ID", true);

  fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      op: 'delete',
      id, code
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data == 1) showFeedback("Sikeres törlés!");
    else showFeedback("Nem sikerült törölni", true);
  });
}
