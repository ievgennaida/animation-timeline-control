import { TimelineKeyframe } from './timelineKeyframe';
import { TimelineRowStyle } from './settings/styles/timelineRowStyle';
import { TimelineRanged } from './timelineRanged';

export interface TimelineRow extends TimelineRowStyle, TimelineRanged {
  keyframes?: Array<TimelineKeyframe>;
}
