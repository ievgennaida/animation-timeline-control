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
import { TimelineStyleUtils } from './settings/timelineStyleUtils';
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
  private container: HTMLElement = null;
  /**
   * Dynamically generated event.
   */
  private canvas: HTMLCanvasElement = null;
  /**
   * Dynamically generated scroll container.
   */
  private scrollContainer: HTMLElement = null;
  /**
   * Dynamically generated virtual scroll content.
   */
  private scrollContent: HTMLElement = null;
  /**
   * Rendering context
   */
  private ctx: CanvasRenderingContext2D = null;
  /**
   * Components settings
   */
  private options: TimelineOptions = null;
  /**
   * Drag start position.
   */
  private startPos: MouseData = null;
  /**
   * Drag scroll started position.
   */
  private scrollStartPos: DOMPoint | null = { x: 0, y: 0 } as DOMPoint;
  private currentPos: MouseData = null;

  private selectionRect: DOMRect = null;
  private selectionRectEnabled = false;
  private drag: TimelineDraggableData | null = null;
  private startedDragWithCtrl = false;
  private startedDragWithShiftKey = false;

  private clickTimeout? = 0;
  private lastClickTime = 0;
  private consts = new TimelineConsts();
  /**
   * scroll finished timer reference.
   */
  private scrollFinishedTimerRef?: number = null;
  private selectedKeyframes: Array<TimelineKeyframe> = [];
  private val = 0;
  /**
   * TODO: should be tested on retina.
   */
  private pixelRatio = 1;
  private currentZoom = 0;
  private intervalRef?: number = null;
  private autoPanLastActionDate = 0;
  private isPanStarted = false;
  private interactionMode = TimelineInteractionMode.Selection;
  private lastUsedArgs: MouseEvent | TouchEvent = null;
  private model: TimelineModel;
  /**
   *
   * @param options
   * @param model
   */
  constructor(options: TimelineOptions, model: TimelineModel) {
    super();
    const id = options.id;
    this.model = model;
    if (!id) {
      throw new Error(`Element cannot be empty. Should be string or DOM element.`);
    }
    this.options = this.mergeOptions(options);
    this.currentZoom = this.options.zoom;
    if (id instanceof HTMLElement) {
      this.container = id as HTMLElement;
    } else {
      this.container = document.getElementById(id);
    }

    if (!this.container) {
      throw new Error(`Element cannot be empty. Should be string or DOM element.`);
    }

    this.scrollContainer = document.createElement('div');
    this.scrollContent = document.createElement('div');
    this.canvas = document.createElement('canvas');

    if (!this.canvas || !this.canvas.getContext) {
      console.log('Cannot initialize canvas context.');
      return null;
    }

    this.container.style.position = 'relative';
    // Generate size container:
    this.canvas.style.cssText =
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

    this.scrollContainer.classList.add(this.options.scrollContainerClass);
    this.scrollContainer.style.cssText = 'overflow: scroll;' + 'position: absolute;' + 'width:  100%;' + 'height:  100%;';

    this.scrollContent.style.width = this.scrollContent.style.height = '100%';

    // add the text node to the created div
    this.scrollContainer.appendChild(this.scrollContent);
    this.container.appendChild(this.scrollContainer);
    const scrollBarWidth = this.scrollContainer.offsetWidth - this.scrollContent.clientWidth;
    // Calculate current browser scroll bar size and add offset for the canvas
    this.canvas.style.width = this.canvas.style.height = 'calc(100% -' + (scrollBarWidth || 17) + 'px)';

    this.container.appendChild(this.canvas);

    if (this.options.fillColor) {
      this.scrollContainer.style.background = this.options.fillColor;
    }

    // Normalize and validate span per seconds
    this.options.snapsPerSeconds = Math.max(0, Math.min(60, this.options.snapsPerSeconds || 0));

    this.ctx = this.canvas.getContext('2d');
    this.subscribeOnEvents();
    this.rescale();
    this.redraw();
  }

  /**
   * Subscribe current component on the related events.
   */
  private subscribeOnEvents(): void {
    this.container.addEventListener('wheel', this.handleWheelEvent);

    if (this.scrollContainer) {
      this.scrollContainer.addEventListener('scroll', this.handleScrollEvent);
    }

    window.addEventListener('blur', this.handleBlurEvent, false);
    window.addEventListener('resize', this.handleWindowResizeEvent, false);
    document.addEventListener('keydown', this.handleDocumentKeydownEvent, false);
    this.canvas.addEventListener('touchstart', this.handleMouseDownEvent, false);
    this.canvas.addEventListener('mousedown', this.handleMouseDownEvent, false);
    window.addEventListener('mousemove', this.handleMouseMoveEvent, false);
    window.addEventListener('touchmove', this.handleMouseMoveEvent, false);
    window.addEventListener('mouseup', this.handleMouseUpEvent, false);
    window.addEventListener('touchend', this.handleMouseUpEvent, false);
  }

  public dispose(): void {
    // Unsubscribe all events
    this.offAll();
    this.container = null;
    this.canvas = null;
    this.scrollContainer = null;
    this.scrollContent = null;
    this.ctx = null;
    this.cleanUpSelection();

    this.container.removeEventListener('wheel', this.handleWheelEvent);

    if (this.scrollContainer) {
      this.scrollContainer.removeEventListener('scroll', this.handleScrollEvent);
    }

    window.removeEventListener('blur', this.handleBlurEvent);
    window.removeEventListener('resize', this.handleWindowResizeEvent);
    document.removeEventListener('keydown', this.handleDocumentKeydownEvent);
    this.canvas.removeEventListener('touchstart', this.handleMouseDownEvent);
    this.canvas.removeEventListener('mousedown', this.handleMouseDownEvent);
    window.removeEventListener('mousemove', this.handleMouseMoveEvent);
    window.removeEventListener('touchmove', this.handleMouseMoveEvent);
    window.removeEventListener('mouseup', this.handleMouseUpEvent);
    window.removeEventListener('touchend', this.handleMouseUpEvent);
    // Stop times
    this.stopAutoPan();
    this.clearScrollFinishedTimer();
  }
  private handleBlurEvent = (): void => {
    this.cleanUpSelection();
  };
  private handleWindowResizeEvent = (): void => {
    // Rescale and redraw
    this.rescale();
    this.redraw();
  };
  private handleDocumentKeydownEvent = (args: KeyboardEvent): boolean => {
    // ctrl + a. Select all keyframes
    if (args.which === 65 && this.controlKeyPressed(args)) {
      this.performSelection(true);
      args.preventDefault();
      return false;
    }
  };

  private clearScrollFinishedTimer(): void {
    if (this.scrollFinishedTimerRef) {
      clearTimeout(this.scrollFinishedTimerRef);
      this.scrollFinishedTimerRef = null;
    }
  }
  private handleScrollEvent = (args: MouseEvent): void => {
    this.clearScrollFinishedTimer();
    // Set a timeout to run event 'scrolling end'.
    this.scrollFinishedTimerRef = setTimeout(() => {
      if (!this.isPanStarted) {
        if (this.scrollFinishedTimerRef) {
          clearTimeout(this.scrollFinishedTimerRef);
          this.scrollFinishedTimerRef = null;
        }

        this.rescale();
        this.redraw();
      }
    }, this.consts.scrollFinishedTimeoutMs);

    this.redraw();
    const scrollData = (args || {}) as TimelineScrollEvent;
    scrollData.scrollLeft = this.scrollContainer.scrollLeft;
    scrollData.scrollTop = this.scrollContainer.scrollTop;
    scrollData.scrollHeight = this.scrollContainer.scrollHeight;
    scrollData.scrollWidth = this.scrollContainer.scrollWidth;
    super.emit(TimelineEvents.Scroll, scrollData);
  };
  private handleWheelEvent = (event: WheelEvent): void => {
    if (this.controlKeyPressed(event)) {
      event.preventDefault();
      if (this.options.zoomSpeed > 0 && this.options.zoomSpeed <= 1) {
        const mousePos = this.getMousePos(this.canvas, event);
        let x = mousePos.x;
        if (x <= 0) x = 0;
        const val = this.pxToVal(this.scrollContainer.scrollLeft + x, false);
        const diff = this.canvas.clientWidth / x;

        const zoom = TimelineUtils.sign(event.deltaY) * this.options.zoom * this.options.zoomSpeed;
        this.currentZoom += zoom;
        if (this.currentZoom > this.options.zoomMax) {
          this.currentZoom = this.options.zoomMax;
        }
        if (this.currentZoom < this.options.zoomMin) {
          this.currentZoom = this.options.zoomMin;
        }
        const zoomCenter = this.valToPx(val, true);
        let newScrollLeft = Math.round(zoomCenter - this.canvas.clientWidth / diff);
        if (newScrollLeft <= 0) {
          newScrollLeft = 0;
        }

        this.rescale(newScrollLeft + this.canvas.clientWidth, null, 'zoom');
        if (this.scrollContainer.scrollLeft != newScrollLeft) {
          this.scrollContainer.scrollLeft = newScrollLeft;
          // Scroll event will redraw the screen.
        }

        this.redraw();
      }
    } else {
      this.scrollContainer.scrollTop += event.deltaY;
      event.preventDefault();
    }
  };
  /**
   * @param args
   */
  private handleMouseDownEvent = (args: MouseEvent): void => {
    const isDoubleClick = Date.now() - this.lastClickTime < this.consts.doubleClickTimeoutMs;

    // Prevent drag of the canvas if canvas is selected as text:
    TimelineUtils.clearBrowserSelection();
    this.startPos = this.trackMousePos(this.canvas, args);
    if (!this.startPos) {
      return;
    }
    this.scrollStartPos = {
      x: this.scrollContainer.scrollLeft,
      y: this.scrollContainer.scrollTop,
    } as DOMPoint;

    const elements = this.elementFromPoint(this.startPos, Math.max(2, this.startPos.radius));
    const target = this.findDraggable(elements, this.startPos.val);
    const event = new TimelineClickEvent();
    event.pos = this.startPos;
    event.val = this.startPos.val;
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

    this.clickTimeout = Date.now();
    this.lastClickTime = Date.now();
    if (event.isPrevented()) {
      this.cleanUpSelection();
      return;
    }

    this.currentPos = this.startPos;

    // Select keyframes on mouse down
    if (target) {
      this.drag = {
        changed: false,
        target: target,
        val: target.val,
        type: target.type,
        elements: [],
      } as TimelineDraggableData;

      if (target.type === TimelineElementType.Keyframe) {
        this.startedDragWithCtrl = this.controlKeyPressed(args);
        this.startedDragWithShiftKey = args.shiftKey;
        // get all related selected keyframes if we are selecting one.
        if (!target.keyframe.selected && !this.controlKeyPressed(args) && !args.shiftKey) {
          this.performSelection(true, target.keyframe);
        }

        this.drag.elements = this.getSelectedElements();
      } else if (target.type === TimelineElementType.Stripe) {
        const keyframes = this.drag.target.row.keyframes;
        this.drag.elements =
          keyframes && Array.isArray(keyframes)
            ? keyframes.map((keyframe) => {
                return this.convertToElement(this.drag.target.row, keyframe) as TimelineClickableElement;
              })
            : [];
      }
    }

    this.redraw();
  };

  private handleMouseMoveEvent = (args: MouseEvent | TouchEvent): void => {
    if (!args) {
      args = this.lastUsedArgs;
    } else {
      this.lastUsedArgs = args;
    }
    if (!args) {
      return;
    }
    const isTouch = args instanceof TouchEvent && args.changedTouches && args.changedTouches.length > 0;
    this.currentPos = this.trackMousePos(this.canvas, args);
    if (!this.isPanStarted && this.selectionRect && this.clickTimeoutIsOver()) {
      this.selectionRectEnabled = true;
    }

    args = args as MouseEvent;
    if (this.startPos) {
      if (args.buttons == 1 || isTouch) {
        let isChanged = false;
        if (this.drag && !this.startedDragWithCtrl) {
          const convertedVal = this.mousePosToVal(this.currentPos.x, true);
          //redraw();
          if (this.drag.type === TimelineElementType.Timeline) {
            isChanged = this.setTimeInternal(convertedVal, 'user') || isChanged;
          } else if ((this.drag.type == TimelineElementType.Keyframe || this.drag.type == TimelineElementType.Stripe) && this.drag.elements) {
            let offset = Math.floor(convertedVal - this.drag.val);
            if (Math.abs(offset) > 0) {
              // don't allow to move less than zero.
              this.drag.elements.forEach((p) => {
                if (this.options.snapAllKeyframesOnMove) {
                  const toSet = this.snapVal(p.keyframe.val);
                  isChanged = this.setKeyframePos(p.keyframe, toSet) || isChanged;
                }

                const newPosition = p.val + offset;
                if (newPosition < 0) {
                  offset = -p.val;
                }
              });

              if (Math.abs(offset) > 0) {
                // don't allow to move less than zero.
                this.drag.elements.forEach((element) => {
                  const toSet = element.keyframe.val + offset;
                  isChanged = this.setKeyframePos(element.keyframe, toSet) || isChanged;
                  if (isChanged) {
                    element.val = element.keyframe.val;
                  }
                });
              }

              if (isChanged) {
                if (!this.drag.changed) {
                  this.emitDragStartedEvent();
                }

                this.drag.changed = true;

                this.drag.val += offset;
                this.emitDragEvent();
              }
            }
          }
        }

        if (this.interactionMode === TimelineInteractionMode.Pan && !this.drag) {
          this.isPanStarted = true;
          // Track scroll by drag.
          this.scrollByPan(this.startPos, this.currentPos, this.scrollStartPos);
        } else {
          // Track scroll by mouse or touch out of the area.
          this.scrollBySelectionOutOfBounds(this.currentPos);
        }
        this.redraw();
      } else {
        // Fallback. Cancel mouse move when focus was lost and mouse down is still counted.
        this.cleanUpSelection();
        this.redraw();
      }
    } else if (!isTouch) {
      // TODO: mouse over event
      const elements = this.elementFromPoint(this.currentPos, Math.max(2, this.currentPos.radius));
      const target = this.findDraggable(elements, this.currentPos.val);
      this.setCursor('default');
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
          this.setCursor(cursor);
        }
      }
    }

    if (isTouch) {
      args.preventDefault();
    }
  };
  private handleMouseUpEvent = (args: MouseEvent): void => {
    if (this.startPos) {
      //window.releaseCapture();
      const pos = this.trackMousePos(this.canvas, args);

      // Click detection.
      if (
        (this.selectionRect && this.selectionRect.height <= 2 && this.selectionRect.width <= 2) ||
        !this.clickTimeoutIsOver() ||
        (this.drag && this.startedDragWithCtrl) ||
        (this.drag && this.startedDragWithShiftKey)
      ) {
        this.performClick(pos, args, this.drag);
      } else if (!this.drag && this.selectionRect && this.selectionRectEnabled) {
        this.performSelection(true, this.selectionRect, args.shiftKey);
      }

      this.cleanUpSelection();
      this.redraw();
    }
  };

  private performClick(pos: MouseData, args: MouseEvent, drag: TimelineDraggableData): boolean {
    let isChanged = false;
    if (drag && drag.type === TimelineElementType.Keyframe) {
      let isSelected = true;
      if ((this.startedDragWithCtrl && this.controlKeyPressed(args)) || (this.startedDragWithShiftKey && args.shiftKey)) {
        if (this.controlKeyPressed(args)) {
          isSelected = !drag.target.keyframe.selected;
        }
      }
      // Reverse selected keyframe selection by a click:
      isChanged = this.performSelection(isSelected, this.drag.target.keyframe, this.controlKeyPressed(args) || args.shiftKey) || isChanged;

      if (args.shiftKey) {
        // change timeline pos:
        const convertedVal = this.mousePosToVal(pos.x, true);
        // Set current timeline position if it's not a drag or selection rect small or fast click.
        isChanged = this.setTimeInternal(convertedVal, 'user') || isChanged;
      }
    } else {
      // deselect keyframes if any:
      isChanged = this.performSelection(false) || isChanged;

      // change timeline pos:
      // Set current timeline position if it's not a drag or selection rect small or fast click.
      isChanged = this.setTimeInternal(this.mousePosToVal(pos.x, true), 'user') || isChanged;
    }

    return isChanged;
  }
  /**
   * Set keyframe value.
   * @param keyframe
   * @param value
   */
  private setKeyframePos(keyframe: TimelineKeyframe, value: number): boolean {
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
  private setCursor(cursor: string): void {
    if (this.canvas.style.cursor != cursor) {
      this.canvas.style.cursor = cursor;
    }
  }

  /**
   * Set pan mode
   * @param isPan
   */
  public setInteractionMode(mode: TimelineInteractionMode): void {
    if (this.interactionMode != mode) {
      this.interactionMode = mode;
      // Avoid any conflicts with other modes:
      this.cleanUpSelection();
    }
  }

  private convertToElement(row: TimelineRow, keyframe: TimelineKeyframe): TimelineClickableElement {
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
    this.forEachKeyframe((keyframe, index, rowModel): boolean => {
      if (keyframe && keyframe.selected) {
        selected.push(this.convertToElement(rowModel.row, keyframe));
      }
      return false;
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
  private performSelection(isSelected = true, selector: DOMRect | TimelineKeyframe | null = null, ignoreOthers = false): boolean {
    let deselectionMode = false;
    // TODO: simplify
    if (!selector) {
      if (!isSelected) {
        isSelected = false;
      }

      deselectionMode = isSelected;
    }

    this.selectedKeyframes.length = 0;
    let isChanged = true;
    this.forEachKeyframe((keyframe, keyframeIndex, rowSize): boolean => {
      const keyframePos = this.getKeyframePosition(keyframe, rowSize);

      if (keyframePos) {
        if ((selector && selector === keyframe) || TimelineUtils.isOverlap(keyframePos.x, keyframePos.y, selector as DOMRect)) {
          if (keyframe.selected != isSelected) {
            keyframe.selected = isSelected;
            isChanged = true;
          }

          if (keyframe.selected) {
            this.selectedKeyframes.push(keyframe);
          }
        } else {
          // Deselect all other keyframes.
          if (!ignoreOthers && keyframe.selected != deselectionMode) {
            keyframe.selected = deselectionMode;
            isChanged = deselectionMode;
          }
        }
      }

      return false;
    });

    if (isChanged) {
      this.emitKeyframesSelected(this.selectedKeyframes);
    }

    return isChanged;
  }

  /**
   * foreach visible keyframe.
   */
  private forEachKeyframe(callback: (keyframe: TimelineKeyframe, keyframeIndex?: number, row?: RowSize, index?: number, newRow?: boolean) => boolean, calculateStripesBounds = false): void {
    if (!this.model) {
      return;
    }

    const model = this.calculateRowsBounds(calculateStripesBounds);
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
        .find((keyframe: TimelineKeyframe, keyframeIndex) => {
          if (callback && keyframe) {
            const isBreak = callback(keyframe, keyframeIndex, rowSize, index, nextRow);
            if (isBreak) {
              return true;
            }
          }

          nextRow = false;
        });
    });
  }

  private trackMousePos(canvas: HTMLCanvasElement, mouseArgs: MouseEvent | TouchEvent): MouseData {
    const pos = this.getMousePos(canvas, mouseArgs) as MouseData;
    pos.val = this.pxToVal(pos.x + this.scrollContainer.scrollLeft);
    pos.snapVal = this.snapVal(pos.val);
    if (this.startPos) {
      if (!this.selectionRect) {
        this.selectionRect = {} as DOMRect;
      }

      // get the pos with the virtualization:
      const x = Math.floor(this.startPos.x + (this.scrollStartPos.x - this.scrollContainer.scrollLeft));
      const y = Math.floor(this.startPos.y + (this.scrollStartPos.y - this.scrollContainer.scrollTop));
      this.selectionRect.x = Math.min(x, pos.x);
      this.selectionRect.y = Math.min(y, pos.y);
      this.selectionRect.width = Math.max(x, pos.x) - this.selectionRect.x;
      this.selectionRect.height = Math.max(y, pos.y) - this.selectionRect.y;
    }

    return pos;
  }

  private cleanUpSelection(): void {
    this.emitDragFinishedEvent();
    this.startPos = null;
    this.drag = null;
    this.startedDragWithCtrl = false;
    this.startedDragWithShiftKey = false;
    this.selectionRect = null;
    this.clickTimeout = null;
    this.scrollStartPos = null;
    this.isPanStarted = false;
    this.stopAutoPan();
  }

  /**
   * Check whether click timeout is over.
   */
  private clickTimeoutIsOver(): boolean {
    // Duration before the selection can be tracked.
    if (this.clickTimeout && Date.now() - this.clickTimeout > this.consts.clickDetectionMs) {
      return true;
    }

    return false;
  }

  /**
   * Automatically pan. Scroll canvas when selection is made and mouse outside of the bounds.
   */
  private startAutoPan(): void {
    if (this.consts.autoPanSpeed) {
      if (!this.intervalRef) {
        // Repeat move calls to
        this.intervalRef = setInterval(() => {
          this.handleMouseMoveEvent(null);
        }, this.consts.autoPanSpeed);
      }
    }
  }

  /**
   * Stop current running auto pan
   */
  private stopAutoPan(): void {
    if (this.intervalRef) {
      clearInterval(this.intervalRef);
      this.intervalRef = null;
    }

    this.autoPanLastActionDate = null;
  }

  /**
   * Check whether auto pan should be slowed down a bit.
   */
  private checkUpdateSpeedTooFast(): boolean {
    // Slow down updated a bit.
    if (this.autoPanLastActionDate && Date.now() - this.autoPanLastActionDate <= 10) {
      return true;
    }

    this.autoPanLastActionDate = Date.now();
    return false;
  }

  private scrollByPan(start: MouseData, pos: MouseData, scrollStartPos: DOMPoint): void {
    if (!start || !pos) {
      return;
    }

    const offsetX = Math.round(start.x - pos.x);
    const newLeft = scrollStartPos.x + offsetX;

    if (offsetX > 0) {
      this.rescale(newLeft + this.canvas.clientWidth);
    }

    if (offsetX > 0 && newLeft + this.canvas.clientWidth >= this.scrollContainer.scrollWidth - 5) {
      this.scrollContainer.scrollLeft = this.scrollContainer.scrollWidth;
    } else {
      this.scrollContainer.scrollLeft = newLeft;
    }
    this.scrollContainer.scrollTop = Math.round(start.y - pos.y);
  }

  private scrollBySelectionOutOfBounds(pos: DOMPoint): boolean {
    const x = pos.x;
    const y = pos.y;
    let isChanged = false;
    let speedX = 0;
    let speedY = 0;
    const isLeft = x <= 0;
    const isRight = x >= this.canvas.clientWidth;
    const isTop = y <= 0;
    const isBottom = y >= this.canvas.clientHeight;
    let newWidth = null;
    let newHeight = null;
    if (isLeft || isRight || isTop || isBottom) {
      // Auto move init
      this.startAutoPan();

      if (this.checkUpdateSpeedTooFast()) {
        return false;
      }

      const scrollSpeedMultiplier = isNaN(this.consts.scrollByDragSpeed) ? 1 : this.consts.scrollByDragSpeed;
      if (isLeft) {
        // Get normalized speed.
        speedX = -TimelineUtils.getDistance(x, 0) * scrollSpeedMultiplier;
      } else if (isRight) {
        // Get normalized speed:
        speedX = TimelineUtils.getDistance(x, this.canvas.clientWidth) * scrollSpeedMultiplier;
        newWidth = this.scrollContainer.scrollLeft + this.canvas.clientWidth + speedX;
      }

      if (isTop) {
        // Get normalized speed.
        speedY = (-TimelineUtils.getDistance(x, 0) * scrollSpeedMultiplier) / 4;
      } else if (isBottom) {
        // Get normalized speed:
        speedY = (TimelineUtils.getDistance(x, this.canvas.clientHeight) * scrollSpeedMultiplier) / 4;
        newHeight = this.scrollContainer.scrollTop + this.canvas.clientHeight;
      }
    } else {
      this.stopAutoPan();
    }

    if (newWidth || newHeight) {
      this.rescale(newWidth, newHeight, 'scrollBySelection');
    }

    if (Math.abs(speedX) > 0) {
      this.scrollContainer.scrollLeft += speedX;
      isChanged = true;
    }

    if (Math.abs(speedY) > 0) {
      this.scrollContainer.scrollTop += speedY;
      isChanged = true;
    }

    return isChanged;
  }

  /**
   * Convert screen pixel to value.
   */
  public pxToVal(coords: number, absolute = false): number {
    if (!absolute) {
      coords -= this.options.leftMarginPx;
    }
    const ms = (coords / this.options.stepPx) * this.options.zoom;
    return ms;
  }

  /**
   * Convert area value to screen pixel coordinates.
   */
  public valToPx(ms: number, absolute = false): number {
    // Respect current scroll container offset. (virtualization)
    if (!absolute) {
      const x = this.scrollContainer.scrollLeft;
      ms -= this.pxToVal(x);
    }

    return (ms * this.options.stepPx) / this.options.zoom;
  }

  /**
   * Snap a value to a nearest beautiful point.
   */
  public snapVal(ms: number): number {
    // Apply snap to steps if enabled.
    if (this.options.snapsPerSeconds && this.options.snapEnabled) {
      const stopsPerPixel = 1000 / this.options.snapsPerSeconds;
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

  private mousePosToVal(x: number, snapEnabled = false): number {
    let convertedVal = this.pxToVal(this.scrollContainer.scrollLeft + Math.min(x, this.canvas.clientWidth));
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
  private formatLineGaugeText(ms: number, isSeconds = false): string {
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

  private renderTicks(): void {
    this.ctx.save();

    const areaWidth = this.scrollContainer.scrollWidth - this.options.leftMarginPx;
    let from = this.pxToVal(0);
    let to = this.pxToVal(areaWidth);
    const dist = TimelineUtils.getDistance(from, to);
    if (dist === 0) {
      return;
    }
    // normalize step.
    const stepsCanFit = areaWidth / this.options.stepPx;
    const realStep = dist / stepsCanFit;
    // Find the nearest 'beautiful' step for a line gauge. This step should be divided by 1/2/5!
    //let step = realStep;
    const step = TimelineUtils.findGoodStep(realStep);
    if (step == 0 || isNaN(step) || !isFinite(step)) {
      return;
    }
    const goodStepDistancePx = areaWidth / (dist / step);
    const smallStepsCanFit = goodStepDistancePx / this.options.stepSmallPx;
    const realSmallStep = step / smallStepsCanFit;
    let smallStep = TimelineUtils.findGoodStep(realSmallStep, step);
    if (step % smallStep != 0) {
      smallStep = realSmallStep;
    }
    // filter to draw only visible
    const visibleFrom = this.pxToVal(this.scrollContainer.scrollLeft + this.options.leftMarginPx);
    const visibleTo = this.pxToVal(this.scrollContainer.scrollLeft + this.scrollContainer.clientWidth);
    // Find beautiful start point:
    from = Math.floor(visibleFrom / step) * step;

    // Find a beautiful end point:
    to = Math.ceil(visibleTo / step) * step + step;

    let lastTextX: number | null = null;
    for (let i = from; i <= to; i += step) {
      const pos = this.valToPx(i);
      const sharpPos = this.getSharp(Math.round(pos));
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.setLineDash([4]);
      this.ctx.lineWidth = 1;
      this.ctx.strokeStyle = this.options.tickColor;
      TimelineUtils.drawLine(this.ctx, sharpPos, (this.options.headerHeight || 0) / 2, sharpPos, this.canvas.clientHeight);
      this.ctx.stroke();

      this.ctx.fillStyle = this.options.labelsColor;
      if (this.options.ticksFont) {
        this.ctx.font = this.options.ticksFont;
      }

      const text = this.formatLineGaugeText(i);
      const textSize = this.ctx.measureText(text);

      const textX = sharpPos - textSize.width / 2;
      // skip text render if there is no space for it.
      if (isNaN(lastTextX) || lastTextX <= textX) {
        lastTextX = textX + textSize.width;
        this.ctx.fillText(text, textX, 10);
      }

      this.ctx.restore();
      // Draw small steps
      for (let x = i + smallStep; x < i + step; x += smallStep) {
        const nextPos = this.valToPx(x);
        const nextSharpPos = this.getSharp(Math.floor(nextPos));
        this.ctx.beginPath();
        this.ctx.lineWidth = this.pixelRatio;
        this.ctx.strokeStyle = this.options.tickColor;
        TimelineUtils.drawLine(this.ctx, nextSharpPos, (this.options.headerHeight || 0) / 1.3, nextSharpPos, this.options.headerHeight);
        this.ctx.stroke();
      }
    }

    this.ctx.restore();
  }

  /**
   * calculate screen positions of the model elements.
   */
  private calculateRowsBounds(includeStipesBounds = true): RowsCalculationsResults {
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

    if (!this.model) {
      return toReturn;
    }
    const rows = this.model.rows;
    if (!rows || !Array.isArray(rows) || rows.length <= 0) {
      return toReturn;
    }
    let rowAbsoluteHeight = this.options.headerHeight;
    rows
      .filter((p) => p && !p.hidden)
      .forEach((row, index) => {
        if (!row) {
          return;
        }

        // draw with scroll virtualization:
        const rowHeight = TimelineStyleUtils.getRowHeight(row, this.options.rowsStyle);
        const marginBottom = TimelineStyleUtils.getRowMarginBottom(row, this.options.rowsStyle);

        rowAbsoluteHeight += rowHeight + marginBottom;
        const currentRowY = rowAbsoluteHeight - this.scrollContainer.scrollTop;
        if (index == 0) {
          toReturn.area.y = currentRowY;
        }

        toReturn.area.height = Math.max(rowAbsoluteHeight + rowHeight, toReturn.area.height);

        const rowData = {
          x: 0,
          y: currentRowY,
          width: this.canvas.clientWidth,
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
          const stripeRect = this.getKeyframesStripeSize(row, rowData.y, rowData.minValue, rowData.maxValue);
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

  private renderRows(): void {
    const data = this.calculateRowsBounds();
    if (data && data.rows) {
      this.ctx.save();
      data.rows.forEach((rowData) => {
        if (!rowData) {
          return;
        }

        this.ctx.fillStyle = TimelineStyleUtils.getRowStyle<string>(rowData.row, this.options.rowsStyle, 'fillColor', '#252526');
        //this.ctx.fillRect(data.areaRect.x, data.areaRect.y, data.areaRect.w, data.areaRect.h);
        // Note: bounds used instead of the clip while clip is slow!
        const bounds = this.cutBounds(rowData);
        if (bounds) {
          this.ctx.fillRect(bounds.x, bounds.y, bounds.width, bounds.height);
        }

        const keyframeLaneColor = TimelineStyleUtils.stripeFillColor(rowData.row, this.options.rowsStyle);

        if ((rowData.row.keyframes && rowData.row.keyframes.length <= 1) || !keyframeLaneColor) {
          return;
        }

        // get the bounds on a canvas
        const rectBounds = this.cutBounds(rowData.stripeRect);
        if (rectBounds) {
          this.ctx.fillStyle = keyframeLaneColor;
          this.ctx.fillRect(rectBounds.x, rectBounds.y, rectBounds.width, rectBounds.height);
        }
      });

      this.ctx.restore();
    }
  }

  /**
   * Method is used for the optimization.
   * Only visible part should be rendered.
   */
  private cutBounds(rect: DOMRect): CutBoundsRect {
    if (!rect) {
      return null;
    }
    // default bounds: minX, maxX, minY, maxY
    const minX = 0,
      maxX = this.canvas.clientWidth,
      minY = this.options.headerHeight || 0,
      maxY = this.canvas.clientWidth;

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
  private getKeyframesStripeSize(row: TimelineRow, rowY: number, minValue: number, maxValue: number): DOMRect {
    let stripeHeight: number | string = TimelineStyleUtils.rowStripeHeight(row, this.options.rowsStyle);

    const height = TimelineStyleUtils.getRowHeight(row, this.options.rowsStyle);
    if ((!stripeHeight && stripeHeight !== 0) || isNaN(stripeHeight as number) || stripeHeight == 'auto') {
      stripeHeight = Math.floor(height * 0.8);
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

  private getKeyframePosition(keyframe: TimelineKeyframe, rowSize: RowSize): DOMRect | null {
    if (!keyframe) {
      console.log('keyframe should be defined.');
      return null;
    }

    const val = keyframe.val;
    if (isNaN(val)) {
      return null;
    }

    // get center of the lane:
    const y = rowSize.y + rowSize.height / 2 - this.scrollContainer.scrollTop;

    // TODO: keyframe size:
    let size = 1; //this.options.keyframeSizePx || keyframe.size;
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

  private renderKeyframes(): void {
    this.forEachKeyframe((keyframe, keyframeIndex, rowSize): boolean => {
      const row = rowSize.row;
      const pos = this.getKeyframePosition(keyframe, rowSize);
      if (pos) {
        let x = this.getSharp(pos.x);
        let y = pos.y;
        const size = pos.height;
        const bounds = this.cutBounds({
          x: x - size / 2,
          y: y - size / 2,
          width: size,
          height: size,
        } as DOMRect);
        if (!bounds) {
          return;
        }

        this.ctx.save();

        // Performance FIX: use clip only  when we are in the collision! Clip is slow!
        // Other keyframes should be hidden by bounds check.
        if (bounds && bounds.overlapY) {
          this.ctx.beginPath();
          this.ctx.rect(0, this.options.headerHeight || 0, this.canvas.clientWidth, this.canvas.clientWidth);
          this.ctx.clip();
        }

        const shape = TimelineStyleUtils.getKeyframeStyle<TimelineKeyframeShape>(keyframe, row, this.options.rowsStyle, 'shape', TimelineKeyframeShape.Rhomb);
        if (shape === TimelineKeyframeShape.None) {
          return;
        }

        const keyframeColor = TimelineStyleUtils.getKeyframeStyle<string>(
          keyframe,
          row,
          this.options.rowsStyle,
          keyframe.selected ? 'fillColor' : 'selectedFillColor',
          keyframe.selected ? 'red' : 'DarkOrange',
        );
        const border = TimelineStyleUtils.getKeyframeStyle<number>(keyframe, row, this.options.rowsStyle, 'strokeThickness', 0.2);
        const strokeColor = border > 0 ? TimelineStyleUtils.getKeyframeStyle<string>(keyframe, row, this.options.rowsStyle, 'strokeColor', 'Black') : '';

        if (shape == TimelineKeyframeShape.Rhomb) {
          this.ctx.beginPath();
          this.ctx.translate(x, y);
          this.ctx.rotate((45 * Math.PI) / 180);
          if (border > 0 && strokeColor) {
            this.ctx.fillStyle = strokeColor;
            this.ctx.rect(-size / 2, -size / 2, size, size);
            this.ctx.fill();
          }

          this.ctx.fillStyle = keyframeColor;
          // draw main keyframe data with offset.
          this.ctx.translate(border, border);
          this.ctx.rect(-size / 2, -size / 2, size - border * 2, size - border * 2);
          this.ctx.fill();
        } else if (shape == TimelineKeyframeShape.Circle) {
          this.ctx.beginPath();
          if (border > 0 && strokeColor) {
            this.ctx.fillStyle = strokeColor;
            this.ctx.arc(x, y, size, 0, 2 * Math.PI);
          }
          this.ctx.fillStyle = keyframeColor;
          this.ctx.arc(x, y, size - border, 0, 2 * Math.PI);
          this.ctx.fill();
        } else if (shape == TimelineKeyframeShape.Rect) {
          this.ctx.beginPath();
          y = y - size / 2;
          x = x - size / 2;
          if (border > 0 && strokeColor) {
            this.ctx.fillStyle = strokeColor;
            this.ctx.rect(x, y, size, size);
            this.ctx.fill();
          }

          this.ctx.fillStyle = keyframeColor;
          this.ctx.rect(x + border, y + border, size - border, size - border);
          this.ctx.fill();
        }

        this.ctx.restore();
      }
      return false;
    });
  }

  private renderSelectionRect(): void {
    if (this.drag) {
      return;
    }

    this.ctx.save();
    const thickness = 1;
    if (this.selectionRect && this.selectionRectEnabled) {
      this.ctx.setLineDash([4]);
      this.ctx.lineWidth = this.pixelRatio;
      this.ctx.strokeStyle = this.options.selectionColor;
      this.ctx.strokeRect(this.getSharp(this.selectionRect.x, thickness), this.getSharp(this.selectionRect.y, thickness), Math.floor(this.selectionRect.width), Math.floor(this.selectionRect.height));
    }
    this.ctx.restore();
  }

  private renderBackground(): void {
    if (this.options.fillColor) {
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.rect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
      this.ctx.fillStyle = this.options.fillColor;
      this.ctx.fill();
      this.ctx.restore();
    } else {
      // Clear if bg not set.
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  private renderTimeline(): void {
    this.ctx.save();
    const thickness = this.options.timelineThicknessPx;
    this.ctx.lineWidth = thickness * this.pixelRatio;
    const timeLinePos = this.getSharp(Math.round(this.valToPx(this.val)), thickness);
    this.ctx.strokeStyle = this.options.timelineColor;
    this.ctx.fillStyle = this.ctx.strokeStyle;
    const y = this.options.timelineMarginTopPx;
    this.ctx.beginPath();
    TimelineUtils.drawLine(this.ctx, timeLinePos, y, timeLinePos, this.canvas.clientHeight);
    this.ctx.stroke();

    if (this.options.timelineCapWidthPx && this.options.timelineCapHeightPx) {
      const rectSize = this.options.timelineCapWidthPx;
      const capHeight = this.options.timelineCapHeightPx;
      if (this.options.timelineCap === TimelineCapShape.Triangle) {
        this.ctx.beginPath();
        this.ctx.moveTo(timeLinePos - rectSize / 2, y);
        this.ctx.lineTo(timeLinePos + rectSize / 2, y);
        this.ctx.lineTo(timeLinePos, capHeight);
        this.ctx.closePath();
        this.ctx.stroke();
      } else if (this.options.timelineCap === TimelineCapShape.Rect) {
        this.ctx.fillRect(timeLinePos - rectSize / 2, y, rectSize, capHeight);
        this.ctx.fill();
      }
    }

    this.ctx.restore();
  }

  private renderHeaderBackground(): void {
    if (!isNaN(this.options.headerHeight) && this.options.headerHeight > 0) {
      this.ctx.save();
      // draw ticks background
      this.ctx.lineWidth = this.pixelRatio;
      if (this.options.headerFillColor) {
        // draw ticks background
        this.ctx.lineWidth = this.pixelRatio;
        // draw header background
        this.ctx.fillStyle = this.options.headerFillColor;
        this.ctx.fillRect(0, 0, this.canvas.clientWidth, this.options.headerHeight);
      } else {
        this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.options.headerHeight);
      }
      this.ctx.restore();
    }
  }

  redraw(): void {
    if (window.requestAnimationFrame) {
      window.requestAnimationFrame(this.redrawInternal);
    } else {
      this.redrawInternal();
    }
  }

  /**
   * perform scroll to max left.
   */
  public scrollLeft(): void {
    if (this.scrollContainer.scrollLeft != this.scrollContainer.scrollWidth) {
      this.scrollContainer.scrollLeft = this.scrollContainer.scrollWidth;
    }
  }

  /**
   * Redraw parts of the component in the specific order.
   */
  private redrawInternal = (): void => {
    // Rescale when animation is played out of the bounds.
    if (this.valToPx(this.val, true) > this.scrollContainer.scrollWidth) {
      this.rescale();
      if (!this.isPanStarted && this.drag && this.drag.type !== TimelineElementType.Timeline) {
        this.scrollLeft();
      }
    }

    this.renderBackground();
    this.renderRows();
    // Render after rows
    this.renderHeaderBackground();
    this.renderTicks();
    this.renderKeyframes();
    this.renderSelectionRect();
    this.renderTimeline();
  };

  /**
   * Get row by y coordinate.
   * @param posY y screen coordinate.
   */
  public getRowByY(posY: number): TimelineRow {
    const model = this.calculateRowsBounds();
    if (model && model.rows) {
      return model.rows.find((rowData) => rowData.y >= posY && posY <= rowData.y + rowData.height);
    }

    return null;
  }
  /**
   * Find sharp pixel position
   */
  private getSharp(pos: number, thickness = 1): number {
    if (thickness % 2 == 0) {
      return pos;
    }

    return pos + this.pixelRatio / 2;
  }

  /**
   * Get current time:
   */
  public getTime(): number {
    return this.val;
  }

  private setTimeInternal(val: number, source: string): boolean {
    val = Math.round(val);
    if (val < 0) {
      val = 0;
    }

    if (this.val != val) {
      this.val = val;
      this.emit('timeChanged', {
        val: val,
        source: source,
      });
      return true;
    }

    return true;
  }

  public setTime(val: number): boolean {
    // don't allow to change time during drag:
    if (this.drag && this.drag.type === TimelineElementType.Timeline) {
      return false;
    }

    return this.setTimeInternal(val, 'setTime');
  }

  public select(value = true): void {
    this.performSelection(value);
    this.redraw();
  }

  public getOptions(): TimelineOptions {
    return this.options;
  }

  private controlKeyPressed(e: MouseEvent | KeyboardEvent): boolean {
    return this.options.controlKeyIsMetaKey || this.options.controlKeyIsMetaKey ? e.metaKey : e.ctrlKey;
  }

  private emitKeyframesSelected(selectedKeyframes: Array<TimelineKeyframe>): void {
    this.emit(TimelineEvents.Selected, {
      keyframes: selectedKeyframes,
    } as TimelineSelectedEvent);
  }
  private emitDragStartedEvent(): void {
    this.emit(TimelineEvents.DragStarted, {
      keyframes: this.drag.elements,
    });
  }
  private emitDragFinishedEvent(): void {
    if (this.drag && this.drag.changed) {
      this.emit(TimelineEvents.DragFinished, {
        keyframes: this.drag.elements,
      });
    }
  }
  private emitDragEvent(): void {
    if (this.drag) {
      this.emit(TimelineEvents.Drag, {
        keyframes: this.drag.elements,
      });
    }
  }
  public setScrollLeft(value: number): void {
    if (this.scrollContainer) {
      this.scrollContainer.scrollLeft = value;
    }
  }
  public setScrollTop(value: number): void {
    if (this.scrollContainer) {
      this.scrollContainer.scrollTop = value;
    }
  }
  public getScrollLeft(): number {
    return this.scrollContainer ? this.scrollContainer.scrollLeft : 0;
  }
  public getScrollTop(): number {
    return this.scrollContainer ? this.scrollContainer.scrollTop : 0;
  }

  /**
   * Subscribe on scroll event
   */
  public onScroll(callback: Function): void {
    this.on(TimelineEvents.Scroll, callback);
  }

  /**
   * Set this.options.
   * Options will be merged with the defaults and control invalidated
   */
  public setOptions(toSet: TimelineOptions): TimelineOptions {
    this.options = this.mergeOptions(toSet);
    this.rescale();
    this.redraw();
    // Merged options:
    return this.options;
  }

  public getModel(): TimelineModel {
    return this.model;
  }

  /**
   * Set model and redraw application.
   * @param data
   */
  public setModel(data: TimelineModel): void {
    this.model = data;
    this.rescale();
    this.redraw();
  }

  private getMousePos(canvas: HTMLCanvasElement, e: TouchEvent | MouseEvent): MousePoint {
    let radius = 1;
    let clientX = 0;
    let clientY = 0;
    if (e instanceof TouchEvent) {
      const wheelEvent = e as TouchEvent;
      if (wheelEvent.changedTouches && wheelEvent.changedTouches.length > 0) {
        // TODO: implement better touch support
        const touch = e.changedTouches[0];
        clientX = touch.clientX;
        clientY = touch.clientY;
        radius = Math.max(radius, touch.radiusX, touch.radiusY);
      }
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const rect = canvas.getBoundingClientRect(), // abs. size of element
      scaleX = canvas.width / this.pixelRatio / rect.width, // relationship bitmap vs. element for X
      scaleY = canvas.height / this.pixelRatio / rect.height; // relationship bitmap vs. element for Y

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
   * Apply container div size to the container.
   */
  private rescaleCanvas(): boolean {
    let changed = false;
    const width = this.scrollContainer.clientWidth * this.pixelRatio;
    const height = this.scrollContainer.clientHeight * this.pixelRatio;
    if (Math.floor(width) != Math.floor(this.ctx.canvas.width)) {
      this.ctx.canvas.width = width;
      changed = true;
    }

    if (Math.floor(height) != Math.floor(this.ctx.canvas.height)) {
      this.ctx.canvas.height = height;
      changed = true;
    }

    this.ctx.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0);

    return changed;
  }

  private rescale(newWidth?: number, newHeight?: number, scrollMode?: string): void {
    this.rescaleCanvas();
    const data = this.calculateRowsBounds();
    if (data && data.area) {
      const additionalOffset = this.options.stepPx;
      newWidth = newWidth || 0;
      // not less than current timeline position
      const timelineGlobalPos = this.valToPx(this.val, true);
      let timelinePos = 0;
      if (timelineGlobalPos > this.canvas.clientWidth) {
        if (scrollMode == 'scrollBySelection') {
          timelinePos = Math.floor(timelineGlobalPos + this.canvas.clientWidth + (this.options.stepPx || 0));
        } else {
          timelinePos = Math.floor(timelineGlobalPos + this.canvas.clientWidth / 1.5);
        }
      }
      const keyframeW = data.area.width + this.options.leftMarginPx + additionalOffset;

      newWidth = Math.max(
        newWidth,
        // keyframes size
        keyframeW,
        // not less than current scroll position
        this.scrollContainer.scrollLeft + this.canvas.clientWidth,
        timelinePos,
      );

      const minWidthPx = Math.floor(newWidth) + 'px';
      if (minWidthPx != this.scrollContent.style.minWidth) {
        this.scrollContent.style.minWidth = minWidthPx;
      }

      newHeight = Math.max(Math.floor(data.area.height + this.canvas.clientHeight * 0.2), this.scrollContainer.scrollTop + this.canvas.clientHeight - 1, Math.round(newHeight || 0));

      const h = newHeight + 'px';
      if (this.scrollContent.style.minHeight != h) {
        this.scrollContent.style.minHeight = h;
      }
    }
  }

  /**
   * get draggable element.
   * Filter elements and get first element by a priority.
   * @param Array
   * @param val current mouse value
   */
  private findDraggable(elements: Array<TimelineClickableElement>, val: number): TimelineClickableElement {
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
      if (element.type === TimelineElementType.Keyframe) {
        const draggable =
          (this.options.keyframesDraggable === undefined ? true : !!this.options.keyframesDraggable) && (element.keyframe.draggable === undefined ? true : !!element.keyframe.draggable);

        if (!draggable) {
          return false;
        }
      } else if (element.type === TimelineElementType.Stripe) {
        const draggable = (this.options.stripesDraggable === undefined ? true : !!this.options.stripesDraggable) && (element.row.stripeDraggable === undefined ? true : !!element.row.stripeDraggable);
        if (!draggable) {
          return false;
        }
      } else if (element.type === TimelineElementType.Row) {
        return false;
      }
      return true;
    });

    const sorted = filteredElements.sort((a, b): number => {
      const prioA = getPriority(a.type);
      const prioB = getPriority(b.type);
      if (prioA == prioB) {
        return TimelineUtils.getDistance(a.val, val) > TimelineUtils.getDistance(b.val, val) ? 1 : 0;
      }

      return prioA > prioB ? 1 : 0;
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
    const timeLinePos = this.valToPx(this.val);
    const width = Math.max((this.options.timelineThicknessPx || 1) * this.pixelRatio, this.options.timelineCapWidthPx * this.pixelRatio || 1) + clickRadius;
    if (pos.y <= this.options.headerHeight || (pos.x >= timeLinePos - width / 2 && pos.x <= timeLinePos + width / 2)) {
      toReturn.push({
        val: this.val,
        type: TimelineElementType.Timeline,
      } as TimelineClickableElement);
    }

    if (pos.y >= this.options.headerHeight && this.options.keyframesDraggable) {
      this.forEachKeyframe((keyframe, keyframeIndex, rowModel, rowIndex, isNextRow): boolean => {
        // Check keyframes stripe overlap
        if (isNextRow && rowModel.stripeRect) {
          const rowOverlapped = TimelineUtils.isOverlap(pos.x, pos.y, rowModel);
          if (rowOverlapped) {
            const row = {
              val: this.mousePosToVal(pos.x, true),
              type: TimelineElementType.Row,
              row: rowModel.row,
            } as TimelineClickableElement;
            toReturn.push(row);
          }

          const keyframesStripeOverlapped = TimelineUtils.isOverlap(pos.x, pos.y, rowModel.stripeRect);
          if (keyframesStripeOverlapped) {
            const stripe = {
              val: this.mousePosToVal(pos.x, true),
              type: TimelineElementType.Stripe,
              row: rowModel.row,
            } as TimelineClickableElement;

            const snapped = this.snapVal(rowModel.minValue);
            // get snapped mouse pos based on a min value.
            stripe.val += rowModel.minValue - snapped;
            toReturn.push(stripe);
          }
        }

        const keyframePos = this.getKeyframePosition(keyframe, rowModel);
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
        return false;
      }, true);
    }
    return toReturn;
  }

  /**
   * Merge options with the defaults.
   */
  private mergeOptions(toSet: TimelineOptions): TimelineOptions {
    toSet = toSet || ({} as TimelineOptions);
    // Apply incoming options to default. (override default)
    const options = new TimelineOptions();
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
}
