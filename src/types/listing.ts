export interface CarListing {
  "Actual Price": number;
  "Ad Link": string;
  "Brand": string;
  "Horsepower": number;
  "Location": string;
  "Mileage": number;
  "Model": string;
  "Name": string;
  "Predicted Price": number;
  "Qualified": number;
  "Seller Type": string;
  "Year": number;
}

export interface RealEstateListing {
  "Actual Price": number;
  "Ad Link": string;
  "Location": string;
  "Name": string;
  "Area": number; // in square meters
  "Property Type": string; // apartment, house, etc.
  "Rooms": number;
  "Year Built": number;
  "Seller Type": string;
}

export type ListingType = "cars" | "realEstate";
