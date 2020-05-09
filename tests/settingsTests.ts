/* eslint-disable @typescript-eslint/no-explicit-any */
import { Timeline, TimelineElementType, TimelineRowStyle, TimelineClickableElement, TimelineOptions, defaultTimelineOptions, TimelineKeyframeStyle } from '../lib/animation-timeline';
import { assert } from './asserts';
describe('_mergeOptions', function () {
  it('Top level options are merged', function () {
    const timeline = new Timeline();
    const defOptions = defaultTimelineOptions as TimelineOptions;
    const options = { id: 'new id', snapsPerSeconds: 10, snapEnabled: true } as TimelineOptions;
    const merged = timeline._mergeOptions(options);
    assert.equal(merged.id, options.id);
    assert.equal(merged.snapEnabled, options.snapEnabled);
    assert.equal(merged.snapsPerSeconds, options.snapsPerSeconds);
    assert.equal(merged.labelsColor, defOptions.labelsColor);
    assert.equal(merged.leftMargin, defOptions.leftMargin);
    assert.equal(merged.selectionColor, defOptions.selectionColor);

    assert.equal(defOptions.selectionColor === undefined, 'initial options should not be affected');
  });

  it('Default styles are merged', function () {
    const timeline = new Timeline();
    const options = { id: 'new id', snapsPerSeconds: 10, snapEnabled: true } as TimelineOptions;
    const merged = timeline._mergeOptions(options);
    assert.equal(merged.id, options.id);
    assert.equal(!!merged.rowsStyle, true, 'Row style cannot be null');
    assert.equal(!!merged.rowsStyle.keyframesStyle, true, 'Keyframes style cannot be null');
  });

  it('Deep styles are merged', function () {
    const timeline = new Timeline();
    const options = {
      id: 'new id',
      snapsPerSeconds: 10,
      snapEnabled: true,
      rowsStyle: {
        height: 100,
        keyframesStyle: {
          hidden: true,
          draggable: false,
        } as TimelineKeyframeStyle,
      } as TimelineRowStyle,
    } as TimelineOptions;
    const merged = timeline._mergeOptions(options);
    assert.equal(merged.id, options.id);
    assert.equal(merged.rowsStyle.height, options.rowsStyle.height);
    assert.equal(merged.rowsStyle.keyframesStyle.hidden, options.rowsStyle.hidden);
    assert.equal(merged.rowsStyle.keyframesStyle.draggable, options.rowsStyle.keyframesStyle.draggable);
    const defOptions = defaultTimelineOptions as TimelineOptions;
    assert.equal(merged.rowsStyle.keyframesStyle.shape, defOptions.rowsStyle.keyframesStyle.shape);
  });
});
