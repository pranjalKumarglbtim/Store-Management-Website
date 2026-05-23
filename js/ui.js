class TaskUI {
    constructor() {
        this.taskList = document.getElementById("taskList");
        this.audioContext = null;
    }

    render(tasks, filter = "all", searchQuery = "") {
        if (!this.taskList) {
            this.taskList = document.getElementById("taskList");
            if (!this.taskList) return;
        }
        this.taskList.innerHTML = "";

        let filtered = tasks.filter(task => {
            if (filter === "active") return !task.completed;
            if (filter === "completed") return task.completed;
            return true;
        });

        if (searchQuery) {
            filtered = filtered.filter(task =>
                task.text.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (filtered.length === 0) {
            this.taskList.innerHTML = `
                <li class="text-[#6b7280] text-xs py-4">
                    &gt; no tasks found
                </li>`;
            return;
        }

        filtered.forEach(task => {
            const li = document.createElement("li");
            const priorityLabel = task.priority.padEnd(6, " ");

            li.className = "flex items-center gap-2 py-1 text-xs";
            li.setAttribute("data-id", task.id);
            li.setAttribute("draggable", "true");

            const checkbox = task.completed 
                ? '<svg class="w-4 h-4 text-[#22c55e]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>'
                : '<svg class="w-4 h-4 text-[#6b7280]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>';
            const statusColor = task.completed ? "text-[#22c55e]" : "text-[#6b7280]";
            const textDecoration = task.completed ? "line-through opacity-60" : "";

            li.innerHTML = `
                <span class="${statusColor} cursor-pointer" data-action="toggle">${checkbox}</span>
                <span class="text-[#6b7280]">[${priorityLabel}]</span>
                <span class="task-text ${textDecoration} flex-1 cursor-text" contenteditable="true">${this.escapeHtml(task.text)}</span>
                <span class="text-[#6b7280] text-[10px] hidden group-hover:inline">${task.dueDate || ""}</span>
                <button class="text-[#ef4444] opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity" data-action="delete">
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6h18"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
                        <line x1="8" y1="6" x2="8" y2="2"/>
                        <line x1="16" y1="6" x2="16" y2="2"/>
                    </svg>
                </button>
            `;
            this.taskList.appendChild(li);
        });
    }

    updateStats(tasks) {
        const total = tasks.length;
        const completed = tasks.filter(t => t.completed).length;
        const active = total - completed;

        document.getElementById("totalTasks").textContent = total;
        document.getElementById("activeTasks").textContent = active;
        document.getElementById("completedTasks").textContent = completed;
    }

    escapeHtml(text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
    }

    initAudio() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.audioContext.state === "suspended") {
            this.audioContext.resume();
        }
    }

    playSound(type = "success") {
        if (!window.soundEnabled) return;
        try {
            this.initAudio();
            const oscillator = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            oscillator.connect(gain);
            gain.connect(this.audioContext.destination);
            const freq = type === "success" ? 800 : 400;
            oscillator.frequency.value = freq;
            gain.gain.setValueAtTime(0.2, this.audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.1);
        } catch (e) {}
    }
}
