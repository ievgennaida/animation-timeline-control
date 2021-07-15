import { TimelineKeyframe } from '../timelineKeyframe';
export interface TimelineSelectionResults {
    /**
     * Changed nodes.
     */
    changed: Array<TimelineKeyframe>;
    /**
     * Selected nodes.
     */
    selected: Array<TimelineKeyframe>;
    /**
     * Whether data was changed.
     */
    selectionChanged: boolean;
}
