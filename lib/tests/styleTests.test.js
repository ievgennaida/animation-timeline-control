"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
var animation_timeline_1 = require("../lib/animation-timeline");
describe('TimelineStyleUtils', function () {
    describe('TimelineStyleUtils.getFirstSet', function () {
        it('Bool values. Default returned, empty list', function () {
            var defaultValue = false;
            chai.expect(animation_timeline_1.TimelineStyleUtils.getFirstSet(defaultValue)).equal(false);
        });
        it('Bool values. Default returned, undefined values', function () {
            var defaultValue = false;
            chai.expect(animation_timeline_1.TimelineStyleUtils.getFirstSet(defaultValue, undefined, null)).equal(false);
        });
        it('Bool values. True as default is returned', function () {
            var defaultValue = true;
            chai.expect(animation_timeline_1.TimelineStyleUtils.getFirstSet(defaultValue, undefined, null)).equal(true);
        });
        it('Bool values. False is returned as first set, default ignored.', function () {
            var defaultValue = true;
            chai.expect(animation_timeline_1.TimelineStyleUtils.getFirstSet(defaultValue, undefined, false)).equal(false);
        });
        it('Bool values. False is returned as first set, default ignored.', function () {
            var defaultValue = true;
            chai.expect(animation_timeline_1.TimelineStyleUtils.getFirstSet(defaultValue, false, undefined)).equal(false);
        });
        it('Bool values. False is returned as first set, all values valid.', function () {
            var defaultValue = true;
            chai.expect(animation_timeline_1.TimelineStyleUtils.getFirstSet(defaultValue, false, true)).equal(false);
        });
        it('Bool values. True is returned as first set, all values valid.', function () {
            var defaultValue = true;
            chai.expect(animation_timeline_1.TimelineStyleUtils.getFirstSet(defaultValue, true, false)).equal(true);
        });
        it('Bool values. Default returned, empty list', function () {
            var defaultValue = false;
            chai.expect(animation_timeline_1.TimelineStyleUtils.getFirstSet(defaultValue)).equal(false);
        });
        it('Bool values. Default returned, undefined values', function () {
            var defaultValue = false;
            chai.expect(animation_timeline_1.TimelineStyleUtils.getFirstSet(defaultValue, undefined, null)).equal(false);
        });
        it('Bool values. True as default is returned', function () {
            var defaultValue = true;
            chai.expect(animation_timeline_1.TimelineStyleUtils.getFirstSet(defaultValue, undefined, null)).equal(true);
        });
        it('Bool values. False is returned as first set, default ignored.', function () {
            var defaultValue = true;
            chai.expect(animation_timeline_1.TimelineStyleUtils.getFirstSet(defaultValue, undefined, false)).equal(false);
        });
        it('Bool values. False is returned as first set, default ignored.', function () {
            var defaultValue = true;
            chai.expect(animation_timeline_1.TimelineStyleUtils.getFirstSet(defaultValue, false, undefined)).equal(false);
        });
        it('Bool values. False is returned as first set, all values valid.', function () {
            var defaultValue = true;
            chai.expect(animation_timeline_1.TimelineStyleUtils.getFirstSet(defaultValue, false, true)).equal(false);
        });
        it('Bool values. True is returned as first set, all values valid.', function () {
            var defaultValue = true;
            chai.expect(animation_timeline_1.TimelineStyleUtils.getFirstSet(defaultValue, true, false)).equal(true);
        });
        it('Number values. 5 returned, empty list', function () {
            var defaultValue = 5;
            chai.expect(animation_timeline_1.TimelineStyleUtils.getFirstSet(defaultValue)).equal(5);
        });
        it('Number values. Default returned, undefined values', function () {
            var defaultValue = 5;
            chai.expect(animation_timeline_1.TimelineStyleUtils.getFirstSet(defaultValue, undefined, null)).equal(5);
        });
        it('Number values. 5 as default is returned', function () {
            var defaultValue = 5;
            chai.expect(animation_timeline_1.TimelineStyleUtils.getFirstSet(defaultValue, undefined, null)).equal(5);
        });
        it('Number values. 0 is returned as valid option', function () {
            var defaultValue = 5;
            chai.expect(animation_timeline_1.TimelineStyleUtils.getFirstSet(defaultValue, undefined, null, 0)).equal(0);
        });
        it('Number values. 0 is returned as valid option test #2', function () {
            var defaultValue = 5;
            chai.expect(animation_timeline_1.TimelineStyleUtils.getFirstSet(defaultValue, 0, undefined, null, 2)).equal(0);
        });
        it('Number values. False is returned as first set, default ignored.', function () {
            var defaultValue = 5;
            chai.expect(animation_timeline_1.TimelineStyleUtils.getFirstSet(defaultValue, undefined, 1)).equal(1);
        });
        it('Number values. False is returned as first set, default ignored.', function () {
            var defaultValue = 5;
            chai.expect(animation_timeline_1.TimelineStyleUtils.getFirstSet(defaultValue, 1, undefined)).equal(1);
        });
        it('Number values. False is returned as first set, all values valid.', function () {
            var defaultValue = 5;
            chai.expect(animation_timeline_1.TimelineStyleUtils.getFirstSet(defaultValue, 2, 1)).equal(2);
        });
        it('Number values. First valid is returned.', function () {
            var defaultValue = 5;
            chai.expect(animation_timeline_1.TimelineStyleUtils.getFirstSet(defaultValue, 0, 2)).equal(0);
        });
        it('Number values. First valid is returned not zero.', function () {
            var defaultValue = 5;
            chai.expect(animation_timeline_1.TimelineStyleUtils.getFirstSet(defaultValue, 1, 2)).equal(1);
        });
        it('String values. Default value is returned', function () {
            var defaultValue = 'test';
            chai.expect(animation_timeline_1.TimelineStyleUtils.getFirstSet(defaultValue)).equal('test');
        });
        it('String values. Default returned, undefined values', function () {
            var defaultValue = 'test';
            chai.expect(animation_timeline_1.TimelineStyleUtils.getFirstSet(defaultValue, undefined, null)).equal('test');
        });
        it('String values. Default returned, undefined values. test #2', function () {
            var defaultValue = 'test';
            chai.expect(animation_timeline_1.TimelineStyleUtils.getFirstSet(defaultValue, null, undefined)).equal(defaultValue);
        });
        it('String values. First set value is returned before invalid.', function () {
            var defaultValue = 'test';
            chai.expect(animation_timeline_1.TimelineStyleUtils.getFirstSet(defaultValue, undefined, 'test2')).equal('test2');
        });
        it('String values. First set value is returned', function () {
            var defaultValue = 'test';
            chai.expect(animation_timeline_1.TimelineStyleUtils.getFirstSet(defaultValue, 'test2', undefined)).equal('test2');
        });
        /** First Negative Value. */
        it('First negative Bool values. Default returned, empty list', function () {
            var defaultValue = false;
            var firstNegativeIsReturned = true;
            chai.expect(animation_timeline_1.TimelineStyleUtils.getValue(defaultValue, firstNegativeIsReturned)).equal(false);
        });
        it('First negative Bool values. Default returned, undefined values', function () {
            var defaultValue = false;
            var firstNegativeIsReturned = true;
            chai.expect(animation_timeline_1.TimelineStyleUtils.getValue(defaultValue, firstNegativeIsReturned, undefined, null)).equal(false);
        });
        it('First negative Bool values. Bool values. True as default is returned', function () {
            var defaultValue = true;
            var firstNegativeIsReturned = true;
            chai.expect(animation_timeline_1.TimelineStyleUtils.getValue(defaultValue, firstNegativeIsReturned, undefined, null)).equal(true);
        });
        it('First negative Bool values.Bool values. False is returned as first set, default ignored.', function () {
            var defaultValue = true;
            var firstNegativeIsReturned = true;
            chai.expect(animation_timeline_1.TimelineStyleUtils.getValue(defaultValue, firstNegativeIsReturned, true, false)).equal(false);
        });
        it('First negative Bool values.Bool values. False is returned as second set.', function () {
            var defaultValue = true;
            var firstNegativeIsReturned = true;
            chai.expect(animation_timeline_1.TimelineStyleUtils.getValue(defaultValue, firstNegativeIsReturned, false, true)).equal(false);
        });
        it('First negative Bool values. Default is ignored..', function () {
            var defaultValue = false;
            var firstNegativeIsReturned = true;
            var returnedValue = animation_timeline_1.TimelineStyleUtils.getValue(defaultValue, firstNegativeIsReturned, true, true);
            chai.expect(returnedValue).equal(true);
        });
    });
    describe('Draggable', function () {
        it('Keyframe is draggable by default', function () {
            var timelineOptions = {
                rowsStyle: {
                    keyframesStyle: {},
                },
            };
            var keyframe = {
                // Keyframe style
                style: { shape: animation_timeline_1.TimelineKeyframeShape.Rect },
            };
            var keyframeDraggable = animation_timeline_1.TimelineStyleUtils.keyframeDraggable(keyframe, null, null, timelineOptions);
            chai.expect(keyframeDraggable).equal(true);
        });
        it('Keyframe is draggable', function () {
            var timelineOptions = {
                rowsStyle: {
                    keyframesStyle: { shape: animation_timeline_1.TimelineKeyframeShape.Rect },
                },
            };
            var keyframe = { draggable: true, style: { shape: animation_timeline_1.TimelineKeyframeShape.Rect } };
            chai.expect(animation_timeline_1.TimelineStyleUtils.keyframeDraggable(keyframe, null, null, timelineOptions)).equal(true);
        });
        it('Keyframe is not draggable', function () {
            var timelineOptions = {
                rowsStyle: {
                    keyframesStyle: { shape: animation_timeline_1.TimelineKeyframeShape.Rect },
                },
            };
            var keyframe = { draggable: false, style: { shape: animation_timeline_1.TimelineKeyframeShape.Rect } };
            chai.expect(animation_timeline_1.TimelineStyleUtils.keyframeDraggable(keyframe, null, null, timelineOptions)).equal(false);
        });
        it('Keyframe is draggable cannot override row', function () {
            var timelineOptions = {
                rowsStyle: {
                    keyframesStyle: { shape: animation_timeline_1.TimelineKeyframeShape.Rect },
                },
            };
            var rowModel = { keyframesDraggable: false, keyframesStyle: { keyframesStyle: { shape: animation_timeline_1.TimelineKeyframeShape.Rect } } };
            var keyframe = { draggable: true, style: { shape: animation_timeline_1.TimelineKeyframeShape.Rect } };
            var value = animation_timeline_1.TimelineStyleUtils.keyframeDraggable(keyframe, null, rowModel, timelineOptions);
            chai.expect(value).equal(false);
        });
        it('Keyframes are not draggable by row settings', function () {
            var timelineOptions = {
                rowsStyle: {
                    keyframesStyle: {
                        shape: animation_timeline_1.TimelineKeyframeShape.Rect,
                    },
                },
            };
            var rowModel = { keyframesDraggable: false, style: { keyframesStyle: { shape: animation_timeline_1.TimelineKeyframeShape.Rect } } };
            var keyframe = { draggable: true, style: { shape: animation_timeline_1.TimelineKeyframeShape.Rect } };
            var isDraggable = animation_timeline_1.TimelineStyleUtils.keyframeDraggable(keyframe, null, rowModel, timelineOptions);
            chai.expect(isDraggable).equal(false);
        });
        it('Keyframes are draggable by row', function () {
            var timelineOptions = {
                rowsStyle: {
                    keyframesStyle: {
                        shape: animation_timeline_1.TimelineKeyframeShape.Rect,
                    },
                },
            };
            var rowModel = { keyframesDraggable: true, keyframesStyle: { keyframesStyle: { shape: animation_timeline_1.TimelineKeyframeShape.Rect } } };
            var keyframe = { draggable: true, style: { shape: animation_timeline_1.TimelineKeyframeShape.Rect } };
            var returnedValue = animation_timeline_1.TimelineStyleUtils.keyframeDraggable(keyframe, null, rowModel, timelineOptions);
            chai.expect(returnedValue).equal(true);
        });
        it('Keyframes are not draggable while turned off on the top level.', function () {
            var timelineOptions = {
                rowsStyle: {
                    keyframesDraggable: false,
                    keyframesStyle: {
                        shape: animation_timeline_1.TimelineKeyframeShape.Rect,
                    },
                },
            };
            var rowModel = { keyframesDraggable: false, keyframesStyle: { keyframesStyle: { shape: animation_timeline_1.TimelineKeyframeShape.Rect } } };
            var keyframe = { draggable: true, style: { shape: animation_timeline_1.TimelineKeyframeShape.Rect } };
            var isDraggable = animation_timeline_1.TimelineStyleUtils.keyframeDraggable(keyframe, null, rowModel, timelineOptions);
            chai.expect(isDraggable).equal(false);
        });
        it('Groups are draggable by default', function () {
            var timelineOptions = {
                rowsStyle: {
                    keyframesDraggable: true,
                    keyframesStyle: {
                        shape: animation_timeline_1.TimelineKeyframeShape.Rect,
                    },
                },
            };
            var rowModel = { keyframesDraggable: true, keyframesStyle: { keyframesStyle: { shape: animation_timeline_1.TimelineKeyframeShape.Rect } } };
            chai.expect(animation_timeline_1.TimelineStyleUtils.groupDraggable(null, rowModel, timelineOptions)).equal(true);
        });
        it('Group is draggable', function () {
            var timelineOptions = {
                rowsStyle: {
                    keyframesDraggable: false,
                    keyframesStyle: {
                        shape: animation_timeline_1.TimelineKeyframeShape.Rect,
                    },
                },
            };
            var rowModel = { keyframesDraggable: true, groupDraggable: true, keyframesStyle: { keyframesStyle: { shape: animation_timeline_1.TimelineKeyframeShape.Rect } } };
            chai.expect(animation_timeline_1.TimelineStyleUtils.groupDraggable(null, rowModel, timelineOptions)).equal(true);
        });
        it('Group is not draggable by row settings', function () {
            var timelineOptions = {
                groupsDraggable: true,
                rowsStyle: {
                    keyframesDraggable: true,
                    keyframesStyle: {
                        shape: animation_timeline_1.TimelineKeyframeShape.Rect,
                    },
                },
            };
            var rowModel = {
                // Disable Row group draggable
                groupsDraggable: false,
                keyframesDraggable: true,
                keyframesStyle: { shape: animation_timeline_1.TimelineKeyframeShape.Rect },
            };
            var isDraggable = animation_timeline_1.TimelineStyleUtils.groupDraggable(null, rowModel, timelineOptions);
            chai.expect(isDraggable).equal(false);
        });
    });
    describe('Group style options', function () {
        var groupOptionsStyle = {
            fillColor: 'red',
            marginTop: 8,
        };
        var groupsRowStyle = {
            fillColor: 'blue',
            marginTop: 3,
        };
        var keyframesGroupsStyle = {
            fillColor: 'green',
            marginTop: 5,
        };
        it('Groups default style is used', function () {
            var timelineOptions = {
                rowsStyle: {
                    keyframesStyle: {
                        shape: animation_timeline_1.TimelineKeyframeShape.Rect,
                    },
                },
            };
            var rowModel = { keyframesDraggable: false, style: { keyframesStyle: { shape: animation_timeline_1.TimelineKeyframeShape.Rect } } };
            var keyframe = {
                group: {
                    style: {
                    // No group options area passed.
                    },
                },
                draggable: true,
                style: { shape: animation_timeline_1.TimelineKeyframeShape.Rect },
            };
            var value = animation_timeline_1.TimelineStyleUtils.groupFillColor(timelineOptions, keyframe.group, rowModel.style);
            chai.expect(value).equal(animation_timeline_1.defaultGroupStyle.fillColor);
            chai.expect(animation_timeline_1.TimelineStyleUtils.groupMarginTop(timelineOptions, keyframe.group, rowModel.style)).equal(animation_timeline_1.defaultGroupStyle.marginTop);
        });
        it('Groups options style is applied', function () {
            var timelineOptions = {
                rowsStyle: {
                    groupsStyle: groupOptionsStyle,
                    keyframesStyle: {
                        shape: animation_timeline_1.TimelineKeyframeShape.Rect,
                    },
                },
            };
            var rowModel = { keyframesDraggable: false, style: { keyframesStyle: { shape: animation_timeline_1.TimelineKeyframeShape.Rect } } };
            var keyframe = {
                group: {
                    style: {
                    // No group options area passed.
                    },
                },
                draggable: true,
                style: { shape: animation_timeline_1.TimelineKeyframeShape.Rect },
            };
            var value = animation_timeline_1.TimelineStyleUtils.groupFillColor(timelineOptions, keyframe.group, rowModel.style);
            chai.expect(value).equal(groupOptionsStyle.fillColor);
            chai.expect(animation_timeline_1.TimelineStyleUtils.groupMarginTop(timelineOptions, keyframe.group, rowModel.style)).equal(groupOptionsStyle.marginTop);
        });
        it('Groups rows group options are applied', function () {
            var timelineOptions = {
                rowsStyle: {
                    groupsStyle: groupsRowStyle,
                    keyframesStyle: {
                        shape: animation_timeline_1.TimelineKeyframeShape.Rect,
                    },
                },
            };
            var rowModel = {
                keyframesDraggable: false,
                // Row style
                style: {
                    groupsRowStyle: groupsRowStyle,
                },
            };
            var keyframe = {
                group: {
                    style: {
                    // No group options area passed.
                    },
                },
                draggable: true,
                style: { shape: animation_timeline_1.TimelineKeyframeShape.Rect },
            };
            var value = animation_timeline_1.TimelineStyleUtils.groupFillColor(timelineOptions, keyframe.group, rowModel.style);
            chai.expect(value).equal(groupsRowStyle.fillColor);
            chai.expect(animation_timeline_1.TimelineStyleUtils.groupMarginTop(timelineOptions, keyframe.group, rowModel.style)).equal(groupsRowStyle.marginTop);
        });
        it('Groups keyframe group options are applied', function () {
            var timelineOptions = {
                rowsStyle: {
                    groupsStyle: groupsRowStyle,
                    keyframesStyle: {
                        shape: animation_timeline_1.TimelineKeyframeShape.Rect,
                        groupsStyle: groupsRowStyle,
                    },
                },
            };
            var rowModel = { keyframesDraggable: false, style: { keyframesStyle: { shape: animation_timeline_1.TimelineKeyframeShape.Rect } } };
            var keyframe = {
                group: {
                    style: keyframesGroupsStyle,
                },
                draggable: true,
                style: { shape: animation_timeline_1.TimelineKeyframeShape.Rect },
            };
            var value = animation_timeline_1.TimelineStyleUtils.groupFillColor(timelineOptions, keyframe.group, rowModel.style);
            chai.expect(value).equal(keyframesGroupsStyle.fillColor);
            chai.expect(animation_timeline_1.TimelineStyleUtils.groupMarginTop(timelineOptions, keyframe.group, rowModel.style)).equal(keyframesGroupsStyle.marginTop);
        });
    });
    describe('Row styles', function () {
        it('Height is taken from row', function () {
            var timelineOptions = {
                rowsStyle: {
                    height: 100,
                    keyframesStyle: {},
                },
            };
            var rowsStyle = { height: 50 };
            chai.expect(animation_timeline_1.TimelineStyleUtils.getRowHeight(rowsStyle, timelineOptions)).equal(rowsStyle.height);
        });
        it('Height is taken from global settings', function () {
            var _a;
            var timelineOptions = {
                rowsStyle: {
                    height: 100,
                    keyframesStyle: {},
                },
            };
            var rowsStyle = {};
            chai.expect(animation_timeline_1.TimelineStyleUtils.getRowHeight(rowsStyle, timelineOptions)).equal((_a = timelineOptions.rowsStyle) === null || _a === void 0 ? void 0 : _a.height);
        });
        it('Margin bottom is taken from global settings', function () {
            var _a;
            var timelineOptions = {
                rowsStyle: {
                    height: 100,
                    marginBottom: 30,
                    keyframesStyle: {},
                },
            };
            var rowsStyle = {};
            chai.expect(animation_timeline_1.TimelineStyleUtils.getRowMarginBottom(rowsStyle, timelineOptions)).equal((_a = timelineOptions.rowsStyle) === null || _a === void 0 ? void 0 : _a.marginBottom);
        });
        it('Margin bottom is taken from row settings', function () {
            var timelineOptions = {
                rowsStyle: {
                    height: 100,
                    marginBottom: 30,
                    keyframesStyle: {},
                },
            };
            var rowsStyle = { marginBottom: 43 };
            chai.expect(animation_timeline_1.TimelineStyleUtils.getRowMarginBottom(rowsStyle, timelineOptions)).equal(rowsStyle.marginBottom);
        });
    });
    describe('Keyframe style options', function () {
        var assertKeyframeStyles = function (keyframe, group, rowStyle, options, expectedStyle) {
            var fillColor = animation_timeline_1.TimelineStyleUtils.keyframeFillColor(keyframe, group, rowStyle, options);
            chai.expect(fillColor).equal(expectedStyle.fillColor);
            var keyframeHeight = animation_timeline_1.TimelineStyleUtils.keyframeHeight(keyframe, group, rowStyle, options);
            chai.expect(keyframeHeight).equal(expectedStyle.height);
            var selectedFillColor = animation_timeline_1.TimelineStyleUtils.keyframeSelectedFillColor(keyframe, group, rowStyle, options);
            chai.expect(selectedFillColor).equal(expectedStyle.selectedFillColor);
            var keyframeSelectedStrokeColor = animation_timeline_1.TimelineStyleUtils.keyframeSelectedStrokeColor(keyframe, group || null, rowStyle, options);
            chai.expect(keyframeSelectedStrokeColor).equal(expectedStyle.selectedStrokeColor);
            var shape = animation_timeline_1.TimelineStyleUtils.keyframeShape(keyframe, group, rowStyle, options);
            chai.expect(shape).equal(expectedStyle.shape);
            var keyframeStrokeColor = animation_timeline_1.TimelineStyleUtils.keyframeStrokeColor(keyframe, group, rowStyle, options);
            chai.expect(keyframeStrokeColor).equal(expectedStyle.strokeColor);
            var keyframeStrokeThickness = animation_timeline_1.TimelineStyleUtils.keyframeStrokeThickness(keyframe, group, rowStyle, options);
            chai.expect(keyframeStrokeThickness).equal(expectedStyle.strokeThickness);
            var keyframeWidth = animation_timeline_1.TimelineStyleUtils.keyframeWidth(keyframe, group, rowStyle, options);
            chai.expect(keyframeWidth).equal(expectedStyle.width);
        };
        it('Default keyframe styles are applied.', function () {
            var timelineOptions = {
                rowsStyle: {
                    keyframesStyle: {},
                },
            };
            var rowModel = {
                keyframesDraggable: false,
                style: {
                // row keyframe style
                },
            };
            var keyframe = {
                group: {
                    style: {
                    // No group options area passed.
                    },
                },
                draggable: true,
                style: {
                // keyframe style.
                },
            };
            assertKeyframeStyles(
            // keyframe
            keyframe, 
            // group style
            keyframe.group, 
            // row style
            (rowModel === null || rowModel === void 0 ? void 0 : rowModel.style) || null, 
            // Global settings
            timelineOptions, 
            // Expected
            animation_timeline_1.defaultTimelineKeyframeStyle);
        });
        it('Override keyframe styles are applied.', function () {
            var expectedStyle = animation_timeline_1.TimelineUtils.deepClone(animation_timeline_1.defaultTimelineKeyframeStyle);
            expectedStyle.shape = animation_timeline_1.TimelineKeyframeShape.Rect;
            expectedStyle.height = 5;
            expectedStyle.width = 5;
            expectedStyle.fillColor = 'test';
            expectedStyle.selectedFillColor = 'test1';
            expectedStyle.strokeColor = 'test2';
            expectedStyle.selectedStrokeColor = 'test3';
            expectedStyle.strokeThickness = 3;
            var timelineOptions = {
                rowsStyle: {
                    keyframesStyle: expectedStyle,
                },
            };
            var rowModel = {
                keyframesDraggable: false,
                style: {
                // row keyframe style
                },
            };
            var keyframe = {
                group: {
                    style: {
                    // No group options area passed.
                    },
                },
                draggable: true,
                style: {
                // keyframe style.
                },
            };
            assertKeyframeStyles(
            // keyframe
            keyframe, 
            // group style
            keyframe.group, 
            // row style
            (rowModel === null || rowModel === void 0 ? void 0 : rowModel.style) || null, 
            // Global settings
            timelineOptions, 
            // Expected
            expectedStyle);
        });
        it('Keyframes style row model is applied.', function () {
            var expectedStyle = animation_timeline_1.TimelineUtils.deepClone(animation_timeline_1.defaultTimelineKeyframeStyle);
            expectedStyle.shape = animation_timeline_1.TimelineKeyframeShape.Rect;
            expectedStyle.height = 5;
            expectedStyle.width = 5;
            expectedStyle.fillColor = 'test';
            expectedStyle.selectedFillColor = 'test1';
            expectedStyle.strokeColor = 'test2';
            expectedStyle.selectedStrokeColor = 'test3';
            expectedStyle.strokeThickness = 3;
            var timelineOptions = {
                rowsStyle: {
                    keyframesStyle: animation_timeline_1.TimelineUtils.deepClone(animation_timeline_1.defaultTimelineKeyframeStyle),
                },
            };
            var rowModel = {
                keyframesDraggable: false,
                style: {
                    keyframesStyle: expectedStyle,
                },
            };
            var keyframe = {
                group: {
                    style: {
                    // No group options area passed.
                    },
                },
                draggable: true,
                style: {
                // keyframe style.
                },
            };
            assertKeyframeStyles(
            // keyframe
            keyframe, 
            // group style
            keyframe.group, 
            // row style
            (rowModel === null || rowModel === void 0 ? void 0 : rowModel.style) || null, 
            // Global settings
            timelineOptions, 
            // Expected
            expectedStyle);
        });
        it('Groups keyframe is applied.', function () {
            var expectedStyle = animation_timeline_1.TimelineUtils.deepClone(animation_timeline_1.defaultTimelineKeyframeStyle);
            expectedStyle.shape = animation_timeline_1.TimelineKeyframeShape.Rect;
            expectedStyle.height = 5;
            expectedStyle.width = 5;
            expectedStyle.fillColor = 'test';
            expectedStyle.selectedFillColor = 'test1';
            expectedStyle.strokeColor = 'test2';
            expectedStyle.selectedStrokeColor = 'test3';
            expectedStyle.strokeThickness = 3;
            var timelineOptions = {
                rowsStyle: {
                    keyframesStyle: animation_timeline_1.TimelineUtils.deepClone(animation_timeline_1.defaultTimelineKeyframeStyle),
                },
            };
            var rowModel = {
                keyframesDraggable: false,
                style: {
                    keyframesStyle: animation_timeline_1.TimelineUtils.deepClone(animation_timeline_1.defaultTimelineKeyframeStyle),
                },
            };
            var keyframe = {
                group: {
                    style: {
                        keyframesStyle: expectedStyle,
                        // No group options area passed.
                    },
                },
                draggable: true,
                style: {
                // keyframe style.
                },
            };
            assertKeyframeStyles(
            // keyframe
            keyframe, 
            // group style
            keyframe.group, 
            // row style
            (rowModel === null || rowModel === void 0 ? void 0 : rowModel.style) || null, 
            // Global settings
            timelineOptions, 
            // Expected
            expectedStyle);
        });
        it('Keyframe level style is applied.', function () {
            var expectedStyle = animation_timeline_1.TimelineUtils.deepClone(animation_timeline_1.defaultTimelineKeyframeStyle);
            expectedStyle.shape = animation_timeline_1.TimelineKeyframeShape.Rect;
            expectedStyle.height = 5;
            expectedStyle.width = 5;
            expectedStyle.fillColor = 'test';
            expectedStyle.selectedFillColor = 'test1';
            expectedStyle.strokeColor = 'test2';
            expectedStyle.selectedStrokeColor = 'test3';
            expectedStyle.strokeThickness = 3;
            var timelineOptions = {
                rowsStyle: {
                    keyframesStyle: animation_timeline_1.TimelineUtils.deepClone(animation_timeline_1.defaultTimelineKeyframeStyle),
                },
            };
            var rowModel = {
                keyframesDraggable: false,
                style: {
                    keyframesStyle: animation_timeline_1.TimelineUtils.deepClone(animation_timeline_1.defaultTimelineKeyframeStyle),
                },
            };
            var keyframe = {
                group: {
                    style: {
                        keyframesStyle: animation_timeline_1.TimelineUtils.deepClone(animation_timeline_1.defaultTimelineKeyframeStyle),
                        // No group options area passed.
                    },
                },
                draggable: true,
                style: expectedStyle,
            };
            assertKeyframeStyles(
            // keyframe
            keyframe, 
            // group style
            keyframe.group, 
            // row style
            (rowModel === null || rowModel === void 0 ? void 0 : rowModel.style) || null, 
            // Global settings
            timelineOptions, 
            // Expected
            expectedStyle);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGVUZXN0cy50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vdGVzdHMvc3R5bGVUZXN0cy50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdURBQXVEO0FBQ3ZELGdFQVdtQztBQUluQyxRQUFRLENBQUMsb0JBQW9CLEVBQUU7SUFDN0IsUUFBUSxDQUFDLGdDQUFnQyxFQUFFO1FBQ3pDLEVBQUUsQ0FBQywyQ0FBMkMsRUFBRTtZQUM5QyxJQUFNLFlBQVksR0FBRyxLQUFLLENBQUM7WUFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyx1Q0FBa0IsQ0FBQyxXQUFXLENBQVUsWUFBWSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEYsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsaURBQWlELEVBQUU7WUFDcEQsSUFBTSxZQUFZLEdBQUcsS0FBSyxDQUFDO1lBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsdUNBQWtCLENBQUMsV0FBVyxDQUFVLFlBQVksRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkcsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsMENBQTBDLEVBQUU7WUFDN0MsSUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsdUNBQWtCLENBQUMsV0FBVyxDQUFVLFlBQVksRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEcsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsK0RBQStELEVBQUU7WUFDbEUsSUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsdUNBQWtCLENBQUMsV0FBVyxDQUFVLFlBQVksRUFBRSxTQUFTLEVBQUUsS0FBSyxDQUFD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