import { TimelinePoint } from '../timelinePoint';
import { TimelineBaseEvent } from './timelineBaseEvent';
import { TimelineElementDragState } from '../timelineElementDragState';

export class TimelineDragEvent extends TimelineBaseEvent {
  args: MouseEvent | TouchEvent | null = null;
  get pos(): DOMPoint | null {
    return this.point?.pos || null;
  }
  /**
   * Elements to be dragged as a group.
   */
  elements: TimelineElementDragState[] | null = null;
  /**
   * Target element
   */
  target: TimelineElementDragState | null = null;
  /**
   * Timeline current active drag position.
   */
  point: TimelinePoint | null = null;
  /**
   * Timeline previous drag position.
   */
  prevPoint: TimelinePoint | null = null;
}
