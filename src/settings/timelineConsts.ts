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
export const defaultTimelineConsts = {
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
