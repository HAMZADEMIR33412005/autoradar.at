import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ListingType } from "@/types/listing";

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
        minKm: "",
        maxKm: "",
        sellerType: "",
        qualified: "all",
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
        <h2 className="text-lg font-semibold">Filter</h2>
        <Button variant="ghost" size="sm" onClick={resetFilters}>
          Zurücksetzen
        </Button>
      </div>

      <div className="space-y-4">
        {listingType === 'cars' ? (
          // Car filters
          <>
            <div className="space-y-2">
              <Label>Marke</Label>
              <Input
                placeholder="Marke eingeben"
                value={(filters as CarFilters).brand}
                onChange={(e) => setFilters({ ...(filters as CarFilters), brand: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Preisbereich</Label>
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
              <Label>Baujahr</Label>
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
              <Label>Kilometerstand</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Min"
                  type="number"
                  value={(filters as CarFilters).minKm}
                  onChange={(e) => setFilters({ ...(filters as CarFilters), minKm: e.target.value })}
                />
                <Input
                  placeholder="Max"
                  type="number"
                  value={(filters as CarFilters).maxKm}
                  onChange={(e) => setFilters({ ...(filters as CarFilters), maxKm: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Verkäufertyp</Label>
              <Input
                placeholder="Verkäufertyp eingeben"
                value={(filters as CarFilters).sellerType}
                onChange={(e) => setFilters({ ...(filters as CarFilters), sellerType: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Qualifiziert</Label>
              <RadioGroup 
                value={(filters as CarFilters).qualified}
                onValueChange={(value) => setFilters({ ...(filters as CarFilters), qualified: value })}
                className="flex flex-col space-y-1 mt-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="all" />
                  <Label htmlFor="all" className="cursor-pointer">Alle</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="qualified" id="qualified" />
                  <Label htmlFor="qualified" className="cursor-pointer">Qualifiziert</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="unqualified" id="unqualified" />
                  <Label htmlFor="unqualified" className="cursor-pointer">Nicht qualifiziert</Label>
                </div>
              </RadioGroup>
            </div>
          </>
        ) : (
          // Real Estate filters
          <>
            <div className="space-y-2">
              <Label>Immobilientyp</Label>
              <RadioGroup 
                value={(filters as RealEstateFilters).propertyType}
                onValueChange={(value) => setFilters({ ...(filters as RealEstateFilters), propertyType: value })}
                className="flex flex-col space-y-1 mt-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="" id="any-property" />
                  <Label htmlFor="any-property" className="cursor-pointer">Alle</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="apartment" />
                  <Label htmlFor="apartment" className="cursor-pointer">Wohnung</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0" id="house" />
                  <Label htmlFor="house" className="cursor-pointer">Haus</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Preisbereich</Label>
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
              <Label>Mindestanzahl Zimmer</Label>
              <Input
                placeholder="Min Zimmer"
                type="number"
                value={(filters as RealEstateFilters).minRooms}
                onChange={(e) => setFilters({ ...(filters as RealEstateFilters), minRooms: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Mindestfläche (m²)</Label>
              <Input
                placeholder="Min Fläche"
                type="number"
                value={(filters as RealEstateFilters).minArea}
                onChange={(e) => setFilters({ ...(filters as RealEstateFilters), minArea: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Verkäufertyp</Label>
              <Input
                placeholder="Verkäufertyp eingeben"
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
