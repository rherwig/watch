<template>
    <div class="app h-full dark:bg-black">
        <Header class="header"/>
        <main class="content h-full py-1 overflow-hidden">
            <RouterView/>
        </main>
    </div>
</template>

<script setup>
import { provide } from 'vue';
import io from 'socket.io-client';

import Header from './components/layout/header/Header.vue';

const socket = !import.meta.env.SSR ? io(undefined, {
    reconnection: true,
    rejectUnauthorized: false,
    transports: ['websocket'],
}) : null;

provide('socket', socket);
</script>

<style lang="scss" scoped>
    .app {
        display: grid;
        grid-template-areas:
            'header'
            'content';
        grid-template-columns: 1fr;
        grid-template-rows: 4rem 1fr;
        height: 100%;
    }

    .header {
        grid-area: header;
    }

    .content {
        grid-area: content;
    }
</style>
