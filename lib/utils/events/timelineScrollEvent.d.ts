export interface TimelineScrollEvent {
    args: MouseEvent;
    /**
     * Whether scroll was component or user initiated.
     */
    scrollProgrammatically: boolean;
    scrollLeft: number;
    scrollTop: number;
    scrollHeight: number;
    scrollWidth: number;
}
