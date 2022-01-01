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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3NUZXN0cy50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc2V0dGluZ3NUZXN0cy50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdURBQXVEO0FBQ3ZELGdFQUF1STtBQUV2SSxRQUFRLENBQUMsZUFBZSxFQUFFO0lBQ3hCLEVBQUUsQ0FBQyw4QkFBOEIsRUFBRTtRQUNqQyxJQUFNLFFBQVEsR0FBRyxJQUFJLDZCQUFRLEVBQUUsQ0FBQztRQUNoQyxJQUFNLFVBQVUsR0FBRywyQ0FBeUMsQ0FBQztRQUM3RCxJQUFNLE9BQU8sR0FBRyxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFxQixDQUFDO1FBQ3JGLElBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FB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