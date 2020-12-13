/* eslint-disable @typescript-eslint/no-explicit-any */
import { TimelineEventsEmitter } from './timelineEventsEmitter';
import { TimelineUtils } from './utils/timelineUtils';
import { TimelineOptions } from './settings/timelineOptions';
import { TimelineConsts } from './settings/timelineConsts';
import { TimelineKeyframe } from './timelineKeyframe';
import { TimelineModel } from './timelineModel';
import { TimelineElement } from './utils/timelineElement';
import { TimelineRow } from './timelineRow';
import { TimelineCursorType } from './enums/timelineCursorType';
import { TimelineKeyframeShape } from './enums/timelineKeyframeShape';
import { TimelineStyleUtils } from './utils/timelineStyleUtils';
import { TimelineElementType } from './enums/timelineElementType';
import { TimelineEvents } from './enums/timelineEvents';
import { TimelineCutBoundsRectResults } from './utils/timelineCutBoundsRectResults';
import { TimelineCapShape } from './enums/timelineCapShape';
import { TimelineCalculatedRow, TimelineModelCalcResults, TimelineCalculatedGroup, TimelineCalculatedKeyframe } from './utils/timelineModelCalcResults';
import { TimelineInteractionMode } from './enums/timelineInteractionMode';
import { TimelineScrollEvent } from './utils/events/timelineScrollEvent';
import { TimelineSelectedEvent } from './utils/events/timelineSelectedEvent';
import { TimelineDraggableData, TimelineElementDragState } from './utils/timelineDraggableData';
import { TimelineClickEvent } from './utils/events/timelineClickEvent';
import { TimelineDragEvent } from './utils/events/timelineDragEvent';
import { defaultTimelineConsts, defaultTimelineOptions } from './settings/defaults';
import { TimelineEventSource } from './enums/timelineEventSource';
import { TimelineTimeChangedEvent } from './utils/events/timelineTimeChangedEvent';
import { TimelineSelectionMode } from './enums/timelineSelectionMode';
import { TimelineSelectionResults } from './utils/timelineSelectionResults';
import { TimelineRanged } from './timelineRanged';
import { TimelineMouseData } from './utils/timelineMouseData';
import { TimelineKeyframeChangedEvent } from './utils/events/timelineKeyframeChangedEvent';

export class Timeline extends TimelineEventsEmitter {
  /**
   * component container.
   */
  _container: HTMLElement | null = null;
  /**
   * Dynamically generated event.
   */
  _canvas: HTMLCanvasElement | null = null;
  /**
   * Dynamically generated scroll container.
   */
  _scrollContainer: HTMLElement | null = null;
  /**
   * Dynamically generated virtual scroll content.
   */
  _scrollContent: HTMLElement | null = null;
  /**
   * Rendering context
   */
  _ctx: CanvasRenderingContext2D | null = null;
  /**
   * Components settings
   */
  _options: TimelineOptions | null = null;
  /**
   * Drag start position.
   */
  _startPos: TimelineMouseData | null = null;
  /**
   * Drag scroll started position.
   */
  _scrollStartPos: DOMPoint | null = { x: 0, y: 0 } as DOMPoint;
  _currentPos: TimelineMouseData | null = null;

  _selectionRect: DOMRect | null = null;
  _selectionRectEnabled = false;
  _drag: TimelineDraggableData | null = null;
  _startedDragWithCtrl = false;
  _startedDragWithShiftKey = false;

  _clickTimeout? = 0;
  _lastClickTime = 0;
  _lastClickPoint: DOMPoint | null = null;
  _consts: TimelineConsts = defaultTimelineConsts;
  _clickAllowed = false;
  /**
   * scroll finished timer reference.
   */
  _scrollFinishedTimerRef?: number | null = null;
  _val = 0;
  _pixelRatio = 1;
  _currentZoom = 0;
  _intervalRef?: number | null = null;
  _autoPanLastActionDate = 0;
  _isPanStarted = false;
  _interactionMode = TimelineInteractionMode.Selection;
  _lastUsedArgs: MouseEvent | TouchEvent | null = null;
  _model: TimelineModel | null = null;
  /**
   * Create Timeline instance
   * @param options Timeline settings.
   * @param model Timeline model.
   */
  constructor(options: TimelineOptions | null = null, model: TimelineModel | null = null) {
    super();
    // Allow to create instance without an error to perform tests.
    if (options || model) {
      this.initialize(options, model);
    }
  }

  /**
   * Initialize Timeline
   * @param options Timeline settings.
   * @param model Timeline model.
   */
  public initialize(options: TimelineOptions | null, model: TimelineModel | null): void {
    this._model = model;
    if (!options || !options.id) {
      throw new Error(`Element cannot be empty. Should be string or DOM element.`);
    }

    this._generateContainers(options.id);
    this._options = this._setOptions(options);
    this._subscribeOnEvents();
    this.rescale();
    this.redraw();
  }

  /**
   * Generate component html.
   * @param id container.
   */
  _generateContainers(id: string | HTMLElement): void {
    if (id instanceof HTMLElement) {
      this._container = id as HTMLElement;
    } else {
      this._container = document.getElementById(id);
    }

    if (!this._container) {
      throw new Error(`Element cannot be empty. Should be string or DOM element.`);
    }

    this._scrollContainer = document.createElement('div');
    this._scrollContent = document.createElement('div');
    this._canvas = document.createElement('canvas');

    if (!this._canvas || !this._canvas.getContext) {
      console.log('Cannot initialize canvas context.');
      return null;
    }

    this._container.style.position = 'relative';
    // Generate size container:
    this._canvas.style.cssText =
      'image-rendering: -moz-crisp-edges;' +
      'image-rendering: -webkit-crisp-edges;' +
      'image-rendering: pixelated;' +
      'image-rendering: crisp-edges;' +
      'user-select: none;' +
      '-webkit-user-select: none;' +
      '-khtml-user-select: none;' +
      '-moz-user-select: none;' +
      '-o-user-select: none;' +
      'user-select: none;' +
      'touch-action: none;' +
      'position: relative;' +
      '-webkit-user-drag: none;' +
      '-khtml-user-drag: none;' +
      '-moz-user-drag: none;' +
      '-o-user-drag: none;' +
      'user-drag: none;' +
      'padding: inherit';

    this._scrollContainer.style.cssText = 'overflow: scroll;' + 'position: absolute;' + 'width:  100%;' + 'height:  100%;';

    this._scrollContent.style.width = this._scrollContent.style.height = '100%';

    // add the text node to the created div
    this._scrollContainer.appendChild(this._scrollContent);
    this._container.appendChild(this._scrollContainer);
    const scrollBarWidth = this._scrollContainer.offsetWidth - this._scrollContent.clientWidth;
    // Calculate current browser scrollbar size and add offset for the canvas
    this._canvas.style.width = this._canvas.style.height = 'calc(100% -' + (scrollBarWidth || 17) + 'px)';

    this._container.appendChild(this._canvas);
    this._ctx = this._canvas.getContext('2d');
  }
  /**
   * Subscribe current component on the related events.
   */
  _subscribeOnEvents(): void {
    this._container.addEventListener('wheel', this._handleWheelEvent);

    if (this._scrollContainer) {
      this._scrollContainer.addEventListener('scroll', this._handleScrollEvent);
    }
    document.addEventListener('keyup', this._handleKeyUp, false);
    document.addEventListener('keydown', this._handleKeyDown, false);
    window.addEventListener('blur', this._handleBlurEvent, false);
    window.addEventListener('resize', this._handleWindowResizeEvent, false);

    this._canvas.addEventListener('touchstart', this._handleMouseDownEvent, false);
    this._canvas.addEventListener('mousedown', this._handleMouseDownEvent, false);
    window.addEventListener('mousemove', this._handleMouseMoveEvent, false);
    window.addEventListener('touchmove', this._handleMouseMoveEvent, false);
    window.addEventListener('mouseup', this._handleMouseUpEvent, false);
    window.addEventListener('touchend', this._handleMouseUpEvent, false);
  }

  public dispose(): void {
    // Unsubscribe all events
    this.offAll();
    this._container = null;
    this._canvas = null;
    this._scrollContainer = null;
    this._scrollContent = null;
    this._ctx = null;
    this._cleanUpSelection();

    this._container.removeEventListener('wheel', this._handleWheelEvent);

    if (this._scrollContainer) {
      this._scrollContainer.removeEventListener('scroll', this._handleScrollEvent);
    }

    window.removeEventListener('blur', this._handleBlurEvent);
    window.removeEventListener('resize', this._handleWindowResizeEvent);
    document.removeEventListener('keydown', this._handleKeyDown);
    document.removeEventListener('keyup', this._handleKeyUp);
    this._canvas.removeEventListener('touchstart', this._handleMouseDownEvent);
    this._canvas.removeEventListener('mousedown', this._handleMouseDownEvent);
    window.removeEventListener('mousemove', this._handleMouseMoveEvent);
    window.removeEventListener('touchmove', this._handleMouseMoveEvent);
    window.removeEventListener('mouseup', this._handleMouseUpEvent);
    window.removeEventListener('touchend', this._handleMouseUpEvent);
    // Stop times
    this._stopAutoPan();
    this._clearScrollFinishedTimer();
  }
  _handleKeyUp = (event: KeyboardEvent): void => {
    if (this._interactionMode === TimelineInteractionMode.Zoom) {
      this._setZoomCursor(event);
    }
  };
  _handleKeyDown = (event: KeyboardEvent): void => {
    if (this._interactionMode === TimelineInteractionMode.Zoom) {
      this._setZoomCursor(event);
    }
  };
  _setZoomCursor(e: MouseEvent | KeyboardEvent): void {
    if (this._controlKeyPressed(e)) {
      this._setCursor(TimelineCursorType.ZoomOut);
    } else {
      this._setCursor(TimelineCursorType.ZoomIn);
    }
  }
  _handleBlurEvent = (): void => {
    this._cleanUpSelection();
  };
  _handleWindowResizeEvent = (): void => {
    // Rescale and redraw
    this.rescale();
    this.redraw();
  };

