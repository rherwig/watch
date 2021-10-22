import { playerState, playerType } from "@/constants/player";
import * as youtubeState from '@/constants/youtube-player';

export class Player {
    constructor() {
        if (this.constructor === Player) {
            throw new Error('Abstract class Player shall not be instantiated!');
        }
    }

    static getPlayer(type, options) {
        switch(type) {
            case playerType.YOUTUBE:
                return new YoutubePlayer(options.videoId, options.store);

            default:
                return playerType.UNDEFINED;
        }
    };

    getState() {};
    stop() {};
    pause() {};
    play(time = null) {};
    destruct() {};
    getCurrentTime() {};
    getTotalTime() {};
    getTitle() {};

    internalState = playerState.UNDEFINED;
};

export class YoutubePlayer extends Player {
    constructor(videoId, store) {
        super();

        const options = {
            height: '100%',
            width: '100%',
            videoId,
            playerVars: {
                playsinline: 1,
                enablejsapi: 1,
                autoplay: 0,
            },
            events: {
                onReady: (event) => {
                    this.player = event.target;
                },
                onStateChange: (event) => {
                    store.dispatch('video/setLocalState', {
                        state: event.data,
                    });

                    this.internalState = event.data;
                },
            },
        };

        new YT.Player('player', options);
    }

    getState() {
        switch (this.internalState) {
            case youtubeState.UNSTARTED:
                return playerState.UNSTARTED;

            case youtubeState.ENDED:
                return playerState.ENDED;

            case youtubeState.PLAYING:
                return playerState.PLAYING;

            case youtubeState.PAUSED:
                return playerState.PAUSED;

            case youtubeState.BUFFERING:
                return playerState.BUFFERING;

            default:
                return playerState.UNDEFINED;
        };
    };

    stop() {
        this.player.stopVideo();
    };

    pause() {
        this.player.pauseVideo();
    };

    play(time = null) {
        if (time) {
            this.player.seekTo(time);
        }

        this.player.playVideo();
    };

    destruct() {
        this.player.destroy();
    }

    getCurrentTime() {
        return this.player.getCurrentTime();
    }

    getTotalTime() {
        return this.player.getDuration();
    }

    getTitle() {
        // TBD
    }

    player = null;
};
