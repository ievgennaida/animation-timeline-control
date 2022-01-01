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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGVUZXN0cy50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3R5bGVUZXN0cy50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdURBQXVEO0FBQ3ZELGtFQUFrSjtBQUVsSixRQUFRLENBQUMsb0JBQW9CLEVBQUU7SUFDN0IsUUFBUSxDQUFDLFdBQVcsRUFBRTtRQUNwQixFQUFFLENBQUMsa0NBQWtDLEVBQUU7WUFDckMsSUFBTSxXQUFXLEdBQUc7Z0JBQ2xCLFNBQVMsRUFBRTtvQkFDVCxjQUFjLEVBQUUsRUFBRTtpQkFDQzthQUNILENBQUM7WUFFckIsSUFBTSxhQUFhLEdBQUcsRUFBRSxLQUFLLEVBQUUsMENBQXFCLENBQUMsSUFBSSxFQUEyQixDQUFDO1lBQ3JGLElBQUksQ0FBQyxNQUFNLENBQUMsdUNBQWtCLENBQUMsaUJBQWlCLENBQUMsYUFBYSxFQUFFLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsRyxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyx1QkFBdUIsRUFBRTtZQUMxQixJQUFNLFdBQVcsR0FBRztnQkFDbEIsU0FBUyxFQUFFO29CQUNULGNBQWMsRUFBRSxFQUFFO2lCQUNDO2FBQ0gsQ0FBQztZQUVyQixJQUFNLGFBQWEsR0FBRyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLDBDQUFxQixDQUFDLElBQUksRUFBMkIsQ0FBQztZQUN0RyxJQUFJLENBQUMsTUFBTSxDQUFDLHVDQUFrQixDQUFDLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEcsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsMkJBQTJCLEVBQUU7WUFDOUIsSUFBTSxXQUFXLEdBQUc7Z0JBQ2xCLFNBQVMsRUFBRTtvQkFDVCxjQUFjLEVB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