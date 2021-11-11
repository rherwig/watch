const dotenv = require('dotenv');

dotenv.config();

const {
    SSH_HOST,
    SSH_USER,
    GIT_REPOSITORY,
    GIT_BRANCH,
    WEB_ROOT,
} = process.env;

module.exports = {
    apps: [
        {
            name: 'watch-app',
            script: 'server.ts',
            interpreter: 'node',
            interpreter_args: '-r ts-node/register',
            watch: [
                'server.ts',
                'src/server',
            ],
            ignore_watch: [
                'node_modules',
                'var/**/*',
                'dist',
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
            user: SSH_USER,
            host: SSH_HOST,
            ref: GIT_BRANCH,
            repo: GIT_REPOSITORY,
            path: WEB_ROOT,
            ssh_options: 'ForwardAgent=yes',
            'pre-deploy-local': '',
            'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
            'pre-setup': '',
        },
    },
};
