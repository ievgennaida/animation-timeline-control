import { TimelineBaseEvent } from './timelineBaseEvent';
import { TimelineEventSource } from '../../enums/timelineEventSource';
export declare class TimelineTimeChangedEvent extends TimelineBaseEvent {
    /**
     * new value to be set.
     */
    val: number;
    /**
     * previous value.
     */
    prevVal: number;
    source: TimelineEventSource;
}
