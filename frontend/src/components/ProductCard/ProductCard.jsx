import { useNavigate } from 'react-router-dom';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { RatingStars } from '../RatingStars/RatingStars';
import { StockBadge } from '../StockBadge/StockBadge';
import { PrescriptionBadge } from '../PrescriptionBadge/PrescriptionBadge';
import { DiscountBadge } from '../DiscountBadge/DiscountBadge';

export const ProductCard = ({ product, onAddToCart, onToggleWishlist, isInWishlist }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/store/product/${product.id}`);
    window.scrollTo(0, 0);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    onToggleWishlist();
  };

  const handleAddToCartClick = (e) => {
    e.stopPropagation();
    onAddToCart();
  };

  return (
    <div
      className="card bg-base-100 shadow-md hover:shadow-xl hover:translate-y-[-10px] transition-all duration-300 cursor-pointer h-full flex flex-col overflow-hidden"
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <figure className="relative w-full h-48 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />

        {/* Discount Badge */}
        {product.discount > 0 && (
          <div className="absolute top-3 left-3">
            <DiscountBadge discount={product.discount} size="md" />
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors"
        >
          {isInWishlist ? (
            <FaHeart size={18} className="text-red-500" />
          ) : (
            <FiHeart size={18} className="text-gray-600" />
          )}
        </button>
      </figure>

      {/* Card Body */}
      <div className="card-body flex-1 p-4">
        {/* Product Name */}
        <h2 className="card-title text-base line-clamp-2 text-gray-800">{product.name}</h2>

        {/* Rating */}
        <div className="my-2">
          <RatingStars rating={product.rating} reviewCount={product.reviews} size="sm" />
        </div>

        {/* Badges Row */}
        <div className="flex gap-2 flex-wrap my-2">
          <PrescriptionBadge required={product.prescription_required} size="sm" />
          <StockBadge stock={product.stock} />
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-3">
          <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
          {product.discount > 0 && (
            <span className="text-sm line-through text-gray-500">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCartClick}
          disabled={product.stock === 0}
          className="btn btn-sm btn-primary mt-4 w-full disabled:btn-disabled gap-2"
        >
          <FiShoppingCart size={16} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};
