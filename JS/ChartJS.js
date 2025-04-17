const ctx = document.getElementById('lineChart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['1', '2', '3', '4', '5'],
    datasets: [{
      label: 'Kiválasztott sor adatai',
      data: [],
      borderColor: 'blue',
      backgroundColor: 'lightblue',
      fill: false,
      tension: 0.1
    }]
  },
  options: {
    responsive: false,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

const table = document.getElementById('dataTable');
table.addEventListener('click', function(event) {
  const row = event.target.closest('tr');
  if (!row) return;

  const values = Array.from(row.children).map(cell => parseFloat(cell.textContent));
  chart.data.datasets[0].data = values;
  chart.update();
});