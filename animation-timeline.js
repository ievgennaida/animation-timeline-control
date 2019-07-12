var animationTimeline = function (window, document) {

	let width = 0;
	if (!Math.sign) {
		Math.sign = function (p) {
			return p >= 0 ? 1 : -1;
		}
	}

	let defaultOptions = {
		keysPerSecond: 60,
		snapToTimeframe: true,
		extraRightMargin: 50,
		// approximate step in px for 1 second 
		stepPx: 100,
		smallSteps: 50,
		// additional left margin to start the gauge from
		leftMarginPx: 0,
		snapPointsPerPixel: 2, // from 1 to 60
		minTimelineToDispayMs: 5000,
		headerBackground: 'black',
		selectedLaneColor: '#333333',
		laneColor: 'white',
		alternateLaneColor: 'black',//333333
		backgroundColor: 'black',//1E1E1E
		timeIndicatorColor: 'red',
		labelsColor: '#D5D5D5',
		tickColor: '#D5D5D5',
		selectionColor: 'White',
		useAlternateLaneColor: false,
		laneHeightPx: 25,
		laneMarginPX: 1,
		keyframeLaneMargin: 2,
		headerHeight: 30,
		lineHeight: 1,
		autoWidth: true,
		ticksFont: "11px sans-serif",
		zoom: 1000,
		id: '',
		scrollId: ''
	}

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
		seconds = (seconds % 60).toFixed(0);
		let str = '';
		if (hours) {
			str += hours + ":";
		}

		if (minutes) {
			str += minutes + ":";
		}

		if (seconds) {
			str += seconds;
		}

		return str;
	}

	let denominators = [1, 2, 5];
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

		toCheck = Math.abs(toCheck);
		var category = 0;
		var sign = Math.sign(toCheck);
		if (toCheck > 1) {
			while (Math.abs(toCheck) > 1) {
				toCheck = Math.abs(toCheck) / 10.0;
				category++;
			}

			return sign * category;
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
		let timeLine = {
			ms: 3503,
			width: 5,
			isDrag: false,
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

		var startPos;
		var currentPos;
		var scrollContainer = document.getElementById(options.scrollId);
		var canvas = document.getElementById(options.id);
		var size = document.getElementById(options.sizeId);

		if (!canvas || !canvas.getContext) {
			console.log('Cannot find canvas by id:' + options.id);
			return null;
		}

		var ctx = canvas.getContext("2d");
		var pixelRatio = getPixelRatio(ctx);
		function getMousePos(canvas, evt) {
			var rect = canvas.getBoundingClientRect(), // abs. size of element
				scaleX = canvas.width / pixelRatio / rect.width, // relationship bitmap vs. element for X
				scaleY = canvas.height / pixelRatio / rect.height; // relationship bitmap vs. element for Y

			// scale mouse coordinates after they have been adjusted to be relative to element
			return {
				x: (evt.clientX - rect.left) * scaleX,
				y: (evt.clientY - rect.top) * scaleY
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
		function getDragableObject(pos) {
			var objPos = msToPx(timeLine.ms);
			var fromX = objPos - timeLine.width / 2;
			var toX = objPos + timeLine.width / 2;
			if (pos.x >= fromX && pos.x <= toX) {
				canvas.style.cursor = "move";
				timeLine.selected = true;
				return { obj: timeLine, type: "timeline" };

			}

			// Find suitable keyframe to drag:
			for (var i = 0; i < lanes.length; i++) {
				var lane = lanes[i];

				obj = null;
				if (lane.keyframes) {
					let laneY = getLanePosition(i);
					var obj = null;
					let laneYCenter = laneY + options.laneHeightPx / 2;
					for (var x = 0; x < lane.keyframes.length; x++) {
						keyframe = lane.keyframes[x];
						if (keyframe && !isNaN(keyframe.ms)) {
							objPos = msToPx(keyframe.ms);
							var dist = getDistance(objPos, laneYCenter, pos.x, pos.y);
							if (dist <= options.laneHeightPx / 4) {
								canvas.style.cursor = "move";
								if (!obj) {
									obj = {
										obj: keyframe,
										type: 'keyframe',
										distance: dist
									}
								} else if (dist <= obj.distance) {
									obj.obj = keyframe;
								}
							}
						}
					}

					if (obj) {
						return obj;
					}
				}

			}

			canvas.style.cursor = null;
		}

		canvas.addEventListener("wheel", function (event) {
			if (event.ctrlKey) {
				const delta = Math.sign(event.deltaY) * 10;
				options.zoom += delta;
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

		drag = null;
		canvas.addEventListener('mousedown', function (args) {
			startPos = getMousePos(canvas, args);
			startPos.scrollLeft = scrollContainer.scrollLeft;
			startPos.scrollTop = scrollContainer.scrollTo;
			currentPos = startPos;
			drag = getDragableObject(currentPos);
			redraw();
		}, false);

		window.addEventListener('mousemove', function (args) {
			currentPos = getMousePos(canvas, args);

			if (startPos) {
				if (args.buttons == 1) {
					scrollByMouse(currentPos.x);
					if (drag && drag.obj) {
						let convertedMs = pxToMS(scrollContainer.scrollLeft + Math.min(currentPos.x, canvas.clientWidth));
						convertedMs = Math.floor(convertedMs);

						// Apply snap to steps if enabled.
						if (options.snapPointsPerPixel) {
							var stopsPerPixel = (1000 / options.snapPointsPerPixel);
							let step = convertedMs / stopsPerPixel;
							stepsFit = Math.round(step);
							convertedMs = stepsFit * stopsPerPixel;

						}

						//if (convertedMs < 0) {
						//	convertedMs = 0;
						//}

						drag.obj.ms = convertedMs;
						redraw();
						if (drag.type == 'timeline') {
							this.emit('timeChanged', convertedMs);
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
				getDragableObject(currentPos);
			}
		}, false);

		function cleanUpSelection() {
			startPos = null;
			drag = null;
			clearMoveInterval();
		}

		window.addEventListener('mouseup', function (args) {
			//window.releaseCapture();
			currentPos = getMousePos(canvas, args);
			cleanUpSelection();
			redraw();
		}, false);


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
			return coords / options.stepPx * options.zoom;
		}

		// convert 
		function msToPx(ms) {
			// Respect current scroll container offset.
			ms -= pxToMS(scrollContainer.scrollLeft);
			return (ms * options.stepPx / options.zoom);
		}


		function drawSteps() {
			ctx.save();

			let areaWidth = scrollContainer.scrollWidth;
			let from = pxToMS(0);
			let to = pxToMS(areaWidth);
			let dist = getDistance(from, to);
			// normalize step.			
			let stepsCanFit = areaWidth / options.stepPx;

			realStep = dist / stepsCanFit;
			// Find the nearest 'beautiful' step for a gauge. This step should be devided by 1/2/5!
			var step = realStep;
			let lastDistance = null;
			for (let i = 0; i < denominators.length; i++) {
				denominator = denominators[i];
				let calculatedStep = denominator * Math.pow(10, getPowArgument(realStep));
				let distance = getDistance(realStep, calculatedStep);
				if (distance == 0) {
					lastDistance = distance;
					step = calculatedStep;
					break;
				} else if (!lastDistance || lastDistance > distance) {
					lastDistance = distance;
					step = calculatedStep;
				}
			}

			// iterate only visible
			var visibleFrom = pxToMS(scrollContainer.scrollLeft);
			var visibleTo = pxToMS(scrollContainer.scrollLeft + scrollContainer.clientWidth);
			// Find beautiful start:
			from = Math.floor(visibleFrom / realStep) * realStep

			// Find beautiful start:
			to = Math.ceil(visibleTo / realStep) * realStep;

			for (var i = from; i <= to; i += step) {
				var pos = msToPx(i);
				let sharpPos = getSharp(Math.floor(pos));

				var textSize = ctx.measureText(text);
				// Reset the current path
				ctx.beginPath();
				ctx.setLineDash([4]);
				ctx.lineWidth = pixelRatio;
				ctx.strokeStyle = options.tickColor;
				//ctx.lineWidth = 1;
				// Staring point (10,45)
				ctx.moveTo(sharpPos, (options.headerHeight || 0) / 2);
				// End point (180,47)
				ctx.lineTo(sharpPos, canvas.clientHeight);

				// Make the line visible
				ctx.stroke();

				if (options.ticksFont) {

					ctx.font = options.ticksFont;
				}

				ctx.fillStyle = options.labelsColor;
				//ctx.textAlign = "center";
				var text = msToHMS(i)
				sharpPos -= textSize.width / 2;
				ctx.fillText(text, sharpPos, 10);

				// Draw small steps
				//for (let i = from; i <= to; i += step) {

				//}
			}

			ctx.restore();
		}

		function drawLanes() {
			ctx.save();
			// Draw lane for each control
			lanes.forEach(function (lane, index) {
				if (lane.selected && options.selectedLaneColor) {
					ctx.fillStyle = options.selectedLaneColor;
				} else if (index % 2 != 0 && options.useAlternateLaneColor) {
					ctx.fillStyle = options.alternateLaneColor || options.laneColor;
				} else {
					ctx.fillStyle = options.laneColor;
				}


				let laneY = getLanePosition(index);
				//x = getSharp(laneY);

				if (ctx.fillStyle) {
					ctx.fillRect(0, laneY, canvas.clientWidth, options.laneHeightPx);
				}

				if (lane.keyframes) {
					// TODO: get full scale size.
					let from = 0;
					let to = null;
					lane.keyframes.forEach(function (keyframe) {
						if (keyframe && !isNaN(keyframe.ms)) {
							if (from == null) {
								from = keyframe.ms;
							} else {
								from = Math.min(keyframe.ms, from);
							}

							if (to == null) {
								to = keyframe.ms
							} else {
								to = Math.max(keyframe.ms, to);
							}
						}
					});

					let fromPos = getSharp(msToPx(from))
					let toPos = getSharp(msToPx(to));
					ctx.fillStyle = "red";
					ctx.strokeStyle = "#0001FF";
					// TODO: out of the bounds.
					ctx.fillRect(fromPos, laneY + 1, getDistance(fromPos, toPos), options.laneHeightPx - 2);
				}

			});
			ctx.restore();
		}

		function getLanePosition(laneIndex) {
			let laneY = options.headerHeight +
				laneIndex * options.laneHeightPx * pixelRatio +
				laneIndex * options.laneMarginPX;
			return laneY;
		}

		function drawKeyframes() {
			ctx.save();
			// Draw lane for each control
			lanes.forEach(function (lane, index) {
				let laneY = getLanePosition(index);
				if (lane.keyframes) {
					// Draw keyframes:
					lane.keyframes.forEach(function (keyframe) {
						if (keyframe && !isNaN(keyframe.ms)) {
							let pos = getSharp(msToPx(keyframe.ms));

							var size = options.laneHeightPx / 3;

							var pointY = laneY + options.laneHeightPx / 2 - size / 2;
							pos = pos - size / 2;
							ctx.save();
							ctx.beginPath();
							ctx.translate(pos + size / 2, pointY + size / 2);
							ctx.rotate(45 * Math.PI / 180);
							ctx.rect(-size / 2, -size / 2, size, size);
							ctx.fillStyle = "black";
							ctx.fill();
							ctx.restore();
						}
					});
				}

			});
			ctx.restore();
		}

		function drawSelection() {
			if (drag) {
				return;
			}
			ctx.save();
			var thickness = 1;
			if (startPos && currentPos) {
				ctx.setLineDash([4]);
				ctx.lineWidth = pixelRatio;
				ctx.strokeStyle = options.selectionColor;
				// for a mouse pos Math.floor is not needed.
				let x = Math.min(startPos.x, currentPos.x);
				let y = Math.min(startPos.y, currentPos.y);
				let w = Math.floor(Math.max(startPos.x, currentPos.x) - x);
				let h = Math.floor(Math.max(startPos.y, currentPos.y) - y);
				x = getSharp(x, thickness);
				y = getSharp(y, thickness);
				ctx.strokeRect(x, y, w, h);
			}
			ctx.restore();
		}

		function drawBackground() {
			if (options.backgroundColor) {
				ctx.save();
				ctx.beginPath();
				ctx.rect(0, 0, canvas.width, canvas.height);
				ctx.fillStyle = options.backgroundColor;
				ctx.fill();
				ctx.restore();
				return true;
			}
			return false;
		}

		function drawTimeLine() {
			ctx.save();
			var thickness = 2;
			ctx.lineWidth = thickness * pixelRatio;
			var timeLinePos = getSharp(msToPx(timeLine.ms), thickness);
			ctx.strokeStyle = options.timeIndicatorColor;
			ctx.beginPath();
			ctx.moveTo(timeLinePos, 0);
			ctx.lineTo(timeLinePos, canvas.height);
			ctx.stroke();
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
			drawSteps();
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

		this.setTime = function () {
			if (dra)
				return timeLine.ms;
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
