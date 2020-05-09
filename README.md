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

## Live Demo

* [Live demo](https://ievgennaida.github.io/animation-timeline-control/)
* [Run unittests](https://ievgennaida.github.io/animation-timeline-control/tests/unittests)
 
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
  TimelineOptions,
  Timeline
} from "animation-timeline-js";

  const options = new TimelineOptions();
  options.id = 'timeline';
  new Timeline(options);
```

### Draw outline tree

Scroll events can be synchronized with the outline at the left side of the control.

- Each element of the list should have the same height as animation row.
- Hide the vertical scroll of the outline container.

```JavaScript

```

## Model

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

## Development 
### Build 

run once to install development references:
```bash
  npm install
```

to pack JavaScript as a bundle:

```bash
  npm run build
```

### Build Tests
To build TypeScript unittests command should be executed: 
```bash
  npm run build-tests
```

### Run Tests
Tests execution can be started by opening tests/unittests.html. 
External mocha libs are used so internet is required.

## License

MIT
