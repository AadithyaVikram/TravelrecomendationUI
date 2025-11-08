// src/components/Footer/Footer.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../components/Footer';
import { describe, it, expect } from "vitest";


describe('Footer Component', () => {
  it('renders Footer component without crashing', () => {
    render(<Footer />);
    expect(screen.getByText('Explore')).toBeInTheDocument();
  });

  it('renders social media icons with correct aria-labels', () => {
    render(<Footer />);
    const socialMediaLinks = [
      { label: 'Facebook', ariaLabel: 'Facebook' },
      { label: 'Instagram', ariaLabel: 'Instagram' },
      { label: 'Twitter', ariaLabel: 'Twitter' },
      { label: 'YouTube', ariaLabel: 'YouTube' },
      { label: 'Pinterest', ariaLabel: 'Pinterest' },
    ];

    socialMediaLinks.forEach(({ ariaLabel }) => {
      expect(screen.getByLabelText(ariaLabel)).toBeInTheDocument();
    });
  });

  it('renders TOP COUNTRIES and TOP STATES sections with correct list items', () => {
    render(<Footer />);

    const countries = ['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany'];
    const states = ['California', 'New York', 'Texas', 'Florida', 'Washington'];

    countries.forEach(country => {
      expect(screen.getByText(country)).toBeInTheDocument();
    });

    states.forEach(state => {
      expect(screen.getByText(state)).toBeInTheDocument();
    });
  });

  it('renders the subscribe text and privacy policy link', () => {
    render(<Footer />);
    expect(screen.getByText(/Subscribe to explore newsletters and promotions/i)).toBeInTheDocument();
    expect(screen.getByText('Read our privacy policy')).toBeInTheDocument();
  });
});
