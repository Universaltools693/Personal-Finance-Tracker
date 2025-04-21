// Finance Tracker Logic
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
const chart = document.getElementById('finance-chart').getContext('2d');
let financeChart;

// Initialize Chart
function initChart() {
    financeChart = new Chart(chart, {
        type: 'pie',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: ['#3b82f6', '#ef4444', '#10b981', '#f59e0b'],
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' }
            }
        }
    });
}

// Update Chart
function updateChart() {
    const categories = {};
    transactions.forEach(t => {
        categories[t.category] = (categories[t.category] || 0) + t.amount;
    });
    financeChart.data.labels = Object.keys(categories);
    financeChart.data.datasets[0].data = Object.values(categories);
    financeChart.update();
}

// Display Transactions
function displayTransactions() {
    const list = document.getElementById('transaction-list');
    list.innerHTML = '';
    transactions.forEach((t, index) => {
        const div = document.createElement('div');
        div.className = `transaction p-4 my-2 bg-gray-700 rounded flex justify-between items-center`;
        div.innerHTML = `
            <span>${t.type.toUpperCase()}: $${t.amount} (${t.category})</span>
            <button onclick="deleteTransaction(${index})" class="text-red-500 hover:text-red-700">Delete</button>
        `;
        list.appendChild(div);
    });
}

// Add Transaction
document.getElementById('finance-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;
    const category = document.getElementById('category').value;
    transactions.push({ amount, type, category });
    localStorage.setItem('transactions', JSON.stringify(transactions));
    displayTransactions();
    updateChart();
    e.target.reset();
});

// Delete Transaction
function deleteTransaction(index) {
    transactions.splice(index, 1);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    displayTransactions();
    updateChart();
}

// Ad Placeholder Logic
window.addEventListener('load', () => {
    // Simulate Pop-up Ad after 3 seconds
    setTimeout(() => {
        document.getElementById('popup-ad').classList.remove('hidden');
        setTimeout(() => {
            document.getElementById('popup-ad').classList.add('hidden');
        }, 5000);
    }, 3000);
});

// Initialize
initChart();
displayTransactions();
updateChart();
