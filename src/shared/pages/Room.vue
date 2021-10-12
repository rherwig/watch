<template>
    <div class="root">
        <div class="video flex bg-black aspect-w-16 aspect-h-9">
            <Player/>
        </div>

        <RoomOverview class="room"/>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import Player from '../components/players/Player.vue';
import RoomOverview from '../components/room/RoomOverview.vue';

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
            'controls .';
        grid-template-columns: 1fr 400px;
        gap: 8px;
    }

    .video {
        grid-area: video;
    }

    .room {
        grid-area: room;
    }

    .controls {
        grid-area: controls;
    }
</style>
