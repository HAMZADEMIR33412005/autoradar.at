import axios from "axios";
import { CarListing } from "@/types/listing";

const API_KEY = "L16RARCxMM2DAwg1N1nvgRHQniPZe6UhZAPG54eRVAS8pvMiAwFT";
const baseURL = "https://api.deal-maker.at";

// Create axios instance with custom config
const api = axios.create({
  baseURL,
  headers: {
    "X-API-Key": API_KEY
  }
});

export const fetchListings = async () => {
  try {
    const response = await api.get<CarListing[]>(`/api/best_listings`);

    if (!response.data) {
      throw new Error("No data received from API");
    }
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to fetch listings");
    }
    throw new Error("Failed to fetch listings");
  }
};