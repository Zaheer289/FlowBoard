# File Structure

FlowBoard is organized as a monorepo containing distinct directories for the frontend, backend, and planning.

## Root Directory

- `/docs` - Comprehensive architectural markdown documentation.
- `/flowboard-backend` - Express & Node.js API and Socket.io server.
- `/flowboard-frontend` - React & Vite application.
- `WEBSOCKET_ARCHITECTURE.md` - High-level overview of the Yjs and Socket real-time architecture.

## Backend (`/flowboard-backend`)

- `server.js`: Entry point. Initializes Express, configures middleware, and starts Socket.io.
- `/src/config`: Configuration files, such as `db.js` for MongoDB connection.
- `/src/controllers`: Business logic for API endpoints (e.g., `auth.js`, `projects.js`).
- `/src/middleware`: Express middleware (e.g., `authMiddleware.js` for JWT validation).
- `/src/models`: Mongoose database schemas (`User.js`, `Project.js`, `Element.js`).
- `/src/routes`: Express route definitions connecting URLs to controllers.
- `/src/sockets`: Socket.io event handlers, notably `roomHandler.js` for project rooms.
- `/src/utils`: Helper functions like `jwt.js` and input validation.

## Frontend (`/flowboard-frontend`)

- `/src/api`: Axios instance configuration (`axios.js`).
- `/src/assets`: Static images, fonts, and icons.
- `/src/components`: Reusable UI elements (`AuthGuards.jsx`, `/ui` folder).
- `/src/features`: Redux slices or modular feature logic (e.g., `boardSlice.js`).
- `/src/pages`: Top-level route components (`Dashboard.jsx`, `Projects.jsx`, `Login.jsx`).
  - `/src/pages/components`: Page-specific subcomponents (`CanvasBoard.jsx`, `PropertySidebar.jsx`).
- `App.jsx` & `main.jsx`: React entry point and routing wrapper.
