import axios from "axios";
import { CarListing, RealEstateListing } from "@/types/listing";

const API_KEY = "L16RARCxMM2DAwg1N1nvgRHQniPZe6UhZAPG54eRVAS8pvMiAwFT";
const baseURL = "https://api.deal-maker.at";

// Create axios instance with custom config
const api = axios.create({
  baseURL,
  headers: {
    "X-API-Key": API_KEY
  }
});

interface AxiosError {
  isAxiosError: boolean;
  response?: {
    data?: any;
  };
}

export const fetchCarListings = async () => {
  try {
    const response = await api.get<CarListing[]>(`/api/car_listings`);

    if (!response.data) {
      throw new Error("No data received from API");
    }
    
    return response.data;
  } catch (error) {
    if ((error as AxiosError).isAxiosError) {
      const errorMessage = error.response?.data 
        ? typeof error.response.data === 'string' 
          ? error.response.data 
          : JSON.stringify(error.response.data)
        : "Failed to fetch car listings";
      throw new Error(errorMessage);
    }
    throw new Error("Failed to fetch car listings");
  }
};

export const fetchRealEstateListings = async () => {
  try {
    const response = await api.get<RealEstateListing[]>(`/api/re_listings`);

    if (!response.data) {
      throw new Error("No data received from API");
    }
    
    return response.data;
  } catch (error) {
    if ((error as AxiosError).isAxiosError) {
      const errorMessage = error.response?.data 
        ? typeof error.response.data === 'string' 
          ? error.response.data 
          : JSON.stringify(error.response.data)
        : "Failed to fetch real estate listings";
      throw new Error(errorMessage);
    }
    throw new Error("Failed to fetch real estate listings");
  }
};

// For backward compatibility
export const fetchListings = fetchCarListings;