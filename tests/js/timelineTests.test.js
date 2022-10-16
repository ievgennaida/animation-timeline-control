"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
var animation_timeline_1 = require("../lib/animation-timeline");
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
            var element = timeline._findDraggable(elements, 5);
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
            var element = timeline._findDraggable(elements, 5);
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
            var element = timeline._findDraggable(elements, 5);
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
            var element = timeline._findDraggable(elements, 5);
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
            var element = timeline._findDraggable(elements, 5);
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
            var element = timeline._findDraggable(elements, 4);
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
            var element = timeline._findDraggable(elements, 4);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmVUZXN0cy50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdGltZWxpbmVUZXN0cy50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdURBQXVEO0FBQ3ZELGdFQVltQztBQUVuQyxRQUFRLENBQUMsVUFBVSxFQUFFO0lBQ25CLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRTtRQUN6QixFQUFFLENBQUMsNkJBQTZCLEVBQUU7WUFDaEMsSUFBTSxRQUFRLEdBQUcsSUFBSSw2QkFBUSxFQUFFLENBQUM7WUFDaEMsSUFBTSxRQUFRLEdBQUc7Z0JBQ2Y7b0JBQ0UsSUFBSSxFQUFFLHdDQUFtQixDQUFDLEtBQUs7b0JBQy9CLEdBQUcsRUFBRSxDQUFDO2lCQUNZO2dCQUNwQjtvQkFDRSxJQUFJLEVBQUUsd0NBQW1CLENBQUMsUUFBUTtvQkFDbEMsR0FBRyxFQUFFLENBQUM7aUJBQ1k7YUFDckIsQ0FBQztZQUNGLElBQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3JELElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ1osTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO2FBQzVDO1lBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLHdDQUFtQixDQUFDLFFBQVEsRUFBRSx3Q0FBbUIsQ0FBQyxRQUFRLEdBQUcscUJBQXFCLENBQUMsQ0FBQztRQUN0SCxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyw2QkFBNkIsRUFBRTtZQUNoQyxJQUFNLFFBQVEsR0FBRyxJQUFJLDZCQUFRLEVBQUUsQ0FBQztZQUNoQyxJQUFNLFFBQVEsR0FBRztnQkFDZjtvQkFDRSxJQUFJLEVBQUUsd0NBQW1CLENBQUMsUUFBUTtvQkFDbEMsR0FBRyxFQUFFLENBQUM7aUJBQ1k7Z0JBQ3BCO29CQUNFLElBQUksRUFB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QUFFO2dCQUNWLEdBQUcsRUFBRSxDQUFDLEdBQUc7Z0JBQ1QsSUFBSSxFQUFFLENBQUM7YUFDVyxDQUFDLENBQUM7WUFFdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzNDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFOUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEQsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsOEJBQThCLEVBQUU7WUFDakMsSUFBTSxRQUFRLEdBQUcsSUFBSSw2QkFBUSxFQUFFLENBQUM7WUFDaEMsUUFBUSxDQUFDLFdBQVcsQ0FBQztnQkFDbkIsT0FBTyxFQUFFLEdBQUc7Z0JBQ1osTUFBTSxFQUFFLEVBQUU7Z0JBQ1YsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsSUFBSSxFQUFFLENBQUM7YUFDVyxDQUFDLENBQUM7WUFFdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUU3QyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLG1CQUFtQixFQUFFO1lBQ3RCLElBQU0sUUFBUSxHQUFHLElBQUksNkJBQVEsRUFBRSxDQUFDO1lBQ2hDLFFBQVEsQ0FBQyxXQUFXLENBQUM7Z0JBQ25CLE9BQU8sRUFBRSxHQUFHO2dCQUNaLE1BQU0sRUFBRSxFQUFFO2dCQUNWLElBQUksRUFBRSxDQUFDO2FBQ1csQ0FBQyxDQUFDO1lBRXRCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzlDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM3QyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM3QyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDL0MsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUNILFFBQVEsQ0FBQyxVQUFVLEVBQUU7UUFD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TUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUU1QyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFOUMsMkJBQTJCO1lBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFB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