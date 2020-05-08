import { TimelineClickableElement } from '../timelineClickableElement';
export declare class TimelineClickEvent {
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
    private _prevented;
    /**
     * Prevent default click logic.
     */
    preventDefault(): void;
    isPrevented(): boolean;
}
