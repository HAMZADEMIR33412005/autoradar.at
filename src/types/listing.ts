export interface CarListing {
  "Actual Price": number;
  "Ad Link": string;
  "Brand": string;
  "Horsepower": number;
  "Image File": string;
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
  "House type": string;
  "Location": string;
  "Name": string;
  "Predicted Price": number;
  "Property Type": number;
  "Rooms": number;
  "Seller Type": string;
  "Size (sqm)": number;
  "Image File"?: string;
}

export type ListingType = "cars" | "realEstate";
