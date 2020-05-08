import { TimelineKeyframe } from '../timelineKeyframe';
import { TimelineElementType } from '../enums/timelineElementType';
import { TimelineRow } from '../timelineRow';
/**
 * Timeline clickable element.
 */
export interface TimelineClickableElement {
    type: TimelineElementType;
    /**
     * Timeline value,
     */
    val: number;
    /**
     * Related keyframe model. In a case of stripe this value will be empty.
     */
    keyframe: TimelineKeyframe;
    /**
     * Related row model.
     */
    row: TimelineRow;
}
