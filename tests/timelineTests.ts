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
  TimelineKeyframeStyle,
} from './../lib/animation-timeline';
// Always check that output lib is referenced.
import { assert } from './asserts';
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
      assert.equal(element.type, TimelineElementType.Keyframe, TimelineElementType.Keyframe + ' should be selected');
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
      assert.equal(element.type, TimelineElementType.Timeline, TimelineElementType.Timeline + ' should be selected');
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
      assert.equal(element.type, TimelineElementType.Timeline, TimelineElementType.Timeline + ' should be selected');
      // Keyframe with value 5 should be selected
      assert.equal(element.val, 5);
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
      assert.equal(element.type, TimelineElementType.Group, TimelineElementType.Group + ' should be selected');
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
      assert.equal(element.val, elements[1].val);
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
      assert.equal(element.type, TimelineElementType.Group, 'Group should be selected');
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
      assert.equal(element.val, 5);
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
      assert.equal(element.val, 5);
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
      assert.equal(element.selectionChanged, true);
      let changed = 0;
      model.rows.forEach((row: TimelineRow) => {
        row.keyframes.forEach((keyframe: TimelineKeyframe) => {
          assert.equal(keyframe.selected, true);
          changed++;
        });
      });

      assert.equal(element.selected.length, changed);
    });
    it('Deselect all', function () {
      const timeline = new Timeline();
      timeline._model = model;
      model.rows.forEach((row: TimelineRow) => {
        row.keyframes.forEach((keyframe: TimelineKeyframe) => {
          keyframe.selected = true;
        });
      });
      // deselect all
      const element = timeline.deselectAll();
      assert.equal(element.selectionChanged, true);
      assert.equal(element.selected.length, 0);
      model.rows.forEach((row: TimelineRow) => {
        row.keyframes.forEach((keyframe: TimelineKeyframe) => {
          assert.equal(keyframe.selected, false);
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
          keyframe.selected = true;
          expectedChanged++;
        });
      });

      // select one will deselect other
      const toSelect = model.rows[1].keyframes[0];

      const element = timeline.select(toSelect);
      assert.equal(element.selectionChanged, true);
      assert.equal(element.selected.length, 1);
      assert.equal(element.changed.length, expectedChanged - 1);

      model.rows.forEach((row: TimelineRow) => {
        row.keyframes.forEach((keyframe: TimelineKeyframe) => {
          if (toSelect == keyframe) {
            assert.equal(keyframe.selected, true);
          } else {
            assert.equal(keyframe.selected, false);
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
          keyframe.selected = true;
          totalKeyframes++;
        });
      });

      // toggle selection
      const toSelect = model.rows[1].keyframes[0];
      // item is selected, should be reverted
      const element = timeline.select(toSelect, TimelineSelectionMode.Revert);
      assert.equal(element.selectionChanged, true);
      assert.equal(element.selected.length, totalKeyframes - 1);
      assert.equal(element.changed.length, 1);

      model.rows.forEach((row: TimelineRow) => {
        row.keyframes.forEach((keyframe: TimelineKeyframe) => {
          if (toSelect == keyframe) {
            assert.equal(keyframe.selected, false);
          } else {
            assert.equal(keyframe.selected, true);
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
          keyframe.selected = false;
        });
      });

      // select one will deselect other
      const rowToSelect = model.rows[1];
      const element = timeline.select(rowToSelect.keyframes);
      assert.equal(element.selectionChanged, true);
      assert.equal(element.selected.length, rowToSelect.keyframes.length);
      assert.equal(element.changed.length, 3);

      model.rows.forEach((row: TimelineRow) => {
        if (rowToSelect === row) {
          rowToSelect.keyframes.forEach((keyframe: TimelineKeyframe) => {
            assert.equal(keyframe.selected, true);
          });
        } else {
          row.keyframes.forEach((keyframe: TimelineKeyframe) => {
            assert.equal(keyframe.selected, false);
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
      assert.equal(results.selectionChanged, true);
      assert.equal(results.selected.length, rowToSelect.keyframes.length);
      assert.equal(results.changed.length, rowToSelect.keyframes.length);

      // (array of the keyframes)
      const rowToSelect2 = model.rows[2];
      results = timeline.select(rowToSelect2.keyframes, TimelineSelectionMode.Append);
      assert.equal(results.selectionChanged, true);
      assert.equal(results.selected.length, rowToSelect.keyframes.length + rowToSelect2.keyframes.length);
      assert.equal(results.changed.length, rowToSelect2.keyframes.length);

      model.rows.forEach((row: TimelineRow) => {
        if (rowToSelect === row || rowToSelect2 === row) {
          rowToSelect.keyframes.forEach((keyframe: TimelineKeyframe) => {
            assert.equal(keyframe.selected, true);
          });
        } else {
          row.keyframes.forEach((keyframe: TimelineKeyframe) => {
            assert.equal(keyframe.selected, false);
          });
        }
      });
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
        } as TimelineElement,
        {
          keyframe: model.rows[0].keyframes[0],
          row: model.rows[0],
        } as TimelineElement,
      ]);

      assert.equal(movedOffset, move);
      assert.equal(model.rows[0].keyframes[0].val, item1 + move);
      assert.equal(model.rows[0].keyframes[1].val, item2 + move);
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
        } as TimelineElement,
        {
          keyframe: model.rows[0].keyframes[0],
          row: model.rows[0],
        } as TimelineElement,
      ]);

      assert.equal(movedOffset, move);
      assert.equal(model.rows[0].keyframes[0].val, item1 + move);
      assert.equal(model.rows[0].keyframes[1].val, item2 + move);
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
        } as TimelineElement,
        {
          keyframe: { val: item2 },
        } as TimelineElement,
      ];
      const movedOffset = timeline._moveElements(move, elementsToMove);

      assert.equal(movedOffset, move / 2);
      assert.equal(elementsToMove[0].keyframe.val, 0);
      assert.equal(elementsToMove[1].keyframe.val, 25);
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
        } as TimelineElement,
        {
          keyframe: { val: item2 },
        } as TimelineElement,
      ];
      const movedOffset = timeline._moveElements(move, elementsToMove);

      assert.equal(movedOffset, move / 2);
      assert.equal(elementsToMove[0].keyframe.val, item1 + 50);
      assert.equal(elementsToMove[1].keyframe.val, item2 + 50);
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
        } as TimelineElement,
        {
          keyframe: { val: item2 },
        } as TimelineElement,
      ];
      const movedOffset = timeline._moveElements(move, elementsToMove);

      assert.equal(movedOffset, 25);
      assert.equal(elementsToMove[0].keyframe.val, item1 + 25);
      assert.equal(elementsToMove[1].keyframe.val, item2 + 25);
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
        } as TimelineElement,
        {
          keyframe: { val: item2 },
        } as TimelineElement,
      ];
      const movedOffset = timeline._moveElements(move, elementsToMove);

      assert.equal(movedOffset, move / 2);
      assert.equal(elementsToMove[0].keyframe.val, item1 - 50);
      assert.equal(elementsToMove[1].keyframe.val, item2 - 50);
    });
    it('move left only one keyframe is limited', function () {
      const timeline = new Timeline();
      const item1 = 25;
      const item2 = 50;
      const move = 100;
      const elementsToMove = [
        {
          keyframe: { val: item1 },
          row: { min: 0, max: 100 } as TimelineRow,
        } as TimelineElement,
        {
          keyframe: { val: item2 },
        } as TimelineElement,
      ];
      const movedOffset = timeline._moveElements(move, elementsToMove);

      assert.equal(movedOffset, move / 2);
      assert.equal(elementsToMove[0].keyframe.val, item1 + 50);
      assert.equal(elementsToMove[1].keyframe.val, item2 + 50);
    });
  });
});
