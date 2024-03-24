import { TimelineKeyframeStyle } from '../settings/styles/timelineKeyframeStyle';
import { TimelineSelectable } from '../utils/timelineSelectable';
import { TimelineRanged } from './timelineRanged';
import { TimelineGroup } from './timelineGroup';
export interface TimelineKeyframe extends TimelineSelectable, TimelineRanged {
    /**
     * Keyframe value.
     */
    val: number;
    /**
     * Related keyframe group.
     * Timeline keyframes groups are rendered as one instance.
     */
    group?: string | TimelineGroup;
    /**
     * Keyframe style.
     */
    style?: TimelineKeyframeStyle;
    /**
     * Whether keyframe is hidden.
     */
    hidden?: boolean;
    /**
     * Whether group is draggable.
     * Considered to be false when really set as false.
     */
    draggable?: boolean;
}
