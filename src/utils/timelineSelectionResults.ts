import { TimelineKeyframe } from '../models/timelineKeyframe';

export interface TimelineSelectionResults {
  /**
   * Changed nodes.
   */
  changed: TimelineKeyframe[];
  /**
   * Selected nodes.
   */
  selected: TimelineKeyframe[];
  /**
   * Whether data was changed.
   */
  selectionChanged: boolean;
}
