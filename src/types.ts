// src/types.ts
export interface Place {
    stateId: number;
    imageUrl: string;
    stateName: string;
    regionName: string;
  }

  export interface CountryData {
    countryId: number;
    countryName : string;
    imageUrl : string;
  }
  export interface DestinationDetail {
    destinationId: number;
    destinationName: string;
    rating: number;
    imageUrl: string;
    description: string;
  }

  export interface CardProps {
    id: number;
    imageUrl: string;
    placeName: string;
    regionName ?: string;
   
    onClick: (id: number, placeName: string) => void;
  }

  export interface FlipCardProps {
    id: number;
    imageUrl: string;
    destinationName: string;
    description: string;
    rating: number;
    regionName?:string;
    // onClick: (id: number, destinationName: string) => void;
  }
  