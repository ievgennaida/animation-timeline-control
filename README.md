# animation-timeline-control

[![NPM](https://nodei.co/npm/animation-timeline-js.png)](https://nodei.co/npm/animation-timeline-js/)

Animation timeline is a TypeScript, no-dependency, canvas component designed to visualize and manipulate animation keyframes.

Features:

- Fast and customizable, rendered on a canvas.
- Snap, Zoom, Pan mode, multiple keyframes selection.
- Keyboard support.
- Drag multiple keyframes, drag keyframe ranges.
- Area virtualization - only small displayed area is rendered.
- Native browser scrollbars are used.
- Horizontal scale with the automatically adjusted ticks.

![gif preview](demo/timeline-demo.gif)



![gif preview](demo/zoom-scale.gif)

## Configuration

## Usage

### HTML

```JavaScript
   let rows = [
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

    let timeline = new timelineModule.Timeline({id:'timeline'})

    timeline.setModel({ rows: rows });
```

### Angular

```TypeScript
import {
  default as timeline,
  TimelineOptions,
  Timeline,
  AnimationTimelineLane,
  ScrollEventArgs
} from "animation-timeline-js";

timeline.initialize({ id: 'timeline' });
```

### Draw the outline tree

Use and synchronize scroll events to draw outline list/tree at the left side of the animation panel.

- Each element of the list should have the same height as animation lane.
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
| scroll       | On scroll. Can be used to synchronize outline list with the current timeline container { args: args, scrollLeft, scrollTop, scrollHeight, scrollWidth } |
| dragStarted  | emitted on drag started: { keyframes: [] }                                                                                                              |
| drag         | emitted when dragging: { keyframes: [] }                                                                                                                |
| dragFinished | emitted when drag finished: { keyframes: [] }                                                                                                           |

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

```

## Changes

## 2.0
- Migrated to TypeScript, Webpack, Babel.
- API is refined.

## < 2.0

Vanilla js implementation. 

## License

MIT
