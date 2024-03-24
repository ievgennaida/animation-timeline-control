import { TimelineElement } from './timelineElement';
export interface TimelineElementDragState extends TimelineElement {
    /**
     * Value that preserved before dragging is started.
     */
    startedVal: number;
    /**
     * Value before change.
     */
    prevVal: number;
}
