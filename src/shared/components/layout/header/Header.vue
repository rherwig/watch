<template>
    <nav class="flex items-center h-16 px-6 shadow mb-2">
        <div class="flex items-center flex-1">
            <span class="inline-flex items-center justify-center bg-gray-900 w-8 h-8 rounded-md">
                <img
                    :src="logo"
                    alt=""
                    class="w-6"
                >
            </span>
            <span class="font-light ml-1 mb-1 text-xl">
                atch
            </span>
        </div>
        <div
            v-if="isSearchVisible"
            class="flex flex-1"
        >
            <input
                type="text"
                class="shadow-sm text-gray-700 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Enter a watch ID"
                v-model="videoId"
            />
            <Button
                class="ml-1"
                @click="load"
            >
                Load
            </Button>
        </div>
        <div class="flex flex-1">

        </div>
    </nav>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { events, useSocket } from '../../../socket';
import logo from '../../../assets/images/logo.png';
import Button from '../../typography/buttons/Button.vue';

const route = useRoute();
const socket = useSocket();
const videoId = ref('');
const isSearchVisible = computed(() => {
    return route.name === 'room';
});

const load = () => {
    socket.emit(events.VIDEO_LOAD_REQUEST, {
        videoId: videoId.value,
    });

    videoId.value = '';
};
</script>
