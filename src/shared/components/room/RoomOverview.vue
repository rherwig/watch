<template>
    <div class="w-full">
        <div class="h-full flex flex-col bg-white shadow-xl dark:bg-gray-900">
            <div class="p-6">
                <div class="flex items-start justify-between">
                    <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100" id="slide-over-title">
                        Room
                    </h2>
                </div>
            </div>
            <div class="border-b border-gray-200 dark:border-gray-800">
                <div class="px-6">
                    <nav class="-mb-px flex space-x-6">
                        <a
                            href="#"
                            class="border-indigo-500 text-indigo-600 whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm dark:text-indigo-200 dark:border-indigo-300"
                        >
                            Users
                        </a>
                    </nav>
                </div>
            </div>
            <ul role="list" class="flex-1 divide-y divide-gray-200 dark:divide-gray-800 overflow-y-auto">
                <li
                    v-for="user in users"
                    :key="user.id"
                >
                    <div class="relative group py-6 px-5 flex items-center">
                        <a href="#" class="-m-1 flex-1 block p-1">
                            <div
                                class="absolute inset-0 group-hover:bg-gray-50 dark:group-hover:bg-gray-800"
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
                                    <p class="text-sm font-medium text-gray-900 truncate dark:text-gray-100">
                                        {{ user.name }}
                                    </p>
                                    <p
                                        v-if="me.id === user.id"
                                        class="text-sm text-gray-500 truncate dark:text-gray-400"
                                    >
                                        you
                                    </p>
                                </div>
                            </div>
                        </a>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const users = computed(() => store.state.users.all);
const me = computed(() => store.getters['users/me']);
</script>
