import { TimelineCursorType } from '../../enums/timelineCursorType';
import { TimelineCapStyle } from './timelineCapStyle';

/**
 * Timeline active/current value indicator style.
 */
export interface TimelineStyle {
  width?: number;
  /**
   * Margin top in pixels.
   */
  marginTop?: number;
  /**
   * Margin bottom in pixels.
   */
  marginBottom?: number;
  /**
   * Timeline top cap style.
   */
  capStyle?: TimelineCapStyle;
  /**
   * Timeline indicator stroke color.
   */
  strokeColor?: string;
  /**
   * Timeline fill color.
   */
  fillColor?: string;
  /**
   * Timeline cursor.
   */
  cursor?: TimelineCursorType;
}
