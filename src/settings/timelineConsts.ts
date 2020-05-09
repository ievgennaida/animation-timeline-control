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
}
