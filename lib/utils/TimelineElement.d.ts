import { TimelineKeyframe } from '../timelineKeyframe';
import { TimelineElementType } from '../enums/timelineElementType';
import { TimelineRow } from '../timelineRow';
/**
 * Timeline clickable element.
 */
export interface TimelineElement {
    type: TimelineElementType;
    /**
     * Timeline value,
     */
    val: number;
    /**
     * Related keyframe model. In a case of a group this value will be empty.
     */
    keyframe?: TimelineKeyframe;
    /**
     * Related row model.
     */
    row?: TimelineRow;
}
