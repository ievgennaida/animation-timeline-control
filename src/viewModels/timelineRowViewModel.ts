import { TimelineRow } from '../models/timelineRow';
import { TimelineGroupViewModel } from './timelineGroupViewModel';
import { TimelineKeyframeViewModel } from './timelineKeyframeViewModel';

export interface TimelineRowViewModel {
  /**
   * Screen coordinates of the element.
   */
  size: DOMRect;
  /**
   * Related row model.
   */
  model: TimelineRow;
  /**
   * Current row index.
   */
  index: number;
  /**
   * Row margin bottom
   */
  marginBottom: number;
  /**
   * Collection of the keyframes groups view models exists in the current row.
   */
  groupsViewModels: TimelineGroupViewModel[];

  /**
   * All keyframes in the current row.
   */
  keyframesViewModels: TimelineKeyframeViewModel[];
  min: number | null;
  max: number | null;
}
