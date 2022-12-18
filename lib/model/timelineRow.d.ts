import { TimelineKeyframe } from './timelineKeyframe';
import { TimelineRowStyle } from '../settings/styles/timelineRowStyle';
import { TimelineRanged } from './timelineRanged';
export interface TimelineRow extends TimelineRanged {
    keyframes?: TimelineKeyframe[] | null;
    style?: TimelineRowStyle;
    hidden?: boolean;
}
