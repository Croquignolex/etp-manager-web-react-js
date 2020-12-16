export function getLocaleStorageItem(key) {
    const data = localStorage.getItem(key);
    return JSON.parse(data);
}

export function setLocaleStorageItem(key, value) {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
}

export function removeLocaleStorageItem(key) {
    localStorage.removeItem(key);
}

export function removeAllLocaleStorageItems() {
    localStorage.clear();
}