import { TimelineClickableElement } from './timelineClickableElement';
import { TimelineElementType } from '../enums/timelineElementType';
export interface TimelineDraggableData {
    changed: boolean;
    /**
     * Drag initial click target.
     */
    target: TimelineClickableElement;
    /**
     * Elements to be dragged.
     */
    elements: Array<TimelineClickableElement>;
    /**
     * Dragging type.
     */
    type: TimelineElementType;
    /**
     * current drag position with the offset.
     */
    val: number;
}
