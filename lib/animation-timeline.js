(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["timelineModule"] = factory();
	else
		root["timelineModule"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {



/***/ }),
/* 1 */
/***/ (function(module, exports) {



/***/ }),
/* 2 */
/***/ (function(module, exports) {



/***/ }),
/* 3 */
/***/ (function(module, exports) {



/***/ }),
/* 4 */
/***/ (function(module, exports) {



/***/ }),
/* 5 */
/***/ (function(module, exports) {



/***/ }),
/* 6 */
/***/ (function(module, exports) {



/***/ }),
/* 7 */
/***/ (function(module, exports) {



/***/ }),
/* 8 */
/***/ (function(module, exports) {



/***/ }),
/* 9 */
/***/ (function(module, exports) {



/***/ }),
/* 10 */
/***/ (function(module, exports) {



/***/ }),
/* 11 */
/***/ (function(module, exports) {



/***/ }),
/* 12 */
/***/ (function(module, exports) {



/***/ }),
/* 13 */
/***/ (function(module, exports) {



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "Timeline", function() { return /* reexport */ timeline_Timeline; });
__webpack_require__.d(__webpack_exports__, "TimelineModel", function() { return /* reexport */ timelineModel["TimelineModel"]; });
__webpack_require__.d(__webpack_exports__, "TimelineRow", function() { return /* reexport */ timelineRow["TimelineRow"]; });
__webpack_require__.d(__webpack_exports__, "TimelineKeyframe", function() { return /* reexport */ timelineKeyframe["TimelineKeyframe"]; });
__webpack_require__.d(__webpack_exports__, "TimelineEventsEmitter", function() { return /* reexport */ TimelineEventsEmitter; });
__webpack_require__.d(__webpack_exports__, "TimelineConsts", function() { return /* reexport */ timelineConsts["TimelineConsts"]; });
__webpack_require__.d(__webpack_exports__, "TimelineOptions", function() { return /* reexport */ timelineOptions["TimelineOptions"]; });
__webpack_require__.d(__webpack_exports__, "TimelineKeyframeStyle", function() { return /* reexport */ timelineKeyframeStyle["TimelineKeyframeStyle"]; });
__webpack_require__.d(__webpack_exports__, "TimelineRowStyle", function() { return /* reexport */ timelineRowStyle["TimelineRowStyle"]; });
__webpack_require__.d(__webpack_exports__, "TimelineStyle", function() { return /* reexport */ styles_timelineStyle["TimelineStyle"]; });
__webpack_require__.d(__webpack_exports__, "TimelineStyleUtils", function() { return /* reexport */ TimelineStyleUtils; });
__webpack_require__.d(__webpack_exports__, "TimelineUtils", function() { return /* reexport */ TimelineUtils; });
__webpack_require__.d(__webpack_exports__, "TimelineClickableElement", function() { return /* reexport */ timelineClickableElement["TimelineClickableElement"]; });
__webpack_require__.d(__webpack_exports__, "Selectable", function() { return /* reexport */ selectable["Selectable"]; });
__webpack_require__.d(__webpack_exports__, "RowsCalculationsResults", function() { return /* reexport */ rowsCalculationsResults["RowsCalculationsResults"]; });
__webpack_require__.d(__webpack_exports__, "RowSize", function() { return /* reexport */ rowsCalculationsResults["RowSize"]; });
__webpack_require__.d(__webpack_exports__, "CutBoundsRect", function() { return /* reexport */ cutBoundsRect["CutBoundsRect"]; });
__webpack_require__.d(__webpack_exports__, "TimelineSelectedEvent", function() { return /* reexport */ timelineSelectedEvent["TimelineSelectedEvent"]; });
__webpack_require__.d(__webpack_exports__, "TimelineScrollEvent", function() { return /* reexport */ timelineScrollEvent["TimelineScrollEvent"]; });
__webpack_require__.d(__webpack_exports__, "TimelineClickEvent", function() { return /* reexport */ TimelineClickEvent; });
__webpack_require__.d(__webpack_exports__, "TimelineDragEvent", function() { return /* reexport */ TimelineDragEvent; });
__webpack_require__.d(__webpack_exports__, "TimelineTimeChangedEvent", function() { return /* reexport */ timelineTimeChangedEvent_TimelineTimeChangedEvent; });
__webpack_require__.d(__webpack_exports__, "TimelineEvents", function() { return /* reexport */ TimelineEvents; });
__webpack_require__.d(__webpack_exports__, "TimelineKeyframeShape", function() { return /* reexport */ TimelineKeyframeShape; });
__webpack_require__.d(__webpack_exports__, "TimelineInteractionMode", function() { return /* reexport */ TimelineInteractionMode; });
__webpack_require__.d(__webpack_exports__, "TimelineElementType", function() { return /* reexport */ TimelineElementType; });
__webpack_require__.d(__webpack_exports__, "TimelineCursorType", function() { return /* reexport */ TimelineCursorType; });
__webpack_require__.d(__webpack_exports__, "TimelineCapShape", function() { return /* reexport */ TimelineCapShape; });
__webpack_require__.d(__webpack_exports__, "TimelineEventSource", function() { return /* reexport */ TimelineEventSource; });
__webpack_require__.d(__webpack_exports__, "defaultTimelineOptions", function() { return /* reexport */ defaultTimelineOptions; });
__webpack_require__.d(__webpack_exports__, "defaultTimelineKeyframeStyle", function() { return /* reexport */ defaultTimelineKeyframeStyle; });
__webpack_require__.d(__webpack_exports__, "defaultTimelineRowStyle", function() { return /* reexport */ defaultTimelineRowStyle; });
__webpack_require__.d(__webpack_exports__, "defaultTimelineStyle", function() { return /* reexport */ defaultTimelineStyle; });
__webpack_require__.d(__webpack_exports__, "defaultTimelineConsts", function() { return /* reexport */ defaultTimelineConsts; });

// CONCATENATED MODULE: ./src/timelineEventsEmitter.ts
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TimelineEventsEmitter = /*#__PURE__*/function () {
  function TimelineEventsEmitter() {
    _classCallCheck(this, TimelineEventsEmitter);

    _defineProperty(this, "_subscriptions", []);
  }

  _createClass(TimelineEventsEmitter, [{
    key: "on",
    // on event.
    value: function on(topic, callback) {
      if (!callback) {
        return;
      }

      this._subscriptions.push({
        topic: topic,
        callback: callback
      });
    }
    /**
     * Remove an event from the subscriptions list.
     */

  }, {
    key: "off",
    value: function off(topic, callback) {
      this._subscriptions = this._subscriptions.filter(function (event) {
        return event && event.callback != callback && event.topic != topic;
      });
    }
    /**
     * Unsubscribe all
     */

  }, {
    key: "offAll",
    value: function offAll() {
      this._subscriptions.length = 0;
    } // emit event.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any

  }, {
    key: "emit",
    value: function emit(topic, args) {
      this._subscriptions.forEach(function (event) {
        if (event && event.topic == topic && event.callback) {
          event.callback(args);
        }
      });
    }
  }]);

  return TimelineEventsEmitter;
}();
// CONCATENATED MODULE: ./src/utils/timelineUtils.ts
function timelineUtils_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function timelineUtils_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function timelineUtils_createClass(Constructor, protoProps, staticProps) { if (protoProps) timelineUtils_defineProperties(Constructor.prototype, protoProps); if (staticProps) timelineUtils_defineProperties(Constructor, staticProps); return Constructor; }

var denominators = [1, 2, 5, 10];
var TimelineUtils = /*#__PURE__*/function () {
  function TimelineUtils() {
    timelineUtils_classCallCheck(this, TimelineUtils);
  }

  timelineUtils_createClass(TimelineUtils, null, [{
    key: "drawLine",
    value: function drawLine(ctx, x1, y1, x2, y2) {
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
    }
    /**
     * Check rectangle overlap.
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
  }, {
    key: "isRectOverlap",
    value: function isRectOverlap(rect, rect2) {
      if (!rect || !rect2) {
        console.log('Rectangles cannot be empty');
        return false;
      } // If one rectangle is on left side of other


      if (rect.x > rect2.x + rect2.width || rect2.x > rect.x + rect.width) {
        return true;
      } // If one rectangle is above other


      if (rect.y < rect2.y + rect2.height || rect2.y < rect.y + rect.height) {
        return true;
      }

      return false;
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
  }, {
    key: "sign",
    value: function sign(p) {
      return p >= 0 ? 1 : -1;
    }
  }, {
    key: "clearBrowserSelection",
    value: function clearBrowserSelection() {
      if (!window) {
        return;
      }

      if (window.getSelection) {
        window.getSelection().removeAllRanges();
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
      } // some optimization for numbers:


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
  }]);

  return TimelineUtils;
}();
// CONCATENATED MODULE: ./src/enums/timelineCursorType.ts
var TimelineCursorType;

(function (TimelineCursorType) {
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
})(TimelineCursorType || (TimelineCursorType = {}));
// CONCATENATED MODULE: ./src/enums/timelineKeyframeShape.ts
var TimelineKeyframeShape;

(function (TimelineKeyframeShape) {
  TimelineKeyframeShape["None"] = "none";
  TimelineKeyframeShape["Rhomb"] = "rhomb";
  TimelineKeyframeShape["Circle"] = "circle";
  TimelineKeyframeShape["Rect"] = "rect";
})(TimelineKeyframeShape || (TimelineKeyframeShape = {}));
// CONCATENATED MODULE: ./src/utils/timelineStyleUtils.ts
function timelineStyleUtils_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function timelineStyleUtils_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function timelineStyleUtils_createClass(Constructor, protoProps, staticProps) { if (protoProps) timelineStyleUtils_defineProperties(Constructor.prototype, protoProps); if (staticProps) timelineStyleUtils_defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable @typescript-eslint/no-explicit-any */
var TimelineStyleUtils = /*#__PURE__*/function () {
  function TimelineStyleUtils() {
    timelineStyleUtils_classCallCheck(this, TimelineStyleUtils);
  }

  timelineStyleUtils_createClass(TimelineStyleUtils, null, [{
    key: "getKeyframeStyle",

    /**
     * Get keyframe style from a keyframe, than from a row, than from a global settings.
     * @param keyframe keyframe to get style for.
     * @param row keyframe row.
     * @param propertyName property to get.
     * @param defaultValue default value to return
     * @param reverseOrder reverse styling order: global, row, keyframe
     */
    value: function getKeyframeStyle(keyframeStyle, rowStyle, options, propertyName, defaultValue) {
      var reverseOrder = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
      // Don't spawn new array for the normal order.
      var styles = null;

      if (keyframeStyle) {
        var style = keyframeStyle;

        if (style[propertyName] !== undefined) {
          var value = style[propertyName];

          if (!reverseOrder) {
            return value;
          }

          styles = styles || [];
          styles.push(value);
        }
      }

      if (rowStyle && rowStyle.keyframesStyle) {
        var _style = rowStyle.keyframesStyle;

        if (_style[propertyName] !== undefined) {
          var _value = _style[propertyName];

          if (!reverseOrder) {
            return _value;
          }

          styles = styles || [];
          styles.push(_value);
        }
      }

      var globalRowStyle = options ? options.rowsStyle : null;

      if (globalRowStyle && globalRowStyle.keyframesStyle) {
        var _style2 = globalRowStyle.keyframesStyle;

        if (_style2[propertyName] !== undefined) {
          var _value2 = _style2[propertyName];

          if (!reverseOrder) {
            return _value2;
          }

          styles = styles || [];
          styles.push(_value2);
        }
      }

      return reverseOrder && styles && styles.length > 0 ? styles[styles.length - 1] : defaultValue;
    }
    /**
     * Get row style from default settings or overrides by a row settings.
     */

  }, {
    key: "getRowStyle",
    value: function getRowStyle(rowStyle, options, propertyName, defaultValue) {
      var reverseOrder = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      // Don't spawn new array for the normal order.
      var styles = null;

      if (rowStyle) {
        var style = rowStyle;

        if (style[propertyName] !== undefined) {
          var results = style[propertyName];

          if (!reverseOrder) {
            return results;
          }

          styles = styles || [];
          styles.push(results);
        }
      }

      var globalRowStyle = options ? options.rowsStyle : null;

      if (globalRowStyle) {
        var _style3 = globalRowStyle;

        if (_style3[propertyName] !== undefined) {
          var _results = _style3[propertyName];

          if (!reverseOrder) {
            return _results;
          }

          styles = styles || [];
          styles.push(_results);
        }
      }

      return reverseOrder && styles && styles.length > 0 ? styles[styles.length - 1] : defaultValue;
    }
    /**
     * Get current row height from styling
     */

  }, {
    key: "getRowHeight",
    value: function getRowHeight(rowStyle, options) {
      return TimelineStyleUtils.getRowStyle(rowStyle, options, 'height', 24);
    }
  }, {
    key: "rowStripeHeight",
    value: function rowStripeHeight(rowStyle, options) {
      return TimelineStyleUtils.getRowStyle(rowStyle, options, 'stripeHeight', 'auto');
    }
  }, {
    key: "stripeFillColor",
    value: function stripeFillColor(rowStyle, options) {
      return TimelineStyleUtils.getRowStyle(rowStyle, options, 'stripeFillColor');
    }
  }, {
    key: "getRowMarginBottom",
    value: function getRowMarginBottom(rowStyle, options) {
      return TimelineStyleUtils.getRowStyle(rowStyle, options, 'marginBottom', 0);
    }
  }, {
    key: "keyframeDraggable",
    value: function keyframeDraggable(keyframe, rowStyle, options) {
      var defaultValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      return TimelineStyleUtils.getKeyframeStyle(keyframe, rowStyle, options, 'draggable', defaultValue, true);
    }
  }, {
    key: "stripeDraggable",
    value: function stripeDraggable(rowStyle, options) {
      var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return TimelineStyleUtils.getRowStyle(rowStyle, options, 'stripeDraggable', defaultValue, true);
    }
  }]);

  return TimelineStyleUtils;
}();
// CONCATENATED MODULE: ./src/enums/timelineElementType.ts
var TimelineElementType;

(function (TimelineElementType) {
  TimelineElementType["Timeline"] = "timeline";
  TimelineElementType["Keyframe"] = "keyframe";
  TimelineElementType["Stripe"] = "stripe";
  TimelineElementType["Row"] = "row";
})(TimelineElementType || (TimelineElementType = {}));
// CONCATENATED MODULE: ./src/enums/timelineEvents.ts
var TimelineEvents;

(function (TimelineEvents) {
  TimelineEvents["Selected"] = "selected";
  TimelineEvents["TimeChanged"] = "timechanged";
  TimelineEvents["DragStarted"] = "dragstarted";
  TimelineEvents["Drag"] = "drag";
  TimelineEvents["DragFinished"] = "dragfinished";
  TimelineEvents["Scroll"] = "scroll";
  TimelineEvents["DoubleClick"] = "doubleclick";
  TimelineEvents["MouseDown"] = "mousedown";
})(TimelineEvents || (TimelineEvents = {}));
// CONCATENATED MODULE: ./src/enums/timelineCapShape.ts
var TimelineCapShape;

(function (TimelineCapShape) {
  TimelineCapShape["None"] = "none";
  TimelineCapShape["Triangle"] = "triangle";
  TimelineCapShape["Rect"] = "rect";
})(TimelineCapShape || (TimelineCapShape = {}));
// CONCATENATED MODULE: ./src/enums/timelineInteractionMode.ts
var TimelineInteractionMode;

(function (TimelineInteractionMode) {
  TimelineInteractionMode["Selection"] = "selection";
  TimelineInteractionMode["Pan"] = "pan";
})(TimelineInteractionMode || (TimelineInteractionMode = {}));
// CONCATENATED MODULE: ./src/utils/events/timelineBaseEvent.ts
function timelineBaseEvent_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function timelineBaseEvent_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function timelineBaseEvent_createClass(Constructor, protoProps, staticProps) { if (protoProps) timelineBaseEvent_defineProperties(Constructor.prototype, protoProps); if (staticProps) timelineBaseEvent_defineProperties(Constructor, staticProps); return Constructor; }

function timelineBaseEvent_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TimelineBaseEvent = /*#__PURE__*/function () {
  function TimelineBaseEvent() {
    timelineBaseEvent_classCallCheck(this, TimelineBaseEvent);

    timelineBaseEvent_defineProperty(this, "_prevented", false);
  }

  timelineBaseEvent_createClass(TimelineBaseEvent, [{
    key: "preventDefault",

    /**
     * Prevent default click logic.
     */
    value: function preventDefault() {
      this._prevented = true;
    }
  }, {
    key: "isPrevented",
    value: function isPrevented() {
      return this._prevented;
    }
  }]);

  return TimelineBaseEvent;
}();
// CONCATENATED MODULE: ./src/utils/events/timelineClickEvent.ts
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function timelineClickEvent_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function timelineClickEvent_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var TimelineClickEvent = /*#__PURE__*/function (_TimelineBaseEvent) {
  _inherits(TimelineClickEvent, _TimelineBaseEvent);

  var _super = _createSuper(TimelineClickEvent);

  function TimelineClickEvent() {
    var _this;

    timelineClickEvent_classCallCheck(this, TimelineClickEvent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    timelineClickEvent_defineProperty(_assertThisInitialized(_this), "args", void 0);

    timelineClickEvent_defineProperty(_assertThisInitialized(_this), "pos", void 0);

    timelineClickEvent_defineProperty(_assertThisInitialized(_this), "val", void 0);

    timelineClickEvent_defineProperty(_assertThisInitialized(_this), "elements", void 0);

    timelineClickEvent_defineProperty(_assertThisInitialized(_this), "target", void 0);

    return _this;
  }

  return TimelineClickEvent;
}(TimelineBaseEvent);
// CONCATENATED MODULE: ./src/utils/events/timelineDragEvent.ts
function timelineDragEvent_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { timelineDragEvent_typeof = function _typeof(obj) { return typeof obj; }; } else { timelineDragEvent_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return timelineDragEvent_typeof(obj); }

function timelineDragEvent_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function timelineDragEvent_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) timelineDragEvent_setPrototypeOf(subClass, superClass); }

function timelineDragEvent_setPrototypeOf(o, p) { timelineDragEvent_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return timelineDragEvent_setPrototypeOf(o, p); }

function timelineDragEvent_createSuper(Derived) { var hasNativeReflectConstruct = timelineDragEvent_isNativeReflectConstruct(); return function () { var Super = timelineDragEvent_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = timelineDragEvent_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return timelineDragEvent_possibleConstructorReturn(this, result); }; }

function timelineDragEvent_possibleConstructorReturn(self, call) { if (call && (timelineDragEvent_typeof(call) === "object" || typeof call === "function")) { return call; } return timelineDragEvent_assertThisInitialized(self); }

function timelineDragEvent_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function timelineDragEvent_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function timelineDragEvent_getPrototypeOf(o) { timelineDragEvent_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return timelineDragEvent_getPrototypeOf(o); }


var TimelineDragEvent = /*#__PURE__*/function (_TimelineClickEvent) {
  timelineDragEvent_inherits(TimelineDragEvent, _TimelineClickEvent);

  var _super = timelineDragEvent_createSuper(TimelineDragEvent);

  function TimelineDragEvent() {
    timelineDragEvent_classCallCheck(this, TimelineDragEvent);

    return _super.apply(this, arguments);
  }

  return TimelineDragEvent;
}(TimelineClickEvent);
// CONCATENATED MODULE: ./src/settings/defaults.ts


var defaultTimelineStyle = {
  width: 2,
  marginTop: 15,
  capWidth: 4,
  capHeight: 10,

  /**
   * Draw timeline rectangular cap.
   */
  capType: TimelineCapShape.Rect,
  strokeColor: 'DarkOrange',
  fillColor: 'DarkOrange'
};
var defaultTimelineKeyframeStyle = {
  /**
   * keyframe fill color.
   */
  fillColor: 'red',
  shape: TimelineKeyframeShape.Rhomb,

  /**
   * Selected keyframe fill color.
   */
  selectedFillColor: 'DarkOrange',
  strokeColor: 'Black',
  strokeThickness: 0.2,
  draggable: true
};
var defaultTimelineRowStyle = {
  /**
   * Row height in pixels.
   */
  height: 24,
  marginBottom: 2,
  fillColor: '#252526',

  /**
   * Keyframes stripe color
   */
  stripeFillColor: '#094771',
  stripeHeight: 'auto',
  keyframesStyle: defaultTimelineKeyframeStyle
};
var defaultTimelineOptions = {
  /**
   * Snap the mouse to the values on a timeline.
   * Value can be from 1 to 60
   */
  snapsPerSeconds: 5,

  /**
   *  Snap all selected keyframes as a bundle during the drag.
   */
  snapAllKeyframesOnMove: false,

  /**
   * Check whether snapping is enabled.
   */
  snapEnabled: true,
  timelineStyle: defaultTimelineStyle,

  /**
   * approximate step for the timeline in pixels for 1 second
   */
  stepPx: 120,
  stepSmallPx: 30,
  smallSteps: 50,

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
   * Header height in pixels
   */
  headerHeight: 30,
  font: '11px sans-serif',
  zoom: 1000,
  // Zoom speed. Use percent of the screen to set zoom speed.
  zoomSpeed: 0.1,
  // Max zoom
  zoomMin: 80,
  // Min zoom
  zoomMax: 8000,

  /**
   * Set this to true in a MAC OS environment: The Meta key will be used instead of the Ctrl key.
   */
  controlKeyIsMetaKey: false,

  /**
   * Access the scroll container via this class for e.g. scroll bar styling.
   */
  scrollContainerClass: 'scroll-container',

  /**
   * keyframes stripe is draggable.
   */
  stripesDraggable: true,

  /**
   * keyframes stripe is draggable.
   */
  keyframesDraggable: true
};
var defaultTimelineConsts = {
  /**
   * Auto pan speed.
   */
  autoPanSpeed: 50,

  /**
   * scroll speed when mouse drag is used (from 0 to 1)
   */
  scrollByDragSpeed: 0.12,

  /**
   * Determine whether item was clicked.
   */
  clickDetectionMs: 120,

  /**
   * Timeout to detect double click.
   */
  doubleClickTimeoutMs: 400,

  /**
   * Time in ms used to refresh scrollbars when pan is finished.
   */
  scrollFinishedTimeoutMs: 500,

  /**
   * Auto pan padding
   */
  autoPanByScrollPadding: 10,

  /**
   * Click threshold
   */
  clickThreshold: 3
};
// CONCATENATED MODULE: ./src/enums/timelineEventSource.ts
var TimelineEventSource;

(function (TimelineEventSource) {
  TimelineEventSource["User"] = "user";
  TimelineEventSource["Programmatically"] = "programmatically";
  TimelineEventSource["SetTimeMethod"] = "setTimeMethod";
})(TimelineEventSource || (TimelineEventSource = {}));
// CONCATENATED MODULE: ./src/utils/events/timelineTimeChangedEvent.ts
function timelineTimeChangedEvent_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { timelineTimeChangedEvent_typeof = function _typeof(obj) { return typeof obj; }; } else { timelineTimeChangedEvent_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return timelineTimeChangedEvent_typeof(obj); }

function timelineTimeChangedEvent_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function timelineTimeChangedEvent_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) timelineTimeChangedEvent_setPrototypeOf(subClass, superClass); }

function timelineTimeChangedEvent_setPrototypeOf(o, p) { timelineTimeChangedEvent_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return timelineTimeChangedEvent_setPrototypeOf(o, p); }

function timelineTimeChangedEvent_createSuper(Derived) { var hasNativeReflectConstruct = timelineTimeChangedEvent_isNativeReflectConstruct(); return function () { var Super = timelineTimeChangedEvent_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = timelineTimeChangedEvent_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return timelineTimeChangedEvent_possibleConstructorReturn(this, result); }; }

function timelineTimeChangedEvent_possibleConstructorReturn(self, call) { if (call && (timelineTimeChangedEvent_typeof(call) === "object" || typeof call === "function")) { return call; } return timelineTimeChangedEvent_assertThisInitialized(self); }

function timelineTimeChangedEvent_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function timelineTimeChangedEvent_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function timelineTimeChangedEvent_getPrototypeOf(o) { timelineTimeChangedEvent_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return timelineTimeChangedEvent_getPrototypeOf(o); }

function timelineTimeChangedEvent_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var timelineTimeChangedEvent_TimelineTimeChangedEvent = /*#__PURE__*/function (_TimelineBaseEvent) {
  timelineTimeChangedEvent_inherits(TimelineTimeChangedEvent, _TimelineBaseEvent);

  var _super = timelineTimeChangedEvent_createSuper(TimelineTimeChangedEvent);

  function TimelineTimeChangedEvent() {
    var _this;

    timelineTimeChangedEvent_classCallCheck(this, TimelineTimeChangedEvent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    timelineTimeChangedEvent_defineProperty(timelineTimeChangedEvent_assertThisInitialized(_this), "val", 0);

    timelineTimeChangedEvent_defineProperty(timelineTimeChangedEvent_assertThisInitialized(_this), "prevVal", 0);

    timelineTimeChangedEvent_defineProperty(timelineTimeChangedEvent_assertThisInitialized(_this), "source", TimelineEventSource.User);

    return _this;
  }

  return TimelineTimeChangedEvent;
}(TimelineBaseEvent);
// CONCATENATED MODULE: ./src/timeline.ts
function timeline_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { timeline_typeof = function _typeof(obj) { return typeof obj; }; } else { timeline_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return timeline_typeof(obj); }

function timeline_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function timeline_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function timeline_createClass(Constructor, protoProps, staticProps) { if (protoProps) timeline_defineProperties(Constructor.prototype, protoProps); if (staticProps) timeline_defineProperties(Constructor, staticProps); return Constructor; }

function timeline_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) timeline_setPrototypeOf(subClass, superClass); }

function timeline_setPrototypeOf(o, p) { timeline_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return timeline_setPrototypeOf(o, p); }

function timeline_createSuper(Derived) { var hasNativeReflectConstruct = timeline_isNativeReflectConstruct(); return function () { var Super = timeline_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = timeline_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return timeline_possibleConstructorReturn(this, result); }; }

function timeline_possibleConstructorReturn(self, call) { if (call && (timeline_typeof(call) === "object" || typeof call === "function")) { return call; } return timeline_assertThisInitialized(self); }

function timeline_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function timeline_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = timeline_getPrototypeOf(object); if (object === null) break; } return object; }

