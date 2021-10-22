import { playerType } from '@/constants/player';
import YoutubePlayer from '@/classes/YoutubePlayer';

export default class PlayerFactory {
    static getPlayer(type, options) {
        switch(type) {
            case playerType.YOUTUBE:
                return new YoutubePlayer(options.videoId, options.store);

            default:
                return playerType.UNDEFINED;
        }
    };
};
