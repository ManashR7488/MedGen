import { useMedicineStore } from '../../Store/useMedicineStore';
import { CategoryBadge } from '../CategoryBadge/CategoryBadge';

export const FilterSidebar = () => {
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy
  } = useMedicineStore();

  const pricePresets = [
    { label: 'Under $10', min: 0, max: 10 },
    { label: '$10 - $25', min: 10, max: 25 },
    { label: '$25 - $50', min: 25, max: 50 },
    { label: 'Over $50', min: 50, max: 200 }
  ];

  const handlePriceChange = (min, max) => {
    // Guard against NaN and clamp within bounds
    const cleanMin = Number.isNaN(min) || min === null ? priceRange.min : Math.max(0, parseFloat(min));
    const cleanMax = Number.isNaN(max) || max === null ? priceRange.max : Math.min(200, parseFloat(max));
    
    setPriceRange(cleanMin, cleanMax);
  };

  const handleClearFilters = () => {
    setSelectedCategory(null);
    setPriceRange(0, 100);
    setSortBy('name');
  };

  return (
    <div className="w-full bg-base-100 p-4 rounded-lg shadow-md">
      {/* Sort Options */}
      <div className="mb-6">
        <h3 className="font-bold text-lg mb-3">Sort By</h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="select select-bordered w-full text-sm"
        >
          <option value="name">Name (A-Z)</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Rating (Highest)</option>
        </select>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h3 className="font-bold text-lg mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategory === cat}
                onChange={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                className="checkbox checkbox-sm"
              />
              <span className="text-sm">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="font-bold text-lg mb-3">Price Range</h3>
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="number"
              value={priceRange.min}
              onChange={(e) => handlePriceChange(parseFloat(e.target.value), priceRange.max)}
              className="input input-bordered input-sm w-20 text-xs"
              placeholder="Min"
              min="0"
            />
            <span className="flex items-center">-</span>
            <input
              type="number"
              value={priceRange.max}
              onChange={(e) => handlePriceChange(priceRange.min, parseFloat(e.target.value))}
              className="input input-bordered input-sm w-20 text-xs"
              placeholder="Max"
              max="200"
            />
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {pricePresets.map((preset) => (
            <button
              key={preset.label}
              onClick={() => handlePriceChange(preset.min, preset.max)}
              className={`btn btn-sm btn-outline btn-block text-left justify-start ${
                priceRange.min === preset.min && priceRange.max === preset.max
                  ? 'btn-primary'
                  : ''
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <button
        onClick={handleClearFilters}
        className="btn btn-outline btn-block btn-sm"
      >
        Clear All Filters
      </button>
    </div>
  );
};
