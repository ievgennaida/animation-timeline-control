import { TimelineEventsEmitter } from './timelineEventsEmitter';
import { TimelineOptions } from './settings/timelineOptions';
import { TimelineConsts } from './settings/timelineConsts';
import { TimelineKeyframe } from './timelineKeyframe';
import { TimelineModel } from './timelineModel';
import { TimelineElement } from './utils/timelineElement';
import { TimelineRow } from './timelineRow';
import { TimelineCutBoundsRectResults } from './utils/timelineCutBoundsRectResults';
import { TimelineCalculatedRow, TimelineModelCalcResults, TimelineCalculatedKeyframe } from './utils/timelineModelCalcResults';
import { TimelineInteractionMode } from './enums/timelineInteractionMode';
import { TimelineScrollEvent } from './utils/events/timelineScrollEvent';
import { TimelineSelectedEvent } from './utils/events/timelineSelectedEvent';
import { TimelineDraggableData, TimelineElementDragState } from './utils/timelineDraggableData';
import { TimelineClickEvent } from './utils/events/timelineClickEvent';
import { TimelineDragEvent } from './utils/events/timelineDragEvent';
import { TimelineEventSource } from './enums/timelineEventSource';
import { TimelineTimeChangedEvent } from './utils/events/timelineTimeChangedEvent';
import { TimelineSelectionMode } from './enums/timelineSelectionMode';
import { TimelineSelectionResults } from './utils/timelineSelectionResults';
import { TimelineMouseData } from './utils/timelineMouseData';
import { TimelineKeyframeChangedEvent } from './utils/events/timelineKeyframeChangedEvent';
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
    _startPos: TimelineMouseData | null;
    /**
     * Drag scroll started position.
     */
    _scrollStartPos: DOMPoint | null;
    _currentPos: TimelineMouseData | null;
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
    _scrollFinishedTimerRef?: number | null;
    _val: number;
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
     * Generate component html.
     * @param id container.
     */
    _generateContainers(id: string | HTMLElement): void;
    /**
     * Subscribe current component on the related events.
     */
    _subscribeOnEvents(): void;
    dispose(): void;
    _handleKeyUp: (event: KeyboardEvent) => void;
    _handleKeyDown: (event: KeyboardEvent) => void;
    _setZoomCursor(e: MouseEvent | KeyboardEvent): void;
    _handleBlurEvent: () => void;
    _handleWindowResizeEvent: () => void;
    _clearScrollFinishedTimer(): void;
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
     * Client width;
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
     * Set pan mode
     * @param isPan
     */
    setInteractionMode(mode: TimelineInteractionMode): void;
    /**
     * Get current interaction mode.
     */
    getInteractionMode(): TimelineInteractionMode;
    _convertToElement(row: TimelineRow, keyframe: TimelineKeyframe): TimelineElement;
    getSelectedKeyframes(): Array<TimelineKeyframe>;
    getSelectedElements(): Array<TimelineElement>;
    getAllKeyframes(): Array<TimelineKeyframe>;
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
     * Options will be merged with the defaults and control invalidated
     */
    setOptions(toSet: TimelineOptions): TimelineOptions;
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
    rescale(): void;
    _rescaleInternal(newWidth?: number | null, newHeight?: number | null, scrollMode?: string): void;
    /**
     * get draggable element.
     * Filter elements and get first element by a priority.
     * @param Array
     * @param val current mouse value
     */
    _findDraggable(elements: Array<TimelineElement>, val?: number | null): TimelineElement;
    /**
     * get all clickable elements by a screen point.
     */
    elementFromPoint(pos: DOMPoint, clickRadius?: number): Array<TimelineElement>;
    /**
     * Merge options with the defaults.
     */
    _mergeOptions(from: TimelineOptions): TimelineOptions;
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
     * Subscribe on keyframe changed event.
     */
    onKeyframeChanged(callback: (eventArgs: TimelineKeyframeChangedEvent) => void): void;
    /**
     * Subscribe on drag finished event.
     */
    onMouseDown(callback: (eventArgs: TimelineClickEvent) => void): void;
    onSelected(callback: (eventArgs: TimelineSelectedEvent) => void): void;
    /**
     * Subscribe on scroll event
     */
    onScroll(callback: (eventArgs: TimelineScrollEvent) => void): void;
    _emitScrollEvent(args: MouseEvent | null): TimelineScrollEvent;
    _emitKeyframeChanged(element: TimelineElementDragState, source?: TimelineEventSource): TimelineKeyframeChangedEvent;
    _emitDragStartedEvent(): TimelineDragEvent;
    _emitDragFinishedEvent(): TimelineDragEvent;
    _preventDrag(dragArgs: TimelineDragEvent, data: TimelineDraggableData, toStart?: boolean): void;
    _emitDragEvent(): TimelineDragEvent;
    _emitKeyframesSelected(state: TimelineSelectionResults): TimelineSelectedEvent;
    _getDragEventArgs(): TimelineDragEvent;
}
