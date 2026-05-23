# 📘 Store Management System - Documentation

**Version:** 1.0  
**Last Updated:** May 2026  
**Project Type:** Frontend Web Application (Vanilla JS)

---

## 1. Introduction

The **Store Management System** is a modern, terminal-style web application designed to help small businesses and stores manage daily tasks efficiently. It features a clean developer-centric interface with role-based authentication, task management, and real-time analytics.

This project was built as part of a virtual internship to demonstrate strong frontend architecture, user experience design, and practical JavaScript skills.

---

## 2. Key Features

- **Role-Based Authentication**
  - Admin, Clerk, and Cashier roles
  - Secure login with client-side password hashing
  - Session persistence using `sessionStorage`

- **Task Management**
  - Add, edit (inline), complete, delete, and reorder tasks
  - Priority levels (Low, Medium, High)
  - Due date support
  - Drag & Drop reordering
  - Real-time search and filtering

- **Dashboard & Analytics**
  - Live statistics (Total, Active, Completed tasks)
  - Visual progress indicators

- **User Experience Enhancements**
  - Terminal/CLI aesthetic with JetBrains Mono font
  - Sound effects for actions
  - Dark & Light theme toggle
  - Hover tooltips explaining every feature
  - Smooth animations and micro-interactions

- **Data Handling**
  - All data stored locally using `localStorage`
  - JSON export functionality
  - Clear completed tasks option

---

## 3. Technology Stack

- **HTML5** + **Tailwind CSS** (via CDN)
- **Vanilla JavaScript** (Modular Architecture)
- **CSS3** (Custom styling + animations)
- **Browser Storage**: `localStorage` + `sessionStorage`
- **No Backend / No Build Tools** – Pure frontend application

---

## 4. Project Structure

```
Store-Management-Website/
├── index.html                 # Main application
├── css/
│   ├── style.css              # Core styles & animations
│   └── theme.css              # Theme overrides
├── js/
│   ├── app.js                 # Main controller
│   ├── auth.js                # Authentication & roles
│   ├── storage.js             # LocalStorage handling
│   ├── ui.js                  # Rendering & sound effects
│   ├── utils.js               # Validation helpers
│   └── README.md
├── img/                       # Screenshots
│   ├── Screenshot (734).png
│   ├── Screenshot (735).png
│   └── Screenshot (736).png
├── DOCUMENTATION.md           # This file
└── README.md
```

---

## 5. Getting Started

### Option 1: Open Directly
1. Download or clone the repository
2. Open `index.html` in any modern browser (Chrome, Firefox, Edge recommended)

### Option 2: Using Local Server (Recommended)
```bash
# Python
python -m http.server 8080

# Then visit: http://localhost:8080
```

---

## 6. User Guide

### 6.1 Authentication
- On first load, you will see the login screen.
- Use the role dropdown to select your role before logging in.
- New users can register using the **"Register new account"** button.

**Default Test Accounts:**

| Role     | Username | Password    |
|----------|----------|-------------|
| Admin    | admin    | admin123    |
| Clerk    | clerk    | clerk123    |
| Cashier  | cashier  | cashier123  |

### 6.2 Adding Tasks
1. Go to the left sidebar → **New Task** section
2. Enter task description
3. Select priority
4. (Optional) Set due date
5. Click **Add Task**

### 6.3 Managing Tasks
- **Mark Complete**: Click the circle icon next to the task
- **Edit Task**: Click directly on the task text to edit inline
- **Delete Task**: Hover over the task → Click the trash icon
- **Reorder Tasks**: Drag and drop tasks to change their order
- **Filter & Search**: Use the filter buttons and search bar at the top

---

## 7. Role Permissions

| Feature                  | Admin     | Clerk     | Cashier   |
|--------------------------|-----------|-----------|-----------|
| Add / Edit / Delete Tasks| ✅        | ✅        | ❌        |
| Mark Tasks Complete      | ✅        | ✅        | View Only |
| Register New Users       | ✅        | ❌        | ❌        |
| View Analytics           | ✅        | ✅        | ✅        |
| Export Data              | ✅        | ✅        | ✅        |

---

## 8. Screenshots

### Login & Registration Screen
![Login Screen](img/Screenshot%20(734).png)

### Main Task Management Dashboard
![Task Dashboard](img/Screenshot%20(735).png)

### Actions, Analytics & Logout
![Actions and Analytics](img/Screenshot%20(736).png)

---

## 9. Data Storage & Security

- All tasks and user data are stored in the browser using `localStorage`.
- User sessions are managed via `sessionStorage`.
- Passwords are hashed using a simple client-side algorithm (for demonstration only).
- **Note**: This is a frontend-only project. For production use, a secure backend is recommended.

---

## 10. Future Enhancements

- Backend integration (Node.js + Database)
- User management panel for Admins
- Due date reminders & notifications
- Export to PDF / Excel
- Multi-language support
- Mobile-first responsive improvements

---

## 11. Credits

**Developed by:** Pranjal Kumar  
**Project Type:** Virtual Internship Project  
**Purpose:** Demonstrate frontend development, authentication flow, and UI/UX skills

---

**Thank you for reviewing the Store Management System!**

For any issues or suggestions, feel free to open an issue on GitHub.
