(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["timelineModule"] = factory();
	else
		root["timelineModule"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Timeline: () => (/* reexport */ Timeline),
  TimelineCapShape: () => (/* reexport */ TimelineCapShape),
  TimelineClickEvent: () => (/* reexport */ TimelineClickEvent),
  TimelineCursorType: () => (/* reexport */ TimelineCursorType),
  TimelineDragEvent: () => (/* reexport */ TimelineDragEvent),
  TimelineDraggableData: () => (/* reexport */ TimelineDraggableData),
  TimelineElementType: () => (/* reexport */ TimelineElementType),
  TimelineEventSource: () => (/* reexport */ TimelineEventSource),
  TimelineEvents: () => (/* reexport */ TimelineEvents),
  TimelineEventsEmitter: () => (/* reexport */ TimelineEventsEmitter),
  TimelineInteractionMode: () => (/* reexport */ TimelineInteractionMode),
  TimelineKeyframeChangedEvent: () => (/* reexport */ TimelineKeyframeChangedEvent),
  TimelineKeyframeShape: () => (/* reexport */ TimelineKeyframeShape),
  TimelineScrollSource: () => (/* reexport */ TimelineScrollSource),
  TimelineSelectedEvent: () => (/* reexport */ TimelineSelectedEvent),
  TimelineSelectionMode: () => (/* reexport */ TimelineSelectionMode),
  TimelineStyleUtils: () => (/* reexport */ TimelineStyleUtils),
  TimelineTimeChangedEvent: () => (/* reexport */ TimelineTimeChangedEvent),
  TimelineUtils: () => (/* reexport */ TimelineUtils),
  defaultGroupStyle: () => (/* reexport */ defaultGroupStyle),
  defaultRowHeight: () => (/* reexport */ defaultRowHeight),
  defaultTimelineConsts: () => (/* reexport */ defaultTimelineConsts),
  defaultTimelineKeyframeStyle: () => (/* reexport */ defaultTimelineKeyframeStyle),
  defaultTimelineOptions: () => (/* reexport */ defaultTimelineOptions),
  defaultTimelineRowStyle: () => (/* reexport */ defaultTimelineRowStyle),
  defaultTimelineStyle: () => (/* reexport */ defaultTimelineStyle)
});

;// CONCATENATED MODULE: ./src/timelineEventsEmitter.ts
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* eslint-disable  @typescript-eslint/no-explicit-any */

/**
 * Timeline events emitter.
 */
