/* eslint-disable @typescript-eslint/no-explicit-any */
import { TimelineRow } from '../timelineRow';
import { TimelineOptions } from '../settings/timelineOptions';
import { TimelineRowStyle } from '../settings/styles/timelineRowStyle';
import { TimelineKeyframeStyle } from '../settings/styles/timelineKeyframeStyle';
import { TimelineKeyframeShape } from '../enums/timelineKeyframeShape';

export class TimelineStyleUtils {
  /**
   * Get keyframe style from a keyframe, than from a row, than from a global settings.
   * @param keyframe keyframe to get style for.
   * @param row keyframe row.
   * @param propertyName property to get.
   * @param defaultValue default value to return
   * @param reverseOrder reverse styling order: global, row, keyframe
   */
  static getKeyframeStyle<T>(
    keyframeStyle: TimelineKeyframeStyle | null,
    rowStyle: TimelineRow | null,
    options: TimelineOptions | null,
    propertyName: string,
    defaultValue?: T,
    reverseOrder = false,
  ): T {
    // Don't spawn new array for the normal order.
    let styles: Array<any> | null = null;
    if (keyframeStyle) {
      const style: any = keyframeStyle;
      if (style[propertyName] !== undefined) {
        const value = style[propertyName];
        if (!reverseOrder) {
          return value;
        }
        styles = styles || [];
        styles.push(value);
      }
    }

    if (rowStyle && rowStyle.keyframesStyle) {
      const style: any = rowStyle.keyframesStyle;
      if (style[propertyName] !== undefined) {
        const value = style[propertyName];
        if (!reverseOrder) {
          return value;
        }
        styles = styles || [];
        styles.push(value);
      }
    }
    const globalRowStyle = options ? options.rowsStyle : null;
    if (globalRowStyle && globalRowStyle.keyframesStyle) {
      const style: any = globalRowStyle.keyframesStyle;
      if (style[propertyName] !== undefined) {
        const value = style[propertyName];
        if (!reverseOrder) {
          return value;
        }
        styles = styles || [];
        styles.push(value);
      }
    }

    return reverseOrder && styles && styles.length > 0 ? styles[styles.length - 1] : defaultValue;
  }

  /**
   * Get row style from default settings or overrides by a row settings.
   */
  static getRowStyle<T>(rowStyle: TimelineRowStyle, options: TimelineOptions | null, propertyName: string, defaultValue?: T, reverseOrder = false): T | undefined {
    // Don't spawn new array for the normal order.
    let styles: Array<any> = null;
    if (rowStyle) {
      const style: any = rowStyle;
      if (style[propertyName] !== undefined) {
        const results = style[propertyName] as T;
        if (!reverseOrder) {
          return results;
        }
        styles = styles || [];
        styles.push(results);
      }
    }
    const globalRowStyle = options ? options.rowsStyle : null;
    if (globalRowStyle) {
      const style: any = globalRowStyle;
      if (style[propertyName] !== undefined) {
        const results = style[propertyName] as T;
        if (!reverseOrder) {
          return results;
        }

        styles = styles || [];
        styles.push(results);
      }
    }

    return reverseOrder && styles && styles.length > 0 ? styles[styles.length - 1] : defaultValue;
  }

  static keyframeShape(keyframe: TimelineKeyframeStyle | null, rowStyle: TimelineRowStyle | null, options: TimelineOptions | null): TimelineKeyframeShape {
    const shape = TimelineStyleUtils.getKeyframeStyle<TimelineKeyframeShape>(keyframe, rowStyle, options, 'shape', TimelineKeyframeShape.Rhomb);
    return shape;
  }
  static keyframeFillColor(keyframe: TimelineKeyframeStyle | null, rowStyle: TimelineRowStyle | null, options: TimelineOptions | null): string {
    const color = TimelineStyleUtils.getKeyframeStyle<string>(keyframe, rowStyle, options, 'fillColor', 'DarkOrange');
    return color;
  }
  static keyframeSelectedFillColor(keyframe: TimelineKeyframeStyle | null, rowStyle: TimelineRowStyle | null, options: TimelineOptions | null): string {
    const color = TimelineStyleUtils.getKeyframeStyle<string>(keyframe, rowStyle, options, 'selectedFillColor', 'red');
    return color;
  }

  static keyframeStrokeThickness(keyframe: TimelineKeyframeStyle | null, rowStyle: TimelineRowStyle | null, options: TimelineOptions | null): number {
    return TimelineStyleUtils.getKeyframeStyle<number>(keyframe, rowStyle, options, 'strokeThickness', 0.2, false);
  }

  static keyframeStrokeColor(keyframe: TimelineKeyframeStyle | null, rowStyle: TimelineRowStyle | null, options: TimelineOptions | null): string {
    return TimelineStyleUtils.getKeyframeStyle<string>(keyframe, rowStyle, options, 'strokeColor', 'Black', false);
  }
  static keyframeSelectedStrokeColor(keyframe: TimelineKeyframeStyle | null, rowStyle: TimelineRowStyle | null, options: TimelineOptions | null): string {
    return TimelineStyleUtils.getKeyframeStyle<string>(keyframe, rowStyle, options, 'selectedStrokeColor', 'Black', false);
  }
  /**
   * Get current row height from styling
   */
  static getRowHeight(rowStyle: TimelineRowStyle, options: TimelineOptions): number {
    return TimelineStyleUtils.getRowStyle<number>(rowStyle, options, 'height', 24);
  }
  static rowGroupHeight(rowStyle: TimelineRowStyle, options: TimelineOptions): number | string {
    return TimelineStyleUtils.getRowStyle<number | string>(rowStyle, options, 'groupHeight', 'auto');
  }
  static groupFillColor(rowStyle: TimelineRowStyle, options: TimelineOptions): string | null {
    return TimelineStyleUtils.getRowStyle<string>(rowStyle, options, 'groupFillColor');
  }
  static getRowMarginBottom(rowStyle: TimelineRowStyle, options: TimelineOptions): number {
    return TimelineStyleUtils.getRowStyle<number>(rowStyle, options, 'marginBottom', 0);
  }
  static getRowFillColor(rowStyle: TimelineRowStyle, options: TimelineOptions): string {
    return TimelineStyleUtils.getRowStyle<string>(rowStyle, options, 'fillColor', '#252526');
  }
  static headerHeight(options: TimelineOptions | null): number {
    return options ? options.headerHeight : 0 || 30;
  }
  static keyframeDraggable(keyframe: TimelineKeyframeStyle | null, rowStyle: TimelineRowStyle | null, options: TimelineOptions | null, defaultValue = true): boolean {
    return TimelineStyleUtils.getKeyframeStyle<boolean>(keyframe, rowStyle, options, 'draggable', defaultValue, false);
  }

  static groupDraggable(rowStyle: TimelineRowStyle, options: TimelineOptions, defaultValue = true): boolean {
    return TimelineStyleUtils.getRowStyle<boolean>(rowStyle, options, 'groupDraggable', defaultValue, false);
  }
}
