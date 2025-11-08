// src/components/Hero/Hero.tsx
import React from 'react';
import './Hero.css';

interface HeroProps {
  destinations: Array<{ image: string; redirect_url: string; alt: string; description: string }>;
}

const Hero: React.FC<HeroProps> = ({ destinations }) => {

  return (
    <div className="hero-container">
      <div className="hero-headline">
        <h1 className="hero-heading">Discover story-worthy travel moments</h1>
      </div>
      {destinations.map((destination, index) => (
        <div
          key={index}
          className="hero-image-container"
        >
          <img
            src={destination.image}
            alt={destination.alt}
            className="hero-image"
          />
          <div className="hero-description">
            <p>{destination.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Hero;
