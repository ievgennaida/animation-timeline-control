import { TimelineKeyframe } from '../../timelineKeyframe';
import { TimelineBaseEvent } from './timelineBaseEvent';

export class TimelineSelectedEvent extends TimelineBaseEvent {
  keyframes: Array<TimelineKeyframe>;
}
