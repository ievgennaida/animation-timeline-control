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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGVUZXN0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3N0eWxlVGVzdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1REFBdUQ7QUFDdkQsa0VBQWtKO0FBRWxKLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRTtJQUM3QixRQUFRLENBQUMsV0FBVyxFQUFFO1FBQ3BCLEVBQUUsQ0FBQyxrQ0FBa0MsRUFBRTtZQUNyQyxJQUFNLFdBQVcsR0FBRztnQkFDbEIsU0FBUyxFQUFFO29CQUNULGNBQWMsRUFBRSxFQUFFO2lCQUNDO2FBQ0gsQ0FBQztZQUVyQixJQUFNLGFBQWEsR0FBRyxFQUFFLEtBQUssRUFBRSwwQ0FBcUIsQ0FBQyxJQUFJLEVBQTJCLENBQUM7WUFDckYsSUFBSSxDQUFDLE1BQU0sQ0FBQyx1Q0FBa0IsQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLEVBQUUsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xHLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLHVCQUF1QixFQUFFO1lBQzFCLElBQU0sV0FBVyxHQUFHO2dCQUNsQixTQUFTLEVBQUU7b0JBQ1QsY0FBYyxFQUFFLEVBQUU7aUJBQ0M7YUFDSCxDQUFDO1lBRXJCLElBQU0sYUFBYSxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsMENBQXFCLENBQUMsSUFBSSxFQUEyQixDQUFDO1lBQ3RHLElBQUksQ0FBQyxNQUFNLENBQUMsdUNBQWtCLENBQUMsaUJBQWlCLENBQUMsYUFBYSxFQUFFLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsRyxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQywyQkFBMkIsRUFBRTtZQUM5QixJQUFNLFdBQVcsR0FBRztnQkFDbEIsU0FBUyxFQUFFO29CQUNULGNBQWMsRUFBRSxFQUFFO2lC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