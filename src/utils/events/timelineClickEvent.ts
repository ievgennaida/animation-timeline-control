import { TimelineElement } from '../timelineElement';
import { TimelineBaseEvent } from './timelineBaseEvent';

export class TimelineClickEvent extends TimelineBaseEvent {
  args: MouseEvent;
  /**
   * Clicked screen position.
   */
  pos: DOMPoint;
  /**
   * Click time value.
   */
  val: number;

  /**
   * Elements list under the click
   */
  elements: Array<TimelineElement>;
  /**
   * Target element
   */
  target: TimelineElement;
}
