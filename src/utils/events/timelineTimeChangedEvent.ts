import { TimelineBaseEvent } from './timelineBaseEvent';
import { TimelineEventSource } from '../../enums/timelineEventSource';

export class TimelineTimeChangedEvent extends TimelineBaseEvent {
  /**
   * New value to be set if not prevented.
   */
  val = 0;
  /**
   * previous value, that actually set at the moment.
   */
  prevVal = 0;
  /**
   * Source of the change.
   */
  source: TimelineEventSource = TimelineEventSource.User;
}
