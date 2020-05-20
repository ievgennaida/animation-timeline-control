"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
var animation_timeline_1 = require("../lib/animation-timeline");
describe('_mergeOptions', function () {
    it('Top level options are merged', function () {
        var timeline = new animation_timeline_1.Timeline();
        var defOptions = animation_timeline_1.defaultTimelineOptions;
        var options = { id: 'new id', snapStep: 10, snapEnabled: true };
        var merged = timeline._mergeOptions(options);
        chai.expect(merged.id).equal(options.id);
        chai.expect(merged.snapEnabled).equal(options.snapEnabled);
        chai.expect(merged.snapStep).equal(options.snapStep);
        chai.expect(merged.labelsColor).equal(defOptions.labelsColor);
        chai.expect(merged.leftMargin).equal(defOptions.leftMargin);
        chai.expect(merged.selectionColor).equal(defOptions.selectionColor);
        chai.expect(options.selectionColor === undefined).equal(true, 'initial options should not be affected');
    });
    it('Default styles are merged', function () {
        var timeline = new animation_timeline_1.Timeline();
        var options = { id: 'new id', snapStep: 10, snapEnabled: true };
        var merged = timeline._mergeOptions(options);
        chai.expect(merged.id).equal(options.id);
        chai.expect(!!merged.rowsStyle).equal(true, 'Row style cannot be null');
        chai.expect(!!merged.rowsStyle.keyframesStyle).equal(true, 'Keyframes style cannot be null');
    });
    it('Deep styles are merged', function () {
        var timeline = new animation_timeline_1.Timeline();
        var options = {
            id: 'new id',
            snapStep: 10,
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
        chai.expect(merged.id).equal('new id');
        chai.expect(merged.headerHeight).equal(44);
        chai.expect(merged.rowsStyle.height).equal(100);
        chai.expect(merged.rowsStyle.keyframesStyle.hidden).equal(true);
        chai.expect(merged.rowsStyle.keyframesStyle.draggable).equal(false);
        var defOptions = animation_timeline_1.defaultTimelineOptions;
        chai.expect(merged.rowsStyle.keyframesStyle.shape, defOptions.rowsStyle.keyframesStyle.shape);
    });
    it('Original options are not affected', function () {
        var timeline = new animation_timeline_1.Timeline();
        var options = {
            id: 'new id',
            snapStep: 10,
        };
        var merged = timeline._mergeOptions(options);
        chai.expect(merged.id, 'new id');
        chai.expect(merged.snapStep).equal(10);
        chai.expect(options.headerHeight === undefined).equal(true);
    });
});
//# sourceMappingURL=settingsTests.js.map