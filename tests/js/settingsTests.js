"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
var animation_timeline_1 = require("../lib/animation-timeline");
var asserts_1 = require("./asserts");
describe('_mergeOptions', function () {
    it('Top level options are merged', function () {
        var defOptions = animation_timeline_1.defaultTimelineOptions;
        var options = { id: 'new id', snapsPerSeconds: 10, snapEnabled: true };
        var merged = new animation_timeline_1.Timeline()._mergeOptions(options);
        asserts_1.assert.equal(merged.id, options.id);
        asserts_1.assert.equal(merged.snapEnabled, options.snapEnabled);
        asserts_1.assert.equal(merged.snapsPerSeconds, options.snapsPerSeconds);
        asserts_1.assert.equal(merged.labelsColor, defOptions.labelsColor);
        asserts_1.assert.equal(merged.leftMargin, defOptions.leftMargin);
        asserts_1.assert.equal(merged.selectionColor, defOptions.selectionColor);
        asserts_1.assert.equal(defOptions.selectionColor === undefined, 'initial options should not be affected');
    });
    it('Default styles are merged', function () {
        var defOptions = animation_timeline_1.defaultTimelineOptions;
        var options = { id: 'new id', snapsPerSeconds: 10, snapEnabled: true };
        var merged = new animation_timeline_1.Timeline()._mergeOptions(options);
        asserts_1.assert.equal(merged.id, options.id);
        asserts_1.assert.equal(!!merged.rowsStyle, true, 'Row style cannot be null');
        asserts_1.assert.equal(!!merged.rowsStyle.keyframesStyle, true, 'Keyframes style cannot be null');
    });
});
//# sourceMappingURL=settingsTests.js.map