import { TimelineKeyframeStyle } from './settings/styles/timelineKeyframeStyle';
import { Selectable } from './utils/selectable';
export interface TimelineKeyframe extends TimelineKeyframeStyle, Selectable {
    val: number;
    /**
     * Related keyframe group.
     * Timeline keyframes groups are rendered as one bundle.
     */
    group?: any;
}
