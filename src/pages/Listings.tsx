import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCarListings, fetchRealEstateListings } from "@/services/api";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ListingsFilter } from "@/components/ListingsFilter";
import { ListingsGrid } from "@/components/ListingsGrid";
import { ListingType, CarListing, RealEstateListing } from "@/types/listing";
import { Loader2, AlertTriangle, Car, Home, Filter, X, ChevronDown } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

interface CarFilters {
  brand: string;
  minPrice: string;
  maxPrice: string;
  minYear: string;
  maxYear: string;
  minKm: string;
  maxKm: string;
  sellerType: string;
  qualified: string; // "all", "qualified", "unqualified"
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
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [visibleCount, setVisibleCount] = useState(30); // Number of listings to show initially
  const [loadingMore, setLoadingMore] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null); // Reference for intersection observer
  
  const [carFilters, setCarFilters] = useState<CarFilters>({
    brand: "",
    minPrice: "",
    maxPrice: "",
    minYear: "",
    maxYear: "",
    minKm: "",
    maxKm: "",
    sellerType: "",
    qualified: "all",
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
  const filteredCarListings = React.useMemo(() => {
    if (!carListings) return [];
    
    console.log(`Filtering ${carListings.length} car listings with filters:`, carFilters);
    
    return carListings.filter((listing: CarListing) => {
      // Check if listing has the required properties before filtering
      if (!listing) return false;
      
      // Improved brand filter: checks brand and model for partial matches
      if (carFilters.brand) {
        const searchTerm = carFilters.brand.toLowerCase().trim();
        const brand = (listing.Brand || '').toLowerCase();
        const model = (listing.Model || '').toLowerCase();
        const name = (listing.Name || '').toLowerCase();
        
        // Check if search term appears in brand, model or full name
        const brandMatch = brand.includes(searchTerm);
        const modelMatch = model.includes(searchTerm);
        const nameMatch = name.includes(searchTerm);
        
        if (!brandMatch && !modelMatch && !nameMatch) return false;
      }
      
      if (carFilters.minPrice && listing["Actual Price"] < Number(carFilters.minPrice)) return false;
      if (carFilters.maxPrice && listing["Actual Price"] > Number(carFilters.maxPrice)) return false;
      if (carFilters.minYear && listing.Year < Number(carFilters.minYear)) return false;
      if (carFilters.maxYear && listing.Year > Number(carFilters.maxYear)) return false;
      if (carFilters.minKm && listing.Mileage < Number(carFilters.minKm)) return false;
      if (carFilters.maxKm && listing.Mileage > Number(carFilters.maxKm)) return false;
      
      // Improved seller type filter for partial matches
      if (carFilters.sellerType) {
        const sellerSearchTerm = carFilters.sellerType.toLowerCase().trim();
        const sellerType = (listing["Seller Type"] || '').toLowerCase();
        
        if (!sellerType.includes(sellerSearchTerm)) return false;
      }
      
      // Filter by qualified status
      if (carFilters.qualified === "qualified" && listing.Qualified !== 1) return false;
      if (carFilters.qualified === "unqualified" && listing.Qualified !== 0) return false;
      
      return true;
    });
  }, [carListings, carFilters]);

  // Debug filtered listings
  useEffect(() => {
    console.log("Filtered car listings:", filteredCarListings);
    console.log("Number of filtered car listings:", filteredCarListings?.length || 0);
  }, [filteredCarListings]);

  // Filter real estate listings based on selected filters
  const filteredRealEstateListings = React.useMemo(() => {
    if (!realEstateListings) return [];
    
    console.log(`Filtering ${realEstateListings.length} real estate listings with filters:`, realEstateFilters);
    
    return realEstateListings.filter((listing: RealEstateListing) => {
      // Check if listing has the required properties before filtering
      if (!listing) return false;
      
      // Property Type remains as exact match since it's a numeric type
      if (realEstateFilters.propertyType && listing["Property Type"].toString() !== realEstateFilters.propertyType) return false;
      
      // Numeric filters
      if (realEstateFilters.minPrice && listing["Actual Price"] < Number(realEstateFilters.minPrice)) return false;
      if (realEstateFilters.maxPrice && listing["Actual Price"] > Number(realEstateFilters.maxPrice)) return false;
      if (realEstateFilters.minRooms && listing.Rooms < Number(realEstateFilters.minRooms)) return false;
      if (realEstateFilters.minArea && listing["Size (sqm)"] < Number(realEstateFilters.minArea)) return false;
      
      // Improved seller type filter for partial matches
      if (realEstateFilters.sellerType) {
        const sellerSearchTerm = realEstateFilters.sellerType.toLowerCase().trim();
        const sellerType = (listing["Seller Type"] || '').toLowerCase();
        
        // Check if search term is included in seller type
        if (!sellerType.includes(sellerSearchTerm)) return false;
      }
      
      return true;
    });
  }, [realEstateListings, realEstateFilters]);

  // Setup intersection observer for lazy loading
  useEffect(() => {
    // Reset visible count when tab or filters change
    setVisibleCount(30);
  }, [activeTab, carFilters, realEstateFilters]);

  // Intersection observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setLoadingMore(true);
          setTimeout(() => {
            setVisibleCount((prev) => prev + 30);
            setLoadingMore(false);
          }, 500); // Small delay to show loading indicator
        }
      },
      { threshold: 0.1 }
    );

    const currentLoadMoreRef = loadMoreRef.current;
    if (currentLoadMoreRef) {
      observer.observe(currentLoadMoreRef);
    }

    return () => {
      if (currentLoadMoreRef) {
        observer.unobserve(currentLoadMoreRef);
      }
    };
  }, [filteredCarListings, filteredRealEstateListings]);

  // Get the current filtered listings based on active tab
  const currentListings = activeTab === 'cars' ? filteredCarListings : filteredRealEstateListings;
  
  // Slice the listings to show only the visible amount
  const visibleListings = currentListings?.slice(0, visibleCount) || [];

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value as ListingType);
  };

  // Toggle filter visibility for mobile
  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  // Determine if loading or error based on active tab
  const isLoading = activeTab === "cars" ? isCarListingsLoading : isRealEstateListingsLoading;
  const error = activeTab === "cars" ? carListingsError : realEstateListingsError;

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 bg-background border-b border-gray-800">
        <Navbar />
        <div className="container mx-auto px-4 py-2 sm:py-4">
          <Tabs defaultValue="cars" onValueChange={handleTabChange} className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4 mt-20">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-0">Inserate</h1>
              <TabsList className="bg-background border border-gray-800 w-full sm:w-auto">
                <TabsTrigger 
                  value="cars"
                  className={cn(
                    "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
                    "flex items-center gap-2 flex-1 sm:flex-initial"
                  )}
                >
                  <Car className="w-4 h-4" /> Autos
                </TabsTrigger>
                <TabsTrigger 
                  value="realEstate"
                  className={cn(
                    "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
                    "flex items-center gap-2 flex-1 sm:flex-initial"
                  )}
                >
                  <Home className="w-4 h-4" /> Immobilien
                </TabsTrigger>
              </TabsList>
            </div>
            
            <div className="container mx-auto px-0 py-4 sm:py-8">
              <div className="w-full">
                <Button 
                  variant="outline"
                  className="flex items-center gap-2 mb-4 w-full sm:hidden"
                  onClick={toggleFilterVisibility}
                >
                  {isFilterVisible ? (
                    <>
                      <X className="h-4 w-4" /> Filter ausblenden
                    </>
                  ) : (
                    <>
                      <Filter className="h-4 w-4" /> Filter anzeigen
                    </>
                  )}
                </Button>

                <TabsContent value="cars" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-4 sm:gap-6 items-start">
                    <div className={cn(
                      "transition-all duration-300 overflow-hidden",
                      isFilterVisible ? "max-h-[1000px] mb-4" : "max-h-0 md:max-h-[1000px]"
                    )}>
                      <ListingsFilter 
                      filters={carFilters} 
                      setFilters={setCarFilters} 
                      listingType="cars" 
                      />
                    </div>
                    <div className="min-h-[300px]">
                      {isCarListingsLoading ? (
                        <div className="flex items-center justify-center h-full min-h-[200px]">
                          <Loader2 className="w-8 h-8 animate-spin" />
                        </div>
                      ) : carListingsError ? (
                        <div>
                          <Alert variant="destructive">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription>
                              Fehler beim Laden der Autoinserate. Bitte versuchen Sie es später erneut.
                            </AlertDescription>
                          </Alert>
                        </div>
                      ) : visibleListings && visibleListings.length > 0 ? (
                        <ListingsGrid 
                          listings={visibleListings} 
                          listingType="cars" 
                        />
                      ) : (
                        <div className="flex items-center justify-center py-8 px-2 min-h-[200px]">
                          <div className="text-center">
                            <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                            <p className="text-lg font-medium">Keine Autoinserate gefunden</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Passen Sie Ihre Filter an oder schauen Sie später wieder vorbei.
                            </p>
                          </div>
                        </div>
                      )}
                      {/* Loading indicator */}
                      {loadingMore && (
                        <div className="flex justify-center items-center py-6">
                          <Loader2 className="w-6 h-6 animate-spin mr-2" />
                          <span>Weitere Inserate werden geladen...</span>
                        </div>
                      )}
                      {/* "Load More" button shown when there are more listings to load */}
                      {!loadingMore && visibleListings.length > 0 && visibleListings.length < currentListings.length && (
                        <div className="flex justify-center mt-6 mb-6">
                          <Button 
                            variant="outline" 
                            onClick={() => setVisibleCount(prev => prev + 30)}
                            className="flex items-center gap-2"
                          >
                            <ChevronDown className="h-4 w-4" />
                            Mehr anzeigen ({visibleListings.length} von {currentListings.length})
                          </Button>
                        </div>
                      )}
                      <div ref={loadMoreRef} className="h-10"></div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="realEstate" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-4 sm:gap-6 items-start">
                    <div className={cn(
                      "transition-all duration-300 overflow-hidden",
                      isFilterVisible ? "max-h-[1000px] mb-4" : "max-h-0 md:max-h-[1000px]"
                    )}>
                      <ListingsFilter 
                        filters={realEstateFilters} 
                        setFilters={setRealEstateFilters} 
                        listingType="realEstate" 
                      />
                    </div>
                    <div className="min-h-[300px]">
                      {isRealEstateListingsLoading ? (
                        <div className="flex items-center justify-center h-full min-h-[200px]">
                          <Loader2 className="w-8 h-8 animate-spin" />
                        </div>
                      ) : realEstateListingsError ? (
                        <div>
                          <Alert variant="destructive">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription>
                              Fehler beim Laden der Immobilieninserate. Bitte versuchen Sie es später erneut.
                            </AlertDescription>
                          </Alert>
                        </div>
                      ) : visibleListings && visibleListings.length > 0 ? (
                        <ListingsGrid 
                          listings={visibleListings} 
                          listingType="realEstate" 
                        />
                      ) : (
                        <div className="flex items-center justify-center py-8 px-2 min-h-[200px]">
                          <div className="text-center">
                            <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                            <p className="text-lg font-medium">Keine Immobilieninserate gefunden</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Passen Sie Ihre Filter an oder schauen Sie später wieder vorbei.
                            </p>
                          </div>
                        </div>
                      )}
                      {/* Loading indicator */}
                      {loadingMore && (
                        <div className="flex justify-center items-center py-6">
                          <Loader2 className="w-6 h-6 animate-spin mr-2" />
                          <span>Weitere Inserate werden geladen...</span>
                        </div>
                      )}
                      {/* "Load More" button shown when there are more listings to load */}
                      {!loadingMore && visibleListings.length > 0 && visibleListings.length < currentListings.length && (
                        <div className="flex justify-center mt-6 mb-6">
                          <Button 
                            variant="outline" 
                            onClick={() => setVisibleCount(prev => prev + 30)}
                            className="flex items-center gap-2"
                          >
                            <ChevronDown className="h-4 w-4" />
                            Mehr anzeigen ({visibleListings.length} von {currentListings.length})
                          </Button>
                        </div>
                      )}
                      <div ref={loadMoreRef} className="h-10"></div>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Listings;
