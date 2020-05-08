"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var animation_timeline_js_1 = require("../lib/animation-timeline.js");
describe('Timeline ', function () {
    it('closest keyframe should be returned', function () {
        var timeline = new animation_timeline_js_1.Timeline();
        var elements = [
            {
                type: animation_timeline_js_1.TimelineElementType.Keyframe,
                val: 0,
            },
            {
                type: animation_timeline_js_1.TimelineElementType.Keyframe,
                val: 4,
            },
            {
                type: animation_timeline_js_1.TimelineElementType.Keyframe,
                val: 9,
            },
        ];
        var element = timeline._findDraggable(elements, 5);
        if (element.val !== elements[2].val) {
            throw new Error('Wrong keyframe selected');
        }
    });
});
//# sourceMappingURL=timelineTests.js.map