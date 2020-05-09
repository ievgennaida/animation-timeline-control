import { TimelineKeyframe } from './timelineKeyframe';
import { TimelineRowStyle } from './settings/styles/timelineRowStyle';

export interface TimelineRow extends TimelineRowStyle {
  keyframes?: Array<TimelineKeyframe>;
  /**
   * keyframes stripe is draggable.
   */
  stripeDraggable?: boolean;
  /**
   * keyframes stripe is draggable.
   */
  keyframesDraggable?: boolean;
}
