import React, {useState} from 'react';
import './style.css';
import ReactTimelineControl from './ReactTimelineControl/ReactTimelineControl';
import {TimelineRow} from 'animation-timeline-js';

type ContainerProps = {
    rows: TimelineRow[];
}

function ReactTimeline(props: ContainerProps) {
    const [outlineScrollContainer, setOutlineScrollContainer] = useState<HTMLDivElement | undefined>();
    const [selectModeButton, setSelectModeButton] = useState<HTMLDivElement | undefined>();
    const [zoomModeButton, setZoomModeButton] = useState<HTMLDivElement | undefined>();
    const [timelineContainer, setTimelineContainer] = useState<HTMLDivElement | undefined>();
    const [currentTimeContainer, setCurrentTimeContainer] = useState<HTMLDivElement | undefined>();
    const [outlineContainer, setOutlineContainer] = useState<HTMLDivElement | undefined>();
    const [panModeButton, setPanModeButton] = useState<HTMLDivElement | undefined>();

    return (
        <>
            {
                currentTimeContainer &&
                outlineContainer &&
                outlineScrollContainer &&
                selectModeButton &&
                timelineContainer &&
                zoomModeButton
                    ?

                    <ReactTimelineControl
                        rows={props.rows}
                        // @ts-ignore
                        currentTime={currentTimeContainer}
                        // @ts-ignore
                        outlineContainer={outlineContainer}
                        // @ts-ignore
                        outlineScrollContainer={outlineScrollContainer}
                        // @ts-ignore
                        selectModeButton={selectModeButton}
                        // @ts-ignore
                        timelineContainer={timelineContainer}
                        // @ts-ignore
                        zoomModeButton={zoomModeButton}
                        // @ts-ignore
                        panModeButton={panModeButton}
                    />
                    : null}
            <div className="app-container">
                <main>
                    <aside>
                    </aside>
                    <div className="content">
                        <div id="currentTime"
                            // @ts-ignore
                             ref={setCurrentTimeContainer}
                        />
                        <div className="logs">
                            <div className="output" id="output1"/>
                            <div className="output" id="output2"/>
                        </div>

                    </div>
                </main>
                <div className="toolbar">
                    <button className="button mat-icon material-icons mat-icon-no-color"
                        // @ts-ignore
                            ref={setSelectModeButton}
                    >tab_unselected
                    </button>
                    <button className="button mat-icon material-icons mat-icon-no-color"
                        // @ts-ignore
                            ref={setPanModeButton}
                    >pan_tool
                    </button>
                    <button className="button mat-icon material-icons mat-icon-no-color"
                        // @ts-ignore
                            ref={setZoomModeButton}
                    >search
                    </button>
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
                            // @ts-ignore
                             ref={setOutlineScrollContainer}
                        >
                            <div className="outline-items" id="outline-container"
                                // @ts-ignore
                                 ref={setOutlineContainer}
                            >
                            </div>
                        </div>
                    </div>
                    <div id="timeline"
                        // @ts-ignore
                         ref={setTimelineContainer}>
                    </div>
                </footer>
            </div>
        </>
    );
}

export default ReactTimeline;
