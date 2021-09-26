<template>
<!--    <YouTubePlayer/>-->
    <div class="flex p-16 text-gray-100 h-1/2" v-if="isJoined">
        <div class="bg-gray-800 p-4 flex-1">
            <div class="mb-2" v-for="(message, index) in chatMessages" :key="index">
                <span class="font-bold">
                    {{ message.user.name }}:&nbsp;
                </span>
                <span>
                    {{ message.message }}
                </span>
            </div>
        </div>
        <div class="p-4">
            <div class="font-bold mb-4">Users</div>
            <div
                v-for="user in users.values()"
                :key="user.id"
                class=""
            >
                <span>{{ user.name }}</span>
                <span v-if="user.isMe">&nbsp;(you)</span>
            </div>
        </div>
    </div>
    <div class="flex text-gray-100 w-full px-16">
        <input
            type="text"
            class="shadow-sm text-gray-700 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Type a message..."
            v-model="chatMessage"
            @keydown.enter="sendMessage"
        />
        <Button
            class="ml-2"
            @click="sendMessage"
        >
            Send
        </Button>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { useSocket } from '../socket';
import * as events from '../socket/events';

import Headline from '../components/typography/headlines/Headline.vue';
import YouTubePlayer from '../components/players/YouTubePlayer.vue';
import Button from '../components/typography/buttons/Button.vue';

const route = useRoute();
const socket = useSocket();

const { name } = route.params;
const isJoined = ref(false);
const users = ref(new Map());
const chatMessages = ref([]);
const chatMessage = ref('');

onMounted(() => {
    socket.emit(events.ROOM_JOIN_TRY, {
        name,
    });

    socket.on(events.ROOM_JOIN_CONFIRM, (payload) => {
        if (payload.name !== name) {
            return;
        }

        isJoined.value = true;
    });

    socket.on(events.ROOM_USER_JOINED, (payload) => {
        const { room, user } = payload;

        if (room !== name) {
            return;
        }

        users.value.set(user.id, user);
    });

    socket.on(events.ROOM_USER_LEFT, (payload) => {
        const { id } = payload.user;

        users.value.delete(id);
    });

    socket.on(events.ROOM_USER_UPDATE, (payload) => {
        payload.users.forEach((user) => {
            if (user.id === socket.id) {
                user.isMe = true;
            }

            users.value.set(user.id, user);
        });
    });

    socket.on(events.CHAT_MESSAGE_RECEIVED, (payload) => {
        chatMessages.value.push({
            user: payload.user,
            message: payload.message,
        });
    });
});

const sendMessage = () => {
    socket.emit(events.CHAT_MESSAGE_SEND, {
        message: chatMessage.value,
    });

    chatMessage.value = '';
};
</script>
