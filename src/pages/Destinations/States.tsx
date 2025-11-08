import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Cards from "../../components/Cards/Cards";
import { fetchStatesByCountry } from '../../api/DestinationServices';
import NoData from "../../components/NoData";

interface Place {
  stateId: number;
  imageUrl: string;
  stateName: string;
}

const States: React.FC = () => {
  const { countryId } = useParams();
  const location = useLocation();
  const countryName = (location.state as { countryName: string })?.countryName;

  const [places, setPlaces] = useState<Place[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (countryId) {
      const fetchStates = async () => {
        try {
          const response = await fetchStatesByCountry(countryId);
          console.log("States data:", response); // Correctly log the content array
  
          // Set the `content` array to places state
          setPlaces(response || []); 
        } catch (err) {
          if (err instanceof Error)setError(err.message) ;
          else setError("An unknown error occurred");
        }
      };
      fetchStates();
    } else {
      setError("Country ID is missing");
    }
  }, [countryId]);

  const handleCardClick = (id: number, stateName: string) => {
    // navigate(`/destinations/${id}`, { state: { stateName } });
    navigate(`/countries/${countryName}/${stateName}/destinations/${id}`, { state: { stateName } });
  };

  if (error) {
    return <NoData/>;
  }

  return (
    <div className="countries-container">
      <div className="country-headline">
        <h1>Journey Through the States of <span className="bold-heading">{countryName}</span></h1>
      </div>
      <div className="recommendation-list">
        {places.length > 0 ? (
          places.map((place) => (
            <Cards
              id={place.stateId}
              key={place.stateId}
              placeName={place.stateName}
              imageUrl={place.imageUrl}
              regionName={countryName}
              onClick={handleCardClick}
            />
          ))
        ) : (
          <NoData/>
        )}
      </div>
    </div>
  );
};

export default States;
