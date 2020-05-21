import { TimelineRanged } from '../timelineRanged';

const denominators = [1, 2, 5, 10];
export class TimelineUtils {
  static drawLine(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number): void {
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
  }
  /**
   * Check is valid number.
   */
  static isNumber(val?: number): boolean {
    if (typeof val === 'number' && !isNaN(val) && Number.isFinite(val)) {
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
   * Check rectangle overlap.
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
  static findGoodStep(originalStep: number, divisionCheck = 0): number {
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
  static keepInBounds(value: number, min: number | undefined = null, max: number | undefined = null): number {
    if (TimelineUtils.isNumber(value)) {
      if (TimelineUtils.isNumber(min)) {
        value = Math.max(value, min);
      }
      if (TimelineUtils.isNumber(max)) {
        value = Math.min(value, max);
      }
    }

    return value;
  }
  static setMinMax(to: TimelineRanged, from: TimelineRanged, shrink = false): TimelineRanged {
    if (!from || !to) {
      return to;
    }
    const fromMin = Math.min(from.getMin ? from.getMin() : from.min, from.min);
    const toMin = Math.min(to.getMin ? to.getMin() : to.min, to.min);
    const isFromMinNumber = TimelineUtils.isNumber(fromMin);
    const isToMinNumber = TimelineUtils.isNumber(toMin);
    // get absolute min and max bounds:
    if (isFromMinNumber && isToMinNumber) {
      to.min = shrink ? Math.min(fromMin, toMin) : Math.max(fromMin, toMin);
    } else if (isFromMinNumber) {
      to.min = fromMin;
    }

    const fromMax = Math.min(from.getMax && from.getMax ? from.getMax() : from.max, from.max);
    const toMax = Math.min(to.getMax ? to.getMax() : to.max, to.max);
    const isFromMaxNumber = TimelineUtils.isNumber(fromMax);
    const isToMaxNumber = TimelineUtils.isNumber(toMax);
    if (isFromMaxNumber && isToMaxNumber) {
      to.max = shrink ? Math.max(fromMax, toMax) : Math.min(fromMax, toMax);
    } else if (isFromMaxNumber) {
      to.max = fromMax;
    }

    return to;
  }
  static isRectOverlap(rect: DOMRect, rect2: DOMRect): boolean {
    if (!rect || !rect2) {
      console.log('Rectangles cannot be empty');
      return false;
    }

    // If one rectangle is on left side of other
    if (rect.x > rect2.x + rect2.width || rect2.x > rect.x + rect.width) {
      return true;
    }

    // If one rectangle is above other
    if (rect.y < rect2.y + rect2.height || rect2.y < rect.y + rect.height) {
      return true;
    }
    return false;
  }

  static getDistance(x1: number, y1: number, x2?: number, y2?: number): number {
    if (x2 != undefined && y2 != undefined) {
      return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    } else {
      return Math.abs(x1 - y1);
    }
  }
  static sign(p: number): number {
    return p >= 0 ? 1 : -1;
  }

  static clearBrowserSelection(): void {
    if (!window) {
      return;
    }
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
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
}
