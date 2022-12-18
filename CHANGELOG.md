# animation-timeline-control Changelog

## Changes

## [2.3.0] - 11.06.2022 (Breakings changes)

### Added

- Allow to style groups/connection of the keyframes separately.
(see live demo - [Live demo](https://ievgennaida.github.io/animation-timeline-control/))

### Changed

- Breaking change! Style names are aligned with the HTML namings.
- Breaking change! Events are sending objects with the change metadata.
- Breaking change! timelineInteractive is renamed as timelineDraggable
- Breaking change! keyframe styles are moved to the 'style' property for each keyframe.
- Internal defaults.ts consts are moved to the default folder into the separate files.
- Dev packages are updated.
- timelinePoint -> timelineValues
- TimelineClickEvent-> added point and prevPoint
- TimelineDragEvent-> added point and prevPoint
- Function getScrollLeft/setScrollLeft is changed to the property scrollLeft
- Function getScrollTop/setScrollTop is changed to the property scrollTop
- scrollLeft() -> scrollToRightBounds()
- Renamed private function '_height' as '_canvasClientHeight'
- Renamed private function '_width' as '_canvasClientWidth'
- removed getMin and getMax for the ranged properties favor of min, max property. (In a case of calculated values getters can be used).
- mergeOptions are moved to TimelineUtils
- Strict TypeScript mode is enabled.
- Refactoring of the event arguments.
- models are moved from root src to src\models folders.

## [2.2.3]

### Added

- Added scrollFinished event.
TODO: group styles, refactoring of the styling system.

### Fixed

- Fixed Dispose method is not removing all scroll container event handlers.
- Fixed demo nonInteractivePan.
- Fixed timeline player demo.
- Fixed rectangular keyframes mouse over detection.
- Fixed cloning of the HTML element when options are set.

## [2.2.2]

### Added

- Added new option timelineInteractive = true/false to control possibility for user to move timeline position.
- Added 'nonInteractivePan' interaction mode that is allowing only to pan and change position of the timeline without changing the keyframes position.
- Added 'none' interaction mode where no interactions are allowed.
- Added 'play' demo to the index.html

### Changed

- Private property _findDraggable is renamed to_findDraggableElement
- Options are appended to the current active options, not to default.
- Fixed order of the build (definitions and tests only after the definitions.)
- updated build packages.

## [2.2.1]

 TypeScript fixes, updated build packages.

## > [2.0]

- Migrated to TypeScript, Webpack, Babel.
- API is refined.

## < [2.0]

Vanilla js implementation.
