const express = require('express');
const helmet = require('helmet');
const { createServer } = require('http');
const { resolve } = require('path');
const { readFileSync } = require('fs');
const { Server } = require('socket.io');

const isProduction = process.env.NODE_ENV === 'production';
const root = resolve(__dirname);

const configureDevelopment = async (app) => {
    const vite = await require('vite').createServer({
        root,
        logLevel: 'info',
        server: {
            middlewareMode: true,
            watch: {
                usePolling: true,
                interval: 100,
            },
        },
    });

    app.use(vite.middlewares);

    return {
        vite,
    };
};

const configureProduction = async (app) => {
    app.use(require('serve-static')(resolve(__dirname, 'dist/client'), {
        index: false,
    }));

    return {};
};

const getMarkup = async (url, env) => {
    const { vite } = env;

    const template = vite ? await vite.transformIndexHtml(
        url,
        readFileSync(resolve(root, 'index.html'), 'utf-8'),
    ) : readFileSync(resolve(__dirname, 'dist/client/index.html'), 'utf-8');

    const manifest = vite ? {} : require('./dist/client/ssr-manifest.json');

    const { render } = vite
        ? await vite.ssrLoadModule('/src/server/index')
        : require('./dist/server/index');

    const { markup } = await render(url, manifest);

    return template.replace('<!--ssr-root-->', markup);
};

(async () => {
    const app = express();
    const server = createServer(app);
    const io = new Server(server, {
        serveClient: false,
    });

    const environmentConfig = isProduction
        ? await configureProduction(app)
        : await configureDevelopment(app);

    const { vite } = environmentConfig;

    app.use(helmet({
        contentSecurityPolicy: false,
    }));

    app.use('*', async (req, res) => {
        try {
            const html = await getMarkup(req.originalUrl, environmentConfig);

            res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
        } catch (error) {
            if (!isProduction && environmentConfig.vite) {
                environmentConfig.vite.ssrFixStacktrace(error);
                console.error(error.stack);
            }

            res.status(500).end(error.stack);
        }
    });

    const { registerSocket } = vite
        ? await vite.ssrLoadModule('/src/server/index')
        : require('./dist/server/index');

    registerSocket(io);

    server.listen(3000, () => {
        console.log('Server listening on port 3000...');
    });

    process.on('SIGTERM', () => {
        server.close(() => {
            console.log('Server closed.');
        });
    });
})();
