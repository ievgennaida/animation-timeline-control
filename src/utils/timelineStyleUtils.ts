import { TimelineOptions } from '../settings/timelineOptions';
import { TimelineRowStyle } from '../settings/styles/timelineRowStyle';
import { TimelineKeyframeShape } from '../enums/timelineKeyframeShape';
import { TimelineUtils } from './timelineUtils';
import { TimelineGroupStyle } from '../settings/styles/timelineGroupStyle';
import { TimelineKeyframe } from '../models/timelineKeyframe';

import { TimelineGroup } from '../models/timelineGroup';
import { TimelineRow } from '../models/timelineRow';
import { defaultGroupStyle } from '../settings/defaults/defaultGroupStyle';
import { defaultTimelineKeyframeStyle } from '../settings/defaults/defaultTimelineKeyframeStyle';
import { defaultTimelineRowStyle } from '../settings/defaults/defaultTimelineRowStyle';

const undefinedConst = typeof undefined;

// TODO: create merged style for each element instead of getting per property.
export class TimelineStyleUtils {
  static getGroup(groupModel: TimelineGroup | string | null | undefined): TimelineGroup | null {
    const style = groupModel;
    if (style && typeof style === 'string') {
      return null;
    }
    return (style || null) as TimelineGroup;
  }
  static getGroupStyle(groupModel: TimelineGroup | string | null | undefined): TimelineGroupStyle | null {
    return TimelineStyleUtils.getGroup(groupModel)?.style || null;
  }
  static getFirstSet<T>(defaultValue: T, ...params: Array<T | undefined | null>): T {
    return TimelineStyleUtils.getValue(defaultValue, false, ...params);
  }
  /**
   * Get first value set or default.
   * @param defaultValue default value in a case when no value is set.
   * @param returnFalseIfAnyFalse - find first negative bool and return false.
   * @param params collection of values to check.
   * @returns value.
   */
  static getValue<T>(defaultValue: T, returnFalseIfAnyFalse = false, ...params: Array<T | undefined | null>): T {
    const valuesFound: T[] = [];
    let found = false;
    params.forEach((value: T | undefined | null) => {
      if (found) {
        return;
      }
      if (typeof value === undefinedConst) {
        return;
      } else if (typeof value === 'number') {
        if (!TimelineUtils.isNumber(value)) {
          return;
        }
      } else if (typeof value === 'boolean') {
        valuesFound.push(value as T);
        // No need to search for other values. First false is turning off current bool functionality.
        if (returnFalseIfAnyFalse && value === false) {
          found = true;
        }
        return;
      } else if (!value) {
        return;
      }
      valuesFound.push(value as T);
    });
    const toReturn = valuesFound && valuesFound.length > 0 ? valuesFound[0] : defaultValue;
    if (found) {
      return false as T;
    }
    return TimelineStyleUtils.getValueOrDefault(toReturn, defaultValue) as T;
  }

