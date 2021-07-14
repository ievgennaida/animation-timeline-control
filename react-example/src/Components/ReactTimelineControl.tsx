import React from 'react';
import './style.css';
import * as Timeline from '../../../lib/timeline';

function ReactTimelineControl() {
    function selectMode() {
        return undefined;
    }

    function outlineMouseWheel(e: any) {
        return undefined;
    }

    function zoomMode(e:any) {

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
                      onClick={selectMode()}>tab_unselected
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
                       onWheel={outlineMouseWheel(arguments[0])}>
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
