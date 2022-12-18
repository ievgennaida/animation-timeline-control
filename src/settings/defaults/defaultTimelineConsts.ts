import { TimelineConsts } from '../timelineConsts';

export const defaultTimelineConsts: TimelineConsts = {
  /**
   * Private. Auto pan speed.
   */
  autoPanSpeed: 50,
  /**
   * Private. scroll speed when mouse drag is used (from 0 to 1)
   */
  scrollByDragSpeed: 0.12,
  /**
   * Private. Determine whether item was clicked.
   */
  clickDetectionMs: 120,
  /**
   * Private. Timeout to detect double click.
   */
  doubleClickTimeoutMs: 400,
  /**
   * Private. Time in ms used to refresh scrollbars when pan is finished.
   */
  scrollFinishedTimeoutMs: 500,
  /**
   * Private. Auto pan padding
   */
  autoPanByScrollPadding: 10,
  /**
   * Private. Click threshold
   */
  clickThreshold: 3,
  /**
   * Private. Private.Click min radius for the elements detection.
   */
  clickDetectionMinRadius: 2,
  /**
   * Private. Skip some auto pan/scroll actions if they are executed more rapid than this value.
   */
  autoPanSpeedLimit: 10,
  /**
   * Private. Default auto size for the group. It's percents.
   */
  defaultGroupHeight: 0.7,
} as TimelineConsts;
