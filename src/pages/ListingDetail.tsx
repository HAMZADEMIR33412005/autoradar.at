import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCarListings, fetchRealEstateListings } from "@/services/api";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ExternalLink, Loader2, Car, Home } from "lucide-react";
import { CarListing, RealEstateListing } from "@/types/listing";

const ListingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const path = window.location.pathname;
  const isCarListing = path.includes('/cars/');
  
  // Query for car listings if the route is for cars
  const { 
    data: carListings, 
    isLoading: isCarListingsLoading 
  } = useQuery({
    queryKey: ["carListings"],
    queryFn: fetchCarListings,
    enabled: isCarListing
  });

  // Query for real estate listings if the route is for real estate
  const { 
    data: realEstateListings, 
    isLoading: isRealEstateListingsLoading 
  } = useQuery({
    queryKey: ["realEstateListings"],
    queryFn: fetchRealEstateListings,
    enabled: !isCarListing
  });

  const isLoading = isCarListing ? isCarListingsLoading : isRealEstateListingsLoading;
  
  // Get the appropriate listing based on the route type
  const listing = isCarListing 
    ? carListings?.[Number(id)] as CarListing 
    : realEstateListings?.[Number(id)] as RealEstateListing;

  const formatPrice = (price: number) => {
    return `€${price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  const formatMileage = (mileage: number) => {
    return `${Math.round(mileage).toLocaleString()} km`;
  };

  const formatArea = (area: number) => {
    return `${area} m²`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Inserat nicht gefunden</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mt-6 md:mt-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/listings")}
            className="mb-6 hover:bg-white/5"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zurück zur Übersicht
          </Button>
        </div>
        <Card className="p-8 bg-white/5 backdrop-blur-lg border border-white/10">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="aspect-video bg-surface-secondary rounded-lg overflow-hidden">
              <div className="w-full h-full flex items-center justify-center bg-gray-800/50 text-center p-4">
                {isCarListing ? (
                  <>
                    <Car className="w-6 h-6 mr-2 text-primary" />
                    <span className="text-gray-300 font-medium text-lg">
                      {(listing as CarListing).Brand} {(listing as CarListing).Model}
                    </span>
                  </>
                ) : (
                  <>
                    <Home className="w-6 h-6 mr-2 text-primary" />
                    <span className="text-gray-300 font-medium text-lg">
                      {(listing as RealEstateListing)["Property Type"]}
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-3">{listing.Name}</h1>
                <p className="text-3xl md:text-4xl font-bold text-primary">
                  {formatPrice(listing["Actual Price"])}
                </p>
              </div>

              {isCarListing ? (
                // Car details
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-900/30 rounded-lg p-4">
                    <p className="text-sm text-gray-400 mb-1">Baujahr</p>
                    <p className="font-medium text-lg">{(listing as CarListing).Year}</p>
                  </div>
                  <div className="bg-gray-900/30 rounded-lg p-4">
                    <p className="text-sm text-gray-400 mb-1">Kilometerstand</p>
                    <p className="font-medium text-lg">{formatMileage((listing as CarListing).Mileage)}</p>
                  </div>
                  <div className="bg-gray-900/30 rounded-lg p-4">
                    <p className="text-sm text-gray-400 mb-1">PS</p>
                    <p className="font-medium text-lg">{Math.round((listing as CarListing).Horsepower)} PS</p>
                  </div>
                  <div className="bg-gray-900/30 rounded-lg p-4">
                    <p className="text-sm text-gray-400 mb-1">Marke/Modell</p>
                    <p className="font-medium text-lg">{(listing as CarListing).Brand} {(listing as CarListing).Model}</p>
                  </div>
                </div>
              ) : (
                // Real Estate details
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-900/30 rounded-lg p-4">
                    <p className="text-sm text-gray-400 mb-1">Objekttyp</p>
                    <p className="font-medium text-lg">{(listing as RealEstateListing)["Property Type"]}</p>
                  </div>
                  <div className="bg-gray-900/30 rounded-lg p-4">
                    <p className="text-sm text-gray-400 mb-1">Fläche</p>
                    <p className="font-medium text-lg">{formatArea((listing as RealEstateListing).Area)}</p>
                  </div>
                  <div className="bg-gray-900/30 rounded-lg p-4">
                    <p className="text-sm text-gray-400 mb-1">Zimmer</p>
                    <p className="font-medium text-lg">{(listing as RealEstateListing).Rooms}</p>
                  </div>
                  <div className="bg-gray-900/30 rounded-lg p-4">
                    <p className="text-sm text-gray-400 mb-1">Baujahr</p>
                    <p className="font-medium text-lg">{(listing as RealEstateListing)["Year Built"]}</p>
                  </div>
                </div>
              )}

              <div className="bg-gray-900/30 rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-1">Standort</p>
                <p className="font-medium text-lg">{listing.Location}</p>
              </div>

              <div className="bg-gray-900/30 rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-1">Verkäufertyp</p>
                <p className="font-medium text-lg">{listing["Seller Type"]}</p>
              </div>

              <div className="pt-4">
                <Button 
                  className="w-full bg-primary hover:bg-primary-hover text-lg py-6"
                  onClick={() => window.open(listing["Ad Link"], "_blank")}
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Originalinserat ansehen
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default ListingDetail;
