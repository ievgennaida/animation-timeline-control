import { TimelineKeyframeShape } from '../enums/timelineKeyframeShape';
import { TimelineRowStyle } from './styles/TimelineRowStyle';
import { TimelineKeyframeStyle } from './styles/timelineKeyframeStyle';
import { TimelineCapShape } from '../enums/timelineCapShape';

export class TimelineOptions {
  /**
   * Id or HTMLElement of the timeline container.
   */
  id: string | HTMLElement;
  /**
   * Snap the mouse to the values on a timeline.
   * Value can be from 1 to 60
   */
  snapsPerSeconds = 5;
  /**
   * Check whether snapping is enabled.
   */
  snapEnabled = true;
  /**
   *  Snap all selected keyframes as a bundle during the drag.
   */
  snapAllKeyframesOnMove = false;
  timelineThicknessPx = 2;
  timelineMarginTopPx = 15;
  timelineCapWidthPx = 4;
  timelineCapHeightPx = 10;
  /**
   * Draw timeline rectangular cap.
   */
  timelineCap = TimelineCapShape.Rect;
  timelineColor = 'DarkOrange';
  /**
   * approximate step for the timeline in pixels for 1 second
   */
  stepPx = 120;
  stepSmallPx = 30;
  smallSteps = 50;
  /**
   * additional left margin in pixels to start the line gauge from.
   */
  leftMarginPx = 25;
  headerFillColor = '#101011';
  fillColor = '#101011';

  labelsColor = '#D5D5D5';
  /**
   * Header gauge tick color.
   */
  tickColor = '#D5D5D5';
  /**
   * Selection rectangle color.
   */
  selectionColor = 'White';

  /**
   * Default rows style.
   * Can be overridden by setting style individually for each row.
   */
  rowsStyle: TimelineRowStyle = {
    /**
     * Row height in pixels.
     */
    height: 24,
    marginBottom: 2,
    fillColor: '#252526',
    /**
     * Keyframes stripe color
     */
    stripeFillColor: '#094771',
    stripeHeight: 'auto',
    keyframesStyle: {
      /**
       * keyframe fill color.
       */
      fillColor: 'red',
      shape: TimelineKeyframeShape.Rhomb,
      /**
       * Selected keyframe fill color.
       */
      selectedFillColor: 'DarkOrange',
      strokeColor: 'Black',
      strokeThickness: 0.2,
      draggable: true,
    } as TimelineKeyframeStyle,
  } as TimelineRowStyle;
  /**
   * Header height in pixels
   */
  headerHeight = 30;
  ticksFont = '11px sans-serif';
  zoom = 1000;
  // Zoom speed. Use percent of the screen to set zoom speed.
  zoomSpeed = 0.1;
  // Max zoom
  zoomMin = 80;
  // Min zoom
  zoomMax = 8000;
  /**
   * Set this to true in a MAC OS environment: The Meta key will be used instead of the Ctrl key.
   */
  controlKeyIsMetaKey = false;
  /**
   * Access the scroll container via this class for e.g. scroll bar styling.
   */
  scrollContainerClass = 'scroll-container';
  /**
   * keyframes stripe is draggable.
   */
  stripesDraggable = true;
  /**
   * keyframes stripe is draggable.
   */
  keyframesDraggable = true;
}
