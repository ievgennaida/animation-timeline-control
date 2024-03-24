import { TimelinePoint } from '../timelinePoint';
import { TimelineBaseEvent } from './timelineBaseEvent';
import { TimelineElementDragState } from '../timelineElementDragState';
export declare class TimelineDragEvent extends TimelineBaseEvent {
    args: MouseEvent | TouchEvent | null;
    get pos(): DOMPoint | null;
    /**
     * Elements to be dragged as a group.
     */
    elements: TimelineElementDragState[] | null;
    /**
     * Target element
     */
    target: TimelineElementDragState | null;
    /**
     * Timeline current active drag position.
     */
    point: TimelinePoint | null;
    /**
     * Timeline previous drag position.
     */
    prevPoint: TimelinePoint | null;
}
