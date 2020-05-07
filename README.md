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

### Build 

run once to install development references:
```bash
  npm install
```

to pack JavaScript as a bundle:

```bash
  npm run build
```

### Draw the outline tree

Scroll events can be synchronized with the outline at the left side of the control.

- Each element of the list should have the same height as animation row.
- Hide the vertical scroll of the outline container.

```JavaScript

```

## Data structure

### Events

Despite of the main options each keyframe or lane has own properties that can override main configuration:


### Styling


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
