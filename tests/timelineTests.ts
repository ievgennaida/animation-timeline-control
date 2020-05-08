/* eslint-disable @typescript-eslint/no-explicit-any */
import { Timeline, TimelineElementType, TimelineClickableElement } from '../lib/animation-timeline';

function assertEquals(value: any, expected: any, message: string | null = null): void {
  if (expected !== value) {
    if (!message) {
      message = 'Not equal!';
    }
    new Error(message + '. Expected: ' + expected + value);
  }
}

describe('_findDraggable', function () {
  it('Keyframe should be selected', function () {
    const timeline = new Timeline();
    const elements = [
      {
        type: TimelineElementType.Stripe,
        val: 5,
      } as TimelineClickableElement,
      {
        type: TimelineElementType.Keyframe,
        val: 5,
      } as TimelineClickableElement,
    ];
    const element = timeline._findDraggable(elements, 5);
    if (!element) {
      throw new Error('element cannot be empty');
    }
    assertEquals(element.type, TimelineElementType.Keyframe, TimelineElementType.Keyframe + ' should be selected');
  });
  it('Timeline should be selected', function () {
    const timeline = new Timeline();
    const elements = [
      {
        type: TimelineElementType.Timeline,
        val: 5,
      } as TimelineClickableElement,
      {
        type: TimelineElementType.Stripe,
        val: 5,
      } as TimelineClickableElement,
    ];
    const element = timeline._findDraggable(elements, 5);
    if (!element) {
      throw new Error('element cannot be empty');
    }
    assertEquals(element.type, TimelineElementType.Timeline, TimelineElementType.Timeline + ' should be selected');
  });
  it('Timeline should taken first', function () {
    const timeline = new Timeline();
    const elements = [
      {
        type: TimelineElementType.Timeline,
        val: 5,
      } as TimelineClickableElement,
      {
        type: TimelineElementType.Keyframe,
        val: 4,
      },
      {
        type: TimelineElementType.Keyframe,
        val: 5,
      } as TimelineClickableElement,
      {
        type: TimelineElementType.Stripe,
        val: 5,
      } as TimelineClickableElement,
    ];
    const element = timeline._findDraggable(elements, 5);
    if (!element) {
      throw new Error('element cannot be empty');
    }
    assertEquals(element.type, TimelineElementType.Timeline, TimelineElementType.Timeline + ' should be selected');
    // Keyframe with value 5 should be selected
    assertEquals(element.val, 5);
  });
  it('Stripe should be selected', function () {
    const timeline = new Timeline();
    const elements = [
      {
        type: TimelineElementType.Stripe,
        val: 5,
      } as TimelineClickableElement,
    ];
    const element = timeline._findDraggable(elements, 5);
    if (!element) {
      throw new Error('element cannot be empty');
    }
    assertEquals(element.type, TimelineElementType.Stripe, TimelineElementType.Stripe + ' should be selected');
  });
  it('closest keyframe should be returned', function () {
    const timeline = new Timeline();
    const elements = [
      {
        type: TimelineElementType.Keyframe,
        val: 0,
      } as TimelineClickableElement,
      {
        type: TimelineElementType.Keyframe,
        val: 4,
      } as TimelineClickableElement,
      {
        type: TimelineElementType.Keyframe,
        val: 9,
      } as TimelineClickableElement,
    ];
    const element = timeline._findDraggable(elements, 5);
    assertEquals(element.val, elements[2].val);
  });
});
