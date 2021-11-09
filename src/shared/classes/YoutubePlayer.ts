import * as youtubeState from '@/constants/youtube-player';
import { playerState } from '@/constants/player';
import Player from '@/classes/Player';

export default class YoutubePlayer extends Player {
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
                    this.internalState = event.data;

                    if (this.getState() === playerState.BUFFERING) {
                        return;
                    }

                    store.dispatch('video/setLocalState', {
                        state: this.getState(),
                    });
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
        }
    }

    stop() {
        this.player.stopVideo();
    }

    pause() {
        this.player.pauseVideo();
    }

    play(time = null) {
        if (time) {
            this.player.seekTo(time, false);
        }

        this.player.playVideo();
    }

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
}
