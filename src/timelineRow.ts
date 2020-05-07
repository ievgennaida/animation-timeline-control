import { TimelineKeyframe } from './timelineKeyframe';
import { TimelineRowStyle } from './settings/styles/TimelineRowStyle';

export interface TimelineRow extends TimelineRowStyle {
  name?: string;
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
