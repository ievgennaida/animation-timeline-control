import { TimelineOptions } from '../timelineOptions';
import { defaultGroupStyle } from './defaultGroupStyle';
import { defaultTimelineKeyframeStyle } from './defaultTimelineKeyframeStyle';
import { defaultTimelineRowStyle } from './defaultTimelineRowStyle';
import { defaultTimelineStyle } from './defaultTimelineStyle';

export const defaultTimelineOptions = {
  /**
   *  Snap all selected keyframes as a bundle during the drag.
   */
  snapAllKeyframesOnMove: false,

  /**
   * Check whether snapping is enabled.
   */
  snapEnabled: true,

  /**
   * Timeline style.
   */
  timelineStyle: defaultTimelineStyle,
  /**
   * approximate step for the timeline in pixels for 1 second
   */
  stepPx: 120,
  /**
   * Number of units that should fit into one stepPx. (1 second by a default)
   */
  stepVal: 1000,
  stepSmallPx: 30,
  /**
   * Snap step in units. from 0 to stepVal
   */
  snapStep: 200,
  /**
   * additional left margin in pixels to start the line gauge from.
   */
  leftMargin: 25,
  headerFillColor: '#101011',
  fillColor: '#101011',

  labelsColor: '#D5D5D5',
  /**
   * Header gauge tick color.
   */
  tickColor: '#D5D5D5',
  /**
   * Selection rectangle color.
   */
  selectionColor: 'White',

  /**
   * Default rows style.
   * Can be overridden by setting style individually for each row.
   */
  rowsStyle: defaultTimelineRowStyle,

  /**
   * Style for the all keyframes in a current row.
   * Individual keyframe can have own style.
   */
  keyframesStyle: defaultTimelineKeyframeStyle,
  /**
   * Style of the groups.
   */
  groupsStyle: defaultGroupStyle,
  /**
   * Header height in pixels
   */
  headerHeight: 30,
  font: '11px sans-serif',
  /**
   * Default zoom level = 1. where screen pixels are equals to the corresponding stepVal stepPx.
   */
  zoom: 1,
  /**
   * Default zoom speed.
   */
  zoomSpeed: 0.1,
  /**
   * Max zoom value.
   */
  zoomMin: 0.1,
  /**
   * Min zoom value.
   */
  zoomMax: 8,
  /**
   * Set this to true in a MAC OS environment: The Meta key will be used instead of the Ctrl key.
   */
  controlKeyIsMetaKey: false,
  /**
   * Access the scroll container via this class for e.g. scroll bar styling.
   */
  scrollContainerClass: 'scroll-container',
  /**
   * keyframes group is draggable.
   */
  groupsDraggable: true,
  /**
   * keyframes are draggable.
   */
  keyframesDraggable: true,
  /**
   * Timeline can be dragged or position can be changed by user interaction. Default: true
   */
  timelineDraggable: true,
  /**
   * Start drawing timeline from this min point.
   * Bounds for the keyframe dragging.
   */
  min: 0,
  /**
   * Max bounds timeline can navigate to.
   */
  max: Number.MAX_VALUE,
} as TimelineOptions;