  _clearScrollFinishedTimer(): void {
    if (this._scrollFinishedTimerRef) {
      clearTimeout(this._scrollFinishedTimerRef);
      this._scrollFinishedTimerRef = null;
    }
  }
  _handleScrollEvent = (args: MouseEvent): void => {
    this._clearScrollFinishedTimer();
    // Set a timeout to run event 'scrolling end'.
    this._scrollFinishedTimerRef = window.setTimeout(() => {
      if (!this._isPanStarted) {
        if (this._scrollFinishedTimerRef) {
          clearTimeout(this._scrollFinishedTimerRef);
          this._scrollFinishedTimerRef = null;
        }

        this.rescale();
        this.redraw();
      }
    }, this._consts.scrollFinishedTimeoutMs);

    this.redraw();
    this._emitScrollEvent(args);
  };
  _controlKeyPressed(e: MouseEvent | KeyboardEvent | TouchEvent): boolean {
    if (!this._options || this._options.controlKeyIsMetaKey === undefined) {
      return e.metaKey || e.ctrlKey;
    }
    return this._options.controlKeyIsMetaKey || this._options.controlKeyIsMetaKey ? e.metaKey : e.ctrlKey;
  }
  _handleWheelEvent = (event: WheelEvent): void => {
    if (this._controlKeyPressed(event)) {
      event.preventDefault();
      const mousePos = Math.max(0, this._getMousePos(this._canvas, event).x || 0);
      this._zoom(TimelineUtils.sign(event.deltaY), this._options.zoomSpeed, mousePos);
    } else {
      this._scrollContainer.scrollTop += event.deltaY;
      event.preventDefault();
    }
  };
  _zoom(direction: number, speed: number, x: number): void {
    if (speed > 0 && speed <= 1) {
      const deltaSpeed = TimelineUtils.getDistance(this._width() / 2, x) * 0.2;
      x = x + deltaSpeed;
      const diff = this._width() / x;
      const val = this._fromScreen(x);
      const zoom = direction * this._currentZoom * speed;
      //this._options.zoom
      this._currentZoom = this._setZoom(this._currentZoom + zoom);
      // Get only after zoom is set
      const zoomCenter = this.valToPx(val);
      let newScrollLeft = Math.round(zoomCenter - this._width() / diff);
      if (newScrollLeft <= 0) {
        newScrollLeft = 0;
      }

      this._rescaleInternal(newScrollLeft + this._width(), null, 'zoom');
      if (this._scrollContainer.scrollLeft != newScrollLeft) {
        // Scroll event will redraw the screen.
        this._scrollContainer.scrollLeft = newScrollLeft;
      }

      this.redraw();
    }
  }
  /**
   * Zoom in
   * @param speed value from 0 to 1
   */
  public zoomIn(speed = this._options.zoomSpeed): void {
    this._zoom(1, speed, this._scrollContainer.clientWidth / 2);
  }
  /**
   * Zoom out.
   * @param speed value from 0 to 1
   */
  public zoomOut(speed = this._options.zoomSpeed): void {
    this._zoom(-1, speed, this._scrollContainer.clientWidth / 2);
  }
  /**
   * Set direct zoom value.
   * @param zoom zoom value to set. percent 0-1 and etc.
   * @param min min zoom.
   * @param max max zoom.
   * @return normalized value.
   */
  _setZoom(zoom: number, min: number | undefined = null, max: number | undefined = null): number {
    min = TimelineUtils.isNumber(min) ? min : this._options ? this._options.zoomMin : null;
    max = TimelineUtils.isNumber(max) ? max : this._options ? this._options.zoomMax : null;
    if (TimelineUtils.isNumber(zoom)) {
      zoom = TimelineUtils.keepInBounds(zoom, min, max);
      zoom = zoom || 1;
      this._currentZoom = zoom;
      return zoom;
    }

    return zoom;
  }

