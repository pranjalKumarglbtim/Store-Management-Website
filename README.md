# 🏪 Store Management Website

A **modern, terminal-style Store Management System** built with pure HTML, CSS, and JavaScript. It provides a professional task management interface with role-based authentication, designed for small businesses or store operations.

## ✨ Key Features

- **Role-Based Authentication**
  - Admin, Clerk, and Cashier roles
  - Secure login with password hashing
  - Session management using `sessionStorage`

- **Advanced Task Management**
  - Create, edit (inline), delete, and reorder tasks
  - Drag & Drop functionality
  - Priority levels (Low / Medium / High)
  - Due date assignment
  - Real-time search and filtering

- **Dashboard & Analytics**
  - Live statistics (Total, Active, Completed)
  - Visual feedback with animations

- **User Experience**
  - Beautiful terminal/developer-style dark UI
  - Sound effects for actions
  - Dark/Light theme toggle
  - Hover tooltips explaining every feature
  - Responsive design

- **Data Management**
  - Export all tasks as JSON
  - Persistent storage using `localStorage`
  - Clear completed tasks

## 🛠 Tech Stack

- **Frontend**: HTML5, Tailwind CSS (CDN), Custom CSS
- **JavaScript**: Vanilla JS with modular architecture
- **Storage**: Browser `localStorage` + `sessionStorage`
- **No Build Tools / No Backend** (Pure frontend application)

## 📁 Project Structure

```
Store-Management-Website/
├── index.html                 # Main application entry point
├── css/
│   ├── style.css              # Core styling + animations
│   └── theme.css              # Theme-specific overrides
├── js/
│   ├── app.js                 # Main app controller & event handling
│   ├── auth.js                # Authentication, roles & user management
│   ├── storage.js             # LocalStorage wrapper
│   ├── ui.js                  # Task rendering, sound effects & DOM updates
│   ├── utils.js               # Validation and helper functions
│   └── README.md
└── README.md
```

## 🚀 How It Works

### 1. Authentication Flow
- When the app loads, it checks for an active session.
- If no user is logged in, the **authentication overlay** appears.
- Users can:
  - Login using existing credentials
  - Register new accounts (Clerk, Cashier, or Admin)

**Default Test Accounts:**
| Role     | Username | Password    |
|----------|----------|-------------|
| Admin    | admin    | admin123    |
| Clerk    | clerk    | clerk123    |
| Cashier  | cashier  | cashier123  |

### 2. Role Permissions
- **Admin**: Full access — can register new users + manage all tasks
- **Clerk**: Can add, edit, delete, and reorder tasks
- **Cashier**: Read-only access (can view tasks and statistics)

### 3. Task Management
- Tasks are stored locally in the browser.
- Users can:
  - Add new tasks with description, priority, and due date
  - Edit task text directly by clicking on it
  - Drag tasks to change order
  - Filter by status (All / Active / Completed)
  - Search tasks in real-time

### 4. Data Persistence
- All tasks and user data are saved using `localStorage`.
- User sessions are managed with `sessionStorage`.
- Data remains even after closing the browser (until manually cleared).

### 5. UI & Interactions
- The entire interface follows a **terminal/CLI aesthetic** using JetBrains Mono font.
- Micro-interactions, hover tooltips, and sound feedback improve usability.
- Theme can be toggled between dark and light mode.

## 🖥️ Getting Started Locally

### Option 1: Open Directly (Quickest)
Simply open the `index.html` file in any modern browser.

### Option 2: Using a Local Server (Recommended)

```bash
# Using Python
python -m http.server 8080

# Then open: http://localhost:8080
```

## 📸 Screenshots

### 1. Login & Registration
![Login and Registration Screen](img/Screenshot%20(734).png)

### 2. Main Task Management Dashboard
![Task Adding and Management](img/Screenshot%20(735).png)

### 3. Actions, Analytics & Logout
![Actions and Statistics](img/Screenshot%20(736).png)

## 🔒 Security Considerations

> **Note**: This is a **frontend-only** application.
> - Passwords are hashed using a simple JavaScript function (for demo purposes).
> - All data is stored in the browser.
> - For production use, a real backend with proper authentication and database is recommended.

## 🚧 Future Improvements (Ideas)

- Add user management panel for admins
- Add task categories/tags
- Implement real backend (Node.js + MongoDB or Firebase)
- Add due date reminders/notifications
- Export to CSV/PDF
- Multi-user real-time collaboration

## 👨‍💻 Author

Built as part of a virtual internship project for demonstrating frontend architecture, authentication flow, and UI/UX design skills.

---

**Live Demo**: Open `index.html` in your browser or deploy on GitHub Pages / Vercel.

Thank you for using the Store Management Website! 🏪
