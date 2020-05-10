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
            asserts_1.assert.equal(element.val, elements[2].val);
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
        it('Deselect all', function () {
            var timeline = new animation_timeline_1.Timeline();
            timeline._model = model;
            model.rows.forEach(function (row) {
                row.keyframes.forEach(function (keyframe) {
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
            // Select all
            model.rows.forEach(function (row) {
                row.keyframes.forEach(function (keyframe) {
                    keyframe.selected = true;
                });
            });
            // select one will deselect other
            var toSelect = model.rows[1].keyframes[0];
            // item is selected, should be reverted
            var element = timeline.select(toSelect, animation_timeline_1.TimelineSelectionMode.Revert);
            asserts_1.assert.equal(element.selectionChanged, true);
            asserts_1.assert.equal(element.selected.length, 1);
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
            results = timeline.select(rowToSelect.keyframes, animation_timeline_1.TimelineSelectionMode.Append);
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
});
//# sourceMappingURL=timelineTests.js.map