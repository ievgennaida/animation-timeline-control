import { TimelineCalculated } from './timelineCalculated';
import { TimelineCalculatedRow } from './timelineCalculatedRow';
export interface TimelineModelCalcResults extends TimelineCalculated {
    /**
     * Collection of the rows sizes.
     */
    rows: Array<TimelineCalculatedRow>;
}
