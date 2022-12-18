import { TimelineElement } from '../timelineElement';
import { TimelinePoint } from '../timelinePoint';
import { TimelineBaseEvent } from './timelineBaseEvent';

export class TimelineClickEvent extends TimelineBaseEvent {
  args: MouseEvent | TouchEvent | null = null;
  /**
   * Clicked screen position.
   */
  get pos(): DOMPoint | null {
    return this.point?.pos || null;
  }
  get val(): number {
    if (this.point) {
      return this.point.val;
    }
    return NaN;
  }
  /**
   * All elements located under current mouse activity.
   */
  elements: TimelineElement[] = [];
  /**
   * Element that selected as target under the click.
   */
  target: TimelineElement | null = null;
  /**
   * Timeline current active drag position.
   */
  point: TimelinePoint | null = null;
}
