import Player from './Player';
import { playerState } from '@/constants/player';

export default class DailymotionPlayer extends Player {
    constructor(videoId, store) {
        super();

        this.player = DM.player(document.getElementById('player'), {
            video: videoId,
            width: '100%',
            height: '100%',
            params: {
                autoplay: false,
                mute: false,
            },
        });

        this.player.addEventListener('apiready', () => {
            store.dispatch('video/setLocalState', {
                state: playerState.UNSTARTED,
            });
        });

        this.player.addEventListener('start', () => {
            store.dispatch('video/setLocalState', {
                state: playerState.PLAYING,
            });
        });

        this.player.addEventListener('play', () => {
            store.dispatch('video/setLocalState', {
                state: playerState.PLAYING,
            });
        });

        this.player.addEventListener('playing', () => {
            store.dispatch('video/setLocalState', {
                state: playerState.PLAYING,
            });
        });

        this.player.addEventListener('pause', () => {
            store.dispatch('video/setLocalState', {
                state: playerState.PAUSED,
            });
        });

        this.player.addEventListener('seeking', () => {
            store.dispatch('video/setLocalState', {
                state: playerState.BUFFERING,
            });
        });

        this.player.addEventListener('video_end', () => {
            store.dispatch('video/setLocalState', {
                state: playerState.ENDED,
            });
        });
    }

    getState() {}

    stop() {
        this.player.load();
    }

    pause() {
        this.player.pause();
    }

    play(time = null) {
        if (time) {
            this.player.seek(time);
        }

        this.player.play();
    }

    destruct() {
        this.player.release();
    }

    getCurrentTime() {
        return this.player.currentTime;
    }

    getTotalTime() {}

    getTitle() {
        return this.player.video.title;
    }
}
