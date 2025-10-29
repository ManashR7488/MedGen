import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMedicineStore } from '../../Store/useMedicineStore';
import { useCartStore } from '../../Store/useCartStore';
import { useWishlistStore } from '../../Store/useWishlistStore';
import { Breadcrumb } from '../../components/Breadcrumb/Breadcrumb';
import { RatingStars } from '../../components/RatingStars/RatingStars';
import { QuantitySelector } from '../../components/QuantitySelector/QuantitySelector';
import { PrescriptionBadge } from '../../components/PrescriptionBadge/PrescriptionBadge';
import { StockBadge } from '../../components/StockBadge/StockBadge';
import { DiscountBadge } from '../../components/DiscountBadge/DiscountBadge';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import  Footer  from '../../components/Footer/Footer';
import { FiHeart, FiShoppingCart, FiZap } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { showSuccess, showInfo } from '../../lib/toast';

export default function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { getMedicineById, medicines } = useMedicineStore();
  const { addToCart } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  const product = getMedicineById(productId);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Product not found</h1>
          <button onClick={() => navigate('/store')} className="btn btn-primary">
            Back to Store
          </button>
        </div>
      </div>
    );
  }

  const relatedProducts = medicines
    .filter((m) => m.category === product.category && m.id !== product.id)
    .slice(0, 4);

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Medicine Store', path: '/store' },
    { label: product.category, path: '/store' },
    { label: product.name, path: '#' }
  ];

  const handleAddToCart = () => {
    addToCart(product, quantity);
    showSuccess(`${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/store/checkout');
    window.scrollTo(0, 0);
  };

  const handleToggleWishlist = () => {
    const wasInWishlist = isInWishlist(product.id);
    toggleWishlist(product);
    if (wasInWishlist) {
      showInfo(`${product.name} removed from wishlist`);
    } else {
      showSuccess(`${product.name} added to wishlist!`);
    }
  };

  const mockReviews = [
    {
      id: 1,
      author: 'John Doe',
      rating: 5,
      comment: 'Excellent product! Works as expected. Highly recommended.',
      date: '2024-10-20'
    },
    {
      id: 2,
      author: 'Jane Smith',
      rating: 4,
      comment: 'Good quality, arrived on time. Will order again.',
      date: '2024-10-18'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumb items={breadcrumbItems} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Product Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Image Section */}
          <div className="relative">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
              {product.discount > 0 && (
                <div className="absolute top-8 left-8">
                  <DiscountBadge discount={product.discount} size="lg" />
                </div>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="mb-6">
              <RatingStars rating={product.rating} reviewCount={product.reviews} size="lg" />
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-primary">${product.price.toFixed(2)}</span>
                {product.discount > 0 && (
                  <span className="text-2xl line-through text-gray-500">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              {product.discount > 0 && (
                <p className="text-success font-semibold mt-2">
                  Save ${(product.originalPrice - product.price).toFixed(2)} ({product.discount}% off)
                </p>
              )}
            </div>

            {/* Badges */}
            <div className="flex gap-2 mb-6 flex-wrap">
              <StockBadge stock={product.stock} />
              <PrescriptionBadge required={product.prescription_required} size="md" />
            </div>

            {/* Product Info */}
            <div className="space-y-3 mb-6 text-gray-700">
              <p>
                <strong>Dosage:</strong> {product.dosage}
              </p>
              <p>
                <strong>Manufacturer:</strong> {product.manufacturer}
              </p>
              <p>
                <strong>Category:</strong> {product.category}
              </p>
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Quantity:</label>
                <QuantitySelector
                  quantity={quantity}
                  onQuantityChange={setQuantity}
                  max={product.stock}
                  disabled={product.stock === 0}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="btn btn-primary btn-lg flex-1 gap-2"
                >
                  <FiShoppingCart size={20} />
                  Add to Cart
                </button>
                <button
                  onClick={handleToggleWishlist}
                  className={`btn btn-lg btn-circle ${
                    isInWishlist(product.id) ? 'bg-red-500 text-white' : 'btn-outline'
                  }`}
                >
                  {isInWishlist(product.id) ? <FaHeart size={20} /> : <FiHeart size={20} />}
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="btn btn-secondary btn-lg w-full gap-2"
              >
                <FiZap size={20} />
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-12">
          <div className="tabs tabs-bordered p-6">
            {[
              { id: 'description', label: 'Description' },
              { id: 'dosage', label: 'Dosage & Usage' },
              { id: 'ingredients', label: 'Ingredients' },
              { id: 'side-effects', label: 'Side Effects' },
              { id: 'reviews', label: 'Reviews' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab ${activeTab === tab.id ? 'tab-active' : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6 border-t">
            {activeTab === 'description' && (
              <div>
                <h3 className="font-bold text-lg mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>
            )}

            {activeTab === 'dosage' && (
              <div>
                <h3 className="font-bold text-lg mb-3">Dosage & Usage</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Dosage Strength:</strong> {product.dosage}</li>
                  <li>• Take as prescribed by your healthcare provider</li>
                  <li>• Swallow whole with water</li>
                  <li>• Do not crush or chew unless directed</li>
                </ul>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div>
                <h3 className="font-bold text-lg mb-3">Active Ingredients</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>• Active Pharmaceutical Ingredient</li>
                  <li>• Cellulose (Inactive)</li>
                  <li>• Magnesium Stearate (Inactive)</li>
                  <li>• Silica (Inactive)</li>
                </ul>
              </div>
            )}

            {activeTab === 'side-effects' && (
              <div>
                <h3 className="font-bold text-lg mb-3">Possible Side Effects</h3>
                <p className="text-gray-700 mb-3">
                  Common side effects may include:
                </p>
                <ul className="space-y-1 text-gray-700">
                  <li>• Headache</li>
                  <li>• Dizziness</li>
                  <li>• Nausea</li>
                </ul>
                <p className="text-warning mt-4 text-sm font-semibold">
                  Consult your doctor if side effects persist.
                </p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="font-bold text-lg mb-6">Customer Reviews</h3>
                <div className="space-y-4">
                  {mockReviews.map((review) => (
                    <div key={review.id} className="border-b pb-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold">{review.author}</p>
                          <RatingStars rating={review.rating} size="sm" />
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((medicine) => (
                <ProductCard
                  key={medicine.id}
                  product={medicine}
                  onAddToCart={() => {
                    addToCart(medicine, 1);
                    showSuccess(`${medicine.name} added to cart!`);
                  }}
                  onToggleWishlist={() => {
                    const wasInWishlist = isInWishlist(medicine.id);
                    toggleWishlist(medicine);
                    if (wasInWishlist) {
                      showInfo(`${medicine.name} removed from wishlist`);
                    } else {
                      showSuccess(`${medicine.name} added to wishlist!`);
                    }
                  }}
                  isInWishlist={isInWishlist(medicine.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
