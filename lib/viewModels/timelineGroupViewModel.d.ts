import { TimelineGroup } from '../models/timelineGroup';
import { TimelineKeyframeViewModel } from './timelineKeyframeViewModel';
export interface TimelineGroupViewModel {
    /**
     * Size of the element in screen coordinates.
     */
    size: DOMRect | null;
    /**
     * From value in the timeline keyframes collection.
     */
    min: number;
    /**
     * To value in the timeline keyframes collection.
     */
    max: number;
    /**
     * Related Group Model.
     */
    groupModel: string | TimelineGroup;
    /**
     * Related Grouped keyframes view models.
     */
    keyframesViewModels: TimelineKeyframeViewModel[];
}
