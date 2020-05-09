import { TimelineCapShape } from '../../enums/timelineCapShape';

export interface TimelineStyle {
  width?: number;
  marginTop?: number;
  capWidth?: number;
  capHeight?: number;
  /**
   * Cap type
   */
  capType?: TimelineCapShape;
  timelineColor?: string;
  strokeColor: string;
  fillColor: string;
}
