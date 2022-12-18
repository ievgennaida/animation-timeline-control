/**
 * Internal components consts.
 * Still can be changed thru private property _consts but this is discouraged.
 */
export interface TimelineConsts {
  /**
   * Auto pan speed.
   */
  autoPanSpeed: number;
  /**
   * scroll speed when mouse drag is used (from 0 to 1)
   */
  scrollByDragSpeed: number;
  /**
   * Determine whether item was clicked.
   */
  clickDetectionMs: number;
  /**
   * Timeout to detect double click.
   */
  doubleClickTimeoutMs: number;
  /**
   * Time in ms used to refresh scrollbars when pan is finished.
   */
  scrollFinishedTimeoutMs: number;
  /**
   * Auto pan padding
   */
  autoPanByScrollPadding: number;
  /**
   * Click threshold
   */
  clickThreshold: number;

  /**
   * Click min radius for the elements detection.
   */
  clickDetectionMinRadius: number;
  /**
   * Default auto size for the group. It's percents.
   */
  autoPanSpeedLimit: number;
  /**
   * Default auto size for the group. It's percents.
   */
  defaultGroupHeight: number;
}
