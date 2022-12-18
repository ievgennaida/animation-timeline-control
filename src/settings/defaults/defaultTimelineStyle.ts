import { TimelineCapShape } from '../../enums/timelineCapShape';
import { TimelineCursorType } from '../../enums/timelineCursorType';
import { TimelineStyle } from '../styles/timelineStyle';

export const defaultTimelineStyle = {
  width: 2,
  marginTop: 15,
  marginBottom: 0,
  strokeColor: 'DarkOrange',
  fillColor: 'DarkOrange',
  capStyle: {
    width: 4,
    height: 10,
    /**
     * Draw timeline rectangular cap.
     */
    capType: TimelineCapShape.Rect,
    strokeColor: 'DarkOrange',
    fillColor: 'DarkOrange',
  },
  cursor: TimelineCursorType.EWResize,
} as TimelineStyle;
