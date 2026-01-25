[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.0.0-61dafb.svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0.24-38bdf8.svg)](https://tailwindcss.com/)

<div align="center">

# Crema Task Manager

A modern Kanban-style task management application built with React, featuring drag-and-drop functionality, real-time updates, and persistent storage.

_Originally built in 2022 as a junior developer project, updated in 2026 to reflect current best practices and demonstrate professional code standards for portfolio showcase._

</div>

---

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Installation & Setup](#installation--setup)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [What I Learned](#what-i-learned)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

---

## Demo

![General overview and member management](userInterface.gif)
_General overview and adding members_

![Task creation flow](createTask.gif)
_Creating a new task_

![Task editing and deletion](editTask.gif)
_Editing and deleting tasks_

---

## Features

| Feature                     | Description                                                                            |
| --------------------------- | -------------------------------------------------------------------------------------- |
| **Drag-and-Drop Interface** | Seamlessly move tasks between columns (To Do, In Work, Review, Done)                   |
| **Task Management**         | Create, edit, and delete tasks with rich metadata (title, description, priority, type) |
| **Team Collaboration**      | Assign multiple team members to tasks                                                  |
| **Persistent Storage**      | LocalStorage integration ensures data persists across sessions                         |
| **Responsive Design**       | Tailwind CSS-powered responsive layout                                                 |
| **Form Validation**         | Formik + Yup integration for robust input validation                                   |
| **Interactive UI**          | Material-UI components with smooth animations and tooltips                             |

---

## Tech Stack

| Technology                   | Purpose                                       | Version    |
| ---------------------------- | --------------------------------------------- | ---------- |
| **React**                    | UI framework for component-based architecture | 18.0.0     |
| **Tailwind CSS**             | Utility-first CSS framework for rapid styling | 3.0.24     |
| **Material-UI**              | Component library for polished UI elements    | 5.6.3      |
| **Formik**                   | Form state management and validation          | 2.2.9      |
| **Yup**                      | Schema-based validation                       | 0.32.11    |
| **@headlessui/react**        | Unstyled, accessible UI components            | 1.6.5      |
| **React DnD (Native HTML5)** | Drag-and-drop functionality                   | Native API |

---

## Architecture

Crema Task Manager is an interactive web application that helps teams organize and track tasks across different workflow stages. Built with React and Material-UI, it provides an intuitive drag-and-drop interface for managing tasks in a Kanban board layout.

### State Management

The application uses React's built-in state management with the `useState` and `useEffect` hooks. A custom `useLocalStorage` hook synchronizes state with browser localStorage, ensuring data persistence across sessions without requiring a backend.

```javascript
// Example: Custom hook for localStorage persistence
const [localTasks, setLocalTasks] = useLocalStorage("localTasks", tasks);
```

### Component Architecture

- **Separation of Concerns**: Each component handles a single responsibility (task display, modals, navigation)
- **Prop Drilling Mitigation**: While the current implementation uses prop drilling, it's intentionally kept simple to demonstrate state flow (in a larger app, Context API or Redux would be more appropriate)
- **Reusable Components**: Custom Formik-integrated form components (`MyTextField`, `MyCheckBox`) ensure consistent behavior

### Drag-and-Drop Implementation

Uses the native HTML5 Drag and Drop API rather than external libraries, demonstrating understanding of browser APIs, event handler management (`onDragStart`, `onDragOver`, `onDrop`), and data transfer between components.

### Code Quality Improvements (2026 Update)

Refactored from junior-level code to demonstrate senior practices:

1. **JSDoc Documentation**: Comprehensive function and component documentation for better maintainability
2. **Import Organization**: Alphabetically sorted imports grouped by source (external libraries → internal components)
3. **Removed Dead Code**: Cleaned up commented-out code and unused variables
4. **Consistent Naming**: Standardized naming conventions across the codebase
5. **Error Handling**: Added validation and user confirmations for destructive actions
6. **Code Formatting**: Integrated ESLint and Prettier for consistent style

---

## Installation & Setup

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher) or yarn

