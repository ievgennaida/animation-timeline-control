import { Timeline, TimelineElementType, TimelineClickableElement } from '../lib/animation-timeline';

describe('Timeline ', function () {
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
    if (element.val !== elements[2].val) {
      throw new Error('Wrong keyframe selected');
    }
  });
});
