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

        socket.on(events.VIDEO_PLAY_REQUEST_START, (payload) => {
            io.to(ROOM).emit(events.VIDEO_PLAY_START, payload);
        });
    });
};
