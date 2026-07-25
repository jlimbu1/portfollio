import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import App from './App';

beforeEach(() => {

  // Mock window.matchMedia (often missing in jsdom)

  Object.defineProperty(window, 'matchMedia', {

    writable: true,

    value: jest.fn().mockImplementation(query => ({

      matches: false,

      media: query,

      onchange: null,

      addListener: jest.fn(),

      removeListener: jest.fn(),

      addEventListener: jest.fn(),

      removeEventListener: jest.fn(),

      dispatchEvent: jest.fn(),

    })),

  });

});



test('renders without crashing', () => {
  render(

    <MemoryRouter>

      <App />

    </MemoryRouter>

  );

});