<template>
    <div class="root">
        <div class="video flex bg-black aspect-w-16 aspect-h-9">
            <Player
                @ready="handlePlayerReady"
                @destroyed="handlePlayerDestroyed"
            />
        </div>

        <RoomOverview class="room"/>

        <Controls
            v-if="isPlayerReady"
            class="controls"
        />
    </div>
</template>

<script setup>
import { ref } from 'vue';

import Player from '../components/players/Player.vue';
import Controls from '../components/controls/Controls.vue';
import RoomOverview from '../components/room/RoomOverview.vue';

const isPlayerReady = ref(false);

const handlePlayerReady = () => {
    isPlayerReady.value = true;
};

const handlePlayerDestroyed = () => {
    isPlayerReady.value = false;
};
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
