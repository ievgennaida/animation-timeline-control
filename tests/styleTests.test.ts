import { describe, expect, it } from '@jest/globals';
import {
  TimelineKeyframe,
  TimelineKeyframeShape,
  TimelineKeyframeStyle,
  TimelineOptions,
  TimelineRow,
  TimelineRowStyle,
  TimelineStyleUtils,
  TimelineUtils,
  defaultGroupStyle,
  defaultTimelineKeyframeStyle,
} from '../src/animation-timeline';
import { TimelineGroup } from '../src/models/timelineGroup';
import { TimelineGroupStyle } from '../src/settings/styles/timelineGroupStyle';

describe('TimelineStyleUtils', () => {
  describe('TimelineStyleUtils.getFirstSet', () => {
    it('Bool values. Default returned, empty list', () => {
      const defaultValue = false;
      expect(TimelineStyleUtils.getFirstSet<boolean>(defaultValue)).toBe(false);
    });
    it('Bool values. Default returned, undefined values', () => {
      const defaultValue = false;
      expect(TimelineStyleUtils.getFirstSet<boolean>(defaultValue, undefined, null)).toBe(false);
    });
    it('Bool values. True as default is returned', () => {
      const defaultValue = true;
      expect(TimelineStyleUtils.getFirstSet<boolean>(defaultValue, undefined, null)).toBe(true);
    });
    it('Bool values. False is returned as first set, default ignored.', () => {
      const defaultValue = true;
      expect(TimelineStyleUtils.getFirstSet<boolean>(defaultValue, undefined, false)).toBe(false);
    });

    it('Bool values. False is returned as first set, default ignored.', () => {
      const defaultValue = true;
      expect(TimelineStyleUtils.getFirstSet<boolean>(defaultValue, false, undefined)).toBe(false);
    });

    it('Bool values. False is returned as first set, all values valid.', () => {
      const defaultValue = true;
      expect(TimelineStyleUtils.getFirstSet<boolean>(defaultValue, false, true)).toBe(false);
    });
    it('Bool values. True is returned as first set, all values valid.', () => {
      const defaultValue = true;
      expect(TimelineStyleUtils.getFirstSet<boolean>(defaultValue, true, false)).toBe(true);
    });

    it('Bool values. Default returned, empty list', () => {
      const defaultValue = false;
      expect(TimelineStyleUtils.getFirstSet<boolean>(defaultValue)).toBe(false);
    });
    it('Bool values. Default returned, undefined values', () => {
      const defaultValue = false;
      expect(TimelineStyleUtils.getFirstSet<boolean>(defaultValue, undefined, null)).toBe(false);
    });
    it('Bool values. True as default is returned', () => {
      const defaultValue = true;
      expect(TimelineStyleUtils.getFirstSet<boolean>(defaultValue, undefined, null)).toBe(true);
    });
    it('Bool values. False is returned as first set, default ignored.', () => {
      const defaultValue = true;
      expect(TimelineStyleUtils.getFirstSet<boolean>(defaultValue, undefined, false)).toBe(false);
    });

    it('Bool values. False is returned as first set, default ignored.', () => {
      const defaultValue = true;
      expect(TimelineStyleUtils.getFirstSet<boolean>(defaultValue, false, undefined)).toBe(false);
    });

    it('Bool values. False is returned as first set, all values valid.', () => {
      const defaultValue = true;
      expect(TimelineStyleUtils.getFirstSet<boolean>(defaultValue, false, true)).toBe(false);
    });
    it('Bool values. True is returned as first set, all values valid.', () => {
      const defaultValue = true;
      expect(TimelineStyleUtils.getFirstSet<boolean>(defaultValue, true, false)).toBe(true);
    });
    it('Number values. 5 returned, empty list', () => {
      const defaultValue = 5;
      expect(TimelineStyleUtils.getFirstSet<number>(defaultValue)).toBe(5);
    });
    it('Number values. Default returned, undefined values', () => {
      const defaultValue = 5;
      expect(TimelineStyleUtils.getFirstSet<number>(defaultValue, undefined, null)).toBe(5);
    });
    it('Number values. 5 as default is returned', () => {
      const defaultValue = 5;
      expect(TimelineStyleUtils.getFirstSet<number>(defaultValue, undefined, null)).toBe(5);
    });
    it('Number values. 0 is returned as valid option', () => {
      const defaultValue = 5;
      expect(TimelineStyleUtils.getFirstSet<number>(defaultValue, undefined, null, 0)).toBe(0);
    });
    it('Number values. 0 is returned as valid option test #2', () => {
      const defaultValue = 5;
      expect(TimelineStyleUtils.getFirstSet<number>(defaultValue, 0, undefined, null, 2)).toBe(0);
    });
    it('Number values. False is returned as first set, default ignored.', () => {
      const defaultValue = 5;
      expect(TimelineStyleUtils.getFirstSet<number>(defaultValue, undefined, 1)).toBe(1);
    });

    it('Number values. False is returned as first set, default ignored.', () => {
      const defaultValue = 5;
      expect(TimelineStyleUtils.getFirstSet<number>(defaultValue, 1, undefined)).toBe(1);
    });

    it('Number values. False is returned as first set, all values valid.', () => {
      const defaultValue = 5;
      expect(TimelineStyleUtils.getFirstSet<number>(defaultValue, 2, 1)).toBe(2);
    });
    it('Number values. First valid is returned.', () => {
      const defaultValue = 5;
      expect(TimelineStyleUtils.getFirstSet<number>(defaultValue, 0, 2)).toBe(0);
    });
    it('Number values. First valid is returned not zero.', () => {
      const defaultValue = 5;
      expect(TimelineStyleUtils.getFirstSet<number>(defaultValue, 1, 2)).toBe(1);
    });
    it('String values. Default value is returned', () => {
      const defaultValue = 'test';
      expect(TimelineStyleUtils.getFirstSet(defaultValue)).toBe('test');
    });
    it('String values. Default returned, undefined values', () => {
      const defaultValue = 'test';
      expect(TimelineStyleUtils.getFirstSet<string>(defaultValue, undefined, null)).toBe('test');
    });
    it('String values. Default returned, undefined values. test #2', () => {
      const defaultValue = 'test';
      expect(TimelineStyleUtils.getFirstSet<string>(defaultValue, null, undefined)).toBe(defaultValue);
    });
    it('String values. First set value is returned before invalid.', () => {
      const defaultValue = 'test';
      expect(TimelineStyleUtils.getFirstSet<string>(defaultValue, undefined, 'test2')).toBe('test2');
    });

    it('String values. First set value is returned', () => {
      const defaultValue = 'test';
      expect(TimelineStyleUtils.getFirstSet<string>(defaultValue, 'test2', undefined)).toBe('test2');
    });

    /** First Negative Value. */
    it('First negative Bool values. Default returned, empty list', () => {
      const defaultValue = false;
      const firstNegativeIsReturned = true;
      expect(TimelineStyleUtils.getValue<boolean>(defaultValue, firstNegativeIsReturned)).toBe(false);
    });
    it('First negative Bool values. Default returned, undefined values', () => {
      const defaultValue = false;
      const firstNegativeIsReturned = true;
      expect(TimelineStyleUtils.getValue<boolean>(defaultValue, firstNegativeIsReturned, undefined, null)).toBe(false);
    });
    it('First negative Bool values. Bool values. True as default is returned', () => {
      const defaultValue = true;
      const firstNegativeIsReturned = true;
      expect(TimelineStyleUtils.getValue<boolean>(defaultValue, firstNegativeIsReturned, undefined, null)).toBe(true);
    });
    it('First negative Bool values.Bool values. False is returned as first set, default ignored.', () => {
      const defaultValue = true;
      const firstNegativeIsReturned = true;
      expect(TimelineStyleUtils.getValue<boolean>(defaultValue, firstNegativeIsReturned, true, false)).toBe(false);
    });
    it('First negative Bool values.Bool values. False is returned as second set.', () => {
      const defaultValue = true;
      const firstNegativeIsReturned = true;
      expect(TimelineStyleUtils.getValue<boolean>(defaultValue, firstNegativeIsReturned, false, true)).toBe(false);
    });
    it('First negative Bool values. Default is ignored..', () => {
      const defaultValue = false;
      const firstNegativeIsReturned = true;
      const returnedValue = TimelineStyleUtils.getValue<boolean>(defaultValue, firstNegativeIsReturned, true, true);
      expect(returnedValue).toBe(true);
    });
  });
  describe('Draggable', () => {
    it('Keyframe is draggable by default', () => {
      const timelineOptions = {
        rowsStyle: {
          keyframesStyle: {},
        } as TimelineRowStyle,
      } as TimelineOptions;

      const keyframe = {
        // Keyframe style
        style: { shape: TimelineKeyframeShape.Rect } as TimelineKeyframeStyle,
      } as TimelineKeyframe;
      const keyframeDraggable = TimelineStyleUtils.keyframeDraggable(keyframe, null, null, timelineOptions);
      expect(keyframeDraggable).toBe(true);
    });
    it('Keyframe is draggable', () => {
      const timelineOptions = {
        rowsStyle: {
          keyframesStyle: { shape: TimelineKeyframeShape.Rect },
        } as TimelineRowStyle,
      } as TimelineOptions;

      const keyframe = { draggable: true, style: { shape: TimelineKeyframeShape.Rect } } as TimelineKeyframe;
      expect(TimelineStyleUtils.keyframeDraggable(keyframe, null, null, timelineOptions)).toBe(true);
    });

    it('Keyframe is not draggable', () => {
      const timelineOptions = {
        rowsStyle: {
          keyframesStyle: { shape: TimelineKeyframeShape.Rect },
        } as TimelineRowStyle,
      } as TimelineOptions;

      const keyframe = { draggable: false, style: { shape: TimelineKeyframeShape.Rect } } as TimelineKeyframe;
      expect(TimelineStyleUtils.keyframeDraggable(keyframe, null, null, timelineOptions)).toBe(false);
    });

    it('Keyframe is draggable cannot override row', () => {
      const timelineOptions = {
        rowsStyle: {
          keyframesStyle: { shape: TimelineKeyframeShape.Rect },
        } as TimelineRowStyle,
      } as TimelineOptions;
      const rowModel = { keyframesDraggable: false, keyframesStyle: { keyframesStyle: { shape: TimelineKeyframeShape.Rect } } } as TimelineRow;
      const keyframe = { draggable: true, style: { shape: TimelineKeyframeShape.Rect } } as TimelineKeyframe;
      const value = TimelineStyleUtils.keyframeDraggable(keyframe, null, rowModel, timelineOptions);
      expect(value).toBe(false);
    });

    it('Keyframes are not draggable by row settings', () => {
      const timelineOptions = {
        rowsStyle: {
          keyframesStyle: {
            shape: TimelineKeyframeShape.Rect,
          },
        } as TimelineRowStyle,
      } as TimelineOptions;
      const rowModel = { keyframesDraggable: false, style: { keyframesStyle: { shape: TimelineKeyframeShape.Rect } } } as TimelineRow;
      const keyframe = { draggable: true, style: { shape: TimelineKeyframeShape.Rect } } as TimelineKeyframe;
      const isDraggable = TimelineStyleUtils.keyframeDraggable(keyframe, null, rowModel, timelineOptions);
      expect(isDraggable).toBe(false);
    });
    it('Keyframes are draggable by row', () => {
      const timelineOptions = {
        rowsStyle: {
          keyframesStyle: {
            shape: TimelineKeyframeShape.Rect,
          },
        } as TimelineRowStyle,
      } as TimelineOptions;
      const rowModel = { keyframesDraggable: true, keyframesStyle: { keyframesStyle: { shape: TimelineKeyframeShape.Rect } } } as TimelineRow;
      const keyframe = { draggable: true, style: { shape: TimelineKeyframeShape.Rect } } as TimelineKeyframe;
      const returnedValue = TimelineStyleUtils.keyframeDraggable(keyframe, null, rowModel, timelineOptions);
      expect(returnedValue).toBe(true);
    });
    it('Keyframes are not draggable while turned off on the top level.', () => {
      const timelineOptions = {
        rowsStyle: {
          keyframesDraggable: false,
          keyframesStyle: {
            shape: TimelineKeyframeShape.Rect,
          },
        } as TimelineRowStyle,
      } as TimelineOptions;
      const rowModel = { keyframesDraggable: false, keyframesStyle: { keyframesStyle: { shape: TimelineKeyframeShape.Rect } } } as TimelineRow;
      const keyframe = { draggable: true, style: { shape: TimelineKeyframeShape.Rect } } as TimelineKeyframe;
      const isDraggable = TimelineStyleUtils.keyframeDraggable(keyframe, null, rowModel, timelineOptions);
      expect(isDraggable).toBe(false);
    });
    it('Groups are draggable by default', () => {
      const timelineOptions = {
        rowsStyle: {
          keyframesDraggable: true,
          keyframesStyle: {
            shape: TimelineKeyframeShape.Rect,
          },
        } as TimelineRowStyle,
      } as TimelineOptions;
      const rowModel = { keyframesDraggable: true, keyframesStyle: { keyframesStyle: { shape: TimelineKeyframeShape.Rect } } } as TimelineRow;
      expect(TimelineStyleUtils.groupDraggable(null, rowModel, timelineOptions)).toBe(true);
    });

    it('Group is draggable', () => {
      const timelineOptions = {
        rowsStyle: {
          keyframesDraggable: false,
          keyframesStyle: {
            shape: TimelineKeyframeShape.Rect,
          },
        } as TimelineRowStyle,
      } as TimelineOptions;
      const rowModel = { keyframesDraggable: true, groupDraggable: true, keyframesStyle: { keyframesStyle: { shape: TimelineKeyframeShape.Rect } } } as TimelineRow;
      expect(TimelineStyleUtils.groupDraggable(null, rowModel, timelineOptions)).toBe(true);
    });

    it('Group is not draggable by row settings', () => {
      const timelineOptions = {
        groupsDraggable: true,
        rowsStyle: {
          keyframesDraggable: true,
          keyframesStyle: {
            shape: TimelineKeyframeShape.Rect,
          },
        } as TimelineRowStyle,
      } as TimelineOptions;
      const rowModel = {
        // Disable Row group draggable
        groupsDraggable: false,
        keyframesDraggable: true,
        keyframesStyle: { shape: TimelineKeyframeShape.Rect },
      } as TimelineRow;
      const isDraggable = TimelineStyleUtils.groupDraggable(null, rowModel, timelineOptions);
      expect(isDraggable).toBe(false);
    });
  });
  describe('Group style options', () => {
    const groupOptionsStyle = {
      fillColor: 'red',
      marginTop: 8,
    } as TimelineGroupStyle;

    const groupsRowStyle = {
      fillColor: 'blue',
      marginTop: 3,
    } as TimelineGroupStyle;
    const keyframesGroupsStyle = {
      fillColor: 'green',
      marginTop: 5,
    } as TimelineGroupStyle;

    it('Groups default style is used', () => {
      const timelineOptions = {
        rowsStyle: {
          keyframesStyle: {
            shape: TimelineKeyframeShape.Rect,
          },
        } as TimelineRowStyle,
      } as TimelineOptions;
      const rowModel = { keyframesDraggable: false, style: { keyframesStyle: { shape: TimelineKeyframeShape.Rect } } } as TimelineRow;

      const keyframe = {
        group: {
          style: {
            // No group options area passed.
          },
        },
        draggable: true,
        style: { shape: TimelineKeyframeShape.Rect },
      } as TimelineKeyframe;
      const value = TimelineStyleUtils.groupFillColor(timelineOptions, keyframe.group, rowModel.style);
      expect(value).toBe(defaultGroupStyle.fillColor);
      expect(TimelineStyleUtils.groupMarginTop(timelineOptions, keyframe.group, rowModel.style)).toBe(defaultGroupStyle.marginTop);
    });

    it('Groups options style is applied', () => {
      const timelineOptions = {
        rowsStyle: {
          groupsStyle: groupOptionsStyle,
          keyframesStyle: {
            shape: TimelineKeyframeShape.Rect,
          },
        } as TimelineRowStyle,
      } as TimelineOptions;
      const rowModel = { keyframesDraggable: false, style: { keyframesStyle: { shape: TimelineKeyframeShape.Rect } } } as TimelineRow;

      const keyframe = {
        group: {
          style: {
            // No group options area passed.
          },
        },
        draggable: true,
        style: { shape: TimelineKeyframeShape.Rect },
      } as TimelineKeyframe;
      const value = TimelineStyleUtils.groupFillColor(timelineOptions, keyframe.group, rowModel.style);
      expect(value).toBe(groupOptionsStyle.fillColor);
      expect(TimelineStyleUtils.groupMarginTop(timelineOptions, keyframe.group, rowModel.style)).toBe(groupOptionsStyle.marginTop);
    });

    it('Groups rows group options are applied', () => {
      const timelineOptions = {
        rowsStyle: {
          groupsStyle: groupsRowStyle,
          keyframesStyle: {
            shape: TimelineKeyframeShape.Rect,
          },
        } as TimelineRowStyle,
      } as TimelineOptions;
      const rowModel = {
        keyframesDraggable: false,
        // Row style
        style: {
          groupsRowStyle: groupsRowStyle,
        } as TimelineKeyframeStyle,
      } as TimelineRow;

      const keyframe = {
        group: {
          style: {
            // No group options area passed.
          },
        },
        draggable: true,
        style: { shape: TimelineKeyframeShape.Rect },
      } as TimelineKeyframe;
      const value = TimelineStyleUtils.groupFillColor(timelineOptions, keyframe.group, rowModel.style);
      expect(value).toBe(groupsRowStyle.fillColor);
      expect(TimelineStyleUtils.groupMarginTop(timelineOptions, keyframe.group, rowModel.style)).toBe(groupsRowStyle.marginTop);
    });

    it('Groups keyframe group options are applied', () => {
      const timelineOptions = {
        rowsStyle: {
          groupsStyle: groupsRowStyle,
          keyframesStyle: {
            shape: TimelineKeyframeShape.Rect,
            groupsStyle: groupsRowStyle,
          },
        } as TimelineRowStyle,
      } as TimelineOptions;
      const rowModel = { keyframesDraggable: false, style: { keyframesStyle: { shape: TimelineKeyframeShape.Rect } } } as TimelineRow;

      const keyframe = {
        group: {
          style: keyframesGroupsStyle,
        },
        draggable: true,
        style: { shape: TimelineKeyframeShape.Rect },
      } as TimelineKeyframe;
      const value = TimelineStyleUtils.groupFillColor(timelineOptions, keyframe.group, rowModel.style);
      expect(value).toBe(keyframesGroupsStyle.fillColor);
      expect(TimelineStyleUtils.groupMarginTop(timelineOptions, keyframe.group, rowModel.style)).toBe(keyframesGroupsStyle.marginTop);
    });
  });
  describe('Row styles', () => {
    it('Height is taken from row', () => {
      const timelineOptions = {
        rowsStyle: {
          height: 100,
          keyframesStyle: {},
        } as TimelineRowStyle,
      } as TimelineOptions;

      const rowsStyle = { height: 50 } as TimelineRowStyle;
      expect(TimelineStyleUtils.getRowHeight(rowsStyle, timelineOptions)).toBe(rowsStyle.height);
    });
    it('Height is taken from global settings', () => {
      const timelineOptions = {
        rowsStyle: {
          height: 100,
          keyframesStyle: {},
        } as TimelineRowStyle,
      } as TimelineOptions;

      const rowsStyle = {} as TimelineRowStyle;
      expect(TimelineStyleUtils.getRowHeight(rowsStyle, timelineOptions)).toBe(timelineOptions.rowsStyle?.height);
    });
    it('Margin bottom is taken from global settings', () => {
      const timelineOptions = {
        rowsStyle: {
          height: 100,
          marginBottom: 30,
          keyframesStyle: {},
        } as TimelineRowStyle,
      } as TimelineOptions;

      const rowsStyle = {} as TimelineRowStyle;
      expect(TimelineStyleUtils.getRowMarginBottom(rowsStyle, timelineOptions)).toBe(timelineOptions.rowsStyle?.marginBottom);
    });
    it('Margin bottom is taken from row settings', () => {
      const timelineOptions = {
        rowsStyle: {
          height: 100,
          marginBottom: 30,
          keyframesStyle: {},
        } as TimelineRowStyle,
      } as TimelineOptions;

      const rowsStyle = { marginBottom: 43 } as TimelineRowStyle;
      expect(TimelineStyleUtils.getRowMarginBottom(rowsStyle, timelineOptions)).toBe(rowsStyle.marginBottom);
    });
  });

  describe('Keyframe style options', () => {
    const assertKeyframeStyles = (
      keyframe: TimelineKeyframe | null,
      group: TimelineGroup | string | null | undefined,
      rowStyle: TimelineRowStyle | null,
      options: TimelineOptions | null,
      expectedStyle: TimelineKeyframeStyle,
    ) => {
      const fillColor = TimelineStyleUtils.keyframeFillColor(keyframe, group, rowStyle, options);
      expect(fillColor).toBe(expectedStyle.fillColor);
      const keyframeHeight = TimelineStyleUtils.keyframeHeight(keyframe, group, rowStyle, options);
      expect(keyframeHeight).toBe(expectedStyle.height);
      const selectedFillColor = TimelineStyleUtils.keyframeSelectedFillColor(keyframe, group, rowStyle, options);
      expect(selectedFillColor).toBe(expectedStyle.selectedFillColor);
      const keyframeSelectedStrokeColor = TimelineStyleUtils.keyframeSelectedStrokeColor(keyframe, group || null, rowStyle, options);
      expect(keyframeSelectedStrokeColor).toBe(expectedStyle.selectedStrokeColor);
      const shape = TimelineStyleUtils.keyframeShape(keyframe, group, rowStyle, options);
      expect(shape).toBe(expectedStyle.shape);
      const keyframeStrokeColor = TimelineStyleUtils.keyframeStrokeColor(keyframe, group, rowStyle, options);
      expect(keyframeStrokeColor).toBe(expectedStyle.strokeColor);
      const keyframeStrokeThickness = TimelineStyleUtils.keyframeStrokeThickness(keyframe, group, rowStyle, options);
      expect(keyframeStrokeThickness).toBe(expectedStyle.strokeThickness);
      const keyframeWidth = TimelineStyleUtils.keyframeWidth(keyframe, group, rowStyle, options);
      expect(keyframeWidth).toBe(expectedStyle.width);
    };
    it('Default keyframe styles are applied.', () => {
      const timelineOptions = {
        rowsStyle: {
          keyframesStyle: {},
        } as TimelineRowStyle,
      } as TimelineOptions;
      const rowModel = {
        keyframesDraggable: false,
        style: {
          // row keyframe style
        },
      } as TimelineRow;

      const keyframe = {
        group: {
          style: {
            // No group options area passed.
          },
        },
        draggable: true,
        style: {
          // keyframe style.
        },
      } as TimelineKeyframe;
      assertKeyframeStyles(
        // keyframe
        keyframe,
        // group style
        keyframe.group,
        // row style
        rowModel?.style || null,
        // Global settings
        timelineOptions,
        // Expected
        defaultTimelineKeyframeStyle,
      );
    });
    it('Override keyframe styles are applied.', () => {
      const expectedStyle = TimelineUtils.deepClone(defaultTimelineKeyframeStyle);
      expectedStyle.shape = TimelineKeyframeShape.Rect;
      expectedStyle.height = 5;
      expectedStyle.width = 5;
      expectedStyle.fillColor = 'test';
      expectedStyle.selectedFillColor = 'test1';
      expectedStyle.strokeColor = 'test2';
      expectedStyle.selectedStrokeColor = 'test3';
      expectedStyle.strokeThickness = 3;

      const timelineOptions = {
        rowsStyle: {
          keyframesStyle: expectedStyle,
        } as TimelineRowStyle,
      } as TimelineOptions;
      const rowModel = {
        keyframesDraggable: false,
        style: {
          // row keyframe style
        },
      } as TimelineRow;

      const keyframe = {
        group: {
          style: {
            // No group options area passed.
          },
        },
        draggable: true,
        style: {
          // keyframe style.
        },
      } as TimelineKeyframe;
      assertKeyframeStyles(
        // keyframe
        keyframe,
        // group style
        keyframe.group,
        // row style
        rowModel?.style || null,
        // Global settings
        timelineOptions,
        // Expected
        expectedStyle,
      );
    });

    it('Keyframes style row model is applied.', () => {
      const expectedStyle = TimelineUtils.deepClone(defaultTimelineKeyframeStyle);
      expectedStyle.shape = TimelineKeyframeShape.Rect;
      expectedStyle.height = 5;
      expectedStyle.width = 5;
      expectedStyle.fillColor = 'test';
      expectedStyle.selectedFillColor = 'test1';
      expectedStyle.strokeColor = 'test2';
      expectedStyle.selectedStrokeColor = 'test3';
      expectedStyle.strokeThickness = 3;
      const timelineOptions = {
        rowsStyle: {
          keyframesStyle: TimelineUtils.deepClone(defaultTimelineKeyframeStyle),
        } as TimelineRowStyle,
      } as TimelineOptions;
      const rowModel = {
        keyframesDraggable: false,
        style: {
          keyframesStyle: expectedStyle,
        },
      } as TimelineRow;

      const keyframe = {
        group: {
          style: {
            // No group options area passed.
          },
        },
        draggable: true,
        style: {
          // keyframe style.
        },
      } as TimelineKeyframe;
      assertKeyframeStyles(
        // keyframe
        keyframe,
        // group style
        keyframe.group,
        // row style
        rowModel?.style || null,
        // Global settings
        timelineOptions,
        // Expected
        expectedStyle,
      );
    });
    it('Groups keyframe is applied.', () => {
      const expectedStyle = TimelineUtils.deepClone(defaultTimelineKeyframeStyle);
      expectedStyle.shape = TimelineKeyframeShape.Rect;
      expectedStyle.height = 5;
      expectedStyle.width = 5;
      expectedStyle.fillColor = 'test';
      expectedStyle.selectedFillColor = 'test1';
      expectedStyle.strokeColor = 'test2';
      expectedStyle.selectedStrokeColor = 'test3';
      expectedStyle.strokeThickness = 3;
      const timelineOptions = {
        rowsStyle: {
          keyframesStyle: TimelineUtils.deepClone(defaultTimelineKeyframeStyle),
        } as TimelineRowStyle,
      } as TimelineOptions;
      const rowModel = {
        keyframesDraggable: false,
        style: {
          keyframesStyle: TimelineUtils.deepClone(defaultTimelineKeyframeStyle),
        },
      } as TimelineRow;

      const keyframe = {
        group: {
          style: {
            keyframesStyle: expectedStyle,
            // No group options area passed.
          },
        },
        draggable: true,
        style: {
          // keyframe style.
        },
      } as TimelineKeyframe;
      assertKeyframeStyles(
        // keyframe
        keyframe,
        // group style
        keyframe.group,
        // row style
        rowModel?.style || null,
        // Global settings
        timelineOptions,
        // Expected
        expectedStyle,
      );
    });
    it('Keyframe level style is applied.', () => {
      const expectedStyle = TimelineUtils.deepClone(defaultTimelineKeyframeStyle);
      expectedStyle.shape = TimelineKeyframeShape.Rect;
      expectedStyle.height = 5;
      expectedStyle.width = 5;
      expectedStyle.fillColor = 'test';
      expectedStyle.selectedFillColor = 'test1';
      expectedStyle.strokeColor = 'test2';
      expectedStyle.selectedStrokeColor = 'test3';
      expectedStyle.strokeThickness = 3;
      const timelineOptions = {
        rowsStyle: {
          keyframesStyle: TimelineUtils.deepClone(defaultTimelineKeyframeStyle),
        } as TimelineRowStyle,
      } as TimelineOptions;
      const rowModel = {
        keyframesDraggable: false,
        style: {
          keyframesStyle: TimelineUtils.deepClone(defaultTimelineKeyframeStyle),
        },
      } as TimelineRow;

      const keyframe = {
        group: {
          style: {
            keyframesStyle: TimelineUtils.deepClone(defaultTimelineKeyframeStyle),
            // No group options area passed.
          },
        },
        draggable: true,
        style: expectedStyle,
      } as TimelineKeyframe;
      assertKeyframeStyles(
        // keyframe
        keyframe,
        // group style
        keyframe.group,
        // row style
        rowModel?.style || null,
        // Global settings
        timelineOptions,
        // Expected
        expectedStyle,
      );
    });
  });
});