  /**
   * Set direct zoom value.
   * @public
   * @param zoom zoom value to set. percent 0-1 and etc.
   * @return normalized value.
   */
  setZoom(zoom: number): number {
    const prevZoom = this.getZoom();
    if (prevZoom !== zoom) {
      const zoomSet = this._setZoom(zoom);
      if (prevZoom != zoomSet) {
        this.rescale();
        this.redraw();
        return zoomSet;
      }
    }
    return prevZoom;
  }
  /**
   * Get current zoom level.
   */
  getZoom(): number {
    if (TimelineUtils.isNumber(this._currentZoom)) {
      return this._currentZoom || 1;
    }
    return 1;
  }
  /**
   * @param args
   */
  _handleMouseDownEvent = (args: MouseEvent): void => {
    let isDoubleClick = Date.now() - this._lastClickTime < this._consts.doubleClickTimeoutMs;
    // Prevent drag of the canvas if canvas is selected as text:
    TimelineUtils.clearBrowserSelection();

    this._startPos = this._trackMousePos(this._canvas, args);

    if (!this._startPos) {
      return;
    }

    // Don't allow to perform double click if mouse was moved to far.
    if (this._lastClickPoint && this._startPos && TimelineUtils.getDistance(this._lastClickPoint.x, this._lastClickPoint.y, this._startPos.x, this._startPos.y) > this._consts.clickThreshold) {
      isDoubleClick = false;
    }

    this._lastClickPoint = this._startPos;
    this._scrollStartPos = {
      x: this._scrollContainer.scrollLeft,
      y: this._scrollContainer.scrollTop,
    } as DOMPoint;
    this._clickAllowed = true;
    const elements = this.elementFromPoint(this._startPos, Math.max(2, this._startPos.radius));
    const target = this._findDraggable(elements, this._startPos.val);
    const event = new TimelineClickEvent();
    event.pos = this._startPos;
    event.val = this._startPos.val;
    event.originalVal = this._startPos.originalVal;
    event.snapVal = this._startPos.snapVal;
    event.args = args;
    // all elements under the click:
    event.elements = elements;
    // target element.
    event.target = target;

    if (isDoubleClick) {
      super.emit(TimelineEvents.DoubleClick, event);
      return;
    }

    super.emit(TimelineEvents.MouseDown, event);

    this._clickTimeout = Date.now();
    this._lastClickTime = Date.now();
    if (event.isPrevented()) {
      // Mouse up will be also prevented
      this._cleanUpSelection();
      return;
    }

    this._currentPos = this._startPos;

    // Select keyframes on mouse down
    if (target && this._interactionMode !== TimelineInteractionMode.Zoom) {
      this._drag = {
        changed: false,
        target: this._setElementDragState(target, target.val),
        val: target.val,
        type: target.type,
        elements: [],
      } as TimelineDraggableData;

      if (target.type === TimelineElementType.Keyframe) {
        this._startedDragWithCtrl = this._controlKeyPressed(args);
        this._startedDragWithShiftKey = args.shiftKey;
        // get all related selected keyframes if we are selecting one.
        if (!target.keyframe.selected && !this._controlKeyPressed(args)) {
          this._selectInternal(target.keyframe);
        }
        // Allow to drag all selected keyframes on a screen
        this._drag.elements = this.getSelectedElements().map((element) => {
          return this._setElementDragState(element, element.val);
        });
      } else if (target.type === TimelineElementType.Group) {
        const keyframes = this._drag.target.keyframes;

        if (keyframes && Array.isArray(keyframes)) {
          this._drag.elements = keyframes.map((keyframe) => {
            return this._setElementDragState(this._convertToElement(this._drag.target.row, keyframe), keyframe.val);
          });
        }
      } else {
        this._drag.elements = [this._drag.target];
      }
    }

    this.redraw();
  };
  _setElementDragState(element: TimelineElement | TimelineElementDragState, val: number): TimelineElementDragState {
    const state = element as TimelineElementDragState;
    state.prevVal = state.val;
    if (state.startedVal === undefined || state.startedVal === null) {
      state.startedVal = val;
    }
    if (state.prevVal === undefined || state.prevVal === null) {
      state.prevVal = val;
    }
    state.val = val;
    return state;
  }
  isLeftButtonClicked(args: MouseEvent | TouchEvent | any): boolean {
    return !!args && args.buttons == 1;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _handleMouseMoveEvent = (args: MouseEvent | TouchEvent | any): void => {
    if (!args) {
      args = this._lastUsedArgs;
    } else {
      this._lastUsedArgs = args;
    }
    if (!args) {
      return;
    }
    const isTouch = args.changedTouches && args.changedTouches.length > 0;
    this._currentPos = this._trackMousePos(this._canvas, args);
    if (!this._isPanStarted && this._selectionRect && this._clickTimeoutIsOver()) {
      // TODO: implement selection by rect
      this._selectionRectEnabled = this._interactionMode !== TimelineInteractionMode.Zoom;
    } else {
      this._selectionRectEnabled = false;
    }

    args = args as MouseEvent;
    const isLeftClicked = this.isLeftButtonClicked(args);
    if (this._startPos) {
      if (isLeftClicked || isTouch) {
        if (this._drag && !this._startedDragWithCtrl) {
          const convertedVal = this._currentPos.val;
          if (this._drag.type === TimelineElementType.Timeline) {
            this._setTimeInternal(convertedVal, TimelineEventSource.User);
          } else if ((this._drag.type == TimelineElementType.Keyframe || this._drag.type == TimelineElementType.Group) && this._drag.elements) {
            const offset = Math.floor(convertedVal - this._drag.val);
            const movedOffset = this._moveElements(offset, this._drag.elements, TimelineEventSource.User);
            if (movedOffset !== 0) {
              if (!this._drag.changed) {
                this._drag.prevVal = this._drag.val;
                const eventArgs = this._emitDragStartedEvent();
                if (eventArgs.isPrevented()) {
                  // Cleanup drag here, so drag finished will be ignored.
                  this._drag = null;
                  this._cleanUpSelection();
                  return;
                }
              }

              this._drag.changed = true;
              this._drag.val += offset;
              this._emitDragEvent();
            }
          }
        }

        if (this._interactionMode === TimelineInteractionMode.Pan && !this._drag) {
          this._isPanStarted = true;
          this._setCursor(TimelineCursorType.Grabbing);
          // Track scroll by drag.
          this._scrollByPan(this._startPos, this._currentPos, this._scrollStartPos);
        } else {
          // Track scroll by mouse or touch out of the area.
          this._scrollBySelectionOutOfBounds(this._currentPos);
        }

        this.redraw();
      } else {
        // Fallback. Cancel mouse move when focus was lost and mouse down is still counted.
        this._cleanUpSelection();
        this.redraw();
      }
    } else if (!isTouch) {
      const elements = this.elementFromPoint(this._currentPos, Math.max(2, this._currentPos.radius));
      const target = this._findDraggable(elements, this._currentPos.val);
      if (this._isPanStarted || this._interactionMode === TimelineInteractionMode.Pan) {
        if (isLeftClicked) {
          this._setCursor(TimelineCursorType.Grabbing);
        } else {
          this._setCursor(TimelineCursorType.Grab);
        }
      } else {
        if (this._interactionMode === TimelineInteractionMode.Zoom) {
          this._setZoomCursor(args);
          return;
        } else {
          this._setCursor(TimelineCursorType.Default);
        }
      }

      if (target) {
        let cursor: TimelineCursorType | null = null;
        if (target.type === TimelineElementType.Group) {
          cursor = cursor || TimelineCursorType.EWResize;
        } else if (target.type == TimelineElementType.Keyframe) {
          cursor = cursor || TimelineCursorType.Pointer;
        } else if (target.type == TimelineElementType.Timeline) {
          cursor = cursor || TimelineCursorType.EWResize;
        }

        if (cursor) {
          this._setCursor(cursor);
        }
      }
    }

    if (isTouch) {
      args.preventDefault();
    }
  };

  /**
   * Move elements
   * @param offset vector to move elements along.
   * @param elements Element to move.
   * @returns real moved value.
   */
  _moveElements(offset: number, elements: Array<TimelineElementDragState>, source: TimelineEventSource = TimelineEventSource.Programmatically): number {
    if (!elements) {
      return;
    }
    let isChanged = false;
    if (Math.abs(offset) > 0) {
      // Find drag min and max bounds:
      let bounds = { min: Number.MIN_SAFE_INTEGER, max: Number.MAX_SAFE_INTEGER } as TimelineRanged;
      bounds = TimelineUtils.setMinMax(bounds, this._options);
      elements.forEach((p) => {
        // find allowed bounds for the draggable items.
        // find for each row and keyframe separately.
        const currentBounds = TimelineUtils.setMinMax(TimelineUtils.setMinMax({ min: bounds.min, max: bounds.max }, p.keyframe), p.row);
        const expectedKeyframeValue = this._options && this._options.snapAllKeyframesOnMove ? this.snapVal(p.keyframe.val) : p.keyframe.val;
        const newPosition = expectedKeyframeValue + offset;
        if (TimelineUtils.isNumber(currentBounds.min) && newPosition < currentBounds.min) {
          // Return to the bounds:
          offset = offset + TimelineUtils.getDistance(currentBounds.min, newPosition);
        }
        if (TimelineUtils.isNumber(currentBounds.max) && newPosition > currentBounds.max) {
          // Return to the bounds:
          offset = offset - TimelineUtils.getDistance(currentBounds.max, newPosition);
        }
      });

      if (Math.abs(offset) > 0) {
        // don't allow to move less than zero.
        elements.forEach((element) => {
          const prevVal = element.keyframe.val;
          const toSet = prevVal + offset;
          const newValue = this._setKeyframePos(element, toSet, source);
          isChanged = newValue !== prevVal;
        });
      }

      if (isChanged) {
        return offset;
      }
    }

    return 0;
  }
  _handleMouseUpEvent = (args: MouseEvent): void => {
    if (this._startPos) {
      //window.releaseCapture();
      const pos = this._trackMousePos(this._canvas, args);

      // Click detection.
      if (this._clickAllowed || !this._clickTimeoutIsOver() || (this._drag && (this._startedDragWithCtrl || this._startedDragWithShiftKey))) {
        if (this._options && this._interactionMode === TimelineInteractionMode.Zoom) {
          const direction = this._controlKeyPressed(args) ? 1 : -1;
          const mousePos = Math.max(0, this._getMousePos(this._canvas, args).x || 0);
          this._zoom(direction, this._options.zoomSpeed, mousePos);
        } else {
          this._performClick(pos, this._drag);
        }
      } else if (!this._drag && this._selectionRect && this._selectionRectEnabled) {
        if (this._interactionMode === TimelineInteractionMode.Zoom) {
          if (this._selectionRect.width > 20) {
            // TODO: implement zoom by screen rect.
          }
        } else {
          const keyframes = this._getKeyframesByRectangle(this._selectionRect);
          const selectionMode = args.shiftKey ? TimelineSelectionMode.Append : TimelineSelectionMode.Normal;
          this.select(keyframes, selectionMode);
        }
      }

      this._cleanUpSelection();
      this.redraw();
    }
  };

  /**
   * client height.
   */
  _height(): number {
    if (this._canvas) {
      return this._canvas.clientHeight;
    }
    return 0;
  }

  /**
   * Client width;
   */
  _width(): number {
    if (this._canvas) {
      return this._canvas.clientWidth;
    }
    return 0;
  }
  /**
   * Convert virtual calculation results to keyframes
   */
  _mapKeyframes(array: Array<TimelineCalculatedKeyframe | TimelineElement>): Array<TimelineKeyframe> {
    const results: Array<TimelineKeyframe> = [];
    if (!array) {
      return results;
    }

    for (let i = 0; i < array.length; i++) {
      results.push((array[i] as TimelineCalculatedKeyframe).model || (array[i] as TimelineElement).keyframe);
    }
    return results;
  }
  /**
   * Get all keyframes under the screen rectangle.
   * @param screenRect screen coordinates to get keyframes.
   */
  _getKeyframesByRectangle(screenRect: DOMRect): TimelineKeyframe[] {
    const keyframesModels: Array<TimelineKeyframe> = [];
    this._forEachKeyframe((calcKeyframe) => {
      if (TimelineUtils.isOverlap(calcKeyframe.size.x, calcKeyframe.size.y, screenRect)) {
        keyframesModels.push(calcKeyframe.model);
      }
    });
    return keyframesModels;
  }

  _performClick(pos: TimelineMouseData, drag: TimelineDraggableData): boolean {
    let isChanged = false;
    if (drag && drag.type === TimelineElementType.Keyframe) {
      let mode = TimelineSelectionMode.Normal;
      if ((this._startedDragWithCtrl && this._controlKeyPressed(pos.args)) || (this._startedDragWithShiftKey && pos.args.shiftKey)) {
        if (this._controlKeyPressed(pos.args)) {
          mode = TimelineSelectionMode.Revert;
        }
      }
      // Reverse selected keyframe selection by a click:
      isChanged = this._selectInternal(this._drag.target.keyframe, mode).selectionChanged || isChanged;

      if (pos.args.shiftKey) {
        // Set current timeline position if it's not a drag or selection rect small or fast click.
        isChanged = this._setTimeInternal(pos.val, TimelineEventSource.User) || isChanged;
      }
    } else {
      // deselect keyframes if any:
      isChanged = this._selectInternal(null).selectionChanged || isChanged;

      // change timeline pos:
      // Set current timeline position if it's not a drag or selection rect small or fast click.
      isChanged = this._setTimeInternal(pos.val, TimelineEventSource.User) || isChanged;
    }

    return isChanged;
  }
  /**
   * Set keyframe value.
   * @param keyframe
   * @param value
   * @return set value.
   */
  _setKeyframePos(element: TimelineElementDragState, value: number, source: TimelineEventSource = TimelineEventSource.Programmatically): number {
    if (!element || !element.keyframe) {
      return value;
    }
    value = Math.floor(value);
    if (element.keyframe && element.keyframe.val != value) {
      element.prevVal = element.val;
      element.val = value;
      element.keyframe.val = value;
      const event = this._emitKeyframeChanged(element, source);
      if (event.isPrevented()) {
        element.val = event.prevVal;
        element.keyframe.val = event.prevVal;
      }

      return value;
    }

    return value;
  }

  /**
   * @param cursor to set.
   */
  _setCursor(cursor: string): void {
    if (this._canvas.style.cursor != cursor) {
      this._canvas.style.cursor = cursor;
    }
  }

  /**
   * Set pan mode
   * @param isPan
   */
  public setInteractionMode(mode: TimelineInteractionMode): void {
    if (this._interactionMode != mode) {
      this._interactionMode = mode;
      // Avoid any conflicts with other modes:
      this._cleanUpSelection();
    }
  }
  /**
   * Get current interaction mode.
   */
  public getInteractionMode(): TimelineInteractionMode {
    return this._interactionMode;
  }
  _convertToElement(row: TimelineRow, keyframe: TimelineKeyframe): TimelineElement {
    const data = {
      type: TimelineElementType.Keyframe,
      val: keyframe.val,
      keyframe: keyframe,
      row: row,
    } as TimelineElement;
    return data;
  }

  public getSelectedKeyframes(): Array<TimelineKeyframe> {
    return this._mapKeyframes(this.getSelectedElements());
  }

  public getSelectedElements(): Array<TimelineElement> {
    const selected: Array<TimelineElement> = [];
    this._forEachKeyframe((keyframe): void => {
      if (keyframe && keyframe.model.selected) {
        selected.push(this._convertToElement(keyframe.parentRow.model, keyframe.model));
      }
      return;
    });

    return selected;
  }
  public getAllKeyframes(): Array<TimelineKeyframe> {
    const selected: Array<TimelineKeyframe> = [];
    this._forEachKeyframe((keyframe): void => {
      selected.push(keyframe.model);
    });

    return selected;
  }

  public selectAllKeyframes(): TimelineSelectionResults {
    return this.select(this.getAllKeyframes(), TimelineSelectionMode.Normal);
  }
  public deselectAll(): TimelineSelectionResults {
    return this.select(null);
  }

  private _changeNodeState(state: TimelineSelectionResults, node: TimelineKeyframe, value: boolean): boolean {
    if (node.selected !== value) {
      const selectable = typeof node.selectable === 'boolean' ? node.selectable : true;
      if (!value || (value && selectable)) {
        node.selected = value;
        state.changed.push(node);
        return true;
      }
    }

    return false;
  }

  public select(nodes: TimelineKeyframe[] | TimelineKeyframe | null, mode = TimelineSelectionMode.Normal): TimelineSelectionResults {
    const results = this._selectInternal(nodes, mode);
    if (results.selectionChanged) {
      this.redraw();
    }
    return results;
  }

  /**
   * Select keyframes
   * @param nodes keyframe or list of the keyframes to be selected.
   * @param mode selection mode.
   */
  public _selectInternal(nodes: TimelineKeyframe[] | TimelineKeyframe | null, mode = TimelineSelectionMode.Normal): TimelineSelectionResults {
    if (!nodes) {
      nodes = [];
    }
    if (!Array.isArray(nodes)) {
      nodes = [nodes];
    }

    const state = {
      selectionChanged: false,
      selected: this.getSelectedKeyframes(),
      changed: [] as Array<any>,
    } as TimelineSelectionResults;
    const nodesArray = nodes as TimelineKeyframe[];
    //const state = this.selectedSubject.getValue();
    this.getSelectedElements();
    if (nodesArray && mode === TimelineSelectionMode.Append) {
      nodes.forEach((node) => {
        const changed = this._changeNodeState(state, node, true);
        if (changed && node.selected) {
          state.selected.push(node);
        }
      });
    } else if (nodesArray && mode === TimelineSelectionMode.Revert) {
      nodes.forEach((node) => {
        if (state.selected.indexOf(node) >= 0) {
          this._changeNodeState(state, node, false);
          TimelineUtils.deleteElement<TimelineKeyframe>(state.selected, node);
        } else {
          this._changeNodeState(state, node, true);
          if (node.selected) {
            state.selected.push(node);
          }
        }
      });
    } else if (mode === TimelineSelectionMode.Normal) {
      const selectedItems: Array<TimelineKeyframe> = [];
      if (nodes) {
        nodes.forEach((node) => {
          this._changeNodeState(state, node, true);
          if (node.selected) {
            selectedItems.push(node);
          }
        });
      }

      state.selected.forEach((node) => {
        const exists = nodesArray.indexOf(node) >= 0;
        // Deselect
        if (!exists) {
          this._changeNodeState(state, node, false);
        }
      });

      if (state.changed.length > 0) {
        if (selectedItems) {
          state.selected = selectedItems;
        } else {
          state.selected.length = 0;
        }
      }
    }

    if (state.changed.length > 0) {
      state.selectionChanged = true;
      this._emitKeyframesSelected(state);
    }

    return state;
  }

  /**
   * foreach visible keyframe.
   */
  _forEachKeyframe(callback: (keyframe: TimelineCalculatedKeyframe, index?: number, newRow?: boolean) => void): void {
    if (!callback) {
      return;
    }
    if (!this._model) {
      return;
    }

    const calculatedModel = this._calculateModel();
    if (!calculatedModel) {
      return;
    }

    calculatedModel.rows.forEach((calcRow) => {
      if (!calcRow) {
        return;
      }

      let nextRow = true;
      calcRow.keyframes.forEach((keyframe, keyframeIndex) => {
        if (keyframe) {
          callback(keyframe, keyframeIndex, nextRow);
        }

        nextRow = false;
      });
    });
  }

  _trackMousePos(canvas: HTMLCanvasElement, mouseArgs: MouseEvent | TouchEvent): TimelineMouseData {
    const pos = this._getMousePos(canvas, mouseArgs) as TimelineMouseData;
    pos.originalVal = this._mousePosToVal(pos.x, false);
    pos.snapVal = this._mousePosToVal(pos.x, true);
    pos.val = pos.originalVal;
    if (this._options && this._options.snapEnabled) {
      pos.val = pos.snapVal;
    }

    if (this._startPos) {
      if (!this._selectionRect) {
        this._selectionRect = {} as DOMRect;
      }

      // get the pos with the virtualization:
      const x = Math.floor(this._startPos.x + (this._scrollStartPos.x - this.getScrollLeft()));
      const y = Math.floor(this._startPos.y + (this._scrollStartPos.y - this.getScrollTop()));
      this._selectionRect.x = Math.min(x, pos.x);
      this._selectionRect.y = Math.min(y, pos.y);
      this._selectionRect.width = Math.max(x, pos.x) - this._selectionRect.x;
      this._selectionRect.height = Math.max(y, pos.y) - this._selectionRect.y;
      // Once mouse was moved outside of the bounds it's not a click anymore
      if (this._clickAllowed) {
        this._clickAllowed = this._selectionRect.height <= this._consts.clickThreshold && this._selectionRect.width <= this._consts.clickThreshold;
      }
    }

    return pos;
  }

  _cleanUpSelection(): void {
    this._emitDragFinishedEvent();
    this._startPos = null;
    this._drag = null;
    this._startedDragWithCtrl = false;
    this._startedDragWithShiftKey = false;
    this._selectionRect = null;
    this._clickTimeout = null;
    this._scrollStartPos = null;
    this._isPanStarted = false;
    this._clickAllowed = false;
    this._stopAutoPan();
  }

  /**
   * Check whether click timeout is over.
   */
  _clickTimeoutIsOver(): boolean {
    // Duration before the selection can be tracked.
    if (this._clickTimeout && Date.now() - this._clickTimeout > this._consts.clickDetectionMs) {
      return true;
    }

    return false;
  }

  /**
   * Automatically pan. Scroll canvas when selection is made and mouse outside of the bounds.
   */
  _startAutoPan(): void {
    if (this._consts.autoPanSpeed) {
      if (!this._intervalRef) {
        // Repeat move calls to
        this._intervalRef = window.setInterval(() => {
          this._handleMouseMoveEvent(null);
        }, this._consts.autoPanSpeed);
      }
    }
  }

  /**
   * Stop current running auto pan
   */
  _stopAutoPan(): void {
    if (this._intervalRef) {
      clearInterval(this._intervalRef);
      this._intervalRef = null;
    }

    this._autoPanLastActionDate = null;
  }

  /**
   * Check whether auto pan should be slowed down a bit.
   */
  _checkUpdateSpeedTooFast(): boolean {
    // Slow down updated a bit.
    if (this._autoPanLastActionDate && Date.now() - this._autoPanLastActionDate <= 10) {
      return true;
    }

    this._autoPanLastActionDate = Date.now();
    return false;
  }

  _scrollByPan(start: TimelineMouseData, pos: TimelineMouseData, scrollStartPos: DOMPoint): void {
    if (!start || !pos) {
      return;
    }

    const offsetX = Math.round(start.x - pos.x);
    const newLeft = scrollStartPos.x + offsetX;

    if (offsetX > 0) {
      this._rescaleInternal(newLeft + this._width());
    }

    if (offsetX > 0 && newLeft + this._width() >= this._scrollContainer.scrollWidth - 5) {
      this._scrollContainer.scrollLeft = this._scrollContainer.scrollWidth;
    } else {
      this._scrollContainer.scrollLeft = newLeft;
    }
    this._scrollContainer.scrollTop = Math.round(scrollStartPos.y + start.y - pos.y);
  }

  _scrollBySelectionOutOfBounds(pos: DOMPoint): boolean {
    const x = pos.x;
    const y = pos.y;
    let isChanged = false;
    let speedX = 0;
    let speedY = 0;
    // Small offset to start auto pan earlier.
    const bounds = this._consts.autoPanByScrollPadding;
    const isLeft = x <= bounds;
    const isRight = x >= this._width() - bounds;
    const isTop = y <= bounds;
    const isBottom = y >= this._height() - bounds;
    let newWidth = null;
    let newHeight = null;
    if (isLeft || isRight || isTop || isBottom) {
      // Auto move init
      this._startAutoPan();

      if (this._checkUpdateSpeedTooFast()) {
        return false;
      }

      const scrollSpeedMultiplier = isNaN(this._consts.scrollByDragSpeed) ? 1 : this._consts.scrollByDragSpeed;
      if (isLeft) {
        // Get normalized speed.
        speedX = -TimelineUtils.getDistance(x, bounds) * scrollSpeedMultiplier;
      } else if (isRight) {
        // Get normalized speed:
        speedX = TimelineUtils.getDistance(x, this._width() - bounds) * scrollSpeedMultiplier;
        newWidth = this.getScrollLeft() + this._width() + speedX;
      }

      if (isTop) {
        // Get normalized speed.
        speedY = (-TimelineUtils.getDistance(x, bounds) * scrollSpeedMultiplier) / 4;
      } else if (isBottom) {
        // Get normalized speed:
        speedY = (TimelineUtils.getDistance(x, this._height() - bounds) * scrollSpeedMultiplier) / 4;
        newHeight = this._scrollContainer.scrollTop + this._height();
      }
    } else {
      this._stopAutoPan();
    }

    if (newWidth || newHeight) {
      this._rescaleInternal(newWidth, newHeight, 'scrollBySelection');
    }

    if (Math.abs(speedX) > 0) {
      this._scrollContainer.scrollLeft += speedX;
      isChanged = true;
    }

    if (Math.abs(speedY) > 0) {
      this._scrollContainer.scrollTop += speedY;
      isChanged = true;
    }

    return isChanged;
  }

  /**
   * Convert screen pixel to value.
   */
  public pxToVal(px: number): number {
    if (!this._options) {
      return px;
    }
    let min = this._options.min;
    if (!TimelineUtils.isNumber(min)) {
      min = 0;
    }
    min *= this._currentZoom || 1;
    const steps = this._options.stepVal * this._currentZoom || 1;
    const val = min + (px / this._options.stepPx) * steps;
    return val;
  }

  /**
   * Convert value to local screen component coordinates.
   */
  _toScreenPx(val: number): number {
    return this.valToPx(val) - this.getScrollLeft() + this._leftMargin();
  }
  /**
   * Convert screen local coordinates to a global value info.
   */
  _fromScreen(px: number): number {
    return this.pxToVal(this.getScrollLeft() + px - this._leftMargin());
  }
  /**
   * Convert area value to global screen pixel coordinates.
   */
  public valToPx(val: number): number {
    if (!this._options) {
      return val;
    }
    let min = this._options.min;
    if (!TimelineUtils.isNumber(min)) {
      min = 0;
    }
    min *= this._currentZoom || 1;
    const steps = this._options.stepVal * this._currentZoom || 1;
    return (-min + val) * (this._options.stepPx / steps);
  }

  /**
   * Snap a value to a nearest grid point.
   */
  public snapVal(val: number): number {
    // Snap a value if configured.
    if (this._options && this._options.snapEnabled && this._options.snapStep) {
      const stops = this._options.snapStep;
      const step = val / stops;
      const stepsFit = Math.round(step);
      const minSteps = Math.abs(this._options.min) / this._options.snapStep;
      const minOffset = TimelineUtils.sign(this._options.min) * (minSteps - Math.floor(minSteps)) * this._options.snapStep;
      val = Math.round(minOffset) + Math.round(stepsFit * stops);
    }

    val = TimelineUtils.keepInBounds(val, this._options.min, this._options.max);
    return val;
  }

  _mousePosToVal(x: number, snapEnabled = false): number {
    const mousePos = Math.min(x, this._width());
    let convertedVal = this._fromScreen(mousePos);
    convertedVal = Math.round(convertedVal);
    if (snapEnabled) {
      convertedVal = this.snapVal(convertedVal);
    }

    return convertedVal;
  }

  /**
   * Format line gauge text.
   * Default formatting is HMS
   * @param ms milliseconds to convert.
   * @param isSeconds whether seconds are passed.
   */
  _formatUnitsText(ms: number, isSeconds = false): string {
    const sign = TimelineUtils.sign(ms) < 0 ? '-' : '';
    ms = Math.abs(ms);
    // 1- Convert to seconds:
    let seconds = ms / 1000;
    if (isSeconds) {
      seconds = ms;
    }

    const year = Math.floor(seconds / (365 * 86400));
    seconds = seconds % (365 * 86400);

    const days = Math.floor(seconds / 86400);
    seconds = seconds % 86400;

    // 2- Extract hours:
    const hours = Math.floor(seconds / 3600); // 3,600 seconds in 1 hour
    seconds = seconds % 3600; // seconds remaining after extracting hours
    // 3- Extract minutes:
    const minutes = Math.floor(seconds / 60); // 60 seconds in 1 minute
    // 4- Keep only seconds not extracted to minutes:
    seconds = seconds % 60;
    let str = '';
    if (year) {
      str += year + ':';
    }

    if (days) {
      str += days + ':';
    }

    if (hours) {
      str += hours + ':';
    }

    if (minutes) {
      str += minutes + ':';
    }

    if (!isNaN(seconds)) {
      str += seconds;
    }

    return sign + str;
  }
  /**
   * Left padding of the timeline.
   */
  _leftMargin(): number {
    if (!this._options) {
      return 0;
    }
    return this._options.leftMargin || 0;
  }
  _renderTicks(): void {
    const rulerActive = !!this._ctx && !!this._options && !!this._ctx.canvas && this._ctx.canvas.clientWidth > 0 && this._ctx.canvas.clientHeight > 0 && this._options.stepPx;
    if (!rulerActive) {
      return;
    }
    const screenWidth = this._width() - this._leftMargin();
    let from = this.pxToVal(this.getScrollLeft());
    let to = this.pxToVal(this.getScrollLeft() + screenWidth);
    if (isNaN(from) || isNaN(to) || from === to) {
      return;
    }

    if (to < from) {
      const wasToVal = to;
      to = from;
      from = wasToVal;
    }

    const valDistance = TimelineUtils.getDistance(from, to);
    if (valDistance <= 0) {
      return;
    }

    // Find the nearest 'beautiful' step for a gauge.
    // 'beautiful' step should be dividable by 1/2/5/10!
    const step = TimelineUtils.findGoodStep(valDistance / (screenWidth / this._options.stepPx));
    const smallStep = TimelineUtils.findGoodStep(valDistance / (screenWidth / this._options.stepSmallPx));

    // Find beautiful start point:
    const fromVal = Math.floor(from / step) * step;

    // Find a beautiful end point:
    const toVal = Math.ceil(to / step) * step + step;

    if (!TimelineUtils.isNumber(step) || step <= 0 || Math.abs(toVal - fromVal) === 0) {
      return;
    }

    let lastTextStart = 0;
    this._ctx.save();
    const headerHeight = TimelineStyleUtils.headerHeight(this._options);
    const tickHeight = headerHeight / 2;
    const smallTickHeight = headerHeight / 1.3;
    for (let i = fromVal; i <= toVal; i += step) {
      // local
      const sharpPos = this._getSharp(this._toScreenPx(i));
      this._ctx.save();
      this._ctx.beginPath();
      this._ctx.setLineDash([4]);
      this._ctx.lineWidth = 1;
      this._ctx.strokeStyle = this._options.tickColor;
      TimelineUtils.drawLine(this._ctx, sharpPos, tickHeight, sharpPos, headerHeight);
      this._ctx.stroke();

      this._ctx.fillStyle = this._options.labelsColor;
      if (this._options.font) {
        this._ctx.font = this._options.font;
      }

      const text = this._formatUnitsText(i);
      const textSize = this._ctx.measureText(text);

      const textX = sharpPos - textSize.width / 2;
      // skip text render if there is no space for it.
      if (isNaN(lastTextStart) || lastTextStart <= textX) {
        lastTextStart = textX + textSize.width;
        this._ctx.fillText(text, textX, 10);
      }

      this._ctx.restore();
      if (!TimelineUtils.isNumber(smallStep) || smallStep <= 0) {
        continue;
      }
      // Draw small steps
      for (let x = i + smallStep; x < i + step; x += smallStep) {
        // local
        const nextSharpPos = this._getSharp(this._toScreenPx(x));
        this._ctx.beginPath();
        this._ctx.lineWidth = this._pixelRatio;
        this._ctx.strokeStyle = this._options.tickColor;
        TimelineUtils.drawLine(this._ctx, nextSharpPos, smallTickHeight, nextSharpPos, headerHeight);
        this._ctx.stroke();
      }
    }

    this._ctx.restore();
  }

  /**
   * calculate virtual mode. Determine screen positions for the elements.
   */
  _calculateModel(): TimelineModelCalcResults {
    const toReturn = {
      rows: [],
      size: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      } as DOMRect,
      min: null,
      max: null,
      keyframes: [] as Array<TimelineCalculatedKeyframe>,
    } as TimelineModelCalcResults;

    if (!this._model) {
      return toReturn;
    }
    const rows = this._model.rows;
    if (!rows || !Array.isArray(rows) || rows.length <= 0) {
      return toReturn;
    }
    let rowAbsoluteHeight = TimelineStyleUtils.headerHeight(this._options);
    rows.forEach((row, index) => {
      if (!row || row.hidden) {
        return;
      }

      // draw with scroll virtualization:
      const rowHeight = TimelineStyleUtils.getRowHeight(row, this._options);
      const marginBottom = TimelineStyleUtils.getRowMarginBottom(row, this._options);
      const currentRowY = rowAbsoluteHeight - (this._scrollContainer ? this._scrollContainer.scrollTop : 0);
      rowAbsoluteHeight += rowHeight + marginBottom;
      if (index == 0) {
        toReturn.size.y = currentRowY;
      }

      toReturn.size.height = Math.max(rowAbsoluteHeight + rowHeight, toReturn.size.height);

      const calcRow = {
        size: { x: 0, y: currentRowY, width: this._canvas ? this._width() : 0, height: rowHeight } as DOMRect,
        marginBottom: marginBottom,
        model: row,
        min: null,
        max: null,
        groups: [] as Array<TimelineCalculatedGroup>,
        keyframes: [] as Array<TimelineCalculatedKeyframe>,
      } as TimelineCalculatedRow;
      toReturn.rows.push(calcRow);
      if (!row.keyframes || !row.keyframes.forEach || row.keyframes.length <= 0) {
        return;
      }

      // Get min and max ms to draw keyframe rows:
      if (row && row.keyframes) {
        row.keyframes.forEach((keyframe) => {
          if (keyframe && !isNaN(keyframe.val) && !keyframe.hidden) {
            let currentGroup: TimelineCalculatedGroup = null;
            for (let i = 0; i < calcRow.groups.length; i++) {
              const existingGroup = calcRow.groups[i];
              if (keyframe.group === existingGroup.group) {
                currentGroup = existingGroup;
                break;
              }
            }
            if (!currentGroup) {
              currentGroup = {
                min: null,
                max: null,
                group: keyframe.group,
                keyframes: [] as Array<TimelineCalculatedKeyframe>,
              } as TimelineCalculatedGroup;

              calcRow.groups.push(currentGroup);
            }
            const keyframeSize = this._getKeyframePosition(keyframe, calcRow);
            const calcKeyframe = {
              model: keyframe,
              parentRow: calcRow,
              parentGroup: currentGroup,
              size: keyframeSize,
            } as TimelineCalculatedKeyframe;

            const min = currentGroup.min == null ? keyframe.val : Math.min(keyframe.val, currentGroup.min);
            const max = currentGroup.max == null ? keyframe.val : Math.max(keyframe.val, currentGroup.max);
            if (!isNaN(min)) {
              currentGroup.min = min;
            }
            if (!isNaN(max)) {
              currentGroup.max = max;
            }
            calcRow.keyframes.push(calcKeyframe);
            currentGroup.keyframes.push(calcKeyframe);
            toReturn.keyframes.push(calcKeyframe);
          }
        });
      }

      calcRow.groups.forEach((group) => {
        // Extend row min max bounds by a group bounds:
        TimelineUtils.setMinMax(calcRow, group, true);
        // get group screen coords
        const groupRect = this._getKeyframesGroupSize(row, calcRow.size.y, group.min, group.max);
        group.size = groupRect;
      });

      // Extend screen bounds by a current calculation:
      TimelineUtils.setMinMax(toReturn, calcRow, true);
    });
    if (TimelineUtils.isNumber(toReturn.max)) {
      toReturn.size.width = this.valToPx(toReturn.max);
    }
    return toReturn;
  }