### Installation Steps

1. Clone the repository

```bash
git clone https://github.com/LucasBrinton1/crema-task-manager.git
cd crema-task-manager
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Start the development server

```bash
npm start
# or
yarn start
```

4. Open in browser

Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm start          # Run development server on http://localhost:3000
npm run build      # Create optimized production build
npm test           # Run test suite
npm run lint       # Check code for linting errors
npm run lint:fix   # Automatically fix linting errors
npm run format     # Format code with Prettier
```

---

## Project Structure

```
crema-task-manager/
├── public/
│   ├── images/              # Static assets (icons, flags)
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── descriptionEditor/    # Task description editing
│   │   ├── header/                # App header with controls
│   │   ├── membersEditor/         # Member assignment UI
│   │   ├── navbar/                # Top navigation bar
│   │   ├── newMemberWindow/       # Member creation modal
│   │   ├── newTaskWindow/         # Task creation modal
│   │   ├── task/
│   │   │   ├── Task.js            # Task card component
│   │   │   └── EditTask.js        # Task editing modal
│   │   └── utils/
│   │       └── index.js           # Utility functions
│   ├── App.js                     # Main application component
│   ├── mockData.js                # Initial seed data
│   ├── useLocalStorage.js         # Custom hook for persistence
│   ├── index.js                   # Application entry point
│   └── index.css                  # Global styles
├── .eslintrc.json                 # ESLint configuration
├── .prettierrc                    # Prettier configuration
├── tailwind.config.js             # Tailwind CSS config
└── package.json
```

---

## Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/LucasBrinton1/crema-task-manager)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Vercel will auto-detect React and deploy

### Deploy to Netlify

1. Build the project

```bash
npm run build
```

2. Deploy the `build/` directory to Netlify

```bash
npx netlify-cli deploy --prod --dir=build
```

---

## What I Learned

This project showcases my growth as a developer:

### Original Implementation (2022 - Junior Level)

- Basic React component structure
- State management fundamentals
- Third-party library integration
- Inconsistent code formatting
- Minimal documentation
- Some unused/dead code

### 2026 Refactor (Senior Level)

- **Professional Code Documentation**: JSDoc comments explaining complex logic
- **Code Quality Tools**: ESLint + Prettier configuration for team consistency
- **Best Practices**: DRY principles, proper import organization, semantic naming
- **Performance Awareness**: Understanding when to use `useEffect` dependencies properly
- **User Experience**: Confirmation dialogs, tooltips, smooth animations
- **Scalability Mindset**: Modular architecture ready for expansion

**Key Takeaway**: This refactor demonstrates my ability to critically analyze code, identify improvement opportunities, and apply senior-level standards—crucial skills for maintaining large codebases in production environments.

**Note to Recruiters**: This project demonstrates my ability to write production-quality React code with proper documentation, testing infrastructure, and modern development workflows. The refactoring process showcases critical thinking, attention to detail, and commitment to code excellence—skills essential for senior frontend roles.

---

## Contributing

While this is a personal portfolio project, suggestions and feedback are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2022-2026 Lucas Brinton

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## Author

**Lucas Brinton**

[![Twitter/X](https://img.shields.io/badge/Twitter-@LucasBrinton1-1da1f2.svg)](https://twitter.com/LucasBrinton1)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Lucas_Brinton-0077b5.svg)](https://www.linkedin.com/in/lucas-brinton-52aa32174/)

**Contact:** [lucasbrintondev@gmail.com](mailto:lucasbrintondev@gmail.com)

_Originally built in 2022 during early career stages. Updated in January 2026 to showcase professional development practices and code quality standards suitable for senior frontend engineering roles._

---

## Acknowledgments

- UI design inspiration from [Dribbble](https://dribbble.com/shots/17889681-Project-Management-Dashboard-Light-Theme)
- Mock user profile images from [Unsplash](https://unsplash.com)
- React community for excellent documentation and ecosystem
