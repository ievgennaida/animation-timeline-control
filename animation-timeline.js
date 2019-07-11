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
		leftMarginPx: 10,
		minTimelineToDispayMs: 5000,
		headerBackground: 'black',
		selectedLaneColor: '#333333',
		laneColor: 'white',
		alternateLaneColor: 'black',//333333
		backgroundColor: 'black',//1E1E1E
		timeIndicatorColor: 'red',
		labelsColor: '#D5D5D5',
		tickColor: '#D5D5D5',
		useAlternateLaneColor: false,
		laneHeightPx: 25,
		laneMarginPX: 1,
		headerHeight: 30,
		lineHeight: 1,
		autoWidth: true,
		ticksFont: "11px sans-serif",
		zoom: 1000,
		id: '',
		scrollId: ''
	}

	function getPixelRatio(context) {
		dpr = window.devicePixelRatio || 1,
			bsr = context.webkitBackingStorePixelRatio ||
			context.mozBackingStorePixelRatio ||
			context.msBackingStorePixelRatio ||
			context.oBackingStorePixelRatio ||
			context.backingStorePixelRatio || 1;

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
	function getDistance(a, b) {
		return Math.max(a, b) - Math.min(a, b);
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
			x: 3503,
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

		var startPos;
		var currentPos;
		var scrollContainer = document.getElementById(options.scrollId);
		var canvas = document.getElementById(options.id);
		var size = document.getElementById(options.sizeId);

		if (!canvas || !canvas.getContext) {
			console.log('Cannot find canvas by id:' + options.id);
			return null;
		}


		var context = canvas.getContext("2d");
		var pixelRatio = getPixelRatio(context);
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
			var width = scrollContainer.clientWidth * pixelRatio;//document.body.clientWidth / initialWidth * initalCanvasWidth; // your code here
			var height = scrollContainer.clientHeight * pixelRatio;//document.body.clientHeight / initialHeight * initalCanvasHeight; // your code here
			if (width != context.canvas.width)
				context.canvas.width = width;
			if (height != context.canvas.height)
				context.canvas.height = height;

			context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
		}
		// Check whether we can drag something here.
		function getDragableObject(pos) {
			let fromValue = msToPx(timeLine.x) - timeLine.width / 2;
			let toValue = msToPx(timeLine.x) + timeLine.width / 2;
			if (pos.x >= fromValue && pos.x <= toValue) {
				canvas.style.cursor = "move";
				timeLine.selected = true;
				return timeLine;

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
			canvas.style.left = scrollContainer.scrollLeft + 'px';
			let top = scrollContainer.scrollTop + 'px';
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
					if (drag) {
						drag.x = pxToMS(scrollContainer.scrollLeft + Math.min(currentPos.x, canvas.clientWidth));
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


			//getDistance(options.from, options.to)*
			// draw ticks

			let from = pxToMS(0);
			let to = pxToMS(scrollContainer.scrollWidth);
			let dist = getDistance(from, to);
			// normalize step.			
			let stepsCanFit = scrollContainer.scrollWidth / options.stepPx;

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

				var textSize = context.measureText(text);
				// Reset the current path
				context.beginPath();
				context.setLineDash([4]);
				context.lineWidth = pixelRatio;
				context.strokeStyle = options.tickColor;
				//context.lineWidth = 1;
				// Staring point (10,45)
				context.moveTo(sharpPos, (options.headerHeight || 0) / 2);
				// End point (180,47)
				context.lineTo(sharpPos, canvas.clientHeight);

				// Make the line visible
				context.stroke();

				if (options.ticksFont) {

					context.font = options.ticksFont;
				}

				context.fillStyle = options.labelsColor;
				//context.textAlign = "center";
				var text = msToHMS(i)
				sharpPos -= textSize.width / 2;
				context.fillText(text, sharpPos, 10);

				// Draw small steps
				//for (let i = from; i <= to; i += step) {

				//}
			}




			//let toMs
			/*for (let i = fromMs, index = 0; i <= canvas.clientWidth; i += options.stepPx) {
				context.fillStyle = "blue";
				let second = Math.floor(scrollContainer.scrollLeft + i / options.stepPx);
				let text = msToHMS(second, true);
				context.fillText(text, i, 10);
				index++
			}*/

		}

		function drawLanes() {
			// Draw lane for each control
			lanes.forEach(function (lane, index) {
				if (lane.selected && options.selectedLaneColor) {
					context.fillStyle = options.selectedLaneColor;
				} else if (index % 2 != 0 && options.useAlternateLaneColor) {
					context.fillStyle = options.alternateLaneColor || options.laneColor;
				} else {
					context.fillStyle = options.laneColor;
				}


				let laneY = options.headerHeight + index * options.laneHeightPx * pixelRatio + index * options.laneMarginPX;
				x = getSharp(laneY);
				//y = getSharp(y);
				//h = getSharp(h);
				//h = getSharp(h);
				if (context.fillStyle) {
					context.fillRect(0, laneY, canvas.clientWidth, options.laneHeightPx);
				}
				if (lane.keyframes) {
					lane.keyframes.forEach(function (keyframe, index) {
						if (keyframe && keyframe.x) {
							context.fillStyle = "#0001FF";
							let keyW = options.laneHeightPx - options.laneMarginPX;
							let keyH = options.laneHeightPx - options.laneMarginPX;
							let keyY = laneY + options.laneMarginPX;
							context.fillRect(keyframe.x, keyY, keyW, keyH);

							context.beginPath();
							context.fillStyle = "#FF1D00";
							context.arc(keyframe.x + keyW / 2, keyY + keyH / 2, options.laneMarginPX, 0, 2 * Math.PI);
							context.fill();

						}
					});
				}

			});
		}

		function drawSelection() {
			if (drag) {
				return;
			}
			context.save();
			//context.translate(0.5, 0.5)
			if (startPos && currentPos) {
				context.setLineDash([4]);
				context.lineWidth = pixelRatio;
				context.fillStyle = "#808080";
				context.strokeStyle = 'White';
				// for a mouse pos Math.floor is not needed.
				let x = Math.min(startPos.x, currentPos.x);
				let y = Math.min(startPos.y, currentPos.y);
				let w = Math.max(startPos.x, currentPos.x) - x;
				let h = Math.max(startPos.y, currentPos.y) - y;
				x = getSharp(x);
				y = getSharp(y);
				h = getSharp(h);
				h = getSharp(h);
				context.strokeRect(x, y, w, h);
			}
			context.restore();
		}

		function drawBackground() {
			if (options.backgroundColor) {
				context.beginPath();
				context.rect(0, 0, canvas.width, canvas.height);
				context.fillStyle = options.backgroundColor;
				context.fill();
				return true;
			}
			return false;
		}

		function redraw() {

			let isOk = drawBackground();
			if (!isOk) {
				// Clear if bg not set.
				context.clearRect(0, 0, canvas.width, canvas.height);
			}
			// draw ticks background
			context.lineWidth = pixelRatio;

			if (options.headerBackground) {
				// draw header backgroud
				context.fillStyle = options.headerBackground;
				context.fillRect(0, 0, canvas.clientWidth, options.headerHeight);
			}

			drawLanes();

			drawSteps();

			//let text = ctx.measureText('Hello world');
			//console.log(text.width);  // 56;

			drawSelection();

			context.lineWidth = 2 * pixelRatio;
			context.moveTo(100, 0);

			context.lineTo(100, canvas.clientHeight);

			let timeLinePos = msToPx(timeLine.x);
			//context.beginPath();
			//context.translate(0.5, 0.5)
			// Reset the current path
			context.beginPath();
			// Staring point (10,45)
			context.moveTo(getSharp(timeLinePos), 0);
			// End point (180,47)
			context.lineTo(getSharp(timeLinePos), canvas.height);
			// Make the line visible
			context.stroke();
		}

		function getSharp(pos) {
			if (context.lineWidth && context.lineWidth % 2 == 0) {
				return pos;
			}
			else {
				//return pos;
				return pos + pixelRatio / 2;
			}
		}

		rescale();
		redraw();

		return this;
	}

	return this;
}(window, document);