  _renderRows(): void {
    const data = this._calculateModel();
    if (data && data.rows) {
      this._ctx.save();
      data.rows.forEach((rowCalc) => {
        if (!rowCalc) {
          return;
        }

        this._ctx.fillStyle = TimelineStyleUtils.getRowFillColor(rowCalc.model, this._options);
        //this._ctx.fillRect(data.areaRect.x, data.areaRect.y, data.areaRect.w, data.areaRect.h);
        // Note: bounds used instead of the clip while clip is slow!
        const bounds = this._cutBounds(rowCalc.size);
        if (bounds) {
          this._ctx.fillRect(bounds.x, bounds.y, bounds.width, bounds.height);
        }

        const keyframeLaneColor = TimelineStyleUtils.groupFillColor(rowCalc.model, this._options);
        if (!rowCalc.groups) {
          return;
        }
        rowCalc.groups.forEach((group) => {
          // get the bounds on a canvas
          const rectBounds = this._cutBounds(group.size);
          if (rectBounds) {
            this._ctx.fillStyle = keyframeLaneColor;
            this._ctx.fillRect(rectBounds.x, rectBounds.y, rectBounds.width, rectBounds.height);
          }
        });
      });

      this._ctx.restore();
    }
  }

  /**
   * Method is used for the optimization.
   * Only visible part should be rendered.
   */
  _cutBounds(rect: DOMRect): TimelineCutBoundsRectResults {
    if (!rect) {
      return null;
    }
    // default bounds: minX, maxX, minY, maxY
    const minX = 0,
      maxX = this._width(),
      minY = TimelineStyleUtils.headerHeight(this._options),
      maxY = this._width();

    if (
      TimelineUtils.isRectOverlap(rect, {
        x: minX,
        y: minY,
        width: TimelineUtils.getDistance(minX, maxX),
        height: TimelineUtils.getDistance(minY, maxY),
      } as DOMRect)
    ) {
      const y = Math.max(rect.y, minY);
      const x = Math.max(rect.x, minX);
      const offsetW = rect.x - x;
      const offsetH = rect.y - y;

      return {
        height: rect.height + offsetH,
        width: rect.width + offsetW,
        x: x,
        y: y,
        overlapY: Math.abs(offsetH) > 0,
        overlapX: Math.abs(offsetW) > 0,
      } as TimelineCutBoundsRectResults;
    }
    return null;
  }

