module.exports = {
    purge: [
        './src/**/*.{html,vue,js,ts}',
    ],
    darkMode: false,
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}
