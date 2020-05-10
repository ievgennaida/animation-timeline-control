/**
 * Timeline selection mode.
 */
export enum TimelineSelectionMode {
  /**
   * Select new items. deselect changed.
   */
  Normal = 'normal',
  /**
   * Append current selection.
   */
  Append = 'append',
  /**
   * Revert selection of a specified nodes.
   */
  Revert = 'revert',
}