  /**
   * get keyframe group screen rect coordinates.
   * @param row
   * @param rowY row screen coords y position
   */
  _getKeyframesGroupSize(row: TimelineRow, rowY: number, minValue: number, maxValue: number): DOMRect {
    let groupHeight: number | string = TimelineStyleUtils.rowGroupHeight(row, this._options);

    const height = TimelineStyleUtils.getRowHeight(row, this._options);
    if ((!groupHeight && groupHeight !== 0) || isNaN(groupHeight as number) || groupHeight == 'auto') {
      groupHeight = Math.floor(height * 0.7);
    }

    if (groupHeight > height) {
      groupHeight = height;
    }

    const margin = height - (groupHeight as number);
    // draw keyframes rows.
    const xMin = this._toScreenPx(minValue); // local
    const xMax = this._toScreenPx(maxValue); // local

    return {
      x: xMin,
      y: rowY + Math.floor(margin / 2),
      height: groupHeight,
      width: TimelineUtils.getDistance(xMin, xMax),
    } as DOMRect;
  }

  _getKeyframePosition(keyframe: TimelineKeyframe, rowCalculated: TimelineCalculatedRow): DOMRect | null {
    if (!keyframe) {
      console.log('keyframe should be defined.');
      return null;
    }

    const val = keyframe.val;
    if (isNaN(val)) {
      return null;
    }

    const rowSize = rowCalculated.size;
    // get center of the lane:
    const y = rowSize.y + rowSize.height / 2;

    let height: number | string = TimelineStyleUtils.getKeyframeStyle(keyframe, rowCalculated.model, this._options, 'height', 'auto');
    let width: number | string = TimelineStyleUtils.getKeyframeStyle(keyframe, rowCalculated.model, this._options, 'width', 'auto');

    if (height == 'auto') {
      height = rowSize.height / 3;
    }
    if (width == 'auto') {
      width = height;
    }
    if (height > 0) {
      if (!isNaN(val)) {
        const toReturn = {
          x: Math.floor(this._toScreenPx(val)), // local
          y: Math.floor(y),
          height: height,
          width: width,
        } as DOMRect;
        return toReturn;
      }
    }

    return null;
  }

