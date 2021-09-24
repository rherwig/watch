<template>
    <main class="m-16">
        <RouterView/>
    </main>
</template>

<script setup>
import { onMounted, provide } from 'vue';
import io from 'socket.io-client';

const socket = !import.meta.env.SSR ? io('http://localhost:3000', {
    reconnection: true,
    rejectUnauthorized: false,
    transports: ['websocket'],
}) : null;

provide('socket', socket);

onMounted(() => {
    socket.on("connect_error", (err) => {
        console.log(err);
    });
    socket.emit('debug');
});
</script>
