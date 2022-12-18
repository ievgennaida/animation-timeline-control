/**
 * Timeline values interface.
 */
export interface TimelineValues {
    /**
     * Value used for the visualization.
     */
    val: number;
    /**
     * Snapped value (val property will be snapped if snapping was enabled)
     */
    snapVal?: number;
    /**
     * Unsnapped original value.
     */
    originalVal?: number;
}
