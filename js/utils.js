const Utils = {
    validateTaskText(text) {
        if (!text || text.trim() === '') {
            return 'Task string cannot be empty!';
        }
        if (text.length > 100) {
            return 'Task must be under 100 characters.';
        }
        return null;
    },
    exportJSON(data) {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `tasks_backup_${Date.now()}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
    }
};
