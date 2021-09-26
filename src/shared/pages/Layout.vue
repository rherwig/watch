<template>
    <div class="root">
        <div class="video flex bg-gray-200 aspect-w-16 aspect-h-9">
            <div class="flex items-center justify-center h-full w-full border-gray-300 border-4 border-dashed">
                Video
            </div>
        </div>

        <div class="feed flex h-32">
            <div class="flex-1 bg-gray-300 p-4 mr-2">
                Feed
            </div>
            <div class="h-full w-1/5 bg-gray-300 p-4">
                Users
            </div>
        </div>

        <Playlist :is-active="isPlaylistVisible" @close="hidePlaylist"/>
    </div>
</template>

<script setup>
import { ref } from 'vue';

import Playlist from './layout/Playlist.vue';

const isPlaylistVisible = ref(false);

const hidePlaylist = () => {
    isPlaylistVisible.value = false;
};
</script>

<style lang="scss" scoped>
    .root {
        display: grid;
        grid-template-areas:
            'video feed'
            'footer footer';
        grid-template-columns: 1fr 400px;
        gap: 8px;
    }

    .video {
        grid-area: video;
    }

    .feed {
        grid-area: footer;
    }
</style>
