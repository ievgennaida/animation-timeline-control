import { TimelineClickableElement } from './timelineClickableElement';
import { TimelineElementType } from '..';

export interface TimelineDraggableData {
  changed: boolean;
  /**
   * Drag click target
   */
  target: TimelineClickableElement;
  elements: Array<TimelineClickableElement>;
  type: TimelineElementType;
  /**
   * Current drag data.
   */
  val: number;
}
