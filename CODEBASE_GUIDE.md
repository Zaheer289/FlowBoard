# FlowBoard Codebase Guide

Welcome to the **FlowBoard** developer documentation. FlowBoard is a collaborative diagramming and interactive whiteboard platform built on the MERN (MongoDB, Express, React, Node.js) stack. It supports live stage rendering of shapes, user authentication with JWT, and project workspace storage.

---

## 📁 Repository Structure

```
FlowBoard/
├── flowboard-backend/       # Node.js & Express REST API using MongoDB
└── flowboard-frontend/      # React client SPA built with Vite & Tailwind v4
```

---

## 🖥️ Backend Architecture (`flowboard-backend`)

The backend exposes REST endpoints for user authentication and dashboard project listings. It connects to MongoDB using Mongoose.

### 🔌 Server and Database Entry
* **[src/server.js](file:///c:/Users/zahee/OneDrive/Desktop/GitRepos/FlowBoard/flowboard-backend/src/server.js)**: Configures the Express app. Registers middleware for CORS (enabling credentials support for port `3000`), cookieParser, and express.json. Binds routers under `/api/auth` and `/api` prefixes, connects to the database, and listens on the configured port.
* **[src/config/db.js](file:///c:/Users/zahee/OneDrive/Desktop/GitRepos/FlowBoard/flowboard-backend/src/config/db.js)**: Connects Mongoose to the MongoDB URI specified by `process.env.MONGO_URI`.

### 🗄️ Database Schemas (`src/models`)
* **[src/models/User.js](file:///c:/Users/zahee/OneDrive/Desktop/GitRepos/FlowBoard/flowboard-backend/src/models/User.js)**: Defines the user account schema (`name`, `email`, `passwordHash`, `profilePicture`). Implements a custom [verifyPassword](file:///c:/Users/zahee/OneDrive/Desktop/GitRepos/FlowBoard/flowboard-backend/src/models/User.js#L45) method that utilizes `bcrypt` to verify password credentials. Tracks references for user-owned, shared, liked, starred, and archived projects.
* **[src/models/Project.js](file:///c:/Users/zahee/OneDrive/Desktop/GitRepos/FlowBoard/flowboard-backend/src/models/Project.js)**: Tracks project metadata including details about the owner, collaborators, associated elements (`content`), visibility status (`Public`/`Private`), tag labels, views, fork logs, and a sub-schema for user comments.
* **[src/models/Element.js](file:///c:/Users/zahee/OneDrive/Desktop/GitRepos/FlowBoard/flowboard-backend/src/models/Element.js)**: Describes a single canvas element (whiteboard object). Supports element types `Shape`, `image`, `line`, `text`, `graph`, `table`, or `arrow` using a flexible `Mixed` data type to store style parameters and coordinate positions.

### 🌐 Routing and Route Controllers
* **Authentication**:
  * **[src/routes/authRoutes.js](file:///c:/Users/zahee/OneDrive/Desktop/GitRepos/FlowBoard/flowboard-backend/src/routes/authRoutes.js)**: Mounts POST routes for `/register`, `/login`, and `/refresh`.
  * **[src/controllers/auth.js](file:///c:/Users/zahee/OneDrive/Desktop/GitRepos/FlowBoard/flowboard-backend/src/controllers/auth.js)**: Coordinates user registrations, hashes password credentials using `bcrypt`, handles logging in, and sets access (`access_token`) and refresh (`refresh_token`) cookie variables.
* **Projects**:
  * **[src/routes/projectRoutes.js](file:///c:/Users/zahee/OneDrive/Desktop/GitRepos/FlowBoard/flowboard-backend/src/routes/projectRoutes.js)**: Protects workspace paths using token authentication middleware.
  * **[src/controllers/projects.js](file:///c:/Users/zahee/OneDrive/Desktop/GitRepos/FlowBoard/flowboard-backend/src/controllers/projects.js)**: Defines backend methods to create and delete projects, and query project list arrays. *(Note: [saveProject](file:///c:/Users/zahee/OneDrive/Desktop/GitRepos/FlowBoard/flowboard-backend/src/controllers/projects.js#L20) is currently an empty placeholder function).*

### 🔒 Middleware & Utilities
* **[src/middleware/authMiddleware.js](file:///c:/Users/zahee/OneDrive/Desktop/GitRepos/FlowBoard/flowboard-backend/src/middleware/authMiddleware.js)**: Inspects incoming client HTTP request cookie headers for valid `access_token` variables using jsonwebtoken.
* **[src/utils/jwt.js](file:///c:/Users/zahee/OneDrive/Desktop/GitRepos/FlowBoard/flowboard-backend/src/utils/jwt.js)**: Utility to generate access tokens (expires in 20 minutes) and refresh tokens (expires in 14 days).
* **[src/utils/validateCredentials.js](file:///c:/Users/zahee/OneDrive/Desktop/GitRepos/FlowBoard/flowboard-backend/src/utils/validateCredentials.js)**: Formats checks validating email syntax, minimum password strength (lowercase, uppercase, digit, and symbol constraints), and username lengths.

---

## 🎨 Frontend Architecture (`flowboard-frontend`)

The frontend application is built in React 19, utilizing Vite for bundling and Tailwind CSS v4 for layout.

### 🗺️ Routing & API Clients
* **[src/App.jsx](file:///c:/Users/zahee/OneDrive/Desktop/GitRepos/FlowBoard/flowboard-frontend/src/App.jsx)**: Defines SPA path matches using React Router 7.
* **[src/api/axios.js](file:///c:/Users/zahee/OneDrive/Desktop/GitRepos/FlowBoard/flowboard-frontend/src/api/axios.js)**: Exports an configured Axios instance pointing to `http://localhost:5000/api` with `withCredentials` enabled to preserve backend JWT cookie headers.

### 📃 Page Components (`src/pages`)
* **[src/pages/Home.jsx](file:///c:/Users/zahee/OneDrive/Desktop/GitRepos/FlowBoard/flowboard-frontend/src/pages/Home.jsx)**: Entry landing page wrapper.
* **[src/pages/Login.jsx](file:///c:/Users/zahee/OneDrive/Desktop/GitRepos/FlowBoard/flowboard-frontend/src/pages/Login.jsx)** & **[src/pages/Register.jsx](file:///c:/Users/zahee/OneDrive/Desktop/GitRepos/FlowBoard/flowboard-frontend/src/pages/Register.jsx)**: Handle forms to log in and sign up. Features floating HTML5 backdrop shapes.
* **[src/pages/Dashboard.jsx](file:///c:/Users/zahee/OneDrive/Desktop/GitRepos/FlowBoard/flowboard-frontend/src/pages/Dashboard.jsx)**: Renders a control dashboard listing Recent, Starred, and Shared projects (wrapped in sliding carousel containers). Contains search capabilities and action overlays to launch the project creator.
* **[src/pages/Projects.jsx](file:///c:/Users/zahee/OneDrive/Desktop/GitRepos/FlowBoard/flowboard-frontend/src/pages/Projects.jsx)**: Canvas editor layout. Splices the central rendering board between a tool configuration catalog (left side) and a styling palette sidebar (right side).
* **[src/pages/TermsConditions.jsx](file:///c:/Users/zahee/OneDrive/Desktop/GitRepos/FlowBoard/flowboard-frontend/src/pages/TermsConditions.jsx)** & **[src/pages/PrivacyPolicy.jsx](file:///c:/Users/zahee/OneDrive/Desktop/GitRepos/FlowBoard/flowboard-frontend/src/pages/PrivacyPolicy.jsx)**: Structural views explaining terms of service and data policy parameters.

### 🧩 UI Elements (`src/pages/components`)
* **[src/pages/components/CanvasBoard.jsx](file:///c:/Users/zahee/OneDrive/Desktop/GitRepos/FlowBoard/flowboard-frontend/src/pages/components/CanvasBoard.jsx)**: Integrates `react-konva` (a canvas wrapper library) to map shapes (`Rect`, `Circle`, `Text`) to drawable and draggable layers.
* **[src/pages/components/ShapeSidebar.jsx](file:///c:/Users/zahee/OneDrive/Desktop/GitRepos/FlowBoard/flowboard-frontend/src/pages/components/ShapeSidebar.jsx)**: Catalog listing available board items (shapes, text elements, lines, arrows, curves).
* **[src/pages/components/PropertySidebar.jsx](file:///c:/Users/zahee/OneDrive/Desktop/GitRepos/FlowBoard/flowboard-frontend/src/pages/components/PropertySidebar.jsx)**: Palette allowing users to customize properties (e.g. fill color) of selected shapes.
* **[src/pages/components/NewProjectModal.jsx](file:///c:/Users/zahee/OneDrive/Desktop/GitRepos/FlowBoard/flowboard-frontend/src/pages/components/NewProjectModal.jsx)**: Creator form gathering project info (visibility, tags, templates) to send to the backend.
* **[src/pages/components/ProjectList.jsx](file:///c:/Users/zahee/OneDrive/Desktop/GitRepos/FlowBoard/flowboard-frontend/src/pages/components/ProjectList.jsx)** & **[src/pages/components/ProjectCard.jsx](file:///c:/Users/zahee/OneDrive/Desktop/GitRepos/FlowBoard/flowboard-frontend/src/pages/components/ProjectCard.jsx)**: Interactive project listing components. Features option selectors to star, archive, or launch individual projects.

---

## ⚠️ Notes, Unfinished Features & Bugs

1. **Missing Canvas Logic**: While `ShapeSidebar` and `PropertySidebar` exist, [Projects.jsx](file:///c:/Users/zahee/OneDrive/Desktop/GitRepos/FlowBoard/flowboard-frontend/src/pages/Projects.jsx) does not pass event handlers or select contexts to them. This means new shapes cannot be placed or color-modified on the whiteboard canvas yet.
2. **Missing Backend Save**: The `saveProject` controller in [src/controllers/projects.js](file:///c:/Users/zahee/OneDrive/Desktop/GitRepos/FlowBoard/flowboard-backend/src/controllers/projects.js#L20) is declared but empty.
3. **Reference Bug**: The component [NewProjectModal.jsx](file:///c:/Users/zahee/OneDrive/Desktop/GitRepos/FlowBoard/flowboard-frontend/src/pages/components/NewProjectModal.jsx) references `displayErrorMessage()`, which is neither defined nor imported in the file.