  _renderKeyframes(): void {
    this._forEachKeyframe((calcKeyframe): boolean => {
      const row = calcKeyframe.parentRow.model;
      const pos = calcKeyframe.size;
      const keyframe = calcKeyframe.model;
      if (pos) {
        let x = this._getSharp(pos.x);
        let y = pos.y;
        const bounds = this._cutBounds({
          x: x - pos.width / 2,
          y: y - pos.height / 2,
          width: pos.width,
          height: pos.height,
        } as DOMRect);
        if (!bounds) {
          return;
        }

        this._ctx.save();

        // Performance FIX: use clip only  when we are in the collision! Clip is slow!
        // Other keyframes should be hidden by bounds check.
        if (bounds && bounds.overlapY) {
          this._ctx.beginPath();
          this._ctx.rect(0, TimelineStyleUtils.headerHeight(this._options), this._width(), this._width());
          this._ctx.clip();
        }

        const shape = TimelineStyleUtils.keyframeShape(keyframe, row, this._options);
        if (shape === TimelineKeyframeShape.None) {
          return;
        }

        const keyframeColor = keyframe.selected ? TimelineStyleUtils.keyframeSelectedFillColor(keyframe, row, this._options) : TimelineStyleUtils.keyframeFillColor(keyframe, row, this._options);
        const border = TimelineStyleUtils.keyframeStrokeThickness(keyframe, row, this._options);
        const strokeColor =
          border > 0 ? (keyframe.selected ? TimelineStyleUtils.keyframeSelectedStrokeColor(keyframe, row, this._options) : TimelineStyleUtils.keyframeStrokeColor(keyframe, row, this._options)) : '';

        if (shape == TimelineKeyframeShape.Rhomb) {
          this._ctx.beginPath();
          this._ctx.translate(x, y);
          this._ctx.rotate((45 * Math.PI) / 180);
          if (border > 0 && strokeColor) {
            this._ctx.fillStyle = strokeColor;
            this._ctx.rect(-pos.width / 2, -pos.height / 2, pos.width, pos.height);
            this._ctx.fill();
          }

          this._ctx.fillStyle = keyframeColor;
          // draw main keyframe data with offset.
          this._ctx.translate(border, border);
          this._ctx.rect(-pos.width / 2, -pos.height / 2, pos.width - border * 2, pos.height - border * 2);
          this._ctx.fill();
        } else if (shape == TimelineKeyframeShape.Circle) {
          this._ctx.beginPath();
          if (border > 0 && strokeColor) {
            this._ctx.fillStyle = strokeColor;
            this._ctx.arc(x, y, pos.height, 0, 2 * Math.PI);
          }
          this._ctx.fillStyle = keyframeColor;
          this._ctx.arc(x, y, pos.height - border, 0, 2 * Math.PI);
          this._ctx.fill();
        } else if (shape == TimelineKeyframeShape.Rect) {
          this._ctx.beginPath();
          y = y - pos.height / 2;
          x = x - pos.width / 2;
          if (border > 0 && strokeColor) {
            this._ctx.fillStyle = strokeColor;
            this._ctx.rect(x, y, pos.width, pos.height);
            this._ctx.fill();
          }

          this._ctx.fillStyle = keyframeColor;
          this._ctx.rect(x + border, y + border, pos.width - border, pos.height - border);
          this._ctx.fill();
        }

        this._ctx.restore();
      }
      return;
    });
  }

  _renderSelectionRect(): void {
    if (this._drag) {
      return;
    }

    this._ctx.save();
    const thickness = 1;
    if (this._selectionRect && this._selectionRectEnabled) {
      this._ctx.setLineDash([4]);
      this._ctx.lineWidth = this._pixelRatio;
      this._ctx.strokeStyle = this._options.selectionColor;
      this._ctx.strokeRect(
        this._getSharp(this._selectionRect.x, thickness),
        this._getSharp(this._selectionRect.y, thickness),
        Math.floor(this._selectionRect.width),
        Math.floor(this._selectionRect.height),
      );
    }
    this._ctx.restore();
  }

  _renderBackground(): void {
    if (this._options.fillColor) {
      this._ctx.save();
      this._ctx.beginPath();
      this._ctx.rect(0, 0, this._width(), this._height());
      this._ctx.fillStyle = this._options.fillColor;
      this._ctx.fill();
      this._ctx.restore();
    } else {
      // Clear if bg not set.
      this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }
  }

  _renderTimeline(): void {
    if (!this._ctx || !this._options || !this._options.timelineStyle) {
      return;
    }
    const style = this._options.timelineStyle;
    this._ctx.save();
    const thickness = style.width || 1;
    this._ctx.lineWidth = thickness * this._pixelRatio;
    const timeLinePos = this._getSharp(this._toScreenPx(this._val), thickness);
    this._ctx.strokeStyle = style.strokeColor;
    this._ctx.fillStyle = style.fillColor;
    const y = style.marginTop;
    this._ctx.beginPath();
    TimelineUtils.drawLine(this._ctx, timeLinePos, y, timeLinePos, this._height());
    this._ctx.stroke();

    if (style.capHeight && style.capWidth) {
      const rectSize = style.capWidth;
      const capHeight = style.capHeight;
      if (style.capType === TimelineCapShape.Triangle) {
        this._ctx.beginPath();
        this._ctx.moveTo(timeLinePos - rectSize / 2, y);
        this._ctx.lineTo(timeLinePos + rectSize / 2, y);
        this._ctx.lineTo(timeLinePos, capHeight);
        this._ctx.closePath();
        this._ctx.stroke();
      } else if (style.capType === TimelineCapShape.Rect) {
        this._ctx.fillRect(timeLinePos - rectSize / 2, y, rectSize, capHeight);
        this._ctx.fill();
      }
    }

    this._ctx.restore();
  }

