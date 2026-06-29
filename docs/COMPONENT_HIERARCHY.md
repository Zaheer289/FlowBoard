# Component Hierarchy

The FlowBoard frontend is a React application utilizing Vite. The component structure organizes pages, reusable UI components, and complex domain-specific logic.

## Visual Tree

- `App.jsx`
  - `AuthGuards.jsx` (Handles protected routing)
    - `Pages`
      - `Home.jsx`
      - `Login.jsx`
      - `Register.jsx`
      - `Dashboard.jsx`
        - `Sidebar.jsx`
        - `ProjectList.jsx`
          - `ProjectCard.jsx`
          - `ProjectRow.jsx`
        - `NewProjectModal.jsx`
      - `Projects.jsx` (The main canvas page)
        - `CanvasBoard.jsx`
        - `ShapeSidebar.jsx`
        - `PropertySidebar.jsx`
      - `Community.jsx`
      - `Settings.jsx`
  - `Modal.jsx` (Global reusable modal wrapper)

## Key Components

### `CanvasBoard.jsx`
The primary surface for the drawing application. It listens to Yjs events, manages the local canvas state, and renders the `Element` shapes (rectangles, text, lines) using HTML5 Canvas or SVG layers. It is the heaviest component orchestrating real-time updates and user interactions.

### `PropertySidebar.jsx`
Displays and edits the properties of a currently selected element (e.g., color, border width, opacity). When an element is modified here, it dispatches changes back to the Yjs store which triggers a re-render in the `CanvasBoard`.

### `ShapeSidebar.jsx`
Provides a palette of draggable or selectable shapes. Users interact with this sidebar to choose what new element to drop onto the `CanvasBoard`.

### `Sidebar.jsx`
The global application navigation menu, typically visible on the `Dashboard` and other auxiliary pages to switch between Home, Community, Settings, etc.
