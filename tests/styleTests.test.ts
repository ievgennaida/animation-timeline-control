/* eslint-disable @typescript-eslint/no-explicit-any */
import { TimelineStyleUtils, TimelineKeyframeShape, TimelineOptions, TimelineRowStyle, TimelineKeyframeStyle } from './../lib/animation-timeline';

describe('TimelineStyleUtils', function () {
  describe('Draggable', function () {
    it('Keyframe is draggable by default', function () {
      const globalStyle = {
        rowsStyle: {
          keyframesStyle: {},
        } as TimelineRowStyle,
      } as TimelineOptions;

      const keyframeStyle = { shape: TimelineKeyframeShape.Rect } as TimelineKeyframeStyle;
      chai.expect(TimelineStyleUtils.keyframeDraggable(keyframeStyle, null, globalStyle)).equal(true);
    });
    it('Keyframe is draggable', function () {
      const globalStyle = {
        rowsStyle: {
          keyframesStyle: {},
        } as TimelineRowStyle,
      } as TimelineOptions;

      const keyframeStyle = { draggable: true, shape: TimelineKeyframeShape.Rect } as TimelineKeyframeStyle;
      chai.expect(TimelineStyleUtils.keyframeDraggable(keyframeStyle, null, globalStyle)).equal(true);
    });

    it('Keyframe is not draggable', function () {
      const globalStyle = {
        rowsStyle: {
          keyframesStyle: {},
        } as TimelineRowStyle,
      } as TimelineOptions;

      const keyframeStyle = { draggable: false, shape: TimelineKeyframeShape.Rect } as TimelineKeyframeStyle;
      chai.expect(TimelineStyleUtils.keyframeDraggable(keyframeStyle, null, globalStyle)).equal(false);
    });

    it('Keyframe is draggable override row', function () {
      const globalStyle = {
        rowsStyle: {
          keyframesStyle: {},
        } as TimelineRowStyle,
      } as TimelineOptions;
      const rowStyle = { keyframesStyle: { draggable: false, shape: TimelineKeyframeShape.Rect } } as TimelineRowStyle;
      const keyframeStyle = { draggable: true, shape: TimelineKeyframeShape.Rect } as TimelineKeyframeStyle;
      const value = TimelineStyleUtils.keyframeDraggable(keyframeStyle, rowStyle, globalStyle);
      chai.expect(value).equal(true);
    });

    it('Keyframes are not draggable by row settings', function () {
      const globalStyle = {
        rowsStyle: {
          keyframesStyle: {
            draggable: true,
          },
        } as TimelineRowStyle,
      } as TimelineOptions;
      const rowStyle = { keyframesStyle: { draggable: false, shape: TimelineKeyframeShape.Rect } } as TimelineRowStyle;
      const keyframeStyle = { shape: TimelineKeyframeShape.Rect } as TimelineKeyframeStyle;
      chai.expect(TimelineStyleUtils.keyframeDraggable(keyframeStyle, rowStyle, globalStyle)).equal(false);
    });
    it('Keyframes are draggable', function () {
      const globalStyle = {
        rowsStyle: {
          keyframesStyle: {
            draggable: true,
          },
        } as TimelineRowStyle,
      } as TimelineOptions;
      const rowStyle = { keyframesStyle: { draggable: true, shape: TimelineKeyframeShape.Rect } } as TimelineRowStyle;
      const keyframeStyle = { draggable: true, shape: TimelineKeyframeShape.Rect } as TimelineKeyframeStyle;
      chai.expect(TimelineStyleUtils.keyframeDraggable(keyframeStyle, rowStyle, globalStyle)).equal(true);
    });
    it('Keyframes are draggable', function () {
      const globalStyle = {
        rowsStyle: {
          keyframesStyle: {
            draggable: false,
          },
        } as TimelineRowStyle,
      } as TimelineOptions;
      const rowStyle = { keyframesStyle: { draggable: false, shape: TimelineKeyframeShape.Rect } } as TimelineRowStyle;
      const keyframeStyle = { draggable: true, shape: TimelineKeyframeShape.Rect } as TimelineKeyframeStyle;
      chai.expect(TimelineStyleUtils.keyframeDraggable(keyframeStyle, rowStyle, globalStyle)).equal(true);
    });
    it('Groups are draggable by default', function () {
      const globalStyle = {
        rowsStyle: {
          keyframesStyle: {
            draggable: true,
          },
        } as TimelineRowStyle,
      } as TimelineOptions;
      const rowStyle = { keyframesStyle: { draggable: true, shape: TimelineKeyframeShape.Rect } } as TimelineRowStyle;
      chai.expect(TimelineStyleUtils.groupDraggable(rowStyle, globalStyle)).equal(true);
    });

    it('Group is draggable', function () {
      const globalStyle = {
        rowsStyle: {
          keyframesStyle: {
            draggable: false,
          },
        } as TimelineRowStyle,
      } as TimelineOptions;
      const rowStyle = { groupDraggable: true, keyframesStyle: { draggable: true, shape: TimelineKeyframeShape.Rect } } as TimelineRowStyle;
      chai.expect(TimelineStyleUtils.groupDraggable(rowStyle, globalStyle)).equal(true);
    });

    it('Group is not draggable by row settings', function () {
      const globalStyle = {
        rowsStyle: {
          groupDraggable: true,
          keyframesStyle: {
            draggable: true,
          },
        } as TimelineRowStyle,
      } as TimelineOptions;
      const rowStyle = { groupDraggable: false, keyframesStyle: { draggable: true, shape: TimelineKeyframeShape.Rect } } as TimelineRowStyle;
      chai.expect(TimelineStyleUtils.groupDraggable(rowStyle, globalStyle)).equal(false);
    });
  });
  describe('Row size', function () {
    it('Height is taken from row', function () {
      const globalStyle = {
        rowsStyle: {
          height: 100,
          keyframesStyle: {},
        } as TimelineRowStyle,
      } as TimelineOptions;

      const rowsStyle = { height: 50 } as TimelineRowStyle;
      chai.expect(TimelineStyleUtils.getRowHeight(rowsStyle, globalStyle)).equal(rowsStyle.height);
    });
    it('Height is taken from global settings', function () {
      const globalStyle = {
        rowsStyle: {
          height: 100,
          keyframesStyle: {},
        } as TimelineRowStyle,
      } as TimelineOptions;

      const rowsStyle = {} as TimelineRowStyle;
      chai.expect(TimelineStyleUtils.getRowHeight(rowsStyle, globalStyle)).equal(globalStyle.rowsStyle.height);
    });
    it('Margin bottom is taken from global settings', function () {
      const globalStyle = {
        rowsStyle: {
          height: 100,
          marginBottom: 30,
          keyframesStyle: {},
        } as TimelineRowStyle,
      } as TimelineOptions;

      const rowsStyle = {} as TimelineRowStyle;
      chai.expect(TimelineStyleUtils.getRowMarginBottom(rowsStyle, globalStyle)).equal(globalStyle.rowsStyle.marginBottom);
    });
    it('Margin bottom is taken from row settings', function () {
      const globalStyle = {
        rowsStyle: {
          height: 100,
          marginBottom: 30,
          keyframesStyle: {},
        } as TimelineRowStyle,
      } as TimelineOptions;

      const rowsStyle = { marginBottom: 43 } as TimelineRowStyle;
      chai.expect(TimelineStyleUtils.getRowMarginBottom(rowsStyle, globalStyle)).equal(rowsStyle.marginBottom);
    });
  });
});
