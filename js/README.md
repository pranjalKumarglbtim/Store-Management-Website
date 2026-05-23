# Store Management CLI

A professional terminal-style store management application with authentication and task management capabilities.

## Features Included
- **Authentication System**: Role-based access control (admin, clerk, cashier)
- **Terminal UI**: Developer-centric interface with JetBrains Mono font and dark mode
- **Task Management**: Full CRUD operations with drag-and-drop reordering
- **Inline Editing**: Click-to-edit task descriptions
- **Search & Filter**: Filter by status (all/active/completed) and search tasks
- **Statistics Dashboard**: Real-time task analytics
- **Sound Effects**: Audio feedback for actions (requires user interaction)
- **Data Export**: JSON backup functionality

## Tech Architecture
- **Modular Design**: Separate modules for storage, auth, UI, and utilities
- **Local Storage**: Data persistence using browser localStorage
- **AudioContext API**: Sound generation with browser autoplay policy handling

## Quick Setup
1. Open `index.html` in a browser or serve via local server
2. Default credentials: `admin` / `admin123`
3. Register new users via the [REGISTER] section

## Roles
- **Admin**: Full access (task management, user registration)
- **Clerk**: Task management only
- **Cashier**: Read-only task viewing

## Keyboard Shortcuts
- `Alt+N`: Focus on new task input