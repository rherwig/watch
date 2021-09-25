import * as events from '../../shared/socket/events';

const ROOM = 'debug';

export default (io) => {
    io.on('connection', (socket) => {
        console.info(`[Socket] New connection from ${socket.id}`);

        socket.join(ROOM);

        socket.on(events.ROOM_JOIN_TRY, (payload) => {
            if (!payload.roomName) {
                return;
            }

            socket.emit(events.ROOM_JOIN_CONFIRM);
        });

        socket.on(events.VIDEO_LOAD_REQUEST, (payload) => {
            io.to(ROOM).emit(events.VIDEO_LOAD, payload);
        });

        socket.on(events.VIDEO_PLAY_REQUEST, (payload) => {
            io.to(ROOM).emit(events.VIDEO_PLAY, payload);
        });

        socket.on(events.VIDEO_PAUSE_REQUEST, (payload) => {
            io.to(ROOM).emit(events.VIDEO_PAUSE, payload);
        });

        socket.on(events.VIDEO_STOP_REQUEST, (payload) => {
            io.to(ROOM).emit(events.VIDEO_STOP, payload);
        });
    });
};
