/**
 * Timeline values interface.
 */
export interface TimelinePoint {
    /**
     * Value used for the visualization.
     * It can be snapped or original.
     */
    val: number;
    /**
     * Snapped value if snapping is enabled. In other case corresponding to original value.
     */
    snapVal: number;
    /**
     * Unsnapped original value.
     */
    originalVal: number;
    /**
     * Screen click point.
     */
    pos: DOMPoint;
}
