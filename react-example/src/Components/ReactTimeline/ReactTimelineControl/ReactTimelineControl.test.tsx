import React from 'react';
import {render} from '@testing-library/react';
import ReactTimelineControl from './ReactTimelineControl';
import {rows} from '../../../testData';

test('renders react timeline control component', () => {
    render(<ReactTimelineControl currentTime={undefined} outlineContainer={undefined} outlineScrollContainer={undefined}
                                 rows={rows} selectModeButton={undefined}
                                 zoomModeButton={undefined} panModeButton={undefined}/>);
});
