export default function roomHandler(io, socket) {
    socket.on('join-project', ({ projectId }) => {
        // 1. Physically place the socket into the room named after the project ID
        socket.join(projectId);

        // 2. Attach the active project ID to the socket instance for easy access on disconnect
        socket.currentProjectId = projectId;

        console.log(`User ${socket.user.id || socket.user._id} joined project room: ${projectId}`);

        // 3. Broadcast to all OTHER users in this specific room that this user joined
        socket.to(projectId).emit('user-joined', {
            userId: socket.user.id || socket.user._id,
            name: socket.user.name, // Assuming username is in your JWT payload
        });
    });

    socket.on('disconnecting', () => {
        const projectId = socket.currentProjectId;
        if (projectId) {
            // Broadcast to everyone else in the project room that this user left
            socket.to(projectId).emit('user-left', {
                userId: socket.user.id || socket.user._id,
                name: socket.user.name,
            });
            console.log(`User ${socket.user.id || socket.user._id} left project room: ${projectId}`);
        }
    });
}
