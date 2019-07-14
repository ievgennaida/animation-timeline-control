var animationTimeline = function (window, document) {

	let width = 0;
	if (!Math.sign) {
		Math.sign = function (p) {
			return p >= 0 ? 1 : -1;
		}
	}

	function clearBrowserSelection() {
		if (window.getSelection) { window.getSelection().removeAllRanges(); }
		else if (document.selection) { document.selection.empty(); }
	}

	let defaultOptions = {
		keysPerSecond: 60,
		snapPointsPerPixel: 5, // from 1 to 60
		snapEnabled: true,
		extraRightMargin: 50,
		// Snap all the keyframes when multiple is moved.
		snapAllKeyframesOnMove: false,
		timelineThicknessPx: 2,
		timelineMarginTopPx: 15,
		timelineCapWidthPx: 4,
		timelineCapHeightPx: 10,
		timelineTriangleCap: false,
		timelineRectCap: true,
		// approximate step in px for 1 second 
		stepPx: 100,
		stepSmallPx: 30,
		smallSteps: 50,
		// additional left margin to start the gauge from
		leftMarginPx: 25,
		minTimelineToDispayMs: 5000,
		headerBackground: 'black',
		selectedLaneColor: '#333333',
		// lanes colors
		laneColor: 'white',
		alternateLaneColor: 'black',//333333
		useAlternateLaneColor: false,
		keyframesLaneColor: 'red',
		// keyframe color. can be overrided by a keyframe 'color' property.
		keyframeColor: 'Yellow',
		// selected keyframe color. can be overrider by a keyframe 'selectedColor' property.
		selectedKeyframeColor: 'DarkOrange',
		keyframeBorderColor: 'Black',
		keyframeBorderThicknessPx: 0.2,
		// can be a number or 'auto'. can be overriden by 'keyframe.size'. Auto is calculated based on the laneHeightPx.
		keyframeSizePx: 'auto',
		backgroundColor: 'black',//1E1E1E
		timeIndicatorColor: 'DarkOrange',
		labelsColor: '#D5D5D5',
		tickColor: '#D5D5D5',
		selectionColor: 'White',
		laneHeightPx: 24,
		laneMarginPX: 1,
		// Size of the lane in pixels. Can be 'auto' than size is based on the 'laneHeightPx'. can be overriden by lane 'lane.keyframesLaneSizePx'. 
		keyframesLaneSizePx: 'auto',
		headerHeight: 30,
		lineHeight: 1,
		autoWidth: true,
		ticksFont: "11px sans-serif",
		zoom: 1000,
		id: '',
		scrollId: ''
	}
	var denominators = [1, 2, 5, 10];
	var clickDetectionMs = 120;

	function getPixelRatio(ctx) {
		dpr = window.devicePixelRatio || 1,
			bsr = ctx.webkitBackingStorePixelRatio ||
			ctx.mozBackingStorePixelRatio ||
			ctx.msBackingStorePixelRatio ||
			ctx.oBackingStorePixelRatio ||
			ctx.backingStorePixelRatio || 1;

		return dpr / bsr;
	}

	function msToHMS(ms, isSeconds) {
		// 1- Convert to seconds:
		var seconds = ms / 1000;
		if (isSeconds) {
			seconds = ms;
		}
		// 2- Extract hours:
		var hours = parseInt(seconds / 3600); // 3,600 seconds in 1 hour
		seconds = seconds % 3600; // seconds remaining after extracting hours
		// 3- Extract minutes:
		var minutes = parseInt(seconds / 60); // 60 seconds in 1 minute
		// 4- Keep only seconds not extracted to minutes:
		seconds = (seconds % 60);
		let str = '';
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
		if (!rect || rect2) {
			console.log('Rectanges cannot be empty');
			return false;
		}

		if (isOverlap(rect.x, rect.y, rect2) ||
			isOverlap(rect.x + rect.w, rect.y, rect2) ||
			isOverlap(rect.x + rect.w, rect.y + rect.h, rect2) ||
			isOverlap(rect.x, rect.y + rect.h, rect2)) {
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
		if (!toCheck || toCheck === 0) {
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
		var sign = Math.sign(toCheck);
		if (toCheck > 1) {
			while (toCheck >= 1) {
				toCheck = Math.floor(toCheck / 10.0);
				category++;
			}

			return sign * category - 1;
		}
		else if (toCheck > 0.0) {
			// Get number of zeros before the number.
			var zerosCount = -Math.floor(Math.log(toCheck) / Math.log(10) + 1);
			return sign * (zerosCount - 1);
		}
		else {
			return 1;
		}
	}


	this.initialize = function (options, lanes) {
		var timeLine = {
			ms: 0,
		}

		// Merge options with the default:
		for (var key in defaultOptions) {
			if (defaultOptions.hasOwnProperty(key) && options[key] == undefined) {
				options[key] = defaultOptions[key];
			}
		}

		if (!options.stepPx) {
			options.stepPx = defaultOptions.stepPx;
		}
		if (!options.snapPointsPerPixel) {
			if (options.snapPointsPerPixel < 0) {
				options.snapPointsPerPixel = 0;
			} else if (options.snapPointsPerPixel > 60) {
				options.snapPointsPerPixel = 60;
			}
		}

		var startPos = null;
		var currentPos = null;
		var selectionRect = null;
		var drag = null;
		var clickDurarion = null;
		var focusedByMouse = false;
		var scrollContainer = document.getElementById(options.scrollId);
		var canvas = document.getElementById(options.id);
		var size = document.getElementById(options.sizeId);

		if (!canvas || !canvas.getContext) {
			console.log('Cannot find canvas by id:' + options.id);
			return null;
		}

		var ctx = canvas.getContext("2d");
		ctx.drawLine = function (x1, y1, x2, y2) {
			this.moveTo(x1, y1);
			this.lineTo(x2, y2);
		}

		var pixelRatio = getPixelRatio(ctx);
		function getMousePos(canvas, evt) {
			var rect = canvas.getBoundingClientRect(), // abs. size of element
				scaleX = canvas.width / pixelRatio / rect.width, // relationship bitmap vs. element for X
				scaleY = canvas.height / pixelRatio / rect.height; // relationship bitmap vs. element for Y

			let x = (evt.clientX - rect.left) * scaleX;
			let y = (evt.clientY - rect.top) * scaleY;
			// scale mouse coordinates after they have been adjusted to be relative to element
			return {
				x: x,
				y: y
			}
		}

		function rescale() {
			var width = scrollContainer.clientWidth * pixelRatio;
			var height = scrollContainer.clientHeight * pixelRatio;
			if (width != ctx.canvas.width)
				ctx.canvas.width = width;
			if (height != ctx.canvas.height)
				ctx.canvas.height = height;

			ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
		}


		// Check whether we can drag something here.
		function getDraggable(pos) {

			// few extra pixels to select items:
			let helperSelector = 2;
			let draggable = null;

			iterateKeyframes(function (keyframe, keyframeIndex, lane, laneIndex, isNextLane) {
				let keyframePos = getKeyframePosition(keyframe, laneIndex);
				if (keyframePos) {
					const dist = getDistance(keyframePos.x, keyframePos.y, pos.x, pos.y);
					if (dist <= keyframePos.size + helperSelector) {
						if (!draggable) {
							draggable = {
								obj: keyframe,
								pos: pos,
								ms: keyframe.ms,
								type: 'keyframe',
								distance: dist
							}
						} else if (dist <= draggable.distance) {
							draggable.obj = keyframe;
							draggable.ms = keyframe.ms;
						}
					}
				}
			})

			if (draggable) {
				return draggable;
			}

			// Return keyframes lanes:
			const lanesSizes = getLanesSizes();
			if (lanesSizes && lanesSizes.find) {
				let foundOverlap = lanesSizes.find(function lanesSizesIterator(laneSize) {
					if (!laneSize || !laneSize.keyframes) {
						return false;
					}

					let laneOverlaped = isOverlap(pos.x, pos.y, laneSize.keyframes);
					return laneOverlaped;
				});

				if (foundOverlap) {
					draggable = {
						obj: foundOverlap,
						pos: pos,
						type: 'lane'
					}

					draggable.ms = mousePosToMs(pos.x, true);

					if (foundOverlap && foundOverlap.keyframes) {
						if (foundOverlap.lane && foundOverlap.lane.keyframes) {
							draggable.selectedItems = foundOverlap.lane.keyframes;
						}

						let firstMs = foundOverlap.keyframes.from;
						let snapped = snapMs(firstMs);
						// get snapped mouse pos based on the first keynode.
						draggable.ms += firstMs - snapped;
					}

					return draggable;
				}
			}

			// Check whether we can drag timeline.
			var timeLinePos = msToPx(timeLine.ms);
			let width = Math.max(((options.timelineThicknessPx || 1) * pixelRatio), options.timelineCapWidthPx * pixelRatio || 1) + helperSelector;
			if (pos.x >= timeLinePos - width / 2 && pos.x <= timeLinePos + width / 2) {
				return { obj: timeLine, type: "timeline" };
			}
		}

		canvas.addEventListener("wheel", function (event) {
			if (event.ctrlKey) {
				const delta = Math.sign(event.deltaY) * 10;
				options.zoom += delta;
				if (options.zoom <= 0) {
					options.zoom = 0;
				}
				event.preventDefault();
				redraw();
			}
		});

		scrollContainer.addEventListener('scroll', function (args) {
			var left = scrollContainer.scrollLeft + 'px';
			if (canvas.style.left != left) {
				canvas.style.left = left;
			}
			var top = scrollContainer.scrollTop + 'px';
			if (top !== canvas.style.top) {
				canvas.style.top = top;
			}

			redraw();
		});

		window.addEventListener('blur', function (args) {
			cleanUpSelection();
		}, false);

		window.addEventListener('resize', function (args) {
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

		canvas.addEventListener('mousedown', function (args) {
			// Prevent drag of the canvas if canvas is selected as text:
			clearBrowserSelection();
			startPos = trackMousePos(canvas, args);
			clickDurarion = new Date();
			currentPos = startPos;
			startPos.scrollLeft = scrollContainer.scrollLeft;
			startPos.scrollTop = scrollContainer.scrollTo;
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
		}, false);


		window.addEventListener('mousemove', function (args) {
			trackMousePos(canvas, args);
			if (selectionRect && checkClickDurationOver()) {
				selectionRect.draw = true;
			}

			if (startPos) {
				if (args.buttons == 1) {
					scrollByMouse(currentPos.x);
					if (drag && drag.obj && !drag.startedWithCtrl) {
						let convertedMs = mousePosToMs(currentPos.x, true);
						//redraw();
						let isChanged = false;
						if (drag.type == 'timeline') {
							isChanged = setTime(convertedMs);
						} else if (drag.type == 'keyframe' || drag.type == 'lane') {

							if (drag.selectedItems) {
								let offset = Math.floor(convertedMs - drag.ms);
								if (Math.abs(offset) > 0) {
									// dont allow to move less than zero.
									drag.selectedItems.forEach(function (p) {
										if (options.snapAllKeyframesOnMove) {
											let toSet = snapMs(p.ms);
											if (p.ms != toSet) {
												p.ms = toSet;
												isChanged = true;
											}
										}
										let newPostion = p.ms + offset;
										if (newPostion < 0) {
											offset = -p.ms;
										}
									});

									if (Math.abs(offset) > 0) {
										// dont allow to move less than zero.
										drag.selectedItems.forEach(function (p) {
											let ms = p.ms + offset;

											let toSet = p.ms + offset;
											if (p.ms != toSet) {
												p.ms = toSet;
												isChanged = true;
											}
										});

									}

									if (isChanged) {
										drag.ms += offset;
									}
								}

							}
						}

						if (isChanged) {
							// move all selected keyframes
							redraw();
						} else {

						}
						return;
					}
				}
				else {
					// Cancel mouse move when focus was lost.
					cleanUpSelection();
				}
				redraw();
			} else {
				let draggable = getDraggable(currentPos);
				if (draggable) {
					if (draggable.type == 'lane') {
						canvas.style.cursor = "ew-resize";
					}
					else if (draggable.type == 'keyframe') {
						canvas.style.cursor = "pointer";
					}
					else {
						canvas.style.cursor = "ew-resize";
					}
				}
				else {
					canvas.style.cursor = 'default';
				}
			}
		}, false);

		window.addEventListener('mouseup', function (args) {
			if (startPos) {
				//window.releaseCapture();
				let pos = trackMousePos(canvas, args);

				// Click detection.
				if (selectionRect && selectionRect.h <= 2 && selectionRect.w <= 2 ||
					!checkClickDurationOver() ||
					(drag && drag.startedWithCtrl) ||
					(drag && drag.startedWithShiftKey)) {
					performClick(pos, args, drag);
				} else if (!drag && selectionRect) {
					performSelection(true, selectionRect, 'rectangle', args.shiftKey);
				}

				cleanUpSelection();
				redraw();
			}
		}, false);


		function performClick(pos, args, drag) {
			if (drag && drag.type == 'keyframe') {
				let isSelected = true;
				if ((drag.startedWithCtrl && args.ctrlKey) || (drag.startedWithShiftKey && args.shiftKey)) {
					if (args.ctrlKey) {
						isSelected = !drag.obj.selected
					}
				}
				// Reverse selected keyframe selection by a click:
				performSelection(isSelected, drag.obj, 'keyframe', args.ctrlKey || args.shiftKey);

				if (args.shiftKey) {
					// change timeline pos:
					let convertedMs = mousePosToMs(pos.x, true);
					// Set current timeline position if it's not a drag or selection rect small or fast click.
					setTime(convertedMs);
				}
			}
			else {
				// deselect keyframes if any:
				performSelection(false);

				// change timeline pos:
				let convertedMs = mousePosToMs(pos.x, true);
				// Set current timeline position if it's not a drag or selection rect small or fast click.
				setTime(convertedMs);
			}
		}

		selectedKeyframes = [];

		function getSelectedKeyframes() {
			selectedKeyframes.length = 0;
			iterateKeyframes(function selectionIterator(keyframe) {
				if (keyframe && keyframe.selected) {
					selectedKeyframes.push(keyframe);
				}
			});

			return selectedKeyframes;
		}

		selectedKeyframes = [];

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

			let deselectionMode = false;
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
			let isChanged = true;

			iterateKeyframes(function selectionIterator(keyframe, keyframeIndex, lane, laneIndex) {
				let keyframePos = getKeyframePosition(keyframe, laneIndex);
				if (keyframePos) {
					if ((mode == 'keyframe' && selector == keyframe) ||
						(mode == 'rectangle' && selector && isOverlap(keyframePos.x, keyframePos.y, selector))) {
						atleastOneSelected = true;
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

			let nextLane = false;
			lanes.forEach(function lanesIterator(lane, index) {
				if (!lane || !lane.keyframes || !lane.keyframes.forEach || lane.keyframes.length <= 0) {
					return;
				}

				nextLane = true;
				lane.keyframes.forEach(function keyframesIterator(keyframe, keyframeIndex) {
					if (callback && keyframe) {
						callback(keyframe, keyframeIndex, lane, index, nextLane);
					}

					nextLane = false;
				});
			});
		}

		function trackMousePos(canvas, mouseArgs) {
			currentPos = getMousePos(canvas, mouseArgs);
			if (currentPos && currentPos.x >= 0 && currentPos.y >= 0) {
				focusedByMouse = true;
			} else {
				focusedByMouse = false;
			}
			if (startPos) {
				if (!selectionRect) {
					selectionRect = {};
				}

				selectionRect.x = Math.min(startPos.x, currentPos.x);
				selectionRect.y = Math.min(startPos.y, currentPos.y);
				selectionRect.w = Math.max(startPos.x, currentPos.x) - selectionRect.x;
				selectionRect.h = Math.max(startPos.y, currentPos.y) - selectionRect.y;
			}
			return currentPos;
		}

		function cleanUpSelection() {
			startPos = null;
			drag = null;
			selectionRect = null;
			clickDurarion = null;
			clearMoveInterval();
		}

		function checkClickDurationOver() {
			// Duration before the selection can be tracked.
			if ((clickDurarion && new Date() - clickDurarion > clickDetectionMs)) {
				return true;
			}

			return false;
		}

		width = canvas.clientWidth;
		//stepsCanFit

		rescale();

		let lastX = null;
		let intervalReference = null;
		let lastCallDate = null;
		function startMoveInterval(x) {
			if (!intervalReference) {
				// Repeat move calls to
				intervalReference = setInterval(function () {
					if (lastX !== null) {
						scrollByMouse(lastX);
					}
				}, 300);
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
			if (lastCallDate && new Date() - lastCallDate <= 500) {
				return true;
			}

			lastCallDate = new Date();
			return false;
		}

		function scrollByMouse(x) {
			lastX = x;
			if (x <= 0) {
				// Auto move init
				startMoveInterval(x);

				if (checkUpdateSpeedIsFast()) {
					return;
				}

				let speed = Math.floor(Math.max(options.stepPx, getDistance(x, 0)));
				scrollContainer.scrollLeft -= speed;
			} else if (x >= canvas.clientWidth) {

				// Auto move init
				startMoveInterval(x);

				if (checkUpdateSpeedIsFast()) {
					return;
				}


				// One second distance: 
				let speed = Math.floor(Math.max(options.stepPx, getDistance(x, canvas.clientWidth)));
				let step = canvas.clientWidth / scrollContainer.scrollWidth;

				speed = 10;//options.stepPx * step;
				if (x) {
					width = width + speed;
				}
				size.style.minWidth = width + "px";
				// Scroll left
				scrollContainer.scrollLeft += speed;
			}
			else {
				clearMoveInterval();
			}
			rescale();
			redraw();
		}

		scrollByMouse();

		// Find ms from the the px coordinates
		function pxToMS(coords) {
			coords -= options.leftMarginPx;
			var ms = coords / options.stepPx * options.zoom;
			return ms;
		}

		function snapMs(ms) {
			// Apply snap to steps if enabled.
			if (options.snapPointsPerPixel && options.snapEnabled) {
				var stopsPerPixel = (1000 / options.snapPointsPerPixel);
				let step = ms / stopsPerPixel;
				stepsFit = Math.round(step);
				ms = Math.round(stepsFit * stopsPerPixel);
			}

			if (ms < 0) {
				ms = 0;
			}

			return ms;
		}
		function mousePosToMs(x, snapEnabled) {
			let convertedMs = pxToMS(scrollContainer.scrollLeft + Math.min(x, canvas.clientWidth));
			convertedMs = Math.round(convertedMs);
			if (snapEnabled) {
				convertedMs = snapMs(convertedMs);
			}

			return convertedMs;
		}

		// convert 
		function msToPx(ms) {
			// Respect current scroll container offset. (virtualization)
			var x = scrollContainer.scrollLeft;//- options.leftMarginPx;
			ms -= pxToMS(x);
			return (ms * options.stepPx / options.zoom);
		}

		function findGoodStep(originaStep, divisionCheck) {
			originaStep = Math.round(originaStep);
			var step = originaStep;
			var lastDistance = null;
			var pow = getPowArgument(originaStep);
			for (var i = 0; i < denominators.length; i++) {
				denominator = denominators[i];
				var calculatedStep = denominator * Math.pow(10, pow);
				if (divisionCheck && (divisionCheck % calculatedStep) != 0) {
					continue;
				}
				var distance = getDistance(originaStep, calculatedStep);

				if (distance <= 0.1) {
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
			var from = pxToMS(0);
			var to = pxToMS(areaWidth);
			var dist = getDistance(from, to);
			// normalize step.			
			var stepsCanFit = areaWidth / options.stepPx;

			// Find the nearest 'beautiful' step for a gauge. This step should be devided by 1/2/5!
			var step = findGoodStep(Math.round(dist / stepsCanFit));
			var goodStepDistancePx = areaWidth / (dist / step);
			var smallStepsCanFit = goodStepDistancePx / options.stepSmallPx;
			var realSmallStep = step / smallStepsCanFit;
			var smallStep = findGoodStep(realSmallStep, step);
			if (step % smallStep != 0) {
				smallStep = realSmallStep;
			}
			// filter to draw only visible
			var visibleFrom = pxToMS(scrollContainer.scrollLeft + options.leftMarginPx);
			var visibleTo = pxToMS(scrollContainer.scrollLeft + scrollContainer.clientWidth);
			// Find beautiful start point:
			from = Math.floor(visibleFrom / step) * step;

			// Find a beautiful end point:
			to = Math.ceil(visibleTo / step) * step + step;

			for (var i = from; i <= to; i += step) {
				var pos = msToPx(i);
				var sharpPos = getSharp(Math.round(pos));
				ctx.save();
				ctx.beginPath();
				ctx.setLineDash([4]);
				ctx.lineWidth = pixelRatio;
				ctx.strokeStyle = options.tickColor;
				ctx.drawLine(sharpPos, (options.headerHeight || 0) / 2, sharpPos, canvas.clientHeight);
				ctx.stroke();

				ctx.fillStyle = options.labelsColor;
				if (options.ticksFont) {
					ctx.font = options.ticksFont;
				}

				var text = msToHMS(i)
				var textSize = ctx.measureText(text);

				sharpPos -= textSize.width / 2;
				ctx.fillText(text, sharpPos, 10);
				ctx.restore();
				// Draw small steps
				for (let x = i + smallStep; x < i + step; x += smallStep) {
					var nextPos = msToPx(x);
					var nextSharpPos = getSharp(Math.floor(nextPos));
					ctx.beginPath();
					ctx.lineWidth = pixelRatio;
					ctx.strokeStyle = options.tickColor;
					ctx.drawLine(nextSharpPos, (options.headerHeight || 0) / 1.3, nextSharpPos, options.headerHeight);
					ctx.stroke();
				}
			}

			ctx.restore();
		}

		function getLanesSizes() {
			let lanes = []
			if (!options.laneHeightPx) {
				console.log('laneHeightPx should be set.');
				return lanes;
			}

			let prevLane = null;
			let laneSize = null;
			iterateKeyframes(function (keyframe, index, lane, laneIndex, isNextLane) {
				if (isNextLane) {

					let laneY = getLanePosition(laneIndex);
					prevLane = laneSize;
					laneSize = {
						x: 0,
						y: laneY,
						w: canvas.clientWidth,
						h: options.laneHeightPx,
						lane: lane,
						index: laneIndex,
						keyframes: {
							from: null,
							to: null,
							count: lane.keyframes ? lane.keyframes.length : 0,
						}
					};

					lanes.push(laneSize);

					// Draw keyframes lane:
					if (prevLane && !isNaN(prevLane.keyframes.from) && !isNaN(prevLane.keyframes.to)) {
						// draw keyframes lane.
						var fromPos = getSharp(msToPx(prevLane.keyframes.from))
						var toPos = getSharp(msToPx(prevLane.keyframes.to));
						const laneHeight = getKeyframeLaneHeight(lane, prevLane.y);

						if (fromPos <= 0) {
							fromPos = 0;
						}

						prevLane.keyframes.x = fromPos;
						prevLane.keyframes.y = laneHeight.y;
						prevLane.keyframes.w = getDistance(fromPos, toPos);
						prevLane.keyframes.h = laneHeight.h;
					}
				}

				if (laneSize.keyframes && keyframe && !isNaN(keyframe.ms)) {
					let size = laneSize.keyframes;
					if (size.from == null) {
						size.from = keyframe.ms;
					} else {
						size.from = Math.min(keyframe.ms, size.from);
					}

					if (size.to == null) {
						size.to = keyframe.ms
					} else {
						size.to = Math.max(keyframe.ms, size.to);
					}
				}
			});

			return lanes;
		}

		function drawLanes() {
			if (!lanes || !lanes.forEach || lanes.length <= 0) {
				return false;
			}

			let lanesSizes = getLanesSizes();
			if (lanesSizes && lanesSizes.forEach) {
				ctx.save();
				lanesSizes.forEach(function lanesSizesIterator(laneSize) {

					if (!laneSize) {
						return;
					}
					// Draw lane 
					if (laneSize.lane.selected && options.selectedLaneColor) {
						ctx.fillStyle = options.selectedLaneColor;
					} else if (laneSize.index % 2 != 0 && options.useAlternateLaneColor) {
						ctx.fillStyle = options.alternateLaneColor || options.laneColor;
					} else {
						ctx.fillStyle = options.laneColor;
					}

					if (ctx.fillStyle) {
						ctx.fillRect(laneSize.x, laneSize.y, laneSize.w, laneSize.h);
					}

					let keyframesSize = laneSize.keyframes;
					if (!keyframesSize || keyframesSize.count <= 1 || !options.keyframesLaneColor) {
						return;
					}

					ctx.fillStyle = options.keyframesLaneColor;
					// dont draw more than required:
					let limitedWidth = Math.min(keyframesSize.w, canvas.clientWidth);
					ctx.fillRect(keyframesSize.x, keyframesSize.y, limitedWidth, keyframesSize.h);
				});

				ctx.restore();
			}

			return true;
		}

		function getLanePosition(laneIndex) {
			let laneY = options.headerHeight +
				laneIndex * options.laneHeightPx * pixelRatio +
				laneIndex * options.laneMarginPX;
			return laneY;
		}

		function getKeyframeLaneHeight(lane, laneY) {
			let keyframeLaneHeight = lane.keyframesLaneSizePx || options.keyframesLaneSizePx;
			if (isNaN(keyframeLaneHeight)) {
				keyframeLaneHeight = 'auto';
			}

			if (keyframeLaneHeight == 'auto') {
				keyframeLaneHeight = options.laneHeightPx - 2;
			}

			if (keyframeLaneHeight > options.laneHeightPx) {
				keyframeLaneHeight = options.laneHeightPx;
			}

			let margin = options.laneHeightPx - keyframeLaneHeight;
			y = laneY + Math.floor(margin / 2);
			return { y: y, h: keyframeLaneHeight };
		}

		function getKeyframeSize(keyframe) {
			if (!keyframe) {
				return 0;
			}

			// keyframe size:
			let size = options.keyframeSizePx || keyframe.size;
			if (size == 'auto') {
				size = options.laneHeightPx / 3;
			}

			return size;
		}
		function getKeyframePosition(keyframe, laneIndex) {
			if (!keyframe) {
				console.log('keyframe should be defined.');
				return null;
			}

			let ms = keyframe.ms;
			if (isNaN(ms)) {
				console.log('Cannot find x of the keyframe. ms is not a number!');
				return null;
			}

			// get center of the lane:
			let laneY = getLanePosition(laneIndex);
			var y = laneY + options.laneHeightPx / 2;

			let size = getKeyframeSize(keyframe);

			if (size > 0) {
				if (!isNaN(ms)) {
					return { x: Math.floor(msToPx(ms)), y: Math.floor(y), size: size, laneY: laneY };
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
					let x = getSharp(pos.x);
					let y = pos.y;
					let size = pos.size;
					ctx.save();
					ctx.beginPath();
					ctx.translate(x, y);
					ctx.rotate(45 * Math.PI / 180);
					let border = options.keyframeBorderThicknessPx;
					if (border > 0 && options.keyframeBorderColor) {
						ctx.fillStyle = options.keyframeBorderColor;
						ctx.rect(-size / 2, -size / 2, size, size);
						ctx.fill();
						ctx.beginPath();
					}

					ctx.fillStyle = keyframe.color || options.keyframeColor;
					if (keyframe.selected) {
						ctx.fillStyle = keyframe.selectedColor || options.selectedKeyframeColor;
					}
					// draw main keyframe data with offset.
					ctx.translate(border, border);
					ctx.rect(-size / 2, -size / 2, size - border * 2, size - border * 2);
					ctx.fill();
					ctx.restore();
				}
			});
		}

		function drawSelection() {
			if (drag) {
				return;
			}

			ctx.save();
			var thickness = 1;
			if (selectionRect && selectionRect.draw) {
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
				return true;
			}
			return false;
		}

		function drawTimeLine() {
			ctx.save();
			var thickness = options.timelineThicknessPx;
			ctx.lineWidth = thickness * pixelRatio;
			var timeLinePos = getSharp(Math.round(msToPx(timeLine.ms)), thickness);
			ctx.strokeStyle = options.timeIndicatorColor;
			ctx.fillStyle = ctx.strokeStyle;
			var y = options.timelineMarginTopPx;
			ctx.beginPath();
			ctx.drawLine(timeLinePos, y, timeLinePos, canvas.clientHeight);
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
			if (options.headerBackground) {
				ctx.save();
				// draw ticks background
				ctx.lineWidth = pixelRatio;

				// draw header background
				ctx.fillStyle = options.headerBackground;
				ctx.fillRect(0, 0, canvas.clientWidth, options.headerHeight);
				ctx.restore();
				return true;
			}

			return false;
		}

		function redraw() {

			var isOk = drawBackground();
			if (!isOk) {
				// Clear if bg not set.
				ctx.clearRect(0, 0, canvas.width, canvas.height);
			}

			drawHeaderBackground();
			drawLanes();
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

		rescale();
		redraw();

		/**
		 * Get current time in ms.
		 * @public
		 */
		this.getTime = function () {
			return timeLine.ms;
		}

		this.setTime = function (ms) {
			ms = Math.round(ms);
			if (ms < 0) {
				ms = 0;
			}

			if (timeLine.ms != ms) {
				timeLine.ms = ms;
				this.emit('timeChanged', ms);
			}
		}

		function onKeyframesSelected(keyframe) {
			this.emit('selected', keyframe);
		}

		let subscriptions = [];
		// on event.
		this.on = function (topic, callback) {
			if (!callback) {
				return;
			}

			subscriptions.push({ topic: topic, callback: callback });
		}

		// emit event.
		this.emit = function (topic, args) {
			for (var i = subscriptions.length - 1; i >= 0; i--) {
				var sub = subscriptions[i];
				if (sub.topic == topic && sub.callback) {
					sub.callback(args);
				}
			}
		}

		// remove event.
		this.remove = function (topic, callback) {
			for (var i = subscriptions.length - 1; i >= 0; i--) {
				var sub = subscriptions[i];
				if (sub.topic == topic && sub.callback == callback) {
					subscriptions = subscriptions.filter(function (ele) {
						return ele != value;
					});
				}
			}
		}

		return this;
	}

	return this;
}(window, document);
