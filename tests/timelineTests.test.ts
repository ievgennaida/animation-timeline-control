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
  TimelineUtils,
  TimelineKeyframeShape,
} from '../lib/animation-timeline';

describe('Timeline', () => {
  describe('_findDraggableElement', () => {
    it('Keyframe should be selected', () => {
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
      const element = timeline._findDraggableElement(elements, 5);
      if (!element) {
        throw new Error('element cannot be empty');
      }

      chai.expect(element.type).equal(TimelineElementType.Keyframe, TimelineElementType.Keyframe + ' should be selected');
    });
    it('Timeline should be selected', () => {
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
      const element = timeline._findDraggableElement(elements, 5);
      if (!element) {
        throw new Error('element cannot be empty');
      }
      chai.expect(element.type).equal(TimelineElementType.Timeline, TimelineElementType.Timeline + ' should be selected');
    });
    it('Timeline should taken first', () => {
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
      const element = timeline._findDraggableElement(elements, 5);
      if (!element) {
        throw new Error('element cannot be empty');
      }
      chai.expect(element.type).equal(TimelineElementType.Timeline, TimelineElementType.Timeline + ' should be selected');
      // Keyframe with value 5 should be selected
      chai.expect(element.val).equal(5);
    });

    it('Group should be found under the value', () => {
      const timeline = new Timeline();
      const elements: TimelineElement[] = [
        {
          type: TimelineElementType.Group,
          val: 5,
        } as TimelineElement,
      ];
      const element = timeline._findDraggableElement(elements, 5);
      if (!element) {
        throw new Error('element cannot be empty');
      }
      chai.expect(element.type).equal(TimelineElementType.Group, TimelineElementType.Group + ' should be selected');
    });
    it('closest keyframe should be returned', () => {
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
      const element = timeline._findDraggableElement(elements, 5);
      chai.assert(element);
      chai.expect(element.val).equal(elements[1].val);
    });
    it('Keyframes are not draggable by global settings', () => {
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
        keyframesDraggable: false,
        rowsStyle: {
          keyframesStyle: {
            shape: TimelineKeyframeShape.Rect,
          } as TimelineKeyframeStyle,
        } as TimelineRowStyle,
      } as TimelineOptions;
      const element = timeline._findDraggableElement(elements, 5);
      chai.assert(element);
      chai.expect(element.type).equal(TimelineElementType.Group, 'Group should be selected');
    });
    it('Timeline. Keyframes are not draggable by row settings', () => {
      const timeline = new Timeline();
      const elements: Array<TimelineElement> = [
        {
          type: TimelineElementType.Keyframe,
          val: 4,
          row: {
            keyframesDraggable: false,
          } as TimelineRow,
        },
        {
          type: TimelineElementType.Keyframe,
          val: 5,
          row: {
            keyframesDraggable: true,
          } as TimelineRow,
        } as TimelineElement,
      ];
      // Apply global options::
      const element = timeline._findDraggableElement(elements, 4);
      chai.assert(element);
      // Keyframe with value 5 should be selected as draggable
      chai.expect(element.val).equal(5);
    });

    it('Keyframes are draggable', () => {
      const timeline = new Timeline();
      const elements: Array<TimelineElement> = [
        {
          type: TimelineElementType.Keyframe,
          val: 4,
          keyframe: {
            val: 0,
          } as TimelineKeyframe,
          row: {
            keyframesDraggable: false,
            keyframesStyle: {
              shape: TimelineKeyframeShape.Rect,
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
              keyframesStyle: { shape: TimelineKeyframeShape.Rect } as TimelineKeyframeStyle,
            } as TimelineRowStyle,
          } as TimelineRow,
        } as TimelineElement,
      ];
      // Apply global options::
      const element = timeline._findDraggableElement(elements, 4);
      chai.assert(element);
      // Keyframe with value 5 should be selected as draggable
      chai.expect(element.val).equal(5);
    });
  });
  describe('select', () => {
    const model: TimelineModel = {
      rows: [
        { val: 0, keyframes: [{ val: 0 }, { val: 0 }] } as TimelineRow,
        { val: 0, keyframes: [{ val: 0 }, { val: 0 }, { val: 0 }] } as TimelineRow,
        { val: 0, keyframes: [{ val: 0 }, { val: 0 }] } as TimelineRow,
        { val: 0, keyframes: [{ val: 0 }] } as TimelineRow,
      ] as Array<TimelineRow>,
    } as TimelineModel;
    it('Select all', () => {
      const timeline = new Timeline();
      timeline._model = model;
      const element = timeline.selectAllKeyframes();
      chai.expect(element.selectionChanged).equal(true);
      let changed = 0;
      model.rows.forEach((row: TimelineRow) => {
        const len = row?.keyframes?.length || 0;
        chai.expect(len > 0).equal(true);
        if (row && row.keyframes) {
          row.keyframes.forEach((keyframe: TimelineKeyframe) => {
            chai.expect(keyframe.selected).equal(true);
            changed++;
          });
        }
      });

      chai.expect(element.selected.length).equal(changed);
    });
    it('Select all selectable', () => {
      const timeline = new Timeline();
      timeline._model = model;
      const element = timeline.getAllKeyframes();

      let changed = 0;
      let selectable = 0;
      model.rows.forEach((row: TimelineRow) => {
        const len = row?.keyframes?.length || 0;
        chai.expect(len > 0).equal(true);
        if (row.keyframes) {
          row.keyframes.forEach((keyframe: TimelineKeyframe) => {
            keyframe.selected = false;
            keyframe.selectable = changed % 2 === 0;
            if (keyframe.selectable) {
              selectable++;
            }
            changed++;
          });
        }
      });
      const selectionResults = timeline.select(element);
      chai.expect(selectionResults.changed.length).equal(selectable);
      chai.expect(selectionResults.selected.length).equal(selectable);
    });
    it('Deselect all', () => {
      const timeline = new Timeline();
      timeline._model = model;
      model.rows.forEach((row: TimelineRow) => {
        const len = row?.keyframes?.length || 0;
        chai.expect(len > 0).equal(true);
        if (row.keyframes) {
          row.keyframes.forEach((keyframe: TimelineKeyframe) => {
            keyframe.selectable = true;
            keyframe.selected = true;
          });
        }
      });
      // deselect all
      const element = timeline.deselectAll();
      chai.expect(element.selectionChanged).equal(true);
      chai.expect(element.selected.length).equal(0);
      model.rows.forEach((row: TimelineRow) => {
        const len = row?.keyframes?.length || 0;
        chai.expect(len > 0).equal(true);
        if (row.keyframes) {
          row.keyframes.forEach((keyframe: TimelineKeyframe) => {
            chai.expect(keyframe.selected).equal(false);
          });
        }
      });
    });
    it('Select one and deselect other all', () => {
      const timeline = new Timeline();
      timeline._model = model;
      let expectedChanged = 0;
      // Select all
      model.rows.forEach((row: TimelineRow) => {
        const len = row?.keyframes?.length || 0;
        chai.expect(len > 0).equal(true);
        if (row.keyframes) {
          row.keyframes.forEach((keyframe: TimelineKeyframe) => {
            keyframe.selectable = true;
            keyframe.selected = true;
            expectedChanged++;
          });
        }
      });

      // select one will deselect other
      const rowToSelect = model.rows[1];
      chai.expect(!!rowToSelect.keyframes).equal(true);
      if (!rowToSelect.keyframes) {
        return;
      }
      // toggle selection
      const toSelect = rowToSelect.keyframes[0];
      const element = timeline.select(toSelect);
      chai.expect(element.selectionChanged).equal(true);
      chai.expect(element.selected.length).equal(1);
      chai.expect(element.changed.length).equal(expectedChanged - 1);

      model.rows.forEach((row: TimelineRow) => {
        const len = row?.keyframes?.length || 0;
        chai.expect(len > 0).equal(true);
        if (row.keyframes) {
          row.keyframes.forEach((keyframe: TimelineKeyframe) => {
            if (toSelect == keyframe) {
              chai.expect(keyframe.selected).equal(true);
            } else {
              chai.expect(keyframe.selected).equal(false);
            }
          });
        }
      });
    });
    it('Revert selection (Toggle)', () => {
      const timeline = new Timeline();
      timeline._model = model;
      let totalKeyframes = 0;
      // Select all
      model.rows.forEach((row: TimelineRow) => {
        const len = row?.keyframes?.length || 0;
        chai.expect(len > 0).equal(true);
        if (row.keyframes) {
          row.keyframes.forEach((keyframe: TimelineKeyframe) => {
            keyframe.selectable = true;
            keyframe.selected = true;
            totalKeyframes++;
          });
        }
      });

      const rowToSelect = model.rows[1];
      chai.expect(!!rowToSelect.keyframes).equal(true);
      if (!rowToSelect.keyframes) {
        return;
      }
      // toggle selection
      const toSelect = rowToSelect.keyframes[0];

      // item is selected, should be reverted
      const element = timeline.select(toSelect, TimelineSelectionMode.Revert);
      chai.expect(element.selectionChanged).equal(true);
      chai.expect(element.selected.length).equal(totalKeyframes - 1);
      chai.expect(element.changed.length).equal(1);

      model.rows.forEach((row: TimelineRow) => {
        chai.expect((row.keyframes?.length || 0) > 0).equal(true);
        if (row.keyframes) {
          row.keyframes.forEach((keyframe: TimelineKeyframe) => {
            if (toSelect == keyframe) {
              chai.expect(keyframe.selected).equal(false);
            } else {
              chai.expect(keyframe.selected).equal(true);
            }
          });
        }
      });
    });
    it('Select full row', () => {
      const timeline = new Timeline();
      timeline._model = model;
      // Deselect all
      model.rows.forEach((row: TimelineRow) => {
        const len = row?.keyframes?.length || 0;
        chai.expect(len > 0).equal(true);
        if (row.keyframes) {
          row.keyframes.forEach((keyframe: TimelineKeyframe) => {
            keyframe.selectable = true;
            keyframe.selected = false;
          });
        }
      });

      // select one will deselect other
      const rowToSelect = model.rows[1];
      chai.expect(!!rowToSelect.keyframes).equal(true);
      if (!rowToSelect.keyframes) {
        return;
      }
      const element = timeline.select(rowToSelect.keyframes);
      chai.expect(element.selectionChanged).equal(true);
      chai.expect(element.selected.length).equal(rowToSelect.keyframes.length);
      chai.expect(element.changed.length).equal(3);

      model.rows.forEach((row: TimelineRow) => {
        if (rowToSelect === row) {
          const len = row?.keyframes?.length || 0;
          chai.expect(len > 0).equal(true);
          if (rowToSelect.keyframes) {
            rowToSelect.keyframes.forEach((keyframe: TimelineKeyframe) => {
              chai.expect(keyframe.selected).equal(true);
            });
          }
        } else {
          const len = row?.keyframes?.length || 0;
          chai.expect(len > 0).equal(true);
          if (row.keyframes) {
            row.keyframes.forEach((keyframe: TimelineKeyframe) => {
              chai.expect(keyframe.selected).equal(false);
            });
          }
        }
      });
    });
    it('Append select', () => {
      const timeline = new Timeline();
      timeline._model = model;
      // Deselect all
      model.rows.forEach((row: TimelineRow) => {
        const len = row?.keyframes?.length || 0;
        chai.expect(len > 0).equal(true);
        if (row.keyframes) {
          row.keyframes.forEach((keyframe: TimelineKeyframe) => {
            keyframe.selected = false;
          });
        }
      });

      // select one row (array of the keyframes)
      const rowToSelect = model.rows[1];
      chai.expect(!!rowToSelect.keyframes).equal(true);
      if (!rowToSelect.keyframes) {
        return;
      }
      let results = timeline.select(rowToSelect.keyframes);
      chai.expect(results.selectionChanged).equal(true);
      chai.expect(results.selected.length).equal(rowToSelect.keyframes?.length);
      chai.expect(results.changed.length).equal(rowToSelect.keyframes?.length);

      // (array of the keyframes)
      const rowToSelect2 = model.rows[2];
      results = timeline.select(rowToSelect2?.keyframes || [], TimelineSelectionMode.Append);
      chai.expect(results.selectionChanged).equal(true);
      chai.expect(results.selected.length).equal((rowToSelect?.keyframes?.length || 0) + (rowToSelect2?.keyframes?.length || 0));
      chai.expect(results.changed.length).equal(rowToSelect2?.keyframes?.length);

      model.rows.forEach((row: TimelineRow) => {
        if (rowToSelect === row || rowToSelect2 === row) {
          chai.expect((rowToSelect.keyframes?.length || 0) > 0).equal(true);
          if (rowToSelect.keyframes) {
            rowToSelect.keyframes.forEach((keyframe: TimelineKeyframe) => {
              chai.expect(keyframe.selected).equal(true);
            });
          }
        } else {
          chai.expect((row.keyframes?.length || 0) > 0).equal(true);
          if (row.keyframes) {
            row.keyframes.forEach((keyframe: TimelineKeyframe) => {
              chai.expect(keyframe.selected).equal(false);
            });
          }
        }
      });
    });
  });
  describe('Coordinates', () => {
    it('Coordinates', () => {
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
    it('Coordinates. min is negative', () => {
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
    it('Coordinates. min is positive', () => {
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
    it('Zoom is respected', () => {
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
  describe('Snapping', () => {
    it('Snapping', () => {
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
    it('Snapping. min is defined', () => {
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
    it('Snapping. negative min is defined', () => {
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
    it('TimelineUtils.isNumber', () => {
      chai.expect(TimelineUtils.isNumber(0)).equal(true);
      chai.expect(TimelineUtils.isNumber(-1)).equal(true);
      chai.expect(TimelineUtils.isNumber(1)).equal(true);
      chai.expect(TimelineUtils.isNumber(null)).equal(false);
      chai.expect(TimelineUtils.isNumber(undefined)).equal(false);
      chai.expect(TimelineUtils.isNumber(Number.NEGATIVE_INFINITY)).equal(false);
      chai.expect(TimelineUtils.isNumber(Number.NaN)).equal(false);
    });
    it('TimelineUtils.keepInBounds', () => {
      chai.expect(TimelineUtils.keepInBounds(0, -1, 2)).equal(0);
      chai.expect(TimelineUtils.keepInBounds(0, 1, 2)).equal(1);
      chai.expect(TimelineUtils.keepInBounds(0, 1, null)).equal(1);
      chai.expect(TimelineUtils.keepInBounds(10, null, 2)).equal(2);
      chai.expect(TimelineUtils.keepInBounds(-10, -1, 2)).equal(-1);
      chai.expect(TimelineUtils.keepInBounds(-10, 2, 2)).equal(2);
      chai.expect(TimelineUtils.keepInBounds(10, 1, 2)).equal(2);
    });
    it('TimelineUtils.cutBounds', () => {
      const cutInformation = new Timeline()._cutBoundsWhenOverlap(
        {
          x: 0,
          y: 0,
          width: 100,
          height: 100,
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          toJSON: () => {
            return '';
          },
        },
        10,
        50,
        10,
        50,
      );
      chai.assert(cutInformation);
      const rect = cutInformation.rect;
      chai.assert(rect);
      chai.expect(rect.x).equal(10);
      chai.expect(rect.y).equal(10);
      chai.expect(rect.width).equal(90);
      chai.expect(rect.height).equal(90);
    });

    it('Snapping. negative min (-25) is defined', () => {
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
  describe('Move Keyframes', () => {
    it('move left', () => {
      const timeline = new Timeline();
      timeline._options = {};
      const item1 = 25;
      const item2 = 50;
      const model = {
        rows: [{ val: 0, keyframes: [{ val: item1 }, { val: item2 }] } as TimelineRow] as Array<TimelineRow>,
      } as TimelineModel;
      timeline._model = model;
      const move = -50;
      const row = model.rows[0];
      chai.expect(!!row).equal(true);
      if (!row) {
        return;
      }
      const keyframes = row.keyframes;
      chai.expect(!!keyframes).equal(true);
      if (!keyframes) {
        return;
      }
      const movedOffset = timeline._moveElements(move, [
        {
          keyframe: keyframes[1],
          row: row,
        } as TimelineElementDragState,
        {
          keyframe: keyframes[0],
          row: row,
        } as TimelineElementDragState,
      ]);

      chai.expect(movedOffset).equal(move);
      chai.expect(keyframes[0]?.val).equal(item1 + move);
      chai.expect(keyframes[1]?.val).equal(item2 + move);
    });
    it('move right', () => {
      const timeline = new Timeline();
      const item1 = 25;
      const item2 = 50;
      const keyframesModels = [{ val: item1 }, { val: item2 }] as TimelineKeyframe[];
      const model = {
        rows: [{ keyframes: keyframesModels }] as TimelineRow[],
      } as TimelineModel;
      timeline._model = model;
      const move = 100;
      const row = model.rows[0];
      chai.expect(!!row).equal(true);
      if (!row) {
        return;
      }
      const keyframes = row.keyframes;
      chai.expect(!!keyframes).equal(true);
      if (!keyframes) {
        return;
      }
      const movedOffset = timeline._moveElements(move, [
        {
          keyframe: keyframes[1],
          row: row,
        } as TimelineElementDragState,
        {
          keyframe: keyframes[0],
          row: row,
        } as TimelineElementDragState,
      ]);

      chai.expect(movedOffset).equal(move);
      chai.expect(keyframes[0]?.val).equal(item1 + move);
      chai.expect(keyframes[1]?.val).equal(item2 + move);
    });
    it('move left limited by min', () => {
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
      chai.expect(elementsToMove[0].keyframe?.val).equal(0);
      chai.expect(elementsToMove[1].keyframe?.val).equal(25);
    });

    it('move right limited by max', () => {
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
      chai.expect(elementsToMove[0].keyframe?.val).equal(item1 + 50);
      chai.expect(elementsToMove[1].keyframe?.val).equal(item2 + 50);
    });
    it('move right limited by max negative', () => {
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
      chai.expect(elementsToMove[0].keyframe?.val).equal(item1 + 25);
      chai.expect(elementsToMove[1].keyframe?.val).equal(item2 + 25);
    });
    it('move right limited by max negative when other row out of the bounds', () => {
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
      chai.expect(elementsToMove[0].keyframe?.val).equal(100 + moved);
      chai.expect(elementsToMove[1].keyframe?.val).equal(400 + moved);
      chai.expect(elementsToMove[2].keyframe?.val).equal(200 + moved);
      chai.expect(elementsToMove[3].keyframe?.val).equal(300 + moved);
    });
    it('move left limited by min negative', () => {
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
      chai.expect(elementsToMove[0].keyframe?.val).equal(item1 - 50);
      chai.expect(elementsToMove[1].keyframe?.val).equal(item2 - 50);
    });
    it('move left only one keyframe is limited', () => {
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
      chai.expect(elementsToMove[0].keyframe?.val).equal(25 + 50);
      chai.expect(elementsToMove[1].keyframe?.val).equal(50 + 50);
    });
    it('move left only one keyframe has min bounds', () => {
      const timeline = new Timeline();
      const move = -100;
      const row = { min: 0, max: 100 } as TimelineRow;
      const elementsToMove = [
        {
          keyframe: { val: 25, min: 5 },
          row: row,
        } as TimelineElementDragState,
        {
          keyframe: { val: 50, min: 25 },
          row: row,
        } as TimelineElementDragState,
      ];
      const movedOffset = timeline._moveElements(move, elementsToMove);
      chai.expect(movedOffset).equal(-20);
      chai.expect(elementsToMove[0].keyframe?.val).equal(5);
      chai.expect(elementsToMove[1].keyframe?.val).equal(30);
    });
  });
});
