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
import { CutBoundsRect } from './utils/cutBoundsRect';
import { TimelineCapShape } from './enums/timelineCapShape';
import { TimelineCalculatedRow, TimelineModelCalcResults, TimelineCalculatedGroup, TimelineCalculatedKeyframe } from './utils/timelineModelCalcResults';
import { TimelineInteractionMode } from './enums/timelineInteractionMode';
import { TimelineScrollEvent } from './utils/events/timelineScrollEvent';
import { TimelineSelectedEvent } from './utils/events/timelineSelectedEvent';
import { TimelineDraggableData } from './utils/timelineDraggableData';
import { TimelineClickEvent } from './utils/events/timelineClickEvent';
import { TimelineDragEvent } from './utils/events/timelineDragEvent';
import { defaultTimelineConsts, defaultTimelineOptions } from './settings/defaults';
import { TimelineEventSource } from './enums/timelineEventSource';
import { TimelineTimeChangedEvent } from './utils/events/timelineTimeChangedEvent';
import { TimelineSelectionMode } from './enums/timelineSelectionMode';
import { TimelineSelectionResults } from './utils/timelineSelectionResults';
import { TimelineRanged } from './timelineRanged';

interface MousePoint extends DOMPoint {
  radius: number;
}
interface MouseData extends MousePoint {
  val: number;
  snapVal: number;
}

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
  _startPos: MouseData | null = null;
  /**
   * Drag scroll started position.
   */
  _scrollStartPos: DOMPoint | null = { x: 0, y: 0 } as DOMPoint;
  _currentPos: MouseData | null = null;

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
  _scrollFinishedTimerRef?: number = null;
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

    const id = options.id;
    this._options = this._mergeOptions(options);
    this._currentZoom = this._options.zoom;
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

    this._scrollContainer.classList.add(this._options.scrollContainerClass);
    this._scrollContainer.style.cssText = 'overflow: scroll;' + 'position: absolute;' + 'width:  100%;' + 'height:  100%;';

    this._scrollContent.style.width = this._scrollContent.style.height = '100%';

    // add the text node to the created div
    this._scrollContainer.appendChild(this._scrollContent);
    this._container.appendChild(this._scrollContainer);
    const scrollBarWidth = this._scrollContainer.offsetWidth - this._scrollContent.clientWidth;
    // Calculate current browser scroll bar size and add offset for the canvas
    this._canvas.style.width = this._canvas.style.height = 'calc(100% -' + (scrollBarWidth || 17) + 'px)';

    this._container.appendChild(this._canvas);

    if (this._options.fillColor) {
      this._scrollContainer.style.background = this._options.fillColor;
    }

    // Normalize and validate span per seconds
    this._options.snapsPerSeconds = Math.max(0, Math.min(60, this._options.snapsPerSeconds || 0));

    this._ctx = this._canvas.getContext('2d');
    this._subscribeOnEvents();
    this.rescale();
    this.redraw();
  }

  /**
   * Subscribe current component on the related events.
   */
  _subscribeOnEvents(): void {
    this._container.addEventListener('wheel', this._handleWheelEvent);

    if (this._scrollContainer) {
      this._scrollContainer.addEventListener('scroll', this._handleScrollEvent);
    }

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
    this._scrollFinishedTimerRef = setTimeout(() => {
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
  _controlKeyPressed(e: MouseEvent | KeyboardEvent): boolean {
    return this._options.controlKeyIsMetaKey || this._options.controlKeyIsMetaKey ? e.metaKey : e.ctrlKey;
  }
  _handleWheelEvent = (event: WheelEvent): void => {
    if (this._controlKeyPressed(event)) {
      event.preventDefault();
      if (this._options.zoomSpeed > 0 && this._options.zoomSpeed <= 1) {
        const mousePos = this._getMousePos(this._canvas, event);
        let x = mousePos.x;
        if (x <= 0) {
          x = 0;
        }
        const val = this.pxToVal(this._scrollContainer.scrollLeft + x, false);
        const diff = this._canvas.clientWidth / x;

        const zoom = TimelineUtils.sign(event.deltaY) * this._options.zoom * this._options.zoomSpeed;
        this._currentZoom += zoom;
        if (this._currentZoom > this._options.zoomMax) {
          this._currentZoom = this._options.zoomMax;
        }
        if (this._currentZoom < this._options.zoomMin) {
          this._currentZoom = this._options.zoomMin;
        }
        const zoomCenter = this.valToPx(val, true);
        let newScrollLeft = Math.round(zoomCenter - this._canvas.clientWidth / diff);
        if (newScrollLeft <= 0) {
          newScrollLeft = 0;
        }

        this._rescaleInternal(newScrollLeft + this._canvas.clientWidth, null, 'zoom');
        if (this._scrollContainer.scrollLeft != newScrollLeft) {
          // Scroll event will redraw the screen.
          this._scrollContainer.scrollLeft = newScrollLeft;
        }

        this.redraw();
      }
    } else {
      this._scrollContainer.scrollTop += event.deltaY;
      event.preventDefault();
    }
  };
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
    if (target) {
      this._drag = {
        changed: false,
        target: target,
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
        this._drag.elements = this.getSelectedElements();
      } else if (target.type === TimelineElementType.Group) {
        const keyframes = this._drag.target.keyframes;
        this._drag.elements =
          keyframes && Array.isArray(keyframes)
            ? keyframes.map((keyframe) => {
                return this._convertToElement(this._drag.target.row, keyframe) as TimelineElement;
              })
            : [];
      } else {
        this._drag.elements = [this._drag.target];
      }
    }

    this.redraw();
  };

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
      this._selectionRectEnabled = true;
    } else {
      this._selectionRectEnabled = false;
    }

    args = args as MouseEvent;
    const isLeftClicked = this.isLeftButtonClicked(args);
    if (this._startPos) {
      if (isLeftClicked || isTouch) {
        if (this._drag && !this._startedDragWithCtrl) {
          const convertedVal = this._mousePosToVal(this._currentPos.x, true);
          if (this._drag.type === TimelineElementType.Timeline) {
            this._setTimeInternal(convertedVal, TimelineEventSource.User);
          } else if ((this._drag.type == TimelineElementType.Keyframe || this._drag.type == TimelineElementType.Group) && this._drag.elements) {
            const offset = Math.floor(convertedVal - this._drag.val);
            const movedOffset = this._moveElements(offset, this._drag.elements);
            if (movedOffset !== 0) {
              if (!this._drag.changed) {
                const eventArgs = this._emitDragStartedEvent();
                if (eventArgs.isPrevented()) {
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
        this._setCursor(TimelineCursorType.Default);
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
  _moveElements(offset: number, elements: Array<TimelineElement>): number {
    if (!elements) {
      return;
    }
    let isChanged = false;
    if (Math.abs(offset) > 0) {
      // Find drag min and max bounds:
      let bounds = { min: Number.MIN_SAFE_INTEGER, max: Number.MAX_SAFE_INTEGER } as TimelineRanged;
      bounds = this._setMinMax(bounds, this._options);
      elements.forEach((p) => {
        // find allowed bounds for the draggable items.
        // find for each row and keyframe separately.
        const currentBounds = this._setMinMax(this._setMinMax({ min: bounds.min, max: bounds.max }, p.keyframe), p.row);
        const expectedKeyframeValue = this._options && this._options.snapAllKeyframesOnMove ? this.snapVal(p.keyframe.val) : p.keyframe.val;
        const newPosition = expectedKeyframeValue + offset;
        if (currentBounds.min !== null && newPosition < currentBounds.min) {
          // Return to the bounds:
          offset = offset + TimelineUtils.getDistance(currentBounds.min, newPosition);
        }
        if (currentBounds.max !== null && newPosition > currentBounds.max) {
          // Return to the bounds:
          offset = offset - TimelineUtils.getDistance(currentBounds.max, newPosition);
        }
      });

      if (Math.abs(offset) > 0) {
        // don't allow to move less than zero.
        elements.forEach((element) => {
          const toSet = element.keyframe.val + offset;
          isChanged = this._setKeyframePos(element.keyframe, toSet) || isChanged;
          if (isChanged) {
            element.val = element.keyframe.val;
          }
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
        this._performClick(pos, args, this._drag);
      } else if (!this._drag && this._selectionRect && this._selectionRectEnabled) {
        const keyframes = this._getKeyframesByRectangle(this._selectionRect);
        const selectionMode = args.shiftKey ? TimelineSelectionMode.Append : TimelineSelectionMode.Normal;
        this.select(keyframes, selectionMode);
      }

      this._cleanUpSelection();
      this.redraw();
    }
  };

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

  _performClick(pos: MouseData, args: MouseEvent, drag: TimelineDraggableData): boolean {
    let isChanged = false;
    if (drag && drag.type === TimelineElementType.Keyframe) {
      let mode = TimelineSelectionMode.Normal;
      if ((this._startedDragWithCtrl && this._controlKeyPressed(args)) || (this._startedDragWithShiftKey && args.shiftKey)) {
        if (this._controlKeyPressed(args)) {
          mode = TimelineSelectionMode.Revert;
        }
      }
      // Reverse selected keyframe selection by a click:
      isChanged = this._selectInternal(this._drag.target.keyframe, mode).selectionChanged || isChanged;

      if (args.shiftKey) {
        // change timeline pos:
        const convertedVal = this._mousePosToVal(pos.x, true);
        // Set current timeline position if it's not a drag or selection rect small or fast click.
        isChanged = this._setTimeInternal(convertedVal, TimelineEventSource.User) || isChanged;
      }
    } else {
      // deselect keyframes if any:
      isChanged = this._selectInternal(null).selectionChanged || isChanged;

      // change timeline pos:
      // Set current timeline position if it's not a drag or selection rect small or fast click.
      isChanged = this._setTimeInternal(this._mousePosToVal(pos.x, true), TimelineEventSource.User) || isChanged;
    }

    return isChanged;
  }
  /**
   * Set keyframe value.
   * @param keyframe
   * @param value
   */
  _setKeyframePos(keyframe: TimelineKeyframe, value: number): boolean {
    value = Math.floor(value);
    if (keyframe && keyframe.val != value) {
      keyframe.val = value;

      return true;
    }

    return false;
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

  _trackMousePos(canvas: HTMLCanvasElement, mouseArgs: MouseEvent | TouchEvent): MouseData {
    const pos = this._getMousePos(canvas, mouseArgs) as MouseData;
    pos.val = this.pxToVal(pos.x + this._scrollContainer.scrollLeft);
    pos.snapVal = this.snapVal(pos.val);
    if (this._startPos) {
      if (!this._selectionRect) {
        this._selectionRect = {} as DOMRect;
      }

      // get the pos with the virtualization:
      const x = Math.floor(this._startPos.x + (this._scrollStartPos.x - this._scrollContainer.scrollLeft));
      const y = Math.floor(this._startPos.y + (this._scrollStartPos.y - this._scrollContainer.scrollTop));
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
        this._intervalRef = setInterval(() => {
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

  _scrollByPan(start: MouseData, pos: MouseData, scrollStartPos: DOMPoint): void {
    if (!start || !pos) {
      return;
    }

    const offsetX = Math.round(start.x - pos.x);
    const newLeft = scrollStartPos.x + offsetX;

    if (offsetX > 0) {
      this._rescaleInternal(newLeft + this._canvas.clientWidth);
    }

    if (offsetX > 0 && newLeft + this._canvas.clientWidth >= this._scrollContainer.scrollWidth - 5) {
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
    const isRight = x >= this._canvas.clientWidth - bounds;
    const isTop = y <= bounds;
    const isBottom = y >= this._canvas.clientHeight - bounds;
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
        speedX = TimelineUtils.getDistance(x, this._canvas.clientWidth - bounds) * scrollSpeedMultiplier;
        newWidth = this._scrollContainer.scrollLeft + this._canvas.clientWidth + speedX;
      }

      if (isTop) {
        // Get normalized speed.
        speedY = (-TimelineUtils.getDistance(x, bounds) * scrollSpeedMultiplier) / 4;
      } else if (isBottom) {
        // Get normalized speed:
        speedY = (TimelineUtils.getDistance(x, this._canvas.clientHeight - bounds) * scrollSpeedMultiplier) / 4;
        newHeight = this._scrollContainer.scrollTop + this._canvas.clientHeight;
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
  public pxToVal(coords: number, absolute = false): number {
    if (!absolute) {
      coords -= this._options.leftMargin;
    }
    const ms = (coords / this._options.stepPx) * this._options.zoom;
    return ms;
  }

  /**
   * Convert area value to screen pixel coordinates.
   */
  public valToPx(ms: number, absolute = false): number {
    // Respect current scroll container offset. (virtualization)
    if (!absolute && this._scrollContainer) {
      const x = this._scrollContainer.scrollLeft;
      ms -= this.pxToVal(x);
    }

    if (!this._options) {
      return ms;
    }
    return (ms * this._options.stepPx) / this._options.zoom;
  }

  /**
   * Snap a value to a nearest beautiful point.
   */
  public snapVal(ms: number): number {
    // Apply snap to steps if enabled.
    if (this._options && this._options.snapsPerSeconds && this._options.snapEnabled) {
      const stopsPerPixel = 1000 / this._options.snapsPerSeconds;
      const step = ms / stopsPerPixel;
      const stepsFit = Math.round(step);
      ms = Math.round(stepsFit * stopsPerPixel);
    }

    if (this._options && TimelineUtils.isNumber(this._options.min) && ms < this._options.min) {
      ms = 0;
    }

    return ms;
  }

  _mousePosToVal(x: number, snapEnabled = false): number {
    let convertedVal = this.pxToVal(this._scrollContainer.scrollLeft + Math.min(x, this._canvas.clientWidth));
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
  _formatLineGaugeText(ms: number, isSeconds = false): string {
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

    return str;
  }

  _renderTicks(): void {
    if (!this._ctx || !this._options) {
      return;
    }
    this._ctx.save();

    const areaWidth = this._scrollContainer.scrollWidth - (this._options.leftMargin || 0);
    let from = this.pxToVal(this._options.min);
    let to = this.pxToVal(areaWidth);
    const dist = TimelineUtils.getDistance(from, to);
    if (dist === 0) {
      return;
    }
    // normalize step.
    const stepsCanFit = areaWidth / this._options.stepPx;
    const realStep = dist / stepsCanFit;
    // Find the nearest 'beautiful' step for a line gauge. This step should be divided by 1/2/5!
    //let step = realStep;
    const step = TimelineUtils.findGoodStep(realStep);
    if (step == 0 || isNaN(step) || !isFinite(step)) {
      return;
    }
    const goodStepDistancePx = areaWidth / (dist / step);
    const smallStepsCanFit = goodStepDistancePx / this._options.stepSmallPx;
    const realSmallStep = step / smallStepsCanFit;
    let smallStep = TimelineUtils.findGoodStep(realSmallStep, step);
    if (step % smallStep != 0) {
      smallStep = realSmallStep;
    }
    // filter to draw only visible
    const visibleFrom = this.pxToVal(this._scrollContainer.scrollLeft + this._options.leftMargin || 0);
    const visibleTo = this.pxToVal(this._scrollContainer.scrollLeft + this._scrollContainer.clientWidth);
    // Find beautiful start point:
    from = Math.floor(visibleFrom / step) * step;

    // Find a beautiful end point:
    to = Math.ceil(visibleTo / step) * step + step;

    let lastTextX: number | null = null;
    for (let i = from; i <= to; i += step) {
      const pos = this.valToPx(i);
      const sharpPos = this._getSharp(Math.round(pos));
      this._ctx.save();
      this._ctx.beginPath();
      this._ctx.setLineDash([4]);
      this._ctx.lineWidth = 1;
      this._ctx.strokeStyle = this._options.tickColor;
      TimelineUtils.drawLine(this._ctx, sharpPos, TimelineStyleUtils.headerHeight(this._options) / 2, sharpPos, this._canvas.clientHeight);
      this._ctx.stroke();

      this._ctx.fillStyle = this._options.labelsColor;
      if (this._options.font) {
        this._ctx.font = this._options.font;
      }

      const text = this._formatLineGaugeText(i);
      const textSize = this._ctx.measureText(text);

      const textX = sharpPos - textSize.width / 2;
      // skip text render if there is no space for it.
      if (isNaN(lastTextX) || lastTextX <= textX) {
        lastTextX = textX + textSize.width;
        this._ctx.fillText(text, textX, 10);
      }

      this._ctx.restore();
      // Draw small steps
      for (let x = i + smallStep; x < i + step; x += smallStep) {
        const nextPos = this.valToPx(x);
        const nextSharpPos = this._getSharp(Math.floor(nextPos));
        this._ctx.beginPath();
        this._ctx.lineWidth = this._pixelRatio;
        this._ctx.strokeStyle = this._options.tickColor;
        TimelineUtils.drawLine(this._ctx, nextSharpPos, TimelineStyleUtils.headerHeight(this._options) / 1.3, nextSharpPos, TimelineStyleUtils.headerHeight(this._options));
        this._ctx.stroke();
      }
    }

    this._ctx.restore();
  }

  _setMinMax(to: TimelineRanged, from: TimelineRanged): TimelineRanged {
    if (!from || !to) {
      return to;
    }
    const isFromMinNumber = TimelineUtils.isNumber(from.min);
    const isToMinNumber = TimelineUtils.isNumber(to.min);
    // get absolute min and max bounds:
    if (isFromMinNumber && isToMinNumber) {
      to.min = Math.max(from.min, to.min);
    } else if (isFromMinNumber) {
      to.min = from.min;
    }
    const isFromMaxNumber = TimelineUtils.isNumber(from.max);
    const isToMaxNumber = TimelineUtils.isNumber(to.max);
    if (isFromMaxNumber && isToMaxNumber) {
      to.max = Math.min(from.max, to.max);
    } else if (isFromMaxNumber) {
      to.max = from.max;
    }

    return to;
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
        size: { x: 0, y: currentRowY, width: this._canvas ? this._canvas.clientWidth : 0, height: rowHeight } as DOMRect,
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
        this._setMinMax(calcRow, group);
        // get group screen coords
        const groupRect = this._getKeyframesGroupSize(row, calcRow.size.y, group.min, group.max);
        group.size = groupRect;
      });

      // Extend screen bounds by a current calculation:
      this._setMinMax(toReturn, calcRow);
    });
    if (toReturn.max !== null) {
      toReturn.size.width = this.valToPx(toReturn.max, true);
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
  _cutBounds(rect: DOMRect): CutBoundsRect {
    if (!rect) {
      return null;
    }
    // default bounds: minX, maxX, minY, maxY
    const minX = 0,
      maxX = this._canvas.clientWidth,
      minY = TimelineStyleUtils.headerHeight(this._options),
      maxY = this._canvas.clientWidth;

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
      } as CutBoundsRect;
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
    const xMin = this.valToPx(minValue);
    const xMax = this.valToPx(maxValue);

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
          x: Math.floor(this.valToPx(val)),
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
          this._ctx.rect(0, TimelineStyleUtils.headerHeight(this._options), this._canvas.clientWidth, this._canvas.clientWidth);
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
      this._ctx.rect(0, 0, this._canvas.clientWidth, this._canvas.clientHeight);
      this._ctx.fillStyle = this._options.fillColor;
      this._ctx.fill();
      this._ctx.restore();
    } else {
      // Clear if bg not set.
      this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }
  }

  _renderTimeline(): void {
    if (!this._options || !this._options.timelineStyle) {
      return;
    }
    const style = this._options.timelineStyle;
    this._ctx.save();
    const thickness = style.width || 1;
    this._ctx.lineWidth = thickness * this._pixelRatio;
    const timeLinePos = this._getSharp(Math.round(this.valToPx(this._val)), thickness);
    this._ctx.strokeStyle = style.strokeColor;
    this._ctx.fillStyle = style.fillColor;
    const y = style.marginTop;
    this._ctx.beginPath();
    TimelineUtils.drawLine(this._ctx, timeLinePos, y, timeLinePos, this._canvas.clientHeight);
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
        this._ctx.fillRect(0, 0, this._canvas.clientWidth, TimelineStyleUtils.headerHeight(this._options));
      } else {
        this._ctx.clearRect(0, 0, this._canvas.clientWidth, TimelineStyleUtils.headerHeight(this._options));
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
    if (this.valToPx(this._val, true) > this._scrollContainer.scrollWidth) {
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
    if (val < 0) {
      val = 0;
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

    return this._setTimeInternal(val, TimelineEventSource.SetTimeMethod);
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
   * Set this._options.
   * Options will be merged with the defaults and control invalidated
   */
  public setOptions(toSet: TimelineOptions): TimelineOptions {
    this._options = this._mergeOptions(toSet);
    this.rescale();
    this.redraw();
    // Merged options:
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
  _getMousePos(canvas: HTMLCanvasElement, e: TouchEvent | MouseEvent | any): MousePoint {
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
    } as MousePoint;
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
      const timelineGlobalPos = this.valToPx(this._val, true);
      let timelinePos = 0;
      if (timelineGlobalPos > this._canvas.clientWidth) {
        if (scrollMode == 'scrollBySelection') {
          timelinePos = Math.floor(timelineGlobalPos + this._canvas.clientWidth + (this._options.stepPx || 0));
        } else {
          timelinePos = Math.floor(timelineGlobalPos + this._canvas.clientWidth / 1.5);
        }
      }
      const keyframeW = data.size.width + this._options.leftMargin + additionalOffset;

      newWidth = Math.max(
        newWidth,
        // keyframes size
        keyframeW,
        // not less than current scroll position
        this._scrollContainer.scrollLeft + this._canvas.clientWidth,
        timelinePos,
      );

      const minWidthPx = Math.floor(newWidth) + 'px';
      if (minWidthPx != this._scrollContent.style.minWidth) {
        this._scrollContent.style.minWidth = minWidthPx;
      }

      newHeight = Math.max(Math.floor(data.size.height + this._canvas.clientHeight * 0.2), this._scrollContainer.scrollTop + this._canvas.clientHeight - 1, Math.round(newHeight || 0));

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
    const timeLinePos = this.valToPx(this._val);
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

    if (pos.y >= headerHeight && this._options.keyframesDraggable) {
      this._forEachKeyframe((calcKeyframe, index, isNextRow): void => {
        // Check keyframes group overlap
        if (isNextRow) {
          const rowOverlapped = TimelineUtils.isOverlap(pos.x, pos.y, calcKeyframe.parentRow.size);
          if (rowOverlapped) {
            const row = {
              val: this._mousePosToVal(pos.x, true),
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
                  val: this._mousePosToVal(pos.x, true),
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
      scrollLeft: this._scrollContainer.scrollLeft,
      scrollTop: this._scrollContainer.scrollTop,
      scrollHeight: this._scrollContainer.scrollHeight,
      scrollWidth: this._scrollContainer.scrollWidth,
    } as TimelineScrollEvent;
    super.emit(TimelineEvents.Scroll, scrollEvent);
    return scrollEvent;
  }
  _emitDragStartedEvent(): TimelineDragEvent {
    const args = this._getDragEventArgs();
    this.emit(TimelineEvents.DragStarted, args);
    return args;
  }
  _emitDragFinishedEvent(): TimelineDragEvent {
    if (this._drag && this._drag.changed) {
      const args = this._getDragEventArgs();
      this.emit(TimelineEvents.DragFinished, args);
      return args;
    }
  }
  _emitDragEvent(): TimelineDragEvent {
    if (this._drag) {
      const args = this._getDragEventArgs();
      this.emit(TimelineEvents.Drag, args);

      return args;
    }

    return null;
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
    if (this._drag) {
      draggableArguments.val = this._currentPos.val;
      draggableArguments.pos = this._currentPos;
      draggableArguments.elements = this._drag.elements;
      draggableArguments.target = this._drag.target;
    }

    return draggableArguments;
  }
}
