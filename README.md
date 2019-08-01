# js-animation-timeline-control

Animation timeline is a vanilla JavaScript, no-dependency canvas control to render the animation keyframes.

Features:

- Fast and customizable, rendered on a canvas.
- Snap, Zoom, Pan mode, multiple keyframes selection.
- Keyboard support.
- Drag mutliple keyframes, drag keyframe ranges.
- Area virtualization - only small displayed area is rendered.
- Native browser scrollbars are used.

![gif preview](demo/timeline-demo.gif)

## Configuration
## Usage

Angular:
import * as timeline from 'node_modules/animation-timeline-js/index.js';

timeline.initialize({ id: 'timeline' });

## Data structure

### Description

Despite of the main options each keyframe or lane has own properties that can override main configuration:

| Lane property | description                   |
| ------------- | ----------------------------- |
| draggable     | whether lane draggable or not |
| keyframes     | an array of the keyframes     |
| hidden        | used to hide lane             |
| name          | label to be displayed         |

| Keyframe property | description                       |
| ----------------- | --------------------------------- |
| draggable         | whether keyframe draggable or not |
| hidden            | used to hide lane                 |
| ms                | keyframe position                 |

Control is keeping the object references and passed payload is never modified, so you can pass additional metadata to have the related data when events are rised.

### Initialization
```
	let defaultOptions = {
		keysPerSecond: 60,
		snapsPerSeconds: 5, // from 1 to 60
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
		laneColor: '#252526', 
		alternateLaneColor: 'black',
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
		lineHeight: 1,
		autoWidth: true,
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
		// Use from and to range to limit the animation payload: 
		useTimelineAnimationRange: false,
		from: null,
		to: null,
		fireEventsDuringTheDrag: true,
		// Whether keyframes draggable
		keyframesDraggable: true,
		// Whether keyframes lanes draggable
		keyframesLanesDraggalbe: true
	}
```

## License

MIT
