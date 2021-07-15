import React from 'react';
import {Timeline, TimelineInteractionMode, TimelineRow} from 'animation-timeline-js';

type ContainerProps = {
    rows: TimelineRow[];
    outlineContainer: HTMLDivElement | undefined;
    currentTime: HTMLDivElement | undefined;
    outlineScrollContainer: HTMLDivElement | undefined;
    selectModeButton: HTMLDivElement | undefined;
    zoomModeButton: HTMLDivElement | undefined;
    panModeButton: HTMLDivElement | undefined;
}

function ReactTimelineControl(props: ContainerProps) {
    const {
        rows,
        outlineContainer,
        currentTime,
        outlineScrollContainer,
        selectModeButton,
        zoomModeButton,
        panModeButton
    } = props;
    const timeline = new Timeline();
    // @ts-ignore
    timeline.initialize({id: 'timeline', headerHeight: 45})
    timeline.setModel({rows});

    // Select all elements on key down
    document.addEventListener('keydown', function (args) {
        if (args.which === 65 && timeline._controlKeyPressed(args)) {
            timeline.selectAllKeyframes();
            args.preventDefault();
        }
    });
    const logMessage = function (message: string, log = 1) {
        if (message) {
            let el = document.getElementById("output" + log);
            if (el) {
                el.innerHTML = message + '<br/>' + el.innerHTML;
            }
        }
    }

    const logDraggingMessage = function (object: any, eventName: string) {
        if (object.elements) {
            logMessage('Keyframe value: ' + object.elements[0].val + '. Selected (' + object.elements.length + ').' + eventName);
        }
    }
    timeline.onTimeChanged(function (event) {
        if (currentTime) {
            currentTime.innerHTML = event.val + "ms source:" + event.source;
        }
    });
    timeline.onSelected(function (obj) {
        logMessage('selected :' + obj.selected.length + '. changed :' + obj.changed.length, 2);
    });
    timeline.onDragStarted(function (obj) {
        logDraggingMessage(obj, 'dragstarted');
    });
    timeline.onDrag(function (obj) {
        logDraggingMessage(obj, 'drag');
    });
    timeline.onKeyframeChanged(function (obj) {
        console.log('keyframe: ' + obj.val);
    });
    timeline.onDragFinished(function (obj) {
        logDraggingMessage(obj, 'dragfinished');
    });
    timeline.onMouseDown(function (obj) {
        const type = (obj.target ? obj.target.type : '');
        logMessage('mousedown:' + obj.val + '.  elements:' + type, 2);
    });
    timeline.onDoubleClick(function (obj) {
        const type = (obj.target ? obj.target.type : '');
        logMessage('doubleclick:' + obj.val + '.  elements:' + type, 2);
    });
    timeline.onScroll(function (obj) {
        const options = timeline.getOptions();
        if (options) {
            if (outlineContainer) {
                outlineContainer.style.minHeight = obj.scrollHeight + 'px';
                const outlineScrollContainer = document.getElementById('outline-scroll-container');
                if (outlineScrollContainer) {
                    outlineScrollContainer.scrollTop = obj.scrollTop;
                }
            }
        }
    });

    /* generate outline left nodes */
    const options = timeline.getOptions();
    const headerElement = document.getElementById('outline-header');
    if (headerElement && options && options.headerHeight) {
        headerElement.style.maxHeight = headerElement.style.minHeight = options.headerHeight + 'px';
    }
    if (headerElement && options && options.headerFillColor) {
        headerElement.style.backgroundColor = options.headerFillColor;
    }
    rows.forEach(function (obj, index) {
        const div = document.createElement('div');
        div.classList.add('outline-node');
        if (options && options.rowsStyle && options.rowsStyle.marginBottom) {
            div.style.maxHeight = div.style.minHeight = options.rowsStyle.height + 'px';
            div.style.marginBottom = options.rowsStyle.marginBottom + 'px';
        }
        if (obj) {
            // @ts-ignore
            div.innerText = obj.title || "Track " + index;
        }
        if (outlineContainer) {
            outlineContainer.appendChild(div);
        }
    });

    /*Handle events from html page*/
    function selectMode() {
        if (timeline) {
            timeline.setInteractionMode(TimelineInteractionMode.Selection);
        }
    }

    function zoomMode() {
        if (timeline) {
            timeline.setInteractionMode(TimelineInteractionMode.Zoom);
        }
    }

    function panMode() {
        if (timeline) {
            timeline.setInteractionMode(TimelineInteractionMode.Pan);
        }
    }

    // Set scroll back to timeline when mouse scroll over the outline
    function outlineMouseWheel(event: any) {
        const wheelEvent = event.arguments[0];
        if (timeline) {
            timeline._handleWheelEvent(wheelEvent);
        }
    }

    if (outlineScrollContainer && outlineScrollContainer.onwheel) {
        outlineScrollContainer.addEventListener('wheel', outlineMouseWheel)

    }
    if (zoomModeButton) {
        zoomModeButton.addEventListener('click', zoomMode)
    }
    if (selectModeButton) {
        selectModeButton.addEventListener('click', selectMode)
    }
    if (panModeButton) {
        panModeButton.addEventListener('click', panMode)
    }
    return (
        <></>
    );
}

export default ReactTimelineControl;
