import { TimelineValues } from '../timelineValues';
import { TimelineBaseEvent } from './timelineBaseEvent';
import { TimelineElementDragState } from '../timelineDraggableData';
export declare class TimelineDragEvent extends TimelineBaseEvent implements TimelineValues {
    args: MouseEvent;
    /**
     * Clicked screen position.
     */
    pos: DOMPoint;
    /**
     * Elements to be dragged as a group.
     */
    elements: Array<TimelineElementDragState>;
    /**
     * Target element
     */
    target: TimelineElementDragState;
    /**
     * Value to be used.
     */
    val: number;
    /**
     * prev value.
     */
    prevVal: number;
    /**
     * Snapped value.
     */
    snapVal: number;
    /**
     * Unsnapped original value.
     */
    originalVal: number;
}
