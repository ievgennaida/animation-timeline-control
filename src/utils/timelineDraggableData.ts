import { TimelineKeyframe } from '../timelineKeyframe';
import { TimelineDraggableType } from '../enums/timelineDraggableType';
export interface TimelineDraggableData {
  type: TimelineDraggableType;
  /**
   * First selected keyframe (clicked one)
   */
  keyframe?: TimelineKeyframe;
  /**
   * Related draggable keyframes.
   */
  keyframes?: Array<TimelineKeyframe>;
  changed: boolean;
  val: number;
}
