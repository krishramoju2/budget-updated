let categories = JSON.parse(localStorage.getItem('categories')) || [];
let amounts = JSON.parse(localStorage.getItem('amounts')) || [];

const ctx = document.getElementById("expense-chart").getContext("2d");
const pieChart = new Chart(ctx, {
  type: "pie",
  data: {
    labels: categories,
    datasets: [{
      data: amounts,
      backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56',
        '#66bb6a', '#ab47bc', '#ffa726', '#26a69a'
      ],
      borderColor: "#ffffff",
      borderWidth: 2
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom"
      }
    }
  }
});

document.getElementById("expense-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const category = document.getElementById("category").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);

  if (category && !isNaN(amount) && amount > 0) {
    categories.push(category);
    amounts.push(amount);

    localStorage.setItem("categories", JSON.stringify(categories));
    localStorage.setItem("amounts", JSON.stringify(amounts));

    pieChart.data.labels = categories;
    pieChart.data.datasets[0].data = amounts;
    pieChart.update();

    this.reset();
  }
});
