# Real-Time Multiplayer Architecture

## 1. Conflict Resolution Engine
- **Technology:** Operation-based CRDTs (Specifically **Yjs**).
- **Reasoning:** Eliminates the need for complex Operational Transformation (OT) math. Guarantees eventual consistency across all clients regardless of network latency or the order operations are received.

## 2. Server Topology
- **Pattern:** Headless Active Peer.
- **Implementation:** The Node.js server is not just a "dumb relay." It runs its own in-memory instance of the Yjs document, processes operations, and acts as the central source of truth for late-joiners and database persistence.

## 3. Room Lifecycle & Memory Management
- **Initialization:** When the first user joins a project room, the server retrieves the project's saved binary state from MongoDB, initializes a Yjs document in RAM, and sends a state vector handshake to the client.
- **Cleanup:** When the final user disconnects from a room, the server waits for a brief cooldown period (to account for accidental refreshes), saves the final Yjs binary blob back to MongoDB, and destroys the in-memory document to free up server RAM.

## 4. Disconnect Handling
- **Strategy:** Strict UI Freeze.
- **Implementation:** If a client's WebSocket connection drops, the frontend will immediately freeze the canvas and display a blocking "Reconnecting..." loading state. We are intentionally avoiding offline local queues for the MVP to prevent complex merge conflicts upon reconnection.

## 5. Payload Serialization
- **Format:** Binary (`Uint8Array`).
- **Reasoning:** CRDTs generate significant metadata. Sending this over WebSockets as JSON would cause massive bandwidth bloat. Yjs binary encoding keeps payloads microscopic and highly performant.

## 6. Socket Security
- **Authentication:** Socket.io Middleware.
- **Implementation:** The React frontend will pass its standard HTTP JWT inside the socket initialization payload (`auth: { token: 'JWT' }`). The Node server `io.use()` middleware will verify this token before allowing the WebSocket connection upgrade.

## 7. State Syncronization (Yjs ↔ Redux)
- **Data Flow:** Yjs is the absolute source of truth. Redux is demoted to a read-only rendering mirror for the canvas elements.
- **Pipeline:** User Action ➔ Update Yjs Document ➔ Fire `yArray.observe()` event ➔ Dispatch updated array to Redux ➔ Re-render Canvas UI.

## 8. Multiplayer Undo/Redo
- **Refactoring:** We will remove `redux-undo` from the canvas elements slice.
- **Implementation:** We will use `Y.UndoManager`. This ensures that in a multiplayer environment, a user hitting "Undo" only reverts *their specific operations*, rather than accidentally popping their collaborator's most recent shape off the global stack.