var TimelineEventsEmitter = /*#__PURE__*/function () {
  function TimelineEventsEmitter() {
    _classCallCheck(this, TimelineEventsEmitter);
    /**
     * Active events subscriptions.
     */
    _defineProperty(this, "_subscriptions", []);
  }
  return _createClass(TimelineEventsEmitter, [{
    key: "on",
    value:
    /**
     * Subscribe event.
     * @param topic event name.
     * @param callback callback to be added.
     */
    function on(topic, callback) {
      if (!callback) {
        return false;
      }
      this._subscriptions.push({
        topic: topic,
        callback: callback
      });
      return true;
    }
    /**
     * Remove an event from the subscriptions list.
     */
  }, {
    key: "off",
    value: function off(topic, callback) {
      var before = this._subscriptions.length;
      this._subscriptions = this._subscriptions.filter(function (event) {
        return event && event.callback != callback && event.topic != topic;
      });
      return before !== this._subscriptions.length;
    }

    /**
     * Unsubscribe all
     */
  }, {
    key: "offAll",
    value: function offAll() {
      // Remove all callbacks from array.
      this._subscriptions.length = 0;
    }

    /**
     * Emit event.
     * @param topic Event name.
     * @param args Event arguments.
     */
  }, {
    key: "emit",
    value: function emit(topic, args) {
      this._subscriptions.forEach(function (event) {
        if ((event === null || event === void 0 ? void 0 : event.topic) === topic && event !== null && event !== void 0 && event.callback) {
          event.callback(args);
        }
      });
    }
  }]);
}();
;// CONCATENATED MODULE: ./src/enums/timelineKeyframeShape.ts
var TimelineKeyframeShape = /*#__PURE__*/function (TimelineKeyframeShape) {
  TimelineKeyframeShape["None"] = "none";
  TimelineKeyframeShape["Rhomb"] = "rhomb";
  TimelineKeyframeShape["Circle"] = "circle";
  TimelineKeyframeShape["Rect"] = "rect";
  return TimelineKeyframeShape;
}({});
;// CONCATENATED MODULE: ./src/utils/timelineUtils.ts
function timelineUtils_typeof(o) { "@babel/helpers - typeof"; return timelineUtils_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, timelineUtils_typeof(o); }
function timelineUtils_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function timelineUtils_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, timelineUtils_toPropertyKey(o.key), o); } }
function timelineUtils_createClass(e, r, t) { return r && timelineUtils_defineProperties(e.prototype, r), t && timelineUtils_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function timelineUtils_defineProperty(e, r, t) { return (r = timelineUtils_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function timelineUtils_toPropertyKey(t) { var i = timelineUtils_toPrimitive(t, "string"); return "symbol" == timelineUtils_typeof(i) ? i : i + ""; }
function timelineUtils_toPrimitive(t, r) { if ("object" != timelineUtils_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != timelineUtils_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var defaultDenominators = [1, 2, 5, 10];
var TimelineUtils = /*#__PURE__*/function () {
  function TimelineUtils() {
    timelineUtils_classCallCheck(this, TimelineUtils);
  }
  return timelineUtils_createClass(TimelineUtils, null, [{
    key: "drawLine",
    value: function drawLine(ctx, x1, y1, x2, y2) {
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
    }
    /**
     * Check is valid number.
     */
  }, {
    key: "isNumber",
    value: function isNumber(val) {
      if (typeof val === 'number' && (val || val === 0) && !isNaN(val) && Number.isFinite(val)) {
        return true;
      }
      return false;
    }
  }, {
    key: "deleteElement",
    value: function deleteElement(array, element) {
      var index = array.indexOf(element);
      if (index !== -1) {
        return array.splice(index, 1);
      }
      return array;
    }

    /**
     * Check rectangle overlap x,y
     */
  }, {
    key: "isOverlap",
    value: function isOverlap(x, y, rectangle) {
      if (!rectangle) {
        return false;
      }
      if (rectangle.x <= x && rectangle.x + rectangle.width >= x && rectangle.y <= y && rectangle.y + rectangle.height >= y) {
        return true;
      }
      return false;
    }
    /**
     * Find beautiful step for the header line gauge.
     */
  }, {
    key: "findGoodStep",
    value: function findGoodStep(originalStep) {
      var divisionCheck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var denominators = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDenominators;
      if (!denominators) {
        denominators = defaultDenominators;
      }
      if (originalStep <= 0 || isNaN(originalStep) || !Number.isFinite(originalStep)) {
        return originalStep;
      }
      var step = originalStep;
      var lastDistance = null;
      var pow = TimelineUtils.getPowArgument(originalStep);
      for (var i = 0; i < denominators.length; i++) {
        var denominator = denominators[i];
        var calculatedStep = denominator * Math.pow(10, pow);
        if (divisionCheck && divisionCheck % calculatedStep != 0) {
          continue;
        }
        var distance = TimelineUtils.getDistance(originalStep, calculatedStep);
        if (distance == 0 || distance <= 0.1 && pow > 0) {
          lastDistance = distance;
          step = calculatedStep;
          break;
        } else if (!lastDistance || lastDistance > distance) {
          lastDistance = distance;
          step = calculatedStep;
        }
      }
      return step;
    }
    /**
     * Keep value in min, max bounds.
     */
  }, {
    key: "keepInBounds",
    value: function keepInBounds(value) {
      var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      if (TimelineUtils.isNumber(value)) {
        if (TimelineUtils.isNumber(min) && (min || min === 0)) {
          value = Math.max(value, min);
        }
        if (TimelineUtils.isNumber(max) && (max || max === 0)) {
          value = Math.min(value, max);
        }
      }
      return value;
    }
  }, {
    key: "setMinMax",
    value: function setMinMax(to, from) {
      var shrink = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      if (!from || !to) {
        return to;
      }
      var fromMin = from ? from.min : Number.NaN;
      var toMin = to.min;
      var isFromMinNumber = (fromMin || fromMin === 0) && TimelineUtils.isNumber(fromMin);
      var isToMinNumber = (toMin || toMin === 0) && TimelineUtils.isNumber(toMin);
      // get absolute min and max bounds:
      if (isFromMinNumber && isToMinNumber) {
        to.min = shrink ? Math.min(fromMin, toMin) : Math.max(fromMin, toMin);
      } else if (isFromMinNumber) {
        to.min = fromMin;
      }
      var fromMax = from ? from.max : Number.NaN;
      var toMax = to.max;
      var isFromMaxNumber = (fromMax || fromMax === 0) && TimelineUtils.isNumber(fromMax);
      var isToMaxNumber = (toMax || toMax === 0) && TimelineUtils.isNumber(toMax);
      if (isFromMaxNumber && isToMaxNumber) {
        to.max = shrink ? Math.max(fromMax, toMax) : Math.min(fromMax, toMax);
      } else if (isFromMaxNumber) {
        to.max = fromMax;
      }
      return to;
    }
  }, {
    key: "shrinkSelf",
    value: function shrinkSelf(rect, value) {
      if (!rect) {
        return rect;
      }
      rect.x -= value;
      rect.y -= value;
      rect.width += value;
      rect.height += value;
      return rect;
    }
    /**
     * Check whether rectangle intersects another rectangle
     */
  }, {
    key: "isRectIntersects",
    value: function isRectIntersects(rect, rect2) {
      var touch = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      if (!rect || !rect2) {
        console.log('Rectangles cannot be empty');
        return false;
      }
      var right = rect2.x + rect2.width;
      var bottom = rect2.y + rect2.height;
      if (touch) {
        if (
        // Left
        rect.x <= right &&
        // Right
        rect2.x <= rect.x + rect.width &&
        // Top
        rect.y <= bottom &&
        // Bottom
        rect2.y <= rect.y + rect.height) {
          return true;
        } else {
          return false;
        }
      } else {
        if (
        // Left
        rect.x < right &&
        // Right
        rect2.x < rect.x + rect.width &&
        // Top
        rect.y < bottom &&
        // Bottom
        rect2.y < rect.y + rect.height) {
          return true;
        } else {
          return false;
        }
      }
    }
  }, {
    key: "getDistance",
    value: function getDistance(x1, y1, x2, y2) {
      if (x2 != undefined && y2 != undefined) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
      } else {
        return Math.abs(x1 - y1);
      }
    }

    /**
     * Get sign of the number. 1 or -1.
     */
  }, {
    key: "sign",
    value: function sign(p) {
      return p >= 0 ? 1 : -1;
    }

    /**
     * Clear browser text selection.
     */
  }, {
    key: "clearBrowserSelection",
    value: function clearBrowserSelection() {
      if (!window) {
        return;
      }
      if (window.getSelection) {
        var selection = window.getSelection();
        if (selection) {
          selection.removeAllRanges();
        }
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var doc = window.document;
        if (doc.selection) {
          doc.selection.empty();
        }
      }
    }
  }, {
    key: "getPowArgument",
    value: function getPowArgument(toCheck) {
      if (!toCheck || toCheck === 0 || !isFinite(toCheck)) {
        return 1;
      }
      // some optimization for numbers:
      if (toCheck >= 10 && toCheck < 100) {
        return 1;
      } else if (toCheck >= 100 && toCheck < 1000) {
        return 2;
      } else if (toCheck >= 1000 && toCheck < 10000) {
        return 3;
      }
      toCheck = Math.abs(toCheck);
      var category = 0;
      var s = this.sign(toCheck);
      if (toCheck > 1) {
        while (toCheck >= 1) {
          toCheck = Math.floor(toCheck / 10.0);
          category++;
        }
        return s * category - 1;
      } else if (toCheck > 0.0) {
        // Get number of zeros before the number.
        var zerosCount = Math.floor(Math.log(toCheck) / Math.log(10) + 1) - 1;
        return zerosCount;
      } else {
        return 1;
      }
    }
  }, {
    key: "mergeOptions",
    value:
    /**
     * Merge options. New keys will be added.
     */
    function mergeOptions(previousOptions, newOptions) {
      newOptions = newOptions || {};
      // Apply incoming options to default. (override default)
      // Deep clone default options:
      var toArg = TimelineUtils.cloneOptions(previousOptions);
      // Merge options with the default.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      var mergeOptionsDeep = function mergeOptionsDeep(to, from) {
        if (!to || !from) {
          return;
        }
        // eslint-disable-next-line prefer-const
        for (var key in from) {
          if (Object.prototype.hasOwnProperty.call(from, key)) {
            if (from[key] !== undefined) {
              if (timelineUtils_typeof(from[key]) === 'object') {
                if (key === 'id') {
                  if (from[key] && from[key] !== to[key]) {
                    to[key] = from[key];
                  }
                } else {
                  if (!to[key]) {
                    to[key] = from[key];
                  } else {
                    mergeOptionsDeep(to[key], from[key]);
                  }
                }
              } else {
                to[key] = from[key];
              }
            }
          }
        }
      };
      mergeOptionsDeep(toArg, newOptions);
      return toArg;
    }
    /**
     * Format numbers with len
     */
  }, {
    key: "timePadZero",
    value: function timePadZero(num) {
      var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
      var str = String(num);
      var threshold = Math.pow(10, len - 1);
      if (num < threshold) {
        while (String(threshold).length > str.length) {
          str = "0".concat(num);
        }
      }
      return str;
    }
  }]);
}();
timelineUtils_defineProperty(TimelineUtils, "deepClone", function (previousOptions) {
  return JSON.parse(JSON.stringify(previousOptions));
});
timelineUtils_defineProperty(TimelineUtils, "cloneOptions", function (previousOptions) {
  var clonedValue = JSON.parse(JSON.stringify(previousOptions, function (key, value) {
    // No need to clone HTML element passed as ID.
    return key === 'id' ? undefined : value;
  }));
  clonedValue.id = previousOptions.id;
  return clonedValue;
});
;// CONCATENATED MODULE: ./src/settings/defaults/defaultGroupStyle.ts
var defaultRowHeight = 24;
var margin = 4;
var defaultGroupStyle = {
  height: 'auto',
  marginTop: margin,
  /**
   * Default group fill color.
   */
  fillColor: '#094771'
};
;// CONCATENATED MODULE: ./src/settings/defaults/defaultTimelineKeyframeStyle.ts

var defaultTimelineKeyframeStyle = {
  /**
   * keyframe fill color.
   */
  fillColor: 'DarkOrange',
  shape: TimelineKeyframeShape.Rhomb,
  /**
   * Selected keyframe fill color.
   */
  selectedFillColor: 'red',
  strokeColor: 'black',
  selectedStrokeColor: 'black',
  strokeThickness: 0.2,
  height: 'auto',
  width: 'auto'
};
;// CONCATENATED MODULE: ./src/settings/defaults/defaultTimelineRowStyle.ts


var defaultTimelineRowStyle = {
  /**
   * Row height in pixels.
   */
  height: defaultRowHeight,
  marginBottom: 2,
  fillColor: '#252526',
  /**
   * Style for the all keyframes in a current row.
   * Individual keyframe can have own style.
   */
  keyframesStyle: defaultTimelineKeyframeStyle,
  /**
   * Style of the groups.
   */
  groupsStyle: defaultGroupStyle
};
;// CONCATENATED MODULE: ./src/utils/timelineStyleUtils.ts
function timelineStyleUtils_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function timelineStyleUtils_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, timelineStyleUtils_toPropertyKey(o.key), o); } }
function timelineStyleUtils_createClass(e, r, t) { return r && timelineStyleUtils_defineProperties(e.prototype, r), t && timelineStyleUtils_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function timelineStyleUtils_toPropertyKey(t) { var i = timelineStyleUtils_toPrimitive(t, "string"); return "symbol" == timelineStyleUtils_typeof(i) ? i : i + ""; }
function timelineStyleUtils_toPrimitive(t, r) { if ("object" != timelineStyleUtils_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != timelineStyleUtils_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function timelineStyleUtils_typeof(o) { "@babel/helpers - typeof"; return timelineStyleUtils_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, timelineStyleUtils_typeof(o); }





var undefinedConst =  true ? "undefined" : 0;

// TODO: create merged style for each element instead of getting per property.
var TimelineStyleUtils = /*#__PURE__*/function () {
  function TimelineStyleUtils() {
    timelineStyleUtils_classCallCheck(this, TimelineStyleUtils);
  }
  return timelineStyleUtils_createClass(TimelineStyleUtils, null, [{
    key: "getGroup",
    value: function getGroup(groupModel) {
      var style = groupModel;
      if (style && typeof style === 'string') {
        return null;
      }
      return style || null;
    }
  }, {
    key: "getGroupStyle",
    value: function getGroupStyle(groupModel) {
      var _TimelineStyleUtils$g;
      return ((_TimelineStyleUtils$g = TimelineStyleUtils.getGroup(groupModel)) === null || _TimelineStyleUtils$g === void 0 ? void 0 : _TimelineStyleUtils$g.style) || null;
    }
  }, {
    key: "getFirstSet",
    value: function getFirstSet(defaultValue) {
      for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        params[_key - 1] = arguments[_key];
      }
      return TimelineStyleUtils.getValue.apply(TimelineStyleUtils, [defaultValue, false].concat(params));
    }
    /**
     * Get first value set or default.
     * @param defaultValue default value in a case when no value is set.
     * @param returnFalseIfAnyFalse - find first negative bool and return false.
     * @param params collection of values to check.
     * @returns value.
     */
  }, {
    key: "getValue",
    value: function getValue(defaultValue) {
      var returnFalseIfAnyFalse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var valuesFound = [];
      var found = false;
      for (var _len2 = arguments.length, params = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        params[_key2 - 2] = arguments[_key2];
      }
      params.forEach(function (value) {
        if (found) {
          return;
        }
        if (timelineStyleUtils_typeof(value) === undefinedConst) {
          return;
        } else if (typeof value === 'number') {
          if (!TimelineUtils.isNumber(value)) {
            return;
          }
        } else if (typeof value === 'boolean') {
          valuesFound.push(value);
          // No need to search for other values. First false is turning off current bool functionality.
          if (returnFalseIfAnyFalse && value === false) {
            found = true;
          }
          return;
        } else if (!value) {
          return;
        }
        valuesFound.push(value);
      });
      var toReturn = valuesFound && valuesFound.length > 0 ? valuesFound[0] : defaultValue;
      if (found) {
        return false;
      }
      return TimelineStyleUtils.getValueOrDefault(toReturn, defaultValue);
    }
  }, {
    key: "getValueOrDefault",
    value: function getValueOrDefault(value, defaultValue) {
      if (timelineStyleUtils_typeof(value) === undefinedConst) {
        return defaultValue;
      } else if (typeof value == 'boolean') {
        // variable is a boolean
        return value;
      } else if (typeof value == 'number') {
        // variable is a boolean
        if (value || value === 0) {
          return value;
        } else {
          return defaultValue;
        }
      }
      return value || defaultValue;
    }
  }, {
    key: "keyframeWidth",
    value: function keyframeWidth(keyframe, group, rowStyle, options) {
      var _keyframe$style, _TimelineStyleUtils$g2, _rowStyle$keyframesSt, _rowStyle$groupsStyle, _options$rowsStyle, _options$rowsStyle2;
      return TimelineStyleUtils.getFirstSet(
      // default value
      defaultTimelineKeyframeStyle.width || '', keyframe === null || keyframe === void 0 || (_keyframe$style = keyframe.style) === null || _keyframe$style === void 0 ? void 0 : _keyframe$style.width, // exact style
      (_TimelineStyleUtils$g2 = TimelineStyleUtils.getGroupStyle(group)) === null || _TimelineStyleUtils$g2 === void 0 || (_TimelineStyleUtils$g2 = _TimelineStyleUtils$g2.keyframesStyle) === null || _TimelineStyleUtils$g2 === void 0 ? void 0 : _TimelineStyleUtils$g2.width, rowStyle === null || rowStyle === void 0 || (_rowStyle$keyframesSt = rowStyle.keyframesStyle) === null || _rowStyle$keyframesSt === void 0 ? void 0 : _rowStyle$keyframesSt.width, rowStyle === null || rowStyle === void 0 || (_rowStyle$groupsStyle = rowStyle.groupsStyle) === null || _rowStyle$groupsStyle === void 0 || (_rowStyle$groupsStyle = _rowStyle$groupsStyle.keyframesStyle) === null || _rowStyle$groupsStyle === void 0 ? void 0 : _rowStyle$groupsStyle.width, // global styles
      options === null || options === void 0 || (_options$rowsStyle = options.rowsStyle) === null || _options$rowsStyle === void 0 || (_options$rowsStyle = _options$rowsStyle.groupsStyle) === null || _options$rowsStyle === void 0 || (_options$rowsStyle = _options$rowsStyle.keyframesStyle) === null || _options$rowsStyle === void 0 ? void 0 : _options$rowsStyle.width, // default keyframe style
      options === null || options === void 0 || (_options$rowsStyle2 = options.rowsStyle) === null || _options$rowsStyle2 === void 0 || (_options$rowsStyle2 = _options$rowsStyle2.keyframesStyle) === null || _options$rowsStyle2 === void 0 ? void 0 : _options$rowsStyle2.width);
    }
  }, {
    key: "keyframeHeight",
    value: function keyframeHeight(keyframe, group, rowStyle, options) {
      var _keyframe$style2, _TimelineStyleUtils$g3, _rowStyle$keyframesSt2, _rowStyle$groupsStyle2, _options$rowsStyle3, _options$rowsStyle4;
      return TimelineStyleUtils.getFirstSet(
      // default value
      defaultTimelineKeyframeStyle.height || '', keyframe === null || keyframe === void 0 || (_keyframe$style2 = keyframe.style) === null || _keyframe$style2 === void 0 ? void 0 : _keyframe$style2.height, // exact style
      (_TimelineStyleUtils$g3 = TimelineStyleUtils.getGroupStyle(group)) === null || _TimelineStyleUtils$g3 === void 0 || (_TimelineStyleUtils$g3 = _TimelineStyleUtils$g3.keyframesStyle) === null || _TimelineStyleUtils$g3 === void 0 ? void 0 : _TimelineStyleUtils$g3.height, rowStyle === null || rowStyle === void 0 || (_rowStyle$keyframesSt2 = rowStyle.keyframesStyle) === null || _rowStyle$keyframesSt2 === void 0 ? void 0 : _rowStyle$keyframesSt2.height, rowStyle === null || rowStyle === void 0 || (_rowStyle$groupsStyle2 = rowStyle.groupsStyle) === null || _rowStyle$groupsStyle2 === void 0 || (_rowStyle$groupsStyle2 = _rowStyle$groupsStyle2.keyframesStyle) === null || _rowStyle$groupsStyle2 === void 0 ? void 0 : _rowStyle$groupsStyle2.height, // global styles
      options === null || options === void 0 || (_options$rowsStyle3 = options.rowsStyle) === null || _options$rowsStyle3 === void 0 || (_options$rowsStyle3 = _options$rowsStyle3.groupsStyle) === null || _options$rowsStyle3 === void 0 || (_options$rowsStyle3 = _options$rowsStyle3.keyframesStyle) === null || _options$rowsStyle3 === void 0 ? void 0 : _options$rowsStyle3.height, // default keyframe style
      options === null || options === void 0 || (_options$rowsStyle4 = options.rowsStyle) === null || _options$rowsStyle4 === void 0 || (_options$rowsStyle4 = _options$rowsStyle4.keyframesStyle) === null || _options$rowsStyle4 === void 0 ? void 0 : _options$rowsStyle4.height);
    }
  }, {
    key: "keyframeShape",
    value: function keyframeShape(keyframe, group, rowStyle, options) {
      var _keyframe$style3, _TimelineStyleUtils$g4, _rowStyle$groupsStyle3, _rowStyle$keyframesSt3, _options$rowsStyle5, _options$rowsStyle6;
      var defaultValue = defaultTimelineKeyframeStyle.shape || TimelineKeyframeShape.Rhomb;
      return TimelineStyleUtils.getFirstSet(
      // default value
      defaultValue, // exact style
      keyframe === null || keyframe === void 0 || (_keyframe$style3 = keyframe.style) === null || _keyframe$style3 === void 0 ? void 0 : _keyframe$style3.shape, // style set by keyframe group
      (_TimelineStyleUtils$g4 = TimelineStyleUtils.getGroupStyle(group)) === null || _TimelineStyleUtils$g4 === void 0 || (_TimelineStyleUtils$g4 = _TimelineStyleUtils$g4.keyframesStyle) === null || _TimelineStyleUtils$g4 === void 0 ? void 0 : _TimelineStyleUtils$g4.shape, // style from the keyframe group
      rowStyle === null || rowStyle === void 0 || (_rowStyle$groupsStyle3 = rowStyle.groupsStyle) === null || _rowStyle$groupsStyle3 === void 0 || (_rowStyle$groupsStyle3 = _rowStyle$groupsStyle3.keyframesStyle) === null || _rowStyle$groupsStyle3 === void 0 ? void 0 : _rowStyle$groupsStyle3.shape, // style set by keyframe style
      rowStyle === null || rowStyle === void 0 || (_rowStyle$keyframesSt3 = rowStyle.keyframesStyle) === null || _rowStyle$keyframesSt3 === void 0 ? void 0 : _rowStyle$keyframesSt3.shape,
      // style set by keyframe group style, applied when group is set
      group ? options === null || options === void 0 || (_options$rowsStyle5 = options.rowsStyle) === null || _options$rowsStyle5 === void 0 || (_options$rowsStyle5 = _options$rowsStyle5.groupsStyle) === null || _options$rowsStyle5 === void 0 || (_options$rowsStyle5 = _options$rowsStyle5.keyframesStyle) === null || _options$rowsStyle5 === void 0 ? void 0 : _options$rowsStyle5.shape : undefined, // Style set by global options
      options === null || options === void 0 || (_options$rowsStyle6 = options.rowsStyle) === null || _options$rowsStyle6 === void 0 || (_options$rowsStyle6 = _options$rowsStyle6.keyframesStyle) === null || _options$rowsStyle6 === void 0 ? void 0 : _options$rowsStyle6.shape);
    }
  }, {
    key: "keyframeFillColor",
    value: function keyframeFillColor(keyframe, group, rowStyle, options) {
      var _keyframe$style4, _TimelineStyleUtils$g5, _rowStyle$groupsStyle4, _rowStyle$keyframesSt4, _options$rowsStyle7, _options$rowsStyle8;
      var defaultValue = defaultTimelineKeyframeStyle.fillColor || '';
      return TimelineStyleUtils.getFirstSet(
      // default value
      defaultValue, // exact style
      keyframe === null || keyframe === void 0 || (_keyframe$style4 = keyframe.style) === null || _keyframe$style4 === void 0 ? void 0 : _keyframe$style4.fillColor, // style set by keyframe group
      (_TimelineStyleUtils$g5 = TimelineStyleUtils.getGroupStyle(group)) === null || _TimelineStyleUtils$g5 === void 0 || (_TimelineStyleUtils$g5 = _TimelineStyleUtils$g5.keyframesStyle) === null || _TimelineStyleUtils$g5 === void 0 ? void 0 : _TimelineStyleUtils$g5.fillColor, // style from the keyframe group
      rowStyle === null || rowStyle === void 0 || (_rowStyle$groupsStyle4 = rowStyle.groupsStyle) === null || _rowStyle$groupsStyle4 === void 0 || (_rowStyle$groupsStyle4 = _rowStyle$groupsStyle4.keyframesStyle) === null || _rowStyle$groupsStyle4 === void 0 ? void 0 : _rowStyle$groupsStyle4.fillColor, // style set by keyframe style
      rowStyle === null || rowStyle === void 0 || (_rowStyle$keyframesSt4 = rowStyle.keyframesStyle) === null || _rowStyle$keyframesSt4 === void 0 ? void 0 : _rowStyle$keyframesSt4.fillColor,
      // style set by keyframe group style, applied when group is set
      group ? options === null || options === void 0 || (_options$rowsStyle7 = options.rowsStyle) === null || _options$rowsStyle7 === void 0 || (_options$rowsStyle7 = _options$rowsStyle7.groupsStyle) === null || _options$rowsStyle7 === void 0 || (_options$rowsStyle7 = _options$rowsStyle7.keyframesStyle) === null || _options$rowsStyle7 === void 0 ? void 0 : _options$rowsStyle7.fillColor : undefined, // Style set by global options
      options === null || options === void 0 || (_options$rowsStyle8 = options.rowsStyle) === null || _options$rowsStyle8 === void 0 || (_options$rowsStyle8 = _options$rowsStyle8.keyframesStyle) === null || _options$rowsStyle8 === void 0 ? void 0 : _options$rowsStyle8.fillColor);
    }
  }, {
    key: "keyframeSelectedFillColor",
    value: function keyframeSelectedFillColor(keyframe, group, rowStyle, options) {
      var _keyframe$style5, _TimelineStyleUtils$g6, _rowStyle$groupsStyle5, _rowStyle$keyframesSt5, _options$rowsStyle9, _options$rowsStyle10;
      var defaultValue = defaultTimelineKeyframeStyle.selectedFillColor || '';
      return TimelineStyleUtils.getFirstSet(
      // default value
      defaultValue, // exact style
      keyframe === null || keyframe === void 0 || (_keyframe$style5 = keyframe.style) === null || _keyframe$style5 === void 0 ? void 0 : _keyframe$style5.selectedFillColor, // style set by keyframe group
      (_TimelineStyleUtils$g6 = TimelineStyleUtils.getGroupStyle(group)) === null || _TimelineStyleUtils$g6 === void 0 || (_TimelineStyleUtils$g6 = _TimelineStyleUtils$g6.keyframesStyle) === null || _TimelineStyleUtils$g6 === void 0 ? void 0 : _TimelineStyleUtils$g6.selectedFillColor, // style from the keyframe group
      rowStyle === null || rowStyle === void 0 || (_rowStyle$groupsStyle5 = rowStyle.groupsStyle) === null || _rowStyle$groupsStyle5 === void 0 || (_rowStyle$groupsStyle5 = _rowStyle$groupsStyle5.keyframesStyle) === null || _rowStyle$groupsStyle5 === void 0 ? void 0 : _rowStyle$groupsStyle5.selectedFillColor, // style set by keyframe style
      rowStyle === null || rowStyle === void 0 || (_rowStyle$keyframesSt5 = rowStyle.keyframesStyle) === null || _rowStyle$keyframesSt5 === void 0 ? void 0 : _rowStyle$keyframesSt5.selectedFillColor,
      // style set by keyframe group style, applied when group is set
      group ? options === null || options === void 0 || (_options$rowsStyle9 = options.rowsStyle) === null || _options$rowsStyle9 === void 0 || (_options$rowsStyle9 = _options$rowsStyle9.groupsStyle) === null || _options$rowsStyle9 === void 0 || (_options$rowsStyle9 = _options$rowsStyle9.keyframesStyle) === null || _options$rowsStyle9 === void 0 ? void 0 : _options$rowsStyle9.selectedFillColor : undefined, // Style set by global options
      options === null || options === void 0 || (_options$rowsStyle10 = options.rowsStyle) === null || _options$rowsStyle10 === void 0 || (_options$rowsStyle10 = _options$rowsStyle10.keyframesStyle) === null || _options$rowsStyle10 === void 0 ? void 0 : _options$rowsStyle10.selectedFillColor);
    }
  }, {
    key: "keyframeStrokeThickness",
    value: function keyframeStrokeThickness(keyframe, group, rowStyle, options) {
      var _keyframe$style6, _TimelineStyleUtils$g7, _rowStyle$groupsStyle6, _rowStyle$keyframesSt6, _options$rowsStyle11, _options$rowsStyle12;
      var defaultValue = defaultTimelineKeyframeStyle.strokeThickness || 0;
      return TimelineStyleUtils.getFirstSet(
      // default value
      defaultValue, // exact style
      keyframe === null || keyframe === void 0 || (_keyframe$style6 = keyframe.style) === null || _keyframe$style6 === void 0 ? void 0 : _keyframe$style6.strokeThickness, // style set by keyframe group
      (_TimelineStyleUtils$g7 = TimelineStyleUtils.getGroupStyle(group)) === null || _TimelineStyleUtils$g7 === void 0 || (_TimelineStyleUtils$g7 = _TimelineStyleUtils$g7.keyframesStyle) === null || _TimelineStyleUtils$g7 === void 0 ? void 0 : _TimelineStyleUtils$g7.strokeThickness, // style from the keyframe group
      rowStyle === null || rowStyle === void 0 || (_rowStyle$groupsStyle6 = rowStyle.groupsStyle) === null || _rowStyle$groupsStyle6 === void 0 || (_rowStyle$groupsStyle6 = _rowStyle$groupsStyle6.keyframesStyle) === null || _rowStyle$groupsStyle6 === void 0 ? void 0 : _rowStyle$groupsStyle6.strokeThickness, // style set by keyframe style
      rowStyle === null || rowStyle === void 0 || (_rowStyle$keyframesSt6 = rowStyle.keyframesStyle) === null || _rowStyle$keyframesSt6 === void 0 ? void 0 : _rowStyle$keyframesSt6.strokeThickness,
      // style set by keyframe group style, applied when group is set
      group ? options === null || options === void 0 || (_options$rowsStyle11 = options.rowsStyle) === null || _options$rowsStyle11 === void 0 || (_options$rowsStyle11 = _options$rowsStyle11.groupsStyle) === null || _options$rowsStyle11 === void 0 || (_options$rowsStyle11 = _options$rowsStyle11.keyframesStyle) === null || _options$rowsStyle11 === void 0 ? void 0 : _options$rowsStyle11.strokeThickness : undefined, // Style set by global options
      options === null || options === void 0 || (_options$rowsStyle12 = options.rowsStyle) === null || _options$rowsStyle12 === void 0 || (_options$rowsStyle12 = _options$rowsStyle12.keyframesStyle) === null || _options$rowsStyle12 === void 0 ? void 0 : _options$rowsStyle12.strokeThickness);
    }
  }, {
    key: "keyframeStrokeColor",
    value: function keyframeStrokeColor(keyframe, group, rowStyle, options) {
      var _keyframe$style7, _TimelineStyleUtils$g8, _rowStyle$groupsStyle7, _rowStyle$keyframesSt7, _options$rowsStyle13, _options$rowsStyle14;
      var defaultValue = defaultTimelineKeyframeStyle.strokeColor || '';
      return TimelineStyleUtils.getFirstSet(
      // default value
      defaultValue, // exact style
      keyframe === null || keyframe === void 0 || (_keyframe$style7 = keyframe.style) === null || _keyframe$style7 === void 0 ? void 0 : _keyframe$style7.strokeColor, // style set by keyframe group
      (_TimelineStyleUtils$g8 = TimelineStyleUtils.getGroupStyle(group)) === null || _TimelineStyleUtils$g8 === void 0 || (_TimelineStyleUtils$g8 = _TimelineStyleUtils$g8.keyframesStyle) === null || _TimelineStyleUtils$g8 === void 0 ? void 0 : _TimelineStyleUtils$g8.strokeColor, // style from the keyframe group
      rowStyle === null || rowStyle === void 0 || (_rowStyle$groupsStyle7 = rowStyle.groupsStyle) === null || _rowStyle$groupsStyle7 === void 0 || (_rowStyle$groupsStyle7 = _rowStyle$groupsStyle7.keyframesStyle) === null || _rowStyle$groupsStyle7 === void 0 ? void 0 : _rowStyle$groupsStyle7.strokeColor, // style set by keyframe style
      rowStyle === null || rowStyle === void 0 || (_rowStyle$keyframesSt7 = rowStyle.keyframesStyle) === null || _rowStyle$keyframesSt7 === void 0 ? void 0 : _rowStyle$keyframesSt7.strokeColor,
      // style set by keyframe group style, applied when group is set
      group ? options === null || options === void 0 || (_options$rowsStyle13 = options.rowsStyle) === null || _options$rowsStyle13 === void 0 || (_options$rowsStyle13 = _options$rowsStyle13.groupsStyle) === null || _options$rowsStyle13 === void 0 || (_options$rowsStyle13 = _options$rowsStyle13.keyframesStyle) === null || _options$rowsStyle13 === void 0 ? void 0 : _options$rowsStyle13.strokeColor : undefined, // Style set by global options
      options === null || options === void 0 || (_options$rowsStyle14 = options.rowsStyle) === null || _options$rowsStyle14 === void 0 || (_options$rowsStyle14 = _options$rowsStyle14.keyframesStyle) === null || _options$rowsStyle14 === void 0 ? void 0 : _options$rowsStyle14.strokeColor);
    }
  }, {
    key: "keyframeSelectedStrokeColor",
    value: function keyframeSelectedStrokeColor(keyframe, group, rowStyle, options) {
      var _keyframe$style8, _TimelineStyleUtils$g9, _rowStyle$groupsStyle8, _rowStyle$keyframesSt8, _options$rowsStyle15, _options$rowsStyle16;
      var defaultValue = defaultTimelineKeyframeStyle.selectedStrokeColor || '';
      return TimelineStyleUtils.getFirstSet(
      // default value
      defaultValue, // exact style
      keyframe === null || keyframe === void 0 || (_keyframe$style8 = keyframe.style) === null || _keyframe$style8 === void 0 ? void 0 : _keyframe$style8.selectedStrokeColor, // style set by keyframe group
      (_TimelineStyleUtils$g9 = TimelineStyleUtils.getGroupStyle(group)) === null || _TimelineStyleUtils$g9 === void 0 || (_TimelineStyleUtils$g9 = _TimelineStyleUtils$g9.keyframesStyle) === null || _TimelineStyleUtils$g9 === void 0 ? void 0 : _TimelineStyleUtils$g9.selectedStrokeColor, // style from the keyframe group
      rowStyle === null || rowStyle === void 0 || (_rowStyle$groupsStyle8 = rowStyle.groupsStyle) === null || _rowStyle$groupsStyle8 === void 0 || (_rowStyle$groupsStyle8 = _rowStyle$groupsStyle8.keyframesStyle) === null || _rowStyle$groupsStyle8 === void 0 ? void 0 : _rowStyle$groupsStyle8.selectedStrokeColor, // style set by keyframe style
      rowStyle === null || rowStyle === void 0 || (_rowStyle$keyframesSt8 = rowStyle.keyframesStyle) === null || _rowStyle$keyframesSt8 === void 0 ? void 0 : _rowStyle$keyframesSt8.selectedStrokeColor,
      // style set by keyframe group style, applied when group is set
      group ? options === null || options === void 0 || (_options$rowsStyle15 = options.rowsStyle) === null || _options$rowsStyle15 === void 0 || (_options$rowsStyle15 = _options$rowsStyle15.groupsStyle) === null || _options$rowsStyle15 === void 0 || (_options$rowsStyle15 = _options$rowsStyle15.keyframesStyle) === null || _options$rowsStyle15 === void 0 ? void 0 : _options$rowsStyle15.selectedStrokeColor : undefined, // Style set by global options
      options === null || options === void 0 || (_options$rowsStyle16 = options.rowsStyle) === null || _options$rowsStyle16 === void 0 || (_options$rowsStyle16 = _options$rowsStyle16.keyframesStyle) === null || _options$rowsStyle16 === void 0 ? void 0 : _options$rowsStyle16.selectedStrokeColor);
    }
  }, {
    key: "groupHeight",
    value: function groupHeight(options, group, rowStyle) {
      var _TimelineStyleUtils$g10, _rowStyle$groupsStyle9, _options$rowsStyle17;
      return TimelineStyleUtils.getFirstSet(
      // default value
      defaultGroupStyle.height || 'auto', // exact group style
      (_TimelineStyleUtils$g10 = TimelineStyleUtils.getGroupStyle(group)) === null || _TimelineStyleUtils$g10 === void 0 ? void 0 : _TimelineStyleUtils$g10.height, // Row row style
      rowStyle === null || rowStyle === void 0 || (_rowStyle$groupsStyle9 = rowStyle.groupsStyle) === null || _rowStyle$groupsStyle9 === void 0 ? void 0 : _rowStyle$groupsStyle9.height, // global styles
      options === null || options === void 0 || (_options$rowsStyle17 = options.rowsStyle) === null || _options$rowsStyle17 === void 0 || (_options$rowsStyle17 = _options$rowsStyle17.groupsStyle) === null || _options$rowsStyle17 === void 0 ? void 0 : _options$rowsStyle17.height);
    }
  }, {
    key: "groupMarginTop",
    value: function groupMarginTop(options, group, rowStyle) {
      var _TimelineStyleUtils$g11, _rowStyle$groupsStyle10, _options$rowsStyle18;
      return TimelineStyleUtils.getFirstSet(
      // default value
      defaultGroupStyle.marginTop || 'auto', // exact style
      (_TimelineStyleUtils$g11 = TimelineStyleUtils.getGroupStyle(group)) === null || _TimelineStyleUtils$g11 === void 0 ? void 0 : _TimelineStyleUtils$g11.marginTop, // Row row style
      rowStyle === null || rowStyle === void 0 || (_rowStyle$groupsStyle10 = rowStyle.groupsStyle) === null || _rowStyle$groupsStyle10 === void 0 ? void 0 : _rowStyle$groupsStyle10.marginTop, // global styles
      options === null || options === void 0 || (_options$rowsStyle18 = options.rowsStyle) === null || _options$rowsStyle18 === void 0 || (_options$rowsStyle18 = _options$rowsStyle18.groupsStyle) === null || _options$rowsStyle18 === void 0 ? void 0 : _options$rowsStyle18.marginTop);
    }
  }, {
    key: "groupFillColor",
    value: function groupFillColor(options, group, rowStyle) {
      var _TimelineStyleUtils$g12, _rowStyle$groupsStyle11, _options$rowsStyle19;
      return TimelineStyleUtils.getFirstSet(
      // default value
      defaultGroupStyle.fillColor || '', // exact style
      (_TimelineStyleUtils$g12 = TimelineStyleUtils.getGroupStyle(group)) === null || _TimelineStyleUtils$g12 === void 0 ? void 0 : _TimelineStyleUtils$g12.fillColor, // Row row style
      rowStyle === null || rowStyle === void 0 || (_rowStyle$groupsStyle11 = rowStyle.groupsStyle) === null || _rowStyle$groupsStyle11 === void 0 ? void 0 : _rowStyle$groupsStyle11.fillColor, // global styles
      options === null || options === void 0 || (_options$rowsStyle19 = options.rowsStyle) === null || _options$rowsStyle19 === void 0 || (_options$rowsStyle19 = _options$rowsStyle19.groupsStyle) === null || _options$rowsStyle19 === void 0 ? void 0 : _options$rowsStyle19.fillColor);
    }
  }, {
    key: "groupStrokeColor",
    value: function groupStrokeColor(options, group, rowStyle) {
      var _TimelineStyleUtils$g13, _rowStyle$groupsStyle12, _options$rowsStyle20;
      return TimelineStyleUtils.getFirstSet(
      // default value
      defaultGroupStyle.strokeColor || '', // exact style
      (_TimelineStyleUtils$g13 = TimelineStyleUtils.getGroupStyle(group)) === null || _TimelineStyleUtils$g13 === void 0 ? void 0 : _TimelineStyleUtils$g13.strokeColor, // Row row style
      rowStyle === null || rowStyle === void 0 || (_rowStyle$groupsStyle12 = rowStyle.groupsStyle) === null || _rowStyle$groupsStyle12 === void 0 ? void 0 : _rowStyle$groupsStyle12.strokeColor, // global styles
      options === null || options === void 0 || (_options$rowsStyle20 = options.rowsStyle) === null || _options$rowsStyle20 === void 0 || (_options$rowsStyle20 = _options$rowsStyle20.groupsStyle) === null || _options$rowsStyle20 === void 0 ? void 0 : _options$rowsStyle20.strokeColor);
    }
  }, {
    key: "groupStrokeThickness",
    value: function groupStrokeThickness(options, group, rowStyle) {
      var _TimelineStyleUtils$g14, _rowStyle$groupsStyle13, _options$rowsStyle21;
      return TimelineStyleUtils.getFirstSet(
      // default value
      defaultGroupStyle.strokeThickness || '', // exact style
      (_TimelineStyleUtils$g14 = TimelineStyleUtils.getGroupStyle(group)) === null || _TimelineStyleUtils$g14 === void 0 ? void 0 : _TimelineStyleUtils$g14.strokeThickness, // Row row style
      rowStyle === null || rowStyle === void 0 || (_rowStyle$groupsStyle13 = rowStyle.groupsStyle) === null || _rowStyle$groupsStyle13 === void 0 ? void 0 : _rowStyle$groupsStyle13.strokeThickness, // global styles
      options === null || options === void 0 || (_options$rowsStyle21 = options.rowsStyle) === null || _options$rowsStyle21 === void 0 || (_options$rowsStyle21 = _options$rowsStyle21.groupsStyle) === null || _options$rowsStyle21 === void 0 ? void 0 : _options$rowsStyle21.strokeThickness) || 0;
    }
  }, {
    key: "groupsRadii",
    value: function groupsRadii(options, group, rowStyle) {
      var _TimelineStyleUtils$g15, _rowStyle$groupsStyle14, _options$rowsStyle22;
      return TimelineStyleUtils.getFirstSet(
      // default value
      defaultGroupStyle.radii || '', // exact style
      (_TimelineStyleUtils$g15 = TimelineStyleUtils.getGroupStyle(group)) === null || _TimelineStyleUtils$g15 === void 0 ? void 0 : _TimelineStyleUtils$g15.radii, // Row row style
      rowStyle === null || rowStyle === void 0 || (_rowStyle$groupsStyle14 = rowStyle.groupsStyle) === null || _rowStyle$groupsStyle14 === void 0 ? void 0 : _rowStyle$groupsStyle14.radii, // global styles
      options === null || options === void 0 || (_options$rowsStyle22 = options.rowsStyle) === null || _options$rowsStyle22 === void 0 || (_options$rowsStyle22 = _options$rowsStyle22.groupsStyle) === null || _options$rowsStyle22 === void 0 ? void 0 : _options$rowsStyle22.radii) || 0;
    }

    /**
     * Get current row height from styles
     */
  }, {
    key: "getRowHeight",
    value: function getRowHeight(rowStyle, options) {
      var _options$rowsStyle23;
      var defaultValue = defaultTimelineRowStyle.height || 0;
      return TimelineStyleUtils.getFirstSet(
      // default value
      defaultValue, // exact style
      rowStyle === null || rowStyle === void 0 ? void 0 : rowStyle.height, // Style set by global options
      options === null || options === void 0 || (_options$rowsStyle23 = options.rowsStyle) === null || _options$rowsStyle23 === void 0 ? void 0 : _options$rowsStyle23.height);
    }
  }, {
    key: "getRowMarginBottom",
    value: function getRowMarginBottom(rowStyle, options) {
      var _options$rowsStyle24;
      var defaultValue = defaultTimelineRowStyle.marginBottom || 0;
      return TimelineStyleUtils.getFirstSet(
      // default value
      defaultValue, // exact style
      rowStyle === null || rowStyle === void 0 ? void 0 : rowStyle.marginBottom, // Style set by global options
      options === null || options === void 0 || (_options$rowsStyle24 = options.rowsStyle) === null || _options$rowsStyle24 === void 0 ? void 0 : _options$rowsStyle24.marginBottom);
    }
  }, {
    key: "getRowFillColor",
    value: function getRowFillColor(rowStyle, options) {
      var _options$rowsStyle25;
      var defaultValue = defaultTimelineRowStyle.fillColor || '';
      return TimelineStyleUtils.getFirstSet(
      // default value
      defaultValue, // exact style
      rowStyle === null || rowStyle === void 0 ? void 0 : rowStyle.fillColor, // Style set by global options
      options === null || options === void 0 || (_options$rowsStyle25 = options.rowsStyle) === null || _options$rowsStyle25 === void 0 ? void 0 : _options$rowsStyle25.fillColor);
    }
  }, {
    key: "headerHeight",
    value: function headerHeight(options) {
      var defaultRowHeight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 30;
      return (options === null || options === void 0 ? void 0 : options.headerHeight) || defaultRowHeight;
    }
  }, {
    key: "keyframeDraggable",
    value: function keyframeDraggable(keyframe, group, row, options) {
      var _TimelineStyleUtils$g16;
      var defaultValue = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
      var findFirstNegativeBool = true;
      var boolResult = TimelineStyleUtils.getValue(defaultValue, findFirstNegativeBool, // Keyframe settings
      keyframe === null || keyframe === void 0 ? void 0 : keyframe.draggable, // Group settings
      (_TimelineStyleUtils$g16 = TimelineStyleUtils.getGroup(group)) === null || _TimelineStyleUtils$g16 === void 0 ? void 0 : _TimelineStyleUtils$g16.keyframesDraggable, // Row settings
      row === null || row === void 0 ? void 0 : row.keyframesDraggable, // Start from global settings first.
      options === null || options === void 0 ? void 0 : options.keyframesDraggable);
      return boolResult;
    }
  }, {
    key: "groupDraggable",
    value: function groupDraggable(group, row, options) {
      var _TimelineStyleUtils$g17;
      var findFirstNegativeBool = true;
      var boolResult = TimelineStyleUtils.getValue(true, findFirstNegativeBool, // Group settings
      (_TimelineStyleUtils$g17 = TimelineStyleUtils.getGroup(group)) === null || _TimelineStyleUtils$g17 === void 0 ? void 0 : _TimelineStyleUtils$g17.draggable, // Row settings
      row === null || row === void 0 ? void 0 : row.groupsDraggable, // Start from global settings first.
      options === null || options === void 0 ? void 0 : options.groupsDraggable);
      return boolResult;
    }
  }]);
}();
;// CONCATENATED MODULE: ./src/enums/timelineElementType.ts
/**
 * Internal element type.
 */
var TimelineElementType = /*#__PURE__*/function (TimelineElementType) {
  TimelineElementType["Timeline"] = "timeline";
  TimelineElementType["Keyframe"] = "keyframe";
  TimelineElementType["Group"] = "group";
  TimelineElementType["Row"] = "row";
  TimelineElementType["None"] = "none";
  return TimelineElementType;
}({});
;// CONCATENATED MODULE: ./src/utils/timelineDraggableData.ts
function timelineDraggableData_typeof(o) { "@babel/helpers - typeof"; return timelineDraggableData_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, timelineDraggableData_typeof(o); }
function timelineDraggableData_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, timelineDraggableData_toPropertyKey(o.key), o); } }
function timelineDraggableData_createClass(e, r, t) { return r && timelineDraggableData_defineProperties(e.prototype, r), t && timelineDraggableData_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function timelineDraggableData_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function timelineDraggableData_defineProperty(e, r, t) { return (r = timelineDraggableData_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function timelineDraggableData_toPropertyKey(t) { var i = timelineDraggableData_toPrimitive(t, "string"); return "symbol" == timelineDraggableData_typeof(i) ? i : i + ""; }
function timelineDraggableData_toPrimitive(t, r) { if ("object" != timelineDraggableData_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != timelineDraggableData_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

/**
 * Information about current drag state.
 */
var TimelineDraggableData = /*#__PURE__*/timelineDraggableData_createClass(function TimelineDraggableData() {
  timelineDraggableData_classCallCheck(this, TimelineDraggableData);
  /**
   * Whether position was changed.
   */
  timelineDraggableData_defineProperty(this, "changed", false);
  /**
   * Dragging type.
   */
  timelineDraggableData_defineProperty(this, "type", TimelineElementType.None);
}
/**
 * Prev value.
 */
/**
 * Prev value.
 */
);
;// CONCATENATED MODULE: ./src/utils/events/timelineBaseEvent.ts
function timelineBaseEvent_typeof(o) { "@babel/helpers - typeof"; return timelineBaseEvent_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, timelineBaseEvent_typeof(o); }
function timelineBaseEvent_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function timelineBaseEvent_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, timelineBaseEvent_toPropertyKey(o.key), o); } }
function timelineBaseEvent_createClass(e, r, t) { return r && timelineBaseEvent_defineProperties(e.prototype, r), t && timelineBaseEvent_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function timelineBaseEvent_defineProperty(e, r, t) { return (r = timelineBaseEvent_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function timelineBaseEvent_toPropertyKey(t) { var i = timelineBaseEvent_toPrimitive(t, "string"); return "symbol" == timelineBaseEvent_typeof(i) ? i : i + ""; }
function timelineBaseEvent_toPrimitive(t, r) { if ("object" != timelineBaseEvent_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != timelineBaseEvent_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Timeline base preventable event.
 */
var TimelineBaseEvent = /*#__PURE__*/function () {
  function TimelineBaseEvent() {
    timelineBaseEvent_classCallCheck(this, TimelineBaseEvent);
    timelineBaseEvent_defineProperty(this, "_prevented", false);
  }
  return timelineBaseEvent_createClass(TimelineBaseEvent, [{
    key: "preventDefault",
    value:
    /**
     * Prevent default click logic.
     */
    function preventDefault() {
      this._prevented = true;
    }
  }, {
    key: "isPrevented",
    value: function isPrevented() {
      return this._prevented;
    }
  }]);
}();
;// CONCATENATED MODULE: ./src/utils/events/timelineKeyframeChangedEvent.ts
function timelineKeyframeChangedEvent_typeof(o) { "@babel/helpers - typeof"; return timelineKeyframeChangedEvent_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, timelineKeyframeChangedEvent_typeof(o); }
function timelineKeyframeChangedEvent_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, timelineKeyframeChangedEvent_toPropertyKey(o.key), o); } }
function timelineKeyframeChangedEvent_createClass(e, r, t) { return r && timelineKeyframeChangedEvent_defineProperties(e.prototype, r), t && timelineKeyframeChangedEvent_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function timelineKeyframeChangedEvent_toPropertyKey(t) { var i = timelineKeyframeChangedEvent_toPrimitive(t, "string"); return "symbol" == timelineKeyframeChangedEvent_typeof(i) ? i : i + ""; }
function timelineKeyframeChangedEvent_toPrimitive(t, r) { if ("object" != timelineKeyframeChangedEvent_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != timelineKeyframeChangedEvent_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function timelineKeyframeChangedEvent_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == timelineKeyframeChangedEvent_typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }

var TimelineKeyframeChangedEvent = /*#__PURE__*/function (_TimelineBaseEvent) {
  function TimelineKeyframeChangedEvent() {
    timelineKeyframeChangedEvent_classCallCheck(this, TimelineKeyframeChangedEvent);
    return _callSuper(this, TimelineKeyframeChangedEvent, arguments);
  }
  _inherits(TimelineKeyframeChangedEvent, _TimelineBaseEvent);
  return timelineKeyframeChangedEvent_createClass(TimelineKeyframeChangedEvent);
}(TimelineBaseEvent);
;// CONCATENATED MODULE: ./src/enums/timelineEventSource.ts
var TimelineEventSource = /*#__PURE__*/function (TimelineEventSource) {
  TimelineEventSource["User"] = "user";
  TimelineEventSource["Programmatically"] = "programmatically";
  TimelineEventSource["SetTimeMethod"] = "setTimeMethod";
  return TimelineEventSource;
}({});
;// CONCATENATED MODULE: ./src/utils/events/timelineTimeChangedEvent.ts
function timelineTimeChangedEvent_typeof(o) { "@babel/helpers - typeof"; return timelineTimeChangedEvent_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, timelineTimeChangedEvent_typeof(o); }
function timelineTimeChangedEvent_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, timelineTimeChangedEvent_toPropertyKey(o.key), o); } }
function timelineTimeChangedEvent_createClass(e, r, t) { return r && timelineTimeChangedEvent_defineProperties(e.prototype, r), t && timelineTimeChangedEvent_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function timelineTimeChangedEvent_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function timelineTimeChangedEvent_callSuper(t, o, e) { return o = timelineTimeChangedEvent_getPrototypeOf(o), timelineTimeChangedEvent_possibleConstructorReturn(t, timelineTimeChangedEvent_isNativeReflectConstruct() ? Reflect.construct(o, e || [], timelineTimeChangedEvent_getPrototypeOf(t).constructor) : o.apply(t, e)); }
function timelineTimeChangedEvent_possibleConstructorReturn(t, e) { if (e && ("object" == timelineTimeChangedEvent_typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return timelineTimeChangedEvent_assertThisInitialized(t); }
function timelineTimeChangedEvent_assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function timelineTimeChangedEvent_isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (timelineTimeChangedEvent_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function timelineTimeChangedEvent_getPrototypeOf(t) { return timelineTimeChangedEvent_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, timelineTimeChangedEvent_getPrototypeOf(t); }
function timelineTimeChangedEvent_inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && timelineTimeChangedEvent_setPrototypeOf(t, e); }
function timelineTimeChangedEvent_setPrototypeOf(t, e) { return timelineTimeChangedEvent_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, timelineTimeChangedEvent_setPrototypeOf(t, e); }
function timelineTimeChangedEvent_defineProperty(e, r, t) { return (r = timelineTimeChangedEvent_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function timelineTimeChangedEvent_toPropertyKey(t) { var i = timelineTimeChangedEvent_toPrimitive(t, "string"); return "symbol" == timelineTimeChangedEvent_typeof(i) ? i : i + ""; }
function timelineTimeChangedEvent_toPrimitive(t, r) { if ("object" != timelineTimeChangedEvent_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != timelineTimeChangedEvent_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


var TimelineTimeChangedEvent = /*#__PURE__*/function (_TimelineBaseEvent) {
  function TimelineTimeChangedEvent() {
    var _this;
    timelineTimeChangedEvent_classCallCheck(this, TimelineTimeChangedEvent);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = timelineTimeChangedEvent_callSuper(this, TimelineTimeChangedEvent, [].concat(args));
    /**
     * New value to be set if not prevented.
     */
    timelineTimeChangedEvent_defineProperty(_this, "val", 0);
    /**
     * previous value, that actually set at the moment.
     */
    timelineTimeChangedEvent_defineProperty(_this, "prevVal", 0);
    /**
     * Source of the change.
     */
    timelineTimeChangedEvent_defineProperty(_this, "source", TimelineEventSource.User);
    return _this;
  }
  timelineTimeChangedEvent_inherits(TimelineTimeChangedEvent, _TimelineBaseEvent);
  return timelineTimeChangedEvent_createClass(TimelineTimeChangedEvent);
}(TimelineBaseEvent);
;// CONCATENATED MODULE: ./src/enums/timelineSelectionEventSource.ts
/**
 * Timeline selection event type.
 */
var TimelineSelectionEventSource = /*#__PURE__*/function (TimelineSelectionEventSource) {
  TimelineSelectionEventSource["Keyframes"] = "keyframes";
  return TimelineSelectionEventSource;
}({});
;// CONCATENATED MODULE: ./src/utils/events/timelineSelectedEvent.ts
function timelineSelectedEvent_typeof(o) { "@babel/helpers - typeof"; return timelineSelectedEvent_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, timelineSelectedEvent_typeof(o); }
function timelineSelectedEvent_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, timelineSelectedEvent_toPropertyKey(o.key), o); } }
function timelineSelectedEvent_createClass(e, r, t) { return r && timelineSelectedEvent_defineProperties(e.prototype, r), t && timelineSelectedEvent_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function timelineSelectedEvent_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function timelineSelectedEvent_defineProperty(e, r, t) { return (r = timelineSelectedEvent_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function timelineSelectedEvent_toPropertyKey(t) { var i = timelineSelectedEvent_toPrimitive(t, "string"); return "symbol" == timelineSelectedEvent_typeof(i) ? i : i + ""; }
function timelineSelectedEvent_toPrimitive(t, r) { if ("object" != timelineSelectedEvent_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != timelineSelectedEvent_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var TimelineSelectedEvent = /*#__PURE__*/timelineSelectedEvent_createClass(function TimelineSelectedEvent() {
  timelineSelectedEvent_classCallCheck(this, TimelineSelectedEvent);
  /**
   * Selected Keyframes list.
   */
  timelineSelectedEvent_defineProperty(this, "selected", []);
  /**
   * Changed selection.
   */
  timelineSelectedEvent_defineProperty(this, "changed", []);
  /**
   * Selection mode.
   */
  timelineSelectedEvent_defineProperty(this, "mode", TimelineSelectionEventSource.Keyframes);
});
;// CONCATENATED MODULE: ./src/utils/events/timelineClickEvent.ts
function timelineClickEvent_typeof(o) { "@babel/helpers - typeof"; return timelineClickEvent_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, timelineClickEvent_typeof(o); }
function timelineClickEvent_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function timelineClickEvent_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, timelineClickEvent_toPropertyKey(o.key), o); } }
function timelineClickEvent_createClass(e, r, t) { return r && timelineClickEvent_defineProperties(e.prototype, r), t && timelineClickEvent_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function timelineClickEvent_callSuper(t, o, e) { return o = timelineClickEvent_getPrototypeOf(o), timelineClickEvent_possibleConstructorReturn(t, timelineClickEvent_isNativeReflectConstruct() ? Reflect.construct(o, e || [], timelineClickEvent_getPrototypeOf(t).constructor) : o.apply(t, e)); }
function timelineClickEvent_possibleConstructorReturn(t, e) { if (e && ("object" == timelineClickEvent_typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return timelineClickEvent_assertThisInitialized(t); }
function timelineClickEvent_assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function timelineClickEvent_isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (timelineClickEvent_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function timelineClickEvent_getPrototypeOf(t) { return timelineClickEvent_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, timelineClickEvent_getPrototypeOf(t); }
function timelineClickEvent_inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && timelineClickEvent_setPrototypeOf(t, e); }
function timelineClickEvent_setPrototypeOf(t, e) { return timelineClickEvent_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, timelineClickEvent_setPrototypeOf(t, e); }
function timelineClickEvent_defineProperty(e, r, t) { return (r = timelineClickEvent_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function timelineClickEvent_toPropertyKey(t) { var i = timelineClickEvent_toPrimitive(t, "string"); return "symbol" == timelineClickEvent_typeof(i) ? i : i + ""; }
function timelineClickEvent_toPrimitive(t, r) { if ("object" != timelineClickEvent_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != timelineClickEvent_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var TimelineClickEvent = /*#__PURE__*/function (_TimelineBaseEvent) {
  function TimelineClickEvent() {
    var _this;
    timelineClickEvent_classCallCheck(this, TimelineClickEvent);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = timelineClickEvent_callSuper(this, TimelineClickEvent, [].concat(args));
    timelineClickEvent_defineProperty(_this, "args", null);
    /**
     * All elements located under current mouse activity.
     */
    timelineClickEvent_defineProperty(_this, "elements", []);
    /**
     * Element that selected as target under the click.
     */
    timelineClickEvent_defineProperty(_this, "target", null);
    /**
     * Timeline current active drag position.
     */
    timelineClickEvent_defineProperty(_this, "point", null);
    return _this;
  }
  timelineClickEvent_inherits(TimelineClickEvent, _TimelineBaseEvent);
  return timelineClickEvent_createClass(TimelineClickEvent, [{
    key: "pos",
    get:
    /**
     * Clicked screen position.
     */
    function get() {
      var _this$point;
      return ((_this$point = this.point) === null || _this$point === void 0 ? void 0 : _this$point.pos) || null;
    }
  }, {
    key: "val",
    get: function get() {
      if (this.point) {
        return this.point.val;
      }
      return NaN;
    }
  }]);
}(TimelineBaseEvent);
;// CONCATENATED MODULE: ./src/utils/events/timelineDragEvent.ts
function timelineDragEvent_typeof(o) { "@babel/helpers - typeof"; return timelineDragEvent_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, timelineDragEvent_typeof(o); }
function timelineDragEvent_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function timelineDragEvent_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, timelineDragEvent_toPropertyKey(o.key), o); } }
function timelineDragEvent_createClass(e, r, t) { return r && timelineDragEvent_defineProperties(e.prototype, r), t && timelineDragEvent_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function timelineDragEvent_callSuper(t, o, e) { return o = timelineDragEvent_getPrototypeOf(o), timelineDragEvent_possibleConstructorReturn(t, timelineDragEvent_isNativeReflectConstruct() ? Reflect.construct(o, e || [], timelineDragEvent_getPrototypeOf(t).constructor) : o.apply(t, e)); }
function timelineDragEvent_possibleConstructorReturn(t, e) { if (e && ("object" == timelineDragEvent_typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return timelineDragEvent_assertThisInitialized(t); }
function timelineDragEvent_assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function timelineDragEvent_isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (timelineDragEvent_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function timelineDragEvent_getPrototypeOf(t) { return timelineDragEvent_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, timelineDragEvent_getPrototypeOf(t); }
function timelineDragEvent_inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && timelineDragEvent_setPrototypeOf(t, e); }
function timelineDragEvent_setPrototypeOf(t, e) { return timelineDragEvent_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, timelineDragEvent_setPrototypeOf(t, e); }
function timelineDragEvent_defineProperty(e, r, t) { return (r = timelineDragEvent_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function timelineDragEvent_toPropertyKey(t) { var i = timelineDragEvent_toPrimitive(t, "string"); return "symbol" == timelineDragEvent_typeof(i) ? i : i + ""; }
function timelineDragEvent_toPrimitive(t, r) { if ("object" != timelineDragEvent_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != timelineDragEvent_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var TimelineDragEvent = /*#__PURE__*/function (_TimelineBaseEvent) {
  function TimelineDragEvent() {
    var _this;
    timelineDragEvent_classCallCheck(this, TimelineDragEvent);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = timelineDragEvent_callSuper(this, TimelineDragEvent, [].concat(args));
    timelineDragEvent_defineProperty(_this, "args", null);
    /**
     * Elements to be dragged as a group.
     */
    timelineDragEvent_defineProperty(_this, "elements", null);
    /**
     * Target element
     */
    timelineDragEvent_defineProperty(_this, "target", null);
    /**
     * Timeline current active drag position.
     */
    timelineDragEvent_defineProperty(_this, "point", null);
    /**
     * Timeline previous drag position.
     */
    timelineDragEvent_defineProperty(_this, "prevPoint", null);
    return _this;
  }
  timelineDragEvent_inherits(TimelineDragEvent, _TimelineBaseEvent);
  return timelineDragEvent_createClass(TimelineDragEvent, [{
    key: "pos",
    get: function get() {
      var _this$point;
      return ((_this$point = this.point) === null || _this$point === void 0 ? void 0 : _this$point.pos) || null;
    }
  }]);
}(TimelineBaseEvent);
;// CONCATENATED MODULE: ./src/enums/timelineInteractionMode.ts
var TimelineInteractionMode = /*#__PURE__*/function (TimelineInteractionMode) {
  TimelineInteractionMode["Selection"] = "selection";
  TimelineInteractionMode["Pan"] = "pan";
  TimelineInteractionMode["NonInteractivePan"] = "nonInteractivePan";
  TimelineInteractionMode["Zoom"] = "zoom";
  TimelineInteractionMode["None"] = "none";
  return TimelineInteractionMode;
}({});
;// CONCATENATED MODULE: ./src/enums/timelineCursorType.ts
var TimelineCursorType = /*#__PURE__*/function (TimelineCursorType) {
  TimelineCursorType["Alias"] = "alias";
  TimelineCursorType["AllScroll"] = "all-scroll";
  TimelineCursorType["Auto"] = "auto";
  TimelineCursorType["Cell"] = "cell";
  TimelineCursorType["ContextMenu"] = "context-menu";
  TimelineCursorType["ColResize"] = "col-resize";
  TimelineCursorType["Copy"] = "copy";
  TimelineCursorType["Crosshair"] = "crosshair";
  TimelineCursorType["Default"] = "default";
  TimelineCursorType["EResize"] = "e-resize";
  TimelineCursorType["EWResize"] = "ew-resize";
  TimelineCursorType["Grab"] = "grab";
  TimelineCursorType["Grabbing"] = "grabbing";
  TimelineCursorType["Help"] = "help";
  TimelineCursorType["Move"] = "move";
  TimelineCursorType["NResize"] = "n-resize";
  TimelineCursorType["NEResize"] = "ne-resize";
  TimelineCursorType["NESWResize"] = "nesw-resize";
  TimelineCursorType["NSResize"] = "ns-resize";
  TimelineCursorType["NWResize"] = "nw-resize";
  TimelineCursorType["NWSEResize"] = "nwse-resize";
  TimelineCursorType["NoDrop"] = "no-drop";
  TimelineCursorType["None"] = "none";
  TimelineCursorType["NotAllowed"] = "not-allowed";
  TimelineCursorType["Pointer"] = "pointer";
  TimelineCursorType["Progress"] = "progress";
  TimelineCursorType["RowResize"] = "row-resize";
  TimelineCursorType["SResize"] = "s-resize";
  TimelineCursorType["SEResize"] = "se-resize";
  TimelineCursorType["SWResize"] = "sw-resize";
  TimelineCursorType["Text"] = "text";
  TimelineCursorType["WResize"] = "w-resize";
  TimelineCursorType["Wait"] = "wait";
  TimelineCursorType["ZoomIn"] = "zoom-in";
  TimelineCursorType["ZoomOut"] = "zoom-out";
  return TimelineCursorType;
}({});
;// CONCATENATED MODULE: ./src/enums/timelineCapShape.ts
var TimelineCapShape = /*#__PURE__*/function (TimelineCapShape) {
  TimelineCapShape["None"] = "none";
  TimelineCapShape["Triangle"] = "triangle";
  TimelineCapShape["Rect"] = "rect";
  return TimelineCapShape;
}({});
;// CONCATENATED MODULE: ./src/enums/timelineSelectionMode.ts
/**
 * Timeline selection mode.
 */
var TimelineSelectionMode = /*#__PURE__*/function (TimelineSelectionMode) {
  TimelineSelectionMode["Normal"] = "normal";
  TimelineSelectionMode["Append"] = "append";
  TimelineSelectionMode["Revert"] = "revert";
  return TimelineSelectionMode;
}({});
;// CONCATENATED MODULE: ./src/enums/timelineEvents.ts
/**
 * Event names of the component.
 */
var TimelineEvents = /*#__PURE__*/function (TimelineEvents) {
  TimelineEvents["Selected"] = "selected";
  TimelineEvents["TimeChanged"] = "timechanged";
  TimelineEvents["KeyframeChanged"] = "keyframeChanged";
  TimelineEvents["DragStarted"] = "dragStarted";
  TimelineEvents["Drag"] = "drag";
  TimelineEvents["DragFinished"] = "dragFinished";
  TimelineEvents["Scroll"] = "scroll";
  TimelineEvents["ScrollFinished"] = "scrollFinished";
  TimelineEvents["ContextMenu"] = "onContextMenu";
  TimelineEvents["DoubleClick"] = "doubleClick";
  TimelineEvents["MouseDown"] = "mouseDown";
  return TimelineEvents;
}({});
;// CONCATENATED MODULE: ./src/enums/timelineScrollSource.ts
var TimelineScrollSource = /*#__PURE__*/function (TimelineScrollSource) {
  TimelineScrollSource["DefaultMode"] = "none";
  TimelineScrollSource["ZoomMode"] = "zoom";
  TimelineScrollSource["ScrollBySelection"] = "scrollBySelection";
  return TimelineScrollSource;
}({});
;// CONCATENATED MODULE: ./src/settings/defaults/defaultTimelineConsts.ts
var defaultTimelineConsts = {
  /**
   * Private. Auto pan speed.
   */
  autoPanSpeed: 50,
  /**
   * Private. scroll speed when mouse drag is used (from 0 to 1)
   */
  scrollByDragSpeed: 0.12,
  /**
   * Private. Determine whether item was clicked.
   */
  clickDetectionMs: 120,
  /**
   * Private. Timeout to detect double click.
   */
  doubleClickTimeoutMs: 400,
  /**
   * Private. Time in ms used to refresh scrollbars when pan is finished.
   */
  scrollFinishedTimeoutMs: 500,
  /**
   * Private. Auto pan padding
   */
  autoPanByScrollPadding: 10,
  /**
   * Private. Click threshold
   */
  clickThreshold: 3,
  /**
   * Private. Private.Click min radius for the elements detection.
   */
  clickDetectionMinRadius: 2,
  /**
   * Private. Skip some auto pan/scroll actions if they are executed more rapid than this value.
   */
  autoPanSpeedLimit: 10,
  /**
   * Private. Default auto size for the group. It's percents.
   */
  defaultGroupHeight: 0.7
};
;// CONCATENATED MODULE: ./src/settings/defaults/defaultTimelineStyle.ts


var defaultTimelineStyle = {
  width: 2,
  marginTop: 15,
  marginBottom: 0,
  strokeColor: 'DarkOrange',
  fillColor: 'DarkOrange',
  capStyle: {
    width: 4,
    height: 10,
    /**
     * Draw timeline rectangular cap.
     */
    capType: TimelineCapShape.Rect,
    strokeColor: 'DarkOrange',
    fillColor: 'DarkOrange'
  },
  cursor: TimelineCursorType.EWResize
};
;// CONCATENATED MODULE: ./src/settings/defaults/defaultTimelineOptions.ts




var defaultTimelineOptions = {
  /**
   *  Snap all selected keyframes as a bundle during the drag.
   */
  snapAllKeyframesOnMove: false,
  /**
   * Check whether snapping is enabled.
   */
  snapEnabled: true,
  /**
   * Timeline style.
   */
  timelineStyle: defaultTimelineStyle,
  /**
   * approximate step for the timeline in pixels for 1 second
   */
  stepPx: 120,
  /**
   * Number of units that should fit into one stepPx. (1 second by a default)
   */
  stepVal: 1000,
  stepSmallPx: 30,
  /**
   * Snap step in units. from 0 to stepVal
   */
  snapStep: 200,
  /**
   * additional left margin in pixels to start the line gauge from.
   */
  leftMargin: 25,
  headerFillColor: '#101011',
  fillColor: '#101011',
  labelsColor: '#D5D5D5',
  /**
   * Header gauge tick color.
   */
  tickColor: '#D5D5D5',
  /**
   * Selection rectangle color.
   */
  selectionColor: 'White',
  /**
   * Default rows style.
   * Can be overridden by setting style individually for each row.
   */
  rowsStyle: defaultTimelineRowStyle,
  /**
   * Style for the all keyframes in a current row.
   * Individual keyframe can have own style.
   */
  keyframesStyle: defaultTimelineKeyframeStyle,
  /**
   * Style of the groups.
   */
  groupsStyle: defaultGroupStyle,
  /**
   * Header height in pixels
   */
  headerHeight: 30,
  font: '11px sans-serif',
  /**
   * Default zoom level = 1. where screen pixels are equals to the corresponding stepVal stepPx.
   */
  zoom: 1,
  /**
   * Default zoom speed.
   */
  zoomSpeed: 0.1,
  /**
   * Max zoom value.
   */
  zoomMin: 0.1,
  /**
   * Min zoom value.
   */
  zoomMax: 8,
  /**
   * Set this to true in a MAC OS environment: The Meta key will be used instead of the Ctrl key.
   */
  controlKeyIsMetaKey: false,
  /**
   * Access the scroll container via this class for e.g. scroll bar styling.
   */
  scrollContainerClass: 'scroll-container',
  /**
   * keyframes group is draggable.
   */
  groupsDraggable: true,
  /**
   * keyframes are draggable.
   */
  keyframesDraggable: true,
  /**
   * Timeline can be dragged or position can be changed by user interaction. Default: true
   */
  timelineDraggable: true,
  /**
   * Start drawing timeline from this min point.
   * Bounds for the keyframe dragging.
   */
  min: 0,
  /**
   * Max bounds timeline can navigate to.
   */
  max: Number.MAX_VALUE
};
;// CONCATENATED MODULE: ./src/timeline.ts
function timeline_typeof(o) { "@babel/helpers - typeof"; return timeline_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, timeline_typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function timeline_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function timeline_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, timeline_toPropertyKey(o.key), o); } }
function timeline_createClass(e, r, t) { return r && timeline_defineProperties(e.prototype, r), t && timeline_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function timeline_callSuper(t, o, e) { return o = timeline_getPrototypeOf(o), timeline_possibleConstructorReturn(t, timeline_isNativeReflectConstruct() ? Reflect.construct(o, e || [], timeline_getPrototypeOf(t).constructor) : o.apply(t, e)); }
function timeline_possibleConstructorReturn(t, e) { if (e && ("object" == timeline_typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return timeline_assertThisInitialized(t); }
function timeline_assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function timeline_isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (timeline_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function timeline_inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && timeline_setPrototypeOf(t, e); }
function timeline_setPrototypeOf(t, e) { return timeline_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, timeline_setPrototypeOf(t, e); }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = timeline_getPrototypeOf(t));); return t; }
function timeline_getPrototypeOf(t) { return timeline_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, timeline_getPrototypeOf(t); }
function timeline_defineProperty(e, r, t) { return (r = timeline_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function timeline_toPropertyKey(t) { var i = timeline_toPrimitive(t, "string"); return "symbol" == timeline_typeof(i) ? i : i + ""; }
function timeline_toPrimitive(t, r) { if ("object" != timeline_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != timeline_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* eslint-disable @typescript-eslint/no-explicit-any */
// bundle entry point



// @public timeline models

// @public styles




// @private helper containers.



// @private virtual model

// @public events






// @public enums








// @private defaults are exposed:




var Timeline = /*#__PURE__*/function (_TimelineEventsEmitte) {
  /**
   * Create Timeline instance
   * @param options Timeline settings.
   * @param model Timeline model.
   */
  function Timeline() {
    var _this;
    var _options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _model = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    timeline_classCallCheck(this, Timeline);
    _this = timeline_callSuper(this, Timeline);
    /**
     * component container.
     */
    timeline_defineProperty(_this, "_container", null);
    /**
     * Dynamically generated canvas inside of the container.
     */
    timeline_defineProperty(_this, "_canvas", null);
    /**
     * Dynamically generated scroll container.
     */
    timeline_defineProperty(_this, "_scrollContainer", null);
    /**
     * Dynamically generated virtual scroll content.
     * While canvas has no real size, this element is used to create virtual scroll on the parent element.
     */
    timeline_defineProperty(_this, "_scrollContent", null);
    /**
     * Rendering context
     */
    timeline_defineProperty(_this, "_ctx", null);
    /**
     * Drag start position.
     */
    timeline_defineProperty(_this, "_startPosMouseArgs", null);
    /**
     * Drag scroll started position.
     */
    timeline_defineProperty(_this, "_scrollStartPos", null);
    /**
     * Private. Current mouse position that is used to track values between mouse up/down events.
     * Can be null, use public methods and properties instead.
     */
    timeline_defineProperty(_this, "_currentPos", null);
    /**
     * Private. Current active mouse area selection rectangle displayed during the mouse up/down drag events.
     */
    timeline_defineProperty(_this, "_selectionRect", null);
    /**
     * Private. Whether selection rectangle is displayed.
     */
    timeline_defineProperty(_this, "_selectionRectEnabled", false);
    /**
     * Private. Information in regard of current active drag state.
     */
    timeline_defineProperty(_this, "_drag", null);
    timeline_defineProperty(_this, "_startedDragWithCtrl", false);
    timeline_defineProperty(_this, "_startedDragWithShiftKey", false);
    timeline_defineProperty(_this, "_scrollProgrammatically", false);
    timeline_defineProperty(_this, "_clickTimeout", null);
    timeline_defineProperty(_this, "_lastClickTime", 0);
    timeline_defineProperty(_this, "_lastClickPoint", null);
    timeline_defineProperty(_this, "_consts", defaultTimelineConsts);
    /**
     * Private. whether click is allowed.
     */
    timeline_defineProperty(_this, "_clickAllowed", false);
    /**
     * Private. scroll finished timer reference.
     */
    timeline_defineProperty(_this, "_scrollFinishedTimerRef", null);
    /**
     * Private.Current timeline position.
     * Please use public get\set methods to properly change the timeline position.
     */
    timeline_defineProperty(_this, "_val", 0);
    timeline_defineProperty(_this, "_pixelRatio", 1);
    /**
     * Private. Current zoom level. Please use publicly available properties to set zoom levels.
     */
    timeline_defineProperty(_this, "_currentZoom", 0);
    /**
     * Private. Ref for the auto pan scroll interval.
     */
    timeline_defineProperty(_this, "_intervalRef", null);
    /**
     * Private.
     * When last auto pan scroll action was started.
     */
    timeline_defineProperty(_this, "_autoPanLastActionDate", 0);
    /**
     * Private.
     * Is pan mouse interactions are started.
     */
    timeline_defineProperty(_this, "_isPanStarted", false);
    /**
     * Private.
     * Component interaction mode. Please use publicly available methods.
     */
    timeline_defineProperty(_this, "_interactionMode", TimelineInteractionMode.Selection);
    timeline_defineProperty(_this, "_lastUsedArgs", null);
    /**
     * Private.
     * Current set timeline model.
     */
    timeline_defineProperty(_this, "_model", null);
    /**
     * Private.
     * Indication when scroll are drag or click is started.
     */
    timeline_defineProperty(_this, "_scrollAreaClickOrDragStarted", false);
    /**
     * Initialize Timeline
     * @param options Timeline settings.
     * @param model Timeline model.
     */
    timeline_defineProperty(_this, "initialize", function (options, model) {
      _this._model = model;
      if (!options || !options.id) {
        throw new Error("Element cannot be empty. Should be string or DOM element.");
      }
      _this._generateContainers(options.id);
      _this._options = TimelineUtils.cloneOptions(defaultTimelineOptions);
      if (options) {
        _this._options = _this._setOptions(options);
      }
      _this._subscribeComponentEvents();
      _this.rescale();
      _this.redraw();
    });
    /**
     * Generate component html.
     * @param id container.
     */
    timeline_defineProperty(_this, "_generateContainers", function (id) {
      if (id instanceof HTMLElement) {
        _this._container = id;
      } else {
        _this._container = document.getElementById(id);
      }
      if (!_this._container) {
        throw new Error("Element cannot be empty. Should be string or DOM element.");
      }
      _this._scrollContainer = document.createElement('div');
      _this._scrollContent = document.createElement('div');
      _this._canvas = document.createElement('canvas');
      if (!_this._canvas || !_this._canvas.getContext) {
        console.log('Cannot initialize canvas context.');
        return;
      }
      _this._container.innerHTML = '';
      _this._container.style.position = 'relative';
      // Generate size container:
      _this._canvas.style.cssText = 'image-rendering: -moz-crisp-edges;' + 'image-rendering: -webkit-crisp-edges;' + 'image-rendering: pixelated;' + 'image-rendering: crisp-edges;' + 'user-select: none;' + '-webkit-user-select: none;' + '-khtml-user-select: none;' + '-moz-user-select: none;' + '-o-user-select: none;' + 'user-select: none;' + 'touch-action: none;' + 'position: relative;' + '-webkit-user-drag: none;' + '-khtml-user-drag: none;' + '-moz-user-drag: none;' + '-o-user-drag: none;' + 'user-drag: none;' + 'padding: inherit';

      // Those styles are hardcoded and required for the proper scrolling.
      _this._scrollContainer.style.cssText = 'overflow: scroll;' + 'position: absolute;' + 'width:  100%;' + 'height:  100%;';
      _this._scrollContent.style.width = _this._scrollContent.style.height = '100%';

      // add the text node to the created div
      _this._scrollContainer.appendChild(_this._scrollContent);
      _this._container.appendChild(_this._scrollContainer);
      var scrollBarWidth = _this._scrollContainer.offsetWidth - _this._scrollContent.clientWidth;
      // Calculate current browser scrollbar size and add offset for the canvas
      _this._canvas.style.width = _this._canvas.style.height = 'calc(100% -' + (scrollBarWidth || 17) + 'px)';
      _this._container.appendChild(_this._canvas);
      _this._ctx = _this._getCtx();
    });
    /**
     * Subscribe current component on the related events.
     * Private. Use initialize method instead.
     */
    timeline_defineProperty(_this, "_subscribeComponentEvents", function () {
      // Allow to call event multiple times, revoke current subscription and subscribe again.
      _this._unsubscribeComponentEvents();
      if (!_this._container || !_this._scrollContainer || !_this._canvas) {
        throw Error("Cannot subscribe on scroll events while one of the containers is null or empty. Please call initialize method first");
      }
      if (_this._container) {
        _this._container.addEventListener('wheel', _this._handleWheelEvent);
      }
      if (_this._scrollContainer) {
        _this._scrollContainer.addEventListener('scroll', _this._handleScrollEvent);
        _this._scrollContainer.addEventListener('touchstart', _this._handleScrollMouseDownEvent);
        _this._scrollContainer.addEventListener('mousedown', _this._handleScrollMouseDownEvent);
      }
      document.addEventListener('keyup', _this._handleKeyUp, false);
      document.addEventListener('keydown', _this._handleKeyDown, false);
      window.addEventListener('blur', _this._handleBlurEvent, false);
      window.addEventListener('resize', _this._handleWindowResizeEvent, false);
      if (_this._canvas) {
        _this._canvas.addEventListener('touchstart', _this._handleMouseDownEvent, false);
        _this._canvas.addEventListener('mousedown', _this._handleMouseDownEvent, false);
        _this._canvas.addEventListener('contextmenu', _this._handleContextMenu, false);
      }
      window.addEventListener('mousemove', _this._handleMouseMoveEvent, false);
      window.addEventListener('touchmove', _this._handleMouseMoveEvent, false);
      window.addEventListener('mouseup', _this._handleMouseUpEvent, false);
      window.addEventListener('touchend', _this._handleMouseUpEvent, false);
    });
    /**
     * Private. Use dispose method instead.
     */
    timeline_defineProperty(_this, "_unsubscribeComponentEvents", function () {
      var _this$_container;
      (_this$_container = _this._container) === null || _this$_container === void 0 || _this$_container.removeEventListener('wheel', _this._handleWheelEvent);
      if (_this._scrollContainer) {
        _this._scrollContainer.removeEventListener('scroll', _this._handleScrollEvent);
        _this._scrollContainer.removeEventListener('touchstart', _this._handleScrollMouseDownEvent);
        _this._scrollContainer.removeEventListener('mousedown', _this._handleScrollMouseDownEvent);
      } else {
        console.warn("Cannot unsubscribe scroll while it's already empty");
      }
      window.removeEventListener('blur', _this._handleBlurEvent);
      window.removeEventListener('resize', _this._handleWindowResizeEvent);
      document.removeEventListener('keydown', _this._handleKeyDown);
      document.removeEventListener('keyup', _this._handleKeyUp);
      if (_this._canvas) {
        _this._canvas.removeEventListener('touchstart', _this._handleMouseDownEvent);
        _this._canvas.removeEventListener('mousedown', _this._handleMouseDownEvent);
        _this._canvas.removeEventListener('contextmenu', _this._handleContextMenu);
      } else {
        console.warn("Cannot unsubscribe canvas while it's already empty");
      }
      window.removeEventListener('mousemove', _this._handleMouseMoveEvent);
      window.removeEventListener('touchmove', _this._handleMouseMoveEvent);
      window.removeEventListener('mouseup', _this._handleMouseUpEvent);
      window.removeEventListener('touchend', _this._handleMouseUpEvent);
    });
    /**
     * Dispose current component: unsubscribe component and user events.
     */
    timeline_defineProperty(_this, "dispose", function () {
      // Unsubscribe all user events.
      _this.offAll();
      // Stop times
      _this._stopAutoPan();
      _this._clearScrollFinishedTimer();
      _this._unsubscribeComponentEvents();
      if (_this._container) {
        _this._container.innerHTML = '';
      }
      _this._container = null;
      _this._canvas = null;
      _this._scrollContainer = null;
      _this._scrollContent = null;
      _this._ctx = null;
      _this._cleanUpSelection();
    });
    /**
     * On key up is received.
     */
    timeline_defineProperty(_this, "_handleKeyUp", function (event) {
      if (_this._interactionMode === TimelineInteractionMode.Zoom) {
        _this._setZoomCursor(event);
      }
    });
    /**
     * On key down is received.
     */
    timeline_defineProperty(_this, "_handleKeyDown", function (event) {
      if (_this._interactionMode === TimelineInteractionMode.Zoom) {
        _this._setZoomCursor(event);
      }
    });
    timeline_defineProperty(_this, "_setZoomCursor", function (e) {
      if (_this._controlKeyPressed(e)) {
        _this._setCursor(TimelineCursorType.ZoomOut);
      } else {
        _this._setCursor(TimelineCursorType.ZoomIn);
      }
    });
    timeline_defineProperty(_this, "_handleBlurEvent", function () {
      _this._cleanUpSelection(true);
    });
    timeline_defineProperty(_this, "_handleWindowResizeEvent", function () {
      // Rescale and redraw
      _this.rescale();
      _this.redraw();
    });
    timeline_defineProperty(_this, "_clearScrollFinishedTimer", function () {
      if (_this._scrollFinishedTimerRef) {
        clearTimeout(_this._scrollFinishedTimerRef);
        _this._scrollFinishedTimerRef = null;
      }
    });
    timeline_defineProperty(_this, "_handleScrollMouseDownEvent", function () {
      _this._scrollAreaClickOrDragStarted = true;
    });
    timeline_defineProperty(_this, "_handleScrollEvent", function (args) {
      var scrollProgrammatically = _this._scrollProgrammatically;
      if (_this._scrollProgrammatically) {
        _this._scrollProgrammatically = false;
      }
      // Stop previous running timeout.
      _this._clearScrollFinishedTimer();
      // Set a timeout to run event 'scrolling end'.
      // Auto scroll is used to repeat scroll when drag element or select items outside of the visible area.
      _this._scrollFinishedTimerRef = window.setTimeout(function () {
        if (!_this._isPanStarted) {
          _this._clearScrollFinishedTimer();
          _this.rescale();
          _this.redraw();
        }
        _this._emitScrollEvent(args, scrollProgrammatically, TimelineEvents.ScrollFinished);
      }, _this._consts.scrollFinishedTimeoutMs);
      _this.redraw();
      _this._emitScrollEvent(args, scrollProgrammatically);
    });
    timeline_defineProperty(_this, "_controlKeyPressed", function (e) {
      if (!_this._options || _this._options.controlKeyIsMetaKey === undefined) {
        return e.metaKey || e.ctrlKey;
      }
      return _this._options.controlKeyIsMetaKey || _this._options.controlKeyIsMetaKey ? e.metaKey : e.ctrlKey;
    });
    timeline_defineProperty(_this, "_handleWheelEvent", function (event) {
      if (!_this._scrollContainer || !_this._canvas) {
        // Component is not initialized yet.
        return;
      }
      if (_this._controlKeyPressed(event)) {
        event.preventDefault();
        var mousePosArguments = _this._getMousePos(_this._canvas, event);
        var mousePos = Math.max(0, mousePosArguments.pos.x || 0);
        _this._zoom(TimelineUtils.sign(event.deltaY), _this._options.zoomSpeed || 0, mousePos);
      } else {
        _this.scrollTop = _this._scrollContainer.scrollTop + event.deltaY;
        event.preventDefault();
      }
    });
    timeline_defineProperty(_this, "_zoom", function (direction, speed, x) {
      if (speed && speed > 0 && speed <= 1) {
        var deltaSpeed = TimelineUtils.getDistance(_this._canvasClientWidth() / 2, x) * 0.2;
        x = x + deltaSpeed;
        var diff = _this._canvasClientWidth() / x;
        var val = _this._fromScreen(x);
        var zoom = direction * _this._currentZoom * speed;
        //this._options.zoom
        _this._currentZoom = _this._setZoom(_this._currentZoom + zoom);
        // Get only after zoom is set
        var zoomCenter = _this.valToPx(val);
        var newScrollLeft = Math.round(zoomCenter - _this._canvasClientWidth() / diff);
        if (newScrollLeft <= 0) {
          newScrollLeft = 0;
        }
        _this._rescaleInternal(newScrollLeft + _this._canvasClientWidth(), null, TimelineScrollSource.ZoomMode);
        _this.scrollLeft = newScrollLeft;
        _this.redraw();
      }
    });
    /**
     * Zoom in
     * @param speed value from 0 to 1
     */
    timeline_defineProperty(_this, "zoomIn", function () {
      var _this$_scrollContaine;
      var speed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this._options.zoomSpeed;
      var width = ((_this$_scrollContaine = _this._scrollContainer) === null || _this$_scrollContaine === void 0 ? void 0 : _this$_scrollContaine.clientWidth) || 0;
      if (speed && width) {
        _this._zoom(1, speed, width / 2);
      }
    });
    /**
     * Zoom out.
     * @param speed value from 0 to 1
     */
    timeline_defineProperty(_this, "zoomOut", function () {
      var _this$_scrollContaine2;
      var speed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this._options.zoomSpeed;
      var width = ((_this$_scrollContaine2 = _this._scrollContainer) === null || _this$_scrollContaine2 === void 0 ? void 0 : _this$_scrollContaine2.clientWidth) || 0;
      if (speed && width) {
        _this._zoom(-1, speed, width / 2);
      }
    });
    /**
     * Set direct zoom value.
     * @param zoom zoom value to set. percent 0-1 and etc.
     * @param min min zoom.
     * @param max max zoom.
     * @return normalized value.
     */
    timeline_defineProperty(_this, "_setZoom", function (zoom) {
      var _this$_options, _this$_options2;
      var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      min = TimelineUtils.isNumber(min) ? min : (_this$_options = _this._options) === null || _this$_options === void 0 ? void 0 : _this$_options.zoomMin;
      max = TimelineUtils.isNumber(max) ? max : (_this$_options2 = _this._options) === null || _this$_options2 === void 0 ? void 0 : _this$_options2.zoomMax;
      if (TimelineUtils.isNumber(zoom)) {
        zoom = TimelineUtils.keepInBounds(zoom, min, max);
        zoom = zoom || 1;
        _this._currentZoom = zoom;
        return zoom;
      }
      return zoom;
    });
    /**
     * Set direct zoom value.
     * @public
     * @param zoom zoom value to set. percent 0-1 and etc.
     * @return normalized value.
     */
    timeline_defineProperty(_this, "setZoom", function (zoom) {
      var prevZoom = _this.getZoom();
      if (prevZoom !== zoom) {
        var zoomSet = _this._setZoom(zoom);
        if (prevZoom != zoomSet) {
          _this.rescale();
          _this.redraw();
          return zoomSet;
        }
      }
      return prevZoom;
    });
    /**
     * Get current zoom level.
     */
    timeline_defineProperty(_this, "getZoom", function () {
      if (TimelineUtils.isNumber(_this._currentZoom)) {
        return _this._currentZoom || 1;
      }
      return 1;
    });
    timeline_defineProperty(_this, "_getClickDetectionRadius", function (point) {
      var defaultValue = _this._consts.clickDetectionMinRadius || 1;
      return Math.max(defaultValue, (point === null || point === void 0 ? void 0 : point.radius) || defaultValue);
    });
    timeline_defineProperty(_this, "_handleContextMenu", function (args) {
      // Prevent drag of the canvas if canvas is selected as text:
      TimelineUtils.clearBrowserSelection();
      if (!_this._canvas || !_this._scrollContainer) {
        _this._cleanUpSelection();
        return;
      }
      var mousePosTimeline = _this._trackMousePos(_this._canvas, args);
      var clickRadius = _this._getClickDetectionRadius(mousePosTimeline);
      var elements = _this.elementFromPoint(mousePosTimeline.pos, clickRadius, []);
      var target = _this._findDraggableElement(elements, mousePosTimeline.val);
      // Create click event
      var event = new TimelineClickEvent();
      event.point = mousePosTimeline;
      event.args = args;
      // all elements under the click:
      event.elements = elements;
      // target element.
      event.target = target;
      _get((_this, timeline_getPrototypeOf(Timeline.prototype)), "emit", _this).call(_this, TimelineEvents.ContextMenu, event);
    });
    /**
     * @param args
     */
    timeline_defineProperty(_this, "_handleMouseDownEvent", function (args) {
      // Prevent drag of the canvas if canvas is selected as text:
      TimelineUtils.clearBrowserSelection();
      if (!_this._canvas || !_this._scrollContainer) {
        _this._cleanUpSelection();
        return;
      }
      _this._startPosMouseArgs = _this._trackMousePos(_this._canvas, args);
      if (!_this._startPosMouseArgs) {
        return;
      }
      var isDoubleClick = Date.now() - _this._lastClickTime < _this._consts.doubleClickTimeoutMs;
      // Don't allow to perform double click if mouse was moved to far.
      if (_this._lastClickPoint && _this._startPosMouseArgs && TimelineUtils.getDistance(_this._lastClickPoint.x, _this._lastClickPoint.y, _this._startPosMouseArgs.pos.x, _this._startPosMouseArgs.pos.y) > _this._consts.clickThreshold) {
        isDoubleClick = false;
      }
      _this._lastClickPoint = _this._startPosMouseArgs.pos;
      _this._scrollStartPos = {
        x: _this._scrollContainer.scrollLeft,
        y: _this._scrollContainer.scrollTop
      };
      _this._clickAllowed = true;
      var onlyElements = null;
      if (_this._interactionMode === TimelineInteractionMode.NonInteractivePan || _this._interactionMode === TimelineInteractionMode.None) {
        // Allow to select only timeline. Timeline position can be disabled/enabled by properties.
        onlyElements = [TimelineElementType.Timeline];
      }
      var clickRadius = _this._getClickDetectionRadius(_this._startPosMouseArgs);
      var elements = _this.elementFromPoint(_this._startPosMouseArgs.pos, clickRadius, onlyElements);
      var target = _this._findDraggableElement(elements, _this._startPosMouseArgs.val);
      // Create click event
      var event = new TimelineClickEvent();
      event.point = _this._startPosMouseArgs;
      event.args = args;
      // all elements under the click:
      event.elements = elements;
      // target element.
      event.target = target;
      if (isDoubleClick) {
        _get((_this, timeline_getPrototypeOf(Timeline.prototype)), "emit", _this).call(_this, TimelineEvents.DoubleClick, event);
        return;
      }
      _get((_this, timeline_getPrototypeOf(Timeline.prototype)), "emit", _this).call(_this, TimelineEvents.MouseDown, event);
      _this._clickTimeout = Date.now();
      _this._lastClickTime = Date.now();
      if (event.isPrevented()) {
        // Mouse up will be also prevented
        _this._cleanUpSelection();
        return;
      }
      _this._currentPos = _this._startPosMouseArgs;

      // Select keyframes on mouse down
      if (target && _this._interactionMode !== TimelineInteractionMode.Zoom) {
        _this._drag = new TimelineDraggableData();
        _this._drag.val = target.val;
        _this._drag.type = target.type;
        _this._drag.target = _this._setElementDragState(target, target.val);
        if (target.type === TimelineElementType.Keyframe) {
          var _target$keyframe;
          _this._startedDragWithCtrl = _this._controlKeyPressed(args);
          _this._startedDragWithShiftKey = args.shiftKey;
          // get all related selected keyframes if we are selecting one.
          if (target !== null && target !== void 0 && target.keyframe && !(target !== null && target !== void 0 && (_target$keyframe = target.keyframe) !== null && _target$keyframe !== void 0 && _target$keyframe.selected) && !_this._controlKeyPressed(args)) {
            _this._selectInternal(target.keyframe);
          }
          // Allow to drag all selected keyframes on a screen
          _this._drag.elements = _this.getSelectedElements().map(function (element) {
            return _this._setElementDragState(element, element.val);
          });
        } else if (target.type === TimelineElementType.Group) {
          var keyframes = _this._drag.target.keyframes;
          if (keyframes && Array.isArray(keyframes)) {
            _this._drag.elements = keyframes.map(function (keyframe) {
              var _this$_drag;
              return _this._setElementDragState(_this._convertToTimelineElement(((_this$_drag = _this._drag) === null || _this$_drag === void 0 ? void 0 : _this$_drag.target.row) || null, keyframe), keyframe.val);
            });
          }
        } else {
          _this._drag.elements = [_this._drag.target];
        }
      }
      _this.redraw();
    });
    timeline_defineProperty(_this, "_setElementDragState", function (element, val) {
      var state = element;
      state.prevVal = state.val;
      if (state.startedVal === undefined || state.startedVal === null) {
        state.startedVal = val;
      }
      if (state.prevVal === undefined || state.prevVal === null) {
        state.prevVal = val;
      }
      state.val = val;
      return state;
    });
    /**
     * Check is mouse left button is clicked.
     */
    timeline_defineProperty(_this, "isLeftButtonClicked", function (args) {
      return !!args && args.buttons == 1;
    });
    /**
     * Browser mouse move handler.
     */
    timeline_defineProperty(_this, "_handleMouseMoveEvent", function (args) {
      if (!args) {
        args = _this._lastUsedArgs;
      } else {
        _this._lastUsedArgs = args;
      }
      if (!args || !_this._canvas) {
        return;
      }
      var touchEventArgs = args;
      var isTouch = touchEventArgs.changedTouches && touchEventArgs.changedTouches.length > 0;
      _this._currentPos = _this._trackMousePos(_this._canvas, args);
      if (!_this._isPanStarted && _this._selectionRect && _this._clickTimeoutIsOver()) {
        // TODO: implement selection by rect
        if (_this._interactionMode === TimelineInteractionMode.None || _this._interactionMode === TimelineInteractionMode.Zoom || _this._interactionMode === TimelineInteractionMode.NonInteractivePan) {
          _this._selectionRectEnabled = false;
        } else {
          _this._selectionRectEnabled = true;
        }
      } else {
        _this._selectionRectEnabled = false;
      }
      args = args;
      var isLeftClicked = _this.isLeftButtonClicked(args);
      if (!isLeftClicked) {
        _this._scrollAreaClickOrDragStarted = false;
      }
      // On dragging is started.
      if (_this._startPosMouseArgs) {
        // On left button is on hold by the user
        if (isLeftClicked || isTouch) {
          if (_this._drag && !_this._startedDragWithCtrl) {
            var convertedVal = _this._currentPos.val;
            if (_this._drag.type === TimelineElementType.Timeline) {
              _this._setTimeInternal(convertedVal, TimelineEventSource.User);
            } else if ((_this._drag.type == TimelineElementType.Keyframe || _this._drag.type == TimelineElementType.Group) && _this._drag.elements) {
              var offset = Math.floor(convertedVal - _this._drag.val);
              var movedOffset = _this._moveElements(offset, _this._drag.elements, TimelineEventSource.User);
              if (movedOffset !== 0) {
                if (!_this._drag.changed) {
                  _this._drag.prevVal = _this._drag.val;
                  var eventArgs = _this._emitDragStartedEvent(_this._drag);
                  if (!eventArgs || eventArgs.isPrevented()) {
                    // Cleanup drag here, so drag finished will be ignored.
                    _this._cleanUpSelection(true);
                    _this._drag = null;
                    return;
                  }
                }
                _this._drag.changed = true;
                _this._drag.val += offset;
                _this._emitDragEvent(_this._drag);
              }
            }
          }
          if ((_this._interactionMode === TimelineInteractionMode.Pan || _this._interactionMode === TimelineInteractionMode.NonInteractivePan) && !_this._drag) {
            _this._isPanStarted = true;
            _this._setCursor(TimelineCursorType.Grabbing);
            // Track scroll by drag.
            _this._scrollByPan(_this._startPosMouseArgs.pos, _this._currentPos.pos, _this._scrollStartPos);
          } else {
            if (_this._interactionMode !== TimelineInteractionMode.None) {
              // Track scroll by mouse or touch out of the area.
              _this._scrollBySelectionOutOfBounds(_this._currentPos.pos);
            }
          }
          _this.redraw();
        } else {
          // Fallback. Cancel mouse move when focus was lost and mouse down is still counted.
          _this._cleanUpSelection(true);
          _this.redraw();
        }
      } else if (!isTouch) {
        // Set mouse over cursors
        var onlyElements = null;
        if (_this._interactionMode === TimelineInteractionMode.NonInteractivePan || _this._interactionMode === TimelineInteractionMode.None) {
          // Allow to select only timeline. Timeline position can be disabled/enabled by properties.
          onlyElements = [TimelineElementType.Timeline];
        }
        var clickRadius = _this._getClickDetectionRadius(_this._currentPos);
        var elements = _this.elementFromPoint(_this._currentPos.pos, clickRadius, onlyElements);
        var target = _this._findDraggableElement(elements, _this._currentPos.val);
        if (_this._isPanStarted || _this._interactionMode === TimelineInteractionMode.Pan || _this._interactionMode === TimelineInteractionMode.NonInteractivePan) {
          if (isLeftClicked) {
            _this._setCursor(TimelineCursorType.Grabbing);
          } else {
            _this._setCursor(TimelineCursorType.Grab);
          }
        } else {
          if (_this._interactionMode === TimelineInteractionMode.Zoom) {
            _this._setZoomCursor(args);
            return;
          } else {
            _this._setCursor(TimelineCursorType.Default);
          }
        }
        if (target) {
          var cursor = null;
          if (target.type === TimelineElementType.Group) {
            cursor = cursor || TimelineCursorType.EWResize;
          } else if (target.type == TimelineElementType.Keyframe) {
            cursor = cursor || TimelineCursorType.Pointer;
          } else if (target.type == TimelineElementType.Timeline) {
            var _this$_options3;
            cursor = cursor || ((_this$_options3 = _this._options) === null || _this$_options3 === void 0 || (_this$_options3 = _this$_options3.timelineStyle) === null || _this$_options3 === void 0 ? void 0 : _this$_options3.cursor) || null;
          }
          if (cursor) {
            _this._setCursor(cursor);
          }
        }
      }
      if (isTouch) {
        args.preventDefault();
      }
    });
    /**
     * Mouse up handler.
     */
    timeline_defineProperty(_this, "_handleMouseUpEvent", function (args) {
      _this._scrollAreaClickOrDragStarted = false;
      if (!_this._canvas) {
        return;
      }
      if (_this._startPosMouseArgs) {
        //window.releaseCapture();
        var pos = _this._trackMousePos(_this._canvas, args);

        // Click detection.
        if (_this._clickAllowed || !_this._clickTimeoutIsOver() || _this._drag && (_this._startedDragWithCtrl || _this._startedDragWithShiftKey)) {
          if (_this._options && _this._interactionMode === TimelineInteractionMode.Zoom) {
            var direction = _this._controlKeyPressed(args) ? 1 : -1;
            var mouseArgs = _this._getMousePos(_this._canvas, args);
            var mousePos = Math.max(0, mouseArgs.pos.x || 0);
            _this._zoom(direction, _this._options.zoomSpeed || 0, mousePos);
          } else {
            _this._performClick(pos, _this._drag);
          }
        } else if (!_this._drag && _this._selectionRect && _this._selectionRectEnabled) {
          if (_this._interactionMode === TimelineInteractionMode.Zoom) {
            // TODO: implement zoom by screen rect.
          } else if (_this._interactionMode !== TimelineInteractionMode.None) {
            var keyframes = _this._getKeyframesByRectangle(_this._selectionRect);
            var selectionMode = args.shiftKey ? TimelineSelectionMode.Append : TimelineSelectionMode.Normal;
            _this.select(keyframes, selectionMode);
          }
        }
        _this._cleanUpSelection();
        _this.redraw();
      }
    });
    /**
     * Canvas client height.
     */
    timeline_defineProperty(_this, "_canvasClientHeight", function () {
      if (_this._canvas) {
        return _this._canvas.clientHeight;
      }
      return 0;
    });
    /**
     * Canvas client width.
     */
    timeline_defineProperty(_this, "_canvasClientWidth", function () {
      if (_this._canvas) {
        return _this._canvas.clientWidth;
      }
      return 0;
    });
    /**
     * Get all keyframes under the screen rectangle.
     * @param screenRect screen coordinates to get keyframes.
     */
    timeline_defineProperty(_this, "_getKeyframesByRectangle", function (screenRect) {
      var keyframesModels = [];
      _this._forEachKeyframe(function (keyframeViewModel) {
        var intersects = keyframeViewModel.shape === TimelineKeyframeShape.Rect ? TimelineUtils.isRectIntersects(keyframeViewModel.size, screenRect) : TimelineUtils.isOverlap(keyframeViewModel.size.x, keyframeViewModel.size.y, screenRect);
        if (intersects) {
          keyframesModels.push(keyframeViewModel.model);
        }
      });
      return keyframesModels;
    });
    /**
     * Private.
     * Perform timeline click.
     */
    timeline_defineProperty(_this, "_performClick", function (pos, drag) {
      var isChanged = false;
      if (drag && drag.type === TimelineElementType.Keyframe) {
        var _drag$target, _this$_options4;
        var mode = TimelineSelectionMode.Normal;
        if (_this._startedDragWithCtrl && _this._controlKeyPressed(pos.args)) {
          if (_this._controlKeyPressed(pos.args)) {
            mode = TimelineSelectionMode.Revert;
          }
        } else if (_this._startedDragWithShiftKey && pos.args.shiftKey) {
          mode = TimelineSelectionMode.Append;
        }
        // Reverse selected keyframe selection by a click:
        isChanged = _this._selectInternal((drag === null || drag === void 0 || (_drag$target = drag.target) === null || _drag$target === void 0 ? void 0 : _drag$target.keyframe) || null, mode).selectionChanged || isChanged;
        if (pos.args.shiftKey && ((_this$_options4 = _this._options) === null || _this$_options4 === void 0 ? void 0 : _this$_options4.timelineDraggable) !== false) {
          // Set current timeline position if it's not a drag or selection rect small or fast click.
          isChanged = _this._setTimeInternal(pos.val, TimelineEventSource.User) || isChanged;
        }
      } else {
        var _this$_options5;
        // deselect keyframes if any:
        isChanged = _this._selectInternal(null).selectionChanged || isChanged;
        if (((_this$_options5 = _this._options) === null || _this$_options5 === void 0 ? void 0 : _this$_options5.timelineDraggable) !== false) {
          // change timeline pos:
          // Set current timeline position if it's not a drag or selection rect small or fast click.
          isChanged = _this._setTimeInternal(pos.val, TimelineEventSource.User) || isChanged;
        }
      }
      return isChanged;
    });
    /**
     * Set keyframe value.
     * @param keyframe
     * @param value
     * @return set value.
     */
    timeline_defineProperty(_this, "_setKeyframePos", function (element, value) {
      var source = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TimelineEventSource.Programmatically;
      if (!element || !element.keyframe) {
        return value;
      }
      value = Math.floor(value);
      if (element.keyframe && element.keyframe.val != value) {
        element.prevVal = element.val;
        element.val = value;
        element.keyframe.val = value;
        var event = _this._emitKeyframeChanged(element, source);
        if (event.isPrevented()) {
          element.val = event.prevVal;
          element.keyframe.val = event.prevVal;
        }
        return value;
      }
      return value;
    });
    /**
     * @param cursor to set.
     */
    timeline_defineProperty(_this, "_setCursor", function (cursor) {
      if (_this._canvas && _this._canvas.style.cursor != cursor) {
        _this._canvas.style.cursor = cursor;
      }
    });
    /**
     * Set component interaction mode.
     */
    timeline_defineProperty(_this, "setInteractionMode", function (mode) {
      if (_this._interactionMode != mode) {
        _this._interactionMode = mode;
        // Avoid any conflicts with other modes, clean current state.
        _this._cleanUpSelection(true);
        _this.redraw();
      }
    });
    /**
     * Get current interaction mode.
     */
    timeline_defineProperty(_this, "getInteractionMode", function () {
      return _this._interactionMode;
    });
    /**
     * Private.
     * Helper method. Convert model element  to timeline element.
     */
    timeline_defineProperty(_this, "_convertToTimelineElement", function (rowModel, keyframe) {
      var data = {
        type: TimelineElementType.Keyframe,
        val: keyframe.val,
        keyframe: keyframe,
        row: rowModel
      };
      return data;
    });
    timeline_defineProperty(_this, "getSelectedKeyframes", function () {
      var selected = _this.getSelectedElements();
      return selected.map(function (p) {
        return p.keyframe;
      });
    });
    /**
     * Get selected timeline elements.
     */
    timeline_defineProperty(_this, "getSelectedElements", function () {
      var selected = [];
      _this._forEachKeyframe(function (keyframe) {
        if (keyframe && keyframe.model.selected) {
          selected.push(_this._convertToTimelineElement(keyframe.rowViewModel.model, keyframe.model));
        }
        return;
      });
      return selected;
    });
    /**
     * Get all keyframe models available in the model.
     */
    timeline_defineProperty(_this, "getAllKeyframes", function () {
      var keyframes = [];
      _this._forEachKeyframe(function (keyframe) {
        keyframes.push(keyframe.model);
      });
      return keyframes;
    });
    timeline_defineProperty(_this, "selectAllKeyframes", function () {
      return _this.select(_this.getAllKeyframes(), TimelineSelectionMode.Normal);
    });
    timeline_defineProperty(_this, "deselectAll", function () {
      return _this.select(null);
    });
    timeline_defineProperty(_this, "_changeNodeState", function (state, node, value) {
      if (node.selected !== value) {
        var selectable = typeof node.selectable === 'boolean' ? node.selectable : true;
        if (!value || value && selectable) {
          node.selected = value;
          state.changed.push(node);
          return true;
        }
      }
      return false;
    });
    timeline_defineProperty(_this, "select", function (nodes) {
      var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : TimelineSelectionMode.Normal;
      var results = _this._selectInternal(nodes, mode);
      if (results.selectionChanged) {
        _this.redraw();
      }
      return results;
    });
    /**
     * Select keyframes
     * @param nodes keyframe or list of the keyframes to be selected.
     * @param mode selection mode.
     */
    timeline_defineProperty(_this, "_selectInternal", function (nodes) {
      var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : TimelineSelectionMode.Normal;
      if (!nodes) {
        nodes = [];
      }
      if (!Array.isArray(nodes)) {
        nodes = [nodes];
      }
      var state = {
        selectionChanged: false,
        selected: _this.getSelectedKeyframes(),
        changed: []
      };
      var nodesArray = nodes;
      //const state = this.selectedSubject.getValue();
      if (nodesArray && mode === TimelineSelectionMode.Append) {
        nodes.forEach(function (node) {
          var changed = _this._changeNodeState(state, node, true);
          if (changed && node.selected) {
            state.selected.push(node);
          }
        });
      } else if (nodesArray && mode === TimelineSelectionMode.Revert) {
        nodes.forEach(function (node) {
          if (state.selected.indexOf(node) >= 0) {
            _this._changeNodeState(state, node, false);
            TimelineUtils.deleteElement(state.selected, node);
          } else {
            _this._changeNodeState(state, node, true);
            if (node.selected) {
              state.selected.push(node);
            }
          }
        });
      } else if (mode === TimelineSelectionMode.Normal) {
        var selectedItems = [];
        if (nodes) {
          nodes.forEach(function (node) {
            _this._changeNodeState(state, node, true);
            if (node.selected) {
              selectedItems.push(node);
            }
          });
        }
        state.selected.forEach(function (node) {
          var exists = nodesArray.indexOf(node) >= 0;
          // Deselect
          if (!exists) {
            _this._changeNodeState(state, node, false);
          }
        });
        if (state.changed.length > 0) {
          if (selectedItems) {
            state.selected = selectedItems;
          } else {
            state.selected.length = 0;
          }
        }
      }
      if (state.changed.length > 0) {
        state.selectionChanged = true;
        _this._emitKeyframesSelected(state);
      }
      return state;
    });
    /**
     * Automatically pan. Scroll canvas when selection is made and mouse outside of the bounds.
     */
    timeline_defineProperty(_this, "_startAutoPan", function () {
      if (_this._consts.autoPanSpeed) {
        if (!_this._intervalRef) {
          // Repeat move calls to
          _this._intervalRef = window.setInterval(function () {
            _this._handleMouseMoveEvent(null);
          }, _this._consts.autoPanSpeed);
        }
      }
    });
    /**
     * Stop current running auto pan
     */
    timeline_defineProperty(_this, "_stopAutoPan", function () {
      if (_this._intervalRef) {
        clearInterval(_this._intervalRef);
        _this._intervalRef = null;
      }
      _this._autoPanLastActionDate = 0;
    });
    /**
     * Convert value to local screen component coordinates.
     */
    timeline_defineProperty(_this, "_toScreenPx", function (val) {
      return _this.valToPx(val) - _this.scrollLeft + _this._leftMargin();
    });
    /**
     * Convert screen local coordinates to a global value info.
     */
    timeline_defineProperty(_this, "_fromScreen", function (px) {
      return _this.pxToVal(_this.scrollLeft + px - _this._leftMargin());
    });
    /**
     * Convert area value to global screen pixel coordinates.
     */
    timeline_defineProperty(_this, "valToPx", function (val) {
      if (!_this._options || !_this._options.stepPx) {
        return val;
      }
      var min = _this._options.min || 0;
      if (!TimelineUtils.isNumber(min)) {
        min = 0;
      }
      min *= _this._currentZoom || 1;
      var steps = (_this._options.stepVal || 0) * _this._currentZoom || 1;
      return (-min + val) * (_this._options.stepPx / steps);
    });
    /**
     * Convert mouse position to the timeline units considering all the scrolling and offsets.
     */
    timeline_defineProperty(_this, "_mousePosToVal", function (x) {
      var snapEnabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var mousePos = Math.min(x, _this._canvasClientWidth());
      var convertedVal = _this._fromScreen(mousePos);
      convertedVal = Math.round(convertedVal);
      if (snapEnabled) {
        convertedVal = _this.snapVal(convertedVal);
      }
      return convertedVal;
    });
    /**
     * Format line gauge text.
     * Default formatting is HMS
     * @param ms milliseconds to convert.
     * @param isSeconds whether seconds are passed.
     */
    timeline_defineProperty(_this, "_formatUnitsText", function (ms) {
      var sign = TimelineUtils.sign(ms) < 0 ? '-' : '';
      ms = Math.abs(ms);
      // 1- Convert to seconds:
      var seconds = ms / 1000;
      var year = Math.floor(seconds / (365 * 86400));
      seconds = seconds % (365 * 86400);
      var days = Math.floor(seconds / 86400);
      seconds = seconds % 86400;

      // 2- Extract hours:
      var hours = Math.floor(seconds / 3600); // 3,600 seconds in 1 hour
      seconds = seconds % 3600; // seconds remaining after extracting hours
      // 3- Extract minutes:
      var minutes = Math.floor(seconds / 60); // 60 seconds in 1 minute
      // 4- Keep only seconds not extracted to minutes:
      seconds = seconds % 60;
      var str = '';
      if (year) {
        str += year + ':';
      }
      if (days) {
        str += days + ':';
      }
      if (hours) {
        str += hours + ':';
      }
      if (minutes) {
        str += hours ? TimelineUtils.timePadZero(minutes) : minutes + ':';
      }
      if (!isNaN(seconds)) {
        str += minutes ? TimelineUtils.timePadZero(seconds) : seconds;
      }
      return sign + str;
    });
    /**
     * Left padding of the timeline.
     */
    timeline_defineProperty(_this, "_leftMargin", function () {
      var _this$_options6;
      return ((_this$_options6 = _this._options) === null || _this$_options6 === void 0 ? void 0 : _this$_options6.leftMargin) || 0;
    });
    /**
     * Private.
     * Render line gauge ticks.
     */
    timeline_defineProperty(_this, "_renderTicks", function () {
      var _this$_options7;
      if (!_this._ctx || !_this._ctx.canvas || _this._ctx.canvas.clientWidth <= 0 || _this._ctx.canvas.clientHeight <= 0 || !_this._options || !_this._options.stepPx) {
        return;
      }
      var screenWidth = _this._canvasClientWidth() - _this._leftMargin();
      var from = _this.pxToVal(_this.scrollLeft);
      var to = _this.pxToVal(_this.scrollLeft + screenWidth);
      if (isNaN(from) || isNaN(to) || from === to) {
        return;
      }
      if (to < from) {
        var wasToVal = to;
        to = from;
        from = wasToVal;
      }
      var valDistance = TimelineUtils.getDistance(from, to);
      if (valDistance <= 0) {
        return;
      }

      // Find the nearest 'beautiful' step for a gauge.
      // 'beautiful' step. Ex: should be dividable by 1/2/5/10!
      var step = TimelineUtils.findGoodStep(valDistance / (screenWidth / _this._options.stepPx), 0, (_this$_options7 = _this._options) === null || _this$_options7 === void 0 ? void 0 : _this$_options7.denominators);

      // Find beautiful start point:
      var fromVal = Math.floor(from / step) * step;

      // Find a beautiful end point:
      var toVal = Math.ceil(to / step) * step + step;
      if (!TimelineUtils.isNumber(step) || step <= 0 || Math.abs(toVal - fromVal) === 0) {
        return;
      }
      var smallStep = 0;
      if (_this._options.stepSmallPx) {
        var _this$_options8;
        smallStep = TimelineUtils.findGoodStep(valDistance / (screenWidth / _this._options.stepSmallPx), 0, (_this$_options8 = _this._options) === null || _this$_options8 === void 0 ? void 0 : _this$_options8.denominators);
      }
      var lastTextStart = 0;
      _this._ctx.save();
      var headerHeight = TimelineStyleUtils.headerHeight(_this._options);
      var tickHeight = headerHeight / 2;
      var smallTickHeight = headerHeight / 1.3;
      for (var i = fromVal; i <= toVal; i += step) {
        // local
        var sharpPos = _this._getSharp(_this._toScreenPx(i));
        _this._ctx.save();
        _this._ctx.beginPath();
        _this._ctx.setLineDash([4]);
        _this._ctx.lineWidth = 1;
        if (_this._options.tickColor) {
          _this._ctx.strokeStyle = _this._options.tickColor;
        }
        TimelineUtils.drawLine(_this._ctx, sharpPos, tickHeight, sharpPos, headerHeight);
        _this._ctx.stroke();
        if (_this._options.labelsColor) {
          _this._ctx.fillStyle = _this._options.labelsColor;
        }
        if (_this._options.font) {
          _this._ctx.font = _this._options.font;
        }
        var text = _this._formatUnitsText(i);
        var textSize = _this._ctx.measureText(text);
        var textX = sharpPos - textSize.width / 2;
        // skip text render if there is no space for it.
        if (isNaN(lastTextStart) || lastTextStart <= textX) {
          lastTextStart = textX + textSize.width;
          _this._ctx.fillText(text, textX, 10);
        }
        _this._ctx.restore();
        if (!TimelineUtils.isNumber(smallStep) || smallStep <= 0) {
          continue;
        }
        // Draw small steps
        for (var x = i + smallStep; x < i + step; x += smallStep) {
          // local
          var nextSharpPos = _this._getSharp(_this._toScreenPx(x));
          _this._ctx.beginPath();
          _this._ctx.lineWidth = _this._pixelRatio;
          if (_this._options.tickColor) {
            _this._ctx.strokeStyle = _this._options.tickColor;
          }
          TimelineUtils.drawLine(_this._ctx, nextSharpPos, smallTickHeight, nextSharpPos, headerHeight);
          _this._ctx.stroke();
        }
      }
      _this._ctx.restore();
    });
    /**
     * Private.
     * Calculate virtual view model.
     * Determine screen positions for the model elements given.
     */
    timeline_defineProperty(_this, "_generateViewModel", function () {
      var toReturn = {
        size: {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        },
        min: null,
        max: null,
        rowsViewModels: [],
        keyframesViewModels: []
      };
      if (!_this._model) {
        return toReturn;
      }
      var rows = _this._model.rows;
      if (!rows || !Array.isArray(rows) || rows.length <= 0) {
        return toReturn;
      }
      var rowAbsoluteHeight = TimelineStyleUtils.headerHeight(_this._options);
      rows.forEach(function (row, index) {
        if (!row || row.hidden) {
          return;
        }

        // draw with scroll virtualization:
        var rowHeight = TimelineStyleUtils.getRowHeight(row.style || null, _this._options);
        var marginBottom = TimelineStyleUtils.getRowMarginBottom(row.style || null, _this._options);
        var currentRowY = rowAbsoluteHeight - (_this._scrollContainer ? _this._scrollContainer.scrollTop : 0);
        rowAbsoluteHeight += rowHeight + marginBottom;
        if (index == 0) {
          toReturn.size.y = currentRowY;
        }
        toReturn.size.height = Math.max(rowAbsoluteHeight + rowHeight, toReturn.size.height);
        var rowSize = {
          x: 0,
          y: currentRowY,
          width: _this._canvasClientWidth(),
          height: rowHeight
        };
        var rowViewModel = {
          size: rowSize,
          marginBottom: marginBottom,
          model: row,
          index: index,
          min: null,
          max: null,
          groupsViewModels: [],
          keyframesViewModels: []
        };
        toReturn.rowsViewModels.push(rowViewModel);
        if (!row.keyframes || !row.keyframes.forEach || row.keyframes.length <= 0) {
          return;
        }

        // Get min and max ms to draw keyframe rows:
        if (row && row.keyframes) {
          row.keyframes.forEach(function (keyframe) {
            var _rowViewModel$groupsV;
            if (!keyframe || !TimelineUtils.isNumber(keyframe.val)) {
              console.log('Unexpected null keyframe or having invalid value');
              return;
            }
            if (keyframe.hidden) {
              return;
            }
            var groupViewModel = ((_rowViewModel$groupsV = rowViewModel.groupsViewModels) === null || _rowViewModel$groupsV === void 0 ? void 0 : _rowViewModel$groupsV.find(function (p) {
              return keyframe.group === p.groupModel;
            })) || null;
            if (!groupViewModel) {
              groupViewModel = {
                min: keyframe.val,
                max: keyframe.val,
                size: null,
                groupModel: keyframe.group,
                keyframesViewModels: []
              };
              // TimelineStyleUtils.groupFillColor(rowViewModel.model.style || null, this._options);
              rowViewModel.groupsViewModels.push(groupViewModel);
            }
            var keyframeShape = TimelineStyleUtils.keyframeShape(keyframe, keyframe.group, row.style || null, _this._options);
            var keyframeSize = _this._getKeyframePosition(keyframe, groupViewModel, rowViewModel, keyframeShape);
            var keyframeViewModel = {
              model: keyframe,
              rowViewModel: rowViewModel,
              groupViewModel: groupViewModel,
              size: keyframeSize,
              shape: keyframeShape
            };
            var min = groupViewModel.min === null ? keyframe.val : Math.min(keyframe.val, groupViewModel.min);
            var max = groupViewModel.max === null ? keyframe.val : Math.max(keyframe.val, groupViewModel.max);
            if (TimelineUtils.isNumber(min)) {
              groupViewModel.min = min;
            }
            if (TimelineUtils.isNumber(max)) {
              groupViewModel.max = max;
            }
            // All keyframes in the row
            rowViewModel.keyframesViewModels.push(keyframeViewModel);
            // All keyframes in the group
            groupViewModel.keyframesViewModels.push(keyframeViewModel);
            // All keyframes in the component
            toReturn.keyframesViewModels.push(keyframeViewModel);
          });
        }
        rowViewModel.groupsViewModels.forEach(function (groupViewModel) {
          // Extend row min max bounds by a group bounds. It's used to notify needed visible bounds for the row.
          TimelineUtils.setMinMax(rowViewModel, groupViewModel, true);
          // get group screen coords
          var groupRect = _this._getKeyframesGroupSize(groupViewModel, rowViewModel);
          groupViewModel.size = groupRect;
        });

        // Extend screen bounds by a current calculation:
        TimelineUtils.setMinMax(toReturn, rowViewModel, true);
      });
      if (TimelineUtils.isNumber(toReturn.max) && (toReturn.max || toReturn.max === 0)) {
        toReturn.size.width = _this.valToPx(toReturn.max);
      }
      return toReturn;
    });
    /**
     * Render timeline rows.
     */
    timeline_defineProperty(_this, "_renderRows", function () {
      if (!_this._ctx) {
        return;
      }
      var viewModel = _this._generateViewModel();
      if (!(viewModel !== null && viewModel !== void 0 && viewModel.rowsViewModels)) {
        return;
      }
      try {
        _this._ctx.save();
        viewModel.rowsViewModels.forEach(function (rowViewModel) {
          if (!rowViewModel || !_this._ctx) {
            return;
          }
          _this._ctx.fillStyle = TimelineStyleUtils.getRowFillColor(rowViewModel.model.style || null, _this._options);
          //this._ctx.fillRect(data.areaRect.x, data.areaRect.y, data.areaRect.w, data.areaRect.h);
          // Note: bounds used instead of the clip while clip is slow!
          var bounds = _this._cutBounds(rowViewModel.size);
          if (bounds !== null && bounds !== void 0 && bounds.rect) {
            var rect = bounds === null || bounds === void 0 ? void 0 : bounds.rect;
            _this._ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
          }
          _this._renderGroupBounds(rowViewModel);
        });
      } finally {
        _this._ctx.restore();
      }
    });
    /**
     * Render group for the row.
     */
    timeline_defineProperty(_this, "_renderGroupBounds", function (rowViewModel) {
      var _rowViewModel$groupsV2;
      if (!rowViewModel || !_this._ctx) {
        return;
      }
      rowViewModel === null || rowViewModel === void 0 || (_rowViewModel$groupsV2 = rowViewModel.groupsViewModels) === null || _rowViewModel$groupsV2 === void 0 || _rowViewModel$groupsV2.forEach(function (groupsViewModels) {
        var _groupsViewModels$key, _rowViewModel$model, _rowViewModel$model2, _rowViewModel$model3, _rowViewModel$model4;
        if (!_this._ctx) {
          return;
        }
        if (((groupsViewModels === null || groupsViewModels === void 0 || (_groupsViewModels$key = groupsViewModels.keyframesViewModels) === null || _groupsViewModels$key === void 0 ? void 0 : _groupsViewModels$key.length) || 0) <= 1) {
          return;
        }
        var groupFillColor = TimelineStyleUtils.groupFillColor(_this._options, groupsViewModels.groupModel, rowViewModel === null || rowViewModel === void 0 || (_rowViewModel$model = rowViewModel.model) === null || _rowViewModel$model === void 0 ? void 0 : _rowViewModel$model.style);
        var strokeColor = TimelineStyleUtils.groupStrokeColor(_this._options, groupsViewModels.groupModel, rowViewModel === null || rowViewModel === void 0 || (_rowViewModel$model2 = rowViewModel.model) === null || _rowViewModel$model2 === void 0 ? void 0 : _rowViewModel$model2.style);
        var groupStrokeThickness = TimelineStyleUtils.groupStrokeThickness(_this._options, groupsViewModels.groupModel, rowViewModel === null || rowViewModel === void 0 || (_rowViewModel$model3 = rowViewModel.model) === null || _rowViewModel$model3 === void 0 ? void 0 : _rowViewModel$model3.style);
        var groupsRadii = TimelineStyleUtils.groupsRadii(_this._options, groupsViewModels.groupModel, rowViewModel === null || rowViewModel === void 0 || (_rowViewModel$model4 = rowViewModel.model) === null || _rowViewModel$model4 === void 0 ? void 0 : _rowViewModel$model4.style);
        if (!groupsViewModels.size) {
          console.log('Size of the group cannot be calculated');
          return;
        }
        try {
          _this._ctx.save();

          // get the bounds on a canvas
          var rectBounds = _this._cutBounds(groupsViewModels.size);
          if (rectBounds !== null && rectBounds !== void 0 && rectBounds.rect) {
            var rect = rectBounds.rect;
            if (!strokeColor) {
              groupStrokeThickness = 0;
            }
            // Manipulate it again
            _this._ctx.strokeStyle = groupStrokeThickness > 0 ? strokeColor : '';
            _this._ctx.fillStyle = groupFillColor;
            _this._ctx.lineWidth = groupStrokeThickness;
            // Different radii for each corner, top-left clockwise to bottom-left
            _this._ctx.beginPath();
            _this._ctx.roundRect(rect.x + groupStrokeThickness, rect.y + groupStrokeThickness, rect.width - groupStrokeThickness, rect.height - groupStrokeThickness, groupsRadii);
            _this._ctx.fill();
            if (groupStrokeThickness > 0) {
              _this._ctx.stroke();
            }
          }
        } finally {
          _this._ctx.restore();
        }
      });
    });
    /**
     * Method is used for the canvas drawing optimization.
     * Bounds are cut to draw only visible parts for the active canvas.
     */
    timeline_defineProperty(_this, "_cutBounds", function (rect) {
      if (!rect) {
        return null;
      }
      // default bounds: minX, maxX, minY, maxY
      var testOffset = 0;
      var minX = 0 + testOffset;
      var maxX = _this._canvasClientWidth() - testOffset;
      var minY = TimelineStyleUtils.headerHeight(_this._options) + testOffset;
      var maxY = _this._canvasClientHeight() - testOffset;
      return _this._cutBoundsWhenOverlap(rect, minX, maxX, minY, maxY);
    });
    timeline_defineProperty(_this, "_cutBoundsWhenOverlap", function (rect, minX, maxX, minY, maxY) {
      if (!rect) {
        return null;
      }
      if (
      // At the moment it's a check of top and left intersection.
      TimelineUtils.isRectIntersects(rect, {
        x: minX,
        y: minY,
        width: TimelineUtils.getDistance(minX, maxX),
        height: TimelineUtils.getDistance(minY, maxY)
      })) {
        var y = Math.max(rect.y, minY);
        var x = Math.max(rect.x, minX);
        var offsetW = rect.x - x;
        var offsetH = rect.y - y;
        return {
          rect: {
            height: rect.height + offsetH,
            width: rect.width + offsetW,
            x: x,
            y: y
          },
          overlapY: Math.abs(offsetH) > 0,
          overlapX: Math.abs(offsetW) > 0
        };
      }
      return null;
    });
    /**
     * Calculate keyframe group screen rect size that is used during the rendering.
     * @param row
     * @param rowY row screen coords y position
     */
    timeline_defineProperty(_this, "_getKeyframesGroupSize", function (groupViewModel, rowViewModel) {
      var _rowViewModel$model5, _rowViewModel$model6;
      var rowY = rowViewModel.size.y;
      var rowHeight = rowViewModel.size.height;
      var groupModel = groupViewModel.groupModel || null;
      var groupHeight = TimelineStyleUtils.groupHeight(_this._options, groupModel, rowViewModel === null || rowViewModel === void 0 || (_rowViewModel$model5 = rowViewModel.model) === null || _rowViewModel$model5 === void 0 ? void 0 : _rowViewModel$model5.style);
      var marginTop = TimelineStyleUtils.groupMarginTop(_this._options, groupModel, rowViewModel === null || rowViewModel === void 0 || (_rowViewModel$model6 = rowViewModel.model) === null || _rowViewModel$model6 === void 0 ? void 0 : _rowViewModel$model6.style);
      var isAutoHeight = groupHeight === 'auto';
      if (!groupHeight || isAutoHeight) {
        groupHeight = Math.floor(rowHeight);
      }
      groupHeight = typeof groupHeight === 'string' ? parseInt(groupHeight) : groupHeight;
      if (groupHeight > rowHeight) {
        groupHeight = rowHeight;
      }
      var isAutoMargin = marginTop === 'auto';
      if (typeof marginTop === 'string') {
        if (isAutoMargin) {
          marginTop = (rowHeight - groupHeight) / 2;
        } else {
          marginTop = parseInt(marginTop) || 0;
        }
      }
      if (!isAutoMargin) {
        if (isAutoHeight) {
          groupHeight -= marginTop * 2;
        }
      }

      // draw keyframes rows.
      var xMin = _this._toScreenPx(groupViewModel.min); // local
      var xMax = _this._toScreenPx(groupViewModel.max); // local

      return {
        x: xMin,
        y: rowY + marginTop,
        height: groupHeight,
        width: TimelineUtils.getDistance(xMin, xMax)
      };
    });
    timeline_defineProperty(_this, "_getKeyframePosition", function (keyframe, groupViewModel, rowViewModel, keyframeShape) {
      var _rowViewModel$model7, _rowViewModel$model8;
      if (!keyframe) {
        console.log('keyframe should be defined.');
        return null;
      }
      var val = keyframe.val;
      if (!TimelineUtils.isNumber(val)) {
        return null;
      }
      var rowSize = rowViewModel.size;
      // get center of the lane:
      var y = rowSize.y + rowSize.height / 2;
      var groupModel = (groupViewModel === null || groupViewModel === void 0 ? void 0 : groupViewModel.groupModel) || null;
      var height = TimelineStyleUtils.keyframeHeight(keyframe, groupModel, rowViewModel === null || rowViewModel === void 0 || (_rowViewModel$model7 = rowViewModel.model) === null || _rowViewModel$model7 === void 0 ? void 0 : _rowViewModel$model7.style, _this._options);
      var width = TimelineStyleUtils.keyframeWidth(keyframe, groupModel, rowViewModel === null || rowViewModel === void 0 || (_rowViewModel$model8 = rowViewModel.model) === null || _rowViewModel$model8 === void 0 ? void 0 : _rowViewModel$model8.style, _this._options);
      if (height === 'auto') {
        height = rowSize.height / 3;
      }
      if (width === 'auto') {
        width = height;
      }
      height = Number(height);
      if (!Number.isNaN(height) && height && height > 0) {
        var x = Math.floor(_this._toScreenPx(val));
        y = Math.floor(y);
        var rect = {
          x: x,
          // local
          y: y,
          height: height,
          width: width
        };
        // Rect we are drawing in the center
        if (keyframeShape === TimelineKeyframeShape.Rect) {
          rect.y = rect.y - rect.height / 2;
          rect.x = rect.x - rect.width / 2;
        }
        return rect;
      }
      return null;
    });
    timeline_defineProperty(_this, "_renderKeyframes", function () {
      _this._forEachKeyframe(function (keyframeViewModel) {
        if (!_this._ctx) {
          return;
        }
        var size = keyframeViewModel.size;
        if (size) {
          var x = _this._getSharp(size.x);
          var y = size.y;
          var bounds = _this._cutBounds({
            x: x - size.width / 2,
            y: y - size.height / 2,
            width: size.width,
            height: size.height
          });
          if (!bounds) {
            return;
          }
          _this._ctx.save();
          try {
            // Performance FIX: use clip only  when we are in the collision! Clip is slow!
            // Other keyframes should be hidden by bounds check.
            // Note: clip with just render part of the keyframe
            if (bounds && bounds.overlapY) {
              _this._ctx.beginPath();
              _this._ctx.rect(0, TimelineStyleUtils.headerHeight(_this._options), _this._canvasClientWidth(), _this._canvasClientWidth());
              _this._ctx.clip();
            }
            _this._renderKeyframe(_this._ctx, keyframeViewModel);
          } finally {
            _this._ctx.restore();
          }
        }
      });
    });
    timeline_defineProperty(_this, "_renderKeyframe", function (ctx, keyframeViewModel) {
      var _keyframeViewModel$gr;
      var shape = keyframeViewModel.shape;
      if (shape === TimelineKeyframeShape.None) {
        return;
      }
      var size = keyframeViewModel.size;
      var x = _this._getSharp(size.x);
      var y = size.y;
      var keyframe = keyframeViewModel.model;
      var row = keyframeViewModel.rowViewModel.model;
      var rowStyle = row.style || null;
      var groupModel = (keyframeViewModel === null || keyframeViewModel === void 0 || (_keyframeViewModel$gr = keyframeViewModel.groupViewModel) === null || _keyframeViewModel$gr === void 0 ? void 0 : _keyframeViewModel$gr.groupModel) || null;
      var keyframeColor = keyframe.selected ? TimelineStyleUtils.keyframeSelectedFillColor(keyframe, groupModel, rowStyle, _this._options) : TimelineStyleUtils.keyframeFillColor(keyframe, groupModel, rowStyle, _this._options);
      var border = TimelineStyleUtils.keyframeStrokeThickness(keyframe, groupModel, rowStyle, _this._options);
      var strokeColor = '';
      if (border > 0) {
        if (keyframe.selected) {
          strokeColor = TimelineStyleUtils.keyframeSelectedStrokeColor(keyframe, groupModel, rowStyle, _this._options);
        } else {
          strokeColor = TimelineStyleUtils.keyframeStrokeColor(keyframe, groupModel, rowStyle, _this._options);
        }
      }
      if (shape == TimelineKeyframeShape.Rhomb) {
        ctx.beginPath();
        ctx.translate(x, y);
        ctx.rotate(45 * Math.PI / 180);
        if (border > 0 && strokeColor) {
          ctx.fillStyle = strokeColor;
          ctx.rect(-size.width / 2, -size.height / 2, size.width, size.height);
          ctx.fill();
        }
        ctx.fillStyle = keyframeColor;
        // draw main keyframe data with offset.
        ctx.translate(border, border);
        ctx.rect(-size.width / 2, -size.height / 2, size.width - border * 2, size.height - border * 2);
        ctx.fill();
      } else if (shape == TimelineKeyframeShape.Circle) {
        ctx.beginPath();
        if (border > 0 && strokeColor) {
          ctx.fillStyle = strokeColor;
          ctx.arc(x, y, size.height, 0, 2 * Math.PI);
        }
        ctx.fillStyle = keyframeColor;
        ctx.arc(x, y, size.height - border, 0, 2 * Math.PI);
        ctx.fill();
      } else if (shape == TimelineKeyframeShape.Rect) {
        ctx.beginPath();
        if (border > 0 && strokeColor) {
          ctx.fillStyle = strokeColor;
          ctx.rect(x, y, size.width, size.height);
          ctx.fill();
        }
        ctx.fillStyle = keyframeColor;
        ctx.rect(x + border, y + border, size.width - border, size.height - border);
        ctx.fill();
      }
    });
    timeline_defineProperty(_this, "_renderSelectionRect", function () {
      if (_this._drag || !_this._ctx || !_this._canvas) {
        return;
      }
      _this._ctx.save();
      var thickness = 1;
      if (_this._selectionRect && _this._selectionRectEnabled) {
        _this._ctx.setLineDash([4]);
        _this._ctx.lineWidth = _this._pixelRatio;
        var selectionColor = _this._options.selectionColor;
        if (selectionColor) {
          _this._ctx.strokeStyle = selectionColor;
        }
        _this._ctx.strokeRect(_this._getSharp(_this._selectionRect.x, thickness), _this._getSharp(_this._selectionRect.y, thickness), Math.floor(_this._selectionRect.width), Math.floor(_this._selectionRect.height));
      }
      _this._ctx.restore();
    });
    timeline_defineProperty(_this, "_renderBackground", function () {
      if (!_this._ctx || !_this._canvas) {
        return;
      }
      if (_this._options.fillColor) {
        _this._ctx.save();
        _this._ctx.beginPath();
        _this._ctx.rect(0, 0, _this._canvasClientWidth(), _this._canvasClientHeight());
        _this._ctx.fillStyle = _this._options.fillColor;
        _this._ctx.fill();
        _this._ctx.restore();
      } else {
        // Clear if bg not set.
        _this._ctx.clearRect(0, 0, _this._canvas.width, _this._canvas.height);
      }
    });
    timeline_defineProperty(_this, "_renderTimeline", function () {
      if (!_this._ctx || !_this._options || !_this._options.timelineStyle) {
        return;
      }
      var style = _this._options.timelineStyle;
      _this._ctx.save();
      try {
        var thickness = style.width || 1;
        _this._ctx.lineWidth = thickness * _this._pixelRatio;
        var timeLinePos = _this._getSharp(_this._toScreenPx(_this._val), thickness);
        if (style.strokeColor) {
          _this._ctx.strokeStyle = style.strokeColor;
        }
        if (style.fillColor) {
          _this._ctx.fillStyle = style.fillColor;
        }
        var y = style.marginTop || 0;
        var yBottom = style.marginBottom || 0;
        _this._ctx.beginPath();
        var canvasHeight = _this._canvasClientHeight() - yBottom;
        TimelineUtils.drawLine(_this._ctx, timeLinePos, y, timeLinePos, canvasHeight);
        _this._ctx.stroke();
        _this._renderTimelineCap(timeLinePos, y);
      } finally {
        _this._ctx.restore();
      }
    });
    /**
     * Render timeline cap top.
     */
    timeline_defineProperty(_this, "_renderTimelineCap", function (timeLinePos, y) {
      var _this$_options9;
      var capStyle = (_this$_options9 = _this._options) === null || _this$_options9 === void 0 || (_this$_options9 = _this$_options9.timelineStyle) === null || _this$_options9 === void 0 ? void 0 : _this$_options9.capStyle;
      if (!_this._ctx || !capStyle) {
        return;
      }
      if (capStyle.capType === TimelineCapShape.None) {
        return;
      }
      _this._ctx.save();
      try {
        var capSize = capStyle.width || 0;
        var capHeight = capStyle.height || 0;
        if (capSize && capHeight) {
          _this._ctx.strokeStyle = capStyle.strokeColor || '';
          _this._ctx.fillStyle = capStyle.fillColor || 'white';
          if (capStyle.capType === TimelineCapShape.Triangle) {
            _this._ctx.beginPath();
            _this._ctx.moveTo(timeLinePos - capSize / 2, y);
            _this._ctx.lineTo(timeLinePos + capSize / 2, y);
            _this._ctx.lineTo(timeLinePos, capHeight);
            _this._ctx.closePath();
            _this._ctx.stroke();
          } else if (capStyle.capType === TimelineCapShape.Rect) {
            _this._ctx.fillRect(timeLinePos - capSize / 2, y, capSize, capHeight);
            _this._ctx.fill();
          }
        }
      } finally {
        _this._ctx.restore();
      }
    });
    timeline_defineProperty(_this, "_renderHeaderBackground", function () {
      if (!_this._ctx || !_this._options) {
        return;
      }
      if (TimelineStyleUtils.headerHeight(_this._options)) {
        _this._ctx.save();
        // draw ticks background
        _this._ctx.lineWidth = _this._pixelRatio;
        if (_this._options.headerFillColor) {
          // draw ticks background
          _this._ctx.lineWidth = _this._pixelRatio;
          // draw header background
          _this._ctx.fillStyle = _this._options.headerFillColor;
          _this._ctx.fillRect(0, 0, _this._canvasClientWidth(), TimelineStyleUtils.headerHeight(_this._options));
        } else {
          _this._ctx.clearRect(0, 0, _this._canvasClientWidth(), TimelineStyleUtils.headerHeight(_this._options));
        }
        _this._ctx.restore();
      }
    });
    timeline_defineProperty(_this, "redraw", function () {
      var _window;
      if ((_window = window) !== null && _window !== void 0 && _window.requestAnimationFrame) {
        window.requestAnimationFrame(_this._redrawInternal);
      } else {
        _this._redrawInternal();
      }
    });
    /**
     * perform scroll to max right.
     */
    timeline_defineProperty(_this, "scrollToRightBounds", function () {
      if (_this._scrollContainer && _this._scrollContainer.scrollLeft !== _this._scrollContainer.scrollWidth) {
        _this.scrollLeft = _this._scrollContainer.scrollWidth;
      }
    });
    /**
     * Redraw parts of the component in the specific order.
     */
    timeline_defineProperty(_this, "_redrawInternal", function () {
      if (!_this._ctx || !_this._scrollContainer) {
        console.log('Context is not initialized');
        return;
      }
      // Rescale when animation is played out of the bounds.
      if (_this.valToPx(_this._val) > _this._scrollContainer.scrollWidth) {
        _this.rescale();
        if (!_this._isPanStarted && _this._drag && _this._drag.type !== TimelineElementType.Timeline) {
          _this.scrollToRightBounds();
        }
      }
      _this._renderBackground();
      _this._renderRows();
      // Render after rows
      _this._renderHeaderBackground();
      _this._renderTicks();
      _this._renderKeyframes();
      _this._renderSelectionRect();
      _this._renderTimeline();
    });
    /**
     * Find sharp pixel position
     */
    timeline_defineProperty(_this, "_getSharp", function (pos) {
      var thickness = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      pos = Math.round(pos);
      if (thickness % 2 == 0) {
        return pos;
      }
      return pos + _this._pixelRatio / 2;
    });
    /**
     * Get current time:
     */
    timeline_defineProperty(_this, "getTime", function () {
      return _this._val;
    });
    /**
     * Set current time internal
     * @param val value.
     * @param source event source.
     */
    timeline_defineProperty(_this, "_setTimeInternal", function (val) {
      var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : TimelineEventSource.Programmatically;
      if (!_this._options) {
        return false;
      }
      val = Math.round(val);
      val = TimelineUtils.keepInBounds(val, _this._options.min);
      if (_this._val != val) {
        var prevVal = _this._val;
        var timelineEvent = new TimelineTimeChangedEvent();
        timelineEvent.val = val;
        timelineEvent.prevVal = prevVal;
        timelineEvent.source = source;
        _this._val = val;
        _this.emit(TimelineEvents.TimeChanged, timelineEvent);
        if (timelineEvent.isPrevented()) {
          _this._val = prevVal;
          return false;
        }
        return true;
      }
      return false;
    });
    timeline_defineProperty(_this, "setTime", function (val) {
      // don't allow to change time during drag:
      if (_this._drag && _this._drag.type === TimelineElementType.Timeline) {
        return false;
      }
      var isChanged = _this._setTimeInternal(val, TimelineEventSource.SetTimeMethod);
      if (isChanged) {
        _this.rescale();
        _this.redraw();
      }
      return isChanged;
    });
    timeline_defineProperty(_this, "getOptions", function () {
      return _this._options;
    });
    /**
     * Set options and render the component.
     * Note: Options will be merged\appended with the defaults and component will be invalidated/rendered again.
     */
    timeline_defineProperty(_this, "setOptions", function (toSet) {
      _this._options = _this._setOptions(toSet);
      _this.rescale();
      _this.redraw();
      // Merged options:
      return _this._options;
    });
    /**
     * Private. Apply html container styles from options if any is set.
     */
    timeline_defineProperty(_this, "_applyContainersStyles", function () {
      if (_this._scrollContainer && _this._options) {
        var classList = _this._scrollContainer.classList;
        if (_this._options.scrollContainerClass && !classList.contains(_this._options.scrollContainerClass)) {
          classList.add(_this._options.scrollContainerClass);
        }
        if (_this._options.fillColor) {
          _this._scrollContainer.style.background = _this._options.fillColor;
        }
      }
    });
    timeline_defineProperty(_this, "_setOptions", function (toSet) {
      if (!toSet) {
        return _this._options || {};
      }
      _this._options = TimelineUtils.mergeOptions(_this._options, toSet);
      // Normalize and validate spans per value.
      _this._options.snapStep = TimelineUtils.keepInBounds(_this._options.snapStep || 0, 0, _this._options.stepVal || 0);
      _this._currentZoom = _this._setZoom(_this._options.zoom || 0, _this._options.zoomMin, _this._options.zoomMax);
      _this._options.min = TimelineUtils.isNumber(_this._options.min) ? _this._options.min : 0;
      _this._options.max = TimelineUtils.isNumber(_this._options.max) ? _this._options.max : Number.MAX_VALUE;
      _this._applyContainersStyles();
      // Prevent current active dragging of the timeline, while it's set that it's not allowed anymore.
      if (toSet.timelineDraggable === false) {
        if (_this._drag && _this._drag.type === TimelineElementType.Timeline) {
          _this._cleanUpSelection();
        }
      }
      return _this._options;
    });
    /**
     * Get current model.
     */
    timeline_defineProperty(_this, "getModel", function () {
      return _this._model;
    });
    /**
     * Set model and redraw application.
     * @param data
     */
    timeline_defineProperty(_this, "setModel", function (data) {
      _this._model = data;
      _this.rescale();
      _this.redraw();
    });
    timeline_defineProperty(_this, "_getMousePos", function (canvas, e) {
      var radius = 1;
      var clientX = 0;
      var clientY = 0;
      if (e.changedTouches && e.changedTouches.length > 0) {
        // TODO: implement better touch support
        var touch = e.changedTouches[0];
        clientX = touch.clientX;
        clientY = touch.clientY;
        radius = Math.max(radius, touch.radiusX, touch.radiusY);
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      var rect = canvas.getBoundingClientRect(),
        // abs. size of element
        scaleX = canvas.width / _this._pixelRatio / rect.width,
        // relationship bitmap vs. element for X
        scaleY = canvas.height / _this._pixelRatio / rect.height; // relationship bitmap vs. element for Y

      var x = (clientX - rect.left) * scaleX;
      var y = (clientY - rect.top) * scaleY;
      // scale mouse coordinates after they have been adjusted to be relative to element
      return {
        pos: {
          x: x,
          y: y
        },
        radius: radius,
        args: e
      };
    });
    /**
     * Apply container div size to the container on changes detected.
     */
    timeline_defineProperty(_this, "_updateCanvasScale", function () {
      if (!_this._scrollContainer || !_this._container || !_this._ctx) {
        console.log('Component should be initialized first.');
        return false;
      }
      var changed = false;
      var width = _this._scrollContainer.clientWidth * _this._pixelRatio;
      var height = _this._scrollContainer.clientHeight * _this._pixelRatio;
      if (Math.floor(width) != Math.floor(_this._ctx.canvas.width)) {
        _this._ctx.canvas.width = width;
        changed = true;
      }
      if (Math.floor(height) != Math.floor(_this._ctx.canvas.height)) {
        _this._ctx.canvas.height = height;
        changed = true;
      }
      if (changed) {
        _this._ctx.setTransform(_this._pixelRatio, 0, 0, _this._pixelRatio, 0, 0);
      }
      return changed;
    });
    /**
     * Rescale and update size of the container.
     */
    timeline_defineProperty(_this, "rescale", function () {
      return _this._rescaleInternal();
    });
    /**
     * This method is used to draw additional space when after there are no keyframes.
     * When scrolled we should allow to indefinitely scroll right, so space should be extended to drag keyframes outside of the current size bounds.
     */
    timeline_defineProperty(_this, "_rescaleInternal", function () {
      var newWidth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var newHeight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var scrollMode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TimelineScrollSource.DefaultMode;
      var changed = _this._updateCanvasScale();
      if (!_this._scrollContent) {
        return changed;
      }
      var data = _this._generateViewModel();
      if (data && data.size) {
        var _this$_scrollContaine3;
        var additionalOffset = _this._options.stepPx || 0;
        newWidth = newWidth || 0;
        // content should be not less than current timeline position + width of the timeline
        var timelineGlobalPos = _this.valToPx(_this._val) + _this._leftMargin();
        var timelinePos = 0;
        var rightPosition = _this.scrollLeft + _this.getClientWidth();
        if (timelineGlobalPos >= rightPosition) {
          if (scrollMode == TimelineScrollSource.ScrollBySelection) {
            // When item (timeline, selection rectangle) is just dragged to the right corner.
            timelinePos = Math.floor(timelineGlobalPos + _this._leftMargin());
          } else {
            // When timeline is playing and we need to add next screen (when timeline goes out of the bounds.)
            timelinePos = Math.floor(timelineGlobalPos + _this.getClientWidth() + _this._leftMargin());
          }
        }
        var keyframeW = data.size.width + _this._leftMargin() + additionalOffset;
        newWidth = Math.max(
        // New expected component width.
        newWidth,
        // keyframes max width
        keyframeW,
        // not less than current scroll position
        rightPosition, timelinePos);
        var minWidthPx = Math.floor(newWidth) + 'px';
        if (minWidthPx != _this._scrollContent.style.minWidth) {
          _this._scrollContent.style.minWidth = minWidthPx;
          changed = true;
        }
        newHeight = Math.max(
        // active size
        Math.floor(data.size.height + _this._canvasClientHeight() * 0.2), (((_this$_scrollContaine3 = _this._scrollContainer) === null || _this$_scrollContaine3 === void 0 ? void 0 : _this$_scrollContaine3.scrollTop) || 0) + _this._canvasClientHeight() - 1, Math.round(newHeight || 0));
        var h = Math.floor(newHeight) + 'px';
        if (_this._scrollContent.style.minHeight != h) {
          _this._scrollContent.style.minHeight = h;
          return changed;
        }
      }
      return changed;
    });
    /**
     * Filter elements that can be dragged.
     * Filtration is done based on the timeline styles and options.
     */
    timeline_defineProperty(_this, "_filterDraggableElements", function (elements) {
      // filter and sort: Timeline, individual keyframes, groups (distance).
      var filteredElements = elements.filter(function (element) {
        if (!element) {
          return false;
        }
        if (element.type === TimelineElementType.Keyframe) {
          var _element$keyframe;
          if (!TimelineStyleUtils.keyframeDraggable(element.keyframe || null, ((_element$keyframe = element.keyframe) === null || _element$keyframe === void 0 ? void 0 : _element$keyframe.group) || null, (element === null || element === void 0 ? void 0 : element.row) || null, _this._options)) {
            return false;
          }
        } else if (element.type === TimelineElementType.Group) {
          if (!TimelineStyleUtils.groupDraggable(element.group || null, element.row || null, _this._options)) {
            return false;
          }
        } else if (element.type === TimelineElementType.Timeline) {
          var _this$_options10;
          if (((_this$_options10 = _this._options) === null || _this$_options10 === void 0 ? void 0 : _this$_options10.timelineDraggable) === false) {
            return false;
          }
        } else if (element.type === TimelineElementType.Row) {
          return false;
        }
        return true;
      });
      return filteredElements;
    });
    /**
     * Filter and sort draggable elements by the priority to get first draggable element closest to the passed value.
     */
    timeline_defineProperty(_this, "_findDraggableElement", function (elements) {
      var val = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      // filter and sort: Timeline, individual keyframes, groups (distance).
      var getPriority = function getPriority(type) {
        if (type === TimelineElementType.Timeline) {
          return 1;
        } else if (type === TimelineElementType.Keyframe) {
          return 2;
        } else if (type === TimelineElementType.Group) {
          return 3;
        }
        return -1;
      };
      var sortDraggable = function sortDraggable(a, b) {
        var prioA = getPriority(a.type);
        var prioB = getPriority(b.type);
        if (prioA === prioB) {
          if (val === null) {
            return 0;
          }

          // Sort by distance
          prioA = TimelineUtils.getDistance(a.val, val);
          prioB = TimelineUtils.getDistance(b.val, val);
          if (prioA === prioB) {
            return 0;
          }
          return prioA < prioB ? 1 : -1;
        }
        return prioA < prioB ? 1 : -1;
      };
      var sorted = _this._filterDraggableElements(elements).sort(sortDraggable);
      if (sorted.length > 0) {
        return sorted[sorted.length - 1];
      }
      return null;
    });
    /**
     * get all clickable elements by the given local screen coordinate.
     */
    timeline_defineProperty(_this, "elementFromPoint", function (pos, clickRadius, onlyTypes) {
      var _this$_options11;
      clickRadius = Math.max(clickRadius, 1);
      var toReturn = [];
      if (!pos) {
        return toReturn;
      }
      var headerHeight = TimelineStyleUtils.headerHeight(_this._options);
      // Check whether we can drag timeline.
      var timeLinePos = _this._toScreenPx(_this._val);
      var width = 0;
      var timelineStyle = (_this$_options11 = _this._options) === null || _this$_options11 === void 0 ? void 0 : _this$_options11.timelineStyle;
      if (timelineStyle) {
        var _timelineStyle$capSty;
        width = Math.max((timelineStyle.width || 1) * _this._pixelRatio, ((timelineStyle === null || timelineStyle === void 0 || (_timelineStyle$capSty = timelineStyle.capStyle) === null || _timelineStyle$capSty === void 0 ? void 0 : _timelineStyle$capSty.width) || 0) * _this._pixelRatio || 1) + clickRadius;
      }
      // Allow to select timeline only by half of a header to allow select by a selector top most keyframes row.
      if (pos.y <= headerHeight * 0.5 || pos.x >= timeLinePos - width / 2 && pos.x <= timeLinePos + width / 2) {
        toReturn.push({
          val: _this._val,
          type: TimelineElementType.Timeline
        });
      }
      var snap = _this._options.snapEnabled;
      if (pos.y >= headerHeight && _this._options.keyframesDraggable) {
        _this._forEachKeyframe(function (keyframeViewModel, _, isNextRow) {
          var rowViewModel = keyframeViewModel.rowViewModel;
          // Check keyframes group overlap
          if (isNextRow) {
            if (rowViewModel.groupsViewModels) {
              rowViewModel.groupsViewModels.forEach(function (groupViewModel) {
                if (!(groupViewModel !== null && groupViewModel !== void 0 && groupViewModel.size)) {
                  return;
                }
                var keyframesGroupOverlapped = TimelineUtils.isOverlap(pos.x, pos.y, groupViewModel.size);
                if (keyframesGroupOverlapped) {
                  var keyframesModels = (groupViewModel === null || groupViewModel === void 0 ? void 0 : groupViewModel.keyframesViewModels.map(function (p) {
                    return p.model;
                  })) || [];
                  var groupElement = {
                    // TODO:
                    val: _this._mousePosToVal(pos.x, snap),
                    type: TimelineElementType.Group,
                    group: groupViewModel.groupModel,
                    row: rowViewModel.model,
                    keyframes: keyframesModels
                  };
                  var snapped = _this.snapVal(groupViewModel.min);
                  // get snapped mouse pos based on a min value.
                  groupElement.val += groupViewModel.min - snapped;
                  toReturn.push(groupElement);
                }
              });
            }
          }
          var keyframePosRect = keyframeViewModel.size;
          if (keyframePosRect) {
            var isMouseOver = false;
            if (keyframeViewModel.shape === TimelineKeyframeShape.Rect) {
              var extendedMouseRect = TimelineUtils.shrinkSelf({
                x: pos.x,
                y: pos.y,
                height: clickRadius,
                width: clickRadius
              }, clickRadius);
              isMouseOver = TimelineUtils.isRectIntersects(extendedMouseRect, keyframePosRect, true);
            } else {
              var dist = TimelineUtils.getDistance(keyframePosRect.x, keyframePosRect.y, pos.x, pos.y);
              isMouseOver = dist <= keyframePosRect.height + clickRadius;
            }
            if (isMouseOver) {
              toReturn.push({
                keyframe: keyframeViewModel.model,
                keyframes: [keyframeViewModel.model],
                val: keyframeViewModel.model.val,
                row: keyframeViewModel.rowViewModel.model,
                type: TimelineElementType.Keyframe
              });
            }
          }
        }, function (rowViewModel) {
          var rowOverlapped = TimelineUtils.isOverlap(pos.x, pos.y, rowViewModel.size);
          if (rowOverlapped) {
            var row = {
              val: _this._mousePosToVal(pos.x, snap),
              keyframes: rowViewModel.model.keyframes,
              type: TimelineElementType.Row,
              row: rowViewModel.model
            };
            toReturn.push(row);
          }
        });
      }
      if (!onlyTypes || onlyTypes.length === 0) {
        return toReturn;
      } else {
        return toReturn.filter(function (p) {
          return onlyTypes && onlyTypes.includes(p.type);
        });
      }
    });
    /**
     * Subscribe user callback on time changed.
     */
    timeline_defineProperty(_this, "onTimeChanged", function (callback) {
      _this.on(TimelineEvents.TimeChanged, callback);
    });
    /**
     * Subscribe user callback on drag started event.
     */
    timeline_defineProperty(_this, "onDragStarted", function (callback) {
      _this.on(TimelineEvents.DragStarted, callback);
    });
    /**
     * Subscribe user callback on drag event.
     */
    timeline_defineProperty(_this, "onDrag", function (callback) {
      _this.on(TimelineEvents.Drag, callback);
    });
    /**
     * Subscribe user callback on drag finished event.
     */
    timeline_defineProperty(_this, "onDragFinished", function (callback) {
      _this.on(TimelineEvents.DragFinished, callback);
    });
    /**
     * Subscribe user callback on double click.
     */
    timeline_defineProperty(_this, "onDoubleClick", function (callback) {
      _this.on(TimelineEvents.DoubleClick, callback);
    });
    /**
     * Subscribe user callback on keyframe changed event.
     */
    timeline_defineProperty(_this, "onKeyframeChanged", function (callback) {
      _this.on(TimelineEvents.KeyframeChanged, callback);
    });
    /**
     * Subscribe user callback on drag finished event.
     */
    timeline_defineProperty(_this, "onMouseDown", function (callback) {
      _this.on(TimelineEvents.MouseDown, callback);
    });
    /**
     * Subscribe user callback on selected.
     */
    timeline_defineProperty(_this, "onSelected", function (callback) {
      _this.on(TimelineEvents.Selected, callback);
    });
    /**
     * Subscribe user callback on scroll event
     */
    timeline_defineProperty(_this, "onScroll", function (callback) {
      _this.on(TimelineEvents.Scroll, callback);
    });
    /**
     * Subscribe on scroll finished event.
     */
    timeline_defineProperty(_this, "onScrollFinished", function (callback) {
      _this.on(TimelineEvents.ScrollFinished, callback);
    });
    /**
     * Subscribe on canvas context menu event.
     */
    timeline_defineProperty(_this, "onContextMenu", function (callback) {
      _this.on(TimelineEvents.ContextMenu, callback);
    });
    /**
     * Private.
     * Emit internally scroll eve
     */
    timeline_defineProperty(_this, "_emitScrollEvent", function (args, scrollProgrammatically) {
      var _this$_scrollContaine4, _this$_scrollContaine5;
      var eventType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TimelineEvents.Scroll;
      var scrollEvent = {
        args: args,
        scrollProgrammatically: scrollProgrammatically,
        scrollLeft: _this.scrollLeft,
        scrollTop: _this.scrollTop,
        scrollHeight: ((_this$_scrollContaine4 = _this._scrollContainer) === null || _this$_scrollContaine4 === void 0 ? void 0 : _this$_scrollContaine4.scrollHeight) || 0,
        scrollWidth: ((_this$_scrollContaine5 = _this._scrollContainer) === null || _this$_scrollContaine5 === void 0 ? void 0 : _this$_scrollContaine5.scrollWidth) || 0
      };
      _get((_this, timeline_getPrototypeOf(Timeline.prototype)), "emit", _this).call(_this, eventType, scrollEvent);
      return scrollEvent;
    });
    timeline_defineProperty(_this, "_emitKeyframeChanged", function (element) {
      var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : TimelineEventSource.Programmatically;
      var args = new TimelineKeyframeChangedEvent();
      args.val = element.val;
      args.prevVal = element.prevVal;
      args.target = element;
      args.source = source;
      _this.emit(TimelineEvents.KeyframeChanged, args);
      return args;
    });
    timeline_defineProperty(_this, "_emitDragStartedEvent", function (dragState) {
      if (!dragState) {
        return null;
      }
      var args = _this._getDragEventArgs(dragState, _this._currentPos);
      _this.emit(TimelineEvents.DragStarted, args);
      if (args.isPrevented()) {
        _this._preventDrag(args, dragState, true);
      }
      return args;
    });
    /**
     * Private emit timeline event that dragging element is finished.
     * @param forcePrevent - needed when during dragging components set to the state when they cannot be dragged anymore. (used only as recovery state).
     * @returns
     */
    timeline_defineProperty(_this, "_emitDragFinishedEvent", function (dragState) {
      var forcePrevent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (!dragState || !dragState.changed) {
        return null;
      }
      var args = _this._getDragEventArgs(dragState, _this._currentPos);
      if (forcePrevent) {
        args.preventDefault();
      }
      _this.emit(TimelineEvents.DragFinished, args);
      if (args.isPrevented()) {
        _this._preventDrag(args, dragState, true);
      }
      return args;
    });
    timeline_defineProperty(_this, "_preventDrag", function (dragArgs, data) {
      var toStart = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      if (dragArgs.elements) {
        dragArgs.elements.forEach(function (element) {
          var toSet = toStart ? element.startedVal : element.prevVal;
          _this._setKeyframePos(element, toSet);
        });
      }
      data.val = data.prevVal;
      // Set prev active point
      dragArgs.point = dragArgs.prevPoint;
    });
    timeline_defineProperty(_this, "_emitDragEvent", function (dragState) {
      if (!dragState) {
        return null;
      }
      var args = _this._getDragEventArgs(dragState, _this._currentPos);
      _this.emit(TimelineEvents.Drag, args);
      if (args.isPrevented()) {
        _this._preventDrag(args, dragState, false);
      }
      return args;
    });
    timeline_defineProperty(_this, "_emitKeyframesSelected", function (state) {
      var args = new TimelineSelectedEvent();
      args.selected = state.selected;
      args.changed = state.changed;
      _this.emit(TimelineEvents.Selected, args);
      return args;
    });
    timeline_defineProperty(_this, "_getDragEventArgs", function (dragState, point) {
      var draggableArguments = new TimelineDragEvent();
      draggableArguments.point = point;
      // Get cloned list
      draggableArguments.elements = _toConsumableArray(dragState.elements || []);
      draggableArguments.target = (dragState === null || dragState === void 0 ? void 0 : dragState.target) || null;
      return draggableArguments;
    });
    _this._options = TimelineUtils.cloneOptions(defaultTimelineOptions);
    // Allow to create instance without an error to perform tests.
    if (_options || _model) {
      _this.initialize(_options, _model);
    }
    return _this;
  }
  timeline_inherits(Timeline, _TimelineEventsEmitte);
  return timeline_createClass(Timeline, [{
    key: "_getCtx",
    value:
    /**
     * Get drawing context
     */
    function _getCtx() {
      if (!this._canvas) {
        return null;
      }
      if (this._ctx) {
        return this._ctx;
      }
      this._ctx = this._canvas.getContext('2d');
      return this._ctx;
    }
  }, {
    key: "_moveElements",
    value:
    /**
     * Move elements
     * @param offset vector to move elements along.
     * @param elements Element to move.
     * @returns real moved value.
     */
    function _moveElements(offset, elements) {
      var _this2 = this;
      var source = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TimelineEventSource.Programmatically;
      if (!elements) {
        return 0;
      }
      var isChanged = false;
      if (Math.abs(offset) > 0) {
        // Find drag min and max bounds:
        var bounds = {
          min: Number.MIN_SAFE_INTEGER,
          max: Number.MAX_SAFE_INTEGER
        };
        // Set min max from the options.
        bounds = TimelineUtils.setMinMax(bounds, this._options);
        elements.forEach(function (p) {
          var _this2$_options;
          if (!p || !p.keyframe) {
            return;
          }
          // find allowed bounds for the draggable items.
          // find for each row and keyframe separately.
          var currentBounds = TimelineUtils.setMinMax(TimelineUtils.setMinMax({
            min: bounds.min,
            max: bounds.max
          }, p.keyframe), p.row || null);
          var expectedKeyframeValue = (_this2$_options = _this2._options) !== null && _this2$_options !== void 0 && _this2$_options.snapAllKeyframesOnMove ? _this2.snapVal(p.keyframe.val) : p.keyframe.val;
          var newPosition = expectedKeyframeValue + offset;
          // Check that move offset will hit min bounds
          if ((currentBounds.min || currentBounds.min === 0) && TimelineUtils.isNumber(currentBounds.min) && newPosition < currentBounds.min) {
            // Return to the bounds:
            offset = offset + TimelineUtils.getDistance(currentBounds.min, newPosition);
          }
          if ((currentBounds.max || currentBounds.max === 0) && TimelineUtils.isNumber(currentBounds.max) && newPosition > currentBounds.max) {
            // Return to the bounds:
            offset = offset - TimelineUtils.getDistance(currentBounds.max, newPosition);
          }
        });
        if (Math.abs(offset) > 0) {
          // don't allow to move less than zero offset.
          elements.forEach(function (element) {
            if (!(element !== null && element !== void 0 && element.keyframe)) {
              return;
            }
            var prevVal = element.keyframe.val;
            var toSet = prevVal + offset;
            var newValue = _this2._setKeyframePos(element, toSet, source);
            isChanged = newValue !== prevVal;
          });
        }
        if (isChanged) {
          return offset;
        }
      }
      return 0;
    }
  }, {
    key: "_forEachKeyframe",
    value:
    /**
     * foreach visible keyframe.
     */
    function _forEachKeyframe(callback, onRowCallback) {
      var _calculatedModel$rows;
      if (!callback && !onRowCallback) {
        return;
      }
      if (!this._model) {
        return;
      }
      var calculatedModel = this._generateViewModel();
      if (!calculatedModel) {
        return;
      }
      calculatedModel === null || calculatedModel === void 0 || (_calculatedModel$rows = calculatedModel.rowsViewModels) === null || _calculatedModel$rows === void 0 || _calculatedModel$rows.forEach(function (rowViewModel) {
        if (!rowViewModel) {
          return;
        }
        onRowCallback && onRowCallback(rowViewModel);
        var nextRow = true;
        if (callback) {
          rowViewModel.keyframesViewModels.forEach(function (keyframeViewModel, keyframeIndex) {
            if (keyframeViewModel) {
              callback(keyframeViewModel, keyframeIndex, nextRow);
            }
            nextRow = false;
          });
        }
      });
    }

    /**
     * Private.
     * Create extended mouse position and calculate size of the selection rectangle.
     */
  }, {
    key: "_trackMousePos",
    value: function _trackMousePos(canvas, mouseArgs) {
      var clickArgs = this._getMousePos(canvas, mouseArgs);
      var pos = clickArgs.pos;
      clickArgs.originalVal = this._mousePosToVal(pos.x, false);
      clickArgs.snapVal = this._mousePosToVal(pos.x, true);
      clickArgs.val = clickArgs.originalVal;
      if (this._options && this._options.snapEnabled) {
        clickArgs.val = clickArgs.snapVal;
      }
      if (this._startPosMouseArgs) {
        var _this$_scrollStartPos, _this$_scrollStartPos2;
        if (!this._selectionRect) {
          this._selectionRect = {};
        }
        var startPos = this._startPosMouseArgs.pos;
        // get the pos with the virtualization:
        var x = Math.floor(startPos.x + ((((_this$_scrollStartPos = this._scrollStartPos) === null || _this$_scrollStartPos === void 0 ? void 0 : _this$_scrollStartPos.x) || 0) - this.scrollLeft));
        var y = Math.floor(startPos.y + ((((_this$_scrollStartPos2 = this._scrollStartPos) === null || _this$_scrollStartPos2 === void 0 ? void 0 : _this$_scrollStartPos2.y) || 0) - this.scrollTop));
        this._selectionRect.x = Math.min(x, pos.x);
        this._selectionRect.y = Math.min(y, pos.y);
        this._selectionRect.width = Math.max(x, pos.x) - this._selectionRect.x;
        this._selectionRect.height = Math.max(y, pos.y) - this._selectionRect.y;
        // Once mouse was moved outside of the bounds it's not a click anymore
        if (this._clickAllowed) {
          this._clickAllowed = this._selectionRect.height <= this._consts.clickThreshold && this._selectionRect.width <= this._consts.clickThreshold;
        }
      }
      return clickArgs;
    }

    /**
     * Get scroll container client width.
     */
  }, {
    key: "getClientWidth",
    value: function getClientWidth() {
      var _this$_scrollContaine6;
      return ((_this$_scrollContaine6 = this._scrollContainer) === null || _this$_scrollContaine6 === void 0 ? void 0 : _this$_scrollContaine6.clientWidth) || 0;
    }
    /**
     * Get scroll container client height.
     */
  }, {
    key: "getClientHeight",
    value: function getClientHeight() {
      var _this$_scrollContaine7;
      return ((_this$_scrollContaine7 = this._scrollContainer) === null || _this$_scrollContaine7 === void 0 ? void 0 : _this$_scrollContaine7.clientHeight) || 0;
    }
  }, {
    key: "_cleanUpSelection",
    value: function _cleanUpSelection() {
      var forcePrevent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (this._drag) {
        this._emitDragFinishedEvent(this._drag, forcePrevent);
      }
      this._startPosMouseArgs = null;
      this._drag = null;
      this._scrollAreaClickOrDragStarted = false;
      this._startedDragWithCtrl = false;
      this._startedDragWithShiftKey = false;
      this._selectionRect = null;
      this._clickTimeout = null;
      this._scrollStartPos = null;
      this._isPanStarted = false;
      this._clickAllowed = false;
      this._stopAutoPan();
    }

    /**
     * Check whether click timeout is over.
     */
  }, {
    key: "_clickTimeoutIsOver",
    value: function _clickTimeoutIsOver() {
      // Duration before the selection can be tracked.
      if (this._clickTimeout && Date.now() - this._clickTimeout > this._consts.clickDetectionMs) {
        return true;
      }
      return false;
    }
  }, {
    key: "_checkUpdateSpeedTooFast",
    value:
    /**
     * Check whether auto pan should be slowed down a bit.
     */
    function _checkUpdateSpeedTooFast() {
      // Slow down updated a bit.
      if (this._autoPanLastActionDate && Date.now() - this._autoPanLastActionDate <= this._consts.autoPanSpeedLimit) {
        return true;
      }
      this._autoPanLastActionDate = Date.now();
      return false;
    }

    /**
     * Scroll virtual canvas when pan mode is enabled.
     */
  }, {
    key: "_scrollByPan",
    value: function _scrollByPan(start, pos, scrollStartPos) {
      if (!start || !pos || !this._scrollContainer) {
        return;
      }
      var x = 0;
      var y = 0;
      if (scrollStartPos) {
        x = scrollStartPos.x;
        y = scrollStartPos.y;
      }
      var offsetX = Math.round(start.x - pos.x);
      var newLeft = x + offsetX;
      if (offsetX > 0) {
        this._rescaleInternal(newLeft + this._canvasClientWidth());
      }
      if (offsetX > 0 && newLeft + this._canvasClientWidth() >= this._scrollContainer.scrollWidth - 5) {
        this.scrollLeft = this._scrollContainer.scrollWidth;
      } else {
        this.scrollLeft = newLeft;
      }
      this.scrollTop = Math.round(y + start.y - pos.y);
    }
  }, {
    key: "_scrollBySelectionOutOfBounds",
    value: function _scrollBySelectionOutOfBounds(pos) {
      if (!this._scrollContainer) {
        return false;
      }
      var x = pos.x;
      var y = pos.y;
      var isChanged = false;
      var speedX = 0;
      var speedY = 0;
      // Small offset to start auto pan earlier.
      var bounds = this._consts.autoPanByScrollPadding;
      var isLeft = x <= bounds;
      var isRight = x >= this._canvasClientWidth() - bounds;
      var isTop = y <= bounds;
      var isBottom = y >= this._canvasClientHeight() - bounds;
      var newWidth = null;
      var newHeight = null;
      if (isLeft || isRight || isTop || isBottom) {
        // Auto move init
        this._startAutoPan();
        if (this._checkUpdateSpeedTooFast()) {
          return false;
        }
        var scrollSpeedMultiplier = isNaN(this._consts.scrollByDragSpeed) ? 1 : this._consts.scrollByDragSpeed;
        if (isLeft) {
          // Get normalized speed.
          speedX = -TimelineUtils.getDistance(x, bounds) * scrollSpeedMultiplier;
        } else if (isRight) {
          // Get normalized speed:
          speedX = TimelineUtils.getDistance(x, this._canvasClientWidth() - bounds) * scrollSpeedMultiplier;
          newWidth = this.scrollLeft + this._canvasClientWidth() + speedX;
        }
        if (isTop) {
          // Get normalized speed.
          speedY = -TimelineUtils.getDistance(x, bounds) * scrollSpeedMultiplier / 4;
        } else if (isBottom) {
          // Get normalized speed:
          speedY = TimelineUtils.getDistance(x, this._canvasClientHeight() - bounds) * scrollSpeedMultiplier / 4;
          newHeight = this._scrollContainer.scrollTop + this._canvasClientHeight();
        }
      } else {
        this._stopAutoPan();
      }
      if (newWidth || newHeight) {
        this._rescaleInternal(newWidth, newHeight, TimelineScrollSource.ScrollBySelection);
      }
      if (Math.abs(speedX) > 0) {
        this.scrollLeft = this._scrollContainer.scrollLeft + speedX;
        isChanged = true;
      }
      if (Math.abs(speedY) > 0) {
        this.scrollTop = this._scrollContainer.scrollTop + speedY;
        isChanged = true;
      }
      return isChanged;
    }

    /**
     * Convert screen pixel to value.
     */
  }, {
    key: "pxToVal",
    value: function pxToVal(px) {
      if (!this._options) {
        return px;
      }
      var min = this._options.min || 0;
      if (!TimelineUtils.isNumber(min)) {
        min = 0;
      }
      var stepPx = this._options.stepPx || 0;
      if (stepPx === 0) {
        return px;
      }
      min *= this._currentZoom || 1;
      var steps = (this._options.stepVal || 0) * this._currentZoom || 1;
      var val = min + px / stepPx * steps;
      return val;
    }
  }, {
    key: "snapVal",
    value:
    /**
     * Snap a value to a nearest grid point.
     */
    function snapVal(val) {
      // Snap a value if configured.
      if (this._options && this._options.snapEnabled && this._options.snapStep) {
        var stops = this._options.snapStep;
        var step = val / stops;
        var stepsFit = Math.round(step);
        var minSteps = Math.abs(this._options.min || 0) / this._options.snapStep;
        var minOffset = TimelineUtils.sign(this._options.min || 1) * (minSteps - Math.floor(minSteps)) * this._options.snapStep;
        val = Math.round(minOffset) + Math.round(stepsFit * stops);
      }
      val = TimelineUtils.keepInBounds(val, this._options.min, this._options.max);
      return val;
    }
  }, {
    key: "scrollLeft",
    get:
    /**
     * Current scroll left position.
     */
    function get() {
      var _this$_scrollContaine8;
      return ((_this$_scrollContaine8 = this._scrollContainer) === null || _this$_scrollContaine8 === void 0 ? void 0 : _this$_scrollContaine8.scrollLeft) || 0;
    },
    set: function set(value) {
      if (this._scrollContainer && this._scrollContainer.scrollLeft !== value) {
        this._scrollProgrammatically = true;
        this._scrollContainer.scrollLeft = value;
      }
    }
  }, {
    key: "scrollTop",
    get: function get() {
      var _this$_scrollContaine9;
      return ((_this$_scrollContaine9 = this._scrollContainer) === null || _this$_scrollContaine9 === void 0 ? void 0 : _this$_scrollContaine9.scrollTop) || 0;
    },
    set: function set(value) {
      if (this._scrollContainer && this._scrollContainer.scrollTop !== value) {
        this._scrollProgrammatically = true;
        this._scrollContainer.scrollTop = value;
      }
    }
  }]);
}(TimelineEventsEmitter);
;// CONCATENATED MODULE: ./src/animation-timeline.ts
// bundle entry point




// @ public timeline models.





// @public styles









// @private helper containers.








// @private virtual model





// @public events







// @public enums









// @private defaults are exposed:






/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=animation-timeline.js.map