import { playerType } from '@/constants/player';
import YoutubePlayer from '@/classes/YoutubePlayer';
import DailymotionPlayer from '@/classes/DailymotionPlayer';

export default class PlayerFactory {
    static getPlayer(type, options) {
        switch (type) {
            case playerType.YOUTUBE:
                return new YoutubePlayer(options.videoId, options.store);

            case playerType.DAILYMOTION:
                return new DailymotionPlayer(options.videoId, options.store);

            default:
                return playerType.UNDEFINED;
        }
    }
}
