import { TimelineRow } from '../timelineRow';
import { TimelineKeyframe } from '../timelineKeyframe';
import { TimelineOptions } from '../settings/timelineOptions';
import { TimelineRowStyle } from '../settings/styles/timelineRowStyle';
export declare class TimelineStyleUtils {
    /**
     * Get keyframe style from a keyframe, than from a row, than from a global settings.
     * @param keyframe keyframe to get style for.
     * @param row keyframe row.
     * @param propertyName property to get.
     * @param defaultValue default value to return
     */
    static getKeyframeStyle<T>(keyframe: TimelineKeyframe | null, row: TimelineRow | null, options: TimelineOptions | null, propertyName: string, defaultValue?: T): T;
    /**
     * Get row style from default settings or overrides by a row settings.
     */
    static getRowStyle<T>(rowStyle: TimelineRow, options: TimelineOptions | null, propertyName: string, defaultValue?: T): T | undefined;
    /**
     * Get current row height from styling
     */
    static getRowHeight(rowStyle: TimelineRowStyle, options: TimelineOptions): number;
    static rowStripeHeight(rowStyle: TimelineRowStyle, options: TimelineOptions): number | string;
    static stripeFillColor(rowStyle: TimelineRowStyle, options: TimelineOptions): string;
    static getRowMarginBottom(rowStyle: TimelineRowStyle, options: TimelineOptions): number;
}
