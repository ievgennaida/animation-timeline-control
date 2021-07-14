import { TimelineKeyframeShape } from '../../enums/timelineKeyframeShape';
export interface TimelineKeyframeStyle {
    cursor?: string;
    shape?: TimelineKeyframeShape;
    draggable?: boolean;
    hidden?: boolean;
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
     * Keyframe selected  fill color.
     */
    selectedFillColor?: string | null;
    strokeColor?: string | null;
    selectedStrokeColor?: string | null;
    strokeThickness?: number | null;
}
