import { TimelineBaseEvent } from './timelineBaseEvent';
import { TimelineElement } from '../timelineElement';
import { TimelineEventSource } from '../../animation-timeline';
export declare class TimelineKeyframeChangedEvent extends TimelineBaseEvent {
    /**
     * Value to be used.
     */
    val: number;
    /**
     * Previous value.
     */
    prevVal: number;
    /**
     * Target element
     */
    target: TimelineElement;
    /**
     * Event source.
     */
    source: TimelineEventSource;
}
