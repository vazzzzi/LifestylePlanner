function validateNumber(value, fieldName) {
    if (isNaN(value) || value === '') {
        alert(`Please enter a valid number for ${fieldName}.`);
        return false;
    }
    return true;
}

function validateString(value, fieldName) {
    if (value.trim() === '') {
        alert(`Please enter a valid ${fieldName}.`);
        return false;
    }
    return true;
}