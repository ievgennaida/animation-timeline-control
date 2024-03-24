import { TimelineElementType } from '../enums/timelineElementType';
import { TimelineElementDragState } from './timelineElementDragState';
/**
 * Information about current drag state.
 */
export declare class TimelineDraggableData {
    /**
     * Whether position was changed.
     */
    changed: boolean;
    /**
     * Drag initial click target.
     */
    target: TimelineElementDragState;
    /**
     * Elements to be dragged.
     * Can be multiple elements, but drag will be started with target.
     */
    elements: TimelineElementDragState[];
    /**
     * Dragging type.
     */
    type: TimelineElementType;
    /**
     * Prev value.
     */
    val: number;
    /**
     * Prev value.
     */
    prevVal: number;
}
