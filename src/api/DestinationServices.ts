import { Place, DestinationDetail, CountryData } from "../types";
import { Destination } from "../pages/Destinations/Destinations";
import { countdownValueType } from "antd/es/statistic/utils";

const API_URL = import.meta.env.VITE_API_URL;

// Generic function for making API requests
async function apiRequest<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status >= 400 && response.status < 500) {
        throw new Error(`Client error: ${response.status} - ${response.statusText}`);
      } else if (response.status >= 500) {
        throw new Error(`Server error: ${response.status} - ${response.statusText}`);
      }
    }

    const data = await response.json();

    // Check if data and data.data are defined
    if (!data || !data.data) {
      throw new Error("Unexpected API response structure");
    }

    return data?.data;
  } catch (error) {
    console.error(`Error occurred during API request to ${url}:`, error);
    throw error;
  }
}



// Fetch countries with enhanced error handling
export async function fetchCountries(): Promise< CountryData[] > {
  const url = `${API_URL}/v1/countries`;
  // console.log(`Fetching  countries from: ${url}`);
  return await apiRequest< CountryData[]>(url);
}


// Fetch states by country with enhanced error handling
export async function fetchStatesByCountry(countryId: string, page = 0, size = 8): Promise< Place[] > {
  const url = `${API_URL}/v1/states/${countryId}`;

  return await apiRequest< Place[] >(url); // Ensure it returns the correct type
}

// Fetch destinations by state with enhanced error handling
export async function fetchDestinationsByState(stateId: string, page = 0, size = 8): Promise<{  content : Destination[] }> {
  const url = `${API_URL}/v1/destinations/${stateId}?page=${page}&size=${size}`;
  // console.log(`Fetching destinations for state ${stateId} from: ${url}`);
  return await apiRequest<{  content : Destination[] }>(url); // Propagate the error to the caller
}



