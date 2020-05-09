import { TimelineEventsEmitter } from './timelineEventsEmitter';
import { TimelineOptions } from './settings/timelineOptions';
import { TimelineConsts } from './settings/timelineConsts';
import { TimelineKeyframe } from './timelineKeyframe';
import { TimelineModel } from './timelineModel';
import { TimelineClickableElement } from './utils/timelineClickableElement';
import { TimelineRow } from './timelineRow';
import { CutBoundsRect } from './utils/cutBoundsRect';
import { RowSize, RowsCalculationsResults } from './utils/rowsCalculationsResults';
import { TimelineInteractionMode } from './enums/timelineInteractionMode';
import { TimelineScrollEvent } from './utils/events/timelineScrollEvent';
import { TimelineDraggableData } from './utils/timelineDraggableData';
import { TimelineClickEvent } from './utils/events/timelineClickEvent';
import { TimelineDragEvent } from './utils/events/timelineDragEvent';
import { TimelineEventSource } from './enums/timelineEventSource';
import { TimelineTimeChangedEvent } from './utils/events/timelineTimeChangedEvent';
interface MousePoint extends DOMPoint {
    radius: number;
}
interface MouseData extends MousePoint {
    val: number;
    snapVal: number;
}
export declare class Timeline extends TimelineEventsEmitter {
    /**
     * component container.
     */
    _container: HTMLElement | null;
    /**
     * Dynamically generated event.
     */
    _canvas: HTMLCanvasElement | null;
    /**
     * Dynamically generated scroll container.
     */
    _scrollContainer: HTMLElement | null;
    /**
     * Dynamically generated virtual scroll content.
     */
    _scrollContent: HTMLElement | null;
    /**
     * Rendering context
     */
    _ctx: CanvasRenderingContext2D | null;
    /**
     * Components settings
     */
    _options: TimelineOptions | null;
    /**
     * Drag start position.
     */
    _startPos: MouseData | null;
    /**
     * Drag scroll started position.
     */
    _scrollStartPos: DOMPoint | null;
    _currentPos: MouseData | null;
    _selectionRect: DOMRect | null;
    _selectionRectEnabled: boolean;
    _drag: TimelineDraggableData | null;
    _startedDragWithCtrl: boolean;
    _startedDragWithShiftKey: boolean;
    _clickTimeout?: number;
    _lastClickTime: number;
    _lastClickPoint: DOMPoint | null;
    _consts: TimelineConsts;
    _clickAllowed: boolean;
    /**
     * scroll finished timer reference.
     */
    _scrollFinishedTimerRef?: number;
    _selectedKeyframes: Array<TimelineKeyframe>;
    _val: number;
    /**
     * TODO: should be tested on retina.
     */
    _pixelRatio: number;
    _currentZoom: number;
    _intervalRef?: number | null;
    _autoPanLastActionDate: number;
    _isPanStarted: boolean;
    _interactionMode: TimelineInteractionMode;
    _lastUsedArgs: MouseEvent | TouchEvent | null;
    _model: TimelineModel | null;
    /**
     * Create Timeline instance
     * @param options Timeline settings.
     * @param model Timeline model.
     */
    constructor(options?: TimelineOptions | null, model?: TimelineModel | null);
    /**
     * Initialize Timeline
     * @param options Timeline settings.
     * @param model Timeline model.
     */
    initialize(options: TimelineOptions | null, model: TimelineModel | null): void;
    /**
     * Subscribe current component on the related events.
     */
    _subscribeOnEvents(): void;
    dispose(): void;
    _handleBlurEvent: () => void;
    _handleWindowResizeEvent: () => void;
    _handleDocumentKeydownEvent: (args: KeyboardEvent) => boolean;
    _clearScrollFinishedTimer(): void;
    _handleScrollEvent: (args: MouseEvent) => void;
    _controlKeyPressed(e: MouseEvent | KeyboardEvent): boolean;
    _handleWheelEvent: (event: WheelEvent) => void;
    /**
     * @param args
     */
    _handleMouseDownEvent: (args: MouseEvent) => void;
    _handleMouseMoveEvent: (args: any) => void;
    _handleMouseUpEvent: (args: MouseEvent) => void;
    _performClick(pos: MouseData, args: MouseEvent, drag: TimelineDraggableData): boolean;
    /**
     * Set keyframe value.
     * @param keyframe
     * @param value
     */
    _setKeyframePos(keyframe: TimelineKeyframe, value: number): boolean;
    /**
     * @param cursor to set.
     */
    _setCursor(cursor: string): void;
    /**
     * Set pan mode
     * @param isPan
     */
    setInteractionMode(mode: TimelineInteractionMode): void;
    /**
     * Get current interaction mode.
     */
    getInteractionMode(): TimelineInteractionMode;
    _convertToElement(row: TimelineRow, keyframe: TimelineKeyframe): TimelineClickableElement;
    getSelectedElements(): Array<TimelineClickableElement>;
    /**
     * Do the selection.
     * @param {boolean} isSelected
     * @param {object} selector can be a rectangle or a keyframe object.
     * @param {boolean} ignoreOthers value indicating whether all other object should be reversed.
     * @return {boolean} isChanged
     */
    _performSelection(isSelected?: boolean, selector?: DOMRect | TimelineKeyframe | null, ignoreOthers?: boolean): boolean;
    /**
     * foreach visible keyframe.
     */
    _forEachKeyframe(callback: (keyframe: TimelineKeyframe, keyframeIndex?: number, row?: RowSize, index?: number, newRow?: boolean) => void, calculateStripesBounds?: boolean): void;
    _trackMousePos(canvas: HTMLCanvasElement, mouseArgs: MouseEvent | TouchEvent): MouseData;
    _cleanUpSelection(): void;
    /**
     * Check whether click timeout is over.
     */
    _clickTimeoutIsOver(): boolean;
    /**
     * Automatically pan. Scroll canvas when selection is made and mouse outside of the bounds.
     */
    _startAutoPan(): void;
    /**
     * Stop current running auto pan
     */
    _stopAutoPan(): void;
    /**
     * Check whether auto pan should be slowed down a bit.
     */
    _checkUpdateSpeedTooFast(): boolean;
    _scrollByPan(start: MouseData, pos: MouseData, scrollStartPos: DOMPoint): void;
    _scrollBySelectionOutOfBounds(pos: DOMPoint): boolean;
    /**
     * Convert screen pixel to value.
     */
    pxToVal(coords: number, absolute?: boolean): number;
    /**
     * Convert area value to screen pixel coordinates.
     */
    valToPx(ms: number, absolute?: boolean): number;
    /**
     * Snap a value to a nearest beautiful point.
     */
    snapVal(ms: number): number;
    _mousePosToVal(x: number, snapEnabled?: boolean): number;
    /**
     * Format line gauge text.
     * Default formatting is HMS
     * @param ms milliseconds to convert.
     * @param isSeconds whether seconds are passed.
     */
    _formatLineGaugeText(ms: number, isSeconds?: boolean): string;
    _renderTicks(): void;
    /**
     * calculate screen positions of the model elements.
     */
    _calculateRowsBounds(includeStipesBounds?: boolean): RowsCalculationsResults;
    _renderRows(): void;
    /**
     * Method is used for the optimization.
     * Only visible part should be rendered.
     */
    _cutBounds(rect: DOMRect): CutBoundsRect;
    /**
     * get keyframe stripe screen rect coordinates.
     * @param row
     * @param rowY row screen coords y position
     */
    _getKeyframesStripeSize(row: TimelineRow, rowY: number, minValue: number, maxValue: number): DOMRect;
    _getKeyframePosition(keyframe: TimelineKeyframe, rowSize: RowSize): DOMRect | null;
    _renderKeyframes(): void;
    _renderSelectionRect(): void;
    _renderBackground(): void;
    _renderTimeline(): void;
    _renderHeaderBackground(): void;
    redraw(): void;
    /**
     * perform scroll to max left.
     */
    scrollLeft(): void;
    /**
     * Redraw parts of the component in the specific order.
     */
    _redrawInternal: () => void;
    /**
     * Get row by y coordinate.
     * @param posY y screen coordinate.
     */
    getRowByY(posY: number): TimelineRow;
    /**
     * Find sharp pixel position
     */
    _getSharp(pos: number, thickness?: number): number;
    /**
     * Get current time:
     */
    getTime(): number;
    /**
     * Set current time internal
     * @param val value.
     * @param source event source.
     */
    _setTimeInternal(val: number, source?: TimelineEventSource): boolean;
    setTime(val: number): boolean;
    select(value?: boolean): void;
    getOptions(): TimelineOptions;
    setScrollLeft(value: number): void;
    setScrollTop(value: number): void;
    getScrollLeft(): number;
    getScrollTop(): number;
    /**
     * Set this._options.
     * Options will be merged with the defaults and control invalidated
     */
    setOptions(toSet: TimelineOptions): TimelineOptions;
    getModel(): TimelineModel;
    /**
     * Set model and redraw application.
     * @param data
     */
    setModel(data: TimelineModel): void;
    _getMousePos(canvas: HTMLCanvasElement, e: TouchEvent | MouseEvent | any): MousePoint;
    /**
     * Apply container div size to the container on changes detected.
     */
    _updateCanvasScale(): boolean;
    /**
     * Rescale and update size of the container.
     */
    rescale(): void;
    _rescaleInternal(newWidth?: number | null, newHeight?: number | null, scrollMode?: string): void;
    /**
     * get draggable element.
     * Filter elements and get first element by a priority.
     * @param Array
     * @param val current mouse value
     */
    _findDraggable(elements: Array<TimelineClickableElement>, val?: number | null): TimelineClickableElement;
    /**
     * get all clickable elements by a screen point.
     */
    elementFromPoint(pos: DOMPoint, clickRadius?: number): Array<TimelineClickableElement>;
    /**
     * Merge options with the defaults.
     */
    _mergeOptions(toSet: TimelineOptions): TimelineOptions;
    /**
     * Subscribe on time changed.
     */
    onTimeChanged(callback: (eventArgs: TimelineTimeChangedEvent) => void): void;
    /**
     * Subscribe on drag started event.
     */
    onDragStarted(callback: (eventArgs: TimelineDragEvent) => void): void;
    /**
     * Subscribe on drag event.
     */
    onDrag(callback: (eventArgs: TimelineDragEvent) => void): void;
    /**
     * Subscribe on drag finished event.
     */
    onDragFinished(callback: (eventArgs: TimelineDragEvent) => void): void;
    /**
     * Subscribe on double click.
     */
    onDoubleClick(callback: (eventArgs: TimelineClickEvent) => void): void;
    /**
     * Subscribe on drag finished event.
     */
    onMouseDown(callback: (eventArgs: TimelineClickEvent) => void): void;
    /**
     * Subscribe on scroll event
     */
    onScroll(callback: (eventArgs: TimelineScrollEvent) => void): void;
    _emitDragStartedEvent(): TimelineDragEvent;
    _emitDragFinishedEvent(): TimelineDragEvent;
    _emitDragEvent(): TimelineDragEvent;
    _emitKeyframesSelected(selectedKeyframes: Array<TimelineKeyframe>): void;
    _getDragEventArgs(): TimelineDragEvent;
}
export {};