  static getValueOrDefault<T>(value: T, defaultValue: T): T | undefined {
    if (typeof value === undefinedConst) {
      return defaultValue;
    } else if (typeof value == 'boolean') {
      // variable is a boolean
      return value as T;
    } else if (typeof value == 'number') {
      // variable is a boolean
      if (value || value === 0) {
        return value as T;
      } else {
        return defaultValue;
      }
    }
    return value || defaultValue;
  }
  static keyframeWidth(
    keyframe: TimelineKeyframe | null | undefined,
    group: TimelineGroup | string | null | undefined,
    rowStyle: TimelineRowStyle | null | undefined,
    options: TimelineOptions | null | undefined,
  ): number | string {
    return TimelineStyleUtils.getFirstSet(
      // default value
      defaultTimelineKeyframeStyle.width || '',
      keyframe?.style?.width,
      // exact style
      TimelineStyleUtils.getGroupStyle(group)?.keyframesStyle?.width,
      rowStyle?.keyframesStyle?.width,
      rowStyle?.groupsStyle?.keyframesStyle?.width,
      // global styles
      options?.rowsStyle?.groupsStyle?.keyframesStyle?.width,
      // default keyframe style
      options?.rowsStyle?.keyframesStyle?.width,
    );
  }
  static keyframeHeight(
    keyframe: TimelineKeyframe | null | undefined,
    group: TimelineGroup | string | null | undefined,
    rowStyle: TimelineRowStyle | null | undefined,
    options: TimelineOptions | null | undefined,
  ): number | string {
    return TimelineStyleUtils.getFirstSet(
      // default value
      defaultTimelineKeyframeStyle.height || '',
      keyframe?.style?.height,
      // exact style
      TimelineStyleUtils.getGroupStyle(group)?.keyframesStyle?.height,
      rowStyle?.keyframesStyle?.height,
      rowStyle?.groupsStyle?.keyframesStyle?.height,
      // global styles
      options?.rowsStyle?.groupsStyle?.keyframesStyle?.height,
      // default keyframe style
      options?.rowsStyle?.keyframesStyle?.height,
    );
  }
  static keyframeShape(keyframe: TimelineKeyframe | null, group: TimelineGroup | string | null | undefined, rowStyle: TimelineRowStyle | null, options: TimelineOptions | null): TimelineKeyframeShape {
    const defaultValue = defaultTimelineKeyframeStyle.shape || TimelineKeyframeShape.Rhomb;
    return TimelineStyleUtils.getFirstSet(
      // default value
      defaultValue,
      // exact style
      keyframe?.style?.shape,
      // style set by keyframe group
      TimelineStyleUtils.getGroupStyle(group)?.keyframesStyle?.shape,
      // style from the keyframe group
      rowStyle?.groupsStyle?.keyframesStyle?.shape,
      // style set by keyframe style
      rowStyle?.keyframesStyle?.shape,
      // style set by keyframe group style, applied when group is set
      group ? options?.rowsStyle?.groupsStyle?.keyframesStyle?.shape : undefined,
      // Style set by global options
      options?.rowsStyle?.keyframesStyle?.shape,
    );
  }
  static keyframeFillColor(keyframe: TimelineKeyframe | null, group: TimelineGroup | string | null | undefined, rowStyle: TimelineRowStyle | null, options: TimelineOptions | null): string {
    const defaultValue = defaultTimelineKeyframeStyle.fillColor || '';
    return TimelineStyleUtils.getFirstSet(
      // default value
      defaultValue,
      // exact style
      keyframe?.style?.fillColor,
      // style set by keyframe group
      TimelineStyleUtils.getGroupStyle(group)?.keyframesStyle?.fillColor,
      // style from the keyframe group
      rowStyle?.groupsStyle?.keyframesStyle?.fillColor,
      // style set by keyframe style
      rowStyle?.keyframesStyle?.fillColor,
      // style set by keyframe group style, applied when group is set
      group ? options?.rowsStyle?.groupsStyle?.keyframesStyle?.fillColor : undefined,
      // Style set by global options
      options?.rowsStyle?.keyframesStyle?.fillColor,
    );
  }
  static keyframeSelectedFillColor(keyframe: TimelineKeyframe | null, group: TimelineGroup | string | null | undefined, rowStyle: TimelineRowStyle | null, options: TimelineOptions | null): string {
    const defaultValue = defaultTimelineKeyframeStyle.selectedFillColor || '';
    return TimelineStyleUtils.getFirstSet(
      // default value
      defaultValue,
      // exact style
      keyframe?.style?.selectedFillColor,
      // style set by keyframe group
      TimelineStyleUtils.getGroupStyle(group)?.keyframesStyle?.selectedFillColor,
      // style from the keyframe group
      rowStyle?.groupsStyle?.keyframesStyle?.selectedFillColor,
      // style set by keyframe style
      rowStyle?.keyframesStyle?.selectedFillColor,
      // style set by keyframe group style, applied when group is set
      group ? options?.rowsStyle?.groupsStyle?.keyframesStyle?.selectedFillColor : undefined,
      // Style set by global options
      options?.rowsStyle?.keyframesStyle?.selectedFillColor,
    );
  }

  static keyframeStrokeThickness(keyframe: TimelineKeyframe | null, group: TimelineGroup | string | null | undefined, rowStyle: TimelineRowStyle | null, options: TimelineOptions | null): number {
    const defaultValue = defaultTimelineKeyframeStyle.strokeThickness || 0;
    return TimelineStyleUtils.getFirstSet(
      // default value
      defaultValue,
      // exact style
      keyframe?.style?.strokeThickness,
      // style set by keyframe group
      TimelineStyleUtils.getGroupStyle(group)?.keyframesStyle?.strokeThickness,
      // style from the keyframe group
      rowStyle?.groupsStyle?.keyframesStyle?.strokeThickness,
      // style set by keyframe style
      rowStyle?.keyframesStyle?.strokeThickness,
      // style set by keyframe group style, applied when group is set
      group ? options?.rowsStyle?.groupsStyle?.keyframesStyle?.strokeThickness : undefined,
      // Style set by global options
      options?.rowsStyle?.keyframesStyle?.strokeThickness,
    );
  }

