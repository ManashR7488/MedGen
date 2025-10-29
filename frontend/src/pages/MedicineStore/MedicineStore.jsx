import { useEffect, useState } from 'react';
import { useMedicineStore } from '../../Store/useMedicineStore';
import { useCartStore } from '../../Store/useCartStore';
import { useWishlistStore } from '../../Store/useWishlistStore';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { FilterSidebar } from '../../components/FilterSidebar/FilterSidebar';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import {CategoryBadge}  from '../../components/CategoryBadge/CategoryBadge';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { FiPackage } from 'react-icons/fi';
import { showSuccess, showInfo } from '../../lib/toast';
import Footer from '../../components/Footer/Footer';

export default function MedicineStore() {
  const {
    medicines,
    categories,
    filteredMedicines,
    selectedCategory,
    setSelectedCategory,
    setSearchQuery,
    setPriceRange,
    setSortBy,
    getFilteredMedicines
  } = useMedicineStore();
  
  const { addToCart } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  
  const [itemsToShow, setItemsToShow] = useState(12);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    getFilteredMedicines();
  }, []);

  const handleAddToCart = (medicine) => {
    addToCart(medicine, 1);
    showSuccess(`${medicine.name} added to cart!`);
  };

  const handleToggleWishlist = (medicine) => {
    const wasInWishlist = isInWishlist(medicine.id);
    toggleWishlist(medicine);
    if (wasInWishlist) {
      showInfo(`${medicine.name} removed from wishlist`);
    } else {
      showSuccess(`${medicine.name} added to wishlist!`);
    }
  };

  const visibleProducts = filteredMedicines.slice(0, itemsToShow);
  const hasMore = itemsToShow < filteredMedicines.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-3">Medicine Store</h1>
          <p className="text-lg opacity-90">Get your medications delivered to your doorstep</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8 flex justify-center">
          <SearchBar onSearch={setSearchQuery} placeholder="Search medicines by name, type, or tag..." />
        </div>

        {/* Category Pills */}
        <div className="mb-8 overflow-x-auto h-fit">
          <div className="flex gap-3 min-w-min">
            <CategoryBadge
              category="All Categories"
              active={!selectedCategory}
              onClick={() => setSelectedCategory(null)}
            />
            {categories.map((cat) => (
              <CategoryBadge
                key={cat}
                category={cat}
                active={selectedCategory === cat}
                onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
              />
            ))}
          </div>
        </div>

        {/* Products Grid with Filters */}
        <div className="flex gap-6">
          {/* Filter Sidebar - Desktop */}
          <div className="hidden lg:block w-72 flex-shrink-0">
            <FilterSidebar />
          </div>

          {/* Products Section */}
          <div className="flex-1">
            {filteredMedicines.length === 0 ? (
              <EmptyState
                icon={FiPackage}
                title="No medicines found"
                message="Try adjusting your filters or search terms"
                actionLabel="Browse All Products"
                onAction={() => {
                  setSelectedCategory(null);
                  setSearchQuery('');
                  setPriceRange(0, 100);
                  setSortBy('name');
                  getFilteredMedicines();
                }}
              />
            ) : (
              <>
                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {visibleProducts.map((medicine) => (
                    <ProductCard
                      key={medicine.id}
                      product={medicine}
                      onAddToCart={() => handleAddToCart(medicine)}
                      onToggleWishlist={() => handleToggleWishlist(medicine)}
                      isInWishlist={isInWishlist(medicine.id)}
                    />
                  ))}
                </div>

                {/* Load More Button */}
                {hasMore && (
                  <div className="flex justify-center">
                    <button
                      onClick={() => setItemsToShow(itemsToShow + 12)}
                      className="btn btn-primary btn-lg gap-2"
                    >
                      Load More Products
                    </button>
                  </div>
                )}

                {/* Results Summary */}
                <div className="text-center text-gray-600 mt-8">
                  Showing {visibleProducts.length} of {filteredMedicines.length} products
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}