import { TimelineKeyframe } from '../timelineKeyframe';
import { TimelineCalculatedGroup } from './timelineCalculatedGroup';
import { TimelineCalculatedRow } from './timelineCalculatedRow';

export interface TimelineCalculatedKeyframe {
  size: DOMRect;
  model: TimelineKeyframe;
  parentRow: TimelineCalculatedRow;
  parentGroup: TimelineCalculatedGroup;
}
