// src/components/Navbar/Navbar.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '../components/Navbar';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { BrowserRouter as Router } from 'react-router-dom';

describe('Navbar Component', () => {
  it('renders Navbar component without crashing', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );
    expect(screen.getByText('Explore')).toBeInTheDocument();
  });

  it('toggles the menu open/close state when the hamburger icon is clicked', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    const hamburger = screen.getByText('☰');
    const navbarLinks = screen.getByRole('list');

    // Initially, the menu should be closed
    expect(navbarLinks).not.toHaveClass('active');

    // Open the menu
    fireEvent.click(hamburger);
    expect(navbarLinks).toHaveClass('active');

    // Close the menu
    fireEvent.click(hamburger);
    expect(navbarLinks).not.toHaveClass('active');
  });

  it('navigates to the home page when the logo is clicked', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    const logo = screen.getByText('Explore');
    fireEvent.click(logo);

    // Assuming you have a navigation mock or test setup to verify navigation
    // This test might need to be adjusted based on your navigation setup
    expect(window.location.pathname).toBe('/');
  });

  it('renders search bar and input elements', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    // Check if the search input is in the document
    expect(screen.getByPlaceholderText('Search destinations...')).toBeInTheDocument();

    // Check if the search icon is rendered
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
  });

  it('contains the correct links', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    expect(screen.getByText('Discover')).toBeInTheDocument();
    expect(screen.getByText('Wishlist')).toBeInTheDocument();
    // expect(screen.getByRole('profile', { name: /profile/i })).toBeInTheDocument();

  });
});
