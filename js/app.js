class App {
    constructor() {
        this.tasks = StorageHandler.load();
        this.ui = new TaskUI();
        this.currentFilter = "all";
        this.searchQuery = "";
        this.soundEnabled = StorageHandler.getSoundEnabled();
        window.soundEnabled = this.soundEnabled;
        this.init();
        this.startClock();
    }

    startClock() {
        const updateTime = () => {
            const now = new Date();
            const dateEl = document.getElementById("currentDate");
            const timeEl = document.getElementById("currentTime");
            if (dateEl) dateEl.textContent = now.toLocaleDateString();
            if (timeEl) timeEl.textContent = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        };
        updateTime();
        setInterval(updateTime, 1000);
    }

    checkAuth() {
        const user = Auth.getCurrentUser();
        if (!user) {
            const overlay = document.getElementById("authOverlay");
            const card = document.getElementById("authCard");
            if (overlay && card) {
                overlay.classList.add("visible");
                card.style.opacity = "1";
                card.style.transform = "scale(1)";
            }
            return false;
        }
        this.setupAuthUI(user);
        return true;
    }

    setupAuthUI(user) {
        const overlay = document.getElementById("authOverlay");
        const card = document.getElementById("authCard");
        if (overlay && card) {
            overlay.classList.remove("visible");
        }
        document.getElementById("currentUser").textContent = user.username;
        document.getElementById("userRole").textContent = user.role;
        
        if (user.role !== "admin") {
            document.querySelectorAll("[data-role-admin]").forEach(el => {
                el.style.display = "none";
            });
        }
    }

    init() {
        this.checkAuth();
        this.ui.render(this.tasks, this.currentFilter, this.searchQuery);
        this.ui.updateStats(this.tasks);
        this.setupEventListeners();
        this.setupAuthEventListeners();
    }

    setupAuthEventListeners() {
        const loginForm = document.getElementById("loginForm");
        const usernameInput = document.getElementById("loginUsername");
        const passwordInput = document.getElementById("loginPassword");
        const loginRole = document.getElementById("loginRole");
        
        if (!usernameInput || !passwordInput || !loginForm) {
            setTimeout(() => this.setupAuthEventListeners(), 100);
            return;
        }
        
        usernameInput.tabIndex = 0;
        usernameInput.setAttribute("tabindex", "0");
        usernameInput.style.display = "block";
        usernameInput.style.visibility = "visible";
        usernameInput.setAttribute("autocomplete", "username");
        usernameInput.disabled = false;
        usernameInput.readOnly = false;
        
        passwordInput.tabIndex = 0;
        passwordInput.setAttribute("tabindex", "0");
        passwordInput.style.display = "block";
        passwordInput.style.visibility = "visible";
        passwordInput.setAttribute("autocomplete", "current-password");
        passwordInput.disabled = false;
        passwordInput.readOnly = false;
        
        if (loginRole) {
            loginRole.tabIndex = 0;
            loginRole.setAttribute("tabindex", "0");
        }

        // Force enable inputs immediately (fixes disabled appearance)
        usernameInput.disabled = false;
        usernameInput.readOnly = false;
        passwordInput.disabled = false;
        passwordInput.readOnly = false;

        // Ensure clicks reach the inputs
        usernameInput.addEventListener("mousedown", () => usernameInput.focus());
        passwordInput.addEventListener("mousedown", () => passwordInput.focus());

        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const username = document.getElementById("loginUsername").value;
            const password = document.getElementById("loginPassword").value;
            const role = document.getElementById("loginRole").value;
            try {
                const user = Auth.login(username, password, role);
                this.setupAuthUI(user);
                loginForm.reset();
            } catch (err) {
                document.getElementById("loginError").textContent = err.message;
                document.getElementById("loginError").classList.remove("hidden");
            }
        });

        const logoutBtn = document.getElementById("logoutBtn");
        if (logoutBtn) {
            logoutBtn.addEventListener("click", () => {
                Auth.logout();
                window.location.reload();
            });
        }

        // Sidebar logout button (in task adding / actions section)
        const sidebarLogoutBtn = document.getElementById("sidebarLogoutBtn");
        if (sidebarLogoutBtn) {
            sidebarLogoutBtn.addEventListener("click", () => {
                Auth.logout();
                window.location.reload();
            });
        }

        // === New unified registration flow (single Register button + form + success message + manual login) ===
        const showRegisterBtn = document.getElementById("showRegisterBtn");
        const registerFormEl = document.getElementById("registerForm");
        const backToLoginBtn = document.getElementById("backToLoginBtn");
        const regUsername = document.getElementById("regUsername");
        const regPassword = document.getElementById("regPassword");
        const regRole = document.getElementById("regRole");
        const registerError = document.getElementById("registerError");
        const registerSuccess = document.getElementById("registerSuccess");

        if (showRegisterBtn && registerFormEl) {
            showRegisterBtn.addEventListener("click", () => {
                document.getElementById("loginForm").classList.add("hidden");
                const actions = document.getElementById("authActions");
                if (actions) actions.classList.add("hidden");
                registerFormEl.classList.remove("hidden");

                // Clear any previous messages
                if (registerError) registerError.classList.add("hidden");
                if (registerSuccess) registerSuccess.classList.add("hidden");

                if (regUsername) setTimeout(() => regUsername.focus(), 50);
            });
        }

        if (backToLoginBtn && registerFormEl) {
            backToLoginBtn.addEventListener("click", () => {
                registerFormEl.classList.add("hidden");
                document.getElementById("loginForm").classList.remove("hidden");
                const actions = document.getElementById("authActions");
                if (actions) actions.classList.remove("hidden");

                // Clear messages when going back
                if (registerError) registerError.classList.add("hidden");
                if (registerSuccess) registerSuccess.classList.add("hidden");
            });
        }

        if (registerFormEl) {
            registerFormEl.addEventListener("submit", (e) => {
                e.preventDefault();

                const username = regUsername ? regUsername.value.trim() : "";
                const password = regPassword ? regPassword.value : "";
                const role = regRole ? regRole.value : "cashier";

                // Clear previous messages
                if (registerError) registerError.classList.add("hidden");
                if (registerSuccess) registerSuccess.classList.add("hidden");

                if (!username || !password) {
                    if (registerError) {
                        registerError.textContent = "Username and password are required";
                        registerError.classList.remove("hidden");
                    }
                    return;
                }

                try {
                    // Register the new user (no auto-login)
                    Auth.register(username, password, role);

                    // Show success message
                    if (registerSuccess) {
                        registerSuccess.textContent = "Registration successful! Please login below.";
                        registerSuccess.classList.remove("hidden");
                    }

                    // Pre-fill login username for convenience
                    const loginUsernameInput = document.getElementById("loginUsername");
                    if (loginUsernameInput) {
                        loginUsernameInput.value = username;
                    }

                    // Reset the registration form fields
                    registerFormEl.reset();

                    // After a short delay, switch back to login form so user can manually log in
                    setTimeout(() => {
                        registerFormEl.classList.add("hidden");
                        const actions = document.getElementById("authActions");
                        if (actions) actions.classList.remove("hidden");
                        const loginForm = document.getElementById("loginForm");
                        if (loginForm) loginForm.classList.remove("hidden");

                        // Hide success message after switching
                        if (registerSuccess) registerSuccess.classList.add("hidden");
                    }, 1400);

                } catch (err) {
                    if (registerError) {
                        registerError.textContent = err.message;
                        registerError.classList.remove("hidden");
                    }
                }
            });
        }
    }

    setupEventListeners() {
        const form = document.getElementById("taskForm");
        const taskInput = document.getElementById("taskInput");
        const priorityInput = document.getElementById("taskPriority");
        const dateInput = document.getElementById("taskDueDate");
        const errorMsg = document.getElementById("errorMsg");

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const text = taskInput.value.trim();
            const error = Utils.validateTaskText(text);
            if (error) {
                errorMsg.textContent = error;
                return;
            }
            errorMsg.textContent = "";
            const newTask = {
                id: Date.now(),
                text: text,
                priority: priorityInput.value,
                dueDate: dateInput.value || null,
                completed: false
            };
            this.tasks.push(newTask);
            this.ui.playSound("success");
            this.syncState();
            form.reset();
            taskInput.focus();
        });

        this.ui.taskList.addEventListener("click", (e) => {
            const li = e.target.closest("li");
            if (!li) return;
            const id = parseInt(li.getAttribute("data-id"));
            if (e.target.dataset.action === "toggle") {
                const task = this.tasks.find(t => t.id === id);
                task.completed = !task.completed;
                if (task.completed) this.ui.playSound("success");
                this.syncState();
            } else if (e.target.dataset.action === "delete") {
                this.tasks = this.tasks.filter(t => t.id !== id);
                this.ui.playSound("delete");
                this.syncState();
            }
        });

        this.ui.taskList.addEventListener("focusout", (e) => {
            if (e.target.classList.contains("task-text")) {
                const li = e.target.closest("li");
                if (!li) return;
                const id = parseInt(li.getAttribute("data-id"));
                const updatedText = e.target.textContent.trim();
                if (updatedText) {
                    const task = this.tasks.find(t => t.id === id);
                    if (task) {
                        task.text = updatedText;
                        StorageHandler.save(this.tasks);
                    }
                }
            }
        });

        document.querySelectorAll(".filter-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                document.querySelectorAll(".filter-btn").forEach(b => b.classList.replace("bg-[#22c55e]", "bg-[#222]"));
                e.target.classList.replace("bg-[#222]", "bg-[#22c55e]");
                this.currentFilter = e.target.getAttribute("data-filter");
                this.ui.render(this.tasks, this.currentFilter, this.searchQuery);
            });
        });

        document.getElementById("searchBar").addEventListener("input", (e) => {
            this.searchQuery = e.target.value;
            this.ui.render(this.tasks, this.currentFilter, this.searchQuery);
        });

        document.getElementById("themeToggle").addEventListener("click", () => {
            const currentTheme = document.documentElement.getAttribute("data-theme");
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            document.documentElement.setAttribute("data-theme", newTheme);
            StorageHandler.saveTheme(newTheme);
        });

        document.getElementById("clearCompleted").addEventListener("click", () => {
            const initialCount = this.tasks.length;
            this.tasks = this.tasks.filter(t => !t.completed);
            if (this.tasks.length < initialCount) this.ui.playSound("delete");
            this.syncState();
        });

        document.getElementById("backupData").addEventListener("click", () => {
            Utils.exportJSON(this.tasks);
            this.ui.playSound("success");
        });

        window.addEventListener("keydown", (e) => {
            if (e.altKey && e.key === "n") {
                e.preventDefault();
                document.getElementById("taskInput").focus();
            }
        });

        this.setupDragAndDrop();
    }

    setupDragAndDrop() {
        this.ui.taskList.addEventListener("dragstart", (e) => {
            const li = e.target.closest("li");
            if (li) li.classList.add("opacity-50");
        });
        this.ui.taskList.addEventListener("dragend", (e) => {
            const li = e.target.closest("li");
            if (li) li.classList.remove("opacity-50");
        });
        this.ui.taskList.addEventListener("dragover", (e) => {
            e.preventDefault();
            const afterElement = this.getDragAfterElement(this.ui.taskList, e.clientY);
            const draggingItem = this.ui.taskList.querySelector(".opacity-50")?.parentElement;
            if (draggingItem) {
                if (!afterElement) this.ui.taskList.appendChild(draggingItem);
                else this.ui.taskList.insertBefore(draggingItem, afterElement);
            }
        });
        this.ui.taskList.addEventListener("drop", () => {
            const currentItemOrder = Array.from(this.ui.taskList.querySelectorAll("li"))
                .map(li => parseInt(li.getAttribute("data-id")));
            this.tasks = currentItemOrder.map(id => this.tasks.find(t => t.id === id));
            StorageHandler.save(this.tasks);
        });
    }

    getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll("li:not(.opacity-50)")];
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) return { offset, element: child };
            return closest;
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    syncState() {
        StorageHandler.save(this.tasks);
        this.ui.render(this.tasks, this.currentFilter, this.searchQuery);
        this.ui.updateStats(this.tasks);
    }
}

new App();
