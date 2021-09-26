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
                        <a href="#"
                           class="border-indigo-500 text-indigo-600 whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm">Users</a>

<!--                        <a href="#"-->
<!--                           class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm">Online</a>-->

<!--                        <a href="#"-->
<!--                           class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm">Offline</a>-->
                    </nav>
                </div>
            </div>
            <ul role="list" class="flex-1 divide-y divide-gray-200 overflow-y-auto">
                <li>
                    <div class="relative group py-6 px-5 flex items-center">
                        <a href="#" class="-m-1 flex-1 block p-1">
                            <div class="absolute inset-0 group-hover:bg-gray-50"
                                 aria-hidden="true"></div>
                            <div class="flex-1 flex items-center min-w-0 relative">
      <span class="flex-shrink-0 inline-block relative">
        <img class="h-10 w-10 rounded-full"
             src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
             alt="">
          <!-- Online: "bg-green-400", Offline: "bg-gray-300" -->
        <span
            class="bg-green-400 absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white"
            aria-hidden="true"></span>
      </span>
                                <div class="ml-4 truncate">
                                    <p class="text-sm font-medium text-gray-900 truncate">Leslie
                                        Alexander</p>
                                    <p class="text-sm text-gray-500 truncate">@lesliealexander</p>
                                </div>
                            </div>
                        </a>
                        <div class="ml-2 flex-shrink-0 relative inline-block text-left">
<!--                            <button type="button"-->
<!--                                    class="group relative w-8 h-8 bg-white rounded-full inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"-->
<!--                                    id="options-menu-0-button" aria-expanded="false"-->
<!--                                    aria-haspopup="true">-->
<!--                                <span class="sr-only">Open options menu</span>-->
<!--                                <span-->
<!--                                    class="flex items-center justify-center h-full w-full rounded-full">-->
<!--        &lt;!&ndash; Heroicon name: solid/dots-vertical &ndash;&gt;-->
<!--        <svg class="w-5 h-5 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg"-->
<!--             viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">-->
<!--          <path-->
<!--              d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>-->
<!--        </svg>-->
<!--      </span>-->
<!--                            </button>-->

                            <!--
                              Dropdown panel, show/hide based on dropdown state.

                              Entering: "transition ease-out duration-100"
                                From: "transform opacity-0 scale-95"
                                To: "transform opacity-100 scale-100"
                              Leaving: "transition ease-in duration-75"
                                From: "transform opacity-100 scale-100"
                                To: "transform opacity-0 scale-95"
                            -->
<!--                            <div-->
<!--                                class="opacity-0 origin-top-right absolute z-10 top-0 right-9 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"-->
<!--                                role="menu"-->
<!--                                aria-orientation="vertical"-->
<!--                                aria-labelledby="options-menu-0-button"-->
<!--                                tabindex="-1"-->
<!--                            >-->
<!--                                <div class="py-1" role="none">-->
<!--                                    &lt;!&ndash; Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" &ndash;&gt;-->
<!--                                    <a-->
<!--                                        href="#"-->
<!--                                        class="text-gray-700 block px-4 py-2 text-sm"-->
<!--                                        role="menuitem"-->
<!--                                        tabindex="-1"-->
<!--                                        id="options-menu-0-item-0"-->
<!--                                    >-->
<!--                                        Play-->
<!--                                    </a>-->
<!--                                    <a-->
<!--                                        href="#"-->
<!--                                        class="text-gray-700 block px-4 py-2 text-sm"-->
<!--                                        role="menuitem"-->
<!--                                        tabindex="-1"-->
<!--                                        id="options-menu-0-item-1"-->
<!--                                    >-->
<!--                                        Remove-->
<!--                                    </a>-->
<!--                                </div>-->
<!--                            </div>-->
                        </div>
                    </div>
                </li>

                <!-- More people... -->
            </ul>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    isActive: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits([
    'close',
]);

const sidebarClasses = computed(() => {
    return {
        'translate-x-full': !props.isActive,
        'translate-x-0': props.isActive,
    };
});

const close = () => {
    emit('close');
};

</script>
