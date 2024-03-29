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
            <span class="font-light mb-1 text-xl">
                atch
            </span>
        </div>
        <div
            v-if="isSearchVisible"
            class="flex flex-1"
        >
            <TextInput
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
import TextInput from '@/components/ui/inputs/TextInput.vue';
import { playerType } from '@/constants/player';

const route = useRoute();
const store = useStore();

const videoLink = ref('');
const isDarkMode = ref(true);
const isSearchVisible = computed(() => {
    return route.name === 'room';
});

const idRegex = {
    Youtube: /([A-Za-z0-9_\-]{11})($|&|\?)/,
    Dailymotion: /\/([A-Za-z0-9_\-]{7,})$|\?/,
};

const handleDarkMode = (value) => {
    isDarkMode.value = value;

    if (isDarkMode.value) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
};

const getPlayerInfos = () => {
    // Youtube
    if (videoLink.value.includes('youtu')) {
        return [ playerType.YOUTUBE, videoLink.value.match(idRegex.Youtube)[1] ];
    }

    // Dailymotion
    if (videoLink.value.includes('dailymotion') || videoLink.value.includes('dai.ly')) {
        return [ playerType.DAILYMOTION, videoLink.value.match(idRegex.Dailymotion)[1]];
    }

    // HTMLV
    // TBD

    // Unknown source
    return [ playerType.UNDEFINED, null ];
};

const load = () => {
    const [ type, videoId ] = getPlayerInfos();

    store.dispatch('video/load', {
        videoId,
        type,
    });

    videoLink.value = '';
};
</script>
