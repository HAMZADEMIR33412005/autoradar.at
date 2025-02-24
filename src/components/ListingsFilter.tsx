import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface FilterProps {
  filters: {
    brand: string;
    minPrice: string;
    maxPrice: string;
    minYear: string;
    maxYear: string;
    sellerType: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    brand: string;
    minPrice: string;
    maxPrice: string;
    minYear: string;
    maxYear: string;
    sellerType: string;
  }>>;
}

export const ListingsFilter = ({ filters, setFilters }: FilterProps) => {
  const resetFilters = () => {
    setFilters({
      brand: "",
      minPrice: "",
      maxPrice: "",
      minYear: "",
      maxYear: "",
      sellerType: "",
    });
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
        <div className="space-y-2">
          <Label>Brand</Label>
          <Input
            placeholder="Enter brand"
            value={filters.brand}
            onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label>Price Range</Label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              placeholder="Min"
              type="number"
              value={filters.minPrice}
              onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
            />
            <Input
              placeholder="Max"
              type="number"
              value={filters.maxPrice}
              onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Year Range</Label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              placeholder="Min"
              type="number"
              value={filters.minYear}
              onChange={(e) => setFilters({ ...filters, minYear: e.target.value })}
            />
            <Input
              placeholder="Max"
              type="number"
              value={filters.maxYear}
              onChange={(e) => setFilters({ ...filters, maxYear: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Seller Type</Label>
          <Input
            placeholder="Enter seller type"
            value={filters.sellerType}
            onChange={(e) => setFilters({ ...filters, sellerType: e.target.value })}
          />
        </div>
      </div>
    </Card>
  );
};
