import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import App from './App';

describe('App Component', () => {
  it('renders Navbar, AppRoutes, and Footer components without crashing', () => {
    render(<App />);

    // Check if the Navbar component is rendered
    expect(screen.getByTestId('navbar')).toBeInTheDocument();

    // Check if the AppRoutes component is rendered
    expect(screen.getByTestId('app-routes')).toBeInTheDocument();

    // Check if the Footer component is rendered
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
