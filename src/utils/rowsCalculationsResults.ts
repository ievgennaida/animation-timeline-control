import { TimelineRow } from '../timelineRow';

export interface RowsCalculationsResults {
  /**
   * All rows and keyframes bounds.
   */
  area: DOMRect;
  minValue: number;
  maxValue: number;
  /**
   * Collection of the rows sizes.
   */
  rows: Array<RowSize>;
}
export interface RowSize extends DOMRect {
  row: TimelineRow;
  index: number;
  minValue: number;
  maxValue: number;
  marginBottom: number;
  groupRect: DOMRect;
}
