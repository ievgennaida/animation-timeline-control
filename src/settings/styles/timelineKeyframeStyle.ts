import { TimelineKeyframeShape } from '../../enums/timelineKeyframeShape';

export interface TimelineKeyframeStyle {
  cursor?: string;
  shape?: TimelineKeyframeShape;
  draggable?: boolean;
  hidden?: boolean;
  /**
   * keyframe size, number or text 'auto'
   */
  height?: number | string;
  /**
   * keyframe size, number or text 'auto'
   */
  width?: number | string;
}
