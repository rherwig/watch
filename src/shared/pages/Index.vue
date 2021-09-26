<template>
    <Headline>Join a room</Headline>
    <input
        type="text"
        class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        placeholder="Room name"
        v-model="roomName"
    />
    <Button
        class="mt-4"
        @click="joinRoom"
    >
        Join
    </Button>
</template>

<script setup>
import { inject, ref } from 'vue';

import * as events from '../socket/events';
import Headline from '../components/typography/headlines/Headline.vue';
import Button from '../components/typography/buttons/Button.vue';

const roomName = ref('');
const socket = inject('socket');

const joinRoom = () => {
    socket.emit(events.ROOM_JOIN_TRY, {
        name: roomName,
    });

    socket.on(events.ROOM_JOIN_CONFIRM, () => {
        console.log('Room found!');
    });
};

</script>
