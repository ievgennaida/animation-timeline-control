# js-animation-timeline-control (0.0.1-alpha)

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

## License

MIT