  _renderHeaderBackground(): void {
    if (!this._ctx || !this._options) {
      return;
    }
    if (TimelineStyleUtils.headerHeight(this._options)) {
      this._ctx.save();
      // draw ticks background
      this._ctx.lineWidth = this._pixelRatio;
      if (this._options.headerFillColor) {
        // draw ticks background
        this._ctx.lineWidth = this._pixelRatio;
        // draw header background
        this._ctx.fillStyle = this._options.headerFillColor;
        this._ctx.fillRect(0, 0, this._width(), TimelineStyleUtils.headerHeight(this._options));
      } else {
        this._ctx.clearRect(0, 0, this._width(), TimelineStyleUtils.headerHeight(this._options));
      }
      this._ctx.restore();
    }
  }

  redraw(): void {
    if (window.requestAnimationFrame) {
      window.requestAnimationFrame(this._redrawInternal);
    } else {
      this._redrawInternal();
    }
  }

  /**
   * perform scroll to max left.
   */
  public scrollLeft(): void {
    if (this._scrollContainer.scrollLeft != this._scrollContainer.scrollWidth) {
      this._scrollContainer.scrollLeft = this._scrollContainer.scrollWidth;
    }
  }

  /**
   * Redraw parts of the component in the specific order.
   */
  _redrawInternal = (): void => {
    if (!this._ctx) {
      return;
    }
    // Rescale when animation is played out of the bounds.
    if (this.valToPx(this._val) > this._scrollContainer.scrollWidth) {
      this.rescale();
      if (!this._isPanStarted && this._drag && this._drag.type !== TimelineElementType.Timeline) {
        this.scrollLeft();
      }
    }

    this._renderBackground();
    this._renderRows();
    // Render after rows
    this._renderHeaderBackground();
    this._renderTicks();
    this._renderKeyframes();
    this._renderSelectionRect();
    this._renderTimeline();
  };

  /**
   * Get row by y coordinate.
   * @param posY y screen coordinate.
   */
  public getRowByY(posY: number): TimelineRow {
    const model = this._calculateModel();
    if (model && model.rows) {
      for (let i = 0; i < model.rows.length; i++) {
        const row = model.rows[i].size;
        if (row && row.y >= posY && posY <= row.y + row.height) {
          return row;
        }
      }
    }

    return null;
  }
  /**
   * Find sharp pixel position
   */
  _getSharp(pos: number, thickness = 1): number {
    pos = Math.round(pos);
    if (thickness % 2 == 0) {
      return pos;
    }

    return pos + this._pixelRatio / 2;
  }

  /**
   * Get current time:
   */
  public getTime(): number {
    return this._val;
  }

  /**
   * Set current time internal
   * @param val value.
   * @param source event source.
   */
  _setTimeInternal(val: number, source: TimelineEventSource = TimelineEventSource.Programmatically): boolean {
    val = Math.round(val);
    if (val < this._options.min) {
      val = this._options.min;
    }

    if (this._val != val) {
      const prevVal = this._val;
      const timelineEvent = new TimelineTimeChangedEvent();
      timelineEvent.val = val;
      timelineEvent.prevVal = prevVal;
      timelineEvent.source = source;
      this._val = val;
      this.emit(TimelineEvents.TimeChanged, timelineEvent);
      if (timelineEvent.isPrevented()) {
        this._val = prevVal;
        return false;
      }
      return true;
    }

    return false;
  }
  public setTime(val: number): boolean {
    // don't allow to change time during drag:
    if (this._drag && this._drag.type === TimelineElementType.Timeline) {
      return false;
    }

    const isChanged = this._setTimeInternal(val, TimelineEventSource.SetTimeMethod);
    if (isChanged) {
      this.rescale();
      this.redraw();
    }

    return isChanged;
  }

  public getOptions(): TimelineOptions {
    return this._options;
  }

  public setScrollLeft(value: number): void {
    if (this._scrollContainer) {
      this._scrollContainer.scrollLeft = value;
    }
  }
  public setScrollTop(value: number): void {
    if (this._scrollContainer) {
      this._scrollContainer.scrollTop = value;
    }
  }
  public getScrollLeft(): number {
    return this._scrollContainer ? this._scrollContainer.scrollLeft : 0;
  }
  public getScrollTop(): number {
    return this._scrollContainer ? this._scrollContainer.scrollTop : 0;
  }

  /**
   * Set options and render the component.
   * Options will be merged with the defaults and control invalidated
   */
  public setOptions(toSet: TimelineOptions): TimelineOptions {
    this._options = this._setOptions(toSet);
    this.rescale();
    this.redraw();
    // Merged options:
    return this._options;
  }

  _setOptions(toSet: TimelineOptions): TimelineOptions {
    this._options = this._mergeOptions(toSet);
    // Normalize and validate spans per value.
    this._options.snapStep = TimelineUtils.keepInBounds(this._options.snapStep, 0, this._options.stepVal);
    this._currentZoom = this._setZoom(this._options.zoom, this._options.zoomMin, this._options.zoomMax);
    this._options.min = TimelineUtils.isNumber(this._options.min) ? this._options.min : 0;
    this._options.max = TimelineUtils.isNumber(this._options.max) ? this._options.max : Number.MAX_VALUE;
    if (this._scrollContainer) {
      const classList = this._scrollContainer.classList;
      if (this._options.scrollContainerClass && classList.contains(this._options.scrollContainerClass)) {
        classList.add(this._options.scrollContainerClass);
      }
      if (this._options.fillColor) {
        this._scrollContainer.style.background = this._options.fillColor;
      }
    }
    return this._options;
  }

  public getModel(): TimelineModel {
    return this._model;
  }

