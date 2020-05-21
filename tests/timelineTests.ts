/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  TimelineSelectionMode,
  TimelineKeyframe,
  TimelineRow,
  TimelineModel,
  Timeline,
  TimelineElementType,
  TimelineElement,
  TimelineOptions,
  TimelineRowStyle,
  TimelineElementDragState,
  TimelineKeyframeStyle,
} from './../lib/animation-timeline';

describe('Timeline', function () {
  describe('_findDraggable', function () {
    it('Keyframe should be selected', function () {
      const timeline = new Timeline();
      const elements = [
        {
          type: TimelineElementType.Group,
          val: 5,
        } as TimelineElement,
        {
          type: TimelineElementType.Keyframe,
          val: 5,
        } as TimelineElement,
      ];
      const element = timeline._findDraggable(elements, 5);
      if (!element) {
        throw new Error('element cannot be empty');
      }
      chai.expect(element.type).equal(TimelineElementType.Keyframe, TimelineElementType.Keyframe + ' should be selected');
    });
    it('Timeline should be selected', function () {
      const timeline = new Timeline();
      const elements = [
        {
          type: TimelineElementType.Timeline,
          val: 5,
        } as TimelineElement,
        {
          type: TimelineElementType.Group,
          val: 5,
        } as TimelineElement,
      ];
      const element = timeline._findDraggable(elements, 5);
      if (!element) {
        throw new Error('element cannot be empty');
      }
      chai.expect(element.type).equal(TimelineElementType.Timeline, TimelineElementType.Timeline + ' should be selected');
    });
    it('Timeline should taken first', function () {
      const timeline = new Timeline();
      const elements = [
        {
          type: TimelineElementType.Timeline,
          val: 5,
        } as TimelineElement,
        {
          type: TimelineElementType.Keyframe,
          val: 4,
        },
        {
          type: TimelineElementType.Keyframe,
          val: 5,
        } as TimelineElement,
        {
          type: TimelineElementType.Group,
          val: 5,
        } as TimelineElement,
      ];
      const element = timeline._findDraggable(elements, 5);
      if (!element) {
        throw new Error('element cannot be empty');
      }
      chai.expect(element.type).equal(TimelineElementType.Timeline, TimelineElementType.Timeline + ' should be selected');
      // Keyframe with value 5 should be selected
      chai.expect(element.val).equal(5);
    });
    it('Group should be selected', function () {
      const timeline = new Timeline();
      const elements: Array<TimelineElement> = [
        {
          type: TimelineElementType.Group,
          val: 5,
        } as TimelineElement,
      ];
      const element = timeline._findDraggable(elements, 5);
      if (!element) {
        throw new Error('element cannot be empty');
      }
      chai.expect(element.type).equal(TimelineElementType.Group, TimelineElementType.Group + ' should be selected');
    });
    it('closest keyframe should be returned', function () {
      const timeline = new Timeline();
      const elements = [
        {
          type: TimelineElementType.Keyframe,
          val: 0,
        } as TimelineElement,
        {
          type: TimelineElementType.Keyframe,
          val: 4,
        } as TimelineElement,
        {
          type: TimelineElementType.Keyframe,
          val: 9,
        } as TimelineElement,
      ];
      const element = timeline._findDraggable(elements, 5);
      chai.expect(element.val).equal(elements[1].val);
    });
    it('Keyframes are not draggable by global settings', function () {
      const timeline = new Timeline();
      const elements: Array<TimelineElement> = [
        {
          type: TimelineElementType.Keyframe,
          val: 4,
        },
        {
          type: TimelineElementType.Keyframe,
          val: 5,
        } as TimelineElement,
        {
          type: TimelineElementType.Group,
          val: 5,
        } as TimelineElement,
      ];
      // Apply global options::
      timeline._options = {
        rowsStyle: {
          keyframesStyle: {
            draggable: false,
          } as TimelineKeyframeStyle,
        } as TimelineRowStyle,
      } as TimelineOptions;
      const element = timeline._findDraggable(elements, 5);
      chai.expect(element.type).equal(TimelineElementType.Group, 'Group should be selected');
    });
    it('Keyframes are not draggable by row settings', function () {
      const timeline = new Timeline();
      const elements: Array<TimelineElement> = [
        {
          type: TimelineElementType.Keyframe,
          val: 4,
          row: {
            keyframesStyle: {
              draggable: false,
            } as TimelineRowStyle,
          } as TimelineRow,
        },
        {
          type: TimelineElementType.Keyframe,
          val: 5,
          row: {
            keyframesStyle: {
              draggable: true,
            } as TimelineRowStyle,
          } as TimelineRow,
        } as TimelineElement,
      ];
      // Apply global options::
      const element = timeline._findDraggable(elements, 4);

      // Keyframe with value 5 should be selected as draggable
      chai.expect(element.val).equal(5);
    });

    it('Keyframes are draggable', function () {
      const timeline = new Timeline();
      const elements: Array<TimelineElement> = [
        {
          type: TimelineElementType.Keyframe,
          val: 4,
          keyframe: {
            val: 0,
          } as TimelineKeyframe,
          row: {
            keyframesStyle: {
              draggable: false,
            } as TimelineRowStyle,
          } as TimelineRow,
        } as TimelineElement,
        {
          type: TimelineElementType.Keyframe,
          val: 5,
          keyframe: {
            draggable: true,
          } as TimelineKeyframe,
          row: {
            keyframesStyle: {
              keyframesStyle: {} as TimelineKeyframeStyle,
            } as TimelineRowStyle,
          } as TimelineRow,
        } as TimelineElement,
      ];
      // Apply global options::
      const element = timeline._findDraggable(elements, 4);

      // Keyframe with value 5 should be selected as draggable
      chai.expect(element.val).equal(5);
    });
  });
  describe('select', function () {
    const model: TimelineModel = {
      rows: [
        { val: 0, keyframes: [{ val: 0 }, { val: 0 }] } as TimelineRow,
        { val: 0, keyframes: [{ val: 0 }, { val: 0 }, { val: 0 }] } as TimelineRow,
        { val: 0, keyframes: [{ val: 0 }, { val: 0 }] } as TimelineRow,
        { val: 0, keyframes: [{ val: 0 }] } as TimelineRow,
      ] as Array<TimelineRow>,
    } as TimelineModel;
    it('Select all', function () {
      const timeline = new Timeline();
      timeline._model = model;
      const element = timeline.selectAllKeyframes();
      chai.expect(element.selectionChanged).equal(true);
      let changed = 0;
      model.rows.forEach((row: TimelineRow) => {
        row.keyframes.forEach((keyframe: TimelineKeyframe) => {
          chai.expect(keyframe.selected).equal(true);
          changed++;
        });
      });

      chai.expect(element.selected.length).equal(changed);
    });
    it('Select all selectable', function () {
      const timeline = new Timeline();
      timeline._model = model;
      const element = timeline.getAllKeyframes();

      let changed = 0;
      let selectable = 0;
      model.rows.forEach((row: TimelineRow) => {
        row.keyframes.forEach((keyframe: TimelineKeyframe) => {
          keyframe.selected = false;
          keyframe.selectable = changed % 2 === 0;
          if (keyframe.selectable) {
            selectable++;
          }
          changed++;
        });
      });
      const selectionResults = timeline.select(element);
      chai.expect(selectionResults.changed.length).equal(selectable);
      chai.expect(selectionResults.selected.length).equal(selectable);
    });
    it('Deselect all', function () {
      const timeline = new Timeline();
      timeline._model = model;
      model.rows.forEach((row: TimelineRow) => {
        row.keyframes.forEach((keyframe: TimelineKeyframe) => {
          keyframe.selectable = true;
          keyframe.selected = true;
        });
      });
      // deselect all
      const element = timeline.deselectAll();
      chai.expect(element.selectionChanged).equal(true);
      chai.expect(element.selected.length).equal(0);
      model.rows.forEach((row: TimelineRow) => {
        row.keyframes.forEach((keyframe: TimelineKeyframe) => {
          chai.expect(keyframe.selected).equal(false);
        });
      });
    });
    it('Select one and deselect other all', function () {
      const timeline = new Timeline();
      timeline._model = model;
      let expectedChanged = 0;
      // Select all
      model.rows.forEach((row: TimelineRow) => {
        row.keyframes.forEach((keyframe: TimelineKeyframe) => {
          keyframe.selectable = true;
          keyframe.selected = true;
          expectedChanged++;
        });
      });

      // select one will deselect other
      const toSelect = model.rows[1].keyframes[0];

      const element = timeline.select(toSelect);
      chai.expect(element.selectionChanged).equal(true);
      chai.expect(element.selected.length).equal(1);
      chai.expect(element.changed.length).equal(expectedChanged - 1);

      model.rows.forEach((row: TimelineRow) => {
        row.keyframes.forEach((keyframe: TimelineKeyframe) => {
          if (toSelect == keyframe) {
            chai.expect(keyframe.selected).equal(true);
          } else {
            chai.expect(keyframe.selected).equal(false);
          }
        });
      });
    });
    it('Revert selection (Toggle)', function () {
      const timeline = new Timeline();
      timeline._model = model;
      let totalKeyframes = 0;
      // Select all
      model.rows.forEach((row: TimelineRow) => {
        row.keyframes.forEach((keyframe: TimelineKeyframe) => {
          keyframe.selectable = true;
          keyframe.selected = true;
          totalKeyframes++;
        });
      });

      // toggle selection
      const toSelect = model.rows[1].keyframes[0];
      // item is selected, should be reverted
      const element = timeline.select(toSelect, TimelineSelectionMode.Revert);
      chai.expect(element.selectionChanged).equal(true);
      chai.expect(element.selected.length).equal(totalKeyframes - 1);
      chai.expect(element.changed.length).equal(1);

      model.rows.forEach((row: TimelineRow) => {
        row.keyframes.forEach((keyframe: TimelineKeyframe) => {
          if (toSelect == keyframe) {
            chai.expect(keyframe.selected).equal(false);
          } else {
            chai.expect(keyframe.selected).equal(true);
          }
        });
      });
    });
    it('Select full row', function () {
      const timeline = new Timeline();
      timeline._model = model;
      // Deselect all
      model.rows.forEach((row: TimelineRow) => {
        row.keyframes.forEach((keyframe: TimelineKeyframe) => {
          keyframe.selectable = true;
          keyframe.selected = false;
        });
      });

      // select one will deselect other
      const rowToSelect = model.rows[1];
      const element = timeline.select(rowToSelect.keyframes);
      chai.expect(element.selectionChanged).equal(true);
      chai.expect(element.selected.length).equal(rowToSelect.keyframes.length);
      chai.expect(element.changed.length).equal(3);

      model.rows.forEach((row: TimelineRow) => {
        if (rowToSelect === row) {
          rowToSelect.keyframes.forEach((keyframe: TimelineKeyframe) => {
            chai.expect(keyframe.selected).equal(true);
          });
        } else {
          row.keyframes.forEach((keyframe: TimelineKeyframe) => {
            chai.expect(keyframe.selected).equal(false);
          });
        }
      });
    });
    it('Append select', function () {
      const timeline = new Timeline();
      timeline._model = model;
      // Deselect all
      model.rows.forEach((row: TimelineRow) => {
        row.keyframes.forEach((keyframe: TimelineKeyframe) => {
          keyframe.selected = false;
        });
      });

      // select one row (array of the keyframes)
      const rowToSelect = model.rows[1];
      let results = timeline.select(rowToSelect.keyframes);
      chai.expect(results.selectionChanged).equal(true);
      chai.expect(results.selected.length).equal(rowToSelect.keyframes.length);
      chai.expect(results.changed.length).equal(rowToSelect.keyframes.length);

      // (array of the keyframes)
      const rowToSelect2 = model.rows[2];
      results = timeline.select(rowToSelect2.keyframes, TimelineSelectionMode.Append);
      chai.expect(results.selectionChanged).equal(true);
      chai.expect(results.selected.length).equal(rowToSelect.keyframes.length + rowToSelect2.keyframes.length);
      chai.expect(results.changed.length).equal(rowToSelect2.keyframes.length);

      model.rows.forEach((row: TimelineRow) => {
        if (rowToSelect === row || rowToSelect2 === row) {
          rowToSelect.keyframes.forEach((keyframe: TimelineKeyframe) => {
            chai.expect(keyframe.selected).equal(true);
          });
        } else {
          row.keyframes.forEach((keyframe: TimelineKeyframe) => {
            chai.expect(keyframe.selected).equal(false);
          });
        }
      });
    });
  });
  describe('Coordinates', function () {
    it('Coordinates', function () {
      const timeline = new Timeline();
      timeline._setOptions({
        stepVal: 100,
        stepPx: 50,
        zoom: 1,
      } as TimelineOptions);

      chai.expect(timeline.valToPx(0)).equal(0);
      chai.expect(timeline.valToPx(100)).equal(50);
      chai.expect(timeline.valToPx(200)).equal(100);

      chai.expect(timeline.pxToVal(0)).equal(0);
      chai.expect(timeline.pxToVal(50)).equal(100);
      chai.expect(timeline.pxToVal(100)).equal(200);
    });
    it('Coordinates. min is negative', function () {
      const timeline = new Timeline();
      timeline._setOptions({
        stepVal: 100,
        stepPx: 50,
        min: -100,
        zoom: 1,
      } as TimelineOptions);

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
      const timeline = new Timeline();
      timeline._setOptions({
        stepVal: 100,
        stepPx: 50,
        min: 100,
        zoom: 1,
      } as TimelineOptions);

      chai.expect(timeline.valToPx(100)).equal(0);
      chai.expect(timeline.valToPx(150)).equal(25);

      chai.expect(timeline.pxToVal(0)).equal(100);
      chai.expect(timeline.pxToVal(25)).equal(150);
    });
    it('Zoom is respected', function () {
      const timeline = new Timeline();
      timeline._setOptions({
        stepVal: 100,
        stepPx: 50,
        zoom: 1,
      } as TimelineOptions);

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
      const timeline = new Timeline();
      timeline._setOptions({
        stepVal: 100,
        stepPx: 50,
        snapStep: 25,
        zoom: 1,
      } as TimelineOptions);

      chai.expect(timeline.snapVal(0)).equal(0);
      chai.expect(timeline.snapVal(10)).equal(0);
      chai.expect(timeline.snapVal(26)).equal(25);
      chai.expect(timeline.snapVal(48)).equal(50);
      chai.expect(timeline.snapVal(58)).equal(50);
    });
    it('Snapping. min is defined', function () {
      const timeline = new Timeline();
      timeline._setOptions({
        stepVal: 100,
        stepPx: 50,
        snapStep: 25,
        min: 5,
        zoom: 1,
      } as TimelineOptions);

      chai.expect(timeline.snapVal(0)).equal(5);
      chai.expect(timeline.snapVal(10)).equal(5);
      chai.expect(timeline.snapVal(26)).equal(30);
      chai.expect(timeline.snapVal(48)).equal(55);
      chai.expect(timeline.snapVal(58)).equal(55);

      // Don't overlap the limit.
      chai.expect(timeline.snapVal(-100)).equal(5);
    });
    it('Snapping. negative min is defined', function () {
      const timeline = new Timeline();
      timeline._setOptions({
        stepVal: 100,
        stepPx: 50,
        snapStep: 25,
        min: -55,
        zoom: 1,
      } as TimelineOptions);

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
      const timeline = new Timeline();
      timeline._setOptions({
        stepVal: 100,
        stepPx: 50,
        snapStep: 25,
        min: -25,
        zoom: 1,
      } as TimelineOptions);

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
      const timeline = new Timeline();
      timeline._options = null;
      const item1 = 25;
      const item2 = 50;
      const model = {
        rows: [{ val: 0, keyframes: [{ val: item1 }, { val: item2 }] } as TimelineRow] as Array<TimelineRow>,
      } as TimelineModel;
      timeline._model = model;
      const move = -50;
      const movedOffset = timeline._moveElements(move, [
        {
          keyframe: model.rows[0].keyframes[1],
          row: model.rows[0],
        } as TimelineElementDragState,
        {
          keyframe: model.rows[0].keyframes[0],
          row: model.rows[0],
        } as TimelineElementDragState,
      ]);

      chai.expect(movedOffset).equal(move);
      chai.expect(model.rows[0].keyframes[0].val).equal(item1 + move);
      chai.expect(model.rows[0].keyframes[1].val).equal(item2 + move);
    });
    it('move right', function () {
      const timeline = new Timeline();
      const item1 = 25;
      const item2 = 50;
      const model = {
        rows: [{ val: 0, keyframes: [{ val: item1 }, { val: item2 }] } as TimelineRow] as Array<TimelineRow>,
      } as TimelineModel;
      timeline._model = model;
      const move = 100;
      const movedOffset = timeline._moveElements(move, [
        {
          keyframe: model.rows[0].keyframes[1],
          row: model.rows[0],
        } as TimelineElementDragState,
        {
          keyframe: model.rows[0].keyframes[0],
          row: model.rows[0],
        } as TimelineElementDragState,
      ]);

      chai.expect(movedOffset).equal(move);
      chai.expect(model.rows[0].keyframes[0].val).equal(item1 + move);
      chai.expect(model.rows[0].keyframes[1].val).equal(item2 + move);
    });
    it('move left limited by min', function () {
      const timeline = new Timeline();
      const item1 = 25;
      const item2 = 50;
      timeline._options = { min: 0, max: 75 } as TimelineOptions;
      const move = -50;
      const elementsToMove = [
        {
          keyframe: { val: item1 },
        } as TimelineElementDragState,
        {
          keyframe: { val: item2 },
        } as TimelineElementDragState,
      ];
      const movedOffset = timeline._moveElements(move, elementsToMove);

      chai.expect(movedOffset).equal(move / 2);
      chai.expect(elementsToMove[0].keyframe.val).equal(0);
      chai.expect(elementsToMove[1].keyframe.val).equal(25);
    });

    it('move right limited by max', function () {
      const timeline = new Timeline();
      const item1 = 25;
      const item2 = 50;
      timeline._options = { min: 0, max: 100 } as TimelineOptions;
      const move = 100;
      const elementsToMove = [
        {
          keyframe: { val: item1 },
        } as TimelineElementDragState,
        {
          keyframe: { val: item2 },
        } as TimelineElementDragState,
      ];
      const movedOffset = timeline._moveElements(move, elementsToMove);

      chai.expect(movedOffset).equal(move / 2);
      chai.expect(elementsToMove[0].keyframe.val).equal(item1 + 50);
      chai.expect(elementsToMove[1].keyframe.val).equal(item2 + 50);
    });
    it('move right limited by max negative', function () {
      const timeline = new Timeline();
      const item1 = -125;
      const item2 = -150;
      timeline._options = { min: -200, max: -100 } as TimelineOptions;
      const move = 100;
      const elementsToMove = [
        {
          keyframe: { val: item1 },
        } as TimelineElementDragState,
        {
          keyframe: { val: item2 },
        } as TimelineElementDragState,
      ];
      const movedOffset = timeline._moveElements(move, elementsToMove);

      chai.expect(movedOffset).equal(25);
      chai.expect(elementsToMove[0].keyframe.val).equal(item1 + 25);
      chai.expect(elementsToMove[1].keyframe.val).equal(item2 + 25);
    });
    it('move right limited by max negative when other row out of the bounds', function () {
      const timeline = new Timeline();
      timeline._options = { min: 0, max: 600 } as TimelineOptions;
      const move = 200;
      const row = { max: 500 } as TimelineRow;
      const row2 = {} as TimelineRow;
      const elementsToMove = [
        {
          keyframe: { val: 100 },
          row: row,
        } as TimelineElementDragState,
        {
          keyframe: { val: 400 },
          row: row,
        } as TimelineElementDragState,
        {
          keyframe: { val: 200 },
          row: row2,
        } as TimelineElementDragState,
        {
          keyframe: { val: 300 },
          row: row2,
        } as TimelineElementDragState,
      ];
      const movedOffset = timeline._moveElements(move, elementsToMove);
      const moved = move / 2;
      chai.expect(movedOffset).equal(moved);
      chai.expect(elementsToMove[0].keyframe.val).equal(100 + moved);
      chai.expect(elementsToMove[1].keyframe.val).equal(400 + moved);
      chai.expect(elementsToMove[2].keyframe.val).equal(200 + moved);
      chai.expect(elementsToMove[3].keyframe.val).equal(300 + moved);
    });
    it('move left limited by min negative', function () {
      const timeline = new Timeline();
      const item1 = -125;
      const item2 = -150;
      timeline._options = { min: -200, max: -100 } as TimelineOptions;
      const move = -100;
      const elementsToMove = [
        {
          keyframe: { val: item1 },
        } as TimelineElementDragState,
        {
          keyframe: { val: item2 },
        } as TimelineElementDragState,
      ];
      const movedOffset = timeline._moveElements(move, elementsToMove);

      chai.expect(movedOffset).equal(move / 2);
      chai.expect(elementsToMove[0].keyframe.val).equal(item1 - 50);
      chai.expect(elementsToMove[1].keyframe.val).equal(item2 - 50);
    });
    it('move left only one keyframe is limited', function () {
      const timeline = new Timeline();
      const move = 100;
      const row = { min: 0, max: 100 } as TimelineRow;
      const elementsToMove = [
        {
          keyframe: { val: 25 },
          row: row,
        } as TimelineElementDragState,
        {
          keyframe: { val: 50 },
          row: row,
        } as TimelineElementDragState,
      ];
      const movedOffset = timeline._moveElements(move, elementsToMove);

      chai.expect(movedOffset).equal(move / 2);
      chai.expect(elementsToMove[0].keyframe.val).equal(25 + 50);
      chai.expect(elementsToMove[1].keyframe.val).equal(50 + 50);
    });
  });
});
