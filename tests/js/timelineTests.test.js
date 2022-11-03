"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
var animation_timeline_1 = require("../lib/animation-timeline");
describe('Timeline', function () {
    describe('_filterDraggableElements', function () {
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
            var element = timeline._filterDraggableElements(elements, 5);
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
            var element = timeline._filterDraggableElements(elements, 5);
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
            var element = timeline._filterDraggableElements(elements, 5);
            if (!element) {
                throw new Error('element cannot be empty');
            }
            chai.expect(element.type).equal(animation_timeline_1.TimelineElementType.Timeline, animation_timeline_1.TimelineElementType.Timeline + ' should be selected');
            // Keyframe with value 5 should be selected
            chai.expect(element.val).equal(5);
        });
        it('Group should be selected', function () {
            var timeline = new animation_timeline_1.Timeline();
            var elements = [
                {
                    type: animation_timeline_1.TimelineElementType.Group,
                    val: 5,
                },
            ];
            var element = timeline._filterDraggableElements(elements, 5);
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
            var element = timeline._filterDraggableElements(elements, 5);
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
                rowsStyle: {
                    keyframesStyle: {
                        draggable: false,
                    },
                },
            };
            var element = timeline._filterDraggableElements(elements, 5);
            chai.expect(element.type).equal(animation_timeline_1.TimelineElementType.Group, 'Group should be selected');
        });
        it('Keyframes are not draggable by row settings', function () {
            var timeline = new animation_timeline_1.Timeline();
            var elements = [
                {
                    type: animation_timeline_1.TimelineElementType.Keyframe,
                    val: 4,
                    row: {
                        keyframesStyle: {
                            draggable: false,
                        },
                    },
                },
                {
                    type: animation_timeline_1.TimelineElementType.Keyframe,
                    val: 5,
                    row: {
                        keyframesStyle: {
                            draggable: true,
                        },
                    },
                },
            ];
            // Apply global options::
            var element = timeline._filterDraggableElements(elements, 4);
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
                        keyframesStyle: {
                            draggable: false,
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
                            keyframesStyle: {},
                        },
                    },
                },
            ];
            // Apply global options::
            var element = timeline._filterDraggableElements(elements, 4);
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
            timeline._options = null;
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
            var model = {
                rows: [{ val: 0, keyframes: [{ val: item1 }, { val: item2 }] }],
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
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmVUZXN0cy50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdGltZWxpbmVUZXN0cy50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdURBQXVEO0FBQ3ZELGdFQVltQztBQUVuQyxRQUFRLENBQUMsVUFBVSxFQUFFO0lBQ25CLFFBQVEsQ0FBQywwQkFBMEIsRUFBRTtRQUNuQyxFQUFFLENBQUMsNkJBQTZCLEVBQUU7WUFDaEMsSUFBTSxRQUFRLEdBQUcsSUFBSSw2QkFBUSxFQUFFLENBQUM7WUFDaEMsSUFBTSxRQUFRLEdBQUc7Z0JBQ2Y7b0JBQ0UsSUFBSSxFQUFFLHdDQUFtQixDQUFDLEtBQUs7b0JBQy9CLEdBQUcsRUFBRSxDQUFDO2lCQUNZO2dCQUNwQjtvQkFDRSxJQUFJLEVBQUUsd0NBQW1CLENBQUMsUUFBUTtvQkFDbEMsR0FBRyxFQUFFLENBQUM7aUJBQ1k7YUFDckIsQ0FBQztZQUNGLElBQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDL0QsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDWixNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7YUFDNUM7WUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsd0NBQW1CLENBQUMsUUFBUSxFQUFFLHdDQUFtQixDQUFDLFFBQVEsR0FBRyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3RILENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLDZCQUE2QixFQUFFO1lBQ2hDLElBQU0sUUFBUSxHQUFHLElBQUksNkJBQVEsRUFBRSxDQUFDO1lBQ2hDLElBQU0sUUFBUSxHQUFHO2dCQUNmO29CQUNFLElBQUksRUFBRSx3Q0FBbUIsQ0FBQyxRQUFRO29CQUNsQyxHQUFHLEVBQUUsQ0FBQztpQkFDWTtnQkFDcEI7b0JBQ0UsSUFBSSxF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QkFDWixNQUFNLEVBQUUsRUFBRTtnQkFDVixHQUFHLEVBQUUsQ0FBQyxHQUFHO2dCQUNULElBQUksRUFBRSxDQUFDO2FBQ1csQ0FBQyxDQUFDO1lBRXRCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRTlDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hELENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLDhCQUE4QixFQUFFO1lBQ2pDLElBQU0sUUFBUSxHQUFHLElBQUksNkJBQVEsRUFBRSxDQUFDO1lBQ2hDLFFBQVEsQ0FBQyxXQUFXLENBQUM7Z0JBQ25CLE9BQU8sRUFBRSxHQUFHO2dCQUNaLE1BQU0sRUFBRSxFQUFFO2dCQUNWLEdBQUcsRUFBRSxHQUFHO2dCQUNSLElBQUksRUFBRSxDQUFDO2FBQ1csQ0FBQyxDQUFDO1lBRXRCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMvQyxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxtQkFBbUIsRUFBRTtZQUN0QixJQUFNLFFBQVEsR0FBRyxJQUFJLDZCQUFRLEVBQUUsQ0FBQztZQUNoQyxRQUFRLENBQUMsV0FBVyxDQUFDO2dCQUNuQixPQUFPLEVBQUUsR0FBRztnQkFDWixNQUFNLEVBQUUsRUFBRTtnQkFDVixJQUFJLEVBQUUsQ0FBQzthQUNXLENBQUMsQ0FBQztZQUV0QixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM5QyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRTdDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDSCxRQUFRLENB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WUFDM0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFNUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDOUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRTlDLDJCQUEyQjtZQUMzQixJQUFJLENB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