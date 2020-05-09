/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  TimelineStyleUtils,
  TimelineKeyframeShape,
  TimelineOptions,
  TimelineRowStyle,
  Timeline,
  TimelineKeyframeStyle,
  TimelineElementType,
  TimelineClickableElement,
} from './../lib/animation-timeline';
import { assert } from './asserts';

describe('TimelineStyleUtils', function () {
  it('Keyframe is draggable by default', function () {
    const globalStyle = {
      rowsStyle: {
        keyframesStyle: {},
      } as TimelineRowStyle,
    } as TimelineOptions;

    const keyframeStyle = { shape: TimelineKeyframeShape.Rect } as TimelineKeyframeStyle;
    assert.equal(TimelineStyleUtils.keyframeDraggable(keyframeStyle, null, globalStyle), true);
  });
  it('Keyframe draggable', function () {
    const globalStyle = {
      rowsStyle: {
        keyframesStyle: {},
      } as TimelineRowStyle,
    } as TimelineOptions;

    const keyframeStyle = { draggable: true, shape: TimelineKeyframeShape.Rect } as TimelineKeyframeStyle;
    assert.equal(TimelineStyleUtils.keyframeDraggable(keyframeStyle, null, globalStyle), true);
  });

  it('Keyframe is not draggable', function () {
    const globalStyle = {
      rowsStyle: {
        keyframesStyle: {},
      } as TimelineRowStyle,
    } as TimelineOptions;

    const keyframeStyle = { draggable: false, shape: TimelineKeyframeShape.Rect } as TimelineKeyframeStyle;
    assert.equal(TimelineStyleUtils.keyframeDraggable(keyframeStyle, null, globalStyle), false);
  });

  it('Keyframe row is not draggable than keyframe is not draggable', function () {
    const globalStyle = {
      rowsStyle: {
        keyframesStyle: {},
      } as TimelineRowStyle,
    } as TimelineOptions;
    const rowStyle = { keyframesStyle: { draggable: false, shape: TimelineKeyframeShape.Rect } } as TimelineRowStyle;
    const keyframeStyle = { draggable: true, shape: TimelineKeyframeShape.Rect } as TimelineKeyframeStyle;
    assert.equal(TimelineStyleUtils.keyframeDraggable(keyframeStyle, rowStyle, globalStyle), false);
  });

  it('Keyframes are not draggable by general settings', function () {
    const globalStyle = {
      rowsStyle: {
        keyframesStyle: {
          draggable: false,
        },
      } as TimelineRowStyle,
    } as TimelineOptions;
    const rowStyle = { keyframesStyle: { draggable: true, shape: TimelineKeyframeShape.Rect } } as TimelineRowStyle;
    const keyframeStyle = { draggable: true, shape: TimelineKeyframeShape.Rect } as TimelineKeyframeStyle;
    assert.equal(TimelineStyleUtils.keyframeDraggable(keyframeStyle, rowStyle, globalStyle), false);
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
    assert.equal(TimelineStyleUtils.keyframeDraggable(keyframeStyle, rowStyle, globalStyle), false);
  });

  it('Stripe is draggable by default', function () {
    const globalStyle = {
      rowsStyle: {
        keyframesStyle: {
          draggable: true,
        },
      } as TimelineRowStyle,
    } as TimelineOptions;
    const rowStyle = { keyframesStyle: { draggable: true, shape: TimelineKeyframeShape.Rect } } as TimelineRowStyle;
    assert.equal(TimelineStyleUtils.stripeDraggable(rowStyle, globalStyle), true);
  });

  it('Stripe is not draggable by row settings', function () {
    const globalStyle = {
      rowsStyle: {
        keyframesStyle: {
          draggable: true,
        },
      } as TimelineRowStyle,
    } as TimelineOptions;
    const rowStyle = { stripeDraggable: false, keyframesStyle: { draggable: true, shape: TimelineKeyframeShape.Rect } } as TimelineRowStyle;
    assert.equal(TimelineStyleUtils.stripeDraggable(rowStyle, globalStyle), false);
  });

  it('Stripe is not draggable by global settings', function () {
    const globalStyle = {
      rowsStyle: {
        stripeDraggable: false,
        keyframesStyle: {
          draggable: true,
        },
      } as TimelineRowStyle,
    } as TimelineOptions;
    const rowStyle = { stripeDraggable: false, keyframesStyle: { draggable: true, shape: TimelineKeyframeShape.Rect } } as TimelineRowStyle;
    assert.equal(TimelineStyleUtils.stripeDraggable(rowStyle, globalStyle), false);
  });
});
