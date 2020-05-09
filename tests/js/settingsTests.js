"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
var animation_timeline_1 = require("../lib/animation-timeline");
var asserts_1 = require("./asserts");
describe('_mergeOptions', function () {
    it('Top level options are merged', function () {
        var timeline = new animation_timeline_1.Timeline();
        var defOptions = animation_timeline_1.defaultTimelineOptions;
        var options = { id: 'new id', snapsPerSeconds: 10, snapEnabled: true };
        var merged = timeline._mergeOptions(options);
        asserts_1.assert.equal(merged.id, options.id);
        asserts_1.assert.equal(merged.snapEnabled, options.snapEnabled);
        asserts_1.assert.equal(merged.snapsPerSeconds, options.snapsPerSeconds);
        asserts_1.assert.equal(merged.labelsColor, defOptions.labelsColor);
        asserts_1.assert.equal(merged.leftMargin, defOptions.leftMargin);
        asserts_1.assert.equal(merged.selectionColor, defOptions.selectionColor);
        asserts_1.assert.equal(defOptions.selectionColor === undefined, 'initial options should not be affected');
    });
    it('Default styles are merged', function () {
        var timeline = new animation_timeline_1.Timeline();
        var options = { id: 'new id', snapsPerSeconds: 10, snapEnabled: true };
        var merged = timeline._mergeOptions(options);
        asserts_1.assert.equal(merged.id, options.id);
        asserts_1.assert.equal(!!merged.rowsStyle, true, 'Row style cannot be null');
        asserts_1.assert.equal(!!merged.rowsStyle.keyframesStyle, true, 'Keyframes style cannot be null');
    });
    it('Deep styles are merged', function () {
        var timeline = new animation_timeline_1.Timeline();
        var options = {
            id: 'new id',
            snapsPerSeconds: 10,
            headerHeight: 44,
            snapEnabled: true,
            rowsStyle: {
                height: 100,
                keyframesStyle: {
                    hidden: true,
                    draggable: false,
                },
            },
        };
        var merged = timeline._mergeOptions(options);
        asserts_1.assert.equal(merged.id, 'new id');
        asserts_1.assert.equal(merged.headerHeight, 44);
        asserts_1.assert.equal(merged.rowsStyle.height, 100);
        asserts_1.assert.equal(merged.rowsStyle.keyframesStyle.hidden, true);
        asserts_1.assert.equal(merged.rowsStyle.keyframesStyle.draggable, false);
        var defOptions = animation_timeline_1.defaultTimelineOptions;
        asserts_1.assert.equal(merged.rowsStyle.keyframesStyle.shape, defOptions.rowsStyle.keyframesStyle.shape);
    });
    it('Original options are not affected', function () {
        var timeline = new animation_timeline_1.Timeline();
        var options = {
            id: 'new id',
            snapsPerSeconds: 10,
        };
        var merged = timeline._mergeOptions(options);
        asserts_1.assert.equal(merged.id, 'new id');
        asserts_1.assert.equal(merged.snapsPerSeconds, 10);
        asserts_1.assert.equal(options.headerHeight === undefined, true);
    });
});
//# sourceMappingURL=settingsTests.js.map