  static keyframeStrokeColor(keyframe: TimelineKeyframe | null, group: TimelineGroup | string | null | undefined, rowStyle: TimelineRowStyle | null, options: TimelineOptions | null): string {
    const defaultValue = defaultTimelineKeyframeStyle.strokeColor || '';
    return TimelineStyleUtils.getFirstSet(
      // default value
      defaultValue,
      // exact style
      keyframe?.style?.strokeColor,
      // style set by keyframe group
      TimelineStyleUtils.getGroupStyle(group)?.keyframesStyle?.strokeColor,
      // style from the keyframe group
      rowStyle?.groupsStyle?.keyframesStyle?.strokeColor,
      // style set by keyframe style
      rowStyle?.keyframesStyle?.strokeColor,
      // style set by keyframe group style, applied when group is set
      group ? options?.rowsStyle?.groupsStyle?.keyframesStyle?.strokeColor : undefined,
      // Style set by global options
      options?.rowsStyle?.keyframesStyle?.strokeColor,
    );
  }
  static keyframeSelectedStrokeColor(keyframe: TimelineKeyframe | null, group: TimelineGroup | string | null, rowStyle: TimelineRowStyle | null, options: TimelineOptions | null): string {
    const defaultValue = defaultTimelineKeyframeStyle.selectedStrokeColor || '';
    return TimelineStyleUtils.getFirstSet(
      // default value
      defaultValue,
      // exact style
      keyframe?.style?.selectedStrokeColor,
      // style set by keyframe group
      TimelineStyleUtils.getGroupStyle(group)?.keyframesStyle?.selectedStrokeColor,
      // style from the keyframe group
      rowStyle?.groupsStyle?.keyframesStyle?.selectedStrokeColor,
      // style set by keyframe style
      rowStyle?.keyframesStyle?.selectedStrokeColor,
      // style set by keyframe group style, applied when group is set
      group ? options?.rowsStyle?.groupsStyle?.keyframesStyle?.selectedStrokeColor : undefined,
      // Style set by global options
      options?.rowsStyle?.keyframesStyle?.selectedStrokeColor,
    );
  }

  static groupHeight(options: TimelineOptions | null | undefined, group: TimelineGroup | string | null | undefined, rowStyle: TimelineRowStyle | null | undefined): number | string {
    return TimelineStyleUtils.getFirstSet(
      // default value
      defaultGroupStyle.height || 'auto',
      // exact group style
      TimelineStyleUtils.getGroupStyle(group)?.height,
      // Row row style
      rowStyle?.groupsStyle?.height,
      // global styles
      options?.rowsStyle?.groupsStyle?.height,
    );
  }

  static groupMarginTop(options: TimelineOptions | null | undefined, group: TimelineGroup | string | null | undefined, rowStyle: TimelineRowStyle | null | undefined): number | string {
    return TimelineStyleUtils.getFirstSet(
      // default value
      defaultGroupStyle.marginTop || 'auto',
      // exact style
      TimelineStyleUtils.getGroupStyle(group)?.marginTop,
      // Row row style
      rowStyle?.groupsStyle?.marginTop,
      // global styles
      options?.rowsStyle?.groupsStyle?.marginTop,
    );
  }

  static groupFillColor(options: TimelineOptions | null | undefined, group: TimelineGroup | string | null | undefined, rowStyle: TimelineRowStyle | null | undefined): string {
    return TimelineStyleUtils.getFirstSet(
      // default value
      defaultGroupStyle.fillColor || '',
      // exact style
      TimelineStyleUtils.getGroupStyle(group)?.fillColor,
      // Row row style
      rowStyle?.groupsStyle?.fillColor,
      // global styles
      options?.rowsStyle?.groupsStyle?.fillColor,
    );
  }
  static groupStrokeColor(options: TimelineOptions | null | undefined, group: TimelineGroup | string | null | undefined, rowStyle: TimelineRowStyle | null | undefined): string {
    return TimelineStyleUtils.getFirstSet(
      // default value
      defaultGroupStyle.strokeColor || '',
      // exact style
      TimelineStyleUtils.getGroupStyle(group)?.strokeColor,
      // Row row style
      rowStyle?.groupsStyle?.strokeColor,
      // global styles
      options?.rowsStyle?.groupsStyle?.strokeColor,
    );
  }

