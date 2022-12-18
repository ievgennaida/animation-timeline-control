/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  TimelineStyleUtils,
  TimelineKeyframeShape,
  TimelineRowStyle,
  TimelineKeyframeStyle,
  TimelineKeyframe,
  TimelineRow,
  defaultGroupStyle,
  TimelineOptions,
  defaultTimelineKeyframeStyle,
  TimelineUtils,
} from '../lib/animation-timeline';
import { TimelineGroup } from '../lib/models/timelineGroup';
import { TimelineGroupStyle } from '../lib/settings/styles/timelineGroupStyle';

describe('TimelineStyleUtils', () => {
  describe('TimelineStyleUtils.getFirstSet', () => {
    it('Bool values. Default returned, empty list', () => {
      const defaultValue = false;
      chai.expect(TimelineStyleUtils.getFirstSet<boolean>(defaultValue)).equal(false);
    });
    it('Bool values. Default returned, undefined values', () => {
      const defaultValue = false;
      chai.expect(TimelineStyleUtils.getFirstSet<boolean>(defaultValue, undefined, null)).equal(false);
    });
    it('Bool values. True as default is returned', () => {
      const defaultValue = true;
      chai.expect(TimelineStyleUtils.getFirstSet<boolean>(defaultValue, undefined, null)).equal(true);
    });
    it('Bool values. False is returned as first set, default ignored.', () => {
      const defaultValue = true;
      chai.expect(TimelineStyleUtils.getFirstSet<boolean>(defaultValue, undefined, false)).equal(false);
    });

    it('Bool values. False is returned as first set, default ignored.', () => {
      const defaultValue = true;
      chai.expect(TimelineStyleUtils.getFirstSet<boolean>(defaultValue, false, undefined)).equal(false);
    });

    it('Bool values. False is returned as first set, all values valid.', () => {
      const defaultValue = true;
      chai.expect(TimelineStyleUtils.getFirstSet<boolean>(defaultValue, false, true)).equal(false);
    });
    it('Bool values. True is returned as first set, all values valid.', () => {
      const defaultValue = true;
      chai.expect(TimelineStyleUtils.getFirstSet<boolean>(defaultValue, true, false)).equal(true);
    });

    it('Bool values. Default returned, empty list', () => {
      const defaultValue = false;
      chai.expect(TimelineStyleUtils.getFirstSet<boolean>(defaultValue)).equal(false);
    });
    it('Bool values. Default returned, undefined values', () => {
      const defaultValue = false;
      chai.expect(TimelineStyleUtils.getFirstSet<boolean>(defaultValue, undefined, null)).equal(false);
    });
    it('Bool values. True as default is returned', () => {
      const defaultValue = true;
      chai.expect(TimelineStyleUtils.getFirstSet<boolean>(defaultValue, undefined, null)).equal(true);
    });
    it('Bool values. False is returned as first set, default ignored.', () => {
      const defaultValue = true;
      chai.expect(TimelineStyleUtils.getFirstSet<boolean>(defaultValue, undefined, false)).equal(false);
    });

    it('Bool values. False is returned as first set, default ignored.', () => {
      const defaultValue = true;
      chai.expect(TimelineStyleUtils.getFirstSet<boolean>(defaultValue, false, undefined)).equal(false);
    });

    it('Bool values. False is returned as first set, all values valid.', () => {
      const defaultValue = true;
      chai.expect(TimelineStyleUtils.getFirstSet<boolean>(defaultValue, false, true)).equal(false);
    });
    it('Bool values. True is returned as first set, all values valid.', () => {
      const defaultValue = true;
      chai.expect(TimelineStyleUtils.getFirstSet<boolean>(defaultValue, true, false)).equal(true);
    });
    it('Number values. 5 returned, empty list', () => {
      const defaultValue = 5;
      chai.expect(TimelineStyleUtils.getFirstSet<number>(defaultValue)).equal(5);
    });
    it('Number values. Default returned, undefined values', () => {
      const defaultValue = 5;
      chai.expect(TimelineStyleUtils.getFirstSet<number>(defaultValue, undefined, null)).equal(5);
    });
    it('Number values. 5 as default is returned', () => {
      const defaultValue = 5;
      chai.expect(TimelineStyleUtils.getFirstSet<number>(defaultValue, undefined, null)).equal(5);
    });
    it('Number values. 0 is returned as valid option', () => {
      const defaultValue = 5;
      chai.expect(TimelineStyleUtils.getFirstSet<number>(defaultValue, undefined, null, 0)).equal(0);
    });
    it('Number values. 0 is returned as valid option test #2', () => {
      const defaultValue = 5;
      chai.expect(TimelineStyleUtils.getFirstSet<number>(defaultValue, 0, undefined, null, 2)).equal(0);
    });
    it('Number values. False is returned as first set, default ignored.', () => {
      const defaultValue = 5;
      chai.expect(TimelineStyleUtils.getFirstSet<number>(defaultValue, undefined, 1)).equal(1);
    });

    it('Number values. False is returned as first set, default ignored.', () => {
      const defaultValue = 5;
      chai.expect(TimelineStyleUtils.getFirstSet<number>(defaultValue, 1, undefined)).equal(1);
    });

    it('Number values. False is returned as first set, all values valid.', () => {
      const defaultValue = 5;
      chai.expect(TimelineStyleUtils.getFirstSet<number>(defaultValue, 2, 1)).equal(2);
    });
    it('Number values. First valid is returned.', () => {
      const defaultValue = 5;
      chai.expect(TimelineStyleUtils.getFirstSet<number>(defaultValue, 0, 2)).equal(0);
    });
    it('Number values. First valid is returned not zero.', () => {
      const defaultValue = 5;
      chai.expect(TimelineStyleUtils.getFirstSet<number>(defaultValue, 1, 2)).equal(1);
    });
    it('String values. Default value is returned', () => {
      const defaultValue = 'test';
      chai.expect(TimelineStyleUtils.getFirstSet(defaultValue)).equal('test');
    });
    it('String values. Default returned, undefined values', () => {
      const defaultValue = 'test';
      chai.expect(TimelineStyleUtils.getFirstSet<string>(defaultValue, undefined, null)).equal('test');
    });
    it('String values. Default returned, undefined values. test #2', () => {
      const defaultValue = 'test';
      chai.expect(TimelineStyleUtils.getFirstSet<string>(defaultValue, null, undefined)).equal(defaultValue);
    });
    it('String values. First set value is returned before invalid.', () => {
      const defaultValue = 'test';
      chai.expect(TimelineStyleUtils.getFirstSet<string>(defaultValue, undefined, 'test2')).equal('test2');
    });

    it('String values. First set value is returned', () => {
      const defaultValue = 'test';
      chai.expect(TimelineStyleUtils.getFirstSet<string>(defaultValue, 'test2', undefined)).equal('test2');
    });

    /** First Negative Value. */
    it('First negative Bool values. Default returned, empty list', () => {
      const defaultValue = false;
      const firstNegativeIsReturned = true;
      chai.expect(TimelineStyleUtils.getValue<boolean>(defaultValue, firstNegativeIsReturned)).equal(false);
    });
    it('First negative Bool values. Default returned, undefined values', () => {
      const defaultValue = false;
      const firstNegativeIsReturned = true;
      chai.expect(TimelineStyleUtils.getValue<boolean>(defaultValue, firstNegativeIsReturned, undefined, null)).equal(false);
    });
    it('First negative Bool values. Bool values. True as default is returned', () => {
      const defaultValue = true;
      const firstNegativeIsReturned = true;
      chai.expect(TimelineStyleUtils.getValue<boolean>(defaultValue, firstNegativeIsReturned, undefined, null)).equal(true);
    });
    it('First negative Bool values.Bool values. False is returned as first set, default ignored.', () => {
      const defaultValue = true;
      const firstNegativeIsReturned = true;
      chai.expect(TimelineStyleUtils.getValue<boolean>(defaultValue, firstNegativeIsReturned, true, false)).equal(false);
    });
    it('First negative Bool values.Bool values. False is returned as second set.', () => {
      const defaultValue = true;
      const firstNegativeIsReturned = true;
      chai.expect(TimelineStyleUtils.getValue<boolean>(defaultValue, firstNegativeIsReturned, false, true)).equal(false);
    });
    it('First negative Bool values. Default is ignored..', () => {
      const defaultValue = false;
      const firstNegativeIsReturned = true;
      const returnedValue = TimelineStyleUtils.getValue<boolean>(defaultValue, firstNegativeIsReturned, true, true);
      chai.expect(returnedValue).equal(true);
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
      chai.expect(keyframeDraggable).equal(true);
    });
    it('Keyframe is draggable', () => {
      const timelineOptions = {
        rowsStyle: {
          keyframesStyle: { shape: TimelineKeyframeShape.Rect },
        } as TimelineRowStyle,
      } as TimelineOptions;

      const keyframe = { draggable: true, style: { shape: TimelineKeyframeShape.Rect } } as TimelineKeyframe;
      chai.expect(TimelineStyleUtils.keyframeDraggable(keyframe, null, null, timelineOptions)).equal(true);
    });

    it('Keyframe is not draggable', () => {
      const timelineOptions = {
        rowsStyle: {
          keyframesStyle: { shape: TimelineKeyframeShape.Rect },
        } as TimelineRowStyle,
      } as TimelineOptions;

      const keyframe = { draggable: false, style: { shape: TimelineKeyframeShape.Rect } } as TimelineKeyframe;
      chai.expect(TimelineStyleUtils.keyframeDraggable(keyframe, null, null, timelineOptions)).equal(false);
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
      chai.expect(value).equal(false);
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
      chai.expect(isDraggable).equal(false);
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
      chai.expect(returnedValue).equal(true);
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
      chai.expect(isDraggable).equal(false);
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
      chai.expect(TimelineStyleUtils.groupDraggable(null, rowModel, timelineOptions)).equal(true);
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
      chai.expect(TimelineStyleUtils.groupDraggable(null, rowModel, timelineOptions)).equal(true);
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
      chai.expect(isDraggable).equal(false);
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
      chai.expect(value).equal(defaultGroupStyle.fillColor);
      chai.expect(TimelineStyleUtils.groupMarginTop(timelineOptions, keyframe.group, rowModel.style)).equal(defaultGroupStyle.marginTop);
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
      chai.expect(value).equal(groupOptionsStyle.fillColor);
      chai.expect(TimelineStyleUtils.groupMarginTop(timelineOptions, keyframe.group, rowModel.style)).equal(groupOptionsStyle.marginTop);
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
      chai.expect(value).equal(groupsRowStyle.fillColor);
      chai.expect(TimelineStyleUtils.groupMarginTop(timelineOptions, keyframe.group, rowModel.style)).equal(groupsRowStyle.marginTop);
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
      chai.expect(value).equal(keyframesGroupsStyle.fillColor);
      chai.expect(TimelineStyleUtils.groupMarginTop(timelineOptions, keyframe.group, rowModel.style)).equal(keyframesGroupsStyle.marginTop);
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
      chai.expect(TimelineStyleUtils.getRowHeight(rowsStyle, timelineOptions)).equal(rowsStyle.height);
    });
    it('Height is taken from global settings', () => {
      const timelineOptions = {
        rowsStyle: {
          height: 100,
          keyframesStyle: {},
        } as TimelineRowStyle,
      } as TimelineOptions;

      const rowsStyle = {} as TimelineRowStyle;
      chai.expect(TimelineStyleUtils.getRowHeight(rowsStyle, timelineOptions)).equal(timelineOptions.rowsStyle?.height);
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
      chai.expect(TimelineStyleUtils.getRowMarginBottom(rowsStyle, timelineOptions)).equal(timelineOptions.rowsStyle?.marginBottom);
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
      chai.expect(TimelineStyleUtils.getRowMarginBottom(rowsStyle, timelineOptions)).equal(rowsStyle.marginBottom);
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
      chai.expect(fillColor).equal(expectedStyle.fillColor);
      const keyframeHeight = TimelineStyleUtils.keyframeHeight(keyframe, group, rowStyle, options);
      chai.expect(keyframeHeight).equal(expectedStyle.height);
      const selectedFillColor = TimelineStyleUtils.keyframeSelectedFillColor(keyframe, group, rowStyle, options);
      chai.expect(selectedFillColor).equal(expectedStyle.selectedFillColor);
      const keyframeSelectedStrokeColor = TimelineStyleUtils.keyframeSelectedStrokeColor(keyframe, group || null, rowStyle, options);
      chai.expect(keyframeSelectedStrokeColor).equal(expectedStyle.selectedStrokeColor);
      const shape = TimelineStyleUtils.keyframeShape(keyframe, group, rowStyle, options);
      chai.expect(shape).equal(expectedStyle.shape);
      const keyframeStrokeColor = TimelineStyleUtils.keyframeStrokeColor(keyframe, group, rowStyle, options);
      chai.expect(keyframeStrokeColor).equal(expectedStyle.strokeColor);
      const keyframeStrokeThickness = TimelineStyleUtils.keyframeStrokeThickness(keyframe, group, rowStyle, options);
      chai.expect(keyframeStrokeThickness).equal(expectedStyle.strokeThickness);
      const keyframeWidth = TimelineStyleUtils.keyframeWidth(keyframe, group, rowStyle, options);
      chai.expect(keyframeWidth).equal(expectedStyle.width);
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
