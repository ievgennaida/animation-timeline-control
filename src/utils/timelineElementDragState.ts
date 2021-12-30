import { TimelineElement } from './timelineElement';

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
