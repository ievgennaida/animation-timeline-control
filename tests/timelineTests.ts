/* eslint-disable @typescript-eslint/no-explicit-any */
import { TimelineSelectionMode, TimelineKeyframe, TimelineRow, TimelineModel, Timeline, TimelineElementType, TimelineElement } from './../lib/animation-timeline';
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
      const elements = [
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
      assert.equal(element.val, elements[2].val);
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
      // Select all
      model.rows.forEach((row: TimelineRow) => {
        row.keyframes.forEach((keyframe: TimelineKeyframe) => {
          keyframe.selected = true;
        });
      });

      // select one will deselect other
      const toSelect = model.rows[1].keyframes[0];
      // item is selected, should be reverted
      const element = timeline.select(toSelect, TimelineSelectionMode.Revert);
      assert.equal(element.selectionChanged, true);
      assert.equal(element.selected.length, 1);
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
      results = timeline.select(rowToSelect.keyframes, TimelineSelectionMode.Append);
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
});
