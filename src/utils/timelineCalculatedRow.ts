import { TimelineRow } from '../timelineRow';
import { TimelineCalculated } from './timelineCalculated';
import { TimelineCalculatedGroup } from './timelineCalculatedGroup';
import { TimelineCalculatedKeyframe } from './timelineCalculatedKeyframe';

export interface TimelineCalculatedRow extends TimelineCalculated {
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
   * Collection of the keyframes groups exists in a current row.
   */
  groups: Array<TimelineCalculatedGroup>;

  /**
   * All row keyframes
   */
  keyframes: Array<TimelineCalculatedKeyframe>;
}
