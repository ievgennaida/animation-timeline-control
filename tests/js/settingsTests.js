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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3NUZXN0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NldHRpbmdzVGVzdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1REFBdUQ7QUFDdkQsZ0VBQXVJO0FBRXZJLFFBQVEsQ0FBQyxlQUFlLEVBQUU7SUFDeEIsRUFBRSxDQUFDLDhCQUE4QixFQUFFO1FBQ2pDLElBQU0sUUFBUSxHQUFHLElBQUksNkJBQVEsRUFBRSxDQUFDO1FBQ2hDLElBQU0sVUFBVSxHQUFHLDJDQUF5QyxDQUFDO1FBQzdELElBQU0sT0FBTyxHQUFHLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQXFCLENBQUM7UUFDckYsSUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsS0FB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