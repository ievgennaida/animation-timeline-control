import { TimelineGroupStyle } from '../settings/styles/timelineGroupStyle';
/**
 * Timeline group view model.
 */
export interface TimelineGroup {
    style: TimelineGroupStyle;
    /**
     * Whether group of keyframes are draggable.
     */
    draggable?: boolean;
}
