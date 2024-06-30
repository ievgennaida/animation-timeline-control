import { TimelineOptions } from '../settings/timelineOptions';
import { TimelineRowStyle } from '../settings/styles/timelineRowStyle';
import { TimelineKeyframeShape } from '../enums/timelineKeyframeShape';
import { TimelineGroupStyle } from '../settings/styles/timelineGroupStyle';
import { TimelineKeyframe } from '../models/timelineKeyframe';
import { TimelineGroup } from '../models/timelineGroup';
import { TimelineRow } from '../models/timelineRow';
export declare class TimelineStyleUtils {
    static getGroup(groupModel: TimelineGroup | string | null | undefined): TimelineGroup | null;
    static getGroupStyle(groupModel: TimelineGroup | string | null | undefined): TimelineGroupStyle | null;
    static getFirstSet<T>(defaultValue: T, ...params: Array<T | undefined | null>): T;
    /**
     * Get first value set or default.
     * @param defaultValue default value in a case when no value is set.
     * @param returnFalseIfAnyFalse - find first negative bool and return false.
     * @param params collection of values to check.
     * @returns value.
     */
    static getValue<T>(defaultValue: T, returnFalseIfAnyFalse?: boolean, ...params: Array<T | undefined | null>): T;
    static getValueOrDefault<T>(value: T, defaultValue: T): T | undefined;
    static keyframeWidth(keyframe: TimelineKeyframe | null | undefined, group: TimelineGroup | string | null | undefined, rowStyle: TimelineRowStyle | null | undefined, options: TimelineOptions | null | undefined): number | string;
    static keyframeHeight(keyframe: TimelineKeyframe | null | undefined, group: TimelineGroup | string | null | undefined, rowStyle: TimelineRowStyle | null | undefined, options: TimelineOptions | null | undefined): number | string;
    static keyframeShape(keyframe: TimelineKeyframe | null, group: TimelineGroup | string | null | undefined, rowStyle: TimelineRowStyle | null, options: TimelineOptions | null): TimelineKeyframeShape;
    static keyframeFillColor(keyframe: TimelineKeyframe | null, group: TimelineGroup | string | null | undefined, rowStyle: TimelineRowStyle | null, options: TimelineOptions | null): string;
    static keyframeSelectedFillColor(keyframe: TimelineKeyframe | null, group: TimelineGroup | string | null | undefined, rowStyle: TimelineRowStyle | null, options: TimelineOptions | null): string;
    static keyframeStrokeThickness(keyframe: TimelineKeyframe | null, group: TimelineGroup | string | null | undefined, rowStyle: TimelineRowStyle | null, options: TimelineOptions | null): number;
    static keyframeStrokeColor(keyframe: TimelineKeyframe | null, group: TimelineGroup | string | null | undefined, rowStyle: TimelineRowStyle | null, options: TimelineOptions | null): string;
    static keyframeSelectedStrokeColor(keyframe: TimelineKeyframe | null, group: TimelineGroup | string | null, rowStyle: TimelineRowStyle | null, options: TimelineOptions | null): string;
    static groupHeight(options: TimelineOptions | null | undefined, group: TimelineGroup | string | null | undefined, rowStyle: TimelineRowStyle | null | undefined): number | string;
    static groupMarginTop(options: TimelineOptions | null | undefined, group: TimelineGroup | string | null | undefined, rowStyle: TimelineRowStyle | null | undefined): number | string;
    static groupFillColor(options: TimelineOptions | null | undefined, group: TimelineGroup | string | null | undefined, rowStyle: TimelineRowStyle | null | undefined): string;
    static groupStrokeColor(options: TimelineOptions | null | undefined, group: TimelineGroup | string | null | undefined, rowStyle: TimelineRowStyle | null | undefined): string;
    static groupStrokeThickness(options: TimelineOptions | null | undefined, group: TimelineGroup | string | null | undefined, rowStyle: TimelineRowStyle | null | undefined): number;
    static groupsRadii(options: TimelineOptions | null | undefined, group: TimelineGroup | string | null | undefined, rowStyle: TimelineRowStyle | null | undefined): number | DOMPointInit | Iterable<number | DOMPointInit>;
    /**
     * Get current row height from styles
     */
    static getRowHeight(rowStyle: TimelineRowStyle | null, options: TimelineOptions | null): number;
    static getRowMarginBottom(rowStyle: TimelineRowStyle | null, options: TimelineOptions | null): number;
    static getRowFillColor(rowStyle: TimelineRowStyle | null, options: TimelineOptions | null): string;
    static headerHeight(options: TimelineOptions | null, defaultRowHeight?: number): number;
    static keyframeDraggable(keyframe: TimelineKeyframe | null, group: TimelineGroup | string | null, row: TimelineRow | null, options: TimelineOptions | null, defaultValue?: boolean): boolean;
    static groupDraggable(group: TimelineGroup | string | null | undefined, row: TimelineRow | null, options: TimelineOptions): boolean;
}
