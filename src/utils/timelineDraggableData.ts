import { TimelineElement } from './timelineElement';
import { TimelineElementType } from '../enums/timelineElementType';

export interface TimelineDraggableData {
  changed: boolean;
  /**
   * Drag initial click target.
   */
  target: TimelineElement;
  /**
   * Elements to be dragged.
   */
  elements: Array<TimelineElement>;
  /**
   * Dragging type.
   */
  type: TimelineElementType;
  /**
   * current drag position with the offset.
   */
  val: number;
}
