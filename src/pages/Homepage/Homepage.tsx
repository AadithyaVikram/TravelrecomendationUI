import React from "react";
import Hero from "../../components/Hero/Hero";
import Country from "../Destinations/Countries";
import AboutUs from "../../components/AboutUs";
import { useNavigate } from "react-router-dom";
import { destinations } from "../../images/destinationImages"; // Import the data
import './Homepage.css';

const Homepage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Hero destinations={destinations} />
      <div className="dashboard-text">
        <h3>PLAN YOUR TRIP</h3>

        <div className="viewAllDestinations">
          <h1 className="bold-heading">Where to next?</h1>
          <button
            className="viewAllDestinationsBtn"
            onClick={() => {
              navigate('/countries');
            }}
          >
            View all destinations
          </button>
        </div>
      </div>

      <Country  />
      <AboutUs />
    </div>
  );
};

export default Homepage;
