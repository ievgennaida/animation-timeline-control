(typeof navigator !== "undefined") && (function (window, factory) {
	// Check require.js lib
	// eslint-disable-next-line no-undef
	if (typeof define === "function" && define.amd) {
		// eslint-disable-next-line no-undef
		define(function () { return factory(window) });
		// eslint-disable-next-line no-undef
	} else if (typeof module === "object" && module.exports) {
		// eslint-disable-next-line no-undef
		module.exports = factory(window);
	} else {
		window.animationTimeline = factory(window);
	}
}(window, function (window) {

	function sign(p) {
		if (Math.sign) {
			return Math.sign(p);
		}
		return p >= 0 ? 1 : -1;
	}

	var document = window.document;

	function clearBrowserSelection() {
		if (window.getSelection) { window.getSelection().removeAllRanges(); }
		else if (document.selection) { document.selection.empty(); }
	}

	var defaultOptions = {
		snapsPerSeconds: 5, // from 1 to 60
		snapEnabled: true,
		/**
		 *  Snap all selected keyframes as bundle during the drag.
		 */
		snapAllKeyframesOnMove: false,
		timelineThicknessPx: 2,
		timelineMarginTopPx: 15,
		timelineCapWidthPx: 4,
		timelineCapHeightPx: 10,
		timelineTriangleCap: false,
		timelineRectCap: true,
		// approximate step in px for 1 second
		stepPx: 120,
		stepSmallPx: 30,
		smallSteps: 50,
		// additional left margin to start the gauge from
		leftMarginPx: 25,
		minTimelineToDispayMs: 5000,
		headerBackground: '#101011',
		selectedLaneColor: '#333333',
		backgroundColor: '#101011',
		timeIndicatorColor: 'DarkOrange',
		labelsColor: '#D5D5D5',
		laneLabelsColor: '#D5D5D5',
		tickColor: '#D5D5D5',
		selectionColor: 'White',
		// Lanes colors
		laneColor: '#252526', //'#252526',37373D
		alternateLaneColor: 'black',//333333
		keyframesLaneColor: '#094771',
		// keyframe color. can be overrided by a keyframe 'color' property.
		keyframeColor: 'red',
		// Shape of the keyframe: none|rhomb|circle|rect
		keyframeShape: 'rhomb',
		// selected keyframe color. can be overrider by a keyframe 'selectedColor' property.
		selectedKeyframeColor: 'DarkOrange',
		keyframeBorderColor: 'Black',
		useAlternateLaneColor: false,
		keyframeBorderThicknessPx: 0.2,
		// can be a number or 'auto'. can be overriden by 'keyframe.size'. Auto is calculated based on the laneHeightPx.
		keyframeSizePx: 'auto',
		laneHeightPx: 24,
		laneMarginPx: 2,
		// Size of the lane in pixels. Can be 'auto' than size is based on the 'laneHeightPx'. can be overriden by lane 'lane.keyframesLaneSizePx'.
		keyframesLaneSizePx: 'auto',
		headerHeight: 30,
		ticksFont: "11px sans-serif",
		zoom: 1000,
		// Zoom speed. Use percent of the screen to set zoom speed.
		zoomSpeed: 0.1,
		// Max zoom
		zoomMin: 80,
		// Min zoom
		zoomMax: 8000,
		// scroll by drag speed (from 0 to 1)
		scrollByDragSpeed: 0.12,
		id: '',
		// Whether keyframes draggable. Can be also configured by a keyframe property draggable
		keyframesDraggable: true,
		// Whether keyframes lanes draggable. Can be also configured by a lane property draggable
		keyframesLanesDraggable: true
	}

	var denominators = [1, 2, 5, 10];
	var clickDetectionMs = 120;

	function getPixelRatio() {
		return 1;
	}

	function msToHMS(ms, isSeconds) {
		// 1- Convert to seconds:
		var seconds = ms / 1000;
		if (isSeconds) {
			seconds = ms;
		}

		var year = Math.floor(seconds / (365 * 86400));
		seconds = seconds % (365 * 86400);

		var days = Math.floor(seconds / 86400);
		seconds = seconds % 86400;

		// 2- Extract hours:
		var hours = parseInt(seconds / 3600); // 3,600 seconds in 1 hour
		seconds = seconds % 3600; // seconds remaining after extracting hours
		// 3- Extract minutes:
		var minutes = parseInt(seconds / 60); // 60 seconds in 1 minute
		// 4- Keep only seconds not extracted to minutes:
		seconds = (seconds % 60);
		var str = '';
		if (year) {
			str += year + ":";
		}

		if (days) {
			str += days + ":";
		}

		if (hours) {
			str += hours + ":";
		}

		if (minutes) {
			str += minutes + ":";
		}

		if (!isNaN(seconds)) {
			str += seconds;
		}

		return str;
	}


	/**
	 * Check rectangle overlap.
	 * @param {number} x1
	 * @param {number} y1
	 * @param {object} rectangle
	 */
	function isOverlap(x, y, rectangle) {
		if (!rectangle) {
			console.log('Rectange cannot be empty');
			return false;
		}

		if (rectangle.x <= x && (rectangle.x + rectangle.w) >= x &&
			rectangle.y <= y && (rectangle.y + rectangle.h) >= y) {
			return true;
		}

		return false;
	}

	function isRectOverlap(rect, rect2) {
		if (!rect || !rect2) {
			console.log('Rectanges cannot be empty');
			return false;
		}

		// If one rectangle is on left side of other
		if (rect.x > rect2.x + rect2.w || rect2.x > rect.x + rect.w) {
			return true;
		}

		// If one rectangle is above other
		if (rect.y < rect2.y + rect2.h || rect2.y < rect.y + rect.h) {
			return true;
		}
		return false;
	}

	function getDistance(x1, y1, x2, y2) {
		if (x2 != undefined && y2 != undefined) {
			return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
		}
		else {
			return Math.abs(x1 - y1);
		}
	}

	function getPowArgument(toCheck) {
		if (!toCheck || toCheck === 0 || !isFinite(toCheck)) {
			return 1;
		}
		// some optimiazation for numbers:
		if (toCheck >= 10 && toCheck < 100) {
			return 1;
		} else if (toCheck >= 100 && toCheck < 1000) {
			return 2;
		} else if (toCheck >= 1000 && toCheck < 10000) {
			return 3;
		}

		toCheck = Math.abs(toCheck);
		var category = 0;
		var s = sign(toCheck);
		if (toCheck > 1) {
			while (toCheck >= 1) {
				toCheck = Math.floor(toCheck / 10.0);
				category++;
			}

			return s * category - 1;
		}
		else if (toCheck > 0.0) {
			// Get number of zeros before the number.
			var zerosCount = Math.floor(Math.log(toCheck) / Math.log(10) + 1);
			zerosCount = zerosCount - 1;
			return zerosCount;
		}
		else {
			return 1;
		}
	}

	var instance = {};
	instance.initialize = function (options, lanes) {

		var container = document.getElementById(options.id);
		if (!container) {
			console.log('options.id is mandatory!');
			return;
		}

		var scrollContainer = document.createElement("div");
		var scrollContent = document.createElement("div");
		var canvas = document.createElement("canvas");

		if (!canvas || !canvas.getContext) {
			console.log('Cannot initialize canvas context.');
			return null;
		}

		container.style.position = "relative";
		// Generate size container:
		canvas.style.cssText = 'image-rendering: -moz-crisp-edges;' +
			'image-rendering: -webkit-crisp-edges;' +
			'image-rendering: pixelated;' +
			'image-rendering: crisp-edges;' +
			'user-select: none;' +
			'-webkit-user-select: none;' +
			'-khtml-user-select: none;' +
			'-moz-user-select: none;' +
			'-o-user-select: none;' +
			'user-select: none;' +
			'touch-action: none;' +
			'position: relative;' +
			'padding: inherit';

		scrollContainer.style.cssText = 'overflow: scroll;' +
			'position: absolute;' +
			'width:  100%;' +
			'height:  100%;';

		scrollContent.style.width = scrollContent.style.height = "100%";
		// add the text node to the newly created div
		scrollContainer.appendChild(scrollContent);
		container.appendChild(scrollContainer);
		var scrollBarWidth = scrollContainer.offsetWidth - scrollContent.clientWidth;
		canvas.style.width = canvas.style.height = "calc(100% -" + (scrollBarWidth || 17) + "px)";

		container.appendChild(canvas);
		mergeOptions(options);

		if (options.backgroundColor) {
			scrollContainer.style.background = options.backgroundColor;
		}

		if (!options.stepPx) {
			options.stepPx = defaultOptions.stepPx;
		}

		if (options.snapsPerSeconds) {
			if (options.snapsPerSeconds < 1) {
				options.snapsPerSeconds = 1;
			} else if (options.snapsPerSeconds > 60) {
				options.snapsPerSeconds = 60;
			}
		}

		var timeLine = {
			val: 0,
		};

		var startPos = null;
		var currentPos = null;
		var selectionRect = null;
		var drag = null;
		var clickDurarion = null;
		var scrollingTimeRef = null;
		var selectedKeyframes = [];
		var intervalReference = null;
		var lastCallDate = null;
		var isPanStarted = false;
		var isPanMode = false;
		var ctx = canvas.getContext("2d");
		var drawLine = function (ctx, x1, y1, x2, y2) {
			ctx.moveTo(x1, y1);
			ctx.lineTo(x2, y2);
		}

		var pixelRatio = getPixelRatio(ctx);
		function getMousePos(canvas, evt) {

			var radius = 1;
			if (evt.changedTouches && evt.changedTouches.length > 0) {
				// TODO: implement better support of this:
				var touch = evt.changedTouches[0];
				if (isNaN(evt.clientX)) {
					evt.clientX = touch.clientX;
					evt.clientY = touch.clientY;
					radius = Math.max(radius, touch.radiusX, touch.radiusY);
				}
			}

			var rect = canvas.getBoundingClientRect(), // abs. size of element
				scaleX = canvas.width / pixelRatio / rect.width, // relationship bitmap vs. element for X
				scaleY = canvas.height / pixelRatio / rect.height; // relationship bitmap vs. element for Y

			var x = (evt.clientX - rect.left) * scaleX;
			var y = (evt.clientY - rect.top) * scaleY;
			// scale mouse coordinates after they have been adjusted to be relative to element
			return {
				x: x,
				y: y,
				radius
			}
		}

		function rescale(scrollMode, newWidth, newHeight) {
			var width = scrollContainer.clientWidth * pixelRatio;
			var height = scrollContainer.clientHeight * pixelRatio;
			if (Math.floor(width) != Math.floor(ctx.canvas.width)) {
				ctx.canvas.width = width;
			}

			if (Math.floor(height) != Math.floor(ctx.canvas.height)) {
				ctx.canvas.height = height;
			}

			ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
			var sizes = getLanesSizes();
			if (sizes && sizes.areaRect) {
				var additionalOffset = options.stepPx;
				newWidth = newWidth || 0;
				// not less than current timeline position
				var timelineGlobalPos = valToPx(timeLine.val, true);
				var timelinePos = 0;
				if (timelineGlobalPos > canvas.clientWidth) {
					if (scrollMode == 'scrollBySelection') {
						timelinePos = Math.floor(timelineGlobalPos + canvas.clientWidth + (options.stepPx || 0));
					} else {
						timelinePos = Math.floor(timelineGlobalPos + canvas.clientWidth / 1.5);
					}
				}
				var keyframeW = sizes.areaRect.w + options.leftMarginPx + additionalOffset;
				newWidth = Math.max(newWidth,
					// keyframes size
					keyframeW,
					// not less than current scroll position
					scrollContainer.scrollLeft + canvas.clientWidth,
					timelinePos,
				);
				newWidth = Math.floor(newWidth) + "px";

				if (newWidth != scrollContent.style.minWidth) {
					scrollContent.style.minWidth = newWidth;
				}

				newHeight = Math.max(Math.floor(sizes.areaRect.h + options.laneHeightPx * 4),
					scrollContainer.scrollTop + canvas.clientHeight - 1,
					Math.round(newHeight || 0));

				var h = newHeight + "px";
				if (scrollContent.style.minHeight != h) {
					scrollContent.style.minHeight = h;
				}
			}
		}


		// Check whether we can drag something here.
		function getDraggable(pos) {

			// few extra pixels to select items:
			var helperSelector = Math.max(2, pos.radius);
			var draggable = null;
			if (pos.y >= options.headerHeight && options.keyframesDraggable) {
				iterateKeyframes(function (keyframe, keyframeIndex, lane, laneIndex) {
					if (keyframe.draggable !== undefined) {
						if (!keyframe.draggable) {
							return;
						}
					}

					var keyframePos = getKeyframePosition(keyframe, laneIndex);
					if (keyframePos) {
						var dist = getDistance(keyframePos.x, keyframePos.y, pos.x, pos.y);
						if (dist <= keyframePos.size + helperSelector) {
							if (!draggable) {
								draggable = {
									obj: keyframe,
									pos: pos,
									val: keyframe.val,
									type: 'keyframe',
									distance: dist
								}
							} else if (dist <= draggable.distance) {
								draggable.obj = keyframe;
								draggable.val = keyframe.val;
							}
						}
					}
				})

				if (draggable) {
					return draggable;
				}

				// Return keyframes lanes:
				const lanesSizes = getLanesSizes();
				if (options.keyframesLanesDraggable && lanesSizes) {
					let foundOverlap = lanesSizes.sizes.find(function lanesSizesIterator(laneSize) {
						if (!laneSize || !laneSize.keyframes) {
							return false;
						}

						if (laneSize.lane.draggable !== undefined) {
							if (!laneSize.lane.draggable) {
								return;
							}
						}

						var laneOverlaped = isOverlap(pos.x, pos.y, laneSize.keyframes);
						return laneOverlaped;
					});

					if (foundOverlap) {
						draggable = {
							obj: foundOverlap,
							pos: pos,
							type: 'lane'
						}

						draggable.val = mousePosToVal(pos.x, true);

						if (foundOverlap && foundOverlap.keyframes) {
							if (foundOverlap.lane && foundOverlap.lane.keyframes) {
								draggable.selectedItems = foundOverlap.lane.keyframes;
							}

							var firstVal = foundOverlap.keyframes.from;
							var snapped = snapVal(firstVal);
							// get snapped mouse pos based on the first keynode.
							draggable.val += firstVal - snapped;
						}

						return draggable;
					}
				}
			}

			// Check whether we can drag timeline.
			var timeLinePos = valToPx(timeLine.val);
			var width = Math.max(((options.timelineThicknessPx || 1) * pixelRatio), options.timelineCapWidthPx * pixelRatio || 1) + helperSelector;
			if (pos.y <= options.headerHeight || (pos.x >= timeLinePos - width / 2 && pos.x <= timeLinePos + width / 2)) {
				return { obj: timeLine, type: "timeline" };
			}
		}

		container.addEventListener("wheel", function (event) {
			if (event.ctrlKey) {
				event.preventDefault();
				if (options.zoomSpeed > 0 && options.zoomSpeed <= 1) {
					var mousePos = getMousePos(canvas, event);
					var x = mousePos.x;
					if (x <= 0)
						x = 0;
					var val = pxToVal(scrollContainer.scrollLeft + x, false);
					var diff = canvas.clientWidth / x;

					var zoom = sign(event.deltaY) * options.zoom * options.zoomSpeed;
					options.zoom += zoom;
					if (options.zoom > options.zoomMax) {
						options.zoom = options.zoomMax;
					}
					if (options.zoom < options.zoomMin) {
						options.zoom = options.zoomMin;
					}
					var zoomCenter = valToPx(val, true);
					var newScrollLeft = Math.round(zoomCenter - canvas.clientWidth / diff);
					if (newScrollLeft <= 0) {
						newScrollLeft = 0;
					}

					rescale('zoom', newScrollLeft + canvas.clientWidth);
					if (scrollContainer.scrollLeft != newScrollLeft) {
						scrollContainer.scrollLeft = newScrollLeft;
						// Scroll event will redraw the screen.
					}

					redraw();
				}
			} else {
				scrollContainer.scrollTop += event.deltaY;
				event.preventDefault();
			}
		});

		if (scrollContainer) {
			scrollContainer.addEventListener('scroll', function (args) {
				if (scrollingTimeRef) {
					clearTimeout(scrollingTimeRef);
					scrollingTimeRef = null;
				}

				// Set a timeout to run event 'scrolling end'.
				scrollingTimeRef = setTimeout(function () {
					if (!isPanStarted) {
						if (scrollingTimeRef) {
							clearTimeout(scrollingTimeRef);
							scrollingTimeRef = null;
						}

						rescale();
						redraw();
					}

				}, 500);

				redraw();
				var scrollData = {
					args: args,
					scrollLeft: scrollContainer.scrollLeft,
					scrollTop: scrollContainer.scrollTop,
					scrollHeight: scrollContainer.scrollHeight,
					scrollWidth: scrollContainer.scrollWidth
				};

				emit('scroll', scrollData);
			});
		}

		window.addEventListener('blur', function () {
			cleanUpSelection();
		}, false);

		window.addEventListener('resize', function () {
			// Rescale and redraw
			rescale();
			redraw();
		}, false);

		document.addEventListener('keydown', (function (e) {
			// ctrl + a. Select all keyframes
			if (e.which === 65 && e.ctrlKey) {
				performSelection(true);
				e.preventDefault();
				return false;
			}
		}));

		canvas.addEventListener('touchstart', function (args) {
			onMouseDown(args);
		}, false);

		canvas.addEventListener('mousedown', function (args) {
			onMouseDown(args);
		}, false);


		function onMouseDown(args) {
			// Prevent drag of the canvas if canvas is selected as text:
			clearBrowserSelection();
			startPos = trackMousePos(canvas, args);
			clickDurarion = new Date();
			currentPos = startPos;
			drag = getDraggable(currentPos);
			// Select keyframes on mouse down
			if (drag) {
				if (drag.type == 'keyframe') {
					drag.startedWithCtrl = args.ctrlKey;
					drag.startedWithShiftKey = args.shiftKey;
					// get all related selected keyframes if we are selecting one.
					if (!drag.obj.selected && !args.ctrlKey && !args.shiftKey) {
						performSelection(true, drag.obj, 'keyframe');
					}

					drag.selectedItems = getSelectedKeyframes();
				}
			}

			redraw();
		}


		var lastUseArgs = null;
		window.addEventListener('mousemove', function (args) {
			lastUseArgs = args;
			onMouseMove(args);
		}, false);

		window.addEventListener('touchmove', function (args) {
			lastUseArgs = args;
			onMouseMove(args);
		}, false);

		function setKeyframePos(keyframe, toSet) {
			toSet = Math.floor(toSet);
			if (keyframe && keyframe.val != toSet) {
				keyframe.val = toSet;
				return true;
			}

			return false;
		}

		function onMouseMove(args) {
			if (!args) {
				args = lastUseArgs;
			}

			if (!args) {
				return;
			}

			var isTouch = (args.changedTouches && args.changedTouches.length > 0);

			currentPos = trackMousePos(canvas, args);
			if (!isPanStarted && selectionRect && checkClickDurationOver()) {
				selectionRect.enabled = true;
			}

			if (startPos) {
				if (args.buttons == 1 || isTouch) {
					var isChanged = false;
					if (drag && drag.obj && !drag.startedWithCtrl) {
						var convertedVal = mousePosToVal(currentPos.x, true);
						//redraw();
						if (drag.type == 'timeline') {
							isChanged |= setTimeInternal(convertedVal, 'user');
						} else if ((drag.type == 'keyframe' || drag.type == 'lane') && drag.selectedItems) {
							var offset = Math.floor(convertedVal - drag.val);
							if (Math.abs(offset) > 0) {
								// dont allow to move less than zero.
								drag.selectedItems.forEach(function (p) {
									if (options.snapAllKeyframesOnMove) {
										var toSet = snapVal(p.val);
										isChanged |= setKeyframePos(p, toSet);
									}

									var newPostion = p.val + offset;
									if (newPostion < 0) {
										offset = -p.val;
									}
								});

								if (Math.abs(offset) > 0) {
									// dont allow to move less than zero.
									drag.selectedItems.forEach(function (p) {
										var toSet = p.val + offset;
										isChanged |= setKeyframePos(p, toSet);
									});

								}

								if (isChanged) {
									if (!drag.changed) {
										emit('dragStarted', { keyframes: drag.selectedItems });
									}

									drag.changed = true;

									drag.val += offset;
									emit('drag', { keyframes: drag.selectedItems });
								}
							}
						}

					}

					if (isPanMode && !drag) {
						isPanStarted = true;
						// Track scroll by drag.
						scrollByPan(startPos, currentPos);
					} else {
						// Track scroll by mouse or touch out of the area.
						scrollBySelectionOutOfBounds(currentPos);
					}
					redraw();
				}
				else {
					// Fallback. Cancel mouse move when focus was lost and mouse down is still counted.
					cleanUpSelection();
					redraw();
				}
			} else if (!isTouch) {
				var draggable = getDraggable(currentPos);
				setCursor('default');
				if (draggable) {
					var cursor = null;
					if (draggable.obj) {
						cursor = draggable.obj.cursor;
					}

					if (draggable.type == 'lane') {
						cursor = cursor || "ew-resize";
					}
					else if (draggable.type == 'keyframe') {
						cursor = cursor || "pointer";
					}
					else {
						cursor = cursor || "ew-resize";
					}

					if (cursor) {
						setCursor(cursor);
					}
				}
			}

			if (isTouch) {
				args.preventDefault();
			}
		}

		function setCursor(cursor) {
			if (canvas.style.cursor != cursor) {
				canvas.style.cursor = cursor;
			}
		}

		window.addEventListener('mouseup', function (args) {
			onMouseUp(args);
		}, false);

		window.addEventListener('touchend', function (args) {
			onMouseUp(args);
		}, false);

		function onMouseUp(args) {
			if (startPos) {
				//window.releaseCapture();
				var pos = trackMousePos(canvas, args);

				// Click detection.
				if (selectionRect && selectionRect.h <= 2 && selectionRect.w <= 2 ||
					!checkClickDurationOver() ||
					(drag && drag.startedWithCtrl) ||
					(drag && drag.startedWithShiftKey)) {
					performClick(pos, args, drag);
				} else if (!drag && selectionRect && selectionRect.enabled) {
					performSelection(true, selectionRect, 'rectangle', args.shiftKey);
				}

				cleanUpSelection();
				redraw();
			}
		}

		function performClick(pos, args, drag) {
			var isChanged = false;
			if (drag && drag.type == 'keyframe') {
				var isSelected = true;
				if ((drag.startedWithCtrl && args.ctrlKey) || (drag.startedWithShiftKey && args.shiftKey)) {
					if (args.ctrlKey) {
						isSelected = !drag.obj.selected
					}
				}
				// Reverse selected keyframe selection by a click:
				isChanged |= performSelection(isSelected, drag.obj, 'keyframe', args.ctrlKey || args.shiftKey);

				if (args.shiftKey) {
					// change timeline pos:
					var convertedVal = mousePosToVal(pos.x, true);
					// Set current timeline position if it's not a drag or selection rect small or fast click.
					isChanged |= setTimeInternal(convertedVal, 'user');
				}
			}
			else {
				// deselect keyframes if any:
				isChanged |= performSelection(false);

				// change timeline pos:
				// Set current timeline position if it's not a drag or selection rect small or fast click.
				isChanged |= setTimeInternal(mousePosToVal(pos.x, true), 'user');
			}

			return isChanged;
		}

		function setPanMode(value) {
			if (isPanMode != value) {
				isPanMode = value;
				// Awoid any conflicts with other modes:
				cleanUpSelection();
			}
		}

		this.setPanMode = setPanMode;
		function getSelectedKeyframes() {
			selectedKeyframes.length = 0;
			iterateKeyframes(function selectionIterator(keyframe) {
				if (keyframe && keyframe.selected) {
					selectedKeyframes.push(keyframe);
				}
			});

			return selectedKeyframes;
		}


		/**
		 * Do the selection.
		 * @param {boolean} isSelected
		 * @param {object} selector can be retangle or keyframe object.
		 * @param {string} mode selector mode. keyframe | rectrangle | all
		 * @param {boolean} ignoreOthers value indicating whether all other object should be reversed.
		 * @return isChanged
		 */
		function performSelection(isSelected, selector, mode, ignoreOthers) {
			if (isSelected === undefined) {
				isSelected = true;
			}

			var deselectionMode = false;
			if (!mode) {
				mode = 'all';
			}

			if (mode == 'all') {
				if (!isSelected) {
					isSelected = false;
				}

				deselectionMode = isSelected;
			}

			selectedKeyframes.length = 0;
			var isChanged = true;

			iterateKeyframes(function selectionIterator(keyframe, keyframeIndex, lane, laneIndex) {
				var keyframePos = getKeyframePosition(keyframe, laneIndex);
				if (keyframePos) {
					if ((mode == 'keyframe' && selector == keyframe) ||
						(mode == 'rectangle' && selector && isOverlap(keyframePos.x, keyframePos.y, selector))) {
						if (keyframe.selected != isSelected) {
							keyframe.selected = isSelected;
							isChanged = true;
						}

						if (keyframe.selected) {
							selectedKeyframes.push(keyframe);
						}
					} else {
						// Deselect all other keyframes.
						if (!ignoreOthers && keyframe.selected != deselectionMode) {
							keyframe.selected = deselectionMode;
							isChanged = deselectionMode;
						}
					}
				}
			});

			if (isChanged) {
				onKeyframesSelected(selectedKeyframes);
			}

			return isChanged;
		}

		function iterateKeyframes(callback) {
			if (!lanes || !lanes.forEach || lanes.length <= 0) {
				return false;
			}

			var nextLane = false;
			lanes.filter(p => p && !p.hidden).forEach(function lanesIterator(lane, index) {
				if (!lane || !lane.keyframes || !lane.keyframes.forEach || lane.keyframes.length <= 0) {
					return;
				}

				nextLane = true;
				lane.keyframes.filter(p => p && !p.hidden).forEach(function keyframesIterator(keyframe, keyframeIndex) {
					if (callback && keyframe) {
						callback(keyframe, keyframeIndex, lane, index, nextLane);
					}

					nextLane = false;
				});
			});
		}

		function trackMousePos(canvas, mouseArgs) {
			var pos = getMousePos(canvas, mouseArgs);
			pos.scrollLeft = scrollContainer.scrollLeft;
			pos.scrollTop = scrollContainer.scrollTop;
			pos.val = pxToVal(pos.x);

			if (startPos) {
				if (!selectionRect) {
					selectionRect = {};
				}

				// get the pos with the virtualization:
				var x = Math.floor(startPos.x + (startPos.scrollLeft - pos.scrollLeft));
				var y = Math.floor(startPos.y + (startPos.scrollTop - pos.scrollTop));
				selectionRect.x = Math.min(x, pos.x);
				selectionRect.y = Math.min(y, pos.y);
				selectionRect.w = Math.max(x, pos.x) - selectionRect.x;
				selectionRect.h = Math.max(y, pos.y) - selectionRect.y;
			}

			return pos;
		}

		function cleanUpSelection() {
			if (drag && drag.changed) {
				emit('dragFinished', { keyframes: drag.selectedItems });
			}

			startPos = null;
			drag = null;
			selectionRect = null;
			clickDurarion = null;
			isPanStarted = false;
			clearMoveInterval();
		}

		function checkClickDurationOver() {
			// Duration before the selection can be tracked.
			if ((clickDurarion && new Date() - clickDurarion > clickDetectionMs)) {
				return true;
			}

			return false;
		}

		//stepsCanFit
		rescale();

		/**
		 * Automatically move canvas when selection and mouse over the bounds.
		 */
		function startAutoScrollInterval() {
			if (!intervalReference) {
				// Repeat move calls to
				intervalReference = setInterval(function () {
					onMouseMove();
				}, 50);
			}
		}

		function clearMoveInterval() {
			if (intervalReference) {
				clearInterval(intervalReference);
				intervalReference = null;
			}

			lastCallDate = null;
		}

		function checkUpdateSpeedIsFast() {
			// Dont update too often.
			if (lastCallDate && new Date() - lastCallDate <= 10) {
				return true;
			}

			lastCallDate = new Date();
			return false;
		}


		function scrollByPan(start, pos) {
			if (!start || !pos) {
				return;
			}

			var newTop = Math.round(start.y - pos.y);
			var offsetX = Math.round(start.x - pos.x);
			var newLeft = start.scrollLeft + offsetX;

			if (offsetX > 0) {
				rescale(newLeft + canvas.clientWidth);
			}

			if (offsetX > 0 && newLeft + canvas.clientWidth >= scrollContainer.scrollWidth - 5) {
				scrollContainer.scrollLeft = scrollContainer.scrollWidth;
			}
			else {
				scrollContainer.scrollLeft = newLeft;
			}
			scrollContainer.scrollTop = newTop;

		}

		function scrollBySelectionOutOfBounds(pos) {
			var x = pos.x;
			var y = pos.y;
			var isChanged = false;
			var speedX = 0;
			var speedY = 0;
			var isLeft = x <= 0;
			var isRight = x >= canvas.clientWidth;
			var isTop = y <= 0;
			var isBottom = y >= canvas.clientHeight;
			var newWidth = null;
			var newHeight = null;
			if (isLeft || isRight || isTop || isBottom) {
				// Auto move init
				startAutoScrollInterval();

				if (checkUpdateSpeedIsFast()) {
					return;
				}

				var scrollSpeedMultiplier = (isNaN(options.scrollByDragSpeed) ? 1 : options.scrollByDragSpeed);
				if (isLeft) {
					// Get normilized speed.
					speedX = -getDistance(x, 0) * scrollSpeedMultiplier
				} else if (isRight) {
					// Get normalized speed:
					speedX = getDistance(x, canvas.clientWidth) * scrollSpeedMultiplier;
					newWidth = scrollContainer.scrollLeft + canvas.clientWidth + speedX;
				}

				if (isTop) {
					// Get normilized speed.
					speedY = -getDistance(x, 0) * scrollSpeedMultiplier / 4;
				} else if (isBottom) {
					// Get normalized speed:
					speedY = getDistance(x, canvas.clientHeight) * scrollSpeedMultiplier / 4;
					newHeight = scrollContainer.scrollTop + canvas.clientHeight;
				}
			}
			else {
				clearMoveInterval();
			}

			if (newWidth || newHeight) {
				rescale('scrollBySelection', newWidth, newHeight);
			}

			if (Math.abs(speedX) > 0) {
				scrollContainer.scrollLeft += speedX;
				isChanged = true;
			}

			if (Math.abs(speedY) > 0) {
				scrollContainer.scrollTop += speedY;
				isChanged = true;
			}

			return isChanged;
		}

		// Find ms from the the px coordinates
		function pxToVal(coords, globalCoords) {
			if (!globalCoords) {
				coords -= options.leftMarginPx;
			}
			var ms = coords / options.stepPx * options.zoom;
			return ms;
		}

		// convert
		function valToPx(ms, globalCoords) {
			// Respect current scroll container offset. (virtualization)
			if (!globalCoords) {
				var x = scrollContainer.scrollLeft;
				ms -= pxToVal(x);
			}

			return (ms * options.stepPx / options.zoom);
		}

		function snapVal(ms) {
			// Apply snap to steps if enabled.
			if (options.snapsPerSeconds && options.snapEnabled) {
				var stopsPerPixel = (1000 / options.snapsPerSeconds);
				var step = ms / stopsPerPixel;
				var stepsFit = Math.round(step);
				ms = Math.round(stepsFit * stopsPerPixel);
			}

			if (ms < 0) {
				ms = 0;
			}

			return ms;
		}

		function mousePosToVal(x, snapEnabled) {
			var convertedVal = pxToVal(scrollContainer.scrollLeft + Math.min(x, canvas.clientWidth));
			convertedVal = Math.round(convertedVal);
			if (snapEnabled) {
				convertedVal = snapVal(convertedVal);
			}

			return convertedVal;
		}

		function findGoodStep(originaStep, divisionCheck) {
			var step = originaStep;
			var lastDistance = null;
			var pow = getPowArgument(originaStep);
			for (var i = 0; i < denominators.length; i++) {
				var denominator = denominators[i];
				var calculatedStep = denominator * Math.pow(10, pow);
				if (divisionCheck && (divisionCheck % calculatedStep) != 0) {
					continue;
				}
				var distance = getDistance(originaStep, calculatedStep);

				if (distance == 0 || (distance <= 0.1 && pow > 0)) {
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

		function drawTicks() {
			ctx.save();

			var areaWidth = scrollContainer.scrollWidth - options.leftMarginPx;
			var from = pxToVal(0);
			var to = pxToVal(areaWidth);
			var dist = getDistance(from, to);
			if (dist === 0) {
				return;
			}

			// normalize step.
			var stepsCanFit = areaWidth / options.stepPx;
			var realStep = dist / stepsCanFit;
			// Find the nearest 'beautiful' step for a gauge. This step should be devided by 1/2/5!
			//var step = realStep;
			var step = findGoodStep(realStep);
			if (step == 0 || isNaN(step) || !isFinite(step)) {
				return;
			}

			var goodStepDistancePx = areaWidth / (dist / step);
			var smallStepsCanFit = goodStepDistancePx / options.stepSmallPx;
			var realSmallStep = step / smallStepsCanFit;
			var smallStep = findGoodStep(realSmallStep, step);
			if (step % smallStep != 0) {
				smallStep = realSmallStep;
			}
			// filter to draw only visible
			var visibleFrom = pxToVal(scrollContainer.scrollLeft + options.leftMarginPx);
			var visibleTo = pxToVal(scrollContainer.scrollLeft + scrollContainer.clientWidth);
			// Find beautiful start point:
			from = Math.floor(visibleFrom / step) * step;

			// Find a beautiful end point:
			to = Math.ceil(visibleTo / step) * step + step;

			var lastTextX = null;
			for (var i = from; i <= to; i += step) {
				var pos = valToPx(i);
				var sharpPos = getSharp(Math.round(pos));
				ctx.save();
				ctx.beginPath();
				ctx.setLineDash([4]);
				ctx.lineWidth = pixelRatio;
				ctx.strokeStyle = options.tickColor;
				drawLine(ctx, sharpPos, (options.headerHeight || 0) / 2, sharpPos, canvas.clientHeight);
				ctx.stroke();

				ctx.fillStyle = options.labelsColor;
				if (options.ticksFont) {
					ctx.font = options.ticksFont;
				}

				var text = msToHMS(i)
				var textSize = ctx.measureText(text);

				var textX = sharpPos - textSize.width / 2;
				// skip text render if there is no space for it.
				if (isNaN(lastTextX) || lastTextX <= textX) {

					lastTextX = textX + textSize.width;
					ctx.fillText(text, textX, 10);
				}

				ctx.restore();
				// Draw small steps
				for (var x = i + smallStep; x < i + step; x += smallStep) {
					var nextPos = valToPx(x);
					var nextSharpPos = getSharp(Math.floor(nextPos));
					ctx.beginPath();
					ctx.lineWidth = pixelRatio;
					ctx.strokeStyle = options.tickColor;
					drawLine(ctx, nextSharpPos, (options.headerHeight || 0) / 1.3, nextSharpPos, options.headerHeight);
					ctx.stroke();
				}
			}

			ctx.restore();
		}

		function getLanesSizes() {
			var toReturn = {
				sizes: [],
				areaRect: {
					x: 0,
					y: 0,
					w: 0,
					h: 0,
					from: null,
					to: null
				}
			}

			if (!options.laneHeightPx) {
				console.log('laneHeightPx should be set.');
				return toReturn;
			}

			if (!lanes || !lanes.forEach || lanes.length <= 0) {
				return toReturn;
			}

			var areaRect = toReturn.areaRect;

			lanes.filter(p => p && !p.hidden).forEach(function lanesIterator(lane, index) {
				if (!lane) {
					return;
				}

				// draw with scroll virtualization:
				var globalLaneY = getLanePosition(index);
				var laneY = globalLaneY - scrollContainer.scrollTop;
				if (index == 0) {
					areaRect.y = laneY;
				}

				areaRect.h = Math.max(globalLaneY + options.laneHeightPx, areaRect.h);

				var laneSize = {
					x: 0,
					y: laneY,
					w: canvas.clientWidth,
					h: options.laneHeightPx,
					clientWidth: canvas.clientWidth,
					clientHeight: canvas.clientHeight,
					lane: lane,
					index: index,
					keyframes: {
						from: null,
						to: null,
						count: lane.keyframes ? lane.keyframes.length : 0,
					}
				};

				// get the bounds on a canvas. used instead of the clip (clip is slow)
				laneSize.bounds = cutBounds({ x: laneSize.x, y: laneSize.y, w: laneSize.w, h: laneSize.h });

				toReturn.sizes.push(laneSize);
				var size = laneSize.keyframes;

				if (!lane.keyframes || !lane.keyframes.forEach || lane.keyframes.length <= 0) {
					return;
				}

				// Get min and max ms to draw keyframe lane:
				lane.keyframes.forEach(function keyframesIterator(keyframe) {
					var val = keyframe.val;

					if (size && keyframe && !isNaN(val)) {
						size.from = size.from == null ? val : Math.min(val, size.from);
						size.to = size.to == null ? val : Math.max(val, size.to);
					}
				});

				// get absolute min and max:
				areaRect.from = areaRect.from == null ? size.from : Math.min(size.from, areaRect.from);
				areaRect.to = areaRect.to == null ? size.to : Math.max(size.to, areaRect.to);

				// get keyframes lane size
				if (laneSize && !isNaN(size.from) && !isNaN(size.to)) {
					// draw keyframes lane.
					var fromPos = getSharp(valToPx(size.from))
					var toPos = getSharp(valToPx(size.to));
					var laneHeight = getKeyframeLaneHeight(lane, laneSize.y);

					size.x = fromPos;
					size.y = laneHeight.y;
					size.w = getDistance(fromPos, toPos);
					size.h = laneHeight.h;
					// get the bounds on a canvas
					size.bounds = cutBounds({ x: size.x, y: size.y, w: size.w, h: size.h });
				}
			});

			areaRect.w = valToPx(areaRect.to, true);
			return toReturn;
		}

		function drawLanes() {
			if (!lanes || !lanes.forEach || lanes.length <= 0) {
				return false;
			}

			var lanesSizes = getLanesSizes();
			if (lanesSizes && lanesSizes.sizes) {
				ctx.save();
				lanesSizes.sizes.forEach(function lanesSizesIterator(laneSize) {

					if (!laneSize) {
						return;
					}

					var selectedColor = laneSize.lane.selectedColor || options.selectedLaneColor;
					var laneColor = laneSize.lane.color || options.laneColor;

					// Draw lane
					if (laneSize.lane.selected && selectedColor) {
						ctx.fillStyle = selectedColor;
					} else if (laneSize.index % 2 != 0 && options.useAlternateLaneColor && !laneSize.lane.color) {
						// Use alternate when lane color not set
						ctx.fillStyle = options.alternateLaneColor || laneColor;
					} else {
						ctx.fillStyle = laneColor;
					}

					//ctx.fillRect(lanesSizes.areaRect.x, lanesSizes.areaRect.y, lanesSizes.areaRect.w, lanesSizes.areaRect.h);
					// Note: bounds used instead of the clip while clip is slow!
					var bounds = laneSize.bounds;
					if (bounds) {
						ctx.fillRect(bounds.x, bounds.y, bounds.w, bounds.h);
						if (laneSize.lane.name) {
							ctx.fillStyle = options.laneLabelsColor;
							ctx.fillText(laneSize.lane.name, bounds.x + 10, bounds.y + bounds.h / 2);
						}
					}

					if (laneSize.lane.render) {
						laneSize.lane.render(ctx, laneSize);
					} else {
						var keyframeLaneColor = laneSize.lane.keyframesLaneColor || options.keyframesLaneColor;

						var keyframesSize = laneSize.keyframes;
						if (!keyframesSize || keyframesSize.count <= 1 || !keyframeLaneColor) {
							return;
						}

						bounds = keyframesSize.bounds;
						if (bounds) {
							ctx.fillStyle = keyframeLaneColor;
							ctx.fillRect(bounds.x, bounds.y, bounds.w, bounds.h);
						}
					}
				});

				ctx.restore();
			}

			return true;
		}

		function cutBounds(rect) {
			// default bounds: minX, maxX, minY, maxY
			var minX = 0, maxX = canvas.clientWidth, minY = options.headerHeight || 0, maxY = canvas.clientWidth;

			if (isRectOverlap(rect, { x: minX, y: minY, w: getDistance(minX, maxX), h: getDistance(minY, maxY) })) {
				var y = Math.max(rect.y, minY);
				var x = Math.max(rect.x, minX);
				var offsetW = rect.x - x;
				var offsetH = rect.y - y;
				rect.h += offsetH;
				rect.w += offsetW;
				rect.x = x;
				rect.y = y;

				// collision set:
				if (Math.abs(offsetH) > 0) {
					rect.overlapY = true;
				}

				if (Math.abs(offsetW) > 0) {
					rect.overlapX = true;
				}

				return rect;// { x: x, y: y, w: w, h: h };
			}
			return null;
		}

		function getLanePosition(laneIndex) {
			var laneY = options.headerHeight +
				laneIndex * options.laneHeightPx +
				laneIndex * options.laneMarginPx;
			return laneY;
		}

		function getKeyframeLaneHeight(lane, laneY) {
			var keyframeLaneHeight = lane.keyframesLaneSizePx || options.keyframesLaneSizePx;
			if (isNaN(keyframeLaneHeight)) {
				keyframeLaneHeight = 'auto';
			}

			if (keyframeLaneHeight == 'auto') {
				keyframeLaneHeight = Math.floor(options.laneHeightPx * 0.8);
			}

			if (keyframeLaneHeight > options.laneHeightPx) {
				keyframeLaneHeight = options.laneHeightPx;
			}

			var margin = options.laneHeightPx - keyframeLaneHeight;
			var y = laneY + Math.floor(margin / 2);
			return { y: y, h: keyframeLaneHeight };
		}

		function getKeyframePosition(keyframe, laneIndex) {
			if (!keyframe) {
				console.log('keyframe should be defined.');
				return null;
			}

			var val = keyframe.val;
			if (isNaN(val)) {
				return null;
			}

			// get center of the lane:
			var laneY = getLanePosition(laneIndex);
			var y = laneY + options.laneHeightPx / 2 - scrollContainer.scrollTop;

			// keyframe size:
			var size = options.keyframeSizePx || keyframe.size;
			if (size == 'auto') {
				size = options.laneHeightPx / 3;
			}

			if (size > 0) {
				if (!isNaN(val)) {
					var toReturn = { x: Math.floor(valToPx(val)), y: Math.floor(y), size: size, laneY: laneY };
					return toReturn;
				}
			}

			return null;
		}

		function drawKeyframes() {
			if (!lanes || !lanes.forEach || lanes.length <= 0) {
				return false;
			}

			iterateKeyframes(function seletionIterator(keyframe, keyframeIndex, lane, laneIndex) {
				var pos = getKeyframePosition(keyframe, laneIndex);
				if (pos) {
					if (lane.drawKeyframes !== undefined) {
						if (!lane.drawKeyframes) {
							return;
						}
					}

					var x = getSharp(pos.x);
					var y = pos.y;
					var size = pos.size;
					var bounds = cutBounds({ x: x - size / 2, y: y - size / 2, w: size, h: size });
					var customRenderFunction = lane.renderKeyframes || keyframe.render;
					if (customRenderFunction) {
						ctx.save();
						customRenderFunction(ctx, pos, bounds, keyframe, lane);
						ctx.restore();
					} else {
						if (!bounds) {
							return;
						}

						ctx.save();

						// Performance FIX: use clip only  when we are in the collision! Clip is slow!
						// Other keyframes should be hidden by bounds check.
						if (bounds && bounds.overlapY) {
							ctx.beginPath();
							ctx.rect(0, options.headerHeight || 0, canvas.clientWidth, canvas.clientWidth);
							ctx.clip();
						}

						var border = options.keyframeBorderThicknessPx || 0;
						var shape = keyframe.shape || lane.keyframesShape || options.keyframeShape;
						var keyframeColor = keyframe.color || options.keyframeColor;
						if (keyframe.selected) {
							keyframeColor = keyframe.selectedColor || options.selectedKeyframeColor;
						}

						if (shape == "rhomb") {
							ctx.beginPath();
							ctx.translate(x, y);
							ctx.rotate(45 * Math.PI / 180);
							if (border > 0 && options.keyframeBorderColor) {
								ctx.fillStyle = options.keyframeBorderColor;
								ctx.rect(-size / 2, -size / 2, size, size);
								ctx.fill();
							}

							ctx.fillStyle = keyframeColor;
							// draw main keyframe data with offset.
							ctx.translate(border, border);
							ctx.rect(-size / 2, -size / 2, size - border * 2, size - border * 2);
							ctx.fill();
						} else if (shape == "circle") {
							ctx.beginPath();
							if (border > 0 && options.keyframeBorderColor) {
								ctx.fillStyle = options.keyframeBorderColor;
								ctx.arc(x, y, size, 0, 2 * Math.PI);
							}
							ctx.fillStyle = keyframeColor;
							ctx.arc(x, y, size - border, 0, 2 * Math.PI);
							ctx.fill();
						} else if (shape == "rect") {
							ctx.beginPath();
							y = y - size / 2;
							x = x - size / 2;
							if (border > 0 && options.keyframeBorderColor) {
								ctx.fillStyle = options.keyframeBorderColor;
								ctx.rect(x, y, size, size);
								ctx.fill();
							}

							ctx.fillStyle = keyframeColor;
							ctx.rect(x + border, y + border, size - border, size - border);
							ctx.fill();
						}

						ctx.restore();
					}
				}
			});


		}

		function drawSelection() {
			if (drag) {
				return;
			}

			ctx.save();
			var thickness = 1;
			if (selectionRect && selectionRect.enabled) {
				ctx.setLineDash([4]);
				ctx.lineWidth = pixelRatio;
				ctx.strokeStyle = options.selectionColor;
				ctx.strokeRect(
					getSharp(selectionRect.x, thickness),
					getSharp(selectionRect.y, thickness),
					Math.floor(selectionRect.w),
					Math.floor(selectionRect.h));
			}
			ctx.restore();
		}

		function drawBackground() {
			if (options.backgroundColor) {
				ctx.save();
				ctx.beginPath();
				ctx.rect(0, 0, canvas.clientWidth, canvas.clientHeight);
				ctx.fillStyle = options.backgroundColor;
				ctx.fill();
				ctx.restore();
			} else {
				// Clear if bg not set.
				ctx.clearRect(0, 0, canvas.width, canvas.height);
			}
		}

		function drawTimeLine() {
			ctx.save();
			var thickness = options.timelineThicknessPx;
			ctx.lineWidth = thickness * pixelRatio;
			var timeLinePos = getSharp(Math.round(valToPx(timeLine.val)), thickness);
			ctx.strokeStyle = options.timeIndicatorColor;
			ctx.fillStyle = ctx.strokeStyle;
			var y = options.timelineMarginTopPx;
			ctx.beginPath();
			drawLine(ctx, timeLinePos, y, timeLinePos, canvas.clientHeight);
			ctx.stroke();

			if (options.timelineCapWidthPx && options.timelineCapHeightPx) {
				var rectSize = options.timelineCapWidthPx;
				var capHeight = options.timelineCapHeightPx;
				if (options.timelineTriangleCap) {
					ctx.beginPath();
					ctx.moveTo(timeLinePos - rectSize / 2, y);
					ctx.lineTo(timeLinePos + rectSize / 2, y);
					ctx.lineTo(timeLinePos, capHeight);
					ctx.closePath();
					ctx.stroke();
				}
				else if (options.timelineRectCap) {
					ctx.fillRect(timeLinePos - rectSize / 2, y, rectSize, capHeight);
					ctx.fill();
				}
			}

			ctx.restore();
		}

		function drawHeaderBackground() {
			if (!isNaN(options.headerHeight) && options.headerHeight > 0) {
				ctx.save();
				// draw ticks background
				ctx.lineWidth = pixelRatio;
				if (options.headerBackground) {
					// draw ticks background
					ctx.lineWidth = pixelRatio;
					// draw header background
					ctx.fillStyle = options.headerBackground;
					ctx.fillRect(0, 0, canvas.clientWidth, options.headerHeight);
				}
				else {
					ctx.clearRect(0, 0, canvas.clientWidth, options.headerHeight);
				}
				ctx.restore();
			}
		}

		function redraw() {
			if (window.requestAnimationFrame) {
				window.requestAnimationFrame.call(this, redrawInternal);
			} else {
				redrawInternal();
			}
		}

		function scrollLeft() {
			if (scrollContainer.scrollLeft != scrollContainer.scrollWidth) {
				scrollContainer.scrollLeft = scrollContainer.scrollWidth;
			}
		}

		this.scrollLeft = scrollLeft;
		function redrawInternal() {
			// Rescale when out of the bounds.
			if (valToPx(timeLine.val, true) > scrollContainer.scrollWidth) {
				rescale('play');
				if (!isPanStarted && (drag && drag.type != 'timeline')) {
					scrollLeft();
				}
			}

			drawBackground();
			drawLanes();
			drawHeaderBackground();
			drawTicks();
			drawKeyframes();
			drawSelection();
			drawTimeLine();
		}

		function getSharp(pos, thinkess) {
			if (!thinkess) {
				thinkess = 1;
			}

			if (thinkess % 2 == 0) {
				return pos;
			}

			return pos + pixelRatio / 2;
		}

		/**
		 * Get current time in val.
		 * @public
		 */
		this.getTime = function () {
			return timeLine.val;
		}

		function setTimeInternal(val, source) {
			val = Math.round(val);
			if (val < 0) {
				val = 0;
			}

			if (timeLine.val != val) {
				timeLine.val = val;
				emit('timeChanged', { val: val, source: source });
				return true;
			}

			return true;
		}

		this.setTime = function (val) {
			// Dont allow to change time during drag:
			if (drag && drag.type == 'timeline') {
				return false;
			}

			return setTimeInternal(val, "setTime");
		};

		this.select = function (value) {
			performSelection(value);
			redraw();
		}

		function getOptions() {
			return options;
		}

		function mergeOptions(toSet) {
			toSet = toSet || {};
			// Merge options with the default:
			for (var key in defaultOptions) {
				if (Object.prototype.hasOwnProperty.call(defaultOptions, key) && toSet[key] == undefined) {
					toSet[key] = defaultOptions[key];
				}
			}

			return toSet;
		}

		this.redraw = redraw;

		function onKeyframesSelected(keyframe) {
			emit('selected', keyframe);
		}

		var subscriptions = [];

		this.setScrollLeft = function (value) {
			if (scrollContainer) {
				scrollContainer.scrollLeft = value;
			}
		}
		this.setScrollTop = function (value) {
			if (scrollContainer) {
				scrollContainer.scrollTop = value;
			}
		}
		this.getScrollLeft = function () {
			if (scrollContainer) {
				return scrollContainer.scrollLeft;
			}

			return 0;
		};
		this.getScrollTop = function () {
			if (scrollContainer) {
				return scrollContainer.scrollTop;
			}

			return 0;
		};

		this.onScroll = function (callback) {
			this.on('scroll', callback);
		}

		// on event.
		this.on = function (topic, callback) {
			if (!callback) {
				return;
			}

			subscriptions.push({ topic: topic, callback: callback });
		}

		// emit event.
		function emit(topic, args) {
			for (var i = subscriptions.length - 1; i >= 0; i--) {
				var sub = subscriptions[i];
				if (sub.topic == topic && sub.callback) {
					sub.callback(args);
				}
			}
		}

		this.getOptions = getOptions;
		this.setOptions = function (toSet) {
			options = mergeOptions(toSet);
			rescale();
			redraw();
		}

		function getLanes() {
			return lanes;
		}

		function setLanes(data) {
			if (lanes != data) {
				lanes = data;
				rescale();
				redraw();
			}
		}

		this.setLanes = setLanes;
		this.getLanes = getLanes;
		this.rescale = rescale;
		this.redraw = redraw;
		this.emit = emit;

		// expose private methods:
		this.__cutBounds = cutBounds;

		/**
		 * Remove the event from the subscriptions list.
		 * @param {string} topic
		 * @param {Function} callback
		 */
		this.off = function (topic, callback) {
			for (var i = subscriptions.length - 1; i >= 0; i--) {
				var sub = subscriptions[i];
				if (sub.topic == topic && sub.callback == callback) {
					subscriptions = subscriptions.filter(function (ele) {
						return ele != callback;
					});
				}
			}
		}

		rescale();
		redraw();

		return this;
	}

	return instance;
}));
