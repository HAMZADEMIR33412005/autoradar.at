import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CarListing, RealEstateListing, ListingType } from "@/types/listing";
import { Eye, Car, Home } from "lucide-react";

interface ListingsGridProps {
  listings: CarListing[] | RealEstateListing[];
  listingType: ListingType;
}

export const ListingsGrid = ({ listings, listingType }: ListingsGridProps) => {
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return `€${price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  const formatMileage = (mileage: number) => {
    return `${Math.round(mileage).toLocaleString()} km`;
  };

  const formatArea = (area: number) => {
    return `${area} m²`;
  };

  if (listings.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-400">No listings found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {listingType === "cars" ? (
        // Car listings
        (listings as CarListing[]).map((listing, index) => (
          <Card 
            key={index} 
            className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-white/5 backdrop-blur-lg border border-white/10"
          >
            <CardContent className="p-6">
              <div className="aspect-video bg-surface-secondary rounded-lg mb-4 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center bg-gray-800/50 text-center p-4">
                  <Car className="w-6 h-6 mr-2 text-primary" />
                  <span className="text-gray-300 font-medium">{listing.Brand} {listing.Model}</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-3 line-clamp-2 min-h-[3.5rem]">{listing.Name}</h3>
              <div className="space-y-3">
                <p className="text-2xl font-bold text-primary">
                  {formatPrice(listing["Actual Price"])}
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-gray-900/30 rounded-lg p-2">
                    <p className="text-gray-400">Year</p>
                    <p className="font-medium">{listing.Year}</p>
                  </div>
                  <div className="bg-gray-900/30 rounded-lg p-2">
                    <p className="text-gray-400">Mileage</p>
                    <p className="font-medium">{formatMileage(listing.Mileage)}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400 break-words">
                  📍 {listing.Location}
                </p>
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button 
                className="w-full bg-primary hover:bg-primary-hover"
                onClick={() => navigate(`/listings/cars/${index}`)}
              >
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))
      ) : (
        // Real Estate listings
        (listings as RealEstateListing[]).map((listing, index) => (
          <Card 
            key={index} 
            className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-white/5 backdrop-blur-lg border border-white/10"
          >
            <CardContent className="p-6">
              <div className="aspect-video bg-surface-secondary rounded-lg mb-4 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center bg-gray-800/50 text-center p-4">
                  <Home className="w-6 h-6 mr-2 text-primary" />
                  <span className="text-gray-300 font-medium">{listing["Property Type"]}</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-3 line-clamp-2 min-h-[3.5rem]">{listing.Name}</h3>
              <div className="space-y-3">
                <p className="text-2xl font-bold text-primary">
                  {formatPrice(listing["Actual Price"])}
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-gray-900/30 rounded-lg p-2">
                    <p className="text-gray-400">Area</p>
                    <p className="font-medium">{formatArea(listing.Area)}</p>
                  </div>
                  <div className="bg-gray-900/30 rounded-lg p-2">
                    <p className="text-gray-400">Rooms</p>
                    <p className="font-medium">{listing.Rooms}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400 break-words">
                  📍 {listing.Location}
                </p>
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button 
                className="w-full bg-primary hover:bg-primary-hover"
                onClick={() => navigate(`/listings/realestate/${index}`)}
              >
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
};
