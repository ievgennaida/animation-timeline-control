import { TimelineElement } from './timelineElement';
import { TimelineElementType } from '../enums/timelineElementType';
import { TimelineValues } from './timelineValues';
export interface TimelineDraggableData extends TimelineValues {
    changed: boolean;
    /**
     * Drag initial click target.
     */
    target: TimelineElement;
    /**
     * Elements to be dragged.
     */
    elements: Array<TimelineElement>;
    /**
     * Dragging type.
     */
    type: TimelineElementType;
}
