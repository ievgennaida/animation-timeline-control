import { TimelineCursorType } from '../../enums/timelineCursorType';
import { TimelineKeyframeShape } from '../../enums/timelineKeyframeShape';
export interface TimelineKeyframeStyle {
    /**
     * Timeline cursor style.
     */
    cursor?: TimelineCursorType;
    /**
     * Timeline keyframe shape
     */
    shape?: TimelineKeyframeShape;
    /**
     * keyframe size, number or text 'auto'
     */
    height?: number | string;
    /**
     * keyframe size, number or text 'auto'
     */
    width?: number | string;
    /**
     * Keyframe fill color
     */
    fillColor?: string | null;
    /**
     * Keyframe selected fill color.
     */
    selectedFillColor?: string | null;
    /**
     * Keyframe stroke color.
     */
    strokeColor?: string | null;
    /**
     * Keyframe selected stroke color.
     */
    selectedStrokeColor?: string | null;
    /**
     * Keyframe stroke Thickness.
     */
    strokeThickness?: number | null;
}
