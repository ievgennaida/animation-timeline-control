"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
var animation_timeline_1 = require("./../lib/animation-timeline");
describe('TimelineStyleUtils', function () {
    describe('Draggable', function () {
        it('Keyframe is draggable by default', function () {
            var globalStyle = {
                rowsStyle: {
                    keyframesStyle: {},
                },
            };
            var keyframeStyle = { shape: animation_timeline_1.TimelineKeyframeShape.Rect };
            chai.expect(animation_timeline_1.TimelineStyleUtils.keyframeDraggable(keyframeStyle, null, globalStyle)).equal(true);
        });
        it('Keyframe is draggable', function () {
            var globalStyle = {
                rowsStyle: {
                    keyframesStyle: {},
                },
            };
            var keyframeStyle = { draggable: true, shape: animation_timeline_1.TimelineKeyframeShape.Rect };
            chai.expect(animation_timeline_1.TimelineStyleUtils.keyframeDraggable(keyframeStyle, null, globalStyle)).equal(true);
        });
        it('Keyframe is not draggable', function () {
            var globalStyle = {
                rowsStyle: {
                    keyframesStyle: {},
                },
            };
            var keyframeStyle = { draggable: false, shape: animation_timeline_1.TimelineKeyframeShape.Rect };
            chai.expect(animation_timeline_1.TimelineStyleUtils.keyframeDraggable(keyframeStyle, null, globalStyle)).equal(false);
        });
        it('Keyframe is draggable override row', function () {
            var globalStyle = {
                rowsStyle: {
                    keyframesStyle: {},
                },
            };
            var rowStyle = { keyframesStyle: { draggable: false, shape: animation_timeline_1.TimelineKeyframeShape.Rect } };
            var keyframeStyle = { draggable: true, shape: animation_timeline_1.TimelineKeyframeShape.Rect };
            var value = animation_timeline_1.TimelineStyleUtils.keyframeDraggable(keyframeStyle, rowStyle, globalStyle);
            chai.expect(value).equal(true);
        });
        it('Keyframes are not draggable by row settings', function () {
            var globalStyle = {
                rowsStyle: {
                    keyframesStyle: {
                        draggable: true,
                    },
                },
            };
            var rowStyle = { keyframesStyle: { draggable: false, shape: animation_timeline_1.TimelineKeyframeShape.Rect } };
            var keyframeStyle = { shape: animation_timeline_1.TimelineKeyframeShape.Rect };
            chai.expect(animation_timeline_1.TimelineStyleUtils.keyframeDraggable(keyframeStyle, rowStyle, globalStyle)).equal(false);
        });
        it('Keyframes are draggable', function () {
            var globalStyle = {
                rowsStyle: {
                    keyframesStyle: {
                        draggable: true,
                    },
                },
            };
            var rowStyle = { keyframesStyle: { draggable: true, shape: animation_timeline_1.TimelineKeyframeShape.Rect } };
            var keyframeStyle = { draggable: true, shape: animation_timeline_1.TimelineKeyframeShape.Rect };
            chai.expect(animation_timeline_1.TimelineStyleUtils.keyframeDraggable(keyframeStyle, rowStyle, globalStyle)).equal(true);
        });
        it('Keyframes are draggable', function () {
            var globalStyle = {
                rowsStyle: {
                    keyframesStyle: {
                        draggable: false,
                    },
                },
            };
            var rowStyle = { keyframesStyle: { draggable: false, shape: animation_timeline_1.TimelineKeyframeShape.Rect } };
            var keyframeStyle = { draggable: true, shape: animation_timeline_1.TimelineKeyframeShape.Rect };
            chai.expect(animation_timeline_1.TimelineStyleUtils.keyframeDraggable(keyframeStyle, rowStyle, globalStyle)).equal(true);
        });
        it('Groups are draggable by default', function () {
            var globalStyle = {
                rowsStyle: {
                    keyframesStyle: {
                        draggable: true,
                    },
                },
            };
            var rowStyle = { keyframesStyle: { draggable: true, shape: animation_timeline_1.TimelineKeyframeShape.Rect } };
            chai.expect(animation_timeline_1.TimelineStyleUtils.groupDraggable(rowStyle, globalStyle)).equal(true);
        });
        it('Group is draggable', function () {
            var globalStyle = {
                rowsStyle: {
                    keyframesStyle: {
                        draggable: false,
                    },
                },
            };
            var rowStyle = { groupDraggable: true, keyframesStyle: { draggable: true, shape: animation_timeline_1.TimelineKeyframeShape.Rect } };
            chai.expect(animation_timeline_1.TimelineStyleUtils.groupDraggable(rowStyle, globalStyle)).equal(true);
        });
        it('Group is not draggable by row settings', function () {
            var globalStyle = {
                rowsStyle: {
                    groupDraggable: true,
                    keyframesStyle: {
                        draggable: true,
                    },
                },
            };
            var rowStyle = { groupDraggable: false, keyframesStyle: { draggable: true, shape: animation_timeline_1.TimelineKeyframeShape.Rect } };
            chai.expect(animation_timeline_1.TimelineStyleUtils.groupDraggable(rowStyle, globalStyle)).equal(false);
        });
    });
    describe('Row size', function () {
        it('Height is taken from row', function () {
            var globalStyle = {
                rowsStyle: {
                    height: 100,
                    keyframesStyle: {},
                },
            };
            var rowsStyle = { height: 50 };
            chai.expect(animation_timeline_1.TimelineStyleUtils.getRowHeight(rowsStyle, globalStyle)).equal(rowsStyle.height);
        });
        it('Height is taken from global settings', function () {
            var globalStyle = {
                rowsStyle: {
                    height: 100,
                    keyframesStyle: {},
                },
            };
            var rowsStyle = {};
            chai.expect(animation_timeline_1.TimelineStyleUtils.getRowHeight(rowsStyle, globalStyle)).equal(globalStyle.rowsStyle.height);
        });
        it('Margin bottom is taken from global settings', function () {
            var globalStyle = {
                rowsStyle: {
                    height: 100,
                    marginBottom: 30,
                    keyframesStyle: {},
                },
            };
            var rowsStyle = {};
            chai.expect(animation_timeline_1.TimelineStyleUtils.getRowMarginBottom(rowsStyle, globalStyle)).equal(globalStyle.rowsStyle.marginBottom);
        });
        it('Margin bottom is taken from row settings', function () {
            var globalStyle = {
                rowsStyle: {
                    height: 100,
                    marginBottom: 30,
                    keyframesStyle: {},
                },
            };
            var rowsStyle = { marginBottom: 43 };
            chai.expect(animation_timeline_1.TimelineStyleUtils.getRowMarginBottom(rowsStyle, globalStyle)).equal(rowsStyle.marginBottom);
        });
    });
});
//# sourceMappingURL=styleTests.js.map