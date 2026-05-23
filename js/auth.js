const Auth = {
    init() {
        this.createDefaultUsers();
    },

    createDefaultUsers() {
        const users = this.getUsers();
        if (users.length === 0) {
            const defaultUsers = [
                {
                    id: Date.now(),
                    username: "admin",
                    password: this.hashPassword("admin123"),
                    role: "admin",
                    createdAt: new Date().toISOString()
                },
                {
                    id: Date.now() + 1,
                    username: "clerk",
                    password: this.hashPassword("clerk123"),
                    role: "clerk",
                    createdAt: new Date().toISOString()
                },
                {
                    id: Date.now() + 2,
                    username: "cashier",
                    password: this.hashPassword("cashier123"),
                    role: "cashier",
                    createdAt: new Date().toISOString()
                }
            ];
            this.saveUsers(defaultUsers);
        }
    },

    hashPassword(password) {
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return btoa(password + "_salt_" + Math.abs(hash).toString(16));
    },

    getUsers() {
        const data = localStorage.getItem("app_users");
        return data ? JSON.parse(data) : [];
    },

    saveUsers(users) {
        localStorage.setItem("app_users", JSON.stringify(users));
    },

    register(username, password, role = "cashier") {
        const validRoles = ["cashier", "clerk", "admin"];
        if (!validRoles.includes(role)) {
            role = "cashier";
        }
        const users = this.getUsers();
        if (users.find(u => u.username === username)) {
            throw new Error("Username already exists");
        }
        const newUser = {
            id: Date.now(),
            username,
            password: this.hashPassword(password),
            role,
            createdAt: new Date().toISOString()
        };
        users.push(newUser);
        this.saveUsers(users);
        return newUser;
    },

    login(username, password, role = null) {
        const users = this.getUsers();
        const user = users.find(u => u.username === username);
        if (!user) {
            throw new Error("Invalid credentials");
        }
        if (user.password !== this.hashPassword(password)) {
            throw new Error("Invalid credentials");
        }
        if (role && user.role !== role) {
            throw new Error(`Access denied: ${user.role} cannot login as ${role}`);
        }
        const session = {
            userId: user.id,
            username: user.username,
            role: user.role,
            loginTime: new Date().toISOString()
        };
        sessionStorage.setItem("current_user", JSON.stringify(session));
        return session;
    },

    logout() {
        sessionStorage.removeItem("current_user");
    },

    getCurrentUser() {
        const data = sessionStorage.getItem("current_user");
        return data ? JSON.parse(data) : null;
    },

    isAuthenticated() {
        return this.getCurrentUser() !== null;
    },

    hasRole(role) {
        const user = this.getCurrentUser();
        return user && user.role === role;
    },

    isAdmin() {
        return this.hasRole("admin");
    },

    isClerk() {
        return this.hasRole("clerk");
    },

    isCashier() {
        return this.hasRole("cashier");
    }
};

Auth.init();
