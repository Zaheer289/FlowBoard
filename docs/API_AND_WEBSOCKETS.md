# API and WebSockets

## REST API Endpoints

All endpoints are prefixed with `/api`. Most require authentication via the `verifyAccessToken` middleware.

### Authentication (`/api/auth`)
- **`POST /register`**: Registers a new user. Expects `{ username, email, password }`.
- **`POST /login`**: Authenticates a user. Expects `{ email, password }`.
- **`POST /refresh`**: Issues a new access token if a valid refresh token cookie exists.
- **`GET /verify`**: Verifies the current session and returns the user object.

### Projects (`/api/projects`)
- **`GET /projects`**: Fetches all projects the user has access to.
- **`POST /projects`**: Creates a new project.
- **`GET /projects/:id`**: Fetches a specific project's metadata.
- **`PUT /projects/:id`**: Updates project details.
- **`DELETE /projects/:id`**: Deletes a project.
- **`PUT /projects/:id/save`**: Saves the project canvas state.
- **`POST /projects/:id/invite`**: Invites a collaborator.

### Users (`/api/users`)
- **`GET /users/find/:name`**: Finds a user by their username.

## WebSockets

The WebSocket architecture utilizes the **Headless Active Peer** pattern ("Dumb-Router Backend Pattern" augmented). The server maintains its own in-memory Yjs document and acts as the central hub.

### Events Emitted / Listened

- **`join-project`** *(Listen)*: Client requests to join a room by `projectId`. The server tracks the user and broadcasts the update.
- **`room-users-update`** *(Emit)*: The server broadcasts the updated list of connected users to everyone in the room.
- **`disconnecting`** *(Listen)*: A built-in Socket.io event. The server removes the user from the `roomUsers` map and broadcasts the updated user list to remaining clients.
- **Yjs Sync Events**: Underlying Yjs synchronization binary blobs are transmitted continuously to sync the `Uint8Array` state vectors. The backend buffers and resolves CRDT operations.
