export declare class TimelineUtils {
    static drawLine(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number): void;
    static deleteElement<T>(array: Array<T>, element: T): Array<T>;
    /**
     * Check rectangle overlap.
     */
    static isOverlap(x: number, y: number, rectangle: DOMRect): boolean;
    /**
     * Find beautiful step for the header line gauge.
     */
    static findGoodStep(originalStep: number, divisionCheck?: number): number;
    static isRectOverlap(rect: DOMRect, rect2: DOMRect): boolean;
    static getDistance(x1: number, y1: number, x2?: number, y2?: number): number;
    static sign(p: number): number;
    static clearBrowserSelection(): void;
    static getPowArgument(toCheck: number): number;
}
