// src/components/Hero/Hero.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import Hero from '../components/Hero/Hero';

describe('Hero Component', () => {
  const destinations = [
    {
      image: 'https://img.freepik.com/premium-photo/amazing-top-view-beach-aerial-view-tropical-beach-sea-beautiful-phuket-island-located-freedom-beach-phuket-thailand_34362-4347.jpg?w=740',
      redirect_url: 'image1.jpg',
      alt: 'Destination 1',
      description: 'The best beach to visit this summer',
    },
    {
      image: 'https://www.thomascook.in/blog/wp-content/uploads/2020/03/winter-destinations-india.jpg',
      redirect_url: 'image2.jpg',
      alt: 'Destination 2',
      description: 'A peaceful retreat in the mountains',
    },
    {
      image: 'https://www.planetware.com/wpimages/2020/03/best-hot-air-balloon-rides-cappadocia-turkey.jpg',
      redirect_url: 'image3.jpg',
      alt: 'Destination 3',
      description: 'Explore the vibrant life in the Air',
    },
  ];

  it('renders Hero component without crashing', () => {
    render(<Hero destinations={destinations} />);
    expect(screen.getByText('Discover story-worthy travel moments')).toBeInTheDocument();
  });

  it('renders correct number of destination images and descriptions', () => {
    render(<Hero destinations={destinations} />);
    
    const images = screen.getAllByRole('img');
    const descriptions = screen.getAllByText(/The best beach to visit this summer|A peaceful retreat in the mountains|Explore the vibrant life in the Air/i);

    expect(images).toHaveLength(3);
    expect(descriptions).toHaveLength(3);
  });

  it('renders destination images with correct attributes and descriptions', () => {
    render(<Hero destinations={destinations} />);

    const images = screen.getAllByRole('img');
    const descriptions = screen.getAllByText(/The best beach to visit this summer|A peaceful retreat in the mountains|Explore the vibrant life in the Air/i);

    // Validate image sources
    expect(images[0]).toHaveAttribute('src', 'https://img.freepik.com/premium-photo/amazing-top-view-beach-aerial-view-tropical-beach-sea-beautiful-phuket-island-located-freedom-beach-phuket-thailand_34362-4347.jpg?w=740');
    expect(images[0]).toHaveAttribute('alt', 'Destination 1');
    
    expect(images[1]).toHaveAttribute('src', 'https://www.thomascook.in/blog/wp-content/uploads/2020/03/winter-destinations-india.jpg');
    expect(images[1]).toHaveAttribute('alt', 'Destination 2');
    
    expect(images[2]).toHaveAttribute('src', 'https://www.planetware.com/wpimages/2020/03/best-hot-air-balloon-rides-cappadocia-turkey.jpg');
    expect(images[2]).toHaveAttribute('alt', 'Destination 3');

    // Validate descriptions
    expect(descriptions[0]).toHaveTextContent('The best beach to visit this summer');
    expect(descriptions[1]).toHaveTextContent('A peaceful retreat in the mountains');
    expect(descriptions[2]).toHaveTextContent('Explore the vibrant life in the Air');
  });
});
