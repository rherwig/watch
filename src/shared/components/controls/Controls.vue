<template>
    <div>
        <Button
            class="mr-1"
            @click="play"
        >
            Play
        </Button>
        <Button
            class="mr-1"
            @click="pause"
        >
            Pause
        </Button>
        <Button
            @click="stop"
        >
            Stop
        </Button>
    </div>
</template>

<script setup>
import { events, useSocket } from '../../socket';
import Button from '../ui/buttons/Button.vue';

const socket = useSocket();

const play = () => {
    socket.emit(events.VIDEO_PLAY_REQUEST);
};

const pause = () => {
    socket.emit(events.VIDEO_PAUSE_REQUEST);
};

const stop = () => {
    socket.emit(events.VIDEO_STOP_REQUEST);
};
</script>
