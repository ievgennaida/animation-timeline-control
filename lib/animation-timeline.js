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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "Timeline", function() { return /* reexport */ timeline_Timeline; });
__webpack_require__.d(__webpack_exports__, "TimelineModel", function() { return /* reexport */ TimelineModel; });
__webpack_require__.d(__webpack_exports__, "TimelineRow", function() { return /* reexport */ timelineRow["TimelineRow"]; });
__webpack_require__.d(__webpack_exports__, "TimelineKeyframe", function() { return /* reexport */ timelineKeyframe["TimelineKeyframe"]; });
__webpack_require__.d(__webpack_exports__, "TimelineEventsEmitter", function() { return /* reexport */ TimelineEventsEmitter; });
__webpack_require__.d(__webpack_exports__, "TimelineOptions", function() { return /* reexport */ timelineOptions_TimelineOptions; });
__webpack_require__.d(__webpack_exports__, "TimelineStyleUtils", function() { return /* reexport */ TimelineStyleUtils; });
__webpack_require__.d(__webpack_exports__, "TimelineKeyframeStyle", function() { return /* reexport */ timelineKeyframeStyle["TimelineKeyframeStyle"]; });
__webpack_require__.d(__webpack_exports__, "TimelineRowStyle", function() { return /* reexport */ timelineRowStyle["TimelineRowStyle"]; });
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
__webpack_require__.d(__webpack_exports__, "TimelineEvents", function() { return /* reexport */ TimelineEvents; });
__webpack_require__.d(__webpack_exports__, "TimelineConsts", function() { return /* reexport */ TimelineConsts; });
__webpack_require__.d(__webpack_exports__, "TimelineKeyframeShape", function() { return /* reexport */ TimelineKeyframeShape; });
__webpack_require__.d(__webpack_exports__, "TimelineInteractionMode", function() { return /* reexport */ TimelineInteractionMode; });
__webpack_require__.d(__webpack_exports__, "TimelineElementType", function() { return /* reexport */ TimelineElementType; });
__webpack_require__.d(__webpack_exports__, "TimelineCursorType", function() { return /* reexport */ TimelineCursorType; });
__webpack_require__.d(__webpack_exports__, "TimelineCapShape", function() { return /* reexport */ TimelineCapShape; });

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
// CONCATENATED MODULE: ./src/enums/timelineKeyframeShape.ts
var TimelineKeyframeShape;

(function (TimelineKeyframeShape) {
  TimelineKeyframeShape["None"] = "none";
  TimelineKeyframeShape["Rhomb"] = "rhomb";
  TimelineKeyframeShape["Circle"] = "circle";
  TimelineKeyframeShape["Rect"] = "rect";
})(TimelineKeyframeShape || (TimelineKeyframeShape = {}));
// CONCATENATED MODULE: ./src/enums/timelineCapShape.ts
var TimelineCapShape;

