import React from 'react';
import './AboutUs.css';

const AboutUs: React.FC = () => {
  return (
    <section className="about-us">
      <div className="about-us-image">
        <img src="https://s3.us-west-1.amazonaws.com/assets.activeadventures.com/public/Albums/South-America/Condor/SA_Condor-75__ScaleMaxWidthWzE1MDBd.jpg" alt="About Us" />
      </div>
      <div className="about-us-content">
        <h1 className="about-us-headline">
          Discover the World, Share Your Story
        </h1>
        <p className='semiBold'>
          We are passionate about connecting you with the world’s most incredible destinations. Whether you're looking to explore vibrant cities or escape to serene countryside, our platform offers a curated selection of countries and cities that cater to every type of traveler.
        </p>

        <p className='normal'>
          Join us as we explore the world together, one adventure at a time. Discover, connect, and inspire.
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
