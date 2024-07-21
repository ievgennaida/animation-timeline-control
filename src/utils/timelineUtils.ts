import { TimelineRanged } from '../models/timelineRanged';
import { TimelineOptions } from '../settings/timelineOptions';

const defaultDenominators = [1, 2, 5, 10];
export class TimelineUtils {
  static drawLine(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number): void {
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
  }
  /**
   * Check is valid number.
   */
  static isNumber(val?: number | null): boolean {
    if (typeof val === 'number' && (val || val === 0) && !isNaN(val) && Number.isFinite(val)) {
      return true;
    }

    return false;
  }
  static deleteElement<T>(array: Array<T>, element: T): Array<T> {
    const index: number = array.indexOf(element);
    if (index !== -1) {
      return array.splice(index, 1);
    }
    return array;
  }

  /**
   * Check rectangle overlap x,y
   */
  static isOverlap(x: number, y: number, rectangle: DOMRect): boolean {
    if (!rectangle) {
      return false;
    }

    if (rectangle.x <= x && rectangle.x + rectangle.width >= x && rectangle.y <= y && rectangle.y + rectangle.height >= y) {
      return true;
    }

    return false;
  }
  /**
   * Find beautiful step for the header line gauge.
   */
  static findGoodStep(originalStep: number, divisionCheck = 0, denominators: number[] = defaultDenominators): number {
    if (!denominators) {
      denominators = defaultDenominators;
    }
    if (originalStep <= 0 || isNaN(originalStep) || !Number.isFinite(originalStep)) {
      return originalStep;
    }
    let step = originalStep;
    let lastDistance = null;
    const pow = TimelineUtils.getPowArgument(originalStep);
    for (let i = 0; i < denominators.length; i++) {
      const denominator = denominators[i];
      const calculatedStep = denominator * Math.pow(10, pow);
      if (divisionCheck && divisionCheck % calculatedStep != 0) {
        continue;
      }
      const distance = TimelineUtils.getDistance(originalStep, calculatedStep);

      if (distance == 0 || (distance <= 0.1 && pow > 0)) {
        lastDistance = distance;
        step = calculatedStep;
        break;
      } else if (!lastDistance || lastDistance > distance) {
        lastDistance = distance;
        step = calculatedStep;
      }
    }

    return step;
  }
  /**
   * Keep value in min, max bounds.
   */
  static keepInBounds(value: number, min: number | null | undefined = null, max: number | null | undefined = null): number {
    if (TimelineUtils.isNumber(value)) {
      if (TimelineUtils.isNumber(min) && (min || min === 0)) {
        value = Math.max(value, min);
      }
      if (TimelineUtils.isNumber(max) && (max || max === 0)) {
        value = Math.min(value, max);
      }
    }

    return value;
  }
  static setMinMax(to: TimelineRanged, from: TimelineRanged | null, shrink = false): TimelineRanged {
    if (!from || !to) {
      return to;
    }
    const fromMin = from ? from.min : Number.NaN;
    const toMin = to.min;
    const isFromMinNumber = (fromMin || fromMin === 0) && TimelineUtils.isNumber(fromMin);
    const isToMinNumber = (toMin || toMin === 0) && TimelineUtils.isNumber(toMin);
    // get absolute min and max bounds:
    if (isFromMinNumber && isToMinNumber) {
      to.min = shrink ? Math.min(fromMin, toMin) : Math.max(fromMin, toMin);
    } else if (isFromMinNumber) {
      to.min = fromMin;
    }
    const fromMax = from ? from.max : Number.NaN;
    const toMax = to.max;
    const isFromMaxNumber = (fromMax || fromMax === 0) && TimelineUtils.isNumber(fromMax);
    const isToMaxNumber = (toMax || toMax === 0) && TimelineUtils.isNumber(toMax);
    if (isFromMaxNumber && isToMaxNumber) {
      to.max = shrink ? Math.max(fromMax, toMax) : Math.min(fromMax, toMax);
    } else if (isFromMaxNumber) {
      to.max = fromMax;
    }

    return to;
  }
  static shrinkSelf(rect: DOMRect, value: number): DOMRect {
    if (!rect) {
      return rect;
    }
    rect.x -= value;
    rect.y -= value;
    rect.width += value;
    rect.height += value;
    return rect;
  }
  /**
   * Check whether rectangle intersects another rectangle
   */
  static isRectIntersects(rect: DOMRect, rect2: DOMRect, touch = false): boolean {
    if (!rect || !rect2) {
      console.log('Rectangles cannot be empty');
      return false;
    }
    const right = rect2.x + rect2.width;
    const bottom = rect2.y + rect2.height;
    if (touch) {
      if (
        // Left
        rect.x <= right &&
        // Right
        rect2.x <= rect.x + rect.width &&
        // Top
        rect.y <= bottom &&
        // Bottom
        rect2.y <= rect.y + rect.height
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      if (
        // Left
        rect.x < right &&
        // Right
        rect2.x < rect.x + rect.width &&
        // Top
        rect.y < bottom &&
        // Bottom
        rect2.y < rect.y + rect.height
      ) {
        return true;
      } else {
        return false;
      }
    }
  }

  static getDistance(x1: number, y1: number, x2?: number, y2?: number): number {
    if (x2 != undefined && y2 != undefined) {
      return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    } else {
      return Math.abs(x1 - y1);
    }
  }

  /**
   * Get sign of the number. 1 or -1.
   */
  static sign(p: number): number {
    return p >= 0 ? 1 : -1;
  }

  /**
   * Clear browser text selection.
   */
  static clearBrowserSelection(): void {
    if (!window) {
      return;
    }
    if (window.getSelection) {
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
      }
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const doc: any = window.document;
      if (doc.selection) {
        doc.selection.empty();
      }
    }
  }
  static getPowArgument(toCheck: number): number {
    if (!toCheck || toCheck === 0 || !isFinite(toCheck)) {
      return 1;
    }
    // some optimization for numbers:
    if (toCheck >= 10 && toCheck < 100) {
      return 1;
    } else if (toCheck >= 100 && toCheck < 1000) {
      return 2;
    } else if (toCheck >= 1000 && toCheck < 10000) {
      return 3;
    }

    toCheck = Math.abs(toCheck);
    let category = 0;
    const s = this.sign(toCheck);
    if (toCheck > 1) {
      while (toCheck >= 1) {
        toCheck = Math.floor(toCheck / 10.0);
        category++;
      }

      return s * category - 1;
    } else if (toCheck > 0.0) {
      // Get number of zeros before the number.
      const zerosCount = Math.floor(Math.log(toCheck) / Math.log(10) + 1) - 1;
      return zerosCount;
    } else {
      return 1;
    }
  }

