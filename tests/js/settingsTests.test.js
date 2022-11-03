"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
var animation_timeline_1 = require("../lib/animation-timeline");
describe('_mergeOptions', function () {
    it('Top level options are merged', function () {
        var timeline = new animation_timeline_1.Timeline();
        var defOptions = animation_timeline_1.defaultTimelineOptions;
        var options = { id: 'new id', snapStep: 10, snapEnabled: true };
        var merged = timeline._mergeOptions(defOptions, options);
        chai.expect(merged.id).equal(options.id);
        chai.expect(merged.snapEnabled).equal(options.snapEnabled);
        chai.expect(merged.snapStep).equal(options.snapStep);
        chai.expect(merged.labelsColor).equal(defOptions.labelsColor);
        chai.expect(merged.leftMargin).equal(defOptions.leftMargin);
        chai.expect(merged.selectionColor).equal(defOptions.selectionColor);
        chai.expect(options.selectionColor === undefined).equal(true, 'initial options should not be affected');
    });
    it('Default styles are merged', function () {
        var _a;
        var timeline = new animation_timeline_1.Timeline();
        var options = { id: 'new id', snapStep: 10, snapEnabled: true };
        var merged = timeline._mergeOptions(animation_timeline_1.defaultTimelineOptions, options);
        chai.expect(merged.id).equal(options.id);
        chai.expect(!!merged.rowsStyle).equal(true, 'Row style cannot be null');
        chai.expect(!!((_a = merged.rowsStyle) === null || _a === void 0 ? void 0 : _a.keyframesStyle)).equal(true, 'Keyframes style cannot be null');
    });
    it('Deep styles are merged', function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
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
        var merged = timeline._mergeOptions(animation_timeline_1.defaultTimelineOptions, options);
        chai.expect(merged.id).equal('new id');
        chai.expect(merged.headerHeight).equal(44);
        chai.expect((_a = merged.rowsStyle) === null || _a === void 0 ? void 0 : _a.height).equal(100);
        chai.expect((_c = (_b = merged.rowsStyle) === null || _b === void 0 ? void 0 : _b.keyframesStyle) === null || _c === void 0 ? void 0 : _c.hidden).equal(true);
        chai.expect((_e = (_d = merged.rowsStyle) === null || _d === void 0 ? void 0 : _d.keyframesStyle) === null || _e === void 0 ? void 0 : _e.draggable).equal(false);
        var defOptions = animation_timeline_1.defaultTimelineOptions;
        chai.expect((_g = (_f = merged.rowsStyle) === null || _f === void 0 ? void 0 : _f.keyframesStyle) === null || _g === void 0 ? void 0 : _g.shape, (_j = (_h = defOptions.rowsStyle) === null || _h === void 0 ? void 0 : _h.keyframesStyle) === null || _j === void 0 ? void 0 : _j.shape);
    });
    it('Original options are not affected', function () {
        var timeline = new animation_timeline_1.Timeline();
        var options = {
            id: 'new id',
            snapStep: 10,
        };
        var merged = timeline._mergeOptions(animation_timeline_1.defaultTimelineOptions, options);
        chai.expect(merged.id, 'new id');
        chai.expect(merged.snapStep).equal(10);
        chai.expect(options.headerHeight === undefined).equal(true);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3NUZXN0cy50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc2V0dGluZ3NUZXN0cy50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdURBQXVEO0FBQ3ZELGdFQUF1STtBQUV2SSxRQUFRLENBQUMsZUFBZSxFQUFFO0lBQ3hCLEVBQUUsQ0FBQyw4QkFBOEIsRUFBRTtRQUNqQyxJQUFNLFFBQVEsR0FBRyxJQUFJLDZCQUFRLEVBQUUsQ0FBQztRQUNoQyxJQUFNLFVBQVUsR0FBRywyQ0FBeUMsQ0FBQztRQUM3RCxJQUFNLE9BQU8sR0FBRyxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFxQixDQUFDO1FBQ3JGLElBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FB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