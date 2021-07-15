import { TimelineRanged } from '../timelineRanged';
export declare class TimelineUtils {
    static drawLine(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number): void;
    /**
     * Check is valid number.
     */
    static isNumber(val?: number): boolean;
    static deleteElement<T>(array: Array<T>, element: T): Array<T>;
    /**
     * Check rectangle overlap.
     */
    static isOverlap(x: number, y: number, rectangle: DOMRect): boolean;
    /**
     * Find beautiful step for the header line gauge.
     */
    static findGoodStep(originalStep: number, divisionCheck?: number): number;
    /**
     * Keep value in min, max bounds.
     */
    static keepInBounds(value: number, min?: number | undefined, max?: number | undefined): number;
    static setMinMax(to: TimelineRanged, from: TimelineRanged, shrink?: boolean): TimelineRanged;
    static isRectOverlap(rect: DOMRect, rect2: DOMRect): boolean;
    static getDistance(x1: number, y1: number, x2?: number, y2?: number): number;
    static sign(p: number): number;
    static clearBrowserSelection(): void;
    static getPowArgument(toCheck: number): number;
}
