import { TimelineKeyframeViewModel } from './timelineKeyframeViewModel';
import { TimelineRowViewModel } from './timelineRowViewModel';
export interface TimelineViewModel {
    /**
     * Screen coordinates of the element.
     */
    size: DOMRect;
    /**
     * Keyframes view models.
     */
    keyframesViewModels: TimelineKeyframeViewModel[];
    /**
     * Collection of the rows sizes.
     */
    rowsViewModels: TimelineRowViewModel[];
    min: number | null;
    max: number | null;
}
