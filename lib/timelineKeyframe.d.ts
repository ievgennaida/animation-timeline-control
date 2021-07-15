import { TimelineKeyframeStyle } from './settings/styles/timelineKeyframeStyle';
import { Selectable } from './utils/selectable';
import { TimelineRanged } from './timelineRanged';
export interface TimelineKeyframe extends TimelineKeyframeStyle, Selectable, TimelineRanged {
    val: number;
    /**
     * Related keyframe group.
     * Timeline keyframes groups are rendered as one bundle.
     */
    group?: any;
}