  static deepClone = <T>(previousOptions: T): T => {
    return JSON.parse(JSON.stringify(previousOptions)) as T;
  };

  static cloneOptions = (previousOptions: TimelineOptions): TimelineOptions => {
    const clonedValue = JSON.parse(
      JSON.stringify(previousOptions, (key, value) => {
        // No need to clone HTML element passed as ID.
        return key === 'id' ? undefined : value;
      }),
    );
    clonedValue.id = previousOptions.id;
    return clonedValue;
  };
  /**
   * Merge options. New keys will be added.
   */
  static mergeOptions(previousOptions: TimelineOptions, newOptions: TimelineOptions): TimelineOptions {
    newOptions = newOptions || ({} as TimelineOptions);
    // Apply incoming options to default. (override default)
    // Deep clone default options:
    const toArg = TimelineUtils.cloneOptions(previousOptions);
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
              if (key === 'id') {
                if (from[key] && from[key] !== to[key]) {
                  to[key] = from[key];
                }
              } else {
                if (!to[key]) {
                  to[key] = from[key];
                } else {
                  mergeOptionsDeep(to[key], from[key]);
                }
              }
            } else {
              to[key] = from[key];
            }
          }
        }
      }
    };

    mergeOptionsDeep(toArg, newOptions);
    return toArg;
  }
  /**
   * Format numbers with len
   */
  static timePadZero(num: number, len = 2): string {
    let str = String(num);
    const threshold = Math.pow(10, len - 1);
    if (num < threshold) {
      while (String(threshold).length > str.length) {
        str = `0${num}`;
      }
    }
    return str;
  }
}
