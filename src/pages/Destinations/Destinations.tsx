import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import FlippableCard from "../../components/Cards/FlipCard";
import "./Destination.css";
import { fetchDestinationsByState } from "../../api/DestinationServices";
import NoData from "../../components/NoData";
 
export interface Destination {
  destinationId: number;
  imageUrl: string;
  destinationName: string;
  stateName: string;
  countryName: string;
  description: string;
  rating: number;
}
 
const Destinations: React.FC = () => {
  const { stateId } = useParams<{ stateId: string }>();
  const location = useLocation();
  const [places, setPlaces] = useState<Destination[]>([]);
  const [error, setError] = useState<string | null>(null);
  const stateName = location.state?.stateName;
 
  useEffect(() => {
    if (stateId) {
      const fetchDestinations = async () => {
        try {
          const response = await fetchDestinationsByState(stateId);
          console.log("Fetched destinations:", response.content); // Check this log
          setPlaces(response.content || []);
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("An unexpected error occurred.");
          }
        }
      };
 
      fetchDestinations();
    } else {
      setError("State ID is missing");
    }
  }, [stateId]);
 
  if (error) {
    return <NoData />;
  }
 
  return (
    <div className="destinations-container">
      <div className="country-headline">
        <h1 className="heading">
          Places worth exploring in{" "}
          <span className="bold-heading">{stateName}</span>
        </h1>
      </div>
      <div className="recommendation-list">
        {places.length > 0 ? (
          places.map((place) => (
            <FlippableCard
              key={place.destinationId}
              id={place.destinationId}
              imageUrl={place.imageUrl}
              destinationName={place.destinationName}
              description={place.description}
              rating={place.rating}
            />
          ))
        ) : (
          <NoData />
        )}
      </div>
    </div>
  );
};
 
export default Destinations;