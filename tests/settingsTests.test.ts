/* eslint-disable @typescript-eslint/no-explicit-any */
import { TimelineRowStyle, TimelineOptions, defaultTimelineOptions, TimelineKeyframeStyle, TimelineUtils } from '../lib/animation-timeline';

describe('TimelineUtils.mergeOptions', () => {
  it('Top level options are merged', () => {
    const defOptions = defaultTimelineOptions as TimelineOptions;
    const options = { id: 'new id', snapStep: 10, snapEnabled: true } as TimelineOptions;
    const merged = TimelineUtils.mergeOptions(defOptions, options);
    chai.expect(merged.id).equal(options.id);
    chai.expect(merged.snapEnabled).equal(options.snapEnabled);
    chai.expect(merged.snapStep).equal(options.snapStep);
    chai.expect(merged.labelsColor).equal(defOptions.labelsColor);
    chai.expect(merged.leftMargin).equal(defOptions.leftMargin);
    chai.expect(merged.selectionColor).equal(defOptions.selectionColor);

    chai.expect(options.selectionColor === undefined).equal(true, 'initial options should not be affected');
  });
  it('HTML element no need to copy, value is reset.', () => {
    const defOptions = defaultTimelineOptions as TimelineOptions;
    const options = { id: window.document.childNodes[0] } as TimelineOptions;
    chai.assert(options.id, 'HTML element should exists for the test to be executed');
    const merged = TimelineUtils.mergeOptions(defOptions, options);
    chai.expect(merged.id).equal(options.id);
  });
  it('HTML element can be replaced during the merge', () => {
    const defOptions = defaultTimelineOptions as TimelineOptions;
    let options = { id: window.document.childNodes[0] } as TimelineOptions;
    chai.assert(options.id, 'HTML element should exists for the test to be executed');
    let merged = TimelineUtils.mergeOptions(defOptions, options);
    chai.expect(merged.id).equal(options.id);
    const selectedElement = window.document.childNodes[1];
    chai.assert(selectedElement, 'HTML element should exists for the test to be executed');
    options = { id: selectedElement } as TimelineOptions;
    merged = TimelineUtils.mergeOptions(merged, options);
    chai.expect(merged.id).equal(selectedElement);

    options = { snapEnabled: true } as TimelineOptions;
    merged = TimelineUtils.mergeOptions(merged, options);
    chai.expect(merged.id).equal(selectedElement);
    chai.expect(merged.snapEnabled).equal(true);
  });
  it('Default styles are merged', () => {
    const options = { id: 'new id', snapStep: 10, snapEnabled: true } as TimelineOptions;
    const merged = TimelineUtils.mergeOptions(defaultTimelineOptions as TimelineOptions, options);
    chai.expect(merged.id).equal(options.id);
    chai.expect(!!merged.rowsStyle).equal(true, 'Row style cannot be null');
    chai.expect(!!merged.rowsStyle?.keyframesStyle).equal(true, 'Keyframes style cannot be null');
  });

  it('Deep styles are merged', () => {
    const options = {
      id: 'new id',
      snapStep: 10,
      headerHeight: 44,
      snapEnabled: true,
      rowsStyle: {
        height: 100,
        keyframesStyle: {
          hidden: true,
          draggable: false,
        } as TimelineKeyframeStyle,
      } as TimelineRowStyle,
    } as TimelineOptions;
    const merged = TimelineUtils.mergeOptions(defaultTimelineOptions as TimelineOptions, options);
    chai.expect(merged.id).equal('new id');
    chai.expect(merged.headerHeight).equal(44);
    chai.expect(merged.rowsStyle?.height).equal(100);
    const defOptions = defaultTimelineOptions as TimelineOptions;
    chai.expect(merged.rowsStyle?.keyframesStyle?.shape, defOptions.rowsStyle?.keyframesStyle?.shape);
  });
  it('Original options are not affected', () => {
    const options = {
      id: 'new id',
      snapStep: 10,
    } as TimelineOptions;
    const merged = TimelineUtils.mergeOptions(defaultTimelineOptions as TimelineOptions, options);
    chai.expect(merged.id, 'new id');
    chai.expect(merged.snapStep).equal(10);
    chai.expect(options.headerHeight === undefined).equal(true);
  });
});
