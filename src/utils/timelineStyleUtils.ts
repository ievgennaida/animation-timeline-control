/* eslint-disable @typescript-eslint/no-explicit-any */
import { TimelineRow } from '../timelineRow';
import { TimelineKeyframe } from '../timelineKeyframe';
import { TimelineOptions } from '../settings/timelineOptions';
import { TimelineRowStyle } from '../settings/styles/timelineRowStyle';

export class TimelineStyleUtils {
  /**
   * Get keyframe style from a keyframe, than from a row, than from a global settings.
   * @param keyframe keyframe to get style for.
   * @param row keyframe row.
   * @param propertyName property to get.
   * @param defaultValue default value to return
   */
  static getKeyframeStyle<T>(keyframe: TimelineKeyframe | null, row: TimelineRow | null, options: TimelineOptions | null, propertyName: string, defaultValue?: T): T {
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
    const globalRowStyle = options ? options.rowsStyle : null;
    if (globalRowStyle && globalRowStyle.keyframesStyle) {
      const style: any = globalRowStyle.keyframesStyle;
      if (style[propertyName] !== undefined) {
        return style[propertyName] as T;
      }
    }

    return defaultValue;
  }

  /**
   * Get row style from default settings or overrides by a row settings.
   */
  static getRowStyle<T>(rowStyle: TimelineRow, options: TimelineOptions | null, propertyName: string, defaultValue?: T): T | undefined {
    if (rowStyle) {
      const style: any = rowStyle;
      if (style[propertyName] !== undefined) {
        return style[propertyName] as T;
      }
    }
    const globalRowStyle = options ? options.rowsStyle : null;
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
   */
  static getRowHeight(rowStyle: TimelineRowStyle, options: TimelineOptions): number {
    return TimelineStyleUtils.getRowStyle<number>(rowStyle, options, 'height', 24);
  }
  static rowStripeHeight(rowStyle: TimelineRowStyle, options: TimelineOptions): number | string {
    return TimelineStyleUtils.getRowStyle<number | string>(rowStyle, options, 'stripeHeight', 'auto');
  }
  static stripeFillColor(rowStyle: TimelineRowStyle, options: TimelineOptions): string {
    return TimelineStyleUtils.getRowStyle<string>(rowStyle, options, 'stripeFillColor');
  }
  static getRowMarginBottom(rowStyle: TimelineRowStyle, options: TimelineOptions): number {
    return TimelineStyleUtils.getRowStyle<number>(rowStyle, options, 'marginBottom', 0);
  }
}
