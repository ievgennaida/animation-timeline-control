import { describe, expect, it } from '@jest/globals';
import { TimelineKeyframeStyle, TimelineOptions, TimelineRowStyle, TimelineUtils, defaultTimelineOptions } from '../src/animation-timeline';

describe('TimelineUtils.mergeOptions', () => {
  it('Top level options are merged', () => {
    const defOptions = defaultTimelineOptions as TimelineOptions;
    const options = { id: 'new id', snapStep: 10, snapEnabled: true } as TimelineOptions;
    const merged = TimelineUtils.mergeOptions(defOptions, options);
    expect(merged.id).toBe(options.id);
    expect(merged.snapEnabled).toBe(options.snapEnabled);
    expect(merged.snapStep).toBe(options.snapStep);
    expect(merged.labelsColor).toBe(defOptions.labelsColor);
    expect(merged.leftMargin).toBe(defOptions.leftMargin);
    expect(merged.selectionColor).toBe(defOptions.selectionColor);
    console.log('initial options should not be affected');
    expect(options.selectionColor === undefined).toBe(true);
  });
  it('HTML element no need to copy, value is reset.', () => {
    const defOptions = defaultTimelineOptions as TimelineOptions;
    const options = { id: window.document.childNodes[0] } as TimelineOptions;
    console.log('HTML element should exists for the test to be executed');
    expect(options.id).toBeTruthy();
    const merged = TimelineUtils.mergeOptions(defOptions, options);
    expect(merged.id).toBe(options.id);
  });
  it('HTML element can be replaced during the merge', () => {
    const defOptions = defaultTimelineOptions as TimelineOptions;
    let options = { id: window.document.childNodes[0] } as TimelineOptions;
    console.log('HTML element should exists for the test to be executed');
    expect(options.id).toBeTruthy();
    let merged = TimelineUtils.mergeOptions(defOptions, options);
    expect(merged.id).toBe(options.id);
    const selectedElement = window.document.childNodes[1];
    console.log('HTML element should exists for the test to be executed');
    expect(selectedElement).toBeTruthy();
    options = { id: selectedElement } as TimelineOptions;
    merged = TimelineUtils.mergeOptions(merged, options);
    expect(merged.id).toBe(selectedElement);

    options = { snapEnabled: true } as TimelineOptions;
    merged = TimelineUtils.mergeOptions(merged, options);
    expect(merged.id).toBe(selectedElement);
    expect(merged.snapEnabled).toBe(true);
  });
  it('Default styles are merged', () => {
    const options = { id: 'new id', snapStep: 10, snapEnabled: true } as TimelineOptions;
    const merged = TimelineUtils.mergeOptions(defaultTimelineOptions as TimelineOptions, options);
    expect(merged.id).toBe(options.id);
    console.log('Row style cannot be null');
    expect(!!merged.rowsStyle).toBe(true);
    console.log('Keyframes style cannot be null');
    expect(!!merged.rowsStyle?.keyframesStyle).toBe(true);
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
    expect(merged.id).toBe('new id');
    expect(merged.headerHeight).toBe(44);
    expect(merged.rowsStyle?.height).toBe(100);
    const defOptions = defaultTimelineOptions as TimelineOptions;
    expect(merged.rowsStyle?.keyframesStyle?.shape).toBe(defOptions.rowsStyle?.keyframesStyle?.shape);
  });
  it('Original options are not affected', () => {
    const options = {
      id: 'new id',
      snapStep: 10,
    } as TimelineOptions;
    const merged = TimelineUtils.mergeOptions(defaultTimelineOptions as TimelineOptions, options);
    expect(merged.id).toBe('new id');
    expect(merged.snapStep).toBe(10);
    expect(options.headerHeight === undefined).toBe(true);
  });
});
