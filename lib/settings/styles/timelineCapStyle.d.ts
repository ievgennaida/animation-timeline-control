import { TimelineCapShape } from '../../enums/timelineCapShape';
/**
 * Timeline active/current value indicator style.
 */
export interface TimelineCapStyle {
    /**
     * Cap style width in pixels.
     */
    width?: number;
    /**
     * Cap style height in pixels.
     */
    height?: number;
    /**
     * Cap stroke color.
     */
    strokeColor?: string;
    /**
     * Cap fill color.
     */
    fillColor?: string;
    /**
     * Cap type
     */
    capType?: TimelineCapShape;
}
