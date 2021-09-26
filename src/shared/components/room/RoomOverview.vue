<template>
    <div class="w-full">
        <div class="h-full flex flex-col bg-white shadow-xl">
            <div class="p-6">
                <div class="flex items-start justify-between">
                    <h2 class="text-lg font-medium text-gray-900" id="slide-over-title">
                        Room
                    </h2>
                </div>
            </div>
            <div class="border-b border-gray-200">
                <div class="px-6">
                    <nav class="-mb-px flex space-x-6">
                        <!-- Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" -->
                        <a
                            href="#"
                            class="border-indigo-500 text-indigo-600 whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm"
                        >
                            Users
                        </a>
                    </nav>
                </div>
            </div>
            <ul role="list" class="flex-1 divide-y divide-gray-200 overflow-y-auto">
                <li
                    v-for="user in users.values()"
                    :key="user.id"
                >
                    <div class="relative group py-6 px-5 flex items-center">
                        <a href="#" class="-m-1 flex-1 block p-1">
                            <div
                                class="absolute inset-0 group-hover:bg-gray-50"
                                aria-hidden="true"
                            ></div>
                            <div class="flex-1 flex items-center min-w-0 relative">
                                <span class="flex-shrink-0 inline-block relative">
                                    <span class="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                                        <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    </span>

                                    <span
                                        class="bg-green-400 absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white"
                                        aria-hidden="true"
                                    ></span>
                                </span>
                                <div class="ml-4 truncate">
                                    <p class="text-sm font-medium text-gray-900 truncate">
                                        {{ user.name }}
                                    </p>
                                    <p
                                        v-if="user.isMe"
                                        class="text-sm text-gray-500 truncate"
                                    >
                                        you
                                    </p>
                                </div>
                            </div>
                        </a>
                    </div>
                </li>

                <!-- More people... -->
            </ul>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { events, useSocket } from '../../socket';

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
