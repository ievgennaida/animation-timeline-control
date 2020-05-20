import { TimelineConsts } from './timelineConsts';
import { TimelineCapShape } from '../enums/timelineCapShape';
import { TimelineStyle } from './styles/timelineStyle';
import { TimelineOptions } from './timelineOptions';
import { TimelineKeyframeShape } from '../enums/timelineKeyframeShape';
import { TimelineKeyframeStyle } from './styles/timelineKeyframeStyle';
import { TimelineRowStyle } from './styles/timelineRowStyle';

export const defaultTimelineStyle = {
  width: 2,
  marginTop: 15,
  capWidth: 4,
  capHeight: 10,
  /**
   * Draw timeline rectangular cap.
   */
  capType: TimelineCapShape.Rect,
  strokeColor: 'DarkOrange',
  fillColor: 'DarkOrange',
} as TimelineStyle;

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
  draggable: true,
} as TimelineKeyframeStyle;

export const defaultTimelineRowStyle = {
  /**
   * Row height in pixels.
   */
  height: 24,
  marginBottom: 2,
  fillColor: '#252526',
  /**
   * Keyframes group color
   */
  groupFillColor: '#094771',
  groupHeight: 'auto',
  keyframesStyle: defaultTimelineKeyframeStyle,
} as TimelineRowStyle;

export const defaultTimelineOptions = {
  /**
   *  Snap all selected keyframes as a bundle during the drag.
   */
  snapAllKeyframesOnMove: false,

  /**
   * Check whether snapping is enabled.
   */
  snapEnabled: true,

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
   * keyframes group is draggable.
   */
  keyframesDraggable: true,
  min: 0,
  max: Number.MAX_VALUE,
} as TimelineOptions;

export const defaultTimelineConsts: TimelineConsts = {
  /**
   * Auto pan speed.
   */
  autoPanSpeed: 50,
  /**
   * scroll speed when mouse drag is used (from 0 to 1)
   */
  scrollByDragSpeed: 0.12,
  /**
   * Determine whether item was clicked.
   */
  clickDetectionMs: 120,
  /**
   * Timeout to detect double click.
   */
  doubleClickTimeoutMs: 400,
  /**
   * Time in ms used to refresh scrollbars when pan is finished.
   */
  scrollFinishedTimeoutMs: 500,
  /**
   * Auto pan padding
   */
  autoPanByScrollPadding: 10,
  /**
   * Click threshold
   */
  clickThreshold: 3,
} as TimelineConsts;
