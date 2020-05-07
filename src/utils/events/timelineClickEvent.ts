import { TimelineClickableElement } from '../timelineClickableElement';

export class TimelineClickEvent {
  args: MouseEvent;
  /**
   * Clicked screen position.
   */
  pos: DOMPoint = new DOMPoint();
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
  private _prevented = false;
  /**
   * Prevent default click logic.
   */
  preventDefault(): void {
    this._prevented = true;
  }

  isPrevented(): boolean {
    return this._prevented;
  }
}
