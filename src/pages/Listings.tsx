
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchListings } from "@/services/api";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ListingsFilter } from "@/components/ListingsFilter";
import { ListingsGrid } from "@/components/ListingsGrid";
import { CarListing } from "@/types/listing";
import { Loader2, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Listings = () => {
  const [filters, setFilters] = useState({
    brand: "",
    minPrice: "",
    maxPrice: "",
    minYear: "",
    maxYear: "",
    sellerType: "",
  });

  const { data: listings, isLoading, error } = useQuery({
    queryKey: ["listings"],
    queryFn: fetchListings,
    retry: 2
  });

  const filteredListings = listings?.filter((listing) => {
    if (filters.brand && listing.Brand.toLowerCase() !== filters.brand.toLowerCase()) return false;
    if (filters.minPrice && listing["Actual Price"] < Number(filters.minPrice)) return false;
    if (filters.maxPrice && listing["Actual Price"] > Number(filters.maxPrice)) return false;
    if (filters.minYear && listing.Year < Number(filters.minYear)) return false;
    if (filters.maxYear && listing.Year > Number(filters.maxYear)) return false;
    if (filters.sellerType && listing["Seller Type"] !== filters.sellerType) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          <ListingsFilter filters={filters} setFilters={setFilters} />
          {isLoading ? (
            <div className="flex-1 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : error ? (
            <div className="flex-1">
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Failed to load listings. Please try again later.
                </AlertDescription>
              </Alert>
            </div>
          ) : (
            <ListingsGrid listings={filteredListings || []} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Listings;
