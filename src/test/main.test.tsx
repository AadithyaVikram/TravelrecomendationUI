// src/test/main.test.tsx
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import App from '../App';

// Ensure that the root element exists
const setupRootElement = () => {
  let rootElement = document.getElementById('root');
  if (!rootElement) {
    rootElement = document.createElement('div');
    rootElement.setAttribute('id', 'root');
    document.body.appendChild(rootElement);
  }
  return rootElement;
};

describe('Root Rendering', () => {
  it('renders the App component without crashing', () => {
    const rootElement = setupRootElement();
    render(<App />, { container: rootElement });

    // Check that App rendered correctly
    expect(rootElement).toBeInTheDocument();
    expect(rootElement.children.length).toBeGreaterThan(0);
  });
});
