import React, {LegacyRef, useRef, useState} from 'react';
import './style.css';
import {Timeline, TimelineInteractionMode, TimelineKeyframeShape, TimelineRow} from '../../../lib/animation-timeline';

type ContainerProps = {
    rows: TimelineRow[];
    outlineContainer: HTMLDivElement | undefined;
    currentTime: HTMLDivElement | undefined;
    outlineScrollContainer: HTMLDivElement | undefined;
    selectModeButton: HTMLButtonElement | undefined;
    zoomModeButton: HTMLButtonElement | undefined;
    timelineContainer: HTMLDivElement | undefined;
}

function ReactTimelineControl(props: ContainerProps) {

    const {
        rows,
        outlineContainer,
        currentTime,
        outlineScrollContainer,
        selectModeButton,
        zoomModeButton,
        timelineContainer
    } = props;
    var timeline = new Timeline();
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
    var logMessage = function (message: string, log = 1) {
        if (message) {
            let el = document.getElementById("output" + log);
            if (el) {
                el.innerHTML = message + '<br/>' + el.innerHTML;
            }
        }
    }


    var logDraggingMessage = function (object: any, eventName: string) {
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
        var type = (obj.target ? obj.target.type : '');
        logMessage('mousedown:' + obj.val + '.  elements:' + type, 2);
    });
    timeline.onDoubleClick(function (obj) {
        var type = (obj.target ? obj.target.type : '');
        logMessage('doubleclick:' + obj.val + '.  elements:' + type, 2);
    });
    timeline.onScroll(function (obj) {
        var options = timeline.getOptions();
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
    var options = timeline.getOptions();
    var headerElement = document.getElementById('outline-header');
    if (headerElement && options && options.headerHeight) {
        headerElement.style.maxHeight = headerElement.style.minHeight = options.headerHeight + 'px';
    }
    // headerElement.style.backgroundColor = options.headerFillColor;

    rows.forEach(function (obj, index) {
        var div = document.createElement('div');
        div.classList.add('outline-node');
        if (options && options.rowsStyle && options.rowsStyle.marginBottom) {
            div.style.maxHeight = div.style.minHeight = options.rowsStyle.height + 'px';
            div.style.marginBottom = options.rowsStyle.marginBottom + 'px';
        }
        if (obj && obj.title)
            div.innerText = obj.title || "Track " + index;
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
        outlineScrollContainer.onwheel = outlineMouseWheel
    }
    if (zoomModeButton && zoomModeButton.onclick) {
        zoomModeButton.onclick = zoomMode
    }
    if (selectModeButton && selectModeButton.onclick) {
        selectModeButton.onclick = selectMode
    }

    return (
        <></>
    );
}

export default ReactTimelineControl;