  static groupStrokeThickness(options: TimelineOptions | null | undefined, group: TimelineGroup | string | null | undefined, rowStyle: TimelineRowStyle | null | undefined): number {
    return (
      TimelineStyleUtils.getFirstSet(
        // default value
        defaultGroupStyle.strokeThickness || '',
        // exact style
        TimelineStyleUtils.getGroupStyle(group)?.strokeThickness,
        // Row row style
        rowStyle?.groupsStyle?.strokeThickness,
        // global styles
        options?.rowsStyle?.groupsStyle?.strokeThickness,
      ) || 0
    );
  }

  static groupsRadii(
    options: TimelineOptions | null | undefined,
    group: TimelineGroup | string | null | undefined,
    rowStyle: TimelineRowStyle | null | undefined,
  ): number | DOMPointInit | Iterable<number | DOMPointInit> {
    return (
      TimelineStyleUtils.getFirstSet(
        // default value
        defaultGroupStyle.radii || '',
        // exact style
        TimelineStyleUtils.getGroupStyle(group)?.radii,
        // Row row style
        rowStyle?.groupsStyle?.radii,
        // global styles
        options?.rowsStyle?.groupsStyle?.radii,
      ) || 0
    );
  }

  /**
   * Get current row height from styles
   */
  static getRowHeight(rowStyle: TimelineRowStyle | null, options: TimelineOptions | null): number {
    const defaultValue = defaultTimelineRowStyle.height || 0;
    return TimelineStyleUtils.getFirstSet(
      // default value
      defaultValue,
      // exact style
      rowStyle?.height,
      // Style set by global options
      options?.rowsStyle?.height,
    );
  }
  static getRowMarginBottom(rowStyle: TimelineRowStyle | null, options: TimelineOptions | null): number {
    const defaultValue = defaultTimelineRowStyle.marginBottom || 0;
    return TimelineStyleUtils.getFirstSet(
      // default value
      defaultValue,
      // exact style
      rowStyle?.marginBottom,
      // Style set by global options
      options?.rowsStyle?.marginBottom,
    );
  }

  static getRowFillColor(rowStyle: TimelineRowStyle | null, options: TimelineOptions | null): string {
    const defaultValue = defaultTimelineRowStyle.fillColor || '';
    return TimelineStyleUtils.getFirstSet(
      // default value
      defaultValue,
      // exact style
      rowStyle?.fillColor,
      // Style set by global options
      options?.rowsStyle?.fillColor,
    );
  }

  static headerHeight(options: TimelineOptions | null, defaultRowHeight = 30): number {
    return options?.headerHeight || defaultRowHeight;
  }
  static keyframeDraggable(keyframe: TimelineKeyframe | null, group: TimelineGroup | string | null, row: TimelineRow | null, options: TimelineOptions | null, defaultValue = true): boolean {
    const findFirstNegativeBool = true;
    const boolResult = TimelineStyleUtils.getValue<boolean>(
      defaultValue,
      findFirstNegativeBool,
      // Keyframe settings
      keyframe?.draggable,
      // Group settings
      TimelineStyleUtils.getGroup(group)?.keyframesDraggable,
      // Row settings
      row?.keyframesDraggable,
      // Start from global settings first.
      options?.keyframesDraggable,
    );
    return boolResult;
  }

  static groupDraggable(group: TimelineGroup | string | null | undefined, row: TimelineRow | null, options: TimelineOptions): boolean {
    const findFirstNegativeBool = true;
    const boolResult = TimelineStyleUtils.getValue<boolean>(
      true,
      findFirstNegativeBool,
      // Group settings
      TimelineStyleUtils.getGroup(group)?.draggable,
      // Row settings
      row?.groupsDraggable,
      // Start from global settings first.
      options?.groupsDraggable,
    );
    return boolResult;
  }
}
