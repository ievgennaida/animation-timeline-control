/* eslint-disable @typescript-eslint/no-explicit-any */
import { TimelineRow } from '../timelineRow';
import { TimelineKeyframe } from '../timelineKeyframe';
import { TimelineRowStyle } from './styles/timelineRowStyle';

export class TimelineStyleUtils {
  /**
   * Get keyframe style from a keyframe, than from a row, than from a global settings.
   * @param keyframe keyframe to get style for.
   * @param row keyframe row.
   * @param propertyName property to get.
   * @param defaultValue default value to return
   */
  static getKeyframeStyle<T>(keyframe: TimelineKeyframe, row: TimelineRow, rowsStyle: TimelineRowStyle, propertyName: string, defaultValue?: T): T {
    if (keyframe && keyframe) {
      const style: any = keyframe;
      if (style[propertyName] !== undefined) {
        return style[propertyName] as T;
      }
    }

    if (row && row.keyframesStyle) {
      const style: any = row.keyframesStyle;
      if (style[propertyName] !== undefined) {
        return style[propertyName] as T;
      }
    }
    if (rowsStyle && rowsStyle.keyframesStyle) {
      const style: any = rowsStyle.keyframesStyle;
      if (style[propertyName] !== undefined) {
        return style[propertyName] as T;
      }
    }

    return defaultValue;
  }

  /**
   * Get row style from default settings or overrides by a row settings.
   * @param row
   * @param property
   */
  static getRowStyle<T>(rowStyle: TimelineRow, globalRowStyle: TimelineRowStyle, propertyName: string, defaultValue?: T): T | undefined {
    if (rowStyle) {
      const style: any = rowStyle;
      if (style[propertyName] !== undefined) {
        return style[propertyName] as T;
      }
    }
    if (globalRowStyle) {
      const style: any = globalRowStyle;
      if (style[propertyName] !== undefined) {
        return style[propertyName] as T;
      }
    }

    return defaultValue;
  }

  /**
   * Get current row height from styling
   * @param row
   * @param includeMargin include margin to the bounds
   */
  static getRowHeight(rowStyle: TimelineRowStyle, globalRowStyle: TimelineRowStyle): number {
    return TimelineStyleUtils.getRowStyle<number>(rowStyle, globalRowStyle, 'height', 24);
  }
  static rowStripeHeight(rowStyle: TimelineRowStyle, globalRowStyle: TimelineRowStyle): number | string {
    return TimelineStyleUtils.getRowStyle<number | string>(rowStyle, globalRowStyle, 'stripeHeight', 'auto');
  }
  static stripeFillColor(rowStyle: TimelineRowStyle, globalRowStyle: TimelineRowStyle): string {
    return TimelineStyleUtils.getRowStyle<string>(rowStyle, globalRowStyle, 'stripeFillColor');
  }
  static getRowMarginBottom(rowStyle: TimelineRowStyle, globalRowStyle: TimelineRowStyle): number {
    return TimelineStyleUtils.getRowStyle<number>(rowStyle, globalRowStyle, 'marginBottom', 0);
  }
}
