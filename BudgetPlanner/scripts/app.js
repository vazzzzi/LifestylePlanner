function initApp() {
    loadBudgetData();
    loadSettings();
    if (budgetData.income.length === 0) {
        showNameInputPage();
    } else {
        renderCategoryList();
        showHomePage();
    }
    setupNavigation();
}

function showNameInputPage() {
    const main = document.getElementById('main-content');
    main.innerHTML = `
        <h2>Welcome to Budget Planner</h2>
        <p>Please enter your name(s):</p>
        <input type="text" id="name1" placeholder="Name 1">
        <input type="text" id="name2" placeholder="Name 2 (optional)">
        <button id="save-names">Save Names</button>
    `;

    document.getElementById('save-names').addEventListener('click', () => {
        const name1 = document.getElementById('name1').value.trim();
        const name2 = document.getElementById('name2').value.trim();

        if (validateString(name1, 'Name 1')) {
            budgetData.income = [{ name: name1, monthly: 0, yearly: 0 }];
            if (name2) {
                budgetData.income.push({ name: name2, monthly: 0, yearly: 0 });
            }
            saveBudgetData();
            showIncomePage();
        }
    });
}

function showIncomePage() {
    const main = document.getElementById('main-content');
    main.innerHTML = `
        <h2>Income</h2>
        <ul id="income-list">
            ${budgetData.income.map(inc => `
                <li class="income-item" data-name="${inc.name}">
                    ${inc.name}: $${inc.monthly}/mo | $${inc.yearly}/yr
                    <button class="edit-name" data-name="${inc.name}">Edit Name</button>
                </li>
            `).join('')}
        </ul>
        <button id="add-income">Add Income</button>
    `;

    document.querySelectorAll('.income-item').forEach(item => {
        item.addEventListener('click', () => editIncome(item.dataset.name));
    });

    document.querySelectorAll('.edit-name').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            editName(button.dataset.name);
        });
    });

    document.getElementById('add-income').addEventListener('click', addIncome);
}

function editName(oldName) {
    const newName = prompt(`Enter new name for ${oldName}:`);
    if (validateString(newName, 'Name')) {
        updateIncomeName(oldName, newName);
        showIncomePage();
    }
}

function addIncome() {
    const name = prompt('Enter name for new income:');
    if (validateString(name, 'Name')) {
        const monthly = prompt('Enter monthly income:');
        const yearly = prompt('Enter yearly income:');
        if (validateNumber(monthly, 'monthly income') && validateNumber(yearly, 'yearly income')) {
            budgetData.income.push({ name, monthly: Number(monthly), yearly: Number(yearly) });
            saveBudgetData();
            showIncomePage();
        }
    }
}

function showHomePage() {
    const main = document.getElementById('main-content');
    main.innerHTML = `
        <h2>Welcome to Budget Planner</h2>
        <p>Select a category to view details.</p>
        <div class="chart-container">
            <canvas id="expenseChart"></canvas>
        </div>
        <div class="data-management">
            <button id="export-data">Export Data</button>
            <button id="import-data">Import Data</button>
        </div>
    `;
    renderExpenseChart();

    document.getElementById('export-data').addEventListener('click', exportData);
    document.getElementById('import-data').addEventListener('click', importData);
}

function renderExpenseChart() {
    const ctx = document.getElementById('expenseChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: budgetData.categories.map(cat => cat.name),
            datasets: [{
                data: budgetData.categories.map(cat => cat.yearly),
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF'
                ]
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Yearly Expenses by Category'
            }
        }
    });
}

function setupNavigation() {
    document.getElementById('nav-home').addEventListener('click', showHomePage);
    document.getElementById('nav-income').addEventListener('click', showIncomePage);
    document.getElementById('nav-categories').addEventListener('click', showCategoryManagementPage);
    document.getElementById('nav-search').addEventListener('click', showSearchPage);
    document.getElementById('nav-settings').addEventListener('click', showSettingsPage);
}

function showCategoryManagementPage() {
    // Implement this function
}

function showSearchPage() {
    // Implement this function
}

window.onload = initApp;