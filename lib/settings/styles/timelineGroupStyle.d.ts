import { TimelineCursorType } from '../../enums/timelineCursorType';
import { TimelineKeyframeStyle } from '../styles/timelineKeyframeStyle';
/**
 * Timeline group style.
 */
export interface TimelineGroupStyle {
    /**
     * Keyframes style height in pixels.
     * 'auto' to automatically calculate.
     */
    height?: number | string;
    /**
     * Group stroke color.
     */
    strokeColor?: string;
    /**
     * Group stroke thickness.
     */
    strokeThickness?: number | null;
    /**
     * Group border radius. See canvas roundRect official documentation.
     */
    radii?: number | DOMPointInit | Iterable<number | DOMPointInit>;
    /**
     * Group fill color.
     */
    fillColor?: string;
    /**
     * Group mouse over cursor style.
     */
    cursor?: TimelineCursorType;
    /**
     * Margin top in px or 'auto' to center element.
     */
    marginTop?: number | string;
    /**
     * Style for all the keyframes in the current group.
     */
    keyframesStyle?: TimelineKeyframeStyle;
}
