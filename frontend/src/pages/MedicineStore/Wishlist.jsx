import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlistStore } from '../../Store/useWishlistStore';
import { useCartStore } from '../../Store/useCartStore';
import { useMedicineStore } from '../../Store/useMedicineStore';
import { Breadcrumb } from '../../components/Breadcrumb/Breadcrumb';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import Footer  from '../../components/Footer/Footer';
import { FiHeart } from 'react-icons/fi';
import { showSuccess } from '../../lib/toast';

export default function Wishlist() {
  const navigate = useNavigate();
  const { wishlistItems, isInWishlist, toggleWishlist, clearWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();
  const { getMedicineById } = useMedicineStore();
  const [sortBy, setSortBy] = useState('recently-added');

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Medicine Store', path: '/store' },
    { label: 'My Wishlist', path: '#' }
  ];

  const wishlistProducts = wishlistItems
    .map((item) => getMedicineById(item.medicineId))
    .filter((product) => product !== undefined);

  const sortedProducts = [...wishlistProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'recently-added':
      default:
        return 0;
    }
  });

  const handleAddToCart = (medicine) => {
    addToCart(medicine, 1);
    showSuccess(`${medicine.name} added to cart!`);
  };

  const handleAddAllToCart = () => {
    wishlistProducts.forEach((product) => {
      if (product) {
        addToCart(product, 1);
      }
    });
    showSuccess('All items added to cart!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumb items={breadcrumbItems} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Wishlist</h1>
            <p className="text-gray-600 mt-1">{wishlistItems.length} items in your wishlist</p>
          </div>
          {wishlistItems.length > 0 && (
            <button
              onClick={handleAddAllToCart}
              className="btn btn-primary gap-2"
            >
              Add All to Cart
            </button>
          )}
        </div>

        {wishlistItems.length === 0 ? (
          <EmptyState
            icon={FiHeart}
            title="Your wishlist is empty"
            message="Save your favorite medicines for later"
            actionLabel="Start Shopping"
            onAction={() => navigate('/store')}
          />
        ) : (
          <>
            {/* Sort and Controls */}
            <div className="flex justify-between items-center mb-6 flex-col sm:flex-row gap-4">
              <div className="flex gap-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="select select-bordered select-sm"
                >
                  <option value="recently-added">Recently Added</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
              <button
                onClick={clearWishlist}
                className="btn btn-outline btn-sm"
              >
                Clear Wishlist
              </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {sortedProducts.map((product) => {
                if (!product) return null;
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={() => handleAddToCart(product)}
                    onToggleWishlist={() => toggleWishlist(product)}
                    isInWishlist={isInWishlist(product.id)}
                  />
                );
              })}
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-12">
              <p className="text-sm text-blue-800">
                💡 <strong>Tip:</strong> Items in your wishlist are saved and can be added to cart anytime. Prices may change over time.
              </p>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
