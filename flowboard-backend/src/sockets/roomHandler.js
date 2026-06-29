const roomUsers = new Map();

export default function roomHandler(io, socket) {
    socket.on('join-project', ({ projectId }) => {
        socket.join(projectId);
        socket.currentProjectId = projectId;

        if (!roomUsers.has(projectId)) roomUsers.set(projectId, []);
        
        const currentUsers = roomUsers.get(projectId);
        if (!currentUsers.some(u => u.userId === (socket.user.id || socket.user._id))) {
            currentUsers.push({ userId: socket.user.id || socket.user._id, name: socket.user.name });
        }

        console.log(`User ${socket.user.id || socket.user._id} joined project room: ${projectId}`);
        io.in(projectId).emit('room-users-update', currentUsers);
    });

    socket.on('disconnecting', () => {
        const projectId = socket.currentProjectId;
        if (projectId && roomUsers.has(projectId)) {
            let currentUsers = roomUsers.get(projectId).filter(u => u.userId !== (socket.user.id || socket.user._id));
            
            if (currentUsers.length === 0) {
                roomUsers.delete(projectId);
            } else {
                roomUsers.set(projectId, currentUsers);
                io.in(projectId).emit('room-users-update', currentUsers);
            }
            console.log(`User ${socket.user.id || socket.user._id} left project room: ${projectId}`);
        }
    });
}
