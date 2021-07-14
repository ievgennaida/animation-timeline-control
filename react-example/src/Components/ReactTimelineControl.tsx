import React, {useState} from 'react';
import './style.css';
import {Timeline, TimelineInteractionMode, TimelineKeyframeShape, TimelineRow} from '../../../lib/animation-timeline';

// import * as Timeline from '../../../lib/timeline';

function ReactTimelineControl() {
    const outlineContainer = document.getElementById('outline-container');

    let rows = [
        {
            selected: false,
            draggable: false,

            keyframes: [
                {
                    val: 40,
                    shape: "rhomb"
                },
                {
                    shape: "rhomb",
                    val: 3000,
                    selected: false
                }
            ]
        },
        {
            selected: false,
            hidden: false,
            keyframes: [
                {
                    cursor: "default",
                    val: 2000,
                },
                {
                    val: 2500
                },
                {
                    val: 2600
                }
            ],
        },
        {
            hidden: false,
            keyframes: [
                {
                    val: 1000
                },
                {
                    val: 1500
                },
                {
                    val: 2000
                }
            ]
        },
        {
            title: 'Groups (Limited)',
            keyframes: [
                {
                    val: 40,
                    max: 850,
                    group: 'a'
                },
                {
                    val: 800,
                    max: 900,
                    group: 'a'
                },
                {
                    min: 1000,
                    max: 3400,
                    val: 1900,
                    group: 'b'
                },
                {
                    val: 3000,
                    max: 3500,
                    group: 'b'
                },
                {
                    min: 3500,
                    val: 4000,
                    group: 'c'
                }
            ]
        },
        {
            keyframes: [
                {
                    val: 100
                },
                {
                    val: 3410
                },
                {
                    val: 2000
                }
            ]
        },
        {
            title: 'Style Customized',
            groupHeight: 20,
            keyframesStyle: {
                shape: "rect",
                width: 5,
                height: 20,
            },
            keyframes: [
                {
                    val: 90
                },
                {
                    val: 3000
                }
            ]
        }, {}, {
            title: 'Max Value',
            max: 4000,
            keyframes: [,
                {
                    width: 4,
                    height: 20,
                    group: 'block',
                    shape: "rect",
                    fillColor: 'Red',
                    strokeColor: 'Black',
                    val: 4000,
                    selectable: false,
                    draggable: false
                },
                {
                    val: 1500
                },
                {
                    val: 2500
                },
            ]
        }, {}, {}, {}, {}, {}, {}, {}
    ] as TimelineRow[];

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
        const currentTime = document.getElementById("currentTime");
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

    return (
        <div className="app-container">

            <main>
                <aside>
                </aside>
                <div className="content">
                    <div id="currentTime"></div>
                    <div className="logs">
                        <div className="output" id="output1"></div>
                        <div className="output" id="output2"></div>
                    </div>

                </div>
            </main>
            <div className="toolbar">
                <button className="button mat-icon material-icons mat-icon-no-color"
                        onClick={selectMode}>tab_unselected
                </button>
                <button className="button mat-icon material-icons mat-icon-no-color" onClick={zoomMode}>search</button>
                <div className="links">
                    <a href="./tests/unittests.html">UnitTests</a>
                    <a className="git-hub-link"
                       href="https://github.com/ievgennaida/animation-timeline-control">GitHub</a>
                </div>
            </div>
            <footer>
                <div className="outline">
                    <div className="outline-header" id="outline-header">
                    </div>
                    <div className="outline-scroll-container" id="outline-scroll-container"
                         onWheel={outlineMouseWheel}>
                        <div className="outline-items" id="outline-container">
                        </div>
                    </div>
                </div>
                <div id="timeline"></div>
            </footer>
        </div>
    );
}

export default ReactTimelineControl;
