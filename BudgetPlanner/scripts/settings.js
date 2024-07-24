let settings = {
    currency: '$',
    notifications: true
};

function loadSettings() {
    const savedSettings = localStorage.getItem('budgetSettings');
    if (savedSettings) {
        settings = JSON.parse(savedSettings);
    }
}

function saveSettings() {
    localStorage.setItem('budgetSettings', JSON.stringify(settings));
}

function showSettingsPage() {
    const main = document.getElementById('main-content');
    main.innerHTML = `
        <h2>Settings</h2>
        <div>
            <label for="currency">Currency:</label>
            <input type="text" id="currency" value="${settings.currency}">
        </div>
        <div>
            <label for="notifications">Enable Notifications:</label>
            <input type="checkbox" id="notifications" ${settings.notifications ? 'checked' : ''}>
        </div>
        <button id="save-settings">Save Settings</button>
    `;

    document.getElementById('save-settings').addEventListener('click', () => {
        settings.currency = document.getElementById('currency').value;
        settings.notifications = document.getElementById('notifications').checked;
        saveSettings();
        alert('Settings saved!');
    });
}