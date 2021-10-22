import { playerState } from '@/constants/player';

export default class Player {
    internalState = playerState.UNDEFINED;
    player = null;

    constructor() {
        if (this.constructor === Player) {
            throw new Error('Abstract class Player shall not be instantiated!');
        }
    }

    getState() {};
    stop() {};
    pause() {};
    play(time = null) {};
    destruct() {};
    getCurrentTime() {};
    getTotalTime() {};
    getTitle() {};
};
