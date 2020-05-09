import { TimelineEventsEmitter } from './timelineEventsEmitter';
import { TimelineUtils } from './utils/timelineUtils';
import { TimelineOptions } from './settings/timelineOptions';
import { TimelineConsts } from './settings/timelineConsts';
import { TimelineKeyframe } from './timelineKeyframe';
import { TimelineModel } from './timelineModel';
import { TimelineClickableElement } from './utils/timelineClickableElement';
import { TimelineRow } from './timelineRow';
import { TimelineCursorType } from './enums/timelineCursorType';
import { TimelineKeyframeShape } from './enums/timelineKeyframeShape';
import { TimelineStyleUtils } from './utils/timelineStyleUtils';
import { TimelineElementType } from './enums/timelineElementType';
import { TimelineEvents } from './enums/timelineEvents';
import { CutBoundsRect } from './utils/cutBoundsRect';
import { TimelineCapShape } from './enums/timelineCapShape';
import { RowSize, RowsCalculationsResults } from './utils/rowsCalculationsResults';
import { TimelineInteractionMode } from './enums/timelineInteractionMode';
import { TimelineScrollEvent } from './utils/events/timelineScrollEvent';
import { TimelineSelectedEvent } from './utils/events/timelineSelectedEvent';
import { TimelineDraggableData } from './utils/timelineDraggableData';
import { TimelineClickEvent } from './utils/events/timelineClickEvent';
import { TimelineDragEvent } from './utils/events/timelineDragEvent';
import { defaultTimelineConsts, defaultTimelineOptions } from './settings/defaults';
import { TimelineEventSource } from './enums/timelineEventSource';
import { TimelineTimeChangedEvent } from './utils/events/timelineTimeChangedEvent';

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
  _selectedKeyframes: Array<TimelineKeyframe> = [];
  _val = 0;
  /**
   * TODO: should be tested on retina.
   */
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
    document.addEventListener('keydown', this._handleDocumentKeydownEvent, false);
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
    document.removeEventListener('keydown', this._handleDocumentKeydownEvent);
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
  _handleDocumentKeydownEvent = (args: KeyboardEvent): boolean => {
    // ctrl + a. Select all keyframes
    if (args.which === 65 && this._controlKeyPressed(args)) {
      this._performSelection(true);
      args.preventDefault();
      return false;
    }
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
    const scrollEvent = {
      args: args,
      scrollLeft: this._scrollContainer.scrollLeft,
      scrollTop: this._scrollContainer.scrollTop,
      scrollHeight: this._scrollContainer.scrollHeight,
      scrollWidth: this._scrollContainer.scrollWidth,
    } as TimelineScrollEvent;
    super.emit(TimelineEvents.Scroll, scrollEvent);
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
        if (!target.keyframe.selected && !this._controlKeyPressed(args) && !args.shiftKey) {
          this._performSelection(true, target.keyframe);
        }
        // Allow to drag all selected keyframes on a screen
        this._drag.elements = this.getSelectedElements();
      } else if (target.type === TimelineElementType.Stripe) {
        const keyframes = this._drag.target.row.keyframes;
        this._drag.elements =
          keyframes && Array.isArray(keyframes)
            ? keyframes.map((keyframe) => {
                return this._convertToElement(this._drag.target.row, keyframe) as TimelineClickableElement;
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
        let isChanged = false;
        if (this._drag && !this._startedDragWithCtrl) {
          const convertedVal = this._mousePosToVal(this._currentPos.x, true);
          //redraw();
          if (this._drag.type === TimelineElementType.Timeline) {
            isChanged = this._setTimeInternal(convertedVal, TimelineEventSource.User) || isChanged;
          } else if ((this._drag.type == TimelineElementType.Keyframe || this._drag.type == TimelineElementType.Stripe) && this._drag.elements) {
            let offset = Math.floor(convertedVal - this._drag.val);
            if (Math.abs(offset) > 0) {
              // don't allow to move less than zero.
              this._drag.elements.forEach((p) => {
                if (this._options.snapAllKeyframesOnMove) {
                  const toSet = this.snapVal(p.keyframe.val);
                  isChanged = this._setKeyframePos(p.keyframe, toSet) || isChanged;
                }

                const newPosition = p.val + offset;
                if (newPosition < 0) {
                  offset = -p.val;
                }
              });

              if (Math.abs(offset) > 0) {
                // don't allow to move less than zero.
                this._drag.elements.forEach((element) => {
                  const toSet = element.keyframe.val + offset;
                  isChanged = this._setKeyframePos(element.keyframe, toSet) || isChanged;
                  if (isChanged) {
                    element.val = element.keyframe.val;
                  }
                });
              }

              if (isChanged) {
                if (!this._drag.changed) {
                  this._emitDragStartedEvent();
                }

                this._drag.changed = true;

                this._drag.val += offset;
                this._emitDragEvent();
              }
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
        if (target.type === TimelineElementType.Stripe) {
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
  _handleMouseUpEvent = (args: MouseEvent): void => {
    if (this._startPos) {
      //window.releaseCapture();
      const pos = this._trackMousePos(this._canvas, args);

      // Click detection.
      if (this._clickAllowed || !this._clickTimeoutIsOver() || (this._drag && this._startedDragWithCtrl) || (this._drag && this._startedDragWithShiftKey)) {
        this._performClick(pos, args, this._drag);
      } else if (!this._drag && this._selectionRect && this._selectionRectEnabled) {
        this._performSelection(true, this._selectionRect, args.shiftKey);
      }

      this._cleanUpSelection();
      this.redraw();
    }
  };

  _performClick(pos: MouseData, args: MouseEvent, drag: TimelineDraggableData): boolean {
    let isChanged = false;
    if (drag && drag.type === TimelineElementType.Keyframe) {
      let isSelected = true;
      if ((this._startedDragWithCtrl && this._controlKeyPressed(args)) || (this._startedDragWithShiftKey && args.shiftKey)) {
        if (this._controlKeyPressed(args)) {
          isSelected = !drag.target.keyframe.selected;
        }
      }
      // Reverse selected keyframe selection by a click:
      isChanged = this._performSelection(isSelected, this._drag.target.keyframe, this._controlKeyPressed(args) || args.shiftKey) || isChanged;

      if (args.shiftKey) {
        // change timeline pos:
        const convertedVal = this._mousePosToVal(pos.x, true);
        // Set current timeline position if it's not a drag or selection rect small or fast click.
        isChanged = this._setTimeInternal(convertedVal, TimelineEventSource.User) || isChanged;
      }
    } else {
      // deselect keyframes if any:
      isChanged = this._performSelection(false) || isChanged;

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
  _convertToElement(row: TimelineRow, keyframe: TimelineKeyframe): TimelineClickableElement {
    const data = {
      type: TimelineElementType.Keyframe,
      val: keyframe.val,
      keyframe: keyframe,
      row: row,
    } as TimelineClickableElement;
    return data;
  }

  public getSelectedElements(): Array<TimelineClickableElement> {
    const selected: Array<TimelineClickableElement> = [];
    this._forEachKeyframe((keyframe, index, rowModel): void => {
      if (keyframe && keyframe.selected) {
        selected.push(this._convertToElement(rowModel.row, keyframe));
      }
      return;
    });

    return selected;
  }

  /**
   * Do the selection.
   * @param {boolean} isSelected
   * @param {object} selector can be a rectangle or a keyframe object.
   * @param {boolean} ignoreOthers value indicating whether all other object should be reversed.
   * @return {boolean} isChanged
   */
  _performSelection(isSelected = true, selector: DOMRect | TimelineKeyframe | null = null, ignoreOthers = false): boolean {
    let deselectionMode = false;
    // TODO: simplify
    if (!selector) {
      if (!isSelected) {
        isSelected = false;
      }

      deselectionMode = isSelected;
    }

    this._selectedKeyframes.length = 0;
    let isChanged = true;
    this._forEachKeyframe((keyframe, keyframeIndex, rowSize): void => {
      const keyframePos = this._getKeyframePosition(keyframe, rowSize);

      if (keyframePos) {
        if ((selector && selector === keyframe) || TimelineUtils.isOverlap(keyframePos.x, keyframePos.y, selector as DOMRect)) {
          if (keyframe.selected != isSelected) {
            keyframe.selected = isSelected;
            isChanged = true;
          }

          if (keyframe.selected) {
            this._selectedKeyframes.push(keyframe);
          }
        } else {
          // Deselect all other keyframes.
          if (!ignoreOthers && keyframe.selected != deselectionMode) {
            keyframe.selected = deselectionMode;
            isChanged = deselectionMode;
          }
        }
      }

      return;
    });

    if (isChanged) {
      this._emitKeyframesSelected(this._selectedKeyframes);
    }

    return isChanged;
  }

  /**
   * foreach visible keyframe.
   */
  _forEachKeyframe(callback: (keyframe: TimelineKeyframe, keyframeIndex?: number, row?: RowSize, index?: number, newRow?: boolean) => void, calculateStripesBounds = false): void {
    if (!this._model) {
      return;
    }

    const model = this._calculateRowsBounds(calculateStripesBounds);
    if (!model) {
      return;
    }

    model.rows.forEach((rowSize, index) => {
      if (!rowSize) {
        return;
      }
      const row = rowSize.row;
      if (!row || !row.keyframes || !Array.isArray(row.keyframes) || row.keyframes.length <= 0) {
        return;
      }

      let nextRow = true;
      row.keyframes
        .filter((p) => p && !p.hidden)
        .forEach((keyframe: TimelineKeyframe, keyframeIndex) => {
          if (callback && keyframe) {
            callback(keyframe, keyframeIndex, rowSize, index, nextRow);
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
    this._scrollContainer.scrollTop = Math.round(start.y - pos.y);
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
    if (!absolute) {
      const x = this._scrollContainer.scrollLeft;
      ms -= this.pxToVal(x);
    }

    return (ms * this._options.stepPx) / this._options.zoom;
  }

  /**
   * Snap a value to a nearest beautiful point.
   */
  public snapVal(ms: number): number {
    // Apply snap to steps if enabled.
    if (this._options.snapsPerSeconds && this._options.snapEnabled) {
      const stopsPerPixel = 1000 / this._options.snapsPerSeconds;
      const step = ms / stopsPerPixel;
      const stepsFit = Math.round(step);
      ms = Math.round(stepsFit * stopsPerPixel);
    }

    // TODO: allow negative values.
    if (ms < 0) {
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
    let from = this.pxToVal(0);
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
      TimelineUtils.drawLine(this._ctx, sharpPos, (this._options.headerHeight || 0) / 2, sharpPos, this._canvas.clientHeight);
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
        TimelineUtils.drawLine(this._ctx, nextSharpPos, (this._options.headerHeight || 0) / 1.3, nextSharpPos, this._options.headerHeight);
        this._ctx.stroke();
      }
    }

    this._ctx.restore();
  }

  /**
   * calculate screen positions of the model elements.
   */
  _calculateRowsBounds(includeStipesBounds = true): RowsCalculationsResults {
    const toReturn = {
      rows: [],
      area: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      } as DOMRect,
      minValue: null,
      maxValue: null,
    } as RowsCalculationsResults;

    if (!this._model) {
      return toReturn;
    }
    const rows = this._model.rows;
    if (!rows || !Array.isArray(rows) || rows.length <= 0) {
      return toReturn;
    }
    let rowAbsoluteHeight = this._options.headerHeight;
    rows
      .filter((p) => p && !p.hidden)
      .forEach((row, index) => {
        if (!row) {
          return;
        }

        // draw with scroll virtualization:
        const rowHeight = TimelineStyleUtils.getRowHeight(row, this._options);
        const marginBottom = TimelineStyleUtils.getRowMarginBottom(row, this._options);
        const currentRowY = rowAbsoluteHeight - this._scrollContainer.scrollTop;
        rowAbsoluteHeight += rowHeight + marginBottom;
        if (index == 0) {
          toReturn.area.y = currentRowY;
        }

        toReturn.area.height = Math.max(rowAbsoluteHeight + rowHeight, toReturn.area.height);

        const rowData = {
          x: 0,
          y: currentRowY,
          width: this._canvas.clientWidth,
          height: rowHeight,
          marginBottom: marginBottom,
          row: row,
          index: index,
          minValue: null,
          maxValue: null,
        } as RowSize;

        toReturn.rows.push(rowData);
        if (!includeStipesBounds && (!row.keyframes || !row.keyframes.forEach || row.keyframes.length <= 0)) {
          return;
        }

        // Get min and max ms to draw keyframe rows:
        if (row && row.keyframes) {
          row.keyframes.forEach((keyframe) => {
            const val = keyframe.val;

            if (keyframe && !isNaN(val)) {
              rowData.minValue = rowData.minValue == null ? val : Math.min(val, rowData.minValue);
              rowData.maxValue = rowData.maxValue == null ? val : Math.max(val, rowData.maxValue);
            }
          });
        }
        // get keyframes stripe size
        if (!isNaN(rowData.minValue) && !isNaN(rowData.maxValue)) {
          // get stripe screen coords
          const stripeRect = this._getKeyframesStripeSize(row, rowData.y, rowData.minValue, rowData.maxValue);
          rowData.stripeRect = stripeRect;
        }

        // get absolute min and max bounds:
        if (toReturn.minValue !== null && rowData.minValue !== null) {
          toReturn.minValue = Math.min(rowData.minValue, toReturn.minValue);
        } else if (rowData.minValue !== null) {
          toReturn.minValue = rowData.minValue;
        }

        if (toReturn.maxValue !== null && rowData.maxValue !== null) {
          toReturn.maxValue = Math.min(rowData.maxValue, toReturn.maxValue);
        } else if (rowData.maxValue !== null) {
          toReturn.maxValue = rowData.maxValue;
        }
      });
    if (toReturn.maxValue !== null) {
      toReturn.area.width = this.valToPx(toReturn.maxValue, true);
    }
    return toReturn;
  }

  _renderRows(): void {
    const data = this._calculateRowsBounds();
    if (data && data.rows) {
      this._ctx.save();
      data.rows.forEach((rowData) => {
        if (!rowData) {
          return;
        }

        this._ctx.fillStyle = TimelineStyleUtils.getRowStyle<string>(rowData.row, this._options, 'fillColor', '#252526');
        //this._ctx.fillRect(data.areaRect.x, data.areaRect.y, data.areaRect.w, data.areaRect.h);
        // Note: bounds used instead of the clip while clip is slow!
        const bounds = this._cutBounds(rowData);
        if (bounds) {
          this._ctx.fillRect(bounds.x, bounds.y, bounds.width, bounds.height);
        }

        const keyframeLaneColor = TimelineStyleUtils.stripeFillColor(rowData.row, this._options);

        if ((rowData.row.keyframes && rowData.row.keyframes.length <= 1) || !keyframeLaneColor) {
          return;
        }

        // get the bounds on a canvas
        const rectBounds = this._cutBounds(rowData.stripeRect);
        if (rectBounds) {
          this._ctx.fillStyle = keyframeLaneColor;
          this._ctx.fillRect(rectBounds.x, rectBounds.y, rectBounds.width, rectBounds.height);
        }
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
      minY = this._options.headerHeight || 0,
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
   * get keyframe stripe screen rect coordinates.
   * @param row
   * @param rowY row screen coords y position
   */
  _getKeyframesStripeSize(row: TimelineRow, rowY: number, minValue: number, maxValue: number): DOMRect {
    let stripeHeight: number | string = TimelineStyleUtils.rowStripeHeight(row, this._options);

    const height = TimelineStyleUtils.getRowHeight(row, this._options);
    if ((!stripeHeight && stripeHeight !== 0) || isNaN(stripeHeight as number) || stripeHeight == 'auto') {
      stripeHeight = Math.floor(height * 0.7);
    }

    if (stripeHeight > height) {
      stripeHeight = height;
    }

    const margin = height - (stripeHeight as number);

    // draw keyframes rows.
    const xMin = this.valToPx(minValue);
    const xMax = this.valToPx(maxValue);

    return {
      x: xMin,
      y: rowY + Math.floor(margin / 2),
      height: stripeHeight,
      width: TimelineUtils.getDistance(xMin, xMax),
    } as DOMRect;
  }

  _getKeyframePosition(keyframe: TimelineKeyframe, rowSize: RowSize): DOMRect | null {
    if (!keyframe) {
      console.log('keyframe should be defined.');
      return null;
    }

    const val = keyframe.val;
    if (isNaN(val)) {
      return null;
    }

    // get center of the lane:
    const y = rowSize.y + rowSize.height / 2;

    // TODO: keyframe size:
    let size = 1; //this._options.keyframeSizePx || keyframe.size;
    //if (size == "auto") {
    size = rowSize.height / 3;
    //}

    if (size > 0) {
      if (!isNaN(val)) {
        const toReturn = {
          x: Math.floor(this.valToPx(val)),
          y: Math.floor(y),
          height: size,
          width: size,
        } as DOMRect;
        return toReturn;
      }
    }

    return null;
  }

  _renderKeyframes(): void {
    this._forEachKeyframe((keyframe, keyframeIndex, rowSize): boolean => {
      const row = rowSize.row;
      const pos = this._getKeyframePosition(keyframe, rowSize);
      if (pos) {
        let x = this._getSharp(pos.x);
        let y = pos.y;
        const size = pos.height;
        const bounds = this._cutBounds({
          x: x - size / 2,
          y: y - size / 2,
          width: size,
          height: size,
        } as DOMRect);
        if (!bounds) {
          return;
        }

        this._ctx.save();

        // Performance FIX: use clip only  when we are in the collision! Clip is slow!
        // Other keyframes should be hidden by bounds check.
        if (bounds && bounds.overlapY) {
          this._ctx.beginPath();
          this._ctx.rect(0, this._options.headerHeight || 0, this._canvas.clientWidth, this._canvas.clientWidth);
          this._ctx.clip();
        }

        const shape = TimelineStyleUtils.getKeyframeStyle<TimelineKeyframeShape>(keyframe, row, this._options, 'shape', TimelineKeyframeShape.Rhomb);
        if (shape === TimelineKeyframeShape.None) {
          return;
        }

        const keyframeColor = TimelineStyleUtils.getKeyframeStyle<string>(
          keyframe,
          row,
          this._options,
          keyframe.selected ? 'fillColor' : 'selectedFillColor',
          keyframe.selected ? 'red' : 'DarkOrange',
        );
        const border = TimelineStyleUtils.getKeyframeStyle<number>(keyframe, row, this._options, 'strokeThickness', 0.2);
        const strokeColor = border > 0 ? TimelineStyleUtils.getKeyframeStyle<string>(keyframe, row, this._options, 'strokeColor', 'Black') : '';

        if (shape == TimelineKeyframeShape.Rhomb) {
          this._ctx.beginPath();
          this._ctx.translate(x, y);
          this._ctx.rotate((45 * Math.PI) / 180);
          if (border > 0 && strokeColor) {
            this._ctx.fillStyle = strokeColor;
            this._ctx.rect(-size / 2, -size / 2, size, size);
            this._ctx.fill();
          }

          this._ctx.fillStyle = keyframeColor;
          // draw main keyframe data with offset.
          this._ctx.translate(border, border);
          this._ctx.rect(-size / 2, -size / 2, size - border * 2, size - border * 2);
          this._ctx.fill();
        } else if (shape == TimelineKeyframeShape.Circle) {
          this._ctx.beginPath();
          if (border > 0 && strokeColor) {
            this._ctx.fillStyle = strokeColor;
            this._ctx.arc(x, y, size, 0, 2 * Math.PI);
          }
          this._ctx.fillStyle = keyframeColor;
          this._ctx.arc(x, y, size - border, 0, 2 * Math.PI);
          this._ctx.fill();
        } else if (shape == TimelineKeyframeShape.Rect) {
          this._ctx.beginPath();
          y = y - size / 2;
          x = x - size / 2;
          if (border > 0 && strokeColor) {
            this._ctx.fillStyle = strokeColor;
            this._ctx.rect(x, y, size, size);
            this._ctx.fill();
          }

          this._ctx.fillStyle = keyframeColor;
          this._ctx.rect(x + border, y + border, size - border, size - border);
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
    if (!isNaN(this._options.headerHeight) && this._options.headerHeight > 0) {
      this._ctx.save();
      // draw ticks background
      this._ctx.lineWidth = this._pixelRatio;
      if (this._options.headerFillColor) {
        // draw ticks background
        this._ctx.lineWidth = this._pixelRatio;
        // draw header background
        this._ctx.fillStyle = this._options.headerFillColor;
        this._ctx.fillRect(0, 0, this._canvas.clientWidth, this._options.headerHeight);
      } else {
        this._ctx.clearRect(0, 0, this._canvas.clientWidth, this._options.headerHeight);
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
    const model = this._calculateRowsBounds();
    if (model && model.rows) {
      for (let i = 0; i < model.rows.length; i++) {
        const row = model.rows[i];
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
      const timelineEvent = new TimelineTimeChangedEvent();
      timelineEvent.val = val;
      const prevVal = this._val;
      timelineEvent.prevVal = prevVal;
      timelineEvent.source = source;
      this._val = val;
      this.emit(TimelineEvents.Selected, timelineEvent);
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

  public select(value = true): void {
    this._performSelection(value);
    this.redraw();
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
    const data = this._calculateRowsBounds();
    if (data && data.area) {
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
      const keyframeW = data.area.width + this._options.leftMargin + additionalOffset;

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

      newHeight = Math.max(Math.floor(data.area.height + this._canvas.clientHeight * 0.2), this._scrollContainer.scrollTop + this._canvas.clientHeight - 1, Math.round(newHeight || 0));

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
  _findDraggable(elements: Array<TimelineClickableElement>, val: number | null = null): TimelineClickableElement {
    // filter and sort: Timeline, individual keyframes, stripes (distance).
    const getPriority = (type: TimelineElementType): number => {
      if (type === TimelineElementType.Timeline) {
        return 1;
      } else if (type === TimelineElementType.Keyframe) {
        return 2;
      } else if (type === TimelineElementType.Stripe) {
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
      } else if (element.type === TimelineElementType.Stripe) {
        if (!TimelineStyleUtils.stripeDraggable(element.row, this._options)) {
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
  public elementFromPoint(pos: DOMPoint, clickRadius = 2): Array<TimelineClickableElement> {
    clickRadius = Math.max(clickRadius, 1);
    const toReturn: Array<TimelineClickableElement> = [];

    if (!pos) {
      return toReturn;
    }

    // Check whether we can drag timeline.
    const timeLinePos = this.valToPx(this._val);
    let width = 0;
    if (this._options && this._options.timelineStyle) {
      const timelineStyle = this._options.timelineStyle;
      width = Math.max((timelineStyle.width || 1) * this._pixelRatio, (timelineStyle.capWidth || 0) * this._pixelRatio || 1) + clickRadius;
    }
    // Allow to select timeline only by half of a header to allow select by a selector top most keyframes row.
    if (pos.y <= this._options.headerHeight * 0.5 || (pos.x >= timeLinePos - width / 2 && pos.x <= timeLinePos + width / 2)) {
      toReturn.push({
        val: this._val,
        type: TimelineElementType.Timeline,
      } as TimelineClickableElement);
    }

    if (pos.y >= this._options.headerHeight && this._options.keyframesDraggable) {
      this._forEachKeyframe((keyframe, keyframeIndex, rowModel, rowIndex, isNextRow): void => {
        // Check keyframes stripe overlap
        if (isNextRow && rowModel.stripeRect) {
          const rowOverlapped = TimelineUtils.isOverlap(pos.x, pos.y, rowModel);
          if (rowOverlapped) {
            const row = {
              val: this._mousePosToVal(pos.x, true),
              type: TimelineElementType.Row,
              row: rowModel.row,
            } as TimelineClickableElement;
            toReturn.push(row);
          }

          const keyframesStripeOverlapped = TimelineUtils.isOverlap(pos.x, pos.y, rowModel.stripeRect);
          if (keyframesStripeOverlapped) {
            const stripe = {
              val: this._mousePosToVal(pos.x, true),
              type: TimelineElementType.Stripe,
              row: rowModel.row,
            } as TimelineClickableElement;

            const snapped = this.snapVal(rowModel.minValue);
            // get snapped mouse pos based on a min value.
            stripe.val += rowModel.minValue - snapped;
            toReturn.push(stripe);
          }
        }

        const keyframePos = this._getKeyframePosition(keyframe, rowModel);
        if (keyframePos) {
          const dist = TimelineUtils.getDistance(keyframePos.x, keyframePos.y, pos.x, pos.y);
          if (dist <= keyframePos.height + clickRadius) {
            toReturn.push({
              keyframe: keyframe,
              val: keyframe.val,
              row: rowModel.row,
              type: TimelineElementType.Keyframe,
            } as TimelineClickableElement);
          }
        }
        return;
      }, true);
    }
    return toReturn;
  }

  /**
   * Merge options with the defaults.
   */
  _mergeOptions(toSet: TimelineOptions): TimelineOptions {
    toSet = toSet || ({} as TimelineOptions);
    // Apply incoming options to default. (override default)
    // Deep clone default options:
    const options = JSON.parse(JSON.stringify(defaultTimelineOptions));
    // Merge options with the default.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mergeOptionsDeep = (to: any, from: any): void => {
      if (!to || !from) {
        return;
      }
      // eslint-disable-next-line prefer-const
      for (let key in to) {
        if (Object.prototype.hasOwnProperty.call(from, key)) {
          if (to[key] == undefined) {
            to[key] = from[key];
          } else if (typeof to[key] === 'object') {
            mergeOptionsDeep(to[key], from[key]);
          }
        }
      }
    };

    mergeOptionsDeep(options, toSet);
    return options;
  }
  /**
   * Subscribe on time changed.
   */
  public onTimeChanged(callback: (eventArgs: TimelineTimeChangedEvent) => void): void {
    this.on(TimelineEvents.DragStarted, callback);
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

  /**
   * Subscribe on scroll event
   */
  public onScroll(callback: (eventArgs: TimelineScrollEvent) => void): void {
    this.on(TimelineEvents.Scroll, callback);
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
      this.emit(TimelineEvents.Drag, {
        keyframes: this._drag.elements,
      });

      return args;
    }

    return null;
  }
  _emitKeyframesSelected(selectedKeyframes: Array<TimelineKeyframe>): void {
    // TODO: refine, add changed
    this.emit(TimelineEvents.Selected, {
      keyframes: selectedKeyframes,
    } as TimelineSelectedEvent);
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
