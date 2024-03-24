"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
var animation_timeline_1 = require("../lib/animation-timeline");
describe('TimelineUtils.mergeOptions', function () {
    it('Top level options are merged', function () {
        var defOptions = animation_timeline_1.defaultTimelineOptions;
        var options = { id: 'new id', snapStep: 10, snapEnabled: true };
        var merged = animation_timeline_1.TimelineUtils.mergeOptions(defOptions, options);
        chai.expect(merged.id).equal(options.id);
        chai.expect(merged.snapEnabled).equal(options.snapEnabled);
        chai.expect(merged.snapStep).equal(options.snapStep);
        chai.expect(merged.labelsColor).equal(defOptions.labelsColor);
        chai.expect(merged.leftMargin).equal(defOptions.leftMargin);
        chai.expect(merged.selectionColor).equal(defOptions.selectionColor);
        chai.expect(options.selectionColor === undefined).equal(true, 'initial options should not be affected');
    });
    it('HTML element no need to copy, value is reset.', function () {
        var defOptions = animation_timeline_1.defaultTimelineOptions;
        var options = { id: window.document.childNodes[0] };
        chai.assert(options.id, 'HTML element should exists for the test to be executed');
        var merged = animation_timeline_1.TimelineUtils.mergeOptions(defOptions, options);
        chai.expect(merged.id).equal(options.id);
    });
    it('HTML element can be replaced during the merge', function () {
        var defOptions = animation_timeline_1.defaultTimelineOptions;
        var options = { id: window.document.childNodes[0] };
        chai.assert(options.id, 'HTML element should exists for the test to be executed');
        var merged = animation_timeline_1.TimelineUtils.mergeOptions(defOptions, options);
        chai.expect(merged.id).equal(options.id);
        var selectedElement = window.document.childNodes[1];
        chai.assert(selectedElement, 'HTML element should exists for the test to be executed');
        options = { id: selectedElement };
        merged = animation_timeline_1.TimelineUtils.mergeOptions(merged, options);
        chai.expect(merged.id).equal(selectedElement);
        options = { snapEnabled: true };
        merged = animation_timeline_1.TimelineUtils.mergeOptions(merged, options);
        chai.expect(merged.id).equal(selectedElement);
        chai.expect(merged.snapEnabled).equal(true);
    });
    it('Default styles are merged', function () {
        var _a;
        var options = { id: 'new id', snapStep: 10, snapEnabled: true };
        var merged = animation_timeline_1.TimelineUtils.mergeOptions(animation_timeline_1.defaultTimelineOptions, options);
        chai.expect(merged.id).equal(options.id);
        chai.expect(!!merged.rowsStyle).equal(true, 'Row style cannot be null');
        chai.expect(!!((_a = merged.rowsStyle) === null || _a === void 0 ? void 0 : _a.keyframesStyle)).equal(true, 'Keyframes style cannot be null');
    });
    it('Deep styles are merged', function () {
        var _a, _b, _c, _d, _e;
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
        var merged = animation_timeline_1.TimelineUtils.mergeOptions(animation_timeline_1.defaultTimelineOptions, options);
        chai.expect(merged.id).equal('new id');
        chai.expect(merged.headerHeight).equal(44);
        chai.expect((_a = merged.rowsStyle) === null || _a === void 0 ? void 0 : _a.height).equal(100);
        var defOptions = animation_timeline_1.defaultTimelineOptions;
        chai.expect((_c = (_b = merged.rowsStyle) === null || _b === void 0 ? void 0 : _b.keyframesStyle) === null || _c === void 0 ? void 0 : _c.shape, (_e = (_d = defOptions.rowsStyle) === null || _d === void 0 ? void 0 : _d.keyframesStyle) === null || _e === void 0 ? void 0 : _e.shape);
    });
    it('Original options are not affected', function () {
        var options = {
            id: 'new id',
            snapStep: 10,
        };
        var merged = animation_timeline_1.TimelineUtils.mergeOptions(animation_timeline_1.defaultTimelineOptions, options);
        chai.expect(merged.id, 'new id');
        chai.expect(merged.snapStep).equal(10);
        chai.expect(options.headerHeight === undefined).equal(true);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3NUZXN0cy50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vdGVzdHMvc2V0dGluZ3NUZXN0cy50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdURBQXVEO0FBQ3ZELGdFQUE0STtBQUU1SSxRQUFRLENBQUMsNEJBQTRCLEVBQUU7SUFDckMsRUFBRSxDQUFDLDhCQUE4QixFQUFFO1FBQ2pDLElBQU0sVUFBVSxHQUFHLDJDQUF5QyxDQUFDO1FBQzdELElBQU0sT0FBTyxHQUFHLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQXFCLENBQUM7UUFDckYsSUFBTSxNQUFNLEdBQUcsa0NBQWEsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFB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