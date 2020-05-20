import { TimelineRowStyle } from './styles/timelineRowStyle';
import { TimelineStyle } from './styles/timelineStyle';
import { TimelineRanged } from '../timelineRanged';

export interface TimelineOptions extends TimelineRanged {
  /**
   * Id or HTMLElement of the timeline container.
   */
  id?: string | HTMLElement;
  /**
   * Check whether snapping is enabled.
   */
  snapEnabled?: boolean;
  /**
   *  Snap all selected keyframes as a bundle during the drag.
   */
  snapAllKeyframesOnMove?: boolean;
  /**
   * approximate step for the timeline in pixels for 1 second
   */
  stepPx?: number;
  /**
   * Number of points that should fit into the one stepPx.
   */
  stepVal: number;
  stepSmallPx?: number;
  /**
   * Snap step in units. from 0 to stepVal
   */
  snapStep?: number;
  /**
   * additional left margin in pixels to start the line gauge from.
   */
  leftMargin?: number;
  /**
   * Component header background color.
   */
  headerFillColor?: string;
  /**
   * Component background color.
   */
  fillColor?: string;
  labelsColor?: string;
  /**
   * Header gauge tick color.
   */
  tickColor?: string;
  /**
   * Selection rectangle color.
   */
  selectionColor?: string;

  /**
   * Default rows style.
   * Can be overridden by setting style individually for each row.
   */
  rowsStyle?: TimelineRowStyle;
  /**
   * Timeline indicator style.
   */
  timelineStyle?: TimelineStyle;
  /**
   * Header height in pixels
   */
  headerHeight?: number;
  /**
   * Header ticks font
   */
  font?: string;
  /**
   * Default zoom level = 1. where screen pixels are equals to the corresponding stepVal stepPx.
   */
  zoom?: number;
  /**
   * Default zoom speed.
   */
  zoomSpeed?: number;
  /**
   * Max zoom value.
   */
  zoomMin?: number;
  /**
   * Min zoom value.
   */
  zoomMax?: number;
  /**
   * Set this to true in a MAC OS environment: The Meta key will be used instead of the Ctrl key.
   */
  controlKeyIsMetaKey?: boolean;
  /**
   * Access the scroll container via this class for e.g. scroll bar styling.
   */
  scrollContainerClass?: string;
  /**
   * keyframes group is draggable.
   */
  groupsDraggable?: boolean;
  /**
   * keyframes group is draggable.
   */
  keyframesDraggable?: boolean;
}
