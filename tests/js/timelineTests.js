"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
var animation_timeline_1 = require("./../lib/animation-timeline");
// Always check that output lib is referenced.
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
            asserts_1.assert.equal(element.val, elements[1].val);
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
            asserts_1.assert.equal(element.type, animation_timeline_1.TimelineElementType.Group, 'Group should be selected');
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
            asserts_1.assert.equal(element.val, 5);
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
            asserts_1.assert.equal(element.val, 5);
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
            asserts_1.assert.equal(element.selectionChanged, true);
            var changed = 0;
            model.rows.forEach(function (row) {
                row.keyframes.forEach(function (keyframe) {
                    asserts_1.assert.equal(keyframe.selected, true);
                    changed++;
                });
            });
            asserts_1.assert.equal(element.selected.length, changed);
        });
        it('Select all selectable', function () {
            var timeline = new animation_timeline_1.Timeline();
            timeline._model = model;
            var element = timeline.getAllKeyframes();
            var changed = 0;
            var selectable = 0;
            model.rows.forEach(function (row) {
                row.keyframes.forEach(function (keyframe) {
                    keyframe.selected = false;
                    keyframe.selectable = changed % 2 === 0;
                    if (keyframe.selectable) {
                        selectable++;
                    }
                    changed++;
                });
            });
            var selectionResults = timeline.select(element);
            asserts_1.assert.equal(selectionResults.changed.length, selectable);
            asserts_1.assert.equal(selectionResults.selected.length, selectable);
        });
        it('Deselect all', function () {
            var timeline = new animation_timeline_1.Timeline();
            timeline._model = model;
            model.rows.forEach(function (row) {
                row.keyframes.forEach(function (keyframe) {
                    keyframe.selectable = true;
                    keyframe.selected = true;
                });
            });
            // deselect all
            var element = timeline.deselectAll();
            asserts_1.assert.equal(element.selectionChanged, true);
            asserts_1.assert.equal(element.selected.length, 0);
            model.rows.forEach(function (row) {
                row.keyframes.forEach(function (keyframe) {
                    asserts_1.assert.equal(keyframe.selected, false);
                });
            });
        });
        it('Select one and deselect other all', function () {
            var timeline = new animation_timeline_1.Timeline();
            timeline._model = model;
            var expectedChanged = 0;
            // Select all
            model.rows.forEach(function (row) {
                row.keyframes.forEach(function (keyframe) {
                    keyframe.selectable = true;
                    keyframe.selected = true;
                    expectedChanged++;
                });
            });
            // select one will deselect other
            var toSelect = model.rows[1].keyframes[0];
            var element = timeline.select(toSelect);
            asserts_1.assert.equal(element.selectionChanged, true);
            asserts_1.assert.equal(element.selected.length, 1);
            asserts_1.assert.equal(element.changed.length, expectedChanged - 1);
            model.rows.forEach(function (row) {
                row.keyframes.forEach(function (keyframe) {
                    if (toSelect == keyframe) {
                        asserts_1.assert.equal(keyframe.selected, true);
                    }
                    else {
                        asserts_1.assert.equal(keyframe.selected, false);
                    }
                });
            });
        });
        it('Revert selection (Toggle)', function () {
            var timeline = new animation_timeline_1.Timeline();
            timeline._model = model;
            var totalKeyframes = 0;
            // Select all
            model.rows.forEach(function (row) {
                row.keyframes.forEach(function (keyframe) {
                    keyframe.selectable = true;
                    keyframe.selected = true;
                    totalKeyframes++;
                });
            });
            // toggle selection
            var toSelect = model.rows[1].keyframes[0];
            // item is selected, should be reverted
            var element = timeline.select(toSelect, animation_timeline_1.TimelineSelectionMode.Revert);
            asserts_1.assert.equal(element.selectionChanged, true);
            asserts_1.assert.equal(element.selected.length, totalKeyframes - 1);
            asserts_1.assert.equal(element.changed.length, 1);
            model.rows.forEach(function (row) {
                row.keyframes.forEach(function (keyframe) {
                    if (toSelect == keyframe) {
                        asserts_1.assert.equal(keyframe.selected, false);
                    }
                    else {
                        asserts_1.assert.equal(keyframe.selected, true);
                    }
                });
            });
        });
        it('Select full row', function () {
            var timeline = new animation_timeline_1.Timeline();
            timeline._model = model;
            // Deselect all
            model.rows.forEach(function (row) {
                row.keyframes.forEach(function (keyframe) {
                    keyframe.selectable = true;
                    keyframe.selected = false;
                });
            });
            // select one will deselect other
            var rowToSelect = model.rows[1];
            var element = timeline.select(rowToSelect.keyframes);
            asserts_1.assert.equal(element.selectionChanged, true);
            asserts_1.assert.equal(element.selected.length, rowToSelect.keyframes.length);
            asserts_1.assert.equal(element.changed.length, 3);
            model.rows.forEach(function (row) {
                if (rowToSelect === row) {
                    rowToSelect.keyframes.forEach(function (keyframe) {
                        asserts_1.assert.equal(keyframe.selected, true);
                    });
                }
                else {
                    row.keyframes.forEach(function (keyframe) {
                        asserts_1.assert.equal(keyframe.selected, false);
                    });
                }
            });
        });
        it('Append select', function () {
            var timeline = new animation_timeline_1.Timeline();
            timeline._model = model;
            // Deselect all
            model.rows.forEach(function (row) {
                row.keyframes.forEach(function (keyframe) {
                    keyframe.selected = false;
                });
            });
            // select one row (array of the keyframes)
            var rowToSelect = model.rows[1];
            var results = timeline.select(rowToSelect.keyframes);
            asserts_1.assert.equal(results.selectionChanged, true);
            asserts_1.assert.equal(results.selected.length, rowToSelect.keyframes.length);
            asserts_1.assert.equal(results.changed.length, rowToSelect.keyframes.length);
            // (array of the keyframes)
            var rowToSelect2 = model.rows[2];
            results = timeline.select(rowToSelect2.keyframes, animation_timeline_1.TimelineSelectionMode.Append);
            asserts_1.assert.equal(results.selectionChanged, true);
            asserts_1.assert.equal(results.selected.length, rowToSelect.keyframes.length + rowToSelect2.keyframes.length);
            asserts_1.assert.equal(results.changed.length, rowToSelect2.keyframes.length);
            model.rows.forEach(function (row) {
                if (rowToSelect === row || rowToSelect2 === row) {
                    rowToSelect.keyframes.forEach(function (keyframe) {
                        asserts_1.assert.equal(keyframe.selected, true);
                    });
                }
                else {
                    row.keyframes.forEach(function (keyframe) {
                        asserts_1.assert.equal(keyframe.selected, false);
                    });
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
            asserts_1.assert.equal(timeline.valToPx(0), 0);
            asserts_1.assert.equal(timeline.valToPx(100), 50);
            asserts_1.assert.equal(timeline.valToPx(200), 100);
            asserts_1.assert.equal(timeline.pxToVal(0), 0);
            asserts_1.assert.equal(timeline.pxToVal(50), 100);
            asserts_1.assert.equal(timeline.pxToVal(100), 200);
        });
        it('Zoom is respected', function () {
            var timeline = new animation_timeline_1.Timeline();
            timeline._setOptions({
                stepVal: 100,
                stepPx: 50,
                zoom: 1,
            });
            asserts_1.assert.equal(timeline.valToPx(0), 0);
            asserts_1.assert.equal(timeline.valToPx(100), 50);
            asserts_1.assert.equal(timeline.valToPx(200), 100);
            timeline._setZoom(2);
            asserts_1.assert.equal(timeline.valToPx(0), 0);
            asserts_1.assert.equal(timeline.valToPx(100), 25);
            asserts_1.assert.equal(timeline.valToPx(200), 50);
            asserts_1.assert.equal(timeline.pxToVal(0), 0);
            asserts_1.assert.equal(timeline.pxToVal(25), 100);
            asserts_1.assert.equal(timeline.pxToVal(50), 200);
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
            asserts_1.assert.equal(timeline.snapVal(0), 0);
            asserts_1.assert.equal(timeline.snapVal(10), 0);
            asserts_1.assert.equal(timeline.snapVal(26), 25);
            asserts_1.assert.equal(timeline.snapVal(48), 50);
            asserts_1.assert.equal(timeline.snapVal(58), 50);
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
            asserts_1.assert.equal(timeline.snapVal(0), 5);
            asserts_1.assert.equal(timeline.snapVal(10), 5);
            asserts_1.assert.equal(timeline.snapVal(26), 30);
            asserts_1.assert.equal(timeline.snapVal(48), 55);
            asserts_1.assert.equal(timeline.snapVal(58), 55);
            // Don't overlap the limit.
            asserts_1.assert.equal(timeline.snapVal(-100), 5);
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
            asserts_1.assert.equal(timeline.snapVal(0), -5);
            asserts_1.assert.equal(timeline.snapVal(10), -5);
            asserts_1.assert.equal(timeline.snapVal(26), 20);
            asserts_1.assert.equal(timeline.snapVal(48), 45);
            asserts_1.assert.equal(timeline.snapVal(58), 45);
            asserts_1.assert.equal(timeline.snapVal(-1), -5);
            asserts_1.assert.equal(timeline.snapVal(-10), -5);
            asserts_1.assert.equal(timeline.snapVal(-26), -30);
            asserts_1.assert.equal(timeline.snapVal(-48), -55);
            asserts_1.assert.equal(timeline.snapVal(-58), -55);
            // Don't overlap the limit.
            asserts_1.assert.equal(timeline.snapVal(-100), -55);
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
            asserts_1.assert.equal(timeline.snapVal(-1), 0);
            asserts_1.assert.equal(timeline.snapVal(-10), 0);
            asserts_1.assert.equal(timeline.snapVal(10), 0);
            asserts_1.assert.equal(timeline.snapVal(26), 25);
            asserts_1.assert.equal(timeline.snapVal(50), 50);
            asserts_1.assert.equal(timeline.snapVal(-58), -25);
        });
    });
    describe('Move Keyframes', function () {
        it('move left', function () {
            var timeline = new animation_timeline_1.Timeline();
            timeline._options = null;
            var item1 = 25;
            var item2 = 50;
            var model = {
                rows: [{ val: 0, keyframes: [{ val: item1 }, { val: item2 }] }],
            };
            timeline._model = model;
            var move = -50;
            var movedOffset = timeline._moveElements(move, [
                {
                    keyframe: model.rows[0].keyframes[1],
                    row: model.rows[0],
                },
                {
                    keyframe: model.rows[0].keyframes[0],
                    row: model.rows[0],
                },
            ]);
            asserts_1.assert.equal(movedOffset, move);
            asserts_1.assert.equal(model.rows[0].keyframes[0].val, item1 + move);
            asserts_1.assert.equal(model.rows[0].keyframes[1].val, item2 + move);
        });
        it('move right', function () {
            var timeline = new animation_timeline_1.Timeline();
            var item1 = 25;
            var item2 = 50;
            var model = {
                rows: [{ val: 0, keyframes: [{ val: item1 }, { val: item2 }] }],
            };
            timeline._model = model;
            var move = 100;
            var movedOffset = timeline._moveElements(move, [
                {
                    keyframe: model.rows[0].keyframes[1],
                    row: model.rows[0],
                },
                {
                    keyframe: model.rows[0].keyframes[0],
                    row: model.rows[0],
                },
            ]);
            asserts_1.assert.equal(movedOffset, move);
            asserts_1.assert.equal(model.rows[0].keyframes[0].val, item1 + move);
            asserts_1.assert.equal(model.rows[0].keyframes[1].val, item2 + move);
        });
        it('move left limited by min', function () {
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
            asserts_1.assert.equal(movedOffset, move / 2);
            asserts_1.assert.equal(elementsToMove[0].keyframe.val, 0);
            asserts_1.assert.equal(elementsToMove[1].keyframe.val, 25);
        });
        it('move right limited by max', function () {
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
            asserts_1.assert.equal(movedOffset, move / 2);
            asserts_1.assert.equal(elementsToMove[0].keyframe.val, item1 + 50);
            asserts_1.assert.equal(elementsToMove[1].keyframe.val, item2 + 50);
        });
        it('move right limited by max negative', function () {
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
            asserts_1.assert.equal(movedOffset, 25);
            asserts_1.assert.equal(elementsToMove[0].keyframe.val, item1 + 25);
            asserts_1.assert.equal(elementsToMove[1].keyframe.val, item2 + 25);
        });
        it('move right limited by max negative when other row out of the bounds', function () {
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
            asserts_1.assert.equal(movedOffset, moved);
            asserts_1.assert.equal(elementsToMove[0].keyframe.val, 100 + moved);
            asserts_1.assert.equal(elementsToMove[1].keyframe.val, 400 + moved);
            asserts_1.assert.equal(elementsToMove[2].keyframe.val, 200 + moved);
            asserts_1.assert.equal(elementsToMove[3].keyframe.val, 300 + moved);
        });
        it('move left limited by min negative', function () {
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
            asserts_1.assert.equal(movedOffset, move / 2);
            asserts_1.assert.equal(elementsToMove[0].keyframe.val, item1 - 50);
            asserts_1.assert.equal(elementsToMove[1].keyframe.val, item2 - 50);
        });
        it('move left only one keyframe is limited', function () {
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
            asserts_1.assert.equal(movedOffset, move / 2);
            asserts_1.assert.equal(elementsToMove[0].keyframe.val, 25 + 50);
            asserts_1.assert.equal(elementsToMove[1].keyframe.val, 50 + 50);
        });
    });
});
//# sourceMappingURL=timelineTests.js.map