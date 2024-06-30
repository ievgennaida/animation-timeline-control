/**
 * Javascript timeline initialization example. 
 * Consumed by index.html
 */

// @ts-check
var outlineContainer = document.getElementById('outline-container');

function generateModel() {
    /** @type {import('../lib/animation-timeline').TimelineGroupStyle} */
    const groupA = {
        style: {
            fillColor: '#6B9080',
            marginTop: 4,
        },
        keyframesStyle: {
            shape: 'rect',
        },
    };
    /** @type {import('../lib/animation-timeline').TimelineGroupStyle} */
    const groupB = {
        style: {
            marginTop: 6,
        },
    };
    /** @type {import('../lib/animation-timeline').TimelineGroupStyle} */
    const groupC = {
        style: {
            strokeColor: "white",
            strokeThickness: 1,
        }, keyframesStyle: {
            shape: 'none',
        },
    };
    /** @type {import('../lib/animation-timeline').TimelineGroupStyle} */
    const groupD = {
        style: {
            fillColor: "transparent",
            strokeColor: "gray",
            strokeThickness: 2,
            radii: 3,
            keyframesStyle: {
                shape: "none"
            }
        },
    };
    /** @type {import('../lib/animation-timeline').TimelineGroupStyle} */
    const groupWhite1 = {
        style: {
            fillColor: "white",
            strokeColor: "white",
            strokeThickness: 2,
            radii: 3,
            keyframesStyle: {
                shape: "none"
            }
        },
    };
    /** @type {import('../lib/animation-timeline').TimelineGroupStyle} */
    const groupWhite2 = {
        style: {
            fillColor: "white",
            strokeColor: "white",
            strokeThickness: 2,
            radii: 3,
            keyframesStyle: {
                shape: "none"
            }
        },
    };
    /** @type {import('../lib/animation-timeline').TimelineModel} */
    let timelineModel = {
        rows: [
            {
                selected: false,
                draggable: false,

                keyframes: [
                    {
                        val: 40,
                        shape: 'rhomb',
                    },
                    {
                        shape: 'rhomb',
                        val: 3000,
                        selected: false,
                    },
                ],
            },
            {
                selected: false,
                keyframes: [
                    {
                        style: {
                            cursor: 'default',
                        },
                        val: 2000,
                    },
                    {
                        val: 2500,
                    },
                    {
                        val: 2600,
                    },
                ],
            },
            {
                keyframes: [
                    {
                        val: 1000,
                    },
                    {
                        val: 1500,
                    },
                    {
                        val: 2000,
                    },
                ],
            },
            {
                title: 'Groups (Limited)',
                keyframes: [
                    {
                        val: 40,
                        max: 850,
                        group: 'a',
                    },
                    {
                        val: 800,
                        max: 900,
                        group: 'a',
                    },
                    {
                        min: 1000,
                        max: 3400,
                        val: 1900,
                        group: 'b',
                    },
                    {
                        val: 3000,
                        max: 3500,
                        group: 'b',
                    },
                    {
                        min: 3500,
                        val: 4000,
                        group: 'c',
                    },
                ],
            },
            {
                title: 'Show 3 lanes as one outline',
                keyframesDraggable: false,
                style: {
                    fillColor: "black",
                    marginBottom: 0,

                    keyframesStyle: {
                        shape: "none"
                    },
                    height: 10,
                    groupsStyle: {
                        marginTop: 0,
                        height: 10,
                        fillColor: "gray"
                    }
                },
                keyframes: [
                    {
                        val: 400,
                    },
                    {
                        val: 5800,
                    }
                ],
            },
            {
                title: 'Show 3 lanes as one outline',
                keyframesDraggable: false,
                style: {
                    fillColor: "black",

                    marginBottom: 0,
                    keyframesStyle: {
                        shape: "none"
                    },
                    groupsStyle: {
                        marginTop: 0,
                        height: 10,
                        fillColor: "lightgray"
                    },
                    height: 10
                },
                keyframes: [
                    {
                        val: 500,
                    },
                    {
                        val: 1800
                    }
                ],
            },
            {
                title: 'Show 3 lanes as one outline',
                keyframesDraggable: false,
                style: {
                    fillColor: "black",
                    marginBottom: 0,
                    keyframesStyle: {
                        shape: "none"
                    },
                    groupsStyle: {
                        marginTop: 0,
                        height: 12,
                        fillColor: "gray"
                    },
                    height: 10
                },
                keyframes: [
                    {
                        val: 650
                    },
                    {
                        val: 2500
                    }
                ],
            },
            {
                title: 'Groups Different Styles',
                keyframes: [
                    {
                        val: 100,
                        max: 850,
                        group: groupA,
                    },
                    {
                        val: 500,
                        max: 900,
                        group: groupA,
                    },
                    {
                        min: 900,
                        max: 1400,
                        val: 900,
                        group: groupB,
                    },
                    {
                        val: 2000,
                        group: groupB,
                    },
                    {
                        val: 2100,
                        group: groupC,
                    },
                    {
                        val: 5000,
                        group: groupC,
                    },
                ],
            },
            {
                title: 'Groups Overlap',
                keyframesDraggable: false,
                groupsDraggable: false,
                keyframes: [
                    {
                        val: 100,
                        group: groupD,
                    },
                    {
                        val: 4000,
                        group: groupD,
                    },
                    {
                        min: 100,
                        max: 4000,
                        val: 500,
                        group: groupWhite1,
                    },
                    {
                        min: 100,
                        max: 4000,
                        val: 1500,
                        group: groupWhite1,
                    },
                    {
                        min: 100,
                        max: 4000,
                        val: 2500,
                        group: groupWhite2,
                    },
                    {
                        min: 100,
                        max: 4000,
                        val: 3600,
                        group: groupWhite2,
                    }
                ],
            },
            {
                title: 'Keyframe Style Customized',
                style: {
                    groupsStyle: {
                        height: 5,
                        marginTop: 'auto',
                    },
                    keyframesStyle: {
                        shape: 'rect',
                        width: 5,
                        height: 20,
                    },
                },
                keyframes: [
                    {
                        val: 90,
                    },
                    {
                        val: 3000,
                    },
                ],
            },
            {},
            {
                title: 'Max Value (Not Draggable)',
                max: 4000,
                keyframes: [
                    {
                        style: {
                            width: 4,
                            height: 20,
                            group: 'block',
                            shape: 'rect',
                            fillColor: 'Red',
                            strokeColor: 'Black',
                        },
                        val: 4000,
                        selectable: false,
                        draggable: false,
                    },
                    {
                        val: 1500,
                    },
                    {
                        val: 2500,
                    },
                ],
            },
            {
                title: 'Custom Height',
                style: {
                    height: 100,
                    keyframesStyle: {
                        shape: 'rect',
                        width: 4,
                        height: 70,
                    },
                },

                keyframes: [
                    {
                        val: 40,
                        max: 850,
                        group: 'a',
                    },
                    {
                        val: 8600,
                        group: 'a',
                    },
                ],
            },
        ]
    };
    return timelineModel;
}
const timelineModel = generateModel();

