let budgetData = {
    surplus: 27110,
    categories: [
        {
            name: "Transportation",
            monthly: 689,
            yearly: 8270,
            subcategories: [
                { name: "Running costs / Petrol / Fuel", monthly: 150, yearly: 1800 },
                { name: "Registration & Third Party", monthly: 158, yearly: 1900 },
                // Add other subcategories here
            ]
        },
        // Add other categories here
    ],
    income: [
        { name: "Name 1", monthly: 5434, yearly: 65232 },
        { name: "Name 2", monthly: 6632, yearly: 83700 }
    ]
};

function updateIncomeName(oldName, newName) {
    const incomeItem = budgetData.income.find(inc => inc.name === oldName);
    if (incomeItem) {
        incomeItem.name = newName;
        saveBudgetData();
    }
}

function loadBudgetData() {
    const savedData = localStorage.getItem('budgetData');
    if (savedData) {
        budgetData = JSON.parse(savedData);
    }
}

function saveBudgetData() {
    try {
        localStorage.setItem('budgetData', JSON.stringify(budgetData));
    } catch (error) {
        console.error('Error saving budget data:', error);
        alert('Failed to save budget data. Please try again.');
    }
}

function exportData() {
    const dataStr = JSON.stringify(budgetData);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'budget_data.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedData = JSON.parse(e.target.result);
                Object.assign(budgetData, importedData);
                saveBudgetData();
                initApp();
                alert('Data imported successfully!');
            } catch (error) {
                alert('Error importing data. Please check the file format.');
            }
        };
        reader.readAsText(file);
    };
    input.click();
}