import { TimelineKeyframeStyle } from './timelineKeyframeStyle';
export interface TimelineRowStyle {
    /**
     * Size of the row in pixels, can be set to 'auto'
     */
    height: string | number;
    hidden?: boolean;
    color?: string;
    selectedColor?: string;
    marginBottom?: number;
    /**
     * keyframes stripe is draggable.
     */
    stripeDraggable?: boolean;
    /**
     * Keyframes bounds stripe height.
     * 'auto' to automatically calculate.
     * number in pixels.
     */
    stripeHeight?: number | string;
    /**
     * Keyframes bounds stripe color. Default is used when undefined.
     */
    stripeFillColor?: string;
    /**
     * Style of all keyframes in a current row.
     */
    keyframesStyle?: TimelineKeyframeStyle;
}
