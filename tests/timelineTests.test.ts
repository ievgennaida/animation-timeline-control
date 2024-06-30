import { describe, expect, it } from '@jest/globals';
import {
  Timeline,
  TimelineElement,
  TimelineElementDragState,
  TimelineElementType,
  TimelineKeyframe,
  TimelineKeyframeShape,
  TimelineKeyframeStyle,
  TimelineModel,
  TimelineOptions,
  TimelineRow,
  TimelineRowStyle,
  TimelineSelectionMode,
  TimelineUtils,
} from '../src/animation-timeline';

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

      console.log(TimelineElementType.Keyframe + ' should be selected');
      expect(element.type).toBe(TimelineElementType.Keyframe);
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
      console.log(TimelineElementType.Timeline + ' should be selected');
      expect(element.type).toBe(TimelineElementType.Timeline);
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

      console.log(TimelineElementType.Timeline + ' should be selected');
      expect(element.type).toBe(TimelineElementType.Timeline);
      // Keyframe with value 5 should be selected
      expect(element.val).toBe(5);
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
      console.log(TimelineElementType.Group + ' should be selected');
      expect(element.type).toBe(TimelineElementType.Group);
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
      expect(element).toBeTruthy();
      expect(element?.val).toBe(elements[1].val);
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
      expect(element);
      console.log('Group should be selected');
      expect(element?.type).toBe(TimelineElementType.Group);
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
      expect(element);
      // Keyframe with value 5 should be selected as draggable
      expect(element?.val).toBe(5);
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
      expect(element);
      // Keyframe with value 5 should be selected as draggable
      expect(element?.val).toBe(5);
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
      expect(element.selectionChanged).toBe(true);
      let changed = 0;
      model.rows.forEach((row: TimelineRow) => {
        const len = row?.keyframes?.length || 0;
        expect(len > 0).toBe(true);
        if (row && row.keyframes) {
          row.keyframes.forEach((keyframe: TimelineKeyframe) => {
            expect(keyframe.selected).toBe(true);
            changed++;
          });
        }
      });

      expect(element.selected.length).toBe(changed);
    });
    it('Select all selectable', () => {
      const timeline = new Timeline();
      timeline._model = model;
      const element = timeline.getAllKeyframes();

      let changed = 0;
      let selectable = 0;
      model.rows.forEach((row: TimelineRow) => {
        const len = row?.keyframes?.length || 0;
        expect(len > 0).toBe(true);
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
      expect(selectionResults.changed.length).toBe(selectable);
      expect(selectionResults.selected.length).toBe(selectable);
    });
    it('Deselect all', () => {
      const timeline = new Timeline();
      timeline._model = model;
      model.rows.forEach((row: TimelineRow) => {
        const len = row?.keyframes?.length || 0;
        expect(len > 0).toBe(true);
        if (row.keyframes) {
          row.keyframes.forEach((keyframe: TimelineKeyframe) => {
            keyframe.selectable = true;
            keyframe.selected = true;
          });
        }
      });
      // deselect all
      const element = timeline.deselectAll();
      expect(element.selectionChanged).toBe(true);
      expect(element.selected.length).toBe(0);
      model.rows.forEach((row: TimelineRow) => {
        const len = row?.keyframes?.length || 0;
        expect(len > 0).toBe(true);
        if (row.keyframes) {
          row.keyframes.forEach((keyframe: TimelineKeyframe) => {
            expect(keyframe.selected).toBe(false);
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
        expect(len > 0).toBe(true);
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
      expect(!!rowToSelect.keyframes).toBe(true);
      if (!rowToSelect.keyframes) {
        return;
      }
      // toggle selection
      const toSelect = rowToSelect.keyframes[0];
      const element = timeline.select(toSelect);
      expect(element.selectionChanged).toBe(true);
      expect(element.selected.length).toBe(1);
      expect(element.changed.length).toBe(expectedChanged - 1);

      model.rows.forEach((row: TimelineRow) => {
        const len = row?.keyframes?.length || 0;
        expect(len > 0).toBe(true);
        if (row.keyframes) {
          row.keyframes.forEach((keyframe: TimelineKeyframe) => {
            if (toSelect == keyframe) {
              expect(keyframe.selected).toBe(true);
            } else {
              expect(keyframe.selected).toBe(false);
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
        expect(len > 0).toBe(true);
        if (row.keyframes) {
          row.keyframes.forEach((keyframe: TimelineKeyframe) => {
            keyframe.selectable = true;
            keyframe.selected = true;
            totalKeyframes++;
          });
        }
      });

      const rowToSelect = model.rows[1];
      expect(!!rowToSelect.keyframes).toBe(true);
      if (!rowToSelect.keyframes) {
        return;
      }
      // toggle selection
      const toSelect = rowToSelect.keyframes[0];

      // item is selected, should be reverted
      const element = timeline.select(toSelect, TimelineSelectionMode.Revert);
      expect(element.selectionChanged).toBe(true);
      expect(element.selected.length).toBe(totalKeyframes - 1);
      expect(element.changed.length).toBe(1);

      model.rows.forEach((row: TimelineRow) => {
        expect((row.keyframes?.length || 0) > 0).toBe(true);
        if (row.keyframes) {
          row.keyframes.forEach((keyframe: TimelineKeyframe) => {
            if (toSelect == keyframe) {
              expect(keyframe.selected).toBe(false);
            } else {
              expect(keyframe.selected).toBe(true);
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
        expect(len > 0).toBe(true);
        if (row.keyframes) {
          row.keyframes.forEach((keyframe: TimelineKeyframe) => {
            keyframe.selectable = true;
            keyframe.selected = false;
          });
        }
      });

      // select one will deselect other
      const rowToSelect = model.rows[1];
      expect(!!rowToSelect.keyframes).toBe(true);
      if (!rowToSelect.keyframes) {
        return;
      }
      const element = timeline.select(rowToSelect.keyframes);
      expect(element.selectionChanged).toBe(true);
      expect(element.selected.length).toBe(rowToSelect.keyframes.length);
      expect(element.changed.length).toBe(3);

      model.rows.forEach((row: TimelineRow) => {
        if (rowToSelect === row) {
          const len = row?.keyframes?.length || 0;
          expect(len > 0).toBe(true);
          if (rowToSelect.keyframes) {
            rowToSelect.keyframes.forEach((keyframe: TimelineKeyframe) => {
              expect(keyframe.selected).toBe(true);
            });
          }
        } else {
          const len = row?.keyframes?.length || 0;
          expect(len > 0).toBe(true);
          if (row.keyframes) {
            row.keyframes.forEach((keyframe: TimelineKeyframe) => {
              expect(keyframe.selected).toBe(false);
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
        expect(len > 0).toBe(true);
        if (row.keyframes) {
          row.keyframes.forEach((keyframe: TimelineKeyframe) => {
            keyframe.selected = false;
          });
        }
      });

      // select one row (array of the keyframes)
      const rowToSelect = model.rows[1];
      expect(!!rowToSelect.keyframes).toBe(true);
      if (!rowToSelect.keyframes) {
        return;
      }
      let results = timeline.select(rowToSelect.keyframes);
      expect(results.selectionChanged).toBe(true);
      expect(results.selected.length).toBe(rowToSelect.keyframes?.length);
      expect(results.changed.length).toBe(rowToSelect.keyframes?.length);

      // (array of the keyframes)
      const rowToSelect2 = model.rows[2];
      results = timeline.select(rowToSelect2?.keyframes || [], TimelineSelectionMode.Append);
      expect(results.selectionChanged).toBe(true);
      expect(results.selected.length).toBe((rowToSelect?.keyframes?.length || 0) + (rowToSelect2?.keyframes?.length || 0));
      expect(results.changed.length).toBe(rowToSelect2?.keyframes?.length);

      model.rows.forEach((row: TimelineRow) => {
        if (rowToSelect === row || rowToSelect2 === row) {
          expect((rowToSelect.keyframes?.length || 0) > 0).toBe(true);
          if (rowToSelect.keyframes) {
            rowToSelect.keyframes.forEach((keyframe: TimelineKeyframe) => {
              expect(keyframe.selected).toBe(true);
            });
          }
        } else {
          expect((row.keyframes?.length || 0) > 0).toBe(true);
          if (row.keyframes) {
            row.keyframes.forEach((keyframe: TimelineKeyframe) => {
              expect(keyframe.selected).toBe(false);
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

      expect(timeline.valToPx(0)).toBe(0);
      expect(timeline.valToPx(100)).toBe(50);
      expect(timeline.valToPx(200)).toBe(100);

      expect(timeline.pxToVal(0)).toBe(0);
      expect(timeline.pxToVal(50)).toBe(100);
      expect(timeline.pxToVal(100)).toBe(200);
    });
    it('Coordinates. min is negative', () => {
      const timeline = new Timeline();
      timeline._setOptions({
        stepVal: 100,
        stepPx: 50,
        min: -100,
        zoom: 1,
      } as TimelineOptions);

      expect(timeline.valToPx(-100)).toBe(0);
      expect(timeline.valToPx(-50)).toBe(25);
      expect(timeline.valToPx(0)).toBe(50);
      expect(timeline.valToPx(50)).toBe(75);
      expect(timeline.valToPx(100)).toBe(100);

      expect(timeline.pxToVal(0)).toBe(-100);
      expect(timeline.pxToVal(25)).toBe(-50);
      expect(timeline.pxToVal(50)).toBe(0);
      expect(timeline.pxToVal(75)).toBe(50);
      expect(timeline.pxToVal(100)).toBe(100);
    });
    it('Coordinates. min is positive', () => {
      const timeline = new Timeline();
      timeline._setOptions({
        stepVal: 100,
        stepPx: 50,
        min: 100,
        zoom: 1,
      } as TimelineOptions);

      expect(timeline.valToPx(100)).toBe(0);
      expect(timeline.valToPx(150)).toBe(25);

      expect(timeline.pxToVal(0)).toBe(100);
      expect(timeline.pxToVal(25)).toBe(150);
    });
    it('Zoom is respected', () => {
      const timeline = new Timeline();
      timeline._setOptions({
        stepVal: 100,
        stepPx: 50,
        zoom: 1,
      } as TimelineOptions);

      expect(timeline.valToPx(0)).toBe(0);
      expect(timeline.valToPx(100)).toBe(50);
      expect(timeline.valToPx(200)).toBe(100);
      timeline._setZoom(2);
      expect(timeline.valToPx(0)).toBe(0);
      expect(timeline.valToPx(100)).toBe(25);
      expect(timeline.valToPx(200)).toBe(50);

      expect(timeline.pxToVal(0)).toBe(0);
      expect(timeline.pxToVal(25)).toBe(100);
      expect(timeline.pxToVal(50)).toBe(200);
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

      expect(timeline.snapVal(0)).toBe(0);
      expect(timeline.snapVal(10)).toBe(0);
      expect(timeline.snapVal(26)).toBe(25);
      expect(timeline.snapVal(48)).toBe(50);
      expect(timeline.snapVal(58)).toBe(50);
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

      expect(timeline.snapVal(0)).toBe(5);
      expect(timeline.snapVal(10)).toBe(5);
      expect(timeline.snapVal(26)).toBe(30);
      expect(timeline.snapVal(48)).toBe(55);
      expect(timeline.snapVal(58)).toBe(55);

      // Don't overlap the limit.
      expect(timeline.snapVal(-100)).toBe(5);
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

      expect(timeline.snapVal(0)).toBe(-5);
      expect(timeline.snapVal(10)).toBe(-5);
      expect(timeline.snapVal(26)).toBe(20);
      expect(timeline.snapVal(48)).toBe(45);
      expect(timeline.snapVal(58)).toBe(45);

      expect(timeline.snapVal(-1)).toBe(-5);
      expect(timeline.snapVal(-10)).toBe(-5);
      expect(timeline.snapVal(-26)).toBe(-30);
      expect(timeline.snapVal(-48)).toBe(-55);
      expect(timeline.snapVal(-58)).toBe(-55);

      // Don't overlap the limit.
      expect(timeline.snapVal(-100)).toBe(-55);
    });
    it('TimelineUtils.isNumber', () => {
      expect(TimelineUtils.isNumber(0)).toBe(true);
      expect(TimelineUtils.isNumber(-1)).toBe(true);
      expect(TimelineUtils.isNumber(1)).toBe(true);
      expect(TimelineUtils.isNumber(null)).toBe(false);
      expect(TimelineUtils.isNumber(undefined)).toBe(false);
      expect(TimelineUtils.isNumber(Number.NEGATIVE_INFINITY)).toBe(false);
      expect(TimelineUtils.isNumber(Number.NaN)).toBe(false);
    });
    it('TimelineUtils.keepInBounds', () => {
      expect(TimelineUtils.keepInBounds(0, -1, 2)).toBe(0);
      expect(TimelineUtils.keepInBounds(0, 1, 2)).toBe(1);
      expect(TimelineUtils.keepInBounds(0, 1, null)).toBe(1);
      expect(TimelineUtils.keepInBounds(10, null, 2)).toBe(2);
      expect(TimelineUtils.keepInBounds(-10, -1, 2)).toBe(-1);
      expect(TimelineUtils.keepInBounds(-10, 2, 2)).toBe(2);
      expect(TimelineUtils.keepInBounds(10, 1, 2)).toBe(2);
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
      expect(cutInformation);
      const rect = cutInformation?.rect;
      expect(rect);
      expect(rect?.x).toBe(10);
      expect(rect?.y).toBe(10);
      expect(rect?.width).toBe(90);
      expect(rect?.height).toBe(90);
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

      expect(timeline.snapVal(-1) === 0).toBeTruthy();
      expect(timeline.snapVal(-10) === 0).toBeTruthy();
      expect(timeline.snapVal(10) === 0).toBeTruthy();
      expect(timeline.snapVal(26)).toBe(25);
      expect(timeline.snapVal(50)).toBe(50);
      expect(timeline.snapVal(-58)).toBe(-25);
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
      expect(!!row).toBe(true);
      if (!row) {
        return;
      }
      const keyframes = row.keyframes;
      expect(!!keyframes).toBe(true);
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

      expect(movedOffset).toBe(move);
      expect(keyframes[0]?.val).toBe(item1 + move);
      expect(keyframes[1]?.val).toBe(item2 + move);
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
      expect(!!row).toBe(true);
      if (!row) {
        return;
      }
      const keyframes = row.keyframes;
      expect(!!keyframes).toBe(true);
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

      expect(movedOffset).toBe(move);
      expect(keyframes[0]?.val).toBe(item1 + move);
      expect(keyframes[1]?.val).toBe(item2 + move);
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

      expect(movedOffset).toBe(move / 2);
      expect(elementsToMove[0].keyframe?.val).toBe(0);
      expect(elementsToMove[1].keyframe?.val).toBe(25);
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

      expect(movedOffset).toBe(move / 2);
      expect(elementsToMove[0].keyframe?.val).toBe(item1 + 50);
      expect(elementsToMove[1].keyframe?.val).toBe(item2 + 50);
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

      expect(movedOffset).toBe(25);
      expect(elementsToMove[0].keyframe?.val).toBe(item1 + 25);
      expect(elementsToMove[1].keyframe?.val).toBe(item2 + 25);
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
      expect(movedOffset).toBe(moved);
      expect(elementsToMove[0].keyframe?.val).toBe(100 + moved);
      expect(elementsToMove[1].keyframe?.val).toBe(400 + moved);
      expect(elementsToMove[2].keyframe?.val).toBe(200 + moved);
      expect(elementsToMove[3].keyframe?.val).toBe(300 + moved);
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

      expect(movedOffset).toBe(move / 2);
      expect(elementsToMove[0].keyframe?.val).toBe(item1 - 50);
      expect(elementsToMove[1].keyframe?.val).toBe(item2 - 50);
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

      expect(movedOffset).toBe(move / 2);
      expect(elementsToMove[0].keyframe?.val).toBe(25 + 50);
      expect(elementsToMove[1].keyframe?.val).toBe(50 + 50);
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
      expect(movedOffset).toBe(-20);
      expect(elementsToMove[0].keyframe?.val).toBe(5);
      expect(elementsToMove[1].keyframe?.val).toBe(30);
    });
  });
});
