import { TimelineBaseEvent } from './timelineBaseEvent';
import { TimelineEventSource } from '../../enums/timelineEventSource';
export declare class TimelineTimeChangedEvent extends TimelineBaseEvent {
    /**
     * New value to be set if not prevented.
     */
    val: number;
    /**
     * previous value, that actually set at the moment.
     */
    prevVal: number;
    /**
     * Source of the change.
     */
    source: TimelineEventSource;
}
