import { TimelineKeyframe } from './timelineKeyframe';
import { TimelineRowStyle } from './settings/styles/timelineRowStyle';

export interface TimelineRow extends TimelineRowStyle {
  keyframes?: Array<TimelineKeyframe>;
}
