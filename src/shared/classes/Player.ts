import { playerState } from '@/constants/player';

export default abstract class Player {
    internalState = playerState.UNDEFINED;

    player = null;

    protected constructor() {
        if (this.constructor === Player) {
            throw new Error('Abstract class Player shall not be instantiated!');
        }
    }

    public abstract getState();

    public abstract stop();

    public abstract pause();

    public abstract play(time?: number);

    public abstract destruct();

    public abstract getCurrentTime();

    public abstract getTotalTime();

    public abstract getTitle();
}
