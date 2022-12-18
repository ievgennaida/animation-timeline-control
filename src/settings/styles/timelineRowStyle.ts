import { TimelineGroupStyle } from './timelineGroupStyle';
import { TimelineKeyframeStyle } from './timelineKeyframeStyle';

/**
 * Style of the row.
 */
export interface TimelineRowStyle {
  /**
   * Size of the row in pixels.
   */
  height?: number;
  /**
   * Track fill color.
   */
  fillColor?: string;
  /**
   * Row margin bottom in pixels between tracks/rows.
   */
  marginBottom?: number;
  /**
   * Style for the all keyframes in a current row.
   * Individual keyframe can have own style.
   */
  keyframesStyle?: TimelineKeyframeStyle;
  /**
   * Style of the groups. Keyframe groups can be also styles separately.
   */
  groupsStyle?: TimelineGroupStyle;
}
