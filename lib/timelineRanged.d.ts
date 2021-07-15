export interface TimelineRanged {
    /**
     * min
     */
    min?: number | null;
    /**
     * max.
     */
    max?: number | null;
    /**
     * Allow to calculate min.
     */
    getMin?: () => number;
    /**
     * Allow to calculate max.
     */
    getMax?: () => number;
}
