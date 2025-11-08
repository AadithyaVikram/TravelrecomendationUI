import React from 'react';
import './Cards.css';
import { CardProps } from '../../types';

 
const Cards: React.FC<CardProps> = ({
  id,
  imageUrl,
  placeName,
  regionName,
  onClick,
}) => {
  return (
    <div className="country-card" onClick={() => onClick(id, placeName)}>
      <img className="country-card-img" src={imageUrl} alt={placeName} />
      <div className="country-card-body">
        <h5 className="continent-card-title">{(regionName!=="") ? regionName : "Country"}</h5>
        <h4 className="country-card-title">{placeName}</h4>
      </div>
    </div>
  );
};
export default Cards;
 
