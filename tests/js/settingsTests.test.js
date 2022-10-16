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
        var _a;
        var timeline = new animation_timeline_1.Timeline();
        var options = { id: 'new id', snapStep: 10, snapEnabled: true };
        var merged = timeline._mergeOptions(options);
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
        var merged = timeline._mergeOptions(options);
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
        var merged = timeline._mergeOptions(options);
        chai.expect(merged.id, 'new id');
        chai.expect(merged.snapStep).equal(10);
        chai.expect(options.headerHeight === undefined).equal(true);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3NUZXN0cy50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc2V0dGluZ3NUZXN0cy50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdURBQXVEO0FBQ3ZELGdFQUF1STtBQUV2SSxRQUFRLENBQUMsZUFBZSxFQUFFO0lBQ3hCLEVBQUUsQ0FBQyw4QkFBOEIsRUFBRTtRQUNqQyxJQUFNLFFBQVEsR0FBRyxJQUFJLDZCQUFRLEVBQUUsQ0FBQztRQUNoQyxJQUFNLFVBQVUsR0FBRywyQ0FBeUMsQ0FBQztRQUM3RCxJQUFNLE9BQU8sR0FBRyxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFxQixDQUFDO1FBQ3JGLElBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FB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