function timeline_getPrototypeOf(o) { timeline_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return timeline_getPrototypeOf(o); }

function timeline_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }















var timeline_Timeline = /*#__PURE__*/function (_TimelineEventsEmitte) {
  timeline_inherits(Timeline, _TimelineEventsEmitte);

  var _super = timeline_createSuper(Timeline);

  /**
   * component container.
   */

  /**
   * Dynamically generated event.
   */

  /**
   * Dynamically generated scroll container.
   */

  /**
   * Dynamically generated virtual scroll content.
   */

  /**
   * Rendering context
   */

  /**
   * Components settings
   */

  /**
   * Drag start position.
   */

  /**
   * Drag scroll started position.
   */

  /**
   * scroll finished timer reference.
   */

  /**
   * TODO: should be tested on retina.
   */

  /**
   * Create Timeline instance
   * @param options Timeline settings.
   * @param model Timeline model.
   */
  function Timeline() {
    var _thisSuper, _thisSuper2, _thisSuper3, _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var model = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    timeline_classCallCheck(this, Timeline);

    _this = _super.call(this); // Allow to create instance without an error to perform tests.

    timeline_defineProperty(timeline_assertThisInitialized(_this), "_container", null);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "_canvas", null);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "_scrollContainer", null);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "_scrollContent", null);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "_ctx", null);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "_options", null);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "_startPos", null);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "_scrollStartPos", {
      x: 0,
      y: 0
    });

    timeline_defineProperty(timeline_assertThisInitialized(_this), "_currentPos", null);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "_selectionRect", null);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "_selectionRectEnabled", false);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "_drag", null);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "_startedDragWithCtrl", false);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "_startedDragWithShiftKey", false);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "_clickTimeout", 0);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "_lastClickTime", 0);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "_lastClickPoint", null);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "_consts", defaultTimelineConsts);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "_clickAllowed", false);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "_scrollFinishedTimerRef", null);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "_selectedKeyframes", []);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "_val", 0);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "_pixelRatio", 1);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "_currentZoom", 0);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "_intervalRef", null);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "_autoPanLastActionDate", 0);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "_isPanStarted", false);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "_interactionMode", TimelineInteractionMode.Selection);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "_lastUsedArgs", null);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "_model", null);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "_handleBlurEvent", function () {
      _this._cleanUpSelection();
    });

    timeline_defineProperty(timeline_assertThisInitialized(_this), "_handleWindowResizeEvent", function () {
      // Rescale and redraw
      _this.rescale();

      _this.redraw();
    });

    timeline_defineProperty(timeline_assertThisInitialized(_this), "_handleDocumentKeydownEvent", function (args) {
      // ctrl + a. Select all keyframes
      if (args.which === 65 && _this._controlKeyPressed(args)) {
        _this._performSelection(true);

        args.preventDefault();
        return false;
      }
    });

    timeline_defineProperty(timeline_assertThisInitialized(_this), "_handleScrollEvent", function (args) {
      _this._clearScrollFinishedTimer(); // Set a timeout to run event 'scrolling end'.


      _this._scrollFinishedTimerRef = setTimeout(function () {
        if (!_this._isPanStarted) {
          if (_this._scrollFinishedTimerRef) {
            clearTimeout(_this._scrollFinishedTimerRef);
            _this._scrollFinishedTimerRef = null;
          }

          _this.rescale();

          _this.redraw();
        }
      }, _this._consts.scrollFinishedTimeoutMs);

      _this.redraw();

      var scrollEvent = {
        args: args,
        scrollLeft: _this._scrollContainer.scrollLeft,
        scrollTop: _this._scrollContainer.scrollTop,
        scrollHeight: _this._scrollContainer.scrollHeight,
        scrollWidth: _this._scrollContainer.scrollWidth
      };

      _get((_thisSuper = timeline_assertThisInitialized(_this), timeline_getPrototypeOf(Timeline.prototype)), "emit", _thisSuper).call(_thisSuper, TimelineEvents.Scroll, scrollEvent);
    });

    timeline_defineProperty(timeline_assertThisInitialized(_this), "_handleWheelEvent", function (event) {
      if (_this._controlKeyPressed(event)) {
        event.preventDefault();

        if (_this._options.zoomSpeed > 0 && _this._options.zoomSpeed <= 1) {
          var mousePos = _this._getMousePos(_this._canvas, event);

          var x = mousePos.x;

          if (x <= 0) {
            x = 0;
          }

          var val = _this.pxToVal(_this._scrollContainer.scrollLeft + x, false);

          var diff = _this._canvas.clientWidth / x;

          var zoom = TimelineUtils.sign(event.deltaY) * _this._options.zoom * _this._options.zoomSpeed;

          _this._currentZoom += zoom;

          if (_this._currentZoom > _this._options.zoomMax) {
            _this._currentZoom = _this._options.zoomMax;
          }

          if (_this._currentZoom < _this._options.zoomMin) {
            _this._currentZoom = _this._options.zoomMin;
          }

          var zoomCenter = _this.valToPx(val, true);

          var newScrollLeft = Math.round(zoomCenter - _this._canvas.clientWidth / diff);

          if (newScrollLeft <= 0) {
            newScrollLeft = 0;
          }

          _this._rescaleInternal(newScrollLeft + _this._canvas.clientWidth, null, 'zoom');

          if (_this._scrollContainer.scrollLeft != newScrollLeft) {
            // Scroll event will redraw the screen.
            _this._scrollContainer.scrollLeft = newScrollLeft;
          }

          _this.redraw();
        }
      } else {
        _this._scrollContainer.scrollTop += event.deltaY;
        event.preventDefault();
      }
    });

    timeline_defineProperty(timeline_assertThisInitialized(_this), "_handleMouseDownEvent", function (args) {
      var isDoubleClick = Date.now() - _this._lastClickTime < _this._consts.doubleClickTimeoutMs; // Prevent drag of the canvas if canvas is selected as text:


      TimelineUtils.clearBrowserSelection();
      _this._startPos = _this._trackMousePos(_this._canvas, args);

      if (!_this._startPos) {
        return;
      } // Don't allow to perform double click if mouse was moved to far.


      if (_this._lastClickPoint && _this._startPos && TimelineUtils.getDistance(_this._lastClickPoint.x, _this._lastClickPoint.y, _this._startPos.x, _this._startPos.y) > _this._consts.clickThreshold) {
        isDoubleClick = false;
      }

      _this._lastClickPoint = _this._startPos;
      _this._scrollStartPos = {
        x: _this._scrollContainer.scrollLeft,
        y: _this._scrollContainer.scrollTop
      };
      _this._clickAllowed = true;

      var elements = _this.elementFromPoint(_this._startPos, Math.max(2, _this._startPos.radius));

      var target = _this._findDraggable(elements, _this._startPos.val);

      var event = new TimelineClickEvent();
      event.pos = _this._startPos;
      event.val = _this._startPos.val;
      event.args = args; // all elements under the click:

      event.elements = elements; // target element.

      event.target = target;

      if (isDoubleClick) {
        _get((_thisSuper2 = timeline_assertThisInitialized(_this), timeline_getPrototypeOf(Timeline.prototype)), "emit", _thisSuper2).call(_thisSuper2, TimelineEvents.DoubleClick, event);

        return;
      }

      _get((_thisSuper3 = timeline_assertThisInitialized(_this), timeline_getPrototypeOf(Timeline.prototype)), "emit", _thisSuper3).call(_thisSuper3, TimelineEvents.MouseDown, event);

      _this._clickTimeout = Date.now();
      _this._lastClickTime = Date.now();

      if (event.isPrevented()) {
        _this._cleanUpSelection();

        return;
      }

      _this._currentPos = _this._startPos; // Select keyframes on mouse down

      if (target) {
        _this._drag = {
          changed: false,
          target: target,
          val: target.val,
          type: target.type,
          elements: []
        };

        if (target.type === TimelineElementType.Keyframe) {
          _this._startedDragWithCtrl = _this._controlKeyPressed(args);
          _this._startedDragWithShiftKey = args.shiftKey; // get all related selected keyframes if we are selecting one.

          if (!target.keyframe.selected && !_this._controlKeyPressed(args) && !args.shiftKey) {
            _this._performSelection(true, target.keyframe);
          } // Allow to drag all selected keyframes on a screen


          _this._drag.elements = _this.getSelectedElements();
        } else if (target.type === TimelineElementType.Stripe) {
          var keyframes = _this._drag.target.row.keyframes;
          _this._drag.elements = keyframes && Array.isArray(keyframes) ? keyframes.map(function (keyframe) {
            return _this._convertToElement(_this._drag.target.row, keyframe);
          }) : [];
        } else {
          _this._drag.elements = [_this._drag.target];
        }
      }

      _this.redraw();
    });

    timeline_defineProperty(timeline_assertThisInitialized(_this), "_handleMouseMoveEvent", function (args) {
      if (!args) {
        args = _this._lastUsedArgs;
      } else {
        _this._lastUsedArgs = args;
      }

      if (!args) {
        return;
      }

      var isTouch = args.changedTouches && args.changedTouches.length > 0;
      _this._currentPos = _this._trackMousePos(_this._canvas, args);

      if (!_this._isPanStarted && _this._selectionRect && _this._clickTimeoutIsOver()) {
        _this._selectionRectEnabled = true;
      }

      args = args;

      if (_this._startPos) {
        if (args.buttons == 1 || isTouch) {
          var isChanged = false;

          if (_this._drag && !_this._startedDragWithCtrl) {
            var convertedVal = _this._mousePosToVal(_this._currentPos.x, true); //redraw();


            if (_this._drag.type === TimelineElementType.Timeline) {
              isChanged = _this._setTimeInternal(convertedVal, TimelineEventSource.User) || isChanged;
            } else if ((_this._drag.type == TimelineElementType.Keyframe || _this._drag.type == TimelineElementType.Stripe) && _this._drag.elements) {
              var offset = Math.floor(convertedVal - _this._drag.val);

              if (Math.abs(offset) > 0) {
                // don't allow to move less than zero.
                _this._drag.elements.forEach(function (p) {
                  if (_this._options.snapAllKeyframesOnMove) {
                    var toSet = _this.snapVal(p.keyframe.val);

                    isChanged = _this._setKeyframePos(p.keyframe, toSet) || isChanged;
                  }

                  var newPosition = p.val + offset;

                  if (newPosition < 0) {
                    offset = -p.val;
                  }
                });

                if (Math.abs(offset) > 0) {
                  // don't allow to move less than zero.
                  _this._drag.elements.forEach(function (element) {
                    var toSet = element.keyframe.val + offset;
                    isChanged = _this._setKeyframePos(element.keyframe, toSet) || isChanged;

                    if (isChanged) {
                      element.val = element.keyframe.val;
                    }
                  });
                }

                if (isChanged) {
                  if (!_this._drag.changed) {
                    _this._emitDragStartedEvent();
                  }

                  _this._drag.changed = true;
                  _this._drag.val += offset;

                  _this._emitDragEvent();
                }
              }
            }
          }

          if (_this._interactionMode === TimelineInteractionMode.Pan && !_this._drag) {
            _this._isPanStarted = true; // Track scroll by drag.

            _this._scrollByPan(_this._startPos, _this._currentPos, _this._scrollStartPos);
          } else {
            // Track scroll by mouse or touch out of the area.
            _this._scrollBySelectionOutOfBounds(_this._currentPos);
          }

          _this.redraw();
        } else {
          // Fallback. Cancel mouse move when focus was lost and mouse down is still counted.
          _this._cleanUpSelection();

          _this.redraw();
        }
      } else if (!isTouch) {
        // TODO: mouse over event
        var elements = _this.elementFromPoint(_this._currentPos, Math.max(2, _this._currentPos.radius));

        var target = _this._findDraggable(elements, _this._currentPos.val);

        _this._setCursor(TimelineCursorType.Default);

        if (target) {
          var cursor = null;

          if (target.type === TimelineElementType.Stripe) {
            cursor = cursor || TimelineCursorType.EWResize;
          } else if (target.type == TimelineElementType.Keyframe) {
            cursor = cursor || TimelineCursorType.Pointer;
          } else if (target.type == TimelineElementType.Timeline) {
            cursor = cursor || TimelineCursorType.EWResize;
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

    timeline_defineProperty(timeline_assertThisInitialized(_this), "_handleMouseUpEvent", function (args) {
      if (_this._startPos) {
        //window.releaseCapture();
        var pos = _this._trackMousePos(_this._canvas, args); // Click detection.


        if (_this._clickAllowed || !_this._clickTimeoutIsOver() || _this._drag && _this._startedDragWithCtrl || _this._drag && _this._startedDragWithShiftKey) {
          _this._performClick(pos, args, _this._drag);
        } else if (!_this._drag && _this._selectionRect && _this._selectionRectEnabled) {
          _this._performSelection(true, _this._selectionRect, args.shiftKey);
        }

        _this._cleanUpSelection();

        _this.redraw();
      }
    });

    timeline_defineProperty(timeline_assertThisInitialized(_this), "_redrawInternal", function () {
      if (!_this._ctx) {
        return;
      } // Rescale when animation is played out of the bounds.


      if (_this.valToPx(_this._val, true) > _this._scrollContainer.scrollWidth) {
        _this.rescale();

        if (!_this._isPanStarted && _this._drag && _this._drag.type !== TimelineElementType.Timeline) {
          _this.scrollLeft();
        }
      }

      _this._renderBackground();

      _this._renderRows(); // Render after rows


      _this._renderHeaderBackground();

      _this._renderTicks();

      _this._renderKeyframes();

      _this._renderSelectionRect();

      _this._renderTimeline();
    });

    if (options || model) {
      _this.initialize(options, model);
    }

    return _this;
  }
  /**
   * Initialize Timeline
   * @param options Timeline settings.
   * @param model Timeline model.
   */


  timeline_createClass(Timeline, [{
    key: "initialize",
    value: function initialize(options, model) {
      this._model = model;

      if (!options || !options.id) {
        throw new Error("Element cannot be empty. Should be string or DOM element.");
      }

      var id = options.id;
      this._options = this._mergeOptions(options);
      this._currentZoom = this._options.zoom;

      if (id instanceof HTMLElement) {
        this._container = id;
      } else {
        this._container = document.getElementById(id);
      }

      if (!this._container) {
        throw new Error("Element cannot be empty. Should be string or DOM element.");
      }

      this._scrollContainer = document.createElement('div');
      this._scrollContent = document.createElement('div');
      this._canvas = document.createElement('canvas');

      if (!this._canvas || !this._canvas.getContext) {
        console.log('Cannot initialize canvas context.');
        return null;
      }

      this._container.style.position = 'relative'; // Generate size container:

      this._canvas.style.cssText = 'image-rendering: -moz-crisp-edges;' + 'image-rendering: -webkit-crisp-edges;' + 'image-rendering: pixelated;' + 'image-rendering: crisp-edges;' + 'user-select: none;' + '-webkit-user-select: none;' + '-khtml-user-select: none;' + '-moz-user-select: none;' + '-o-user-select: none;' + 'user-select: none;' + 'touch-action: none;' + 'position: relative;' + '-webkit-user-drag: none;' + '-khtml-user-drag: none;' + '-moz-user-drag: none;' + '-o-user-drag: none;' + 'user-drag: none;' + 'padding: inherit';

      this._scrollContainer.classList.add(this._options.scrollContainerClass);

      this._scrollContainer.style.cssText = 'overflow: scroll;' + 'position: absolute;' + 'width:  100%;' + 'height:  100%;';
      this._scrollContent.style.width = this._scrollContent.style.height = '100%'; // add the text node to the created div

      this._scrollContainer.appendChild(this._scrollContent);

      this._container.appendChild(this._scrollContainer);

      var scrollBarWidth = this._scrollContainer.offsetWidth - this._scrollContent.clientWidth; // Calculate current browser scroll bar size and add offset for the canvas

      this._canvas.style.width = this._canvas.style.height = 'calc(100% -' + (scrollBarWidth || 17) + 'px)';

      this._container.appendChild(this._canvas);

      if (this._options.fillColor) {
        this._scrollContainer.style.background = this._options.fillColor;
      } // Normalize and validate span per seconds


      this._options.snapsPerSeconds = Math.max(0, Math.min(60, this._options.snapsPerSeconds || 0));
      this._ctx = this._canvas.getContext('2d');

      this._subscribeOnEvents();

      this.rescale();
      this.redraw();
    }
    /**
     * Subscribe current component on the related events.
     */

  }, {
    key: "_subscribeOnEvents",
    value: function _subscribeOnEvents() {
      this._container.addEventListener('wheel', this._handleWheelEvent);

      if (this._scrollContainer) {
        this._scrollContainer.addEventListener('scroll', this._handleScrollEvent);
      }

      window.addEventListener('blur', this._handleBlurEvent, false);
      window.addEventListener('resize', this._handleWindowResizeEvent, false);
      document.addEventListener('keydown', this._handleDocumentKeydownEvent, false);

      this._canvas.addEventListener('touchstart', this._handleMouseDownEvent, false);

      this._canvas.addEventListener('mousedown', this._handleMouseDownEvent, false);

      window.addEventListener('mousemove', this._handleMouseMoveEvent, false);
      window.addEventListener('touchmove', this._handleMouseMoveEvent, false);
      window.addEventListener('mouseup', this._handleMouseUpEvent, false);
      window.addEventListener('touchend', this._handleMouseUpEvent, false);
    }
  }, {
    key: "dispose",
    value: function dispose() {
      // Unsubscribe all events
      this.offAll();
      this._container = null;
      this._canvas = null;
      this._scrollContainer = null;
      this._scrollContent = null;
      this._ctx = null;

      this._cleanUpSelection();

      this._container.removeEventListener('wheel', this._handleWheelEvent);

      if (this._scrollContainer) {
        this._scrollContainer.removeEventListener('scroll', this._handleScrollEvent);
      }

      window.removeEventListener('blur', this._handleBlurEvent);
      window.removeEventListener('resize', this._handleWindowResizeEvent);
      document.removeEventListener('keydown', this._handleDocumentKeydownEvent);

      this._canvas.removeEventListener('touchstart', this._handleMouseDownEvent);

      this._canvas.removeEventListener('mousedown', this._handleMouseDownEvent);

      window.removeEventListener('mousemove', this._handleMouseMoveEvent);
      window.removeEventListener('touchmove', this._handleMouseMoveEvent);
      window.removeEventListener('mouseup', this._handleMouseUpEvent);
      window.removeEventListener('touchend', this._handleMouseUpEvent); // Stop times

      this._stopAutoPan();

      this._clearScrollFinishedTimer();
    }
  }, {
    key: "_clearScrollFinishedTimer",
    value: function _clearScrollFinishedTimer() {
      if (this._scrollFinishedTimerRef) {
        clearTimeout(this._scrollFinishedTimerRef);
        this._scrollFinishedTimerRef = null;
      }
    }
  }, {
    key: "_controlKeyPressed",
    value: function _controlKeyPressed(e) {
      return this._options.controlKeyIsMetaKey || this._options.controlKeyIsMetaKey ? e.metaKey : e.ctrlKey;
    }
  }, {
    key: "_performClick",
    value: function _performClick(pos, args, drag) {
      var isChanged = false;

      if (drag && drag.type === TimelineElementType.Keyframe) {
        var isSelected = true;

        if (this._startedDragWithCtrl && this._controlKeyPressed(args) || this._startedDragWithShiftKey && args.shiftKey) {
          if (this._controlKeyPressed(args)) {
            isSelected = !drag.target.keyframe.selected;
          }
        } // Reverse selected keyframe selection by a click:


        isChanged = this._performSelection(isSelected, this._drag.target.keyframe, this._controlKeyPressed(args) || args.shiftKey) || isChanged;

        if (args.shiftKey) {
          // change timeline pos:
          var convertedVal = this._mousePosToVal(pos.x, true); // Set current timeline position if it's not a drag or selection rect small or fast click.


          isChanged = this._setTimeInternal(convertedVal, TimelineEventSource.User) || isChanged;
        }
      } else {
        // deselect keyframes if any:
        isChanged = this._performSelection(false) || isChanged; // change timeline pos:
        // Set current timeline position if it's not a drag or selection rect small or fast click.

        isChanged = this._setTimeInternal(this._mousePosToVal(pos.x, true), TimelineEventSource.User) || isChanged;
      }

      return isChanged;
    }
    /**
     * Set keyframe value.
     * @param keyframe
     * @param value
     */

  }, {
    key: "_setKeyframePos",
    value: function _setKeyframePos(keyframe, value) {
      value = Math.floor(value);

      if (keyframe && keyframe.val != value) {
        keyframe.val = value;
        return true;
      }

      return false;
    }
    /**
     * @param cursor to set.
     */

  }, {
    key: "_setCursor",
    value: function _setCursor(cursor) {
      if (this._canvas.style.cursor != cursor) {
        this._canvas.style.cursor = cursor;
      }
    }
    /**
     * Set pan mode
     * @param isPan
     */

  }, {
    key: "setInteractionMode",
    value: function setInteractionMode(mode) {
      if (this._interactionMode != mode) {
        this._interactionMode = mode; // Avoid any conflicts with other modes:

        this._cleanUpSelection();
      }
    }
    /**
     * Get current interaction mode.
     */

  }, {
    key: "getInteractionMode",
    value: function getInteractionMode() {
      return this._interactionMode;
    }
  }, {
    key: "_convertToElement",
    value: function _convertToElement(row, keyframe) {
      var data = {
        type: TimelineElementType.Keyframe,
        val: keyframe.val,
        keyframe: keyframe,
        row: row
      };
      return data;
    }
  }, {
    key: "getSelectedElements",
    value: function getSelectedElements() {
      var _this2 = this;

      var selected = [];

      this._forEachKeyframe(function (keyframe, index, rowModel) {
        if (keyframe && keyframe.selected) {
          selected.push(_this2._convertToElement(rowModel.row, keyframe));
        }

        return;
      });

      return selected;
    }
    /**
     * Do the selection.
     * @param {boolean} isSelected
     * @param {object} selector can be a rectangle or a keyframe object.
     * @param {boolean} ignoreOthers value indicating whether all other object should be reversed.
     * @return {boolean} isChanged
     */

  }, {
    key: "_performSelection",
    value: function _performSelection() {
      var _this3 = this;

      var isSelected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var ignoreOthers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var deselectionMode = false; // TODO: simplify

      if (!selector) {
        if (!isSelected) {
          isSelected = false;
        }

        deselectionMode = isSelected;
      }

      this._selectedKeyframes.length = 0;
      var isChanged = true;

      this._forEachKeyframe(function (keyframe, keyframeIndex, rowSize) {
        var keyframePos = _this3._getKeyframePosition(keyframe, rowSize);

        if (keyframePos) {
          if (selector && selector === keyframe || TimelineUtils.isOverlap(keyframePos.x, keyframePos.y, selector)) {
            if (keyframe.selected != isSelected) {
              keyframe.selected = isSelected;
              isChanged = true;
            }

            if (keyframe.selected) {
              _this3._selectedKeyframes.push(keyframe);
            }
          } else {
            // Deselect all other keyframes.
            if (!ignoreOthers && keyframe.selected != deselectionMode) {
              keyframe.selected = deselectionMode;
              isChanged = deselectionMode;
            }
          }
        }

        return;
      });

      if (isChanged) {
        this._emitKeyframesSelected(this._selectedKeyframes);
      }

      return isChanged;
    }
    /**
     * foreach visible keyframe.
     */

  }, {
    key: "_forEachKeyframe",
    value: function _forEachKeyframe(callback) {
      var calculateStripesBounds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (!this._model) {
        return;
      }

      var model = this._calculateRowsBounds(calculateStripesBounds);

      if (!model) {
        return;
      }

      model.rows.forEach(function (rowSize, index) {
        if (!rowSize) {
          return;
        }

        var row = rowSize.row;

        if (!row || !row.keyframes || !Array.isArray(row.keyframes) || row.keyframes.length <= 0) {
          return;
        }

        var nextRow = true;
        row.keyframes.filter(function (p) {
          return p && !p.hidden;
        }).forEach(function (keyframe, keyframeIndex) {
          if (callback && keyframe) {
            callback(keyframe, keyframeIndex, rowSize, index, nextRow);
          }

          nextRow = false;
        });
      });
    }
  }, {
    key: "_trackMousePos",
    value: function _trackMousePos(canvas, mouseArgs) {
      var pos = this._getMousePos(canvas, mouseArgs);

      pos.val = this.pxToVal(pos.x + this._scrollContainer.scrollLeft);
      pos.snapVal = this.snapVal(pos.val);

      if (this._startPos) {
        if (!this._selectionRect) {
          this._selectionRect = {};
        } // get the pos with the virtualization:


        var x = Math.floor(this._startPos.x + (this._scrollStartPos.x - this._scrollContainer.scrollLeft));
        var y = Math.floor(this._startPos.y + (this._scrollStartPos.y - this._scrollContainer.scrollTop));
        this._selectionRect.x = Math.min(x, pos.x);
        this._selectionRect.y = Math.min(y, pos.y);
        this._selectionRect.width = Math.max(x, pos.x) - this._selectionRect.x;
        this._selectionRect.height = Math.max(y, pos.y) - this._selectionRect.y; // Once mouse was moved outside of the bounds it's not a click anymore

        if (this._clickAllowed) {
          this._clickAllowed = this._selectionRect.height <= this._consts.clickThreshold && this._selectionRect.width <= this._consts.clickThreshold;
        }
      }

      return pos;
    }
  }, {
    key: "_cleanUpSelection",
    value: function _cleanUpSelection() {
      this._emitDragFinishedEvent();

      this._startPos = null;
      this._drag = null;
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
    /**
     * Automatically pan. Scroll canvas when selection is made and mouse outside of the bounds.
     */

  }, {
    key: "_startAutoPan",
    value: function _startAutoPan() {
      var _this4 = this;

      if (this._consts.autoPanSpeed) {
        if (!this._intervalRef) {
          // Repeat move calls to
          this._intervalRef = setInterval(function () {
            _this4._handleMouseMoveEvent(null);
          }, this._consts.autoPanSpeed);
        }
      }
    }
    /**
     * Stop current running auto pan
     */

  }, {
    key: "_stopAutoPan",
    value: function _stopAutoPan() {
      if (this._intervalRef) {
        clearInterval(this._intervalRef);
        this._intervalRef = null;
      }

      this._autoPanLastActionDate = null;
    }
    /**
     * Check whether auto pan should be slowed down a bit.
     */

  }, {
    key: "_checkUpdateSpeedTooFast",
    value: function _checkUpdateSpeedTooFast() {
      // Slow down updated a bit.
      if (this._autoPanLastActionDate && Date.now() - this._autoPanLastActionDate <= 10) {
        return true;
      }

      this._autoPanLastActionDate = Date.now();
      return false;
    }
  }, {
    key: "_scrollByPan",
    value: function _scrollByPan(start, pos, scrollStartPos) {
      if (!start || !pos) {
        return;
      }

      var offsetX = Math.round(start.x - pos.x);
      var newLeft = scrollStartPos.x + offsetX;

      if (offsetX > 0) {
        this._rescaleInternal(newLeft + this._canvas.clientWidth);
      }

      if (offsetX > 0 && newLeft + this._canvas.clientWidth >= this._scrollContainer.scrollWidth - 5) {
        this._scrollContainer.scrollLeft = this._scrollContainer.scrollWidth;
      } else {
        this._scrollContainer.scrollLeft = newLeft;
      }

      this._scrollContainer.scrollTop = Math.round(start.y - pos.y);
    }
  }, {
    key: "_scrollBySelectionOutOfBounds",
    value: function _scrollBySelectionOutOfBounds(pos) {
      var x = pos.x;
      var y = pos.y;
      var isChanged = false;
      var speedX = 0;
      var speedY = 0; // Small offset to start auto pan earlier.

      var bounds = this._consts.autoPanByScrollPadding;
      var isLeft = x <= bounds;
      var isRight = x >= this._canvas.clientWidth - bounds;
      var isTop = y <= bounds;
      var isBottom = y >= this._canvas.clientHeight - bounds;
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
          speedX = TimelineUtils.getDistance(x, this._canvas.clientWidth - bounds) * scrollSpeedMultiplier;
          newWidth = this._scrollContainer.scrollLeft + this._canvas.clientWidth + speedX;
        }

        if (isTop) {
          // Get normalized speed.
          speedY = -TimelineUtils.getDistance(x, bounds) * scrollSpeedMultiplier / 4;
        } else if (isBottom) {
          // Get normalized speed:
          speedY = TimelineUtils.getDistance(x, this._canvas.clientHeight - bounds) * scrollSpeedMultiplier / 4;
          newHeight = this._scrollContainer.scrollTop + this._canvas.clientHeight;
        }
      } else {
        this._stopAutoPan();
      }

      if (newWidth || newHeight) {
        this._rescaleInternal(newWidth, newHeight, 'scrollBySelection');
      }

      if (Math.abs(speedX) > 0) {
        this._scrollContainer.scrollLeft += speedX;
        isChanged = true;
      }

      if (Math.abs(speedY) > 0) {
        this._scrollContainer.scrollTop += speedY;
        isChanged = true;
      }

      return isChanged;
    }
    /**
     * Convert screen pixel to value.
     */

  }, {
    key: "pxToVal",
    value: function pxToVal(coords) {
      var absolute = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (!absolute) {
        coords -= this._options.leftMargin;
      }

      var ms = coords / this._options.stepPx * this._options.zoom;
      return ms;
    }
    /**
     * Convert area value to screen pixel coordinates.
     */

  }, {
    key: "valToPx",
    value: function valToPx(ms) {
      var absolute = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      // Respect current scroll container offset. (virtualization)
      if (!absolute) {
        var x = this._scrollContainer.scrollLeft;
        ms -= this.pxToVal(x);
      }

      return ms * this._options.stepPx / this._options.zoom;
    }
    /**
     * Snap a value to a nearest beautiful point.
     */

  }, {
    key: "snapVal",
    value: function snapVal(ms) {
      // Apply snap to steps if enabled.
      if (this._options.snapsPerSeconds && this._options.snapEnabled) {
        var stopsPerPixel = 1000 / this._options.snapsPerSeconds;
        var step = ms / stopsPerPixel;
        var stepsFit = Math.round(step);
        ms = Math.round(stepsFit * stopsPerPixel);
      } // TODO: allow negative values.


      if (ms < 0) {
        ms = 0;
      }

      return ms;
    }
  }, {
    key: "_mousePosToVal",
    value: function _mousePosToVal(x) {
      var snapEnabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var convertedVal = this.pxToVal(this._scrollContainer.scrollLeft + Math.min(x, this._canvas.clientWidth));
      convertedVal = Math.round(convertedVal);

      if (snapEnabled) {
        convertedVal = this.snapVal(convertedVal);
      }

      return convertedVal;
    }
    /**
     * Format line gauge text.
     * Default formatting is HMS
     * @param ms milliseconds to convert.
     * @param isSeconds whether seconds are passed.
     */

  }, {
    key: "_formatLineGaugeText",
    value: function _formatLineGaugeText(ms) {
      var isSeconds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      // 1- Convert to seconds:
      var seconds = ms / 1000;

      if (isSeconds) {
        seconds = ms;
      }

      var year = Math.floor(seconds / (365 * 86400));
      seconds = seconds % (365 * 86400);
      var days = Math.floor(seconds / 86400);
      seconds = seconds % 86400; // 2- Extract hours:

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
        str += minutes + ':';
      }

      if (!isNaN(seconds)) {
        str += seconds;
      }

      return str;
    }
  }, {
    key: "_renderTicks",
    value: function _renderTicks() {
      if (!this._ctx || !this._options) {
        return;
      }

      this._ctx.save();

      var areaWidth = this._scrollContainer.scrollWidth - (this._options.leftMargin || 0);
      var from = this.pxToVal(0);
      var to = this.pxToVal(areaWidth);
      var dist = TimelineUtils.getDistance(from, to);

      if (dist === 0) {
        return;
      } // normalize step.


      var stepsCanFit = areaWidth / this._options.stepPx;
      var realStep = dist / stepsCanFit; // Find the nearest 'beautiful' step for a line gauge. This step should be divided by 1/2/5!
      //let step = realStep;

      var step = TimelineUtils.findGoodStep(realStep);

      if (step == 0 || isNaN(step) || !isFinite(step)) {
        return;
      }

      var goodStepDistancePx = areaWidth / (dist / step);
      var smallStepsCanFit = goodStepDistancePx / this._options.stepSmallPx;
      var realSmallStep = step / smallStepsCanFit;
      var smallStep = TimelineUtils.findGoodStep(realSmallStep, step);

      if (step % smallStep != 0) {
        smallStep = realSmallStep;
      } // filter to draw only visible


      var visibleFrom = this.pxToVal(this._scrollContainer.scrollLeft + this._options.leftMargin || 0);
      var visibleTo = this.pxToVal(this._scrollContainer.scrollLeft + this._scrollContainer.clientWidth); // Find beautiful start point:

      from = Math.floor(visibleFrom / step) * step; // Find a beautiful end point:

      to = Math.ceil(visibleTo / step) * step + step;
      var lastTextX = null;

      for (var i = from; i <= to; i += step) {
        var pos = this.valToPx(i);

        var sharpPos = this._getSharp(Math.round(pos));

        this._ctx.save();

        this._ctx.beginPath();

        this._ctx.setLineDash([4]);

        this._ctx.lineWidth = 1;
        this._ctx.strokeStyle = this._options.tickColor;
        TimelineUtils.drawLine(this._ctx, sharpPos, (this._options.headerHeight || 0) / 2, sharpPos, this._canvas.clientHeight);

        this._ctx.stroke();

        this._ctx.fillStyle = this._options.labelsColor;

        if (this._options.font) {
          this._ctx.font = this._options.font;
        }

        var text = this._formatLineGaugeText(i);

        var textSize = this._ctx.measureText(text);

        var textX = sharpPos - textSize.width / 2; // skip text render if there is no space for it.

        if (isNaN(lastTextX) || lastTextX <= textX) {
          lastTextX = textX + textSize.width;

          this._ctx.fillText(text, textX, 10);
        }

        this._ctx.restore(); // Draw small steps


        for (var x = i + smallStep; x < i + step; x += smallStep) {
          var nextPos = this.valToPx(x);

          var nextSharpPos = this._getSharp(Math.floor(nextPos));

          this._ctx.beginPath();

          this._ctx.lineWidth = this._pixelRatio;
          this._ctx.strokeStyle = this._options.tickColor;
          TimelineUtils.drawLine(this._ctx, nextSharpPos, (this._options.headerHeight || 0) / 1.3, nextSharpPos, this._options.headerHeight);

          this._ctx.stroke();
        }
      }

      this._ctx.restore();
    }
    /**
     * calculate screen positions of the model elements.
     */

  }, {
    key: "_calculateRowsBounds",
    value: function _calculateRowsBounds() {
      var _this5 = this;

      var includeStipesBounds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var toReturn = {
        rows: [],
        area: {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        },
        minValue: null,
        maxValue: null
      };

      if (!this._model) {
        return toReturn;
      }

      var rows = this._model.rows;

      if (!rows || !Array.isArray(rows) || rows.length <= 0) {
        return toReturn;
      }

      var rowAbsoluteHeight = this._options.headerHeight;
      rows.filter(function (p) {
        return p && !p.hidden;
      }).forEach(function (row, index) {
        if (!row) {
          return;
        } // draw with scroll virtualization:


        var rowHeight = TimelineStyleUtils.getRowHeight(row, _this5._options);
        var marginBottom = TimelineStyleUtils.getRowMarginBottom(row, _this5._options);
        var currentRowY = rowAbsoluteHeight - _this5._scrollContainer.scrollTop;
        rowAbsoluteHeight += rowHeight + marginBottom;

        if (index == 0) {
          toReturn.area.y = currentRowY;
        }

        toReturn.area.height = Math.max(rowAbsoluteHeight + rowHeight, toReturn.area.height);
        var rowData = {
          x: 0,
          y: currentRowY,
          width: _this5._canvas.clientWidth,
          height: rowHeight,
          marginBottom: marginBottom,
          row: row,
          index: index,
          minValue: null,
          maxValue: null
        };
        toReturn.rows.push(rowData);

        if (!includeStipesBounds && (!row.keyframes || !row.keyframes.forEach || row.keyframes.length <= 0)) {
          return;
        } // Get min and max ms to draw keyframe rows:


        if (row && row.keyframes) {
          row.keyframes.forEach(function (keyframe) {
            var val = keyframe.val;

            if (keyframe && !isNaN(val)) {
              rowData.minValue = rowData.minValue == null ? val : Math.min(val, rowData.minValue);
              rowData.maxValue = rowData.maxValue == null ? val : Math.max(val, rowData.maxValue);
            }
          });
        } // get keyframes stripe size


        if (!isNaN(rowData.minValue) && !isNaN(rowData.maxValue)) {
          // get stripe screen coords
          var stripeRect = _this5._getKeyframesStripeSize(row, rowData.y, rowData.minValue, rowData.maxValue);

          rowData.stripeRect = stripeRect;
        } // get absolute min and max bounds:


        if (toReturn.minValue !== null && rowData.minValue !== null) {
          toReturn.minValue = Math.min(rowData.minValue, toReturn.minValue);
        } else if (rowData.minValue !== null) {
          toReturn.minValue = rowData.minValue;
        }

        if (toReturn.maxValue !== null && rowData.maxValue !== null) {
          toReturn.maxValue = Math.min(rowData.maxValue, toReturn.maxValue);
        } else if (rowData.maxValue !== null) {
          toReturn.maxValue = rowData.maxValue;
        }
      });

      if (toReturn.maxValue !== null) {
        toReturn.area.width = this.valToPx(toReturn.maxValue, true);
      }

      return toReturn;
    }
  }, {
    key: "_renderRows",
    value: function _renderRows() {
      var _this6 = this;

      var data = this._calculateRowsBounds();

      if (data && data.rows) {
        this._ctx.save();

        data.rows.forEach(function (rowData) {
          if (!rowData) {
            return;
          }

          _this6._ctx.fillStyle = TimelineStyleUtils.getRowStyle(rowData.row, _this6._options, 'fillColor', '#252526'); //this._ctx.fillRect(data.areaRect.x, data.areaRect.y, data.areaRect.w, data.areaRect.h);
          // Note: bounds used instead of the clip while clip is slow!

          var bounds = _this6._cutBounds(rowData);

          if (bounds) {
            _this6._ctx.fillRect(bounds.x, bounds.y, bounds.width, bounds.height);
          }

          var keyframeLaneColor = TimelineStyleUtils.stripeFillColor(rowData.row, _this6._options);

          if (rowData.row.keyframes && rowData.row.keyframes.length <= 1 || !keyframeLaneColor) {
            return;
          } // get the bounds on a canvas


          var rectBounds = _this6._cutBounds(rowData.stripeRect);

          if (rectBounds) {
            _this6._ctx.fillStyle = keyframeLaneColor;

            _this6._ctx.fillRect(rectBounds.x, rectBounds.y, rectBounds.width, rectBounds.height);
          }
        });

        this._ctx.restore();
      }
    }
    /**
     * Method is used for the optimization.
     * Only visible part should be rendered.
     */

  }, {
    key: "_cutBounds",
    value: function _cutBounds(rect) {
      if (!rect) {
        return null;
      } // default bounds: minX, maxX, minY, maxY


      var minX = 0,
          maxX = this._canvas.clientWidth,
          minY = this._options.headerHeight || 0,
          maxY = this._canvas.clientWidth;

      if (TimelineUtils.isRectOverlap(rect, {
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
          height: rect.height + offsetH,
          width: rect.width + offsetW,
          x: x,
          y: y,
          overlapY: Math.abs(offsetH) > 0,
          overlapX: Math.abs(offsetW) > 0
        };
      }

      return null;
    }
    /**
     * get keyframe stripe screen rect coordinates.
     * @param row
     * @param rowY row screen coords y position
     */

  }, {
    key: "_getKeyframesStripeSize",
    value: function _getKeyframesStripeSize(row, rowY, minValue, maxValue) {
      var stripeHeight = TimelineStyleUtils.rowStripeHeight(row, this._options);
      var height = TimelineStyleUtils.getRowHeight(row, this._options);

      if (!stripeHeight && stripeHeight !== 0 || isNaN(stripeHeight) || stripeHeight == 'auto') {
        stripeHeight = Math.floor(height * 0.7);
      }

      if (stripeHeight > height) {
        stripeHeight = height;
      }

      var margin = height - stripeHeight; // draw keyframes rows.

      var xMin = this.valToPx(minValue);
      var xMax = this.valToPx(maxValue);
      return {
        x: xMin,
        y: rowY + Math.floor(margin / 2),
        height: stripeHeight,
        width: TimelineUtils.getDistance(xMin, xMax)
      };
    }
  }, {
    key: "_getKeyframePosition",
    value: function _getKeyframePosition(keyframe, rowSize) {
      if (!keyframe) {
        console.log('keyframe should be defined.');
        return null;
      }

      var val = keyframe.val;

      if (isNaN(val)) {
        return null;
      } // get center of the lane:


      var y = rowSize.y + rowSize.height / 2; // TODO: keyframe size:

      var size = 1; //this._options.keyframeSizePx || keyframe.size;
      //if (size == "auto") {

      size = rowSize.height / 3; //}

      if (size > 0) {
        if (!isNaN(val)) {
          var toReturn = {
            x: Math.floor(this.valToPx(val)),
            y: Math.floor(y),
            height: size,
            width: size
          };
          return toReturn;
        }
      }

      return null;
    }
  }, {
    key: "_renderKeyframes",
    value: function _renderKeyframes() {
      var _this7 = this;

      this._forEachKeyframe(function (keyframe, keyframeIndex, rowSize) {
        var row = rowSize.row;

        var pos = _this7._getKeyframePosition(keyframe, rowSize);

        if (pos) {
          var x = _this7._getSharp(pos.x);

          var y = pos.y;
          var size = pos.height;

          var bounds = _this7._cutBounds({
            x: x - size / 2,
            y: y - size / 2,
            width: size,
            height: size
          });

          if (!bounds) {
            return;
          }

          _this7._ctx.save(); // Performance FIX: use clip only  when we are in the collision! Clip is slow!
          // Other keyframes should be hidden by bounds check.


          if (bounds && bounds.overlapY) {
            _this7._ctx.beginPath();

            _this7._ctx.rect(0, _this7._options.headerHeight || 0, _this7._canvas.clientWidth, _this7._canvas.clientWidth);

            _this7._ctx.clip();
          }

          var shape = TimelineStyleUtils.getKeyframeStyle(keyframe, row, _this7._options, 'shape', TimelineKeyframeShape.Rhomb);

          if (shape === TimelineKeyframeShape.None) {
            return;
          }

          var keyframeColor = TimelineStyleUtils.getKeyframeStyle(keyframe, row, _this7._options, keyframe.selected ? 'fillColor' : 'selectedFillColor', keyframe.selected ? 'red' : 'DarkOrange');
          var border = TimelineStyleUtils.getKeyframeStyle(keyframe, row, _this7._options, 'strokeThickness', 0.2);
          var strokeColor = border > 0 ? TimelineStyleUtils.getKeyframeStyle(keyframe, row, _this7._options, 'strokeColor', 'Black') : '';

          if (shape == TimelineKeyframeShape.Rhomb) {
            _this7._ctx.beginPath();

            _this7._ctx.translate(x, y);

            _this7._ctx.rotate(45 * Math.PI / 180);

            if (border > 0 && strokeColor) {
              _this7._ctx.fillStyle = strokeColor;

              _this7._ctx.rect(-size / 2, -size / 2, size, size);

              _this7._ctx.fill();
            }

            _this7._ctx.fillStyle = keyframeColor; // draw main keyframe data with offset.

            _this7._ctx.translate(border, border);

            _this7._ctx.rect(-size / 2, -size / 2, size - border * 2, size - border * 2);

            _this7._ctx.fill();
          } else if (shape == TimelineKeyframeShape.Circle) {
            _this7._ctx.beginPath();

            if (border > 0 && strokeColor) {
              _this7._ctx.fillStyle = strokeColor;

              _this7._ctx.arc(x, y, size, 0, 2 * Math.PI);
            }

            _this7._ctx.fillStyle = keyframeColor;

            _this7._ctx.arc(x, y, size - border, 0, 2 * Math.PI);

            _this7._ctx.fill();
          } else if (shape == TimelineKeyframeShape.Rect) {
            _this7._ctx.beginPath();

            y = y - size / 2;
            x = x - size / 2;

            if (border > 0 && strokeColor) {
              _this7._ctx.fillStyle = strokeColor;

              _this7._ctx.rect(x, y, size, size);

              _this7._ctx.fill();
            }

            _this7._ctx.fillStyle = keyframeColor;

            _this7._ctx.rect(x + border, y + border, size - border, size - border);

            _this7._ctx.fill();
          }

          _this7._ctx.restore();
        }

        return;
      });
    }
  }, {
    key: "_renderSelectionRect",
    value: function _renderSelectionRect() {
      if (this._drag) {
        return;
      }

      this._ctx.save();

      var thickness = 1;

      if (this._selectionRect && this._selectionRectEnabled) {
        this._ctx.setLineDash([4]);

        this._ctx.lineWidth = this._pixelRatio;
        this._ctx.strokeStyle = this._options.selectionColor;

        this._ctx.strokeRect(this._getSharp(this._selectionRect.x, thickness), this._getSharp(this._selectionRect.y, thickness), Math.floor(this._selectionRect.width), Math.floor(this._selectionRect.height));
      }

      this._ctx.restore();
    }
  }, {
    key: "_renderBackground",
    value: function _renderBackground() {
      if (this._options.fillColor) {
        this._ctx.save();

        this._ctx.beginPath();

        this._ctx.rect(0, 0, this._canvas.clientWidth, this._canvas.clientHeight);

        this._ctx.fillStyle = this._options.fillColor;

        this._ctx.fill();

        this._ctx.restore();
      } else {
        // Clear if bg not set.
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
      }
    }
  }, {
    key: "_renderTimeline",
    value: function _renderTimeline() {
      if (!this._options || !this._options.timelineStyle) {
        return;
      }

      var style = this._options.timelineStyle;

      this._ctx.save();

      var thickness = style.width || 1;
      this._ctx.lineWidth = thickness * this._pixelRatio;

      var timeLinePos = this._getSharp(Math.round(this.valToPx(this._val)), thickness);

      this._ctx.strokeStyle = style.strokeColor;
      this._ctx.fillStyle = style.fillColor;
      var y = style.marginTop;

      this._ctx.beginPath();

      TimelineUtils.drawLine(this._ctx, timeLinePos, y, timeLinePos, this._canvas.clientHeight);

      this._ctx.stroke();

      if (style.capHeight && style.capWidth) {
        var rectSize = style.capWidth;
        var capHeight = style.capHeight;

        if (style.capType === TimelineCapShape.Triangle) {
          this._ctx.beginPath();

          this._ctx.moveTo(timeLinePos - rectSize / 2, y);

          this._ctx.lineTo(timeLinePos + rectSize / 2, y);

          this._ctx.lineTo(timeLinePos, capHeight);

          this._ctx.closePath();

          this._ctx.stroke();
        } else if (style.capType === TimelineCapShape.Rect) {
          this._ctx.fillRect(timeLinePos - rectSize / 2, y, rectSize, capHeight);

          this._ctx.fill();
        }
      }

      this._ctx.restore();
    }
  }, {
    key: "_renderHeaderBackground",
    value: function _renderHeaderBackground() {
      if (!isNaN(this._options.headerHeight) && this._options.headerHeight > 0) {
        this._ctx.save(); // draw ticks background


        this._ctx.lineWidth = this._pixelRatio;

        if (this._options.headerFillColor) {
          // draw ticks background
          this._ctx.lineWidth = this._pixelRatio; // draw header background

          this._ctx.fillStyle = this._options.headerFillColor;

          this._ctx.fillRect(0, 0, this._canvas.clientWidth, this._options.headerHeight);
        } else {
          this._ctx.clearRect(0, 0, this._canvas.clientWidth, this._options.headerHeight);
        }

        this._ctx.restore();
      }
    }
  }, {
    key: "redraw",
    value: function redraw() {
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(this._redrawInternal);
      } else {
        this._redrawInternal();
      }
    }
    /**
     * perform scroll to max left.
     */

  }, {
    key: "scrollLeft",
    value: function scrollLeft() {
      if (this._scrollContainer.scrollLeft != this._scrollContainer.scrollWidth) {
        this._scrollContainer.scrollLeft = this._scrollContainer.scrollWidth;
      }
    }
    /**
     * Redraw parts of the component in the specific order.
     */

  }, {
    key: "getRowByY",

    /**
     * Get row by y coordinate.
     * @param posY y screen coordinate.
     */
    value: function getRowByY(posY) {
      var model = this._calculateRowsBounds();

      if (model && model.rows) {
        for (var i = 0; i < model.rows.length; i++) {
          var _row = model.rows[i];

          if (_row && _row.y >= posY && posY <= _row.y + _row.height) {
            return _row;
          }
        }
      }

      return null;
    }
    /**
     * Find sharp pixel position
     */

  }, {
    key: "_getSharp",
    value: function _getSharp(pos) {
      var thickness = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      if (thickness % 2 == 0) {
        return pos;
      }

      return pos + this._pixelRatio / 2;
    }
    /**
     * Get current time:
     */

  }, {
    key: "getTime",
    value: function getTime() {
      return this._val;
    }
    /**
     * Set current time internal
     * @param val value.
     * @param source event source.
     */

  }, {
    key: "_setTimeInternal",
    value: function _setTimeInternal(val) {
      var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : TimelineEventSource.Programmatically;
      val = Math.round(val);

      if (val < 0) {
        val = 0;
      }

      if (this._val != val) {
        var timelineEvent = new timelineTimeChangedEvent_TimelineTimeChangedEvent();
        timelineEvent.val = val;
        var prevVal = this._val;
        timelineEvent.prevVal = prevVal;
        timelineEvent.source = source;
        this._val = val;
        this.emit(TimelineEvents.Selected, timelineEvent);

        if (timelineEvent.isPrevented()) {
          this._val = prevVal;
          return false;
        }

        return true;
      }

      return false;
    }
  }, {
    key: "setTime",
    value: function setTime(val) {
      // don't allow to change time during drag:
      if (this._drag && this._drag.type === TimelineElementType.Timeline) {
        return false;
      }

      return this._setTimeInternal(val, TimelineEventSource.SetTimeMethod);
    }
  }, {
    key: "select",
    value: function select() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      this._performSelection(value);

      this.redraw();
    }
  }, {
    key: "getOptions",
    value: function getOptions() {
      return this._options;
    }
  }, {
    key: "setScrollLeft",
    value: function setScrollLeft(value) {
      if (this._scrollContainer) {
        this._scrollContainer.scrollLeft = value;
      }
    }
  }, {
    key: "setScrollTop",
    value: function setScrollTop(value) {
      if (this._scrollContainer) {
        this._scrollContainer.scrollTop = value;
      }
    }
  }, {
    key: "getScrollLeft",
    value: function getScrollLeft() {
      return this._scrollContainer ? this._scrollContainer.scrollLeft : 0;
    }
  }, {
    key: "getScrollTop",
    value: function getScrollTop() {
      return this._scrollContainer ? this._scrollContainer.scrollTop : 0;
    }
    /**
     * Set this._options.
     * Options will be merged with the defaults and control invalidated
     */

  }, {
    key: "setOptions",
    value: function setOptions(toSet) {
      this._options = this._mergeOptions(toSet);
      this.rescale();
      this.redraw(); // Merged options:

      return this._options;
    }
  }, {
    key: "getModel",
    value: function getModel() {
      return this._model;
    }
    /**
     * Set model and redraw application.
     * @param data
     */

  }, {
    key: "setModel",
    value: function setModel(data) {
      this._model = data;
      this.rescale();
      this.redraw();
    } // eslint-disable-next-line @typescript-eslint/no-explicit-any

  }, {
    key: "_getMousePos",
    value: function _getMousePos(canvas, e) {
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
      scaleX = canvas.width / this._pixelRatio / rect.width,
          // relationship bitmap vs. element for X
      scaleY = canvas.height / this._pixelRatio / rect.height; // relationship bitmap vs. element for Y

      var x = (clientX - rect.left) * scaleX;
      var y = (clientY - rect.top) * scaleY; // scale mouse coordinates after they have been adjusted to be relative to element

      return {
        x: x,
        y: y,
        radius: radius
      };
    }
    /**
     * Apply container div size to the container on changes detected.
     */

  }, {
    key: "_updateCanvasScale",
    value: function _updateCanvasScale() {
      if (!this._scrollContainer || !this._ctx) {
        console.log('control should be initialized first');
        return;
      }

      var changed = false;
      var width = this._scrollContainer.clientWidth * this._pixelRatio;
      var height = this._scrollContainer.clientHeight * this._pixelRatio;

      if (Math.floor(width) != Math.floor(this._ctx.canvas.width)) {
        this._ctx.canvas.width = width;
        changed = true;
      }

      if (Math.floor(height) != Math.floor(this._ctx.canvas.height)) {
        this._ctx.canvas.height = height;
        changed = true;
      }

      if (changed) {
        this._ctx.setTransform(this._pixelRatio, 0, 0, this._pixelRatio, 0, 0);
      }

      return changed;
    }
    /**
     * Rescale and update size of the container.
     */

  }, {
    key: "rescale",
    value: function rescale() {
      this._rescaleInternal();
    }
  }, {
    key: "_rescaleInternal",
    value: function _rescaleInternal() {
      var newWidth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var newHeight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var scrollMode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'default';

      this._updateCanvasScale();

      var data = this._calculateRowsBounds();

      if (data && data.area) {
        var additionalOffset = this._options.stepPx;
        newWidth = newWidth || 0; // not less than current timeline position

        var timelineGlobalPos = this.valToPx(this._val, true);
        var timelinePos = 0;

        if (timelineGlobalPos > this._canvas.clientWidth) {
          if (scrollMode == 'scrollBySelection') {
            timelinePos = Math.floor(timelineGlobalPos + this._canvas.clientWidth + (this._options.stepPx || 0));
          } else {
            timelinePos = Math.floor(timelineGlobalPos + this._canvas.clientWidth / 1.5);
          }
        }

        var keyframeW = data.area.width + this._options.leftMargin + additionalOffset;
        newWidth = Math.max(newWidth, // keyframes size
        keyframeW, // not less than current scroll position
        this._scrollContainer.scrollLeft + this._canvas.clientWidth, timelinePos);
        var minWidthPx = Math.floor(newWidth) + 'px';

        if (minWidthPx != this._scrollContent.style.minWidth) {
          this._scrollContent.style.minWidth = minWidthPx;
        }

        newHeight = Math.max(Math.floor(data.area.height + this._canvas.clientHeight * 0.2), this._scrollContainer.scrollTop + this._canvas.clientHeight - 1, Math.round(newHeight || 0));
        var h = newHeight + 'px';

        if (this._scrollContent.style.minHeight != h) {
          this._scrollContent.style.minHeight = h;
        }
      }
    }
    /**
     * get draggable element.
     * Filter elements and get first element by a priority.
     * @param Array
     * @param val current mouse value
     */

  }, {
    key: "_findDraggable",
    value: function _findDraggable(elements) {
      var _this8 = this;

      var val = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      // filter and sort: Timeline, individual keyframes, stripes (distance).
      var getPriority = function getPriority(type) {
        if (type === TimelineElementType.Timeline) {
          return 1;
        } else if (type === TimelineElementType.Keyframe) {
          return 2;
        } else if (type === TimelineElementType.Stripe) {
          return 3;
        }

        return -1;
      };

      var filteredElements = elements.filter(function (element) {
        if (!element) {
          return false;
        }

        if (element.type === TimelineElementType.Keyframe) {
          if (!TimelineStyleUtils.keyframeDraggable(element.keyframe, element.row, _this8._options)) {
            return false;
          }
        } else if (element.type === TimelineElementType.Stripe) {
          if (!TimelineStyleUtils.stripeDraggable(element.row, _this8._options)) {
            return false;
          }
        } else if (element.type === TimelineElementType.Row) {
          return false;
        }

        return true;
      });
      var sorted = filteredElements.sort(function (a, b) {
        var prioA = getPriority(a.type);
        var prioB = getPriority(b.type);

        if (prioA === prioB) {
          if (val === null) {
            return 0;
          } // Sort by distance


          prioA = TimelineUtils.getDistance(a.val, val);
          prioB = TimelineUtils.getDistance(b.val, val);

          if (prioA === prioB) {
            return 0;
          }

          return prioA < prioB ? 1 : -1;
        }

        return prioA < prioB ? 1 : -1;
      });

      if (sorted.length > 0) {
        return sorted[sorted.length - 1];
      }

      return null;
    }
    /**
     * get all clickable elements by a screen point.
     */

  }, {
    key: "elementFromPoint",
    value: function elementFromPoint(pos) {
      var _this9 = this;

      var clickRadius = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
      clickRadius = Math.max(clickRadius, 1);
      var toReturn = [];

      if (!pos) {
        return toReturn;
      } // Check whether we can drag timeline.


      var timeLinePos = this.valToPx(this._val);
      var width = 0;

      if (this._options && this._options.timelineStyle) {
        var timelineStyle = this._options.timelineStyle;
        width = Math.max((timelineStyle.width || 1) * this._pixelRatio, (timelineStyle.capWidth || 0) * this._pixelRatio || 1) + clickRadius;
      } // Allow to select timeline only by half of a header to allow select by a selector top most keyframes row.


      if (pos.y <= this._options.headerHeight * 0.5 || pos.x >= timeLinePos - width / 2 && pos.x <= timeLinePos + width / 2) {
        toReturn.push({
          val: this._val,
          type: TimelineElementType.Timeline
        });
      }

      if (pos.y >= this._options.headerHeight && this._options.keyframesDraggable) {
        this._forEachKeyframe(function (keyframe, keyframeIndex, rowModel, rowIndex, isNextRow) {
          // Check keyframes stripe overlap
          if (isNextRow && rowModel.stripeRect) {
            var rowOverlapped = TimelineUtils.isOverlap(pos.x, pos.y, rowModel);

            if (rowOverlapped) {
              var _row2 = {
                val: _this9._mousePosToVal(pos.x, true),
                type: TimelineElementType.Row,
                row: rowModel.row
              };
              toReturn.push(_row2);
            }

            var keyframesStripeOverlapped = TimelineUtils.isOverlap(pos.x, pos.y, rowModel.stripeRect);

            if (keyframesStripeOverlapped) {
              var stripe = {
                val: _this9._mousePosToVal(pos.x, true),
                type: TimelineElementType.Stripe,
                row: rowModel.row
              };

              var snapped = _this9.snapVal(rowModel.minValue); // get snapped mouse pos based on a min value.


              stripe.val += rowModel.minValue - snapped;
              toReturn.push(stripe);
            }
          }

          var keyframePos = _this9._getKeyframePosition(keyframe, rowModel);

          if (keyframePos) {
            var dist = TimelineUtils.getDistance(keyframePos.x, keyframePos.y, pos.x, pos.y);

            if (dist <= keyframePos.height + clickRadius) {
              toReturn.push({
                keyframe: keyframe,
                val: keyframe.val,
                row: rowModel.row,
                type: TimelineElementType.Keyframe
              });
            }
          }

          return;
        }, true);
      }

      return toReturn;
    }
    /**
     * Merge options with the defaults.
     */

  }, {
    key: "_mergeOptions",
    value: function _mergeOptions(toSet) {
      toSet = toSet || {}; // Apply incoming options to default. (override default)
      // Deep clone default options:

      var options = JSON.parse(JSON.stringify(defaultTimelineOptions)); // Merge options with the default.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any

      var mergeOptionsDeep = function mergeOptionsDeep(to, from) {
        if (!to || !from) {
          return;
        } // eslint-disable-next-line prefer-const


        for (var key in to) {
          if (Object.prototype.hasOwnProperty.call(from, key)) {
            if (to[key] == undefined) {
              to[key] = from[key];
            } else if (timeline_typeof(to[key]) === 'object') {
              mergeOptionsDeep(to[key], from[key]);
            }
          }
        }
      };

      mergeOptionsDeep(options, toSet);
      return options;
    }
    /**
     * Subscribe on time changed.
     */

  }, {
    key: "onTimeChanged",
    value: function onTimeChanged(callback) {
      this.on(TimelineEvents.DragStarted, callback);
    }
    /**
     * Subscribe on drag started event.
     */

  }, {
    key: "onDragStarted",
    value: function onDragStarted(callback) {
      this.on(TimelineEvents.DragStarted, callback);
    }
    /**
     * Subscribe on drag event.
     */

  }, {
    key: "onDrag",
    value: function onDrag(callback) {
      this.on(TimelineEvents.Drag, callback);
    }
    /**
     * Subscribe on drag finished event.
     */

  }, {
    key: "onDragFinished",
    value: function onDragFinished(callback) {
      this.on(TimelineEvents.DragFinished, callback);
    }
    /**
     * Subscribe on double click.
     */

  }, {
    key: "onDoubleClick",
    value: function onDoubleClick(callback) {
      this.on(TimelineEvents.DoubleClick, callback);
    }
    /**
     * Subscribe on drag finished event.
     */

  }, {
    key: "onMouseDown",
    value: function onMouseDown(callback) {
      this.on(TimelineEvents.MouseDown, callback);
    }
    /**
     * Subscribe on scroll event
     */

  }, {
    key: "onScroll",
    value: function onScroll(callback) {
      this.on(TimelineEvents.Scroll, callback);
    }
  }, {
    key: "_emitDragStartedEvent",
    value: function _emitDragStartedEvent() {
      var args = this._getDragEventArgs();

      this.emit(TimelineEvents.DragStarted, args);
      return args;
    }
  }, {
    key: "_emitDragFinishedEvent",
    value: function _emitDragFinishedEvent() {
      if (this._drag && this._drag.changed) {
        var args = this._getDragEventArgs();

        this.emit(TimelineEvents.DragFinished, args);
        return args;
      }
    }
  }, {
    key: "_emitDragEvent",
    value: function _emitDragEvent() {
      if (this._drag) {
        var args = this._getDragEventArgs();

        this.emit(TimelineEvents.Drag, {
          keyframes: this._drag.elements
        });
        return args;
      }

      return null;
    }
  }, {
    key: "_emitKeyframesSelected",
    value: function _emitKeyframesSelected(selectedKeyframes) {
      // TODO: refine, add changed
      this.emit(TimelineEvents.Selected, {
        keyframes: selectedKeyframes
      });
    }
  }, {
    key: "_getDragEventArgs",
    value: function _getDragEventArgs() {
      var draggableArguments = new TimelineDragEvent();

      if (this._drag) {
        draggableArguments.val = this._currentPos.val;
        draggableArguments.pos = this._currentPos;
        draggableArguments.elements = this._drag.elements;
        draggableArguments.target = this._drag.target;
      }

      return draggableArguments;
    }
  }]);

  return Timeline;
}(TimelineEventsEmitter);
// EXTERNAL MODULE: ./src/timelineModel.ts
var timelineModel = __webpack_require__(1);

