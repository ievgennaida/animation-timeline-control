/* eslint-disable @typescript-eslint/no-explicit-any */
import { TimelineKeyframe } from '../timelineKeyframe';
import { TimelineElementType } from '../enums/timelineElementType';
import { TimelineRow } from '../timelineRow';
/**
 * Timeline clickable element.
 */
export interface TimelineElement {
  type: TimelineElementType;
  /**
   * Timeline value,
   */
  val: number;

  /**
   * Related keyframe model.
   */
  keyframe?: TimelineKeyframe;

  /**
   * Related row model.
   */
  row?: TimelineRow;

  /**
   * Current group.
   */
  group?: any;
  /**
   * List of the selected, grouped, row keyframes.
   */
  keyframes?: Array<TimelineKeyframe>;
}
