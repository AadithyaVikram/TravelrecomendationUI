import React, { useState, useEffect } from "react";
import { fetchCountries } from "../../api/DestinationServices";
import { useNavigate } from "react-router-dom";
import Cards from "../../components/Cards/Cards";
import "./Destination.css";
import { CountryData } from "../../types";



const Country: React.FC = () => {
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const response = await fetchCountries();
        // console.log(response); // Log the response to check its structure
        // Access the correct field in the response
        setCountries(response); 
      } catch (err) {
        setError("Failed to fetch countries");
        console.error("Error fetching countries:", err);
      }
    };
    loadCountries();
  }, []);

  const handleCardClick = (id: number, countryName: string) => {
    // navigate(`/states/${id}`, { state: { countryName } });
    navigate(`/countries/${countryName}/states/${id}`, { state: { countryName } })
  };

  if (error) return <div>{error}</div>;

  return (
    <div className="countries-container">
      <div className="country-headline">
        <h1 className="heading">Journey Across the <span className="bold-heading">Globe</span></h1>
      </div>
      <div className="recommendation-list">
        {countries ? (
          countries.map((country) => (
            <Cards
              id={country.countryId}
              key={country.countryId}
              imageUrl={country.imageUrl}
              placeName={country.countryName}
              onClick={handleCardClick}
            />
          ))
        ) : (
          <p>No countries available</p>
        )}
      </div>
    </div>
  );
};

export default Country;
