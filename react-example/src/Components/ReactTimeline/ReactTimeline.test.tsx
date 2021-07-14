import React from 'react';
import { render, screen } from '@testing-library/react';
import ReactTimeline from './ReactTimeline';
import {rows} from '../../testData';

test('renders react timeline control component', () => {
  render(<ReactTimeline rows={rows}  />);
});
