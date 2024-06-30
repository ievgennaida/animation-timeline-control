import { TimelineKeyframeStyle } from '../settings/styles/timelineKeyframeStyle';
import { TimelineGroupStyle } from '../settings/styles/timelineGroupStyle';
/**
 * Timeline group view model.
 */
export interface TimelineGroup {
  /**
   * Group style.
   */
  style: TimelineGroupStyle;
  /**
   * Child keyframes style.
   */
  keyframesStyle?: TimelineKeyframeStyle;
  /**
   * Whether group is draggable.
   * Considered to be false when really set as false.
   */
  draggable?: boolean;
  /**
   * Whether group keyframes are draggable.
   */
  keyframesDraggable?: boolean;
  /**
   * Whether group is hidden.
   */
  hidden?: boolean;
}
