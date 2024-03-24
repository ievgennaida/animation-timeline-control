import { TimelinePoint } from './timelinePoint';
/**
 * Mouse data helper container.
 */
export interface TimelineMouseData extends TimelinePoint {
    /**
     * Originated event args.
     */
    args: TouchEvent | MouseEvent;
    /**
     * Click radius.
     */
    radius?: number;
}
