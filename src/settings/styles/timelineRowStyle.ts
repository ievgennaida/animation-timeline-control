import { TimelineKeyframeStyle } from './timelineKeyframeStyle';
export interface TimelineRowStyle {
  /**
   * Size of the row in pixels, can be set to 'auto'
   */
  height?: string | number;
  hidden?: boolean;
  color?: string;
  selectedColor?: string;
  marginBottom?: number;
  /**
   * Keyframes bounds group height.
   * 'auto' to automatically calculate.
   * number in pixels.
   */
  groupHeight?: number | string;
  /**
   * Keyframes bounds group color. Default is used when undefined.
   */
  groupFillColor?: string;
  /**
   * Style of all keyframes in a current row.
   */
  keyframesStyle?: TimelineKeyframeStyle;
}
