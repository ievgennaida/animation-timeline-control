import { TimelineRanged } from '../timelineRanged';
import { TimelineCalculatedKeyframe } from './timelineCalculatedKeyframe';
export interface TimelineCalculated extends TimelineRanged {
    /**
     * Screen coordinates of the element.
     */
    size: DOMRect;
    /**
     * model keyframes.
     */
    keyframes: TimelineCalculatedKeyframe[];
}
