import { TimelineBaseEvent } from './timelineBaseEvent';
import { TimelineEventSource } from '../../enums/timelineEventSource';

export class TimelineTimeChangedEvent extends TimelineBaseEvent {
  /**
   * new value to be set.
   */
  val = 0;
  /**
   * previous value.
   */
  prevVal = 0;
  source: TimelineEventSource = TimelineEventSource.User;
}
