import { TimelineKeyframeStyle } from '../settings/styles/timelineKeyframeStyle';
import { TimelineSelectable } from '../utils/timelineSelectable';
import { TimelineRanged } from './timelineRanged';
import { TimelineGroup } from './timelineGroup';
export interface TimelineKeyframe extends TimelineKeyframeStyle, TimelineSelectable, TimelineRanged {
  val: number;
  /**
   * Related keyframe group.
   * Timeline keyframes groups are rendered as one instance.
   */
  group?: string | TimelineGroup;
}
