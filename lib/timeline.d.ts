import { TimelineEventsEmitter } from './timelineEventsEmitter';
import { TimelineConsts } from './settings/timelineConsts';
import { TimelineModel } from './models/timelineModel';
import { TimelineRow } from './models/timelineRow';
import { TimelineKeyframe } from './models/timelineKeyframe';
import { TimelineOptions } from './settings/timelineOptions';
import { TimelineElement } from './utils/timelineElement';
import { TimelineCutBoundsRectResults } from './utils/timelineCutBoundsRectResults';
import { TimelineSelectionResults } from './utils/timelineSelectionResults';
import { TimelineMouseData } from './utils/timelineMouseData';
import { TimelineElementDragState } from './utils/timelineElementDragState';
import { TimelineDraggableData } from './utils/timelineDraggableData';
import { TimelineGroupViewModel } from './viewModels/timelineGroupViewModel';
import { TimelineKeyframeViewModel } from './viewModels/timelineKeyframeViewModel';
import { TimelineRowViewModel } from './viewModels/timelineRowViewModel';
import { TimelineViewModel } from './viewModels/timelineViewModel';
import { TimelineKeyframeChangedEvent } from './utils/events/timelineKeyframeChangedEvent';
import { TimelineTimeChangedEvent } from './utils/events/timelineTimeChangedEvent';
import { TimelineSelectedEvent } from './utils/events/timelineSelectedEvent';
import { TimelineScrollEvent } from './utils/events/timelineScrollEvent';
import { TimelineClickEvent } from './utils/events/timelineClickEvent';
import { TimelineDragEvent } from './utils/events/timelineDragEvent';
import { TimelineKeyframeShape } from './enums/timelineKeyframeShape';
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
    _options: TimelineOptions;
    /**
     * Drag start position.
     */
    _startPosMouseArgs: TimelineMouseData | null;
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
    _clickTimeout: number | null;
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
    /**
     * Private.
     * When last auto pan scroll action was started.
     */
    _autoPanLastActionDate: number;
    /**
     * Private.
     * Is pan mouse interactions are started.
     */
    _isPanStarted: boolean;
    /**
     * Private.
     * Component interaction mode. Please use publicly available methods.
     */
    _interactionMode: TimelineInteractionMode;
    _lastUsedArgs: MouseEvent | TouchEvent | null;
    /**
     * Private.
     * Current set timeline model.
     */
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
    initialize: (options: TimelineOptions | null, model: TimelineModel | null) => void;
    /**
     * Generate component html.
     * @param id container.
     */
    _generateContainers: (id: string | HTMLElement) => void;
    /**
     * Get drawing context
     */
    _getCtx(): CanvasRenderingContext2D | null;
    /**
     * Subscribe current component on the related events.
     * Private. Use initialize method instead.
     */
    _subscribeComponentEvents: () => void;
    /**
     * Private. Use dispose method instead.
     */
    _unsubscribeComponentEvents: () => void;
    /**
     * Dispose current component: unsubscribe component and user events.
     */
    dispose: () => void;
    /**
     * On key up is received.
     */
    _handleKeyUp: (event: KeyboardEvent) => void;
    /**
     * On key down is received.
     */
    _handleKeyDown: (event: KeyboardEvent) => void;
    _setZoomCursor: (e: MouseEvent | KeyboardEvent) => void;
    _handleBlurEvent: () => void;
    _handleWindowResizeEvent: () => void;
    _clearScrollFinishedTimer: () => void;
    _handleScrollMouseDownEvent: () => void;
    _handleScrollEvent: (args: Event) => void;
    _controlKeyPressed: (e: MouseEvent | KeyboardEvent | TouchEvent) => boolean;
    _handleWheelEvent: (event: WheelEvent) => void;
    _zoom: (direction: number, speed: number, x: number) => void;
    /**
     * Zoom in
     * @param speed value from 0 to 1
     */
    zoomIn: (speed?: number | undefined) => void;
    /**
     * Zoom out.
     * @param speed value from 0 to 1
     */
    zoomOut: (speed?: number | undefined) => void;
    /**
     * Set direct zoom value.
     * @param zoom zoom value to set. percent 0-1 and etc.
     * @param min min zoom.
     * @param max max zoom.
     * @return normalized value.
     */
    _setZoom: (zoom: number, min?: number | null | undefined, max?: number | null | undefined) => number;
    /**
     * Set direct zoom value.
     * @public
     * @param zoom zoom value to set. percent 0-1 and etc.
     * @return normalized value.
     */
    setZoom: (zoom: number) => number;
    /**
     * Get current zoom level.
     */
    getZoom: () => number;
    _getClickDetectionRadius: (point: TimelineMouseData) => number;
    _handleContextMenu: (args: MouseEvent | TouchEvent) => void;
    /**
     * @param args
     */
    _handleMouseDownEvent: (args: MouseEvent | TouchEvent) => void;
    _setElementDragState: (element: TimelineElement | TimelineElementDragState, val: number) => TimelineElementDragState;
    /**
     * Check is mouse left button is clicked.
     */
    isLeftButtonClicked: (args: MouseEvent | TouchEvent | any) => boolean;
    /**
     * Browser mouse move handler.
     */
    _handleMouseMoveEvent: (args: MouseEvent | TouchEvent | null) => void;
    /**
     * Move elements
     * @param offset vector to move elements along.
     * @param elements Element to move.
     * @returns real moved value.
     */
    _moveElements(offset: number, elements: TimelineElementDragState[], source?: TimelineEventSource): number;
    /**
     * Mouse up handler.
     */
    _handleMouseUpEvent: (args: MouseEvent | TouchEvent) => void;
    /**
     * Canvas client height.
     */
    _canvasClientHeight: () => number;
    /**
     * Canvas client width.
     */
    _canvasClientWidth: () => number;
    /**
     * Get all keyframes under the screen rectangle.
     * @param screenRect screen coordinates to get keyframes.
     */
    _getKeyframesByRectangle: (screenRect: DOMRect) => TimelineKeyframe[];
    /**
     * Private.
     * Perform timeline click.
     */
    _performClick: (pos: TimelineMouseData, drag: TimelineDraggableData | null) => boolean;
    /**
     * Set keyframe value.
     * @param keyframe
     * @param value
     * @return set value.
     */
    _setKeyframePos: (element: TimelineElementDragState, value: number, source?: TimelineEventSource) => number;
    /**
     * @param cursor to set.
     */
    _setCursor: (cursor: string) => void;
    /**
     * Set component interaction mode.
     */
    setInteractionMode: (mode: TimelineInteractionMode) => void;
    /**
     * Get current interaction mode.
     */
    getInteractionMode: () => TimelineInteractionMode;
    /**
     * Private.
     * Helper method. Convert model element  to timeline element.
     */
    _convertToTimelineElement: (rowModel: TimelineRow | null, keyframe: TimelineKeyframe) => TimelineElement;
    getSelectedKeyframes: () => TimelineKeyframe[];
    /**
     * Get selected timeline elements.
     */
    getSelectedElements: () => TimelineElement[];
    /**
     * Get all keyframe models available in the model.
     */
    getAllKeyframes: () => TimelineKeyframe[];
    selectAllKeyframes: () => TimelineSelectionResults;
    deselectAll: () => TimelineSelectionResults;
    private _changeNodeState;
    select: (nodes: TimelineKeyframe[] | TimelineKeyframe | null, mode?: TimelineSelectionMode) => TimelineSelectionResults;
    /**
     * Select keyframes
     * @param nodes keyframe or list of the keyframes to be selected.
     * @param mode selection mode.
     */
    _selectInternal: (nodes: TimelineKeyframe[] | TimelineKeyframe | null, mode?: TimelineSelectionMode) => TimelineSelectionResults;
    /**
     * foreach visible keyframe.
     */
    _forEachKeyframe(callback: (keyframe: TimelineKeyframeViewModel, index?: number, newRow?: boolean) => void, onRowCallback?: (rowViewModel: TimelineRowViewModel) => void): void;
    /**
     * Private.
     * Create extended mouse position and calculate size of the selection rectangle.
     */
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
    _startAutoPan: () => void;
    /**
     * Stop current running auto pan
     */
    _stopAutoPan: () => void;
    /**
     * Check whether auto pan should be slowed down a bit.
     */
    _checkUpdateSpeedTooFast(): boolean;
    /**
     * Scroll virtual canvas when pan mode is enabled.
     */
    _scrollByPan(start: DOMPoint, pos: DOMPoint, scrollStartPos: DOMPoint | null): void;
    _scrollBySelectionOutOfBounds(pos: DOMPoint): boolean;
    /**
     * Convert screen pixel to value.
     */
    pxToVal(px: number): number;
    /**
     * Convert value to local screen component coordinates.
     */
    _toScreenPx: (val: number) => number;
    /**
     * Convert screen local coordinates to a global value info.
     */
    _fromScreen: (px: number) => number;
    /**
     * Convert area value to global screen pixel coordinates.
     */
    valToPx: (val: number) => number;
    /**
     * Snap a value to a nearest grid point.
     */
    snapVal(val: number): number;
    /**
     * Convert mouse position to the timeline units considering all the scrolling and offsets.
     */
    _mousePosToVal: (x: number, snapEnabled?: boolean) => number;
    /**
     * Format line gauge text.
     * Default formatting is HMS
     * @param ms milliseconds to convert.
     * @param isSeconds whether seconds are passed.
     */
    _formatUnitsText: (ms: number) => string;
    /**
     * Left padding of the timeline.
     */
    _leftMargin: () => number;
    /**
     * Private.
     * Render line gauge ticks.
     */
    _renderTicks: () => void;
    /**
     * Private.
     * Calculate virtual view model.
     * Determine screen positions for the model elements given.
     */
    _generateViewModel: () => TimelineViewModel;
    /**
     * Render timeline rows.
     */
    _renderRows: () => void;
    /**
     * Render group for the row.
     */
    _renderGroupBounds: (rowViewModel: TimelineRowViewModel) => void;
    /**
     * Method is used for the canvas drawing optimization.
     * Bounds are cut to draw only visible parts for the active canvas.
     */
    _cutBounds: (rect: DOMRect) => TimelineCutBoundsRectResults | null;
    _cutBoundsWhenOverlap: (rect: DOMRect, minX: number, maxX: number, minY: number, maxY: number) => TimelineCutBoundsRectResults | null;
    /**
     * Calculate keyframe group screen rect size that is used during the rendering.
     * @param row
     * @param rowY row screen coords y position
     */
    _getKeyframesGroupSize: (groupViewModel: TimelineGroupViewModel, rowViewModel: TimelineRowViewModel) => DOMRect;
    _getKeyframePosition: (keyframe: TimelineKeyframe, groupViewModel: TimelineGroupViewModel, rowViewModel: TimelineRowViewModel, keyframeShape: TimelineKeyframeShape) => DOMRect | null;
    _renderKeyframes: () => void;
    _renderKeyframe: (ctx: CanvasRenderingContext2D, keyframeViewModel: TimelineKeyframeViewModel) => void;
    _renderSelectionRect: () => void;
    _renderBackground: () => void;
    _renderTimeline: () => void;
    /**
     * Render timeline cap top.
     */
    _renderTimelineCap: (timeLinePos: number, y: number) => void;
    _renderHeaderBackground: () => void;
    redraw: () => void;
    /**
     * perform scroll to max right.
     */
    scrollToRightBounds: () => void;
    /**
     * Redraw parts of the component in the specific order.
     */
    _redrawInternal: () => void;
    /**
     * Find sharp pixel position
     */
    _getSharp: (pos: number, thickness?: number) => number;
    /**
     * Get current time:
     */
    getTime: () => number;
    /**
     * Set current time internal
     * @param val value.
     * @param source event source.
     */
    _setTimeInternal: (val: number, source?: TimelineEventSource) => boolean;
    setTime: (val: number) => boolean;
    getOptions: () => TimelineOptions;
    /**
     * Current scroll left position.
     */
    get scrollLeft(): number;
    set scrollLeft(value: number);
    get scrollTop(): number;
    set scrollTop(value: number);
    /**
     * Set options and render the component.
     * Note: Options will be merged\appended with the defaults and component will be invalidated/rendered again.
     */
    setOptions: (toSet: TimelineOptions) => TimelineOptions;
    /**
     * Private. Apply html container styles from options if any is set.
     */
    _applyContainersStyles: () => void;
    _setOptions: (toSet: TimelineOptions) => TimelineOptions;
    /**
     * Get current model.
     */
    getModel: () => TimelineModel | null;
    /**
     * Set model and redraw application.
     * @param data
     */
    setModel: (data: TimelineModel) => void;
    _getMousePos: (canvas: HTMLCanvasElement, e: TouchEvent | MouseEvent | any) => TimelineMouseData;
    /**
     * Apply container div size to the container on changes detected.
     */
    _updateCanvasScale: () => boolean;
    /**
     * Rescale and update size of the container.
     */
    rescale: () => boolean;
    /**
     * This method is used to draw additional space when after there are no keyframes.
     * When scrolled we should allow to indefinitely scroll right, so space should be extended to drag keyframes outside of the current size bounds.
     */
    _rescaleInternal: (newWidth?: number | null, newHeight?: number | null, scrollMode?: TimelineScrollSource) => boolean;
    /**
     * Filter elements that can be dragged.
     * Filtration is done based on the timeline styles and options.
     */
    _filterDraggableElements: (elements: TimelineElement[]) => TimelineElement[];
    /**
     * Filter and sort draggable elements by the priority to get first draggable element closest to the passed value.
     */
    _findDraggableElement: (elements: TimelineElement[], val?: number | null) => TimelineElement | null;
    /**
     * get all clickable elements by the given local screen coordinate.
     */
    elementFromPoint: (pos: DOMPoint, clickRadius: number, onlyTypes?: TimelineElementType[] | null) => TimelineElement[];
    /**
     * Subscribe user callback on time changed.
     */
    onTimeChanged: (callback: (eventArgs: TimelineTimeChangedEvent) => void) => void;
    /**
     * Subscribe user callback on drag started event.
     */
    onDragStarted: (callback: (eventArgs: TimelineDragEvent) => void) => void;
    /**
     * Subscribe user callback on drag event.
     */
    onDrag: (callback: (eventArgs: TimelineDragEvent) => void) => void;
    /**
     * Subscribe user callback on drag finished event.
     */
    onDragFinished: (callback: (eventArgs: TimelineDragEvent) => void) => void;
    /**
     * Subscribe user callback on double click.
     */
    onDoubleClick: (callback: (eventArgs: TimelineClickEvent) => void) => void;
    /**
     * Subscribe user callback on keyframe changed event.
     */
    onKeyframeChanged: (callback: (eventArgs: TimelineKeyframeChangedEvent) => void) => void;
    /**
     * Subscribe user callback on drag finished event.
     */
    onMouseDown: (callback: (eventArgs: TimelineClickEvent) => void) => void;
    /**
     * Subscribe user callback on selected.
     */
    onSelected: (callback: (eventArgs: TimelineSelectedEvent) => void) => void;
    /**
     * Subscribe user callback on scroll event
     */
    onScroll: (callback: (eventArgs: TimelineScrollEvent) => void) => void;
    /**
     * Subscribe on scroll finished event.
     */
    onScrollFinished: (callback: (eventArgs: TimelineScrollEvent) => void) => void;
    /**
     * Subscribe on canvas context menu event.
     */
    onContextMenu: (callback: (eventArgs: TimelineClickEvent) => void) => void;
    /**
     * Private.
     * Emit internally scroll eve
     */
    _emitScrollEvent: (args: Event | null, scrollProgrammatically: boolean, eventType?: TimelineEvents) => TimelineScrollEvent;
    _emitKeyframeChanged: (element: TimelineElementDragState, source?: TimelineEventSource) => TimelineKeyframeChangedEvent;
    _emitDragStartedEvent: (dragState: TimelineDraggableData) => TimelineDragEvent | null;
    /**
     * Private emit timeline event that dragging element is finished.
     * @param forcePrevent - needed when during dragging components set to the state when they cannot be dragged anymore. (used only as recovery state).
     * @returns
     */
    _emitDragFinishedEvent: (dragState: TimelineDraggableData, forcePrevent?: boolean) => TimelineDragEvent | null;
    _preventDrag: (dragArgs: TimelineDragEvent, data: TimelineDraggableData, toStart?: boolean) => void;
    _emitDragEvent: (dragState: TimelineDraggableData) => TimelineDragEvent | null;
    _emitKeyframesSelected: (state: TimelineSelectionResults) => TimelineSelectedEvent;
    _getDragEventArgs: (dragState: TimelineDraggableData, point: TimelineMouseData | null) => TimelineDragEvent;
}
