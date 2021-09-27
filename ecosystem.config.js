const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    apps: [
        {
            name: 'watch-app',
            script: 'server.js',
            watch: [
                'server.js',
                'src/server',
            ],
            ignore_watch: [
                'node_modules',
                'var/**/*',
                'dist'
            ],
            watch_options: {
                followSymlinks: false,
                usePolling: true,
            },
            env: {
                NODE_ENV: 'development',
            },
            env_production: {
                NODE_ENV: 'production',
            },
        },
    ],

    deploy: {
        production: {
            user: 'root',
            host: 'watch',
            ref: 'origin/main',
            repo: 'git@github.com:rherwig/watch.git',
            path: '/var/www/watch',
            'pre-deploy-local': '',
            'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
            'pre-setup': '',
        },
    },
};
