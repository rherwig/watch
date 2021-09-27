import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [
        vue(),
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src/shared'),
            '@client': resolve(__dirname, 'src/client'),
            '@server': resolve(__dirname, 'src/server'),
        },
    },
});
