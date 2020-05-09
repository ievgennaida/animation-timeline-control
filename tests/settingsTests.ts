/* eslint-disable @typescript-eslint/no-explicit-any */
import { Timeline, TimelineElementType, TimelineClickableElement } from '../lib/animation-timeline';
import { assert } from './asserts';

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
    assert.equal(element.type, TimelineElementType.Keyframe, TimelineElementType.Keyframe + ' should be selected');
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
    assert.equal(element.type, TimelineElementType.Timeline, TimelineElementType.Timeline + ' should be selected');
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
    assert.equal(element.type, TimelineElementType.Timeline, TimelineElementType.Timeline + ' should be selected');
    // Keyframe with value 5 should be selected
    assert.equal(element.val, 5);
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
    assert.equal(element.type, TimelineElementType.Stripe, TimelineElementType.Stripe + ' should be selected');
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
    assert.equal(element.val, elements[2].val);
  });
});
