export declare enum TimelineInteractionMode {
    /**
     * Keyframe selection tool selecting single or group of keyframes.
     */
    Selection = "selection",
    /**
     * Pan tool with the possibility to select keyframes.
     */
    Pan = "pan",
    /**
     * Allow only pan without any keyframes interaction.
     * Timeline still can be moved and controlled by option 'timelineDraggable'.
     */
    NonInteractivePan = "nonInteractivePan",
    /**
     * Zoom tool.
     */
    Zoom = "zoom",
    /**
     * No iteraction, except moving a timeline.
     * Timeline still can be moved and controlled by option 'timelineDraggable'.
     */
    None = "none"
}
