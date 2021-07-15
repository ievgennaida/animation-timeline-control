import { TimelineRow } from '../timelineRow';
import { TimelineKeyframe } from '../timelineKeyframe';
import { TimelineRanged } from '../timelineRanged';
export interface TimelineCalculated extends TimelineRanged {
    /**
     * Screen coordinates of the element.
     */
    size: DOMRect;
    /**
     * model keyframes.
     */
    keyframes: Array<TimelineCalculatedKeyframe>;
}
export interface TimelineModelCalcResults extends TimelineCalculated {
    /**
     * Collection of the rows sizes.
     */
    rows: Array<TimelineCalculatedRow>;
}
export interface TimelineCalculatedGroup extends TimelineCalculated {
    /**
     * related group.
     */
    group: any;
    /**
     * Grouped keyframes.
     */
    keyframes: Array<TimelineCalculatedKeyframe>;
}
export interface TimelineCalculatedKeyframe {
    size: DOMRect;
    model: TimelineKeyframe;
    parentRow: TimelineCalculatedRow;
    parentGroup: TimelineCalculatedGroup;
}
export interface TimelineCalculatedRow extends TimelineCalculated {
    /**
     * Related row model.
     */
    model: TimelineRow;
    /**
     * Current row index.
     */
    index: number;
    /**
     * Row margin bottom
     */
    marginBottom: number;
    /**
     * Collection of the keyframes groups exists in a current row.
     */
    groups: Array<TimelineCalculatedGroup>;
    /**
     * All row keyframes
     */
    keyframes: Array<TimelineCalculatedKeyframe>;
}
