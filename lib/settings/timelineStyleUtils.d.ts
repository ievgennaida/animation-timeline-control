import { TimelineRow } from '../timelineRow';
import { TimelineKeyframe } from '../timelineKeyframe';
import { TimelineRowStyle } from './styles/timelineRowStyle';
export declare class TimelineStyleUtils {
    /**
     * Get keyframe style from a keyframe, than from a row, than from a global settings.
     * @param keyframe keyframe to get style for.
     * @param row keyframe row.
     * @param propertyName property to get.
     * @param defaultValue default value to return
     */
    static getKeyframeStyle<T>(keyframe: TimelineKeyframe, row: TimelineRow, rowsStyle: TimelineRowStyle, propertyName: string, defaultValue?: T): T;
    /**
     * Get row style from default settings or overrides by a row settings.
     * @param row
     * @param property
     */
    static getRowStyle<T>(rowStyle: TimelineRow, globalRowStyle: TimelineRowStyle, propertyName: string, defaultValue?: T): T | undefined;
    /**
     * Get current row height from styling
     * @param row
     * @param includeMargin include margin to the bounds
     */
    static getRowHeight(rowStyle: TimelineRowStyle, globalRowStyle: TimelineRowStyle): number;
    static rowStripeHeight(rowStyle: TimelineRowStyle, globalRowStyle: TimelineRowStyle): number | string;
    static stripeFillColor(rowStyle: TimelineRowStyle, globalRowStyle: TimelineRowStyle): string;
    static getRowMarginBottom(rowStyle: TimelineRowStyle, globalRowStyle: TimelineRowStyle): number;
}
