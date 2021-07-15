import { TimelineElement } from './timelineElement';
import { TimelineElementType } from '../enums/timelineElementType';
import { TimelineValues } from './timelineValues';
export interface TimelineDraggableData extends TimelineValues {
    changed: boolean;
    /**
     * Drag initial click target.
     */
    target: TimelineElementDragState;
    /**
     * Elements to be dragged.
     */
    elements: Array<TimelineElementDragState>;
    /**
     * Dragging type.
     */
    type: TimelineElementType;
    /**
     * Prev value.
     */
    prevVal: number;
}
export interface TimelineElementDragState extends TimelineElement {
    /**
     * Drag started value.
     */
    startedVal: number;
    /**
     * Value before change.
     */
    prevVal: number;
}
