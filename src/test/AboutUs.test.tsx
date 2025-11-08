// src/components/AboutUs/AboutUs.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutUs from '../components/AboutUs';
import { describe, it, expect } from 'vitest';


describe('AboutUs Component', () => {
  it('renders AboutUs component without crashing', () => {
    render(<AboutUs />);
    expect(screen.getByText('Discover the World, Share Your Story')).toBeInTheDocument();
  });

  it('renders the image with correct alt text', () => {
    render(<AboutUs />);
    const image = screen.getByAltText('About Us');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://s3.us-west-1.amazonaws.com/assets.activeadventures.com/public/Albums/South-America/Condor/SA_Condor-75__ScaleMaxWidthWzE1MDBd.jpg');
  });

  it('renders the headline text', () => {
    render(<AboutUs />);
    expect(screen.getByText('Discover the World, Share Your Story')).toBeInTheDocument();
  });

  it('renders the content paragraphs with correct text', () => {
    render(<AboutUs />);
    expect(screen.getByText(/We are passionate about connecting you with the world’s most incredible destinations./i)).toBeInTheDocument();
    expect(screen.getByText(/Join us as we explore the world together, one adventure at a time./i)).toBeInTheDocument();
  });
});
