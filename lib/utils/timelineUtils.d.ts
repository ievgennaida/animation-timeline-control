import { TimelineRanged } from '../models/timelineRanged';
import { TimelineOptions } from '../settings/timelineOptions';
export declare class TimelineUtils {
    static drawLine(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number): void;
    /**
     * Check is valid number.
     */
    static isNumber(val?: number | null): boolean;
    static deleteElement<T>(array: Array<T>, element: T): Array<T>;
    /**
     * Check rectangle overlap x,y
     */
    static isOverlap(x: number, y: number, rectangle: DOMRect): boolean;
    /**
     * Find beautiful step for the header line gauge.
     */
    static findGoodStep(originalStep: number, divisionCheck?: number, denominators?: number[]): number;
    /**
     * Keep value in min, max bounds.
     */
    static keepInBounds(value: number, min?: number | null | undefined, max?: number | null | undefined): number;
    static setMinMax(to: TimelineRanged, from: TimelineRanged | null, shrink?: boolean): TimelineRanged;
    static shrinkSelf(rect: DOMRect, value: number): DOMRect;
    /**
     * Check whether rectangle intersects another rectangle
     */
    static isRectIntersects(rect: DOMRect, rect2: DOMRect, touch?: boolean): boolean;
    static getDistance(x1: number, y1: number, x2?: number, y2?: number): number;
    /**
     * Get sign of the number. 1 or -1.
     */
    static sign(p: number): number;
    /**
     * Clear browser text selection.
     */
    static clearBrowserSelection(): void;
    static getPowArgument(toCheck: number): number;
    static deepClone: <T>(previousOptions: T) => T;
    static cloneOptions: (previousOptions: TimelineOptions) => TimelineOptions;
    /**
     * Merge options. New keys will be added.
     */
    static mergeOptions(previousOptions: TimelineOptions, newOptions: TimelineOptions): TimelineOptions;
    /**
     * Format numbers with len
     */
    static timePadZero(num: number, len?: number): string;
}
