import { TimelineModel } from './timelineModel';
import { TimelineRow } from './timelineRow';
import { TimelineKeyframe } from './timelineKeyframe';
import { TimelineEventsEmitter } from './timelineEventsEmitter';
import { TimelineConsts } from './settings/timelineConsts';
import { TimelineOptions } from './settings/timelineOptions';
import { TimelineElement } from './utils/timelineElement';
import { TimelineCutBoundsRectResults } from './utils/timelineCutBoundsRectResults';
import { TimelineSelectionResults } from './utils/timelineSelectionResults';
import { TimelineMouseData } from './utils/timelineMouseData';
import { TimelineElementDragState } from './utils/timelineElementDragState';
import { TimelineDraggableData } from './utils/timelineDraggableData';
import { TimelineModelCalcResults } from './utils/timelineModelCalcResults';
import { TimelineCalculatedRow } from './utils/timelineCalculatedRow';
import { TimelineCalculatedKeyframe } from './utils/timelineCalculatedKeyframe';
import { TimelineKeyframeChangedEvent } from './utils/events/timelineKeyframeChangedEvent';
import { TimelineTimeChangedEvent } from './utils/events/timelineTimeChangedEvent';
import { TimelineSelectedEvent } from './utils/events/timelineSelectedEvent';
import { TimelineScrollEvent } from './utils/events/timelineScrollEvent';
import { TimelineClickEvent } from './utils/events/timelineClickEvent';
import { TimelineDragEvent } from './utils/events/timelineDragEvent';
import { TimelineInteractionMode } from './enums/timelineInteractionMode';
import { TimelineElementType } from './enums/timelineElementType';
import { TimelineEventSource } from './enums/timelineEventSource';
import { TimelineSelectionMode } from './enums/timelineSelectionMode';
import { TimelineEvents } from './enums/timelineEvents';
import { TimelineScrollSource } from './enums/timelineScrollSource';
export declare class Timeline extends TimelineEventsEmitter {
    /**
     * component container.
     */
    _container: HTMLElement | null;
    /**
     * Dynamically generated canvas inside of the container.
     */
    _canvas: HTMLCanvasElement | null;
    /**
     * Dynamically generated scroll container.
     */
    _scrollContainer: HTMLElement | null;
    /**
     * Dynamically generated virtual scroll content.
     * While canvas has no real size, this element is used to create virtual scroll on the parent element.
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
    _startPos: TimelineMouseData | null;
    /**
     * Drag scroll started position.
     */
    _scrollStartPos: DOMPoint | null;
    /**
     * Private. Current mouse position that is used to track values between mouse up/down events.
     * Can be null, use public methods and properties instead.
     */
    _currentPos: TimelineMouseData | null;
    /**
     * Private. Current active mouse area selection rectangle displayed during the mouse up/down drag events.
     */
    _selectionRect: DOMRect | null;
    /**
     * Private. Whether selection rectangle is displayed.
     */
    _selectionRectEnabled: boolean;
    /**
     * Private. Information in regard of current active drag state.
     */
    _drag: TimelineDraggableData | null;
    _startedDragWithCtrl: boolean;
    _startedDragWithShiftKey: boolean;
    _scrollProgrammatically: boolean;
    _clickTimeout?: number;
    _lastClickTime: number;
    _lastClickPoint: DOMPoint | null;
    _consts: TimelineConsts;
    /**
     * Private. whether click is allowed.
     */
    _clickAllowed: boolean;
    /**
     * Private. scroll finished timer reference.
     */
    _scrollFinishedTimerRef?: number | null;
    /**
     * Private.Current timeline position.
     * Please use public get\set methods to properly change the timeline position.
     */
    _val: number;
    _pixelRatio: number;
    /**
     * Private. Current zoom level. Please use publicly available properties to set zoom levels.
     */
    _currentZoom: number;
    /**
     * Private. Ref for the auto pan scroll interval.
     */
    _intervalRef?: number | null;
    _autoPanLastActionDate: number;
    _isPanStarted: boolean;
    /**
     * Private.
     * Component interaction mode. Please use publicly available methods.
     */
    _interactionMode: TimelineInteractionMode;
    _lastUsedArgs: MouseEvent | TouchEvent | null;
    _model: TimelineModel | null;
    /**
     * Private.
     * Indication when scroll are drag or click is started.
     */
    _scrollAreaClickOrDragStarted: boolean;
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
     * Generate component html.
     * @param id container.
     */
    _generateContainers(id: string | HTMLElement): void;
    /**
     * Subscribe current component on the related events.
     * Private. Use initialize method instead.
     */
    _subscribeComponentEvents(): void;
    /**
     * Private. Use dispose method instead.
     */
    _unsubscribeComponentEvents(): void;
    /**
     * Dispose current component: unsubscribe component and user events.
     */
    dispose(): void;
    _handleKeyUp: (event: KeyboardEvent) => void;
    _handleKeyDown: (event: KeyboardEvent) => void;
    _setZoomCursor(e: MouseEvent | KeyboardEvent): void;
    _handleBlurEvent: () => void;
    _handleWindowResizeEvent: () => void;
    _clearScrollFinishedTimer(): void;
    _handleScrollMouseDownEvent: () => void;
    _handleScrollEvent: (args: MouseEvent) => void;
    _controlKeyPressed(e: MouseEvent | KeyboardEvent | TouchEvent): boolean;
    _handleWheelEvent: (event: WheelEvent) => void;
    _zoom(direction: number, speed: number, x: number): void;
    /**
     * Zoom in
     * @param speed value from 0 to 1
     */
    zoomIn(speed?: number): void;
    /**
     * Zoom out.
     * @param speed value from 0 to 1
     */
    zoomOut(speed?: number): void;
    /**
     * Set direct zoom value.
     * @param zoom zoom value to set. percent 0-1 and etc.
     * @param min min zoom.
     * @param max max zoom.
     * @return normalized value.
     */
    _setZoom(zoom: number, min?: number | undefined, max?: number | undefined): number;
    /**
     * Set direct zoom value.
     * @public
     * @param zoom zoom value to set. percent 0-1 and etc.
     * @return normalized value.
     */
    setZoom(zoom: number): number;
    /**
     * Get current zoom level.
     */
    getZoom(): number;
    /**
     * @param args
     */
    _handleMouseDownEvent: (args: MouseEvent) => void;
    _setElementDragState(element: TimelineElement | TimelineElementDragState, val: number): TimelineElementDragState;
    isLeftButtonClicked(args: MouseEvent | TouchEvent | any): boolean;
    _handleMouseMoveEvent: (args: MouseEvent | TouchEvent | any) => void;
    /**
     * Move elements
     * @param offset vector to move elements along.
     * @param elements Element to move.
     * @returns real moved value.
     */
    _moveElements(offset: number, elements: Array<TimelineElementDragState>, source?: TimelineEventSource): number;
    _handleMouseUpEvent: (args: MouseEvent) => void;
    /**
     * client height.
     */
    _height(): number;
    /**
     * Client canvas width;
     */
    _width(): number;
    /**
     * Convert virtual calculation results to keyframes
     */
    _mapKeyframes(array: Array<TimelineCalculatedKeyframe | TimelineElement>): Array<TimelineKeyframe>;
    /**
     * Get all keyframes under the screen rectangle.
     * @param screenRect screen coordinates to get keyframes.
     */
    _getKeyframesByRectangle(screenRect: DOMRect): TimelineKeyframe[];
    _performClick(pos: TimelineMouseData, drag: TimelineDraggableData): boolean;
    /**
     * Set keyframe value.
     * @param keyframe
     * @param value
     * @return set value.
     */
    _setKeyframePos(element: TimelineElementDragState, value: number, source?: TimelineEventSource): number;
    /**
     * @param cursor to set.
     */
    _setCursor(cursor: string): void;
    /**
     * Set component interaction mode.
     */
    setInteractionMode(mode: TimelineInteractionMode): void;
    /**
     * Get current interaction mode.
     */
    getInteractionMode(): TimelineInteractionMode;
    _convertToElement(row: TimelineRow, keyframe: TimelineKeyframe): TimelineElement;
    getSelectedKeyframes(): Array<TimelineKeyframe>;
    getSelectedElements(): Array<TimelineElement>;
    /**
     * Get all keyframe models available in the model.
     */
    getAllKeyframes(): TimelineKeyframe[];
    selectAllKeyframes(): TimelineSelectionResults;
    deselectAll(): TimelineSelectionResults;
    private _changeNodeState;
    select(nodes: TimelineKeyframe[] | TimelineKeyframe | null, mode?: TimelineSelectionMode): TimelineSelectionResults;
    /**
     * Select keyframes
     * @param nodes keyframe or list of the keyframes to be selected.
     * @param mode selection mode.
     */
    _selectInternal(nodes: TimelineKeyframe[] | TimelineKeyframe | null, mode?: TimelineSelectionMode): TimelineSelectionResults;
    /**
     * foreach visible keyframe.
     */
    _forEachKeyframe(callback: (keyframe: TimelineCalculatedKeyframe, index?: number, newRow?: boolean) => void): void;
    _trackMousePos(canvas: HTMLCanvasElement, mouseArgs: MouseEvent | TouchEvent): TimelineMouseData;
    /**
     * Get scroll container client width.
     */
    getClientWidth(): number;
    /**
     * Get scroll container client height.
     */
    getClientHeight(): number;
    _cleanUpSelection(forcePrevent?: boolean): void;
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
    /**
     * Scroll virtual canvas when pan mode is enabled.
     */
    _scrollByPan(start: TimelineMouseData, pos: TimelineMouseData, scrollStartPos: DOMPoint): void;
    _scrollBySelectionOutOfBounds(pos: DOMPoint): boolean;
    /**
     * Convert screen pixel to value.
     */
    pxToVal(px: number): number;
    /**
     * Convert value to local screen component coordinates.
     */
    _toScreenPx(val: number): number;
    /**
     * Convert screen local coordinates to a global value info.
     */
    _fromScreen(px: number): number;
    /**
     * Convert area value to global screen pixel coordinates.
     */
    valToPx(val: number): number;
    /**
     * Snap a value to a nearest grid point.
     */
    snapVal(val: number): number;
    _mousePosToVal(x: number, snapEnabled?: boolean): number;
    /**
     * Format line gauge text.
     * Default formatting is HMS
     * @param ms milliseconds to convert.
     * @param isSeconds whether seconds are passed.
     */
    _formatUnitsText(ms: number, isSeconds?: boolean): string;
    /**
     * Left padding of the timeline.
     */
    _leftMargin(): number;
    _renderTicks(): void;
    /**
     * calculate virtual mode. Determine screen positions for the elements.
     */
    _calculateModel(): TimelineModelCalcResults;
    _renderRows(): void;
    /**
     * Method is used for the optimization.
     * Only visible part should be rendered.
     */
    _cutBounds(rect: DOMRect): TimelineCutBoundsRectResults;
    /**
     * get keyframe group screen rect coordinates.
     * @param row
     * @param rowY row screen coords y position
     */
    _getKeyframesGroupSize(row: TimelineRow, rowY: number, minValue: number, maxValue: number): DOMRect;
    _getKeyframePosition(keyframe: TimelineKeyframe, rowCalculated: TimelineCalculatedRow): DOMRect | null;
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
    getOptions(): TimelineOptions;
    setScrollLeft(value: number): void;
    setScrollTop(value: number): void;
    getScrollLeft(): number;
    getScrollTop(): number;
    /**
     * Set options and render the component.
     * Note: Options will be merged\appended with the defaults and component will be invalidated/rendered again.
     */
    setOptions(toSet: TimelineOptions): TimelineOptions;
    /**
     * Private. Apply html container styles from options if any is set.
     */
    _applyContainersStyles(): void;
    _setOptions(toSet: TimelineOptions): TimelineOptions;
    getModel(): TimelineModel;
    /**
     * Set model and redraw application.
     * @param data
     */
    setModel(data: TimelineModel): void;
    _getMousePos(canvas: HTMLCanvasElement, e: TouchEvent | MouseEvent | any): TimelineMouseData;
    /**
     * Apply container div size to the container on changes detected.
     */
    _updateCanvasScale(): boolean;
    /**
     * Rescale and update size of the container.
     */
    rescale(): boolean;
    /**
     * This method is used to draw additional space when after there are no keyframes.
     * When scrolled we should allow to indefinitely scroll right, so space should be extended to drag keyframes outside of the current size bounds.
     */
    _rescaleInternal(newWidth?: number | null, newHeight?: number | null, scrollMode?: TimelineScrollSource): boolean;
    /**
     * Filter and sort draggable elements by the priority to get first draggable element.
     * Filtration is done based on the timeline styles and options.
     * @param elements to filter and sort.
     * @param val current mouse value to find best match.
     */
    _filterDraggableElements(elements: TimelineElement[], val?: number | null): TimelineElement;
    /**
     * get all clickable elements by the given local screen coordinate.
     */
    elementFromPoint(pos: DOMPoint, clickRadius?: number, onlyTypes?: TimelineElementType[] | null): TimelineElement[];
    _cloneOptions(previousOptions: TimelineOptions): TimelineOptions;
    /**
     * Merge options. New keys will be added.
     */
    _mergeOptions(previousOptions: TimelineOptions, newOptions: TimelineOptions): TimelineOptions;
    /**
     * Subscribe user callback on time changed.
     */
    onTimeChanged(callback: (eventArgs: TimelineTimeChangedEvent) => void): void;
    /**
     * Subscribe user callback on drag started event.
     */
    onDragStarted(callback: (eventArgs: TimelineDragEvent) => void): void;
    /**
     * Subscribe user callback on drag event.
     */
    onDrag(callback: (eventArgs: TimelineDragEvent) => void): void;
    /**
     * Subscribe user callback on drag finished event.
     */
    onDragFinished(callback: (eventArgs: TimelineDragEvent) => void): void;
    /**
     * Subscribe user callback on double click.
     */
    onDoubleClick(callback: (eventArgs: TimelineClickEvent) => void): void;
    /**
     * Subscribe user callback on keyframe changed event.
     */
    onKeyframeChanged(callback: (eventArgs: TimelineKeyframeChangedEvent) => void): void;
    /**
     * Subscribe user callback on drag finished event.
     */
    onMouseDown(callback: (eventArgs: TimelineClickEvent) => void): void;
    /**
     * Subscribe user callback on selected.
     */
    onSelected(callback: (eventArgs: TimelineSelectedEvent) => void): void;
    /**
     * Subscribe user callback on scroll event
     */
    onScroll(callback: (eventArgs: TimelineScrollEvent) => void): void;
    onScrollFinished(callback: (eventArgs: TimelineScrollEvent) => void): void;
    _emitScrollEvent(args: MouseEvent | null, scrollProgrammatically: boolean, eventType?: TimelineEvents): TimelineScrollEvent;
    _emitKeyframeChanged(element: TimelineElementDragState, source?: TimelineEventSource): TimelineKeyframeChangedEvent;
    _emitDragStartedEvent(): TimelineDragEvent;
    /**
     * Private emit timeline event that dragging element is finished.
     * @param forcePrevent - needed when during dragging components set to the state when they cannot be dragged anymore. (used only as recovery state).
     * @returns
     */
    _emitDragFinishedEvent(forcePrevent?: boolean): TimelineDragEvent;
    _preventDrag(dragArgs: TimelineDragEvent, data: TimelineDraggableData, toStart?: boolean): void;
    _emitDragEvent(): TimelineDragEvent;
    _emitKeyframesSelected(state: TimelineSelectionResults): TimelineSelectedEvent;
    _getDragEventArgs(): TimelineDragEvent;
}
