"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
var animation_timeline_1 = require("./../lib/animation-timeline");
var asserts_1 = require("./asserts");
describe('Timeline', function () {
    describe('_findDraggable', function () {
        it('Keyframe should be selected', function () {
            var timeline = new animation_timeline_1.Timeline();
            var elements = [
                {
                    type: animation_timeline_1.TimelineElementType.Group,
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
            asserts_1.assert.equal(element.type, animation_timeline_1.TimelineElementType.Keyframe, animation_timeline_1.TimelineElementType.Keyframe + ' should be selected');
        });
        it('Timeline should be selected', function () {
            var timeline = new animation_timeline_1.Timeline();
            var elements = [
                {
                    type: animation_timeline_1.TimelineElementType.Timeline,
                    val: 5,
                },
                {
                    type: animation_timeline_1.TimelineElementType.Group,
                    val: 5,
                },
            ];
            var element = timeline._findDraggable(elements, 5);
            if (!element) {
                throw new Error('element cannot be empty');
            }
            asserts_1.assert.equal(element.type, animation_timeline_1.TimelineElementType.Timeline, animation_timeline_1.TimelineElementType.Timeline + ' should be selected');
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
                    type: animation_timeline_1.TimelineElementType.Group,
                    val: 5,
                },
            ];
            var element = timeline._findDraggable(elements, 5);
            if (!element) {
                throw new Error('element cannot be empty');
            }
            asserts_1.assert.equal(element.type, animation_timeline_1.TimelineElementType.Timeline, animation_timeline_1.TimelineElementType.Timeline + ' should be selected');
            // Keyframe with value 5 should be selected
            asserts_1.assert.equal(element.val, 5);
        });
        it('Group should be selected', function () {
            var timeline = new animation_timeline_1.Timeline();
            var elements = [
                {
                    type: animation_timeline_1.TimelineElementType.Group,
                    val: 5,
                },
            ];
            var element = timeline._findDraggable(elements, 5);
            if (!element) {
                throw new Error('element cannot be empty');
            }
            asserts_1.assert.equal(element.type, animation_timeline_1.TimelineElementType.Group, animation_timeline_1.TimelineElementType.Group + ' should be selected');
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
            asserts_1.assert.equal(element.val, elements[2].val);
        });
    });
    describe('select', function () {
        var model = {
            rows: [
                {
                    val: 0,
                },
            ],
        };
    });
});
//# sourceMappingURL=timelineTests.js.map