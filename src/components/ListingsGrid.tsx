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
        <p className="text-gray-400">Keine Einträge gefunden, die Ihren Kriterien entsprechen.</p>
      </div>
    );
  }

  // Debug output - uncomment if needed to troubleshoot
  // console.log(`Rendering ${listings.length} ${listingType} listings:`, listings);

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
              <div className="aspect-video bg-surface-secondary rounded-lg mb-4 overflow-hidden bg-gray-800/50 flex items-center justify-center">
                {listing["Image File"] ? (
                  <img 
                    src={listing["Image File"]} 
                    alt={listing.Name || `${listing.Brand} ${listing.Model}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '';
                      e.currentTarget.parentElement!.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center">
                          <Car class="w-6 h-6 mr-2 text-primary" />
                          <span class="text-gray-300 font-medium">${listing.Brand || 'Unbekannt'} ${listing.Model || ''}</span>
                        </div>
                      `;
                    }}
                  />
                ) : (
                  <>
                    <Car className="w-6 h-6 mr-2 text-primary" />
                    <span className="text-gray-300 font-medium">{listing.Brand || 'Unbekannt'} {listing.Model || ''}</span>
                  </>
                )}
              </div>
              <h3 className="text-lg font-semibold mb-3 line-clamp-2 min-h-[3.5rem]">{listing.Name || `${listing.Brand} ${listing.Model}`}</h3>
              <div className="space-y-3">
                <p className="text-2xl font-bold text-primary">
                  {typeof listing["Actual Price"] === 'number' ? formatPrice(listing["Actual Price"]) : 'Preis auf Anfrage'}
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-gray-900/30 rounded-lg p-2">
                    <p className="text-gray-400">Baujahr</p>
                    <p className="font-medium">{listing.Year || 'k.A.'}</p>
                  </div>
                  <div className="bg-gray-900/30 rounded-lg p-2">
                    <p className="text-gray-400">Kilometerstand</p>
                    <p className="font-medium">{typeof listing.Mileage === 'number' ? formatMileage(listing.Mileage) : 'k.A.'}</p>
                  </div>
                  <div className="bg-gray-900/30 rounded-lg p-2">
                    <p className="text-gray-400">PS</p>
                    <p className="font-medium">{typeof listing.Horsepower === 'number' ? `${Math.round(listing.Horsepower)} PS` : 'k.A.'}</p>
                  </div>
                  <div className="bg-gray-900/30 rounded-lg p-2">
                    <p className="text-gray-400">Verkäufer</p>
                    <p className="font-medium">{listing["Seller Type"] || 'k.A.'}</p>
                  </div>
                </div>
                {listing.Location && (
                  <p className="text-sm text-gray-400 break-words">
                    📍 {listing.Location}
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button 
                className="w-full"
                onClick={() => navigate(`/listings/cars/${index}`)}
              >
                <Eye className="w-4 h-4 mr-2" />
                Details ansehen
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
                {listing["Image File"] ? (
                  <img 
                    src={listing["Image File"]} 
                    alt={listing.Name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '';
                      e.currentTarget.parentElement!.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center bg-gray-800/50 text-center p-4">
                          <Home class="w-6 h-6 mr-2 text-primary" />
                          <span class="text-gray-300 font-medium">${listing["House type"] || 'Immobilie'}</span>
                        </div>
                      `;
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-800/50 text-center p-4">
                    <Home className="w-6 h-6 mr-2 text-primary" />
                    <span className="text-gray-300 font-medium">{listing["House type"] || 'Immobilie'}</span>
                  </div>
                )}
              </div>
              <h3 className="text-lg font-semibold mb-3 line-clamp-2 min-h-[3.5rem]">{listing.Name}</h3>
              <div className="space-y-3">
                <p className="text-2xl font-bold text-primary">
                  {formatPrice(listing["Actual Price"])}
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-gray-900/30 rounded-lg p-2">
                    <p className="text-gray-400">Fläche</p>
                    <p className="font-medium">{formatArea(listing["Size (sqm)"])}</p>
                  </div>
                  <div className="bg-gray-900/30 rounded-lg p-2">
                    <p className="text-gray-400">Zimmer</p>
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
                Details ansehen
              </Button>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
};
