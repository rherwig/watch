# watch
Similar to [WatchTogether](https://w2g.tv), watch provides a platform to watch
videos from YouTube and other platforms in sync with your friends.

It is - and will remain - open source software, for anyone to use and modify.

>
> **Please note**
> 
> *watch* is currently in a pre-stable state and does not follow a strict
> agenda. Feel free to contribute either issues, suggestions or code.

## Features
- Watch YouTube videos together
- Communicate via room chat

For upcoming features, please refer to the issue section of this repository.

## Development
In order to start development on this project, follow the instructions from this chapter.

### Prerequisites
* [NodeJS](https://nodejs.org) >= 14

### Setup
You can install the project's dependencies and start the development server
by running the following commands from the project's root directory.

```bash
npm i
npm start
```

This will start the development server on `http://localhost:3000`.

### Environment (optional)
There is a `.env.dist` file inside the project's root directory which you can
use to configure your project environment.

```bash
cp .env.dist .env
```

At this point in time, the only configuration for you to adjust is the `PORT` that
determines which port the development server will run on.

### Code Quality
There are configuration files for both ESLint and Stylelint inside the project's
root directory. It is heavily recommended using your IDE's integration for those
tools or run the following command before creating a commit:

```bash
npm run lint
```

### Building for Production
To create a production build, run the following command:

```bash
npm run build
```

This will create a production version of the project inside the `dist/` directory,
which may be started by running:

```bash
npm run production
```

### Troubleshooting
This section features common pitfalls during development. This list is by no means
complete and will be extended when deemed appropriate.

**I made changes to the code, but the development server does not show them**

Sometimes, the reloading of the server causes trouble. Try restarting the development
server.

## Contributing
As of now, there are no exact contribution guidelines. Feel free to submit well-documented
issues and/or pull-requests.

## License
MIT