(function (TimelineCapShape) {
  TimelineCapShape["None"] = "none";
  TimelineCapShape["Triangle"] = "triangle";
  TimelineCapShape["Rect"] = "rect";
})(TimelineCapShape || (TimelineCapShape = {}));
// CONCATENATED MODULE: ./src/settings/timelineOptions.ts
function timelineOptions_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function timelineOptions_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var timelineOptions_TimelineOptions = function TimelineOptions() {
  timelineOptions_classCallCheck(this, TimelineOptions);

  timelineOptions_defineProperty(this, "id", void 0);

  timelineOptions_defineProperty(this, "snapsPerSeconds", 5);

  timelineOptions_defineProperty(this, "snapEnabled", true);

  timelineOptions_defineProperty(this, "snapAllKeyframesOnMove", false);

  timelineOptions_defineProperty(this, "timelineThicknessPx", 2);

  timelineOptions_defineProperty(this, "timelineMarginTopPx", 15);

  timelineOptions_defineProperty(this, "timelineCapWidthPx", 4);

  timelineOptions_defineProperty(this, "timelineCapHeightPx", 10);

  timelineOptions_defineProperty(this, "timelineCap", TimelineCapShape.Rect);

  timelineOptions_defineProperty(this, "timelineColor", 'DarkOrange');

  timelineOptions_defineProperty(this, "stepPx", 120);

  timelineOptions_defineProperty(this, "stepSmallPx", 30);

  timelineOptions_defineProperty(this, "smallSteps", 50);

  timelineOptions_defineProperty(this, "leftMarginPx", 25);

  timelineOptions_defineProperty(this, "headerFillColor", '#101011');

  timelineOptions_defineProperty(this, "fillColor", '#101011');

  timelineOptions_defineProperty(this, "labelsColor", '#D5D5D5');

  timelineOptions_defineProperty(this, "tickColor", '#D5D5D5');

  timelineOptions_defineProperty(this, "selectionColor", 'White');

  timelineOptions_defineProperty(this, "rowsStyle", {
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
    keyframesStyle: {
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
    }
  });

  timelineOptions_defineProperty(this, "headerHeight", 30);

  timelineOptions_defineProperty(this, "ticksFont", '11px sans-serif');

  timelineOptions_defineProperty(this, "zoom", 1000);

  timelineOptions_defineProperty(this, "zoomSpeed", 0.1);

  timelineOptions_defineProperty(this, "zoomMin", 80);

  timelineOptions_defineProperty(this, "zoomMax", 8000);

  timelineOptions_defineProperty(this, "controlKeyIsMetaKey", false);

  timelineOptions_defineProperty(this, "scrollContainerClass", 'scroll-container');

  timelineOptions_defineProperty(this, "stripesDraggable", true);

  timelineOptions_defineProperty(this, "keyframesDraggable", true);
};
// CONCATENATED MODULE: ./src/settings/timelineConsts.ts
function timelineConsts_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function timelineConsts_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TimelineConsts = function TimelineConsts() {
  timelineConsts_classCallCheck(this, TimelineConsts);

  timelineConsts_defineProperty(this, "autoPanSpeed", 50);

  timelineConsts_defineProperty(this, "scrollByDragSpeed", 0.12);

  timelineConsts_defineProperty(this, "clickDetectionMs", 120);

  timelineConsts_defineProperty(this, "doubleClickTimeoutMs", 400);

  timelineConsts_defineProperty(this, "scrollFinishedTimeoutMs", 500);

  timelineConsts_defineProperty(this, "autoPanByScrollPadding", 10);
};
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
// CONCATENATED MODULE: ./src/settings/timelineStyleUtils.ts
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
     */
    value: function getKeyframeStyle(keyframe, row, rowsStyle, propertyName, defaultValue) {
      if (keyframe && keyframe) {
        var style = keyframe;

        if (style[propertyName] !== undefined) {
          return style[propertyName];
        }
      }

      if (row && row.keyframesStyle) {
        var _style = row.keyframesStyle;

        if (_style[propertyName] !== undefined) {
          return _style[propertyName];
        }
      }

      if (rowsStyle && rowsStyle.keyframesStyle) {
        var _style2 = rowsStyle.keyframesStyle;

        if (_style2[propertyName] !== undefined) {
          return _style2[propertyName];
        }
      }

      return defaultValue;
    }
    /**
     * Get row style from default settings or overrides by a row settings.
     * @param row
     * @param property
     */

  }, {
    key: "getRowStyle",
    value: function getRowStyle(rowStyle, globalRowStyle, propertyName, defaultValue) {
      if (rowStyle) {
        var style = rowStyle;

        if (style[propertyName] !== undefined) {
          return style[propertyName];
        }
      }

      if (globalRowStyle) {
        var _style3 = globalRowStyle;

        if (_style3[propertyName] !== undefined) {
          return _style3[propertyName];
        }
      }

      return defaultValue;
    }
    /**
     * Get current row height from styling
     * @param row
     * @param includeMargin include margin to the bounds
     */

  }, {
    key: "getRowHeight",
    value: function getRowHeight(rowStyle, globalRowStyle) {
      return TimelineStyleUtils.getRowStyle(rowStyle, globalRowStyle, 'height', 24);
    }
  }, {
    key: "rowStripeHeight",
    value: function rowStripeHeight(rowStyle, globalRowStyle) {
      return TimelineStyleUtils.getRowStyle(rowStyle, globalRowStyle, 'stripeHeight', 'auto');
    }
  }, {
    key: "stripeFillColor",
    value: function stripeFillColor(rowStyle, globalRowStyle) {
      return TimelineStyleUtils.getRowStyle(rowStyle, globalRowStyle, 'stripeFillColor');
    }
  }, {
    key: "getRowMarginBottom",
    value: function getRowMarginBottom(rowStyle, globalRowStyle) {
      return TimelineStyleUtils.getRowStyle(rowStyle, globalRowStyle, 'marginBottom', 0);
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
// CONCATENATED MODULE: ./src/enums/timelineInteractionMode.ts
var TimelineInteractionMode;

(function (TimelineInteractionMode) {
  TimelineInteractionMode["Selection"] = "selection";
  TimelineInteractionMode["Pan"] = "pan";
})(TimelineInteractionMode || (TimelineInteractionMode = {}));
// CONCATENATED MODULE: ./src/utils/events/timelineClickEvent.ts
function timelineClickEvent_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function timelineClickEvent_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function timelineClickEvent_createClass(Constructor, protoProps, staticProps) { if (protoProps) timelineClickEvent_defineProperties(Constructor.prototype, protoProps); if (staticProps) timelineClickEvent_defineProperties(Constructor, staticProps); return Constructor; }

function timelineClickEvent_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TimelineClickEvent = /*#__PURE__*/function () {
  function TimelineClickEvent() {
    timelineClickEvent_classCallCheck(this, TimelineClickEvent);

    timelineClickEvent_defineProperty(this, "args", void 0);

    timelineClickEvent_defineProperty(this, "pos", new DOMPoint());

    timelineClickEvent_defineProperty(this, "val", void 0);

    timelineClickEvent_defineProperty(this, "elements", void 0);

    timelineClickEvent_defineProperty(this, "target", void 0);

    timelineClickEvent_defineProperty(this, "_prevented", false);
  }

  timelineClickEvent_createClass(TimelineClickEvent, [{
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

  return TimelineClickEvent;
}();
// CONCATENATED MODULE: ./src/utils/events/timelineDragEvent.ts
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function timelineDragEvent_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


var TimelineDragEvent = /*#__PURE__*/function (_TimelineClickEvent) {
  _inherits(TimelineDragEvent, _TimelineClickEvent);

  var _super = _createSuper(TimelineDragEvent);

  function TimelineDragEvent() {
    timelineDragEvent_classCallCheck(this, TimelineDragEvent);

    return _super.apply(this, arguments);
  }

  return TimelineDragEvent;
}(TimelineClickEvent);
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
   *
   * @param options
   * @param model
   */
  function Timeline(options, model) {
    var _thisSuper, _thisSuper2, _thisSuper3, _this;

    timeline_classCallCheck(this, Timeline);

    _this = _super.call(this);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "container", null);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "canvas", null);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "scrollContainer", null);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "scrollContent", null);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "ctx", null);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "options", null);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "startPos", null);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "scrollStartPos", {
      x: 0,
      y: 0
    });

    timeline_defineProperty(timeline_assertThisInitialized(_this), "currentPos", null);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "selectionRect", null);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "selectionRectEnabled", false);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "drag", null);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "startedDragWithCtrl", false);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "startedDragWithShiftKey", false);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "clickTimeout", 0);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "lastClickTime", 0);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "consts", new TimelineConsts());

    timeline_defineProperty(timeline_assertThisInitialized(_this), "scrollFinishedTimerRef", null);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "selectedKeyframes", []);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "val", 0);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "pixelRatio", 1);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "currentZoom", 0);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "intervalRef", null);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "autoPanLastActionDate", 0);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "isPanStarted", false);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "interactionMode", TimelineInteractionMode.Selection);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "lastUsedArgs", null);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "model", void 0);

    timeline_defineProperty(timeline_assertThisInitialized(_this), "handleBlurEvent", function () {
      _this.cleanUpSelection();
    });

    timeline_defineProperty(timeline_assertThisInitialized(_this), "handleWindowResizeEvent", function () {
      // Rescale and redraw
      _this.rescale();

      _this.redraw();
    });

    timeline_defineProperty(timeline_assertThisInitialized(_this), "handleDocumentKeydownEvent", function (args) {
      // ctrl + a. Select all keyframes
      if (args.which === 65 && _this.controlKeyPressed(args)) {
        _this.performSelection(true);

        args.preventDefault();
        return false;
      }
    });

    timeline_defineProperty(timeline_assertThisInitialized(_this), "handleScrollEvent", function (args) {
      _this.clearScrollFinishedTimer(); // Set a timeout to run event 'scrolling end'.


      _this.scrollFinishedTimerRef = setTimeout(function () {
        if (!_this.isPanStarted) {
          if (_this.scrollFinishedTimerRef) {
            clearTimeout(_this.scrollFinishedTimerRef);
            _this.scrollFinishedTimerRef = null;
          }

          _this.rescale();

          _this.redraw();
        }
      }, _this.consts.scrollFinishedTimeoutMs);

      _this.redraw();

      var scrollData = args || {};
      scrollData.scrollLeft = _this.scrollContainer.scrollLeft;
      scrollData.scrollTop = _this.scrollContainer.scrollTop;
      scrollData.scrollHeight = _this.scrollContainer.scrollHeight;
      scrollData.scrollWidth = _this.scrollContainer.scrollWidth;

      _get((_thisSuper = timeline_assertThisInitialized(_this), timeline_getPrototypeOf(Timeline.prototype)), "emit", _thisSuper).call(_thisSuper, TimelineEvents.Scroll, scrollData);
    });

    timeline_defineProperty(timeline_assertThisInitialized(_this), "handleWheelEvent", function (event) {
      if (_this.controlKeyPressed(event)) {
        event.preventDefault();

        if (_this.options.zoomSpeed > 0 && _this.options.zoomSpeed <= 1) {
          var mousePos = _this.getMousePos(_this.canvas, event);

          var x = mousePos.x;
          if (x <= 0) x = 0;

          var val = _this.pxToVal(_this.scrollContainer.scrollLeft + x, false);

          var diff = _this.canvas.clientWidth / x;

          var zoom = TimelineUtils.sign(event.deltaY) * _this.options.zoom * _this.options.zoomSpeed;

          _this.currentZoom += zoom;

          if (_this.currentZoom > _this.options.zoomMax) {
            _this.currentZoom = _this.options.zoomMax;
          }

          if (_this.currentZoom < _this.options.zoomMin) {
            _this.currentZoom = _this.options.zoomMin;
          }

          var zoomCenter = _this.valToPx(val, true);

          var newScrollLeft = Math.round(zoomCenter - _this.canvas.clientWidth / diff);

          if (newScrollLeft <= 0) {
            newScrollLeft = 0;
          }

          _this.rescale(newScrollLeft + _this.canvas.clientWidth, null, 'zoom');

          if (_this.scrollContainer.scrollLeft != newScrollLeft) {
            _this.scrollContainer.scrollLeft = newScrollLeft; // Scroll event will redraw the screen.
          }

          _this.redraw();
        }
      } else {
        _this.scrollContainer.scrollTop += event.deltaY;
        event.preventDefault();
      }
    });

    timeline_defineProperty(timeline_assertThisInitialized(_this), "handleMouseDownEvent", function (args) {
      var isDoubleClick = Date.now() - _this.lastClickTime < _this.consts.doubleClickTimeoutMs; // Prevent drag of the canvas if canvas is selected as text:


      TimelineUtils.clearBrowserSelection();
      _this.startPos = _this.trackMousePos(_this.canvas, args);

      if (!_this.startPos) {
        return;
      }

      _this.scrollStartPos = {
        x: _this.scrollContainer.scrollLeft,
        y: _this.scrollContainer.scrollTop
      };

      var elements = _this.elementFromPoint(_this.startPos, Math.max(2, _this.startPos.radius));

      var target = _this.findDraggable(elements, _this.startPos.val);

      var event = new TimelineClickEvent();
      event.pos = _this.startPos;
      event.val = _this.startPos.val;
      event.args = args; // all elements under the click:

      event.elements = elements; // target element.

      event.target = target;

      if (isDoubleClick) {
        _get((_thisSuper2 = timeline_assertThisInitialized(_this), timeline_getPrototypeOf(Timeline.prototype)), "emit", _thisSuper2).call(_thisSuper2, TimelineEvents.DoubleClick, event);

        return;
      }

      _get((_thisSuper3 = timeline_assertThisInitialized(_this), timeline_getPrototypeOf(Timeline.prototype)), "emit", _thisSuper3).call(_thisSuper3, TimelineEvents.MouseDown, event);

      _this.clickTimeout = Date.now();
      _this.lastClickTime = Date.now();

      if (event.isPrevented()) {
        _this.cleanUpSelection();

        return;
      }

      _this.currentPos = _this.startPos; // Select keyframes on mouse down

      if (target) {
        _this.drag = {
          changed: false,
          target: target,
          val: target.val,
          type: target.type,
          elements: []
        };

        if (target.type === TimelineElementType.Keyframe) {
          _this.startedDragWithCtrl = _this.controlKeyPressed(args);
          _this.startedDragWithShiftKey = args.shiftKey; // get all related selected keyframes if we are selecting one.

          if (!target.keyframe.selected && !_this.controlKeyPressed(args) && !args.shiftKey) {
            _this.performSelection(true, target.keyframe);
          } // Allow to drag all selected keyframes on a screen


          _this.drag.elements = _this.getSelectedElements();
        } else if (target.type === TimelineElementType.Stripe) {
          var keyframes = _this.drag.target.row.keyframes;
          _this.drag.elements = keyframes && Array.isArray(keyframes) ? keyframes.map(function (keyframe) {
            return _this.convertToElement(_this.drag.target.row, keyframe);
          }) : [];
        } else {
          _this.drag.elements = [_this.drag.target];
        }
      }

      _this.redraw();
    });

    timeline_defineProperty(timeline_assertThisInitialized(_this), "handleMouseMoveEvent", function (args) {
      if (!args) {
        args = _this.lastUsedArgs;
      } else {
        _this.lastUsedArgs = args;
      }

      if (!args) {
        return;
      }

      var isTouch = args instanceof TouchEvent && args.changedTouches && args.changedTouches.length > 0;
      _this.currentPos = _this.trackMousePos(_this.canvas, args);

      if (!_this.isPanStarted && _this.selectionRect && _this.clickTimeoutIsOver()) {
        _this.selectionRectEnabled = true;
      }

      args = args;

      if (_this.startPos) {
        if (args.buttons == 1 || isTouch) {
          var isChanged = false;

          if (_this.drag && !_this.startedDragWithCtrl) {
            var convertedVal = _this.mousePosToVal(_this.currentPos.x, true); //redraw();


            if (_this.drag.type === TimelineElementType.Timeline) {
              isChanged = _this.setTimeInternal(convertedVal, 'user') || isChanged;
            } else if ((_this.drag.type == TimelineElementType.Keyframe || _this.drag.type == TimelineElementType.Stripe) && _this.drag.elements) {
              var offset = Math.floor(convertedVal - _this.drag.val);

              if (Math.abs(offset) > 0) {
                // don't allow to move less than zero.
                _this.drag.elements.forEach(function (p) {
                  if (_this.options.snapAllKeyframesOnMove) {
                    var toSet = _this.snapVal(p.keyframe.val);

                    isChanged = _this.setKeyframePos(p.keyframe, toSet) || isChanged;
                  }

                  var newPosition = p.val + offset;

                  if (newPosition < 0) {
                    offset = -p.val;
                  }
                });

                if (Math.abs(offset) > 0) {
                  // don't allow to move less than zero.
                  _this.drag.elements.forEach(function (element) {
                    var toSet = element.keyframe.val + offset;
                    isChanged = _this.setKeyframePos(element.keyframe, toSet) || isChanged;

                    if (isChanged) {
                      element.val = element.keyframe.val;
                    }
                  });
                }

                if (isChanged) {
                  if (!_this.drag.changed) {
                    _this.emitDragStartedEvent();
                  }

                  _this.drag.changed = true;
                  _this.drag.val += offset;

                  _this.emitDragEvent();
                }
              }
            }
          }

          if (_this.interactionMode === TimelineInteractionMode.Pan && !_this.drag) {
            _this.isPanStarted = true; // Track scroll by drag.

            _this.scrollByPan(_this.startPos, _this.currentPos, _this.scrollStartPos);
          } else {
            // Track scroll by mouse or touch out of the area.
            _this.scrollBySelectionOutOfBounds(_this.currentPos);
          }

          _this.redraw();
        } else {
          // Fallback. Cancel mouse move when focus was lost and mouse down is still counted.
          _this.cleanUpSelection();

          _this.redraw();
        }
      } else if (!isTouch) {
        // TODO: mouse over event
        var elements = _this.elementFromPoint(_this.currentPos, Math.max(2, _this.currentPos.radius));

        var target = _this.findDraggable(elements, _this.currentPos.val);

        _this.setCursor('default');

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
            _this.setCursor(cursor);
          }
        }
      }

      if (isTouch) {
        args.preventDefault();
      }
    });

    timeline_defineProperty(timeline_assertThisInitialized(_this), "handleMouseUpEvent", function (args) {
      if (_this.startPos) {
        //window.releaseCapture();
        var pos = _this.trackMousePos(_this.canvas, args); // Click detection.


        if (_this.selectionRect && _this.selectionRect.height <= 2 && _this.selectionRect.width <= 2 || !_this.clickTimeoutIsOver() || _this.drag && _this.startedDragWithCtrl || _this.drag && _this.startedDragWithShiftKey) {
          _this.performClick(pos, args, _this.drag);
        } else if (!_this.drag && _this.selectionRect && _this.selectionRectEnabled) {
          _this.performSelection(true, _this.selectionRect, args.shiftKey);
        }

        _this.cleanUpSelection();

        _this.redraw();
      }
    });

    timeline_defineProperty(timeline_assertThisInitialized(_this), "redrawInternal", function () {
      // Rescale when animation is played out of the bounds.
      if (_this.valToPx(_this.val, true) > _this.scrollContainer.scrollWidth) {
        _this.rescale();

        if (!_this.isPanStarted && _this.drag && _this.drag.type !== TimelineElementType.Timeline) {
          _this.scrollLeft();
        }
      }

      _this.renderBackground();

      _this.renderRows(); // Render after rows


      _this.renderHeaderBackground();

      _this.renderTicks();

      _this.renderKeyframes();

      _this.renderSelectionRect();

      _this.renderTimeline();
    });

    var id = options.id;
    _this.model = model;

    if (!id) {
      throw new Error("Element cannot be empty. Should be string or DOM element.");
    }

    _this.options = _this.mergeOptions(options);
    _this.currentZoom = _this.options.zoom;

    if (id instanceof HTMLElement) {
      _this.container = id;
    } else {
      _this.container = document.getElementById(id);
    }

    if (!_this.container) {
      throw new Error("Element cannot be empty. Should be string or DOM element.");
    }

    _this.scrollContainer = document.createElement('div');
    _this.scrollContent = document.createElement('div');
    _this.canvas = document.createElement('canvas');

    if (!_this.canvas || !_this.canvas.getContext) {
      console.log('Cannot initialize canvas context.');
      return timeline_possibleConstructorReturn(_this, null);
    }

    _this.container.style.position = 'relative'; // Generate size container:

    _this.canvas.style.cssText = 'image-rendering: -moz-crisp-edges;' + 'image-rendering: -webkit-crisp-edges;' + 'image-rendering: pixelated;' + 'image-rendering: crisp-edges;' + 'user-select: none;' + '-webkit-user-select: none;' + '-khtml-user-select: none;' + '-moz-user-select: none;' + '-o-user-select: none;' + 'user-select: none;' + 'touch-action: none;' + 'position: relative;' + '-webkit-user-drag: none;' + '-khtml-user-drag: none;' + '-moz-user-drag: none;' + '-o-user-drag: none;' + 'user-drag: none;' + 'padding: inherit';

    _this.scrollContainer.classList.add(_this.options.scrollContainerClass);

    _this.scrollContainer.style.cssText = 'overflow: scroll;' + 'position: absolute;' + 'width:  100%;' + 'height:  100%;';
    _this.scrollContent.style.width = _this.scrollContent.style.height = '100%'; // add the text node to the created div

    _this.scrollContainer.appendChild(_this.scrollContent);

    _this.container.appendChild(_this.scrollContainer);

    var scrollBarWidth = _this.scrollContainer.offsetWidth - _this.scrollContent.clientWidth; // Calculate current browser scroll bar size and add offset for the canvas

    _this.canvas.style.width = _this.canvas.style.height = 'calc(100% -' + (scrollBarWidth || 17) + 'px)';

    _this.container.appendChild(_this.canvas);

    if (_this.options.fillColor) {
      _this.scrollContainer.style.background = _this.options.fillColor;
    } // Normalize and validate span per seconds


    _this.options.snapsPerSeconds = Math.max(0, Math.min(60, _this.options.snapsPerSeconds || 0));
    _this.ctx = _this.canvas.getContext('2d');

    _this.subscribeOnEvents();

    _this.rescale();

    _this.redraw();

    return _this;
  }
  /**
   * Subscribe current component on the related events.
   */


  timeline_createClass(Timeline, [{
    key: "subscribeOnEvents",
    value: function subscribeOnEvents() {
      this.container.addEventListener('wheel', this.handleWheelEvent);

      if (this.scrollContainer) {
        this.scrollContainer.addEventListener('scroll', this.handleScrollEvent);
      }

      window.addEventListener('blur', this.handleBlurEvent, false);
      window.addEventListener('resize', this.handleWindowResizeEvent, false);
      document.addEventListener('keydown', this.handleDocumentKeydownEvent, false);
      this.canvas.addEventListener('touchstart', this.handleMouseDownEvent, false);
      this.canvas.addEventListener('mousedown', this.handleMouseDownEvent, false);
      window.addEventListener('mousemove', this.handleMouseMoveEvent, false);
      window.addEventListener('touchmove', this.handleMouseMoveEvent, false);
      window.addEventListener('mouseup', this.handleMouseUpEvent, false);
      window.addEventListener('touchend', this.handleMouseUpEvent, false);
    }
  }, {
    key: "dispose",
    value: function dispose() {
      // Unsubscribe all events
      this.offAll();
      this.container = null;
      this.canvas = null;
      this.scrollContainer = null;
      this.scrollContent = null;
      this.ctx = null;
      this.cleanUpSelection();
      this.container.removeEventListener('wheel', this.handleWheelEvent);

      if (this.scrollContainer) {
        this.scrollContainer.removeEventListener('scroll', this.handleScrollEvent);
      }

      window.removeEventListener('blur', this.handleBlurEvent);
      window.removeEventListener('resize', this.handleWindowResizeEvent);
      document.removeEventListener('keydown', this.handleDocumentKeydownEvent);
      this.canvas.removeEventListener('touchstart', this.handleMouseDownEvent);
      this.canvas.removeEventListener('mousedown', this.handleMouseDownEvent);
      window.removeEventListener('mousemove', this.handleMouseMoveEvent);
      window.removeEventListener('touchmove', this.handleMouseMoveEvent);
      window.removeEventListener('mouseup', this.handleMouseUpEvent);
      window.removeEventListener('touchend', this.handleMouseUpEvent); // Stop times

      this.stopAutoPan();
      this.clearScrollFinishedTimer();
    }
  }, {
    key: "clearScrollFinishedTimer",
    value: function clearScrollFinishedTimer() {
      if (this.scrollFinishedTimerRef) {
        clearTimeout(this.scrollFinishedTimerRef);
        this.scrollFinishedTimerRef = null;
      }
    }
  }, {
    key: "performClick",
    value: function performClick(pos, args, drag) {
      var isChanged = false;

      if (drag && drag.type === TimelineElementType.Keyframe) {
        var isSelected = true;

        if (this.startedDragWithCtrl && this.controlKeyPressed(args) || this.startedDragWithShiftKey && args.shiftKey) {
          if (this.controlKeyPressed(args)) {
            isSelected = !drag.target.keyframe.selected;
          }
        } // Reverse selected keyframe selection by a click:


        isChanged = this.performSelection(isSelected, this.drag.target.keyframe, this.controlKeyPressed(args) || args.shiftKey) || isChanged;

        if (args.shiftKey) {
          // change timeline pos:
          var convertedVal = this.mousePosToVal(pos.x, true); // Set current timeline position if it's not a drag or selection rect small or fast click.

          isChanged = this.setTimeInternal(convertedVal, 'user') || isChanged;
        }
      } else {
        // deselect keyframes if any:
        isChanged = this.performSelection(false) || isChanged; // change timeline pos:
        // Set current timeline position if it's not a drag or selection rect small or fast click.

        isChanged = this.setTimeInternal(this.mousePosToVal(pos.x, true), 'user') || isChanged;
      }

      return isChanged;
    }
    /**
     * Set keyframe value.
     * @param keyframe
     * @param value
     */

  }, {
    key: "setKeyframePos",
    value: function setKeyframePos(keyframe, value) {
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
    key: "setCursor",
    value: function setCursor(cursor) {
      if (this.canvas.style.cursor != cursor) {
        this.canvas.style.cursor = cursor;
      }
    }
    /**
     * Set pan mode
     * @param isPan
     */

  }, {
    key: "setInteractionMode",
    value: function setInteractionMode(mode) {
      if (this.interactionMode != mode) {
        this.interactionMode = mode; // Avoid any conflicts with other modes:

        this.cleanUpSelection();
      }
    }
  }, {
    key: "convertToElement",
    value: function convertToElement(row, keyframe) {
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
      this.forEachKeyframe(function (keyframe, index, rowModel) {
        if (keyframe && keyframe.selected) {
          selected.push(_this2.convertToElement(rowModel.row, keyframe));
        }

        return false;
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
    key: "performSelection",
    value: function performSelection() {
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

      this.selectedKeyframes.length = 0;
      var isChanged = true;
      this.forEachKeyframe(function (keyframe, keyframeIndex, rowSize) {
        var keyframePos = _this3.getKeyframePosition(keyframe, rowSize);

        if (keyframePos) {
          if (selector && selector === keyframe || TimelineUtils.isOverlap(keyframePos.x, keyframePos.y, selector)) {
            if (keyframe.selected != isSelected) {
              keyframe.selected = isSelected;
              isChanged = true;
            }

            if (keyframe.selected) {
              _this3.selectedKeyframes.push(keyframe);
            }
          } else {
            // Deselect all other keyframes.
            if (!ignoreOthers && keyframe.selected != deselectionMode) {
              keyframe.selected = deselectionMode;
              isChanged = deselectionMode;
            }
          }
        }

        return false;
      });

      if (isChanged) {
        this.emitKeyframesSelected(this.selectedKeyframes);
      }

      return isChanged;
    }
    /**
     * foreach visible keyframe.
     */

  }, {
    key: "forEachKeyframe",
    value: function forEachKeyframe(callback) {
      var calculateStripesBounds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (!this.model) {
        return;
      }

      var model = this.calculateRowsBounds(calculateStripesBounds);

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
        }).find(function (keyframe, keyframeIndex) {
          if (callback && keyframe) {
            var isBreak = callback(keyframe, keyframeIndex, rowSize, index, nextRow);

            if (isBreak) {
              return true;
            }
          }

          nextRow = false;
        });
      });
    }
  }, {
    key: "trackMousePos",
    value: function trackMousePos(canvas, mouseArgs) {
      var pos = this.getMousePos(canvas, mouseArgs);
      pos.val = this.pxToVal(pos.x + this.scrollContainer.scrollLeft);
      pos.snapVal = this.snapVal(pos.val);

      if (this.startPos) {
        if (!this.selectionRect) {
          this.selectionRect = {};
        } // get the pos with the virtualization:


        var x = Math.floor(this.startPos.x + (this.scrollStartPos.x - this.scrollContainer.scrollLeft));
        var y = Math.floor(this.startPos.y + (this.scrollStartPos.y - this.scrollContainer.scrollTop));
        this.selectionRect.x = Math.min(x, pos.x);
        this.selectionRect.y = Math.min(y, pos.y);
        this.selectionRect.width = Math.max(x, pos.x) - this.selectionRect.x;
        this.selectionRect.height = Math.max(y, pos.y) - this.selectionRect.y;
      }

      return pos;
    }
  }, {
    key: "cleanUpSelection",
    value: function cleanUpSelection() {
      this.emitDragFinishedEvent();
      this.startPos = null;
      this.drag = null;
      this.startedDragWithCtrl = false;
      this.startedDragWithShiftKey = false;
      this.selectionRect = null;
      this.clickTimeout = null;
      this.scrollStartPos = null;
      this.isPanStarted = false;
      this.stopAutoPan();
    }
    /**
     * Check whether click timeout is over.
     */

  }, {
    key: "clickTimeoutIsOver",
    value: function clickTimeoutIsOver() {
      // Duration before the selection can be tracked.
      if (this.clickTimeout && Date.now() - this.clickTimeout > this.consts.clickDetectionMs) {
        return true;
      }

      return false;
    }
    /**
     * Automatically pan. Scroll canvas when selection is made and mouse outside of the bounds.
     */

  }, {
    key: "startAutoPan",
    value: function startAutoPan() {
      var _this4 = this;

      if (this.consts.autoPanSpeed) {
        if (!this.intervalRef) {
          // Repeat move calls to
          this.intervalRef = setInterval(function () {
            _this4.handleMouseMoveEvent(null);
          }, this.consts.autoPanSpeed);
        }
      }
    }
    /**
     * Stop current running auto pan
     */

  }, {
    key: "stopAutoPan",
    value: function stopAutoPan() {
      if (this.intervalRef) {
        clearInterval(this.intervalRef);
        this.intervalRef = null;
      }

      this.autoPanLastActionDate = null;
    }
    /**
     * Check whether auto pan should be slowed down a bit.
     */

  }, {
    key: "checkUpdateSpeedTooFast",
    value: function checkUpdateSpeedTooFast() {
      // Slow down updated a bit.
      if (this.autoPanLastActionDate && Date.now() - this.autoPanLastActionDate <= 10) {
        return true;
      }

      this.autoPanLastActionDate = Date.now();
      return false;
    }
  }, {
    key: "scrollByPan",
    value: function scrollByPan(start, pos, scrollStartPos) {
      if (!start || !pos) {
        return;
      }

      var offsetX = Math.round(start.x - pos.x);
      var newLeft = scrollStartPos.x + offsetX;

      if (offsetX > 0) {
        this.rescale(newLeft + this.canvas.clientWidth);
      }

      if (offsetX > 0 && newLeft + this.canvas.clientWidth >= this.scrollContainer.scrollWidth - 5) {
        this.scrollContainer.scrollLeft = this.scrollContainer.scrollWidth;
      } else {
        this.scrollContainer.scrollLeft = newLeft;
      }

      this.scrollContainer.scrollTop = Math.round(start.y - pos.y);
    }
  }, {
    key: "scrollBySelectionOutOfBounds",
    value: function scrollBySelectionOutOfBounds(pos) {
      var x = pos.x;
      var y = pos.y;
      var isChanged = false;
      var speedX = 0;
      var speedY = 0; // Small offset to start auto pan earlier.

      var bounds = this.consts.autoPanByScrollPadding;
      var isLeft = x <= bounds;
      var isRight = x >= this.canvas.clientWidth - bounds;
      var isTop = y <= bounds;
      var isBottom = y >= this.canvas.clientHeight - bounds;
      var newWidth = null;
      var newHeight = null;

      if (isLeft || isRight || isTop || isBottom) {
        // Auto move init
        this.startAutoPan();

        if (this.checkUpdateSpeedTooFast()) {
          return false;
        }

        var scrollSpeedMultiplier = isNaN(this.consts.scrollByDragSpeed) ? 1 : this.consts.scrollByDragSpeed;

        if (isLeft) {
          // Get normalized speed.
          speedX = -TimelineUtils.getDistance(x, bounds) * scrollSpeedMultiplier;
        } else if (isRight) {
          // Get normalized speed:
          speedX = TimelineUtils.getDistance(x, this.canvas.clientWidth - bounds) * scrollSpeedMultiplier;
          newWidth = this.scrollContainer.scrollLeft + this.canvas.clientWidth + speedX;
        }

        if (isTop) {
          // Get normalized speed.
          speedY = -TimelineUtils.getDistance(x, bounds) * scrollSpeedMultiplier / 4;
        } else if (isBottom) {
          // Get normalized speed:
          speedY = TimelineUtils.getDistance(x, this.canvas.clientHeight - bounds) * scrollSpeedMultiplier / 4;
          newHeight = this.scrollContainer.scrollTop + this.canvas.clientHeight;
        }
      } else {
        this.stopAutoPan();
      }

      if (newWidth || newHeight) {
        this.rescale(newWidth, newHeight, 'scrollBySelection');
      }

      if (Math.abs(speedX) > 0) {
        this.scrollContainer.scrollLeft += speedX;
        isChanged = true;
      }

      if (Math.abs(speedY) > 0) {
        this.scrollContainer.scrollTop += speedY;
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
        coords -= this.options.leftMarginPx;
      }

      var ms = coords / this.options.stepPx * this.options.zoom;
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
        var x = this.scrollContainer.scrollLeft;
        ms -= this.pxToVal(x);
      }

      return ms * this.options.stepPx / this.options.zoom;
    }
    /**
     * Snap a value to a nearest beautiful point.
     */

  }, {
    key: "snapVal",
    value: function snapVal(ms) {
      // Apply snap to steps if enabled.
      if (this.options.snapsPerSeconds && this.options.snapEnabled) {
        var stopsPerPixel = 1000 / this.options.snapsPerSeconds;
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
    key: "mousePosToVal",
    value: function mousePosToVal(x) {
      var snapEnabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var convertedVal = this.pxToVal(this.scrollContainer.scrollLeft + Math.min(x, this.canvas.clientWidth));
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
    key: "formatLineGaugeText",
    value: function formatLineGaugeText(ms) {
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
    key: "renderTicks",
    value: function renderTicks() {
      this.ctx.save();
      var areaWidth = this.scrollContainer.scrollWidth - this.options.leftMarginPx;
      var from = this.pxToVal(0);
      var to = this.pxToVal(areaWidth);
      var dist = TimelineUtils.getDistance(from, to);

      if (dist === 0) {
        return;
      } // normalize step.


      var stepsCanFit = areaWidth / this.options.stepPx;
      var realStep = dist / stepsCanFit; // Find the nearest 'beautiful' step for a line gauge. This step should be divided by 1/2/5!
      //let step = realStep;

      var step = TimelineUtils.findGoodStep(realStep);

      if (step == 0 || isNaN(step) || !isFinite(step)) {
        return;
      }

      var goodStepDistancePx = areaWidth / (dist / step);
      var smallStepsCanFit = goodStepDistancePx / this.options.stepSmallPx;
      var realSmallStep = step / smallStepsCanFit;
      var smallStep = TimelineUtils.findGoodStep(realSmallStep, step);

      if (step % smallStep != 0) {
        smallStep = realSmallStep;
      } // filter to draw only visible


      var visibleFrom = this.pxToVal(this.scrollContainer.scrollLeft + this.options.leftMarginPx);
      var visibleTo = this.pxToVal(this.scrollContainer.scrollLeft + this.scrollContainer.clientWidth); // Find beautiful start point:

      from = Math.floor(visibleFrom / step) * step; // Find a beautiful end point:

      to = Math.ceil(visibleTo / step) * step + step;
      var lastTextX = null;

      for (var i = from; i <= to; i += step) {
        var pos = this.valToPx(i);
        var sharpPos = this.getSharp(Math.round(pos));
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.setLineDash([4]);
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = this.options.tickColor;
        TimelineUtils.drawLine(this.ctx, sharpPos, (this.options.headerHeight || 0) / 2, sharpPos, this.canvas.clientHeight);
        this.ctx.stroke();
        this.ctx.fillStyle = this.options.labelsColor;

        if (this.options.ticksFont) {
          this.ctx.font = this.options.ticksFont;
        }

        var text = this.formatLineGaugeText(i);
        var textSize = this.ctx.measureText(text);
        var textX = sharpPos - textSize.width / 2; // skip text render if there is no space for it.

        if (isNaN(lastTextX) || lastTextX <= textX) {
          lastTextX = textX + textSize.width;
          this.ctx.fillText(text, textX, 10);
        }

        this.ctx.restore(); // Draw small steps

        for (var x = i + smallStep; x < i + step; x += smallStep) {
          var nextPos = this.valToPx(x);
          var nextSharpPos = this.getSharp(Math.floor(nextPos));
          this.ctx.beginPath();
          this.ctx.lineWidth = this.pixelRatio;
          this.ctx.strokeStyle = this.options.tickColor;
          TimelineUtils.drawLine(this.ctx, nextSharpPos, (this.options.headerHeight || 0) / 1.3, nextSharpPos, this.options.headerHeight);
          this.ctx.stroke();
        }
      }

      this.ctx.restore();
    }
    /**
     * calculate screen positions of the model elements.
     */

  }, {
    key: "calculateRowsBounds",
    value: function calculateRowsBounds() {
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

      if (!this.model) {
        return toReturn;
      }

      var rows = this.model.rows;

      if (!rows || !Array.isArray(rows) || rows.length <= 0) {
        return toReturn;
      }

      var rowAbsoluteHeight = this.options.headerHeight;
      rows.filter(function (p) {
        return p && !p.hidden;
      }).forEach(function (row, index) {
        if (!row) {
          return;
        } // draw with scroll virtualization:


        var rowHeight = TimelineStyleUtils.getRowHeight(row, _this5.options.rowsStyle);
        var marginBottom = TimelineStyleUtils.getRowMarginBottom(row, _this5.options.rowsStyle);
        rowAbsoluteHeight += rowHeight + marginBottom;
        var currentRowY = rowAbsoluteHeight - _this5.scrollContainer.scrollTop;

        if (index == 0) {
          toReturn.area.y = currentRowY;
        }

        toReturn.area.height = Math.max(rowAbsoluteHeight + rowHeight, toReturn.area.height);
        var rowData = {
          x: 0,
          y: currentRowY,
          width: _this5.canvas.clientWidth,
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
          var stripeRect = _this5.getKeyframesStripeSize(row, rowData.y, rowData.minValue, rowData.maxValue);

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
    key: "renderRows",
    value: function renderRows() {
      var _this6 = this;

      var data = this.calculateRowsBounds();

      if (data && data.rows) {
        this.ctx.save();
        data.rows.forEach(function (rowData) {
          if (!rowData) {
            return;
          }

          _this6.ctx.fillStyle = TimelineStyleUtils.getRowStyle(rowData.row, _this6.options.rowsStyle, 'fillColor', '#252526'); //this.ctx.fillRect(data.areaRect.x, data.areaRect.y, data.areaRect.w, data.areaRect.h);
          // Note: bounds used instead of the clip while clip is slow!

          var bounds = _this6.cutBounds(rowData);

          if (bounds) {
            _this6.ctx.fillRect(bounds.x, bounds.y, bounds.width, bounds.height);
          }

          var keyframeLaneColor = TimelineStyleUtils.stripeFillColor(rowData.row, _this6.options.rowsStyle);

          if (rowData.row.keyframes && rowData.row.keyframes.length <= 1 || !keyframeLaneColor) {
            return;
          } // get the bounds on a canvas


          var rectBounds = _this6.cutBounds(rowData.stripeRect);

          if (rectBounds) {
            _this6.ctx.fillStyle = keyframeLaneColor;

            _this6.ctx.fillRect(rectBounds.x, rectBounds.y, rectBounds.width, rectBounds.height);
          }
        });
        this.ctx.restore();
      }
    }
    /**
     * Method is used for the optimization.
     * Only visible part should be rendered.
     */

  }, {
    key: "cutBounds",
    value: function cutBounds(rect) {
      if (!rect) {
        return null;
      } // default bounds: minX, maxX, minY, maxY


      var minX = 0,
          maxX = this.canvas.clientWidth,
          minY = this.options.headerHeight || 0,
          maxY = this.canvas.clientWidth;

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
    key: "getKeyframesStripeSize",
    value: function getKeyframesStripeSize(row, rowY, minValue, maxValue) {
      var stripeHeight = TimelineStyleUtils.rowStripeHeight(row, this.options.rowsStyle);
      var height = TimelineStyleUtils.getRowHeight(row, this.options.rowsStyle);

      if (!stripeHeight && stripeHeight !== 0 || isNaN(stripeHeight) || stripeHeight == 'auto') {
        stripeHeight = Math.floor(height * 0.8);
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
    key: "getKeyframePosition",
    value: function getKeyframePosition(keyframe, rowSize) {
      if (!keyframe) {
        console.log('keyframe should be defined.');
        return null;
      }

      var val = keyframe.val;

      if (isNaN(val)) {
        return null;
      } // get center of the lane:


      var y = rowSize.y + rowSize.height / 2 - this.scrollContainer.scrollTop; // TODO: keyframe size:

      var size = 1; //this.options.keyframeSizePx || keyframe.size;
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
    key: "renderKeyframes",
    value: function renderKeyframes() {
      var _this7 = this;

      this.forEachKeyframe(function (keyframe, keyframeIndex, rowSize) {
        var row = rowSize.row;

        var pos = _this7.getKeyframePosition(keyframe, rowSize);

        if (pos) {
          var x = _this7.getSharp(pos.x);

          var y = pos.y;
          var size = pos.height;

          var bounds = _this7.cutBounds({
            x: x - size / 2,
            y: y - size / 2,
            width: size,
            height: size
          });

          if (!bounds) {
            return;
          }

          _this7.ctx.save(); // Performance FIX: use clip only  when we are in the collision! Clip is slow!
          // Other keyframes should be hidden by bounds check.


          if (bounds && bounds.overlapY) {
            _this7.ctx.beginPath();

            _this7.ctx.rect(0, _this7.options.headerHeight || 0, _this7.canvas.clientWidth, _this7.canvas.clientWidth);

            _this7.ctx.clip();
          }

          var shape = TimelineStyleUtils.getKeyframeStyle(keyframe, row, _this7.options.rowsStyle, 'shape', TimelineKeyframeShape.Rhomb);

          if (shape === TimelineKeyframeShape.None) {
            return;
          }

          var keyframeColor = TimelineStyleUtils.getKeyframeStyle(keyframe, row, _this7.options.rowsStyle, keyframe.selected ? 'fillColor' : 'selectedFillColor', keyframe.selected ? 'red' : 'DarkOrange');
          var border = TimelineStyleUtils.getKeyframeStyle(keyframe, row, _this7.options.rowsStyle, 'strokeThickness', 0.2);
          var strokeColor = border > 0 ? TimelineStyleUtils.getKeyframeStyle(keyframe, row, _this7.options.rowsStyle, 'strokeColor', 'Black') : '';

          if (shape == TimelineKeyframeShape.Rhomb) {
            _this7.ctx.beginPath();

            _this7.ctx.translate(x, y);

            _this7.ctx.rotate(45 * Math.PI / 180);

            if (border > 0 && strokeColor) {
              _this7.ctx.fillStyle = strokeColor;

              _this7.ctx.rect(-size / 2, -size / 2, size, size);

              _this7.ctx.fill();
            }

            _this7.ctx.fillStyle = keyframeColor; // draw main keyframe data with offset.

            _this7.ctx.translate(border, border);

            _this7.ctx.rect(-size / 2, -size / 2, size - border * 2, size - border * 2);

            _this7.ctx.fill();
          } else if (shape == TimelineKeyframeShape.Circle) {
            _this7.ctx.beginPath();

            if (border > 0 && strokeColor) {
              _this7.ctx.fillStyle = strokeColor;

              _this7.ctx.arc(x, y, size, 0, 2 * Math.PI);
            }

            _this7.ctx.fillStyle = keyframeColor;

            _this7.ctx.arc(x, y, size - border, 0, 2 * Math.PI);

            _this7.ctx.fill();
          } else if (shape == TimelineKeyframeShape.Rect) {
            _this7.ctx.beginPath();

            y = y - size / 2;
            x = x - size / 2;

            if (border > 0 && strokeColor) {
              _this7.ctx.fillStyle = strokeColor;

              _this7.ctx.rect(x, y, size, size);

              _this7.ctx.fill();
            }

            _this7.ctx.fillStyle = keyframeColor;

            _this7.ctx.rect(x + border, y + border, size - border, size - border);

            _this7.ctx.fill();
          }

          _this7.ctx.restore();
        }

        return false;
      });
    }
  }, {
    key: "renderSelectionRect",
    value: function renderSelectionRect() {
      if (this.drag) {
        return;
      }

      this.ctx.save();
      var thickness = 1;

      if (this.selectionRect && this.selectionRectEnabled) {
        this.ctx.setLineDash([4]);
        this.ctx.lineWidth = this.pixelRatio;
        this.ctx.strokeStyle = this.options.selectionColor;
        this.ctx.strokeRect(this.getSharp(this.selectionRect.x, thickness), this.getSharp(this.selectionRect.y, thickness), Math.floor(this.selectionRect.width), Math.floor(this.selectionRect.height));
      }

      this.ctx.restore();
    }
  }, {
    key: "renderBackground",
    value: function renderBackground() {
      if (this.options.fillColor) {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.rect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
        this.ctx.fillStyle = this.options.fillColor;
        this.ctx.fill();
        this.ctx.restore();
      } else {
        // Clear if bg not set.
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    }
  }, {
    key: "renderTimeline",
    value: function renderTimeline() {
      this.ctx.save();
      var thickness = this.options.timelineThicknessPx;
      this.ctx.lineWidth = thickness * this.pixelRatio;
      var timeLinePos = this.getSharp(Math.round(this.valToPx(this.val)), thickness);
      this.ctx.strokeStyle = this.options.timelineColor;
      this.ctx.fillStyle = this.ctx.strokeStyle;
      var y = this.options.timelineMarginTopPx;
      this.ctx.beginPath();
      TimelineUtils.drawLine(this.ctx, timeLinePos, y, timeLinePos, this.canvas.clientHeight);
      this.ctx.stroke();

      if (this.options.timelineCapWidthPx && this.options.timelineCapHeightPx) {
        var rectSize = this.options.timelineCapWidthPx;
        var capHeight = this.options.timelineCapHeightPx;

        if (this.options.timelineCap === TimelineCapShape.Triangle) {
          this.ctx.beginPath();
          this.ctx.moveTo(timeLinePos - rectSize / 2, y);
          this.ctx.lineTo(timeLinePos + rectSize / 2, y);
          this.ctx.lineTo(timeLinePos, capHeight);
          this.ctx.closePath();
          this.ctx.stroke();
        } else if (this.options.timelineCap === TimelineCapShape.Rect) {
          this.ctx.fillRect(timeLinePos - rectSize / 2, y, rectSize, capHeight);
          this.ctx.fill();
        }
      }

      this.ctx.restore();
    }
  }, {
    key: "renderHeaderBackground",
    value: function renderHeaderBackground() {
      if (!isNaN(this.options.headerHeight) && this.options.headerHeight > 0) {
        this.ctx.save(); // draw ticks background

        this.ctx.lineWidth = this.pixelRatio;

        if (this.options.headerFillColor) {
          // draw ticks background
          this.ctx.lineWidth = this.pixelRatio; // draw header background

          this.ctx.fillStyle = this.options.headerFillColor;
          this.ctx.fillRect(0, 0, this.canvas.clientWidth, this.options.headerHeight);
        } else {
          this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.options.headerHeight);
        }

        this.ctx.restore();
      }
    }
  }, {
    key: "redraw",
    value: function redraw() {
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(this.redrawInternal);
      } else {
        this.redrawInternal();
      }
    }
    /**
     * perform scroll to max left.
     */

  }, {
    key: "scrollLeft",
    value: function scrollLeft() {
      if (this.scrollContainer.scrollLeft != this.scrollContainer.scrollWidth) {
        this.scrollContainer.scrollLeft = this.scrollContainer.scrollWidth;
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
      var model = this.calculateRowsBounds();

      if (model && model.rows) {
        return model.rows.find(function (rowData) {
          return rowData.y >= posY && posY <= rowData.y + rowData.height;
        });
      }

      return null;
    }
    /**
     * Find sharp pixel position
     */

  }, {
    key: "getSharp",
    value: function getSharp(pos) {
      var thickness = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      if (thickness % 2 == 0) {
        return pos;
      }

      return pos + this.pixelRatio / 2;
    }
    /**
     * Get current time:
     */

  }, {
    key: "getTime",
    value: function getTime() {
      return this.val;
    }
  }, {
    key: "setTimeInternal",
    value: function setTimeInternal(val, source) {
      val = Math.round(val);

      if (val < 0) {
        val = 0;
      }

      if (this.val != val) {
        this.val = val;
        this.emit('timeChanged', {
          val: val,
          source: source
        });
        return true;
      }

      return true;
    }
  }, {
    key: "setTime",
    value: function setTime(val) {
      // don't allow to change time during drag:
      if (this.drag && this.drag.type === TimelineElementType.Timeline) {
        return false;
      }

      return this.setTimeInternal(val, 'setTime');
    }
  }, {
    key: "select",
    value: function select() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this.performSelection(value);
      this.redraw();
    }
  }, {
    key: "getOptions",
    value: function getOptions() {
      return this.options;
    }
  }, {
    key: "controlKeyPressed",
    value: function controlKeyPressed(e) {
      return this.options.controlKeyIsMetaKey || this.options.controlKeyIsMetaKey ? e.metaKey : e.ctrlKey;
    }
  }, {
    key: "emitKeyframesSelected",
    value: function emitKeyframesSelected(selectedKeyframes) {
      // TODO: refine, add changed
      this.emit(TimelineEvents.Selected, {
        keyframes: selectedKeyframes
      });
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
  }, {
    key: "emitDragStartedEvent",
    value: function emitDragStartedEvent() {
      var args = this.getDragEventArgs();
      this.emit(TimelineEvents.DragStarted, args);
      return args;
    }
  }, {
    key: "emitDragFinishedEvent",
    value: function emitDragFinishedEvent() {
      if (this.drag && this.drag.changed) {
        var args = this.getDragEventArgs();
        this.emit(TimelineEvents.DragFinished, args);
        return args;
      }
    }
  }, {
    key: "emitDragEvent",
    value: function emitDragEvent() {
      if (this.drag) {
        var args = this.getDragEventArgs();
        this.emit(TimelineEvents.Drag, {
          keyframes: this.drag.elements
        });
        return args;
      }

      return null;
    }
  }, {
    key: "getDragEventArgs",
    value: function getDragEventArgs() {
      var draggableArguments = new TimelineDragEvent();

      if (this.drag) {
        draggableArguments.val = this.currentPos.val;
        draggableArguments.pos = this.currentPos;
        draggableArguments.elements = this.drag.elements;
        draggableArguments.target = this.drag.target;
      }

      return draggableArguments;
    }
  }, {
    key: "setScrollLeft",
    value: function setScrollLeft(value) {
      if (this.scrollContainer) {
        this.scrollContainer.scrollLeft = value;
      }
    }
  }, {
    key: "setScrollTop",
    value: function setScrollTop(value) {
      if (this.scrollContainer) {
        this.scrollContainer.scrollTop = value;
      }
    }
  }, {
    key: "getScrollLeft",
    value: function getScrollLeft() {
      return this.scrollContainer ? this.scrollContainer.scrollLeft : 0;
    }
  }, {
    key: "getScrollTop",
    value: function getScrollTop() {
      return this.scrollContainer ? this.scrollContainer.scrollTop : 0;
    }
    /**
     * Subscribe on scroll event
     */

  }, {
    key: "onScroll",
    value: function onScroll(callback) {
      this.on(TimelineEvents.Scroll, callback);
    }
    /**
     * Set this.options.
     * Options will be merged with the defaults and control invalidated
     */

  }, {
    key: "setOptions",
    value: function setOptions(toSet) {
      this.options = this.mergeOptions(toSet);
      this.rescale();
      this.redraw(); // Merged options:

      return this.options;
    }
  }, {
    key: "getModel",
    value: function getModel() {
      return this.model;
    }
    /**
     * Set model and redraw application.
     * @param data
     */

  }, {
    key: "setModel",
    value: function setModel(data) {
      this.model = data;
      this.rescale();
      this.redraw();
    }
  }, {
    key: "getMousePos",
    value: function getMousePos(canvas, e) {
      var radius = 1;
      var clientX = 0;
      var clientY = 0;

      if (e instanceof TouchEvent) {
        var wheelEvent = e;

        if (wheelEvent.changedTouches && wheelEvent.changedTouches.length > 0) {
          // TODO: implement better touch support
          var touch = e.changedTouches[0];
          clientX = touch.clientX;
          clientY = touch.clientY;
          radius = Math.max(radius, touch.radiusX, touch.radiusY);
        }
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      var rect = canvas.getBoundingClientRect(),
          // abs. size of element
      scaleX = canvas.width / this.pixelRatio / rect.width,
          // relationship bitmap vs. element for X
      scaleY = canvas.height / this.pixelRatio / rect.height; // relationship bitmap vs. element for Y

      var x = (clientX - rect.left) * scaleX;
      var y = (clientY - rect.top) * scaleY; // scale mouse coordinates after they have been adjusted to be relative to element

      return {
        x: x,
        y: y,
        radius: radius
      };
    }
    /**
     * Apply container div size to the container.
     */

  }, {
    key: "rescaleCanvas",
    value: function rescaleCanvas() {
      var changed = false;
      var width = this.scrollContainer.clientWidth * this.pixelRatio;
      var height = this.scrollContainer.clientHeight * this.pixelRatio;

      if (Math.floor(width) != Math.floor(this.ctx.canvas.width)) {
        this.ctx.canvas.width = width;
        changed = true;
      }

      if (Math.floor(height) != Math.floor(this.ctx.canvas.height)) {
        this.ctx.canvas.height = height;
        changed = true;
      }

      this.ctx.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0);
      return changed;
    }
  }, {
    key: "rescale",
    value: function rescale(newWidth, newHeight, scrollMode) {
      this.rescaleCanvas();
      var data = this.calculateRowsBounds();

      if (data && data.area) {
        var additionalOffset = this.options.stepPx;
        newWidth = newWidth || 0; // not less than current timeline position

        var timelineGlobalPos = this.valToPx(this.val, true);
        var timelinePos = 0;

        if (timelineGlobalPos > this.canvas.clientWidth) {
          if (scrollMode == 'scrollBySelection') {
            timelinePos = Math.floor(timelineGlobalPos + this.canvas.clientWidth + (this.options.stepPx || 0));
          } else {
            timelinePos = Math.floor(timelineGlobalPos + this.canvas.clientWidth / 1.5);
          }
        }

        var keyframeW = data.area.width + this.options.leftMarginPx + additionalOffset;
        newWidth = Math.max(newWidth, // keyframes size
        keyframeW, // not less than current scroll position
        this.scrollContainer.scrollLeft + this.canvas.clientWidth, timelinePos);
        var minWidthPx = Math.floor(newWidth) + 'px';

        if (minWidthPx != this.scrollContent.style.minWidth) {
          this.scrollContent.style.minWidth = minWidthPx;
        }

        newHeight = Math.max(Math.floor(data.area.height + this.canvas.clientHeight * 0.2), this.scrollContainer.scrollTop + this.canvas.clientHeight - 1, Math.round(newHeight || 0));
        var h = newHeight + 'px';

        if (this.scrollContent.style.minHeight != h) {
          this.scrollContent.style.minHeight = h;
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
    key: "findDraggable",
    value: function findDraggable(elements, val) {
      var _this8 = this;

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
        if (element.type === TimelineElementType.Keyframe) {
          var draggable = (_this8.options.keyframesDraggable === undefined ? true : !!_this8.options.keyframesDraggable) && (element.keyframe.draggable === undefined ? true : !!element.keyframe.draggable);

          if (!draggable) {
            return false;
          }
        } else if (element.type === TimelineElementType.Stripe) {
          var _draggable = (_this8.options.stripesDraggable === undefined ? true : !!_this8.options.stripesDraggable) && (element.row.stripeDraggable === undefined ? true : !!element.row.stripeDraggable);

          if (!_draggable) {
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

        if (prioA == prioB) {
          return TimelineUtils.getDistance(a.val, val) > TimelineUtils.getDistance(b.val, val) ? 1 : 0;
        }

        return prioA > prioB ? 1 : 0;
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


      var timeLinePos = this.valToPx(this.val);
      var width = Math.max((this.options.timelineThicknessPx || 1) * this.pixelRatio, this.options.timelineCapWidthPx * this.pixelRatio || 1) + clickRadius;

      if (pos.y <= this.options.headerHeight || pos.x >= timeLinePos - width / 2 && pos.x <= timeLinePos + width / 2) {
        toReturn.push({
          val: this.val,
          type: TimelineElementType.Timeline
        });
      }

      if (pos.y >= this.options.headerHeight && this.options.keyframesDraggable) {
        this.forEachKeyframe(function (keyframe, keyframeIndex, rowModel, rowIndex, isNextRow) {
          // Check keyframes stripe overlap
          if (isNextRow && rowModel.stripeRect) {
            var rowOverlapped = TimelineUtils.isOverlap(pos.x, pos.y, rowModel);

            if (rowOverlapped) {
              var _row = {
                val: _this9.mousePosToVal(pos.x, true),
                type: TimelineElementType.Row,
                row: rowModel.row
              };
              toReturn.push(_row);
            }

            var keyframesStripeOverlapped = TimelineUtils.isOverlap(pos.x, pos.y, rowModel.stripeRect);

            if (keyframesStripeOverlapped) {
              var stripe = {
                val: _this9.mousePosToVal(pos.x, true),
                type: TimelineElementType.Stripe,
                row: rowModel.row
              };

              var snapped = _this9.snapVal(rowModel.minValue); // get snapped mouse pos based on a min value.


              stripe.val += rowModel.minValue - snapped;
              toReturn.push(stripe);
            }
          }

          var keyframePos = _this9.getKeyframePosition(keyframe, rowModel);

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

          return false;
        }, true);
      }

      return toReturn;
    }
    /**
     * Merge options with the defaults.
     */

  }, {
    key: "mergeOptions",
    value: function mergeOptions(toSet) {
      toSet = toSet || {}; // Apply incoming options to default. (override default)

      var options = new timelineOptions_TimelineOptions(); // Merge options with the default.
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
  }]);

  return Timeline;
}(TimelineEventsEmitter);
// CONCATENATED MODULE: ./src/timelineModel.ts
function timelineModel_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function timelineModel_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TimelineModel = function TimelineModel() {
  timelineModel_classCallCheck(this, TimelineModel);

  timelineModel_defineProperty(this, "rows", []);
};
// EXTERNAL MODULE: ./src/timelineRow.ts
var timelineRow = __webpack_require__(1);

// EXTERNAL MODULE: ./src/timelineKeyframe.ts
var timelineKeyframe = __webpack_require__(2);

// EXTERNAL MODULE: ./src/settings/styles/timelineKeyframeStyle.ts
var timelineKeyframeStyle = __webpack_require__(3);

// EXTERNAL MODULE: ./src/settings/styles/timelineRowStyle.ts
var timelineRowStyle = __webpack_require__(4);

// EXTERNAL MODULE: ./src/utils/timelineClickableElement.ts
var timelineClickableElement = __webpack_require__(5);

// EXTERNAL MODULE: ./src/utils/selectable.ts
var selectable = __webpack_require__(6);

// EXTERNAL MODULE: ./src/utils/rowsCalculationsResults.ts
var rowsCalculationsResults = __webpack_require__(0);

// EXTERNAL MODULE: ./src/utils/cutBoundsRect.ts
var cutBoundsRect = __webpack_require__(7);

// EXTERNAL MODULE: ./src/utils/events/timelineSelectedEvent.ts
var timelineSelectedEvent = __webpack_require__(8);

// EXTERNAL MODULE: ./src/utils/events/timelineScrollEvent.ts
var timelineScrollEvent = __webpack_require__(9);

// CONCATENATED MODULE: ./src/index.ts
// bundle entry point



























/***/ })
/******/ ]);
});