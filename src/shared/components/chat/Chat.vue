<template>
    <div class="flex flex-col bg-white shadow-xl dark:bg-gray-900 text-white">
        <div class="flex-1 overflow-y-auto p-6 relative">
            <div
                v-for="(message, index) in messages"
                :key="index"
            >
                <div v-if="message.content">
            <span class="font-bold">
                {{ message.user.name }}:
            </span>
                    <span>
                {{ message.content }}
            </span>
                </div>
            </div>
        </div>
        <TextInput
            placeholder="Enter a chat message"
            class="chat-input"
            v-model="message"
            @keypress.enter="handleSendMessage"
        />
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

import TextInput from '@/components/ui/inputs/TextInput.vue';

const store = useStore();
const message = ref('');
const messages = computed(() => store.state.chat.messages);

const handleSendMessage = () => {
    store.dispatch('chat/send', {
        message: message.value,
    });

    message.value = '';
};
</script>

<style scoped lang="scss">
    .chat-input {
        @apply rounded-none #{!important};
    }
</style>
