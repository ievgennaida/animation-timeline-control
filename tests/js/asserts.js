"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
exports.assert = {
    equal: function (value, expected, message) {
        if (message === void 0) { message = null; }
        if (expected !== value) {
            if (!message) {
                message = 'AssertionError:';
            }
            throw new Error(message + ' Expected: ' + expected + ' Result:' + value);
        }
    },
};
//# sourceMappingURL=asserts.js.map