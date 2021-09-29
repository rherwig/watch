<template>
    <div class="flex items-center">
        <!-- Enabled: "bg-indigo-600", Not Enabled: "bg-gray-200" -->
        <button
            type="button"
            class="bg-gray-200 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            :class="buttonClasses"
            role="switch"
            aria-checked="false"
            aria-labelledby="annual-billing-label"
            @click="handleClick"
        >
            <!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
            <span
                aria-hidden="true"
                class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                :class="labelClasses"
            ></span>
        </button>
        <span class="ml-3" id="annual-billing-label">
            <span class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ label }}</span>
        </span>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    label: {
        type: String,
        default: '',
    },
    value: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['input']);

const buttonClasses = computed(() => {
    return {
        'bg-blue-900': props.value,
        'bg-gray-200': !props.value,
    };
});

const labelClasses = computed(() => {
    return {
        'translate-x-5': props.value,
        'translate-x-0': !props.value,
    };
});

const handleClick = () => {
    emit('input', !props.value);
};
</script>
