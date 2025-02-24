
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchListings } from "@/services/api";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ExternalLink, Loader2 } from "lucide-react";

const ListingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { data: listings, isLoading } = useQuery({
    queryKey: ["listings"],
    queryFn: fetchListings,
  });

  const listing = listings?.[Number(id)];

  const formatPrice = (price: number) => {
    return `€${price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  const formatMileage = (mileage: number) => {
    return `${Math.round(mileage).toLocaleString()} km`;
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
        <p>Listing not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/listings")}
          className="mb-6 hover:bg-white/5"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Listings
        </Button>

        <Card className="p-8 bg-white/5 backdrop-blur-lg border border-white/10">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="aspect-video bg-surface-secondary rounded-lg overflow-hidden">
              <div className="w-full h-full flex items-center justify-center bg-gray-800/50 text-center p-4">
                <span className="text-gray-300 font-medium text-lg">
                  {listing.Brand} {listing.Model}
                </span>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-3">{listing.Name}</h1>
                <p className="text-3xl md:text-4xl font-bold text-primary">
                  {formatPrice(listing["Actual Price"])}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900/30 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">Year</p>
                  <p className="font-medium text-lg">{listing.Year}</p>
                </div>
                <div className="bg-gray-900/30 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">Mileage</p>
                  <p className="font-medium text-lg">{formatMileage(listing.Mileage)}</p>
                </div>
                <div className="bg-gray-900/30 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">Horsepower</p>
                  <p className="font-medium text-lg">{Math.round(listing.Horsepower)} hp</p>
                </div>
                <div className="bg-gray-900/30 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">Seller Type</p>
                  <p className="font-medium text-lg">{listing["Seller Type"]}</p>
                </div>
              </div>

              <div className="bg-gray-900/30 rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-1">Location</p>
                <p className="font-medium text-lg">{listing.Location}</p>
              </div>

              <div className="pt-4">
                <Button 
                  className="w-full bg-primary hover:bg-primary-hover text-lg py-6"
                  onClick={() => window.open(listing["Ad Link"], "_blank")}
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  View Original Listing
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
