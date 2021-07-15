"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
var animation_timeline_1 = require("./../lib/animation-timeline");
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
                row.keyframes.forEach(function (keyframe) {
                    chai.expect(keyframe.selected).equal(true);
                    changed++;
                });
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
            chai.expect(selectionResults.changed.length).equal(selectable);
            chai.expect(selectionResults.selected.length).equal(selectable);
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
            chai.expect(element.selectionChanged).equal(true);
            chai.expect(element.selected.length).equal(0);
            model.rows.forEach(function (row) {
                row.keyframes.forEach(function (keyframe) {
                    chai.expect(keyframe.selected).equal(false);
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
            chai.expect(element.selectionChanged).equal(true);
            chai.expect(element.selected.length).equal(1);
            chai.expect(element.changed.length).equal(expectedChanged - 1);
            model.rows.forEach(function (row) {
                row.keyframes.forEach(function (keyframe) {
                    if (toSelect == keyframe) {
                        chai.expect(keyframe.selected).equal(true);
                    }
                    else {
                        chai.expect(keyframe.selected).equal(false);
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
            chai.expect(element.selectionChanged).equal(true);
            chai.expect(element.selected.length).equal(totalKeyframes - 1);
            chai.expect(element.changed.length).equal(1);
            model.rows.forEach(function (row) {
                row.keyframes.forEach(function (keyframe) {
                    if (toSelect == keyframe) {
                        chai.expect(keyframe.selected).equal(false);
                    }
                    else {
                        chai.expect(keyframe.selected).equal(true);
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
            chai.expect(element.selectionChanged).equal(true);
            chai.expect(element.selected.length).equal(rowToSelect.keyframes.length);
            chai.expect(element.changed.length).equal(3);
            model.rows.forEach(function (row) {
                if (rowToSelect === row) {
                    rowToSelect.keyframes.forEach(function (keyframe) {
                        chai.expect(keyframe.selected).equal(true);
                    });
                }
                else {
                    row.keyframes.forEach(function (keyframe) {
                        chai.expect(keyframe.selected).equal(false);
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
            chai.expect(results.selectionChanged).equal(true);
            chai.expect(results.selected.length).equal(rowToSelect.keyframes.length);
            chai.expect(results.changed.length).equal(rowToSelect.keyframes.length);
            // (array of the keyframes)
            var rowToSelect2 = model.rows[2];
            results = timeline.select(rowToSelect2.keyframes, animation_timeline_1.TimelineSelectionMode.Append);
            chai.expect(results.selectionChanged).equal(true);
            chai.expect(results.selected.length).equal(rowToSelect.keyframes.length + rowToSelect2.keyframes.length);
            chai.expect(results.changed.length).equal(rowToSelect2.keyframes.length);
            model.rows.forEach(function (row) {
                if (rowToSelect === row || rowToSelect2 === row) {
                    rowToSelect.keyframes.forEach(function (keyframe) {
                        chai.expect(keyframe.selected).equal(true);
                    });
                }
                else {
                    row.keyframes.forEach(function (keyframe) {
                        chai.expect(keyframe.selected).equal(false);
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
            chai.expect(movedOffset).equal(move);
            chai.expect(model.rows[0].keyframes[0].val).equal(item1 + move);
            chai.expect(model.rows[0].keyframes[1].val).equal(item2 + move);
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
            chai.expect(movedOffset).equal(move);
            chai.expect(model.rows[0].keyframes[0].val).equal(item1 + move);
            chai.expect(model.rows[0].keyframes[1].val).equal(item2 + move);
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
            chai.expect(movedOffset).equal(move / 2);
            chai.expect(elementsToMove[0].keyframe.val).equal(0);
            chai.expect(elementsToMove[1].keyframe.val).equal(25);
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
            chai.expect(movedOffset).equal(move / 2);
            chai.expect(elementsToMove[0].keyframe.val).equal(item1 + 50);
            chai.expect(elementsToMove[1].keyframe.val).equal(item2 + 50);
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
            chai.expect(movedOffset).equal(25);
            chai.expect(elementsToMove[0].keyframe.val).equal(item1 + 25);
            chai.expect(elementsToMove[1].keyframe.val).equal(item2 + 25);
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
            chai.expect(movedOffset).equal(moved);
            chai.expect(elementsToMove[0].keyframe.val).equal(100 + moved);
            chai.expect(elementsToMove[1].keyframe.val).equal(400 + moved);
            chai.expect(elementsToMove[2].keyframe.val).equal(200 + moved);
            chai.expect(elementsToMove[3].keyframe.val).equal(300 + moved);
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
            chai.expect(movedOffset).equal(move / 2);
            chai.expect(elementsToMove[0].keyframe.val).equal(item1 - 50);
            chai.expect(elementsToMove[1].keyframe.val).equal(item2 - 50);
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
            chai.expect(movedOffset).equal(move / 2);
            chai.expect(elementsToMove[0].keyframe.val).equal(25 + 50);
            chai.expect(elementsToMove[1].keyframe.val).equal(50 + 50);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmVUZXN0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RpbWVsaW5lVGVzdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1REFBdUQ7QUFDdkQsa0VBWXFDO0FBRXJDLFFBQVEsQ0FBQyxVQUFVLEVBQUU7SUFDbkIsUUFBUSxDQUFDLGdCQUFnQixFQUFFO1FBQ3pCLEVBQUUsQ0FBQyw2QkFBNkIsRUFBRTtZQUNoQyxJQUFNLFFBQVEsR0FBRyxJQUFJLDZCQUFRLEVBQUUsQ0FBQztZQUNoQyxJQUFNLFFBQVEsR0FBRztnQkFDZjtvQkFDRSxJQUFJLEVBQUUsd0NBQW1CLENBQUMsS0FBSztvQkFDL0IsR0FBRyxFQUFFLENBQUM7aUJBQ1k7Z0JBQ3BCO29CQUNFLElBQUksRUFBRSx3Q0FBbUIsQ0FBQyxRQUFRO29CQUNsQyxHQUFHLEVBQUUsQ0FBQztpQkFDWTthQUNyQixDQUFDO1lBQ0YsSUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDckQsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDWixNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7YUFDNUM7WUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsd0NBQW1CLENBQUMsUUFBUSxFQUFFLHdDQUFtQixDQUFDLFFBQVEsR0FBRyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3RILENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLDZCQUE2QixFQUFFO1lBQ2hDLElBQU0sUUFBUSxHQUFHLElBQUksNkJBQVEsRUFBRSxDQUFDO1lBQ2hDLElBQU0sUUFBUSxHQUFHO2dCQUNmO29CQUNFLElBQUksRUFBRSx3Q0FBbUIsQ0FBQyxRQUFRO29CQUNsQyxHQUFHLEVBQUUsQ0FBQztpQkFDWTtnQkFDcEI7b0JBQ0UsSUFBSSxFQUFFLHdDQUFtQixD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SUFBSSxFQUFFLENBQUM7YUFDVyxDQUFDLENBQUM7WUFFdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzNDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFOUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEQsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsOEJBQThCLEVBQUU7WUFDakMsSUFBTSxRQUFRLEdBQUcsSUFBSSw2QkFBUSxFQUFFLENBQUM7WUFDaEMsUUFBUSxDQUFDLFdBQVcsQ0FBQztnQkFDbkIsT0FBTyxFQUFFLEdBQUc7Z0JBQ1osTUFBTSxFQUFFLEVBQUU7Z0JBQ1YsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsSUFBSSxFQUFFLENBQUM7YUFDVyxDQUFDLENBQUM7WUFFdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUU3QyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLG1CQUFtQixFQUFFO1lBQ3RCLElBQU0sUUFBUSxHQUFHLElBQUksNkJBQVEsRUFBRSxDQUFDO1lBQ2hDLFFBQVEsQ0FBQyxXQUFXLENBQUM7Z0JBQ25CLE9BQU8sRUFBRSxHQUFHO2dCQUNaLE1BQU0sRUFBRSxFQUFFO2dCQUNWLElBQUksRUFBRSxDQUFDO2FBQ1csQ0FBQyxDQUFDO1lBRXRCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzlDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM3QyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM3QyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDL0MsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUNILFFBQVEsQ0FBQyxVQUFVLEVBQUU7UUFDbkIsRUFBRSxDQUFDLFVBQVUsRUFBRTtZQUNiLElBQU0sUUFB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QUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUU1QyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFOUMsMkJBQTJCO1lBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFD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