// Log message to the screen
var logMessage = function (message, logPanel = 1) {
    if (message) {
        let el = document.getElementById('output' + logPanel);
        if (el) {
            el.innerHTML = message + '<br/>' + el.innerHTML;
        }
    }
};

var logDraggingMessage = function (object, eventName) {
    if (object.elements) {
        logMessage('Keyframe value: ' + object.elements[0].val + '. Selected (' + object.elements.length + ').' + eventName);
    }
};
/** @type {import('../lib/animation-timeline').Timeline} */
// @ts-ignore
var timeline = new timelineModule.Timeline();

timeline.initialize({ id: 'timeline', headerHeight: 45 }, timelineModel);

// Select all elements on key down
document.addEventListener('keydown', function (args) {
    if (args.which === 65 && timeline._controlKeyPressed(args)) {
        timeline.selectAllKeyframes();
        args.preventDefault();
    }
});

timeline.onTimeChanged(function (event) {
    showActivePositionInformation();
});

function showActivePositionInformation() {
    if (timeline) {
        var fromPx = timeline.scrollLeft;
        var toPx = timeline.scrollLeft + timeline.getClientWidth();
        var fromMs = timeline.pxToVal(fromPx - timeline._leftMargin());
        var toMs = timeline.pxToVal(toPx - timeline._leftMargin());
        var positionInPixels = timeline.valToPx(timeline.getTime()) + timeline._leftMargin();
        var message = 'Timeline in ms: ' + timeline.getTime() + 'ms. Displayed from:' + fromMs.toFixed() + 'ms to: ' + toMs.toFixed() + 'ms.';
        message += '<br>';
        message += 'Timeline in px: ' + positionInPixels + 'px. Displayed from: ' + fromPx + 'px to: ' + toPx + 'px';
        var currentElement = document.getElementById('currentTime');
        if (currentElement) {
            currentElement.innerHTML = message;
        }
    }
}

timeline.onSelected(function (obj) {
    logMessage('Selected Event: (' + obj.selected.length + '). changed selection :' + obj.changed.length, 2);
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

timeline.onContextMenu(function (obj) {
    if (obj.args) {
        obj.args.preventDefault();
    }
    logDraggingMessage(obj, 'addKeyframe');

    obj.elements.forEach(p => {
        if (p.type === "row" && p.row) {
            if (!p.row?.keyframes) {
                p.row.keyframes = []
            }
            p.row?.keyframes?.push({ val: obj.point?.val || 0 });
        }
    })
    timeline.redraw()
});

timeline.onMouseDown(function (obj) {
    var type = obj.target ? obj.target.type : '';
    if (obj.pos) {
        logMessage('mousedown:' + obj.val + '.  target:' + type + '. ' + Math.floor(obj.pos.x) + 'x' + Math.floor(obj.pos.y), 2);
    }
});

timeline.onDoubleClick(function (obj) {
    var type = obj.target ? obj.target.type : '';
    if (obj.pos) {
        logMessage('doubleclick:' + obj.val + '.  target:' + type + '. ' + Math.floor(obj.pos.x) + 'x' + Math.floor(obj.pos.y), 2);
    }
});

// Synchronize component scroll renderer with HTML list of the nodes.
timeline.onScroll(function (obj) {
    var options = timeline.getOptions();
    if (options) {
        if (outlineContainer) {
            outlineContainer.style.minHeight = obj.scrollHeight + 'px';
            const outlineElement = document.getElementById('outline-scroll-container');
            if (outlineElement) {
                outlineElement.scrollTop = obj.scrollTop;
            }
        }
    }
    showActivePositionInformation();
});

timeline.onScrollFinished(function (_) {
    // Stop move component screen to the timeline when user start manually scrolling.
    logMessage('on scroll finished', 2);
});

generateHTMLOutlineListNodes(timelineModel.rows);

/**
 * Generate html for the left menu for each row.
 * */
function generateHTMLOutlineListNodes(rows) {
    var options = timeline.getOptions();
    var headerElement = document.getElementById('outline-header');
    if (!headerElement) {
        return;
    }
    headerElement.style.maxHeight = headerElement.style.minHeight = options.headerHeight + 'px';
    // headerElement.style.backgroundColor = options.headerFillColor;
    if (!outlineContainer) {
        console.log("Error: Cannot find html element to output outline/tree view")
        return;
    }
    outlineContainer.innerHTML = '';

    rows.forEach(function (row, index) {
        var div = document.createElement('div');
        div.classList.add('outline-node');
        const h = (row.style ? row.style.height : 0) || (options.rowsStyle ? options.rowsStyle.height : 0);
        div.style.maxHeight = div.style.minHeight = h + 'px';
        div.style.marginBottom = ((options.rowsStyle ? options.rowsStyle.marginBottom : 0) || 0) + 'px';
        div.innerText = row.title || 'Track ' + index;
        div.id = div.innerText;
        var alreadyAddedWithSuchNameElement = document.getElementById(div.innerText)
        // Combine outlines with the same name:
        if (alreadyAddedWithSuchNameElement) {
            var increaseSize = Number.parseInt(alreadyAddedWithSuchNameElement.style.maxHeight) + h;
            alreadyAddedWithSuchNameElement.style.maxHeight = alreadyAddedWithSuchNameElement.style.minHeight = increaseSize + 'px';

            return
        }
        if (outlineContainer) {
            outlineContainer.appendChild(div);
        }

    });
}

// Handle events from html page
function selectMode() {
    if (timeline) {
        timeline.setInteractionMode('selection');
    }
}
function zoomMode() {
    if (timeline) {
        timeline.setInteractionMode('zoom');
    }
}
function noneMode() {
    if (timeline) {
        timeline.setInteractionMode('none');
    }
}

function removeKeyframe() {
    if (timeline) {
        // Add keyframe
        const currentModel = timeline.getModel();
        if (currentModel && currentModel.rows) {
            currentModel.rows.forEach((row) => {
                if (row.keyframes) {
                    row.keyframes = row.keyframes.filter((p) => !p.selected);
                }
            });
            timeline.setModel(currentModel);
        }
    }
}
function addKeyframe() {
    if (timeline) {
        // Add keyframe
        const currentModel = timeline.getModel();
        if (!currentModel) {
            return;
        }
        currentModel.rows.push({ keyframes: [{ val: timeline.getTime() }] });
        timeline.setModel(currentModel);

        // Generate outline list menu
        generateHTMLOutlineListNodes(currentModel.rows);
    }
}
function panMode(interactive) {
    if (timeline) {
        timeline.setInteractionMode(interactive ? 'pan' : 'nonInteractivePan');
    }
}
// Set scroll back to timeline when mouse scroll over the outline
function outlineMouseWheel(event) {
    if (timeline) {
        this.timeline._handleWheelEvent(event);
    }
}
var playing = false;
var playStep = 50;
// Automatic tracking should be turned off when user interaction happened.
var trackTimelineMovement = false;
function onPlayClick(event) {
    playing = true;
    trackTimelineMovement = true;
    if (timeline) {
        this.moveTimelineIntoTheBounds();
        // Don't allow to manipulate timeline during playing (optional).
        timeline.setOptions({ timelineDraggable: false });
    }
}
function onPauseClick(event) {
    playing = false;
    if (timeline) {
        timeline.setOptions({ timelineDraggable: true });
    }
}

function moveTimelineIntoTheBounds() {
    if (timeline) {
        if (timeline._startPosMouseArgs || timeline._scrollAreaClickOrDragStarted) {
            // User is manipulating items, don't move screen in this case.
            return;
        }
        const fromPx = timeline.scrollLeft;
        const toPx = timeline.scrollLeft + timeline.getClientWidth();

        let positionInPixels = timeline.valToPx(timeline.getTime()) + timeline._leftMargin();
        // Scroll to timeline position if timeline is out of the bounds:
        if (positionInPixels <= fromPx || positionInPixels >= toPx) {
            this.timeline.scrollLeft = positionInPixels;
        }
    }
}
function initPlayer() {
    setInterval(() => {
        if (playing) {
            if (timeline) {
                timeline.setTime(timeline.getTime() + playStep);
                moveTimelineIntoTheBounds();
            }
        }
    }, playStep);
}
// Note: this can be any other player: audio, video, svg and etc.
// In this case you have to synchronize events of the component and player.
initPlayer();
showActivePositionInformation();
window.onresize = showActivePositionInformation;