import { TimelineRowStyle } from '../styles/timelineRowStyle';
import { defaultGroupStyle, defaultRowHeight } from './defaultGroupStyle';
import { defaultTimelineKeyframeStyle } from './defaultTimelineKeyframeStyle';

export const defaultTimelineRowStyle = {
  /**
   * Row height in pixels.
   */
  height: defaultRowHeight,
  marginBottom: 2,
  fillColor: '#252526',
  /**
   * Style for the all keyframes in a current row.
   * Individual keyframe can have own style.
   */
  keyframesStyle: defaultTimelineKeyframeStyle,
  /**
   * Style of the groups.
   */
  groupsStyle: defaultGroupStyle,
} as TimelineRowStyle;
