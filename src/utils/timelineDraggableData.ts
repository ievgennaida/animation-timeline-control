import { TimelineElementType } from '../enums/timelineElementType';
import { TimelineValues } from './timelineValues';
import { TimelineElementDragState } from './timelineElementDragState';

export interface TimelineDraggableData extends TimelineValues {
  changed: boolean;
  /**
   * Drag initial click target.
   */
  target: TimelineElementDragState;
  /**
   * Elements to be dragged.
   */
  elements: Array<TimelineElementDragState>;
  /**
   * Dragging type.
   */
  type: TimelineElementType;
  /**
   * Prev value.
   */
  prevVal: number;
}
