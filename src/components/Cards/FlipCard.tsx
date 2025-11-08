import React, { useState } from "react";
import "./FlipCard.css"; // Ensure styles are included

interface FlippableCardProps {
  id: number;
  imageUrl: string;
  destinationName: string;
  description: string;
  rating: number;
}

const FlippableCard: React.FC<FlippableCardProps> = ({
  imageUrl,
  destinationName,
  description,
  rating,
}) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div
      className={`flippable-card ${flipped ? "flipped" : ""}`}
      onClick={handleFlip}
    >
      <div className="flippable-card-inner">
        <div className="flippable-card-front">
          <img
            className="destination-card-img"
            src={imageUrl}
            alt={destinationName}
          />
          <div className="destination-card-body">
            <h4 className="destination-card-title">{destinationName}</h4>
          </div>
        </div>
        <div className="flippable-card-back">
          <div className="destination-card-body">
            <h4 className="destination-card-title">{destinationName}</h4>
            <p>{description}</p>
            <p>Rating: {rating}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlippableCard;
