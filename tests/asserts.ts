/* eslint-disable @typescript-eslint/no-explicit-any */
export const assert = {
  equal: (value: any, expected: any, message: string | null = null): void => {
    if (expected !== value) {
      if (!message) {
        message = 'AssertionError:';
      }
      new Error(message + ' Expected: ' + expected + ' Result:' + value);
    }
  },
};
