import {
    adjectives,
    animals,
    colors,
    uniqueNamesGenerator,
} from 'unique-names-generator';

import * as events from '../../shared/socket/events';

const createUsername = () => {
    return uniqueNamesGenerator({
        style: 'capital',
        separator: ' ',
        dictionaries: [
            adjectives,
            colors,
            animals,
        ],
    });
};

export default (io) => {
    io.on('connection', (socket) => {
        console.info(`[Socket] New connection from ${socket.id}`);

        socket.data.user = {
            id: socket.id,
            name: createUsername(),
        };

        socket.on('disconnect', () => {
            socket.leaveAll();
        });

        socket.on(events.ROOM_JOIN_TRY, (payload) => {
            if (!payload.name) {
                return;
            }

            socket.leaveAll();
            socket.join(payload.name);
            socket.room = payload.name;

            socket.emit(events.ROOM_JOIN_CONFIRM, payload);

            const socketsInRoom = io.sockets.adapter.rooms.get(socket.room);
            const users = socketsInRoom.size ? [...socketsInRoom].map((socketId) => {
                const { data } = io.sockets.sockets.get(socketId);

                return data.user;
            }) : [];

            socket.emit(events.ROOM_USER_UPDATE, {
                users,
            });

            socket.emit(events.ROOM_SYNC, {
                // TODO: Send room information
            });
        });

        socket.on(events.CHAT_MESSAGE_SEND, (payload) => {
            io.to(socket.room).emit(events.CHAT_MESSAGE_RECEIVED, {
                ...payload,
                user: socket.data.user,
            });
        });

        socket.on(events.VIDEO_LOAD_REQUEST, (payload) => {
            const { videoId } = payload;

            socket.data.currentVideoId = videoId;

            io.to(socket.room).emit(events.VIDEO_LOAD, payload);
        });

        socket.on(events.VIDEO_PLAY_REQUEST, (payload) => {
            io.to(socket.room).emit(events.VIDEO_PLAY, payload);
        });

        socket.on(events.VIDEO_PAUSE_REQUEST, (payload) => {
            io.to(socket.room).emit(events.VIDEO_PAUSE, payload);
        });

        socket.on(events.VIDEO_STOP_REQUEST, (payload) => {
            io.to(socket.room).emit(events.VIDEO_STOP, payload);
        });

        socket.on(events.VIDEO_BUFFER_REQUEST, (payload) => {
            io.to(socket.room).emit(events.VIDEO_BUFFER, payload);
        });
    });

    io.of('/').adapter.on('join-room', (room, id) => {
        const { data } = io.sockets.sockets.get(id);

        console.log(`[Socket] Socket ${id} joined room ${room}.`);

        io.to(room).emit(events.ROOM_USER_JOINED, {
            room,
            user: data.user,
        });
    });

    io.of('/').adapter.on('leave-room', (room, id) => {
        const { data } = io.sockets.sockets.get(id);

        console.log(`[Socket] Socket ${id} left room ${room}.`);

        io.to(room).emit(events.ROOM_USER_LEFT, {
            room,
            user: data.user,
        });
    });
};
