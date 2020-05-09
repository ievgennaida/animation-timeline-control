"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
var animation_timeline_1 = require("./../lib/animation-timeline");
function assertEquals(value, expected, message) {
    if (message === void 0) { message = null; }
    if (expected !== value) {
        if (!message) {
            message = 'Not equal!';
        }
        new Error(message + '. Expected: ' + expected + value);
    }
}
describe('_findDraggable', function () {
    it('Keyframe should be selected', function () {
        var timeline = new animation_timeline_1.Timeline();
        var elements = [
            {
                type: animation_timeline_1.TimelineElementType.Stripe,
                val: 5,
            },
            {
                type: animation_timeline_1.TimelineElementType.Keyframe,
                val: 5,
            },
        ];
        var element = timeline._findDraggable(elements, 5);
        if (!element) {
            throw new Error('element cannot be empty');
        }
        assertEquals(element.type, animation_timeline_1.TimelineElementType.Keyframe, animation_timeline_1.TimelineElementType.Keyframe + ' should be selected');
    });
    it('Timeline should be selected', function () {
        var timeline = new animation_timeline_1.Timeline();
        var elements = [
            {
                type: animation_timeline_1.TimelineElementType.Timeline,
                val: 5,
            },
            {
                type: animation_timeline_1.TimelineElementType.Stripe,
                val: 5,
            },
        ];
        var element = timeline._findDraggable(elements, 5);
        if (!element) {
            throw new Error('element cannot be empty');
        }
        assertEquals(element.type, animation_timeline_1.TimelineElementType.Timeline, animation_timeline_1.TimelineElementType.Timeline + ' should be selected');
    });
    it('Timeline should taken first', function () {
        var timeline = new animation_timeline_1.Timeline();
        var elements = [
            {
                type: animation_timeline_1.TimelineElementType.Timeline,
                val: 5,
            },
            {
                type: animation_timeline_1.TimelineElementType.Keyframe,
                val: 4,
            },
            {
                type: animation_timeline_1.TimelineElementType.Keyframe,
                val: 5,
            },
            {
                type: animation_timeline_1.TimelineElementType.Stripe,
                val: 5,
            },
        ];
        var element = timeline._findDraggable(elements, 5);
        if (!element) {
            throw new Error('element cannot be empty');
        }
        assertEquals(element.type, animation_timeline_1.TimelineElementType.Timeline, animation_timeline_1.TimelineElementType.Timeline + ' should be selected');
        // Keyframe with value 5 should be selected
        assertEquals(element.val, 5);
    });
    it('Stripe should be selected', function () {
        var timeline = new animation_timeline_1.Timeline();
        var elements = [
            {
                type: animation_timeline_1.TimelineElementType.Stripe,
                val: 5,
            },
        ];
        var element = timeline._findDraggable(elements, 5);
        if (!element) {
            throw new Error('element cannot be empty');
        }
        assertEquals(element.type, animation_timeline_1.TimelineElementType.Stripe, animation_timeline_1.TimelineElementType.Stripe + ' should be selected');
    });
    it('closest keyframe should be returned', function () {
        var timeline = new animation_timeline_1.Timeline();
        var elements = [
            {
                type: animation_timeline_1.TimelineElementType.Keyframe,
                val: 0,
            },
            {
                type: animation_timeline_1.TimelineElementType.Keyframe,
                val: 4,
            },
            {
                type: animation_timeline_1.TimelineElementType.Keyframe,
                val: 9,
            },
        ];
        var element = timeline._findDraggable(elements, 5);
        assertEquals(element.val, elements[2].val);
    });
});
//# sourceMappingURL=timelineTests.js.map