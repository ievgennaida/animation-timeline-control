import { TimelineValues } from './timelineValues';

/**
 * Mouse data helper container.
 */
export interface TimelineMouseData extends TimelineValues, DOMPoint {
  /**
   * Click radius
   */
  radius?: number;
  args?: TouchEvent | MouseEvent;
}
