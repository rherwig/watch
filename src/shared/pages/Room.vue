<template>
    <div class="root">
        <div class="video flex bg-black aspect-w-16 aspect-h-9">
            <Player/>
        </div>

        <RoomOverview class="room"/>

        <Chat class="chat"/>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import RoomOverview from '../components/room/RoomOverview.vue';
import Player from '@/components/players/Player.vue';
import Chat from '@/components/chat/Chat.vue';

const route = useRoute();
const store = useStore();

onMounted(() => {
    store.dispatch('users/join', {
        name: route.params.name,
    });
});
</script>

<style lang="scss" scoped>
    .root {
        display: grid;
        grid-template-areas:
            'video room'
            'video chat';
        grid-template-rows: 1fr 1fr;
        grid-template-columns: 1fr 400px;
        gap: 8px;
        height: 100%;
    }

    .video {
        grid-area: video;
    }

    .room {
        grid-area: room;
    }

    .chat {
        grid-area: chat;
    }
</style>
