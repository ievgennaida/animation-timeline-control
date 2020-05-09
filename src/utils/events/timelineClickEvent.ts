import { TimelineClickableElement } from '../timelineClickableElement';
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
   * Elements under the click
   */
  elements: Array<TimelineClickableElement>;
  /**
   * Target element
   */
  target: TimelineClickableElement;
}
