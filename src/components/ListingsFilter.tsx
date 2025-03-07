import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ListingType } from "@/types/listing";

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

type Filters = CarFilters | RealEstateFilters;

interface FilterProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  listingType: ListingType;
}

export const ListingsFilter = ({ filters, setFilters, listingType }: FilterProps) => {
  const resetFilters = () => {
    if (listingType === 'cars') {
      setFilters({
        brand: "",
        minPrice: "",
        maxPrice: "",
        minYear: "",
        maxYear: "",
        sellerType: "",
      });
    } else {
      setFilters({
        propertyType: "",
        minPrice: "",
        maxPrice: "",
        minRooms: "",
        minArea: "",
        sellerType: "",
      });
    }
  };

  return (
    <Card className="w-full md:w-64 p-4 space-y-4 h-fit md:sticky top-24 md:self-start">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button variant="ghost" size="sm" onClick={resetFilters}>
          Reset
        </Button>
      </div>

      <div className="space-y-4">
        {listingType === 'cars' ? (
          // Car filters
          <>
            <div className="space-y-2">
              <Label>Brand</Label>
              <Input
                placeholder="Enter brand"
                value={(filters as CarFilters).brand}
                onChange={(e) => setFilters({ ...(filters as CarFilters), brand: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Price Range</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Min"
                  type="number"
                  value={(filters as CarFilters).minPrice}
                  onChange={(e) => setFilters({ ...(filters as CarFilters), minPrice: e.target.value })}
                />
                <Input
                  placeholder="Max"
                  type="number"
                  value={(filters as CarFilters).maxPrice}
                  onChange={(e) => setFilters({ ...(filters as CarFilters), maxPrice: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Year Range</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Min"
                  type="number"
                  value={(filters as CarFilters).minYear}
                  onChange={(e) => setFilters({ ...(filters as CarFilters), minYear: e.target.value })}
                />
                <Input
                  placeholder="Max"
                  type="number"
                  value={(filters as CarFilters).maxYear}
                  onChange={(e) => setFilters({ ...(filters as CarFilters), maxYear: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Seller Type</Label>
              <Input
                placeholder="Enter seller type"
                value={(filters as CarFilters).sellerType}
                onChange={(e) => setFilters({ ...(filters as CarFilters), sellerType: e.target.value })}
              />
            </div>
          </>
        ) : (
          // Real Estate filters
          <>
            <div className="space-y-2">
              <Label>Property Type</Label>
              <Input
                placeholder="Enter property type (0 for house, 1 for apartment)"
                type="number"
                min="0"
                max="1"
                value={(filters as RealEstateFilters).propertyType}
                onChange={(e) => setFilters({ ...(filters as RealEstateFilters), propertyType: e.target.value })}
              />
              <p className="text-xs text-gray-400">0 = House, 1 = Apartment</p>
            </div>

            <div className="space-y-2">
              <Label>Price Range</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Min"
                  type="number"
                  value={(filters as RealEstateFilters).minPrice}
                  onChange={(e) => setFilters({ ...(filters as RealEstateFilters), minPrice: e.target.value })}
                />
                <Input
                  placeholder="Max"
                  type="number"
                  value={(filters as RealEstateFilters).maxPrice}
                  onChange={(e) => setFilters({ ...(filters as RealEstateFilters), maxPrice: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Min Rooms</Label>
              <Input
                placeholder="Min rooms"
                type="number"
                value={(filters as RealEstateFilters).minRooms}
                onChange={(e) => setFilters({ ...(filters as RealEstateFilters), minRooms: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Min Area (m²)</Label>
              <Input
                placeholder="Min area"
                type="number"
                value={(filters as RealEstateFilters).minArea}
                onChange={(e) => setFilters({ ...(filters as RealEstateFilters), minArea: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Seller Type</Label>
              <Input
                placeholder="Enter seller type"
                value={(filters as RealEstateFilters).sellerType}
                onChange={(e) => setFilters({ ...(filters as RealEstateFilters), sellerType: e.target.value })}
              />
            </div>
          </>
        )}
      </div>
    </Card>
  );
};
