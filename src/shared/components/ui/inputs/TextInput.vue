<template>
    <input
        type="text"
        class="shadow-sm text-gray-700 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-100 dark:border-gray-700 dark:placeholder-gray-400"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    />
</template>

<script setup>
defineProps({
    modelValue: {
        type: String,
        default: '',
    },
});

defineEmits([
    'update:modelValue',
]);
</script>
