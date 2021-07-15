import { TimelineKeyframe } from '../../timelineKeyframe';
import { TimelineBaseEvent } from './timelineBaseEvent';
export declare class TimelineSelectedEvent extends TimelineBaseEvent {
    selected: Array<TimelineKeyframe>;
    changed: Array<TimelineKeyframe>;
}