// EXTERNAL MODULE: ./src/timelineRow.ts
var timelineRow = __webpack_require__(2);

// EXTERNAL MODULE: ./src/timelineKeyframe.ts
var timelineKeyframe = __webpack_require__(3);

// EXTERNAL MODULE: ./src/settings/timelineConsts.ts
var timelineConsts = __webpack_require__(4);

// EXTERNAL MODULE: ./src/settings/timelineOptions.ts
var timelineOptions = __webpack_require__(5);

// EXTERNAL MODULE: ./src/settings/styles/timelineKeyframeStyle.ts
var timelineKeyframeStyle = __webpack_require__(6);

// EXTERNAL MODULE: ./src/settings/styles/timelineRowStyle.ts
var timelineRowStyle = __webpack_require__(7);

// EXTERNAL MODULE: ./src/settings/styles/timelineStyle.ts
var styles_timelineStyle = __webpack_require__(8);

// EXTERNAL MODULE: ./src/utils/timelineClickableElement.ts
var timelineClickableElement = __webpack_require__(9);

// EXTERNAL MODULE: ./src/utils/selectable.ts
var selectable = __webpack_require__(10);

// EXTERNAL MODULE: ./src/utils/rowsCalculationsResults.ts
var rowsCalculationsResults = __webpack_require__(0);

// EXTERNAL MODULE: ./src/utils/cutBoundsRect.ts
var cutBoundsRect = __webpack_require__(11);

// EXTERNAL MODULE: ./src/utils/events/timelineSelectedEvent.ts
var timelineSelectedEvent = __webpack_require__(12);

// EXTERNAL MODULE: ./src/utils/events/timelineScrollEvent.ts
var timelineScrollEvent = __webpack_require__(13);

// CONCATENATED MODULE: ./src/animation-timeline.ts
// bundle entry point




























 // private defaults are exposed:







/***/ })
/******/ ]);
});