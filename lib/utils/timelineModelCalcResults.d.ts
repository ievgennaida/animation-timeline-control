import { TimelineCalculated } from './timelineCalculated';
import { TimelineCalculatedRow } from './timelineCalculatedRow';
/**
 * View model given with the calculated information.
 */
export interface TimelineModelCalcResults extends TimelineCalculated {
    /**
     * Collection of the rows sizes.
     */
    rows: TimelineCalculatedRow[];
}
