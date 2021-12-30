import { TimelineCalculated } from './timelineCalculated';
import { TimelineCalculatedKeyframe } from './timelineCalculatedKeyframe';
export interface TimelineCalculatedGroup extends TimelineCalculated {
    /**
     * related group.
     */
    group: unknown;
    /**
     * Grouped keyframes.
     */
    keyframes: Array<TimelineCalculatedKeyframe>;
}
