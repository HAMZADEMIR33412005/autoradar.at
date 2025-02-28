import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCarListings, fetchRealEstateListings } from "@/services/api";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ListingsFilter } from "@/components/ListingsFilter";
import { ListingsGrid } from "@/components/ListingsGrid";
import { ListingType, CarListing, RealEstateListing } from "@/types/listing";
import { Loader2, AlertTriangle, Car, Home } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface CarFilters {
  brand: string;
  minPrice: string;
  maxPrice: string;
  minYear: string;
  maxYear: string;
  sellerType: string;
}

interface RealEstateFilters {
  propertyType: string;
  minPrice: string;
  maxPrice: string;
  minRooms: string;
  minArea: string;
  sellerType: string;
}

const Listings = () => {
  const [activeTab, setActiveTab] = useState<ListingType>("cars");
  
  const [carFilters, setCarFilters] = useState<CarFilters>({
    brand: "",
    minPrice: "",
    maxPrice: "",
    minYear: "",
    maxYear: "",
    sellerType: "",
  });

  const [realEstateFilters, setRealEstateFilters] = useState<RealEstateFilters>({
    propertyType: "",
    minPrice: "",
    maxPrice: "",
    minRooms: "",
    minArea: "",
    sellerType: "",
  });

  // Car listings query
  const { 
    data: carListings, 
    isLoading: isCarListingsLoading, 
    error: carListingsError 
  } = useQuery({
    queryKey: ["carListings"],
    queryFn: fetchCarListings,
    retry: 2
  });

  // Real estate listings query
  const { 
    data: realEstateListings, 
    isLoading: isRealEstateListingsLoading, 
    error: realEstateListingsError 
  } = useQuery({
    queryKey: ["realEstateListings"],
    queryFn: fetchRealEstateListings,
    retry: 2
  });

  // Debug the received data
  useEffect(() => {
    console.log("Car listings data:", carListings);
    console.log("Car listings loading:", isCarListingsLoading);
    console.log("Car listings error:", carListingsError);
  }, [carListings, isCarListingsLoading, carListingsError]);

  // Filter car listings based on selected filters
  const filteredCarListings = carListings?.filter((listing: CarListing) => {
    // Check if listing has the required properties before filtering
    if (!listing) return false;
    
    if (carFilters.brand && listing.Brand?.toLowerCase() !== carFilters.brand.toLowerCase()) return false;
    if (carFilters.minPrice && listing["Actual Price"] < Number(carFilters.minPrice)) return false;
    if (carFilters.maxPrice && listing["Actual Price"] > Number(carFilters.maxPrice)) return false;
    if (carFilters.minYear && listing.Year < Number(carFilters.minYear)) return false;
    if (carFilters.maxYear && listing.Year > Number(carFilters.maxYear)) return false;
    if (carFilters.sellerType && listing["Seller Type"] !== carFilters.sellerType) return false;
    return true;
  });

  // Debug filtered listings
  useEffect(() => {
    console.log("Filtered car listings:", filteredCarListings);
    console.log("Number of filtered car listings:", filteredCarListings?.length || 0);
  }, [filteredCarListings]);

  // Filter real estate listings based on selected filters
  const filteredRealEstateListings = realEstateListings?.filter((listing: RealEstateListing) => {
    if (realEstateFilters.propertyType && 
        listing["Property Type"].toLowerCase() !== realEstateFilters.propertyType.toLowerCase()) return false;
    if (realEstateFilters.minPrice && listing["Actual Price"] < Number(realEstateFilters.minPrice)) return false;
    if (realEstateFilters.maxPrice && listing["Actual Price"] > Number(realEstateFilters.maxPrice)) return false;
    if (realEstateFilters.minRooms && listing.Rooms < Number(realEstateFilters.minRooms)) return false;
    if (realEstateFilters.minArea && listing.Area < Number(realEstateFilters.minArea)) return false;
    if (realEstateFilters.sellerType && listing["Seller Type"] !== realEstateFilters.sellerType) return false;
    return true;
  });

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value as ListingType);
  };

  // Determine if loading or error based on active tab
  const isLoading = activeTab === "cars" ? isCarListingsLoading : isRealEstateListingsLoading;
  const error = activeTab === "cars" ? carListingsError : realEstateListingsError;

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 bg-background border-b border-gray-800">
        <Navbar />
        <div className="container mx-auto px-4 py-4">
          <Tabs defaultValue="cars" onValueChange={handleTabChange} className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <h1 className="text-3xl font-bold">Listings</h1>
              <TabsList className="bg-background border border-gray-800">
                <TabsTrigger 
                  value="cars"
                  className={cn(
                    "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
                    "flex items-center gap-2"
                  )}
                >
                  <Car className="w-4 h-4" /> Cars
                </TabsTrigger>
                <TabsTrigger 
                  value="realEstate"
                  className={cn(
                    "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
                    "flex items-center gap-2"
                  )}
                >
                  <Home className="w-4 h-4" /> Real Estate
                </TabsTrigger>
              </TabsList>
            </div>
          </Tabs>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="w-full">
          <TabsContent value="cars" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
              <ListingsFilter 
                filters={carFilters} 
                setFilters={setCarFilters} 
                listingType="cars" 
              />
              <div className="min-h-[400px]">
                {isCarListingsLoading ? (
                  <div className="flex-1 flex items-center justify-center h-full">
                    <Loader2 className="w-8 h-8 animate-spin" />
                  </div>
                ) : carListingsError ? (
                  <div className="flex-1">
                    <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        Failed to load car listings. Please try again later.
                      </AlertDescription>
                    </Alert>
                  </div>
                ) : filteredCarListings && filteredCarListings.length > 0 ? (
                  <ListingsGrid 
                    listings={filteredCarListings} 
                    listingType="cars" 
                  />
                ) : (
                  <div className="flex-1 flex items-center justify-center h-64">
                    <div className="text-center">
                      <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                      <p className="text-lg font-medium">No car listings found</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Try adjusting your filters or check back later.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="realEstate" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
              <ListingsFilter 
                filters={realEstateFilters} 
                setFilters={setRealEstateFilters} 
                listingType="realEstate" 
              />
              <div className="min-h-[400px]">
                {isRealEstateListingsLoading ? (
                  <div className="flex-1 flex items-center justify-center h-full">
                    <Loader2 className="w-8 h-8 animate-spin" />
                  </div>
                ) : realEstateListingsError ? (
                  <div className="flex-1">
                    <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        Failed to load real estate listings. Please try again later.
                      </AlertDescription>
                    </Alert>
                  </div>
                ) : filteredRealEstateListings && filteredRealEstateListings.length > 0 ? (
                  <ListingsGrid 
                    listings={filteredRealEstateListings} 
                    listingType="realEstate" 
                  />
                ) : (
                  <div className="flex-1 flex items-center justify-center h-64">
                    <div className="text-center">
                      <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                      <p className="text-lg font-medium">No real estate listings found</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Try adjusting your filters or check back later.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Listings;
