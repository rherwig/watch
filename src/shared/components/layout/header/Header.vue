<template>
    <nav class="flex items-center h-16 px-6 shadow mb-2 dark:bg-gray-900 dark:text-gray-100">
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
                class="shadow-sm text-gray-700 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-100 dark:border-gray-700 dark:placeholder-gray-400"
                placeholder="Enter a video URL"
                v-model="videoLink"
            />
            <Button
                class="ml-1"
                @click="load"
            >
                Load
            </Button>
        </div>
        <div class="flex flex-1 justify-end">
            <Switch label="Dark Mode" @input="handleDarkMode" :value="isDarkMode"/>
        </div>
    </nav>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import logo from '../../../assets/images/logo.png';
import Button from '../../ui/buttons/Button.vue';
import Switch from '../../ui/buttons/Switch.vue';

const route = useRoute();
const store = useStore();

const videoLink = ref('');
const isDarkMode = ref(true);
const isSearchVisible = computed(() => {
    return route.name === 'room';
});

const handleDarkMode = (value) => {
    isDarkMode.value = value;

    if (isDarkMode.value) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
};

const load = () => {
    const idRegex = /([A-Za-z0-9_\-]{11})($|&|\?)/;
    const videoId = videoLink.value.match(idRegex)[1];

    store.dispatch('video/load', {
        videoId,
    });

    videoLink.value = '';
};
</script>
