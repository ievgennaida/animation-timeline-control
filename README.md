# js-animation-timeline-control

[![NPM](https://nodei.co/npm/animation-timeline-js.png)](https://nodei.co/npm/animation-timeline-js/)

Animation timeline is a vanilla JavaScript, no-dependency, canvas component to draw and manipulate animation keyframes.

Features:

- Fast and customizable, rendered on a canvas.
- Snap, Zoom, Pan mode, multiple keyframes selection.
- Keyboard support.
- Drag mutliple keyframes, drag keyframe ranges.
- Area virtualization - only small displayed area is rendered.
- Native browser scrollbars are used.
- Horizontal scale with the automatically adjusted ticks.

![gif preview](demo/timeline-demo.gif)



![gif preview](demo/zoom-scale.gif)

## Configuration

## Usage

### HTML

```JavaScript
   let lanes = [
      {
        keyframes: [
          {
            val: 40,
          },
          {
            val: 3000
          }
        ]
      }];

    let timeline = animationTimeline.initialize(
      {
        id: "timeline"
      });

    timeline.setLanes(lanes);
```

### Angular

```TypeScript
import {
  default as timeline,
  AnimationTimelineOptions,
  Timeline,
  AnimationTimelineLane,
  ScrollEventArgs
} from "animation-timeline-js";

timeline.initialize({ id: 'timeline' });
```

### Draw the outline tree

Use and syncronize scroll events to draw outline list/tree at the right side of the animation panel.

- Each element of the list should have the same height.
- Hide the vertical scroll of the outline container.

```JavaScript
  timeline.on("scroll", function (args) {
	outlineScrollContainer.scrollTop = args.scrollTop;
    outlineContent.height = args.scrollHeight;
  });

```

## Data structure

### Events

Despite of the main options each keyframe or lane has own properties that can override main configuration:

| Event name   | description                                                                                                                                            |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| timeChanged  | time changed: { val: val, source: "user" or "setTime" }                                                                                                |
| selected     | keyframe selected: keyframe                                                                                                                            |
| scroll       | On scroll. Can be used to sycnronize outline list with the current timeline container { args: args, scrollLeft, scrollTop, scrollHeight, scrollWidth } |
| dragStarted  | emited on drag started: { keyframes: [] }                                                                                                              |
| drag         | emited when dragging: { keyframes: [] }                                                                                                                |
| dragFinished | emited when drag finished: { keyframes: [] }                                                                                                           |

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
| val               | keyframe position                 |

See the full list in the typescript definitions.

Module is keeping the passed options as the read-only references.
You can pass additional metadata for the keyframes to identify them when events are emitted.

### Initialization

Default options:

```JavaScript
let defaultOptions = {
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
		keyframesLanesDraggalbe: true
	}
```

## License

MIT
