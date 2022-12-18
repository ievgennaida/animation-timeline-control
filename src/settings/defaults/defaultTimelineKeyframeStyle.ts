import { TimelineKeyframeShape } from '../../enums/timelineKeyframeShape';
import { TimelineKeyframeStyle } from '../styles/timelineKeyframeStyle';

export const defaultTimelineKeyframeStyle = {
  /**
   * keyframe fill color.
   */
  fillColor: 'DarkOrange',
  shape: TimelineKeyframeShape.Rhomb,
  /**
   * Selected keyframe fill color.
   */
  selectedFillColor: 'red',
  strokeColor: 'black',
  selectedStrokeColor: 'black',
  strokeThickness: 0.2,
  height: 'auto',
  width: 'auto',
} as TimelineKeyframeStyle;
