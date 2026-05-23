const StorageHandler = {
    save(tasks) {
        try {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        } catch (e) {
            console.error("Error saving data to localStorage", e);
        }
    },
    load() {
        const data = localStorage.getItem('tasks');
        return data ? JSON.parse(data) : [];
    },
    saveTheme(theme) {
        localStorage.setItem('app-theme', theme);
    },
    getTheme() {
        return localStorage.getItem('app-theme') || 'light';
    },
    setSoundEnabled(enabled) {
        localStorage.setItem('app-sound', enabled ? 'true' : 'false');
    },
    getSoundEnabled() {
        return localStorage.getItem('app-sound') !== 'false';
    }
};