  /**
   * Set model and redraw application.
   * @param data
   */
  public setModel(data: TimelineModel): void {
    this._model = data;
    this.rescale();
    this.redraw();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _getMousePos(canvas: HTMLCanvasElement, e: TouchEvent | MouseEvent | any): TimelineMouseData {
    let radius = 1;
    let clientX = 0;
    let clientY = 0;
    if (e.changedTouches && e.changedTouches.length > 0) {
      // TODO: implement better touch support
      const touch = e.changedTouches[0];
      clientX = touch.clientX;
      clientY = touch.clientY;
      radius = Math.max(radius, touch.radiusX, touch.radiusY);
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const rect = canvas.getBoundingClientRect(), // abs. size of element
      scaleX = canvas.width / this._pixelRatio / rect.width, // relationship bitmap vs. element for X
      scaleY = canvas.height / this._pixelRatio / rect.height; // relationship bitmap vs. element for Y

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;
    // scale mouse coordinates after they have been adjusted to be relative to element
    return {
      x: x,
      y: y,
      radius,
      args: e,
    } as TimelineMouseData;
  }

  /**
   * Apply container div size to the container on changes detected.
   */
  _updateCanvasScale(): boolean {
    if (!this._scrollContainer || !this._ctx) {
      console.log('control should be initialized first');
      return;
    }
    let changed = false;
    const width = this._scrollContainer.clientWidth * this._pixelRatio;
    const height = this._scrollContainer.clientHeight * this._pixelRatio;
    if (Math.floor(width) != Math.floor(this._ctx.canvas.width)) {
      this._ctx.canvas.width = width;
      changed = true;
    }

    if (Math.floor(height) != Math.floor(this._ctx.canvas.height)) {
      this._ctx.canvas.height = height;
      changed = true;
    }

    if (changed) {
      this._ctx.setTransform(this._pixelRatio, 0, 0, this._pixelRatio, 0, 0);
    }
    return changed;
  }

  /**
   * Rescale and update size of the container.
   */
  public rescale(): void {
    this._rescaleInternal();
  }

  _rescaleInternal(newWidth: number | null = null, newHeight: number | null = null, scrollMode = 'default'): void {
    this._updateCanvasScale();
    const data = this._calculateModel();
    if (data && data.size) {
      const additionalOffset = this._options.stepPx;
      newWidth = newWidth || 0;
      // not less than current timeline position
      const timelineGlobalPos = this.valToPx(this._val);
      let timelinePos = 0;
      if (timelineGlobalPos > this._width()) {
        if (scrollMode == 'scrollBySelection') {
          timelinePos = Math.floor(timelineGlobalPos + this._width() + (this._options.stepPx || 0));
        } else {
          timelinePos = Math.floor(timelineGlobalPos + this._width() / 1.5);
        }
      }
      const keyframeW = data.size.width + this._leftMargin() + additionalOffset;

      newWidth = Math.max(
        newWidth,
        // keyframes size
        keyframeW,
        // not less than current scroll position
        this.getScrollLeft() + this._width(),
        timelinePos,
      );

      const minWidthPx = Math.floor(newWidth) + 'px';
      if (minWidthPx != this._scrollContent.style.minWidth) {
        this._scrollContent.style.minWidth = minWidthPx;
      }

      newHeight = Math.max(Math.floor(data.size.height + this._height() * 0.2), this._scrollContainer.scrollTop + this._height() - 1, Math.round(newHeight || 0));

      const h = newHeight + 'px';
      if (this._scrollContent.style.minHeight != h) {
        this._scrollContent.style.minHeight = h;
      }
    }
  }

  /**
   * get draggable element.
   * Filter elements and get first element by a priority.
   * @param Array
   * @param val current mouse value
   */
  _findDraggable(elements: Array<TimelineElement>, val: number | null = null): TimelineElement {
    // filter and sort: Timeline, individual keyframes, groups (distance).
    const getPriority = (type: TimelineElementType): number => {
      if (type === TimelineElementType.Timeline) {
        return 1;
      } else if (type === TimelineElementType.Keyframe) {
        return 2;
      } else if (type === TimelineElementType.Group) {
        return 3;
      }
      return -1;
    };
    const filteredElements = elements.filter((element) => {
      if (!element) {
        return false;
      }
      if (element.type === TimelineElementType.Keyframe) {
        if (!TimelineStyleUtils.keyframeDraggable(element.keyframe, element.row, this._options)) {
          return false;
        }
      } else if (element.type === TimelineElementType.Group) {
        if (!TimelineStyleUtils.groupDraggable(element.row, this._options)) {
          return false;
        }
      } else if (element.type === TimelineElementType.Row) {
        return false;
      }
      return true;
    });

    const sorted = filteredElements.sort((a, b): number => {
      let prioA = getPriority(a.type);
      let prioB = getPriority(b.type);
      if (prioA === prioB) {
        if (val === null) {
          return 0;
        }

        // Sort by distance
        prioA = TimelineUtils.getDistance(a.val, val);
        prioB = TimelineUtils.getDistance(b.val, val);
        if (prioA === prioB) {
          return 0;
        }
        return prioA < prioB ? 1 : -1;
      }

      return prioA < prioB ? 1 : -1;
    });
    if (sorted.length > 0) {
      return sorted[sorted.length - 1];
    }

    return null;
  }

  /**
   * get all clickable elements by a screen point.
   */
  public elementFromPoint(pos: DOMPoint, clickRadius = 2): Array<TimelineElement> {
    clickRadius = Math.max(clickRadius, 1);
    const toReturn: Array<TimelineElement> = [];

    if (!pos) {
      return toReturn;
    }

    const headerHeight = TimelineStyleUtils.headerHeight(this._options);
    // Check whether we can drag timeline.
    const timeLinePos = this._toScreenPx(this._val);
    let width = 0;
    if (this._options && this._options.timelineStyle) {
      const timelineStyle = this._options.timelineStyle;
      width = Math.max((timelineStyle.width || 1) * this._pixelRatio, (timelineStyle.capWidth || 0) * this._pixelRatio || 1) + clickRadius;
    }
    // Allow to select timeline only by half of a header to allow select by a selector top most keyframes row.
    if (pos.y <= headerHeight * 0.5 || (pos.x >= timeLinePos - width / 2 && pos.x <= timeLinePos + width / 2)) {
      toReturn.push({
        val: this._val,
        type: TimelineElementType.Timeline,
      } as TimelineElement);
    }
    const snap = this._options.snapEnabled;
    if (pos.y >= headerHeight && this._options.keyframesDraggable) {
      this._forEachKeyframe((calcKeyframe, index, isNextRow): void => {
        // Check keyframes group overlap
        if (isNextRow) {
          const rowOverlapped = TimelineUtils.isOverlap(pos.x, pos.y, calcKeyframe.parentRow.size);
          if (rowOverlapped) {
            const row = {
              val: this._mousePosToVal(pos.x, snap),
              keyframes: calcKeyframe.parentRow.model.keyframes,
              type: TimelineElementType.Row,
              row: calcKeyframe.parentRow.model,
            } as TimelineElement;
            toReturn.push(row);
          }
          if (calcKeyframe.parentRow.groups) {
            calcKeyframe.parentRow.groups.forEach((group) => {
              const keyframesGroupOverlapped = TimelineUtils.isOverlap(pos.x, pos.y, group.size);
              if (keyframesGroupOverlapped) {
                const keyframesModels = this._mapKeyframes(group.keyframes);
                const groupElement = {
                  val: this._mousePosToVal(pos.x, snap),
                  type: TimelineElementType.Group,
                  group: group,
                  row: calcKeyframe.parentRow.model,
                  keyframes: keyframesModels,
                } as TimelineElement;

                const snapped = this.snapVal(group.min);
                // get snapped mouse pos based on a min value.
                groupElement.val += group.min - snapped;
                toReturn.push(groupElement);
              }
            });
          }
        }

        const keyframePos = calcKeyframe.size;
        if (keyframePos) {
          const dist = TimelineUtils.getDistance(keyframePos.x, keyframePos.y, pos.x, pos.y);
          if (dist <= keyframePos.height + clickRadius) {
            toReturn.push({
              keyframe: calcKeyframe.model,
              keyframes: [calcKeyframe.model],
              val: calcKeyframe.model.val,
              row: calcKeyframe.parentRow.model,
              type: TimelineElementType.Keyframe,
            } as TimelineElement);
          }
        }
        return;
      });
    }
    return toReturn;
  }

  /**
   * Merge options with the defaults.
   */
  _mergeOptions(from: TimelineOptions): TimelineOptions {
    from = from || ({} as TimelineOptions);
    // Apply incoming options to default. (override default)
    // Deep clone default options:
    const to = JSON.parse(JSON.stringify(defaultTimelineOptions));
    // Merge options with the default.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mergeOptionsDeep = (to: any, from: any): void => {
      if (!to || !from) {
        return;
      }
      // eslint-disable-next-line prefer-const
      for (let key in from) {
        if (Object.prototype.hasOwnProperty.call(from, key)) {
          if (from[key] !== undefined) {
            if (typeof from[key] === 'object') {
              if (!to[key]) {
                to[key] = from[key];
              } else {
                mergeOptionsDeep(to[key], from[key]);
              }
            } else {
              to[key] = from[key];
            }
          }
        }
      }
    };

    mergeOptionsDeep(to, from);
    return to;
  }
  /**
   * Subscribe on time changed.
   */
  public onTimeChanged(callback: (eventArgs: TimelineTimeChangedEvent) => void): void {
    this.on(TimelineEvents.TimeChanged, callback);
  }
  /**
   * Subscribe on drag started event.
   */
  public onDragStarted(callback: (eventArgs: TimelineDragEvent) => void): void {
    this.on(TimelineEvents.DragStarted, callback);
  }
  /**
   * Subscribe on drag event.
   */
  public onDrag(callback: (eventArgs: TimelineDragEvent) => void): void {
    this.on(TimelineEvents.Drag, callback);
  }
  /**
   * Subscribe on drag finished event.
   */
  public onDragFinished(callback: (eventArgs: TimelineDragEvent) => void): void {
    this.on(TimelineEvents.DragFinished, callback);
  }
  /**
   * Subscribe on double click.
   */
  public onDoubleClick(callback: (eventArgs: TimelineClickEvent) => void): void {
    this.on(TimelineEvents.DoubleClick, callback);
  }
  /**
   * Subscribe on keyframe changed event.
   */
  public onKeyframeChanged(callback: (eventArgs: TimelineKeyframeChangedEvent) => void): void {
    this.on(TimelineEvents.KeyframeChanged, callback);
  }
  /**
   * Subscribe on drag finished event.
   */
  public onMouseDown(callback: (eventArgs: TimelineClickEvent) => void): void {
    this.on(TimelineEvents.MouseDown, callback);
  }

  public onSelected(callback: (eventArgs: TimelineSelectedEvent) => void): void {
    this.on(TimelineEvents.Selected, callback);
  }
  /**
   * Subscribe on scroll event
   */
  public onScroll(callback: (eventArgs: TimelineScrollEvent) => void): void {
    this.on(TimelineEvents.Scroll, callback);
  }
  _emitScrollEvent(args: MouseEvent | null): TimelineScrollEvent {
    const scrollEvent = {
      args: args,
      scrollLeft: this.getScrollLeft(),
      scrollTop: this.getScrollTop(),
      scrollHeight: this._scrollContainer.scrollHeight,
      scrollWidth: this._scrollContainer.scrollWidth,
    } as TimelineScrollEvent;
    super.emit(TimelineEvents.Scroll, scrollEvent);
    return scrollEvent;
  }
  _emitKeyframeChanged(element: TimelineElementDragState, source: TimelineEventSource = TimelineEventSource.Programmatically): TimelineKeyframeChangedEvent {
    const args = new TimelineKeyframeChangedEvent();
    args.val = element.val;
    args.prevVal = element.prevVal;
    args.target = element;
    args.source = source;
    this.emit(TimelineEvents.KeyframeChanged, args);
    return args;
  }
  _emitDragStartedEvent(): TimelineDragEvent {
    const args = this._getDragEventArgs();
    this.emit(TimelineEvents.DragStarted, args);
    if (args.isPrevented()) {
      this._preventDrag(args, this._drag, true);
    }
    return args;
  }
  _emitDragFinishedEvent(): TimelineDragEvent {
    if (this._drag && this._drag.changed) {
      const args = this._getDragEventArgs();
      this.emit(TimelineEvents.DragFinished, args);
      if (args.isPrevented()) {
        this._preventDrag(args, this._drag, true);
      }
      return args;
    }

    return null;
  }
  _preventDrag(dragArgs: TimelineDragEvent, data: TimelineDraggableData, toStart = false): void {
    if (dragArgs.elements) {
      dragArgs.elements.forEach((element) => {
        const toSet = toStart ? element.startedVal : element.prevVal;
        this._setKeyframePos(element, toSet);
      });
    }
    data.val = data.prevVal;
    dragArgs.val = dragArgs.prevVal;
  }
  _emitDragEvent(): TimelineDragEvent {
    if (!this._drag) {
      return null;
    }
    const args = this._getDragEventArgs();
    this.emit(TimelineEvents.Drag, args);
    if (args.isPrevented()) {
      this._preventDrag(args, this._drag, false);
    }
    return args;
  }
  _emitKeyframesSelected(state: TimelineSelectionResults): TimelineSelectedEvent {
    const args = new TimelineSelectedEvent();
    args.selected = state.selected;
    args.changed = state.changed;
    this.emit(TimelineEvents.Selected, args);
    return args;
  }
  _getDragEventArgs(): TimelineDragEvent {
    const draggableArguments = new TimelineDragEvent();
    if (!this._drag) {
      return draggableArguments;
    }
    draggableArguments.val = this._currentPos.val;
    draggableArguments.originalVal = this._currentPos.originalVal;
    draggableArguments.snapVal = this._currentPos.snapVal;
    draggableArguments.pos = this._currentPos;
    draggableArguments.elements = this._drag.elements;
    draggableArguments.target = this._drag.target;
    return draggableArguments;
  }
}
