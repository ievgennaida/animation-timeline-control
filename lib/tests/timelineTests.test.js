"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
var animation_timeline_1 = require("../lib/animation-timeline");
describe('Timeline', function () {
    describe('_findDraggableElement', function () {
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
            var element = timeline._findDraggableElement(elements, 5);
            if (!element) {
                throw new Error('element cannot be empty');
            }
            chai.expect(element.type).equal(animation_timeline_1.TimelineElementType.Keyframe, animation_timeline_1.TimelineElementType.Keyframe + ' should be selected');
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
            var element = timeline._findDraggableElement(elements, 5);
            if (!element) {
                throw new Error('element cannot be empty');
            }
            chai.expect(element.type).equal(animation_timeline_1.TimelineElementType.Timeline, animation_timeline_1.TimelineElementType.Timeline + ' should be selected');
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
            var element = timeline._findDraggableElement(elements, 5);
            if (!element) {
                throw new Error('element cannot be empty');
            }
            chai.expect(element.type).equal(animation_timeline_1.TimelineElementType.Timeline, animation_timeline_1.TimelineElementType.Timeline + ' should be selected');
            // Keyframe with value 5 should be selected
            chai.expect(element.val).equal(5);
        });
        it('Group should be found under the value', function () {
            var timeline = new animation_timeline_1.Timeline();
            var elements = [
                {
                    type: animation_timeline_1.TimelineElementType.Group,
                    val: 5,
                },
            ];
            var element = timeline._findDraggableElement(elements, 5);
            if (!element) {
                throw new Error('element cannot be empty');
            }
            chai.expect(element.type).equal(animation_timeline_1.TimelineElementType.Group, animation_timeline_1.TimelineElementType.Group + ' should be selected');
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
            var element = timeline._findDraggableElement(elements, 5);
            chai.assert(element);
            chai.expect(element.val).equal(elements[1].val);
        });
        it('Keyframes are not draggable by global settings', function () {
            var timeline = new animation_timeline_1.Timeline();
            var elements = [
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
            // Apply global options::
            timeline._options = {
                keyframesDraggable: false,
                rowsStyle: {
                    keyframesStyle: {
                        shape: animation_timeline_1.TimelineKeyframeShape.Rect,
                    },
                },
            };
            var element = timeline._findDraggableElement(elements, 5);
            chai.assert(element);
            chai.expect(element.type).equal(animation_timeline_1.TimelineElementType.Group, 'Group should be selected');
        });
        it('Timeline. Keyframes are not draggable by row settings', function () {
            var timeline = new animation_timeline_1.Timeline();
            var elements = [
                {
                    type: animation_timeline_1.TimelineElementType.Keyframe,
                    val: 4,
                    row: {
                        keyframesDraggable: false,
                    },
                },
                {
                    type: animation_timeline_1.TimelineElementType.Keyframe,
                    val: 5,
                    row: {
                        keyframesDraggable: true,
                    },
                },
            ];
            // Apply global options::
            var element = timeline._findDraggableElement(elements, 4);
            chai.assert(element);
            // Keyframe with value 5 should be selected as draggable
            chai.expect(element.val).equal(5);
        });
        it('Keyframes are draggable', function () {
            var timeline = new animation_timeline_1.Timeline();
            var elements = [
                {
                    type: animation_timeline_1.TimelineElementType.Keyframe,
                    val: 4,
                    keyframe: {
                        val: 0,
                    },
                    row: {
                        keyframesDraggable: false,
                        keyframesStyle: {
                            shape: animation_timeline_1.TimelineKeyframeShape.Rect,
                        },
                    },
                },
                {
                    type: animation_timeline_1.TimelineElementType.Keyframe,
                    val: 5,
                    keyframe: {
                        draggable: true,
                    },
                    row: {
                        keyframesStyle: {
                            keyframesStyle: { shape: animation_timeline_1.TimelineKeyframeShape.Rect },
                        },
                    },
                },
            ];
            // Apply global options::
            var element = timeline._findDraggableElement(elements, 4);
            chai.assert(element);
            // Keyframe with value 5 should be selected as draggable
            chai.expect(element.val).equal(5);
        });
    });
    describe('select', function () {
        var model = {
            rows: [
                { val: 0, keyframes: [{ val: 0 }, { val: 0 }] },
                { val: 0, keyframes: [{ val: 0 }, { val: 0 }, { val: 0 }] },
                { val: 0, keyframes: [{ val: 0 }, { val: 0 }] },
                { val: 0, keyframes: [{ val: 0 }] },
            ],
        };
        it('Select all', function () {
            var timeline = new animation_timeline_1.Timeline();
            timeline._model = model;
            var element = timeline.selectAllKeyframes();
            chai.expect(element.selectionChanged).equal(true);
            var changed = 0;
            model.rows.forEach(function (row) {
                var _a;
                var len = ((_a = row === null || row === void 0 ? void 0 : row.keyframes) === null || _a === void 0 ? void 0 : _a.length) || 0;
                chai.expect(len > 0).equal(true);
                if (row && row.keyframes) {
                    row.keyframes.forEach(function (keyframe) {
                        chai.expect(keyframe.selected).equal(true);
                        changed++;
                    });
                }
            });
            chai.expect(element.selected.length).equal(changed);
        });
        it('Select all selectable', function () {
            var timeline = new animation_timeline_1.Timeline();
            timeline._model = model;
            var element = timeline.getAllKeyframes();
            var changed = 0;
            var selectable = 0;
            model.rows.forEach(function (row) {
                var _a;
                var len = ((_a = row === null || row === void 0 ? void 0 : row.keyframes) === null || _a === void 0 ? void 0 : _a.length) || 0;
                chai.expect(len > 0).equal(true);
                if (row.keyframes) {
                    row.keyframes.forEach(function (keyframe) {
                        keyframe.selected = false;
                        keyframe.selectable = changed % 2 === 0;
                        if (keyframe.selectable) {
                            selectable++;
                        }
                        changed++;
                    });
                }
            });
            var selectionResults = timeline.select(element);
            chai.expect(selectionResults.changed.length).equal(selectable);
            chai.expect(selectionResults.selected.length).equal(selectable);
        });
        it('Deselect all', function () {
            var timeline = new animation_timeline_1.Timeline();
            timeline._model = model;
            model.rows.forEach(function (row) {
                var _a;
                var len = ((_a = row === null || row === void 0 ? void 0 : row.keyframes) === null || _a === void 0 ? void 0 : _a.length) || 0;
                chai.expect(len > 0).equal(true);
                if (row.keyframes) {
                    row.keyframes.forEach(function (keyframe) {
                        keyframe.selectable = true;
                        keyframe.selected = true;
                    });
                }
            });
            // deselect all
            var element = timeline.deselectAll();
            chai.expect(element.selectionChanged).equal(true);
            chai.expect(element.selected.length).equal(0);
            model.rows.forEach(function (row) {
                var _a;
                var len = ((_a = row === null || row === void 0 ? void 0 : row.keyframes) === null || _a === void 0 ? void 0 : _a.length) || 0;
                chai.expect(len > 0).equal(true);
                if (row.keyframes) {
                    row.keyframes.forEach(function (keyframe) {
                        chai.expect(keyframe.selected).equal(false);
                    });
                }
            });
        });
        it('Select one and deselect other all', function () {
            var timeline = new animation_timeline_1.Timeline();
            timeline._model = model;
            var expectedChanged = 0;
            // Select all
            model.rows.forEach(function (row) {
                var _a;
                var len = ((_a = row === null || row === void 0 ? void 0 : row.keyframes) === null || _a === void 0 ? void 0 : _a.length) || 0;
                chai.expect(len > 0).equal(true);
                if (row.keyframes) {
                    row.keyframes.forEach(function (keyframe) {
                        keyframe.selectable = true;
                        keyframe.selected = true;
                        expectedChanged++;
                    });
                }
            });
            // select one will deselect other
            var rowToSelect = model.rows[1];
            chai.expect(!!rowToSelect.keyframes).equal(true);
            if (!rowToSelect.keyframes) {
                return;
            }
            // toggle selection
            var toSelect = rowToSelect.keyframes[0];
            var element = timeline.select(toSelect);
            chai.expect(element.selectionChanged).equal(true);
            chai.expect(element.selected.length).equal(1);
            chai.expect(element.changed.length).equal(expectedChanged - 1);
            model.rows.forEach(function (row) {
                var _a;
                var len = ((_a = row === null || row === void 0 ? void 0 : row.keyframes) === null || _a === void 0 ? void 0 : _a.length) || 0;
                chai.expect(len > 0).equal(true);
                if (row.keyframes) {
                    row.keyframes.forEach(function (keyframe) {
                        if (toSelect == keyframe) {
                            chai.expect(keyframe.selected).equal(true);
                        }
                        else {
                            chai.expect(keyframe.selected).equal(false);
                        }
                    });
                }
            });
        });
        it('Revert selection (Toggle)', function () {
            var timeline = new animation_timeline_1.Timeline();
            timeline._model = model;
            var totalKeyframes = 0;
            // Select all
            model.rows.forEach(function (row) {
                var _a;
                var len = ((_a = row === null || row === void 0 ? void 0 : row.keyframes) === null || _a === void 0 ? void 0 : _a.length) || 0;
                chai.expect(len > 0).equal(true);
                if (row.keyframes) {
                    row.keyframes.forEach(function (keyframe) {
                        keyframe.selectable = true;
                        keyframe.selected = true;
                        totalKeyframes++;
                    });
                }
            });
            var rowToSelect = model.rows[1];
            chai.expect(!!rowToSelect.keyframes).equal(true);
            if (!rowToSelect.keyframes) {
                return;
            }
            // toggle selection
            var toSelect = rowToSelect.keyframes[0];
            // item is selected, should be reverted
            var element = timeline.select(toSelect, animation_timeline_1.TimelineSelectionMode.Revert);
            chai.expect(element.selectionChanged).equal(true);
            chai.expect(element.selected.length).equal(totalKeyframes - 1);
            chai.expect(element.changed.length).equal(1);
            model.rows.forEach(function (row) {
                var _a;
                chai.expect((((_a = row.keyframes) === null || _a === void 0 ? void 0 : _a.length) || 0) > 0).equal(true);
                if (row.keyframes) {
                    row.keyframes.forEach(function (keyframe) {
                        if (toSelect == keyframe) {
                            chai.expect(keyframe.selected).equal(false);
                        }
                        else {
                            chai.expect(keyframe.selected).equal(true);
                        }
                    });
                }
            });
        });
        it('Select full row', function () {
            var timeline = new animation_timeline_1.Timeline();
            timeline._model = model;
            // Deselect all
            model.rows.forEach(function (row) {
                var _a;
                var len = ((_a = row === null || row === void 0 ? void 0 : row.keyframes) === null || _a === void 0 ? void 0 : _a.length) || 0;
                chai.expect(len > 0).equal(true);
                if (row.keyframes) {
                    row.keyframes.forEach(function (keyframe) {
                        keyframe.selectable = true;
                        keyframe.selected = false;
                    });
                }
            });
            // select one will deselect other
            var rowToSelect = model.rows[1];
            chai.expect(!!rowToSelect.keyframes).equal(true);
            if (!rowToSelect.keyframes) {
                return;
            }
            var element = timeline.select(rowToSelect.keyframes);
            chai.expect(element.selectionChanged).equal(true);
            chai.expect(element.selected.length).equal(rowToSelect.keyframes.length);
            chai.expect(element.changed.length).equal(3);
            model.rows.forEach(function (row) {
                var _a, _b;
                if (rowToSelect === row) {
                    var len = ((_a = row === null || row === void 0 ? void 0 : row.keyframes) === null || _a === void 0 ? void 0 : _a.length) || 0;
                    chai.expect(len > 0).equal(true);
                    if (rowToSelect.keyframes) {
                        rowToSelect.keyframes.forEach(function (keyframe) {
                            chai.expect(keyframe.selected).equal(true);
                        });
                    }
                }
                else {
                    var len = ((_b = row === null || row === void 0 ? void 0 : row.keyframes) === null || _b === void 0 ? void 0 : _b.length) || 0;
                    chai.expect(len > 0).equal(true);
                    if (row.keyframes) {
                        row.keyframes.forEach(function (keyframe) {
                            chai.expect(keyframe.selected).equal(false);
                        });
                    }
                }
            });
        });
        it('Append select', function () {
            var _a, _b, _c, _d, _e;
            var timeline = new animation_timeline_1.Timeline();
            timeline._model = model;
            // Deselect all
            model.rows.forEach(function (row) {
                var _a;
                var len = ((_a = row === null || row === void 0 ? void 0 : row.keyframes) === null || _a === void 0 ? void 0 : _a.length) || 0;
                chai.expect(len > 0).equal(true);
                if (row.keyframes) {
                    row.keyframes.forEach(function (keyframe) {
                        keyframe.selected = false;
                    });
                }
            });
            // select one row (array of the keyframes)
            var rowToSelect = model.rows[1];
            chai.expect(!!rowToSelect.keyframes).equal(true);
            if (!rowToSelect.keyframes) {
                return;
            }
            var results = timeline.select(rowToSelect.keyframes);
            chai.expect(results.selectionChanged).equal(true);
            chai.expect(results.selected.length).equal((_a = rowToSelect.keyframes) === null || _a === void 0 ? void 0 : _a.length);
            chai.expect(results.changed.length).equal((_b = rowToSelect.keyframes) === null || _b === void 0 ? void 0 : _b.length);
            // (array of the keyframes)
            var rowToSelect2 = model.rows[2];
            results = timeline.select((rowToSelect2 === null || rowToSelect2 === void 0 ? void 0 : rowToSelect2.keyframes) || [], animation_timeline_1.TimelineSelectionMode.Append);
            chai.expect(results.selectionChanged).equal(true);
            chai.expect(results.selected.length).equal((((_c = rowToSelect === null || rowToSelect === void 0 ? void 0 : rowToSelect.keyframes) === null || _c === void 0 ? void 0 : _c.length) || 0) + (((_d = rowToSelect2 === null || rowToSelect2 === void 0 ? void 0 : rowToSelect2.keyframes) === null || _d === void 0 ? void 0 : _d.length) || 0));
            chai.expect(results.changed.length).equal((_e = rowToSelect2 === null || rowToSelect2 === void 0 ? void 0 : rowToSelect2.keyframes) === null || _e === void 0 ? void 0 : _e.length);
            model.rows.forEach(function (row) {
                var _a, _b;
                if (rowToSelect === row || rowToSelect2 === row) {
                    chai.expect((((_a = rowToSelect.keyframes) === null || _a === void 0 ? void 0 : _a.length) || 0) > 0).equal(true);
                    if (rowToSelect.keyframes) {
                        rowToSelect.keyframes.forEach(function (keyframe) {
                            chai.expect(keyframe.selected).equal(true);
                        });
                    }
                }
                else {
                    chai.expect((((_b = row.keyframes) === null || _b === void 0 ? void 0 : _b.length) || 0) > 0).equal(true);
                    if (row.keyframes) {
                        row.keyframes.forEach(function (keyframe) {
                            chai.expect(keyframe.selected).equal(false);
                        });
                    }
                }
            });
        });
    });
    describe('Coordinates', function () {
        it('Coordinates', function () {
            var timeline = new animation_timeline_1.Timeline();
            timeline._setOptions({
                stepVal: 100,
                stepPx: 50,
                zoom: 1,
            });
            chai.expect(timeline.valToPx(0)).equal(0);
            chai.expect(timeline.valToPx(100)).equal(50);
            chai.expect(timeline.valToPx(200)).equal(100);
            chai.expect(timeline.pxToVal(0)).equal(0);
            chai.expect(timeline.pxToVal(50)).equal(100);
            chai.expect(timeline.pxToVal(100)).equal(200);
        });
        it('Coordinates. min is negative', function () {
            var timeline = new animation_timeline_1.Timeline();
            timeline._setOptions({
                stepVal: 100,
                stepPx: 50,
                min: -100,
                zoom: 1,
            });
            chai.expect(timeline.valToPx(-100)).equal(0);
            chai.expect(timeline.valToPx(-50)).equal(25);
            chai.expect(timeline.valToPx(0)).equal(50);
            chai.expect(timeline.valToPx(50)).equal(75);
            chai.expect(timeline.valToPx(100)).equal(100);
            chai.expect(timeline.pxToVal(0)).equal(-100);
            chai.expect(timeline.pxToVal(25)).equal(-50);
            chai.expect(timeline.pxToVal(50)).equal(0);
            chai.expect(timeline.pxToVal(75)).equal(50);
            chai.expect(timeline.pxToVal(100)).equal(100);
        });
        it('Coordinates. min is positive', function () {
            var timeline = new animation_timeline_1.Timeline();
            timeline._setOptions({
                stepVal: 100,
                stepPx: 50,
                min: 100,
                zoom: 1,
            });
            chai.expect(timeline.valToPx(100)).equal(0);
            chai.expect(timeline.valToPx(150)).equal(25);
            chai.expect(timeline.pxToVal(0)).equal(100);
            chai.expect(timeline.pxToVal(25)).equal(150);
        });
        it('Zoom is respected', function () {
            var timeline = new animation_timeline_1.Timeline();
            timeline._setOptions({
                stepVal: 100,
                stepPx: 50,
                zoom: 1,
            });
            chai.expect(timeline.valToPx(0)).equal(0);
            chai.expect(timeline.valToPx(100)).equal(50);
            chai.expect(timeline.valToPx(200)).equal(100);
            timeline._setZoom(2);
            chai.expect(timeline.valToPx(0)).equal(0);
            chai.expect(timeline.valToPx(100)).equal(25);
            chai.expect(timeline.valToPx(200)).equal(50);
            chai.expect(timeline.pxToVal(0)).equal(0);
            chai.expect(timeline.pxToVal(25)).equal(100);
            chai.expect(timeline.pxToVal(50)).equal(200);
        });
    });
    describe('Snapping', function () {
        it('Snapping', function () {
            var timeline = new animation_timeline_1.Timeline();
            timeline._setOptions({
                stepVal: 100,
                stepPx: 50,
                snapStep: 25,
                zoom: 1,
            });
            chai.expect(timeline.snapVal(0)).equal(0);
            chai.expect(timeline.snapVal(10)).equal(0);
            chai.expect(timeline.snapVal(26)).equal(25);
            chai.expect(timeline.snapVal(48)).equal(50);
            chai.expect(timeline.snapVal(58)).equal(50);
        });
        it('Snapping. min is defined', function () {
            var timeline = new animation_timeline_1.Timeline();
            timeline._setOptions({
                stepVal: 100,
                stepPx: 50,
                snapStep: 25,
                min: 5,
                zoom: 1,
            });
            chai.expect(timeline.snapVal(0)).equal(5);
            chai.expect(timeline.snapVal(10)).equal(5);
            chai.expect(timeline.snapVal(26)).equal(30);
            chai.expect(timeline.snapVal(48)).equal(55);
            chai.expect(timeline.snapVal(58)).equal(55);
            // Don't overlap the limit.
            chai.expect(timeline.snapVal(-100)).equal(5);
        });
        it('Snapping. negative min is defined', function () {
            var timeline = new animation_timeline_1.Timeline();
            timeline._setOptions({
                stepVal: 100,
                stepPx: 50,
                snapStep: 25,
                min: -55,
                zoom: 1,
            });
            chai.expect(timeline.snapVal(0)).equal(-5);
            chai.expect(timeline.snapVal(10)).equal(-5);
            chai.expect(timeline.snapVal(26)).equal(20);
            chai.expect(timeline.snapVal(48)).equal(45);
            chai.expect(timeline.snapVal(58)).equal(45);
            chai.expect(timeline.snapVal(-1)).equal(-5);
            chai.expect(timeline.snapVal(-10)).equal(-5);
            chai.expect(timeline.snapVal(-26)).equal(-30);
            chai.expect(timeline.snapVal(-48)).equal(-55);
            chai.expect(timeline.snapVal(-58)).equal(-55);
            // Don't overlap the limit.
            chai.expect(timeline.snapVal(-100)).equal(-55);
        });
        it('TimelineUtils.isNumber', function () {
            chai.expect(animation_timeline_1.TimelineUtils.isNumber(0)).equal(true);
            chai.expect(animation_timeline_1.TimelineUtils.isNumber(-1)).equal(true);
            chai.expect(animation_timeline_1.TimelineUtils.isNumber(1)).equal(true);
            chai.expect(animation_timeline_1.TimelineUtils.isNumber(null)).equal(false);
            chai.expect(animation_timeline_1.TimelineUtils.isNumber(undefined)).equal(false);
            chai.expect(animation_timeline_1.TimelineUtils.isNumber(Number.NEGATIVE_INFINITY)).equal(false);
            chai.expect(animation_timeline_1.TimelineUtils.isNumber(Number.NaN)).equal(false);
        });
        it('TimelineUtils.keepInBounds', function () {
            chai.expect(animation_timeline_1.TimelineUtils.keepInBounds(0, -1, 2)).equal(0);
            chai.expect(animation_timeline_1.TimelineUtils.keepInBounds(0, 1, 2)).equal(1);
            chai.expect(animation_timeline_1.TimelineUtils.keepInBounds(0, 1, null)).equal(1);
            chai.expect(animation_timeline_1.TimelineUtils.keepInBounds(10, null, 2)).equal(2);
            chai.expect(animation_timeline_1.TimelineUtils.keepInBounds(-10, -1, 2)).equal(-1);
            chai.expect(animation_timeline_1.TimelineUtils.keepInBounds(-10, 2, 2)).equal(2);
            chai.expect(animation_timeline_1.TimelineUtils.keepInBounds(10, 1, 2)).equal(2);
        });
        it('TimelineUtils.cutBounds', function () {
            var cutInformation = new animation_timeline_1.Timeline()._cutBoundsWhenOverlap({
                x: 0,
                y: 0,
                width: 100,
                height: 100,
                bottom: 0,
                left: 0,
                right: 0,
                top: 0,
                toJSON: function () {
                    return '';
                },
            }, 10, 50, 10, 50);
            chai.assert(cutInformation);
            var rect = cutInformation.rect;
            chai.assert(rect);
            chai.expect(rect.x).equal(10);
            chai.expect(rect.y).equal(10);
            chai.expect(rect.width).equal(90);
            chai.expect(rect.height).equal(90);
        });
        it('Snapping. negative min (-25) is defined', function () {
            var timeline = new animation_timeline_1.Timeline();
            timeline._setOptions({
                stepVal: 100,
                stepPx: 50,
                snapStep: 25,
                min: -25,
                zoom: 1,
            });
            chai.expect(timeline.snapVal(-1)).equal(0);
            chai.expect(timeline.snapVal(-10)).equal(0);
            chai.expect(timeline.snapVal(10)).equal(0);
            chai.expect(timeline.snapVal(26)).equal(25);
            chai.expect(timeline.snapVal(50)).equal(50);
            chai.expect(timeline.snapVal(-58)).equal(-25);
        });
    });
    describe('Move Keyframes', function () {
        it('move left', function () {
            var _a, _b;
            var timeline = new animation_timeline_1.Timeline();
            timeline._options = {};
            var item1 = 25;
            var item2 = 50;
            var model = {
                rows: [{ val: 0, keyframes: [{ val: item1 }, { val: item2 }] }],
            };
            timeline._model = model;
            var move = -50;
            var row = model.rows[0];
            chai.expect(!!row).equal(true);
            if (!row) {
                return;
            }
            var keyframes = row.keyframes;
            chai.expect(!!keyframes).equal(true);
            if (!keyframes) {
                return;
            }
            var movedOffset = timeline._moveElements(move, [
                {
                    keyframe: keyframes[1],
                    row: row,
                },
                {
                    keyframe: keyframes[0],
                    row: row,
                },
            ]);
            chai.expect(movedOffset).equal(move);
            chai.expect((_a = keyframes[0]) === null || _a === void 0 ? void 0 : _a.val).equal(item1 + move);
            chai.expect((_b = keyframes[1]) === null || _b === void 0 ? void 0 : _b.val).equal(item2 + move);
        });
        it('move right', function () {
            var _a, _b;
            var timeline = new animation_timeline_1.Timeline();
            var item1 = 25;
            var item2 = 50;
            var keyframesModels = [{ val: item1 }, { val: item2 }];
            var model = {
                rows: [{ keyframes: keyframesModels }],
            };
            timeline._model = model;
            var move = 100;
            var row = model.rows[0];
            chai.expect(!!row).equal(true);
            if (!row) {
                return;
            }
            var keyframes = row.keyframes;
            chai.expect(!!keyframes).equal(true);
            if (!keyframes) {
                return;
            }
            var movedOffset = timeline._moveElements(move, [
                {
                    keyframe: keyframes[1],
                    row: row,
                },
                {
                    keyframe: keyframes[0],
                    row: row,
                },
            ]);
            chai.expect(movedOffset).equal(move);
            chai.expect((_a = keyframes[0]) === null || _a === void 0 ? void 0 : _a.val).equal(item1 + move);
            chai.expect((_b = keyframes[1]) === null || _b === void 0 ? void 0 : _b.val).equal(item2 + move);
        });
        it('move left limited by min', function () {
            var _a, _b;
            var timeline = new animation_timeline_1.Timeline();
            var item1 = 25;
            var item2 = 50;
            timeline._options = { min: 0, max: 75 };
            var move = -50;
            var elementsToMove = [
                {
                    keyframe: { val: item1 },
                },
                {
                    keyframe: { val: item2 },
                },
            ];
            var movedOffset = timeline._moveElements(move, elementsToMove);
            chai.expect(movedOffset).equal(move / 2);
            chai.expect((_a = elementsToMove[0].keyframe) === null || _a === void 0 ? void 0 : _a.val).equal(0);
            chai.expect((_b = elementsToMove[1].keyframe) === null || _b === void 0 ? void 0 : _b.val).equal(25);
        });
        it('move right limited by max', function () {
            var _a, _b;
            var timeline = new animation_timeline_1.Timeline();
            var item1 = 25;
            var item2 = 50;
            timeline._options = { min: 0, max: 100 };
            var move = 100;
            var elementsToMove = [
                {
                    keyframe: { val: item1 },
                },
                {
                    keyframe: { val: item2 },
                },
            ];
            var movedOffset = timeline._moveElements(move, elementsToMove);
            chai.expect(movedOffset).equal(move / 2);
            chai.expect((_a = elementsToMove[0].keyframe) === null || _a === void 0 ? void 0 : _a.val).equal(item1 + 50);
            chai.expect((_b = elementsToMove[1].keyframe) === null || _b === void 0 ? void 0 : _b.val).equal(item2 + 50);
        });
        it('move right limited by max negative', function () {
            var _a, _b;
            var timeline = new animation_timeline_1.Timeline();
            var item1 = -125;
            var item2 = -150;
            timeline._options = { min: -200, max: -100 };
            var move = 100;
            var elementsToMove = [
                {
                    keyframe: { val: item1 },
                },
                {
                    keyframe: { val: item2 },
                },
            ];
            var movedOffset = timeline._moveElements(move, elementsToMove);
            chai.expect(movedOffset).equal(25);
            chai.expect((_a = elementsToMove[0].keyframe) === null || _a === void 0 ? void 0 : _a.val).equal(item1 + 25);
            chai.expect((_b = elementsToMove[1].keyframe) === null || _b === void 0 ? void 0 : _b.val).equal(item2 + 25);
        });
        it('move right limited by max negative when other row out of the bounds', function () {
            var _a, _b, _c, _d;
            var timeline = new animation_timeline_1.Timeline();
            timeline._options = { min: 0, max: 600 };
            var move = 200;
            var row = { max: 500 };
            var row2 = {};
            var elementsToMove = [
                {
                    keyframe: { val: 100 },
                    row: row,
                },
                {
                    keyframe: { val: 400 },
                    row: row,
                },
                {
                    keyframe: { val: 200 },
                    row: row2,
                },
                {
                    keyframe: { val: 300 },
                    row: row2,
                },
            ];
            var movedOffset = timeline._moveElements(move, elementsToMove);
            var moved = move / 2;
            chai.expect(movedOffset).equal(moved);
            chai.expect((_a = elementsToMove[0].keyframe) === null || _a === void 0 ? void 0 : _a.val).equal(100 + moved);
            chai.expect((_b = elementsToMove[1].keyframe) === null || _b === void 0 ? void 0 : _b.val).equal(400 + moved);
            chai.expect((_c = elementsToMove[2].keyframe) === null || _c === void 0 ? void 0 : _c.val).equal(200 + moved);
            chai.expect((_d = elementsToMove[3].keyframe) === null || _d === void 0 ? void 0 : _d.val).equal(300 + moved);
        });
        it('move left limited by min negative', function () {
            var _a, _b;
            var timeline = new animation_timeline_1.Timeline();
            var item1 = -125;
            var item2 = -150;
            timeline._options = { min: -200, max: -100 };
            var move = -100;
            var elementsToMove = [
                {
                    keyframe: { val: item1 },
                },
                {
                    keyframe: { val: item2 },
                },
            ];
            var movedOffset = timeline._moveElements(move, elementsToMove);
            chai.expect(movedOffset).equal(move / 2);
            chai.expect((_a = elementsToMove[0].keyframe) === null || _a === void 0 ? void 0 : _a.val).equal(item1 - 50);
            chai.expect((_b = elementsToMove[1].keyframe) === null || _b === void 0 ? void 0 : _b.val).equal(item2 - 50);
        });
        it('move left only one keyframe is limited', function () {
            var _a, _b;
            var timeline = new animation_timeline_1.Timeline();
            var move = 100;
            var row = { min: 0, max: 100 };
            var elementsToMove = [
                {
                    keyframe: { val: 25 },
                    row: row,
                },
                {
                    keyframe: { val: 50 },
                    row: row,
                },
            ];
            var movedOffset = timeline._moveElements(move, elementsToMove);
            chai.expect(movedOffset).equal(move / 2);
            chai.expect((_a = elementsToMove[0].keyframe) === null || _a === void 0 ? void 0 : _a.val).equal(25 + 50);
            chai.expect((_b = elementsToMove[1].keyframe) === null || _b === void 0 ? void 0 : _b.val).equal(50 + 50);
        });
        it('move left only one keyframe has min bounds', function () {
            var _a, _b;
            var timeline = new animation_timeline_1.Timeline();
            var move = -100;
            var row = { min: 0, max: 100 };
            var elementsToMove = [
                {
                    keyframe: { val: 25, min: 5 },
                    row: row,
                },
                {
                    keyframe: { val: 50, min: 25 },
                    row: row,
                },
            ];
            var movedOffset = timeline._moveElements(move, elementsToMove);
            chai.expect(movedOffset).equal(-20);
            chai.expect((_a = elementsToMove[0].keyframe) === null || _a === void 0 ? void 0 : _a.val).equal(5);
            chai.expect((_b = elementsToMove[1].keyframe) === null || _b === void 0 ? void 0 : _b.val).equal(30);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmVUZXN0cy50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vdGVzdHMvdGltZWxpbmVUZXN0cy50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdURBQXVEO0FBQ3ZELGdFQWNtQztBQUVuQyxRQUFRLENBQUMsVUFBVSxFQUFFO0lBQ25CLFFBQVEsQ0FBQyx1QkFBdUIsRUFBRTtRQUNoQyxFQUFFLENBQUMsNkJBQTZCLEVBQUU7WUFDaEMsSUFBTSxRQUFRLEdBQUcsSUFBSSw2QkFBUSxFQUFFLENBQUM7WUFDaEMsSUFBTSxRQUFRLEdBQUc7Z0JBQ2Y7b0JBQ0UsSUFBSSxFQUFFLHdDQUFtQixDQUFDLEtBQUs7b0JBQy9CLEdBQUcsRUFBRSxDQUFDO2lCQUNZO2dCQUNwQjtvQkFDRSxJQUFJLEVBQUUsd0NBQW1CLENBQUMsUUFBUTtvQkFDbEMsR0FBRyxFQUFFLENBQUM7aUJBQ1k7YUFDckIsQ0FBQztZQUNGLElBQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDNUQsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDWixNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7YUFDNUM7WUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsd0NBQW1CLENBQUMsUUFBUSxFQUFFLHdDQUFtQixDQUFDLFFBQVEsR0FBRyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3RILENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLDZCQUE2QixFQUFFO1lBQ2hDLElBQU0sUUFBUSxHQUFHLElBQUksNkJBQVEsRUFBRSxDQUFDO1lBQ2hDLElBQU0sUUFBUSxHQUFHO2dCQUNmO29CQUNFLElBQUksRUFBRSx3Q0FBbUIsQ0FBQyxRQUFRO29CQUNsQyxHQUFHLEVBQUUsQ0FBQztpQkFDWTtnQkFDcEI7b0JB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QixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxrQ0FBYSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0QsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsNEJBQTRCLEVBQUU7WUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxrQ0FBYSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxrQ0FBYSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFELElBQUksQ0FBQyxNQUFNLENBQUMsa0NBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3RCxJQUFJLENBQUMsTUFBTSxDQUFDLGtDQUFhLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxrQ0FBYSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlELElBQUksQ0FBQyxNQUFNLENBQUMsa0NBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVELElBQUks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