import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

export const RatingStars = ({ rating = 0, reviewCount = null, size = 'md', interactive = false, onRatingChange = null }) => {
  const sizeClass = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }[size];

  const iconSize = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }[size];

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <button
            key={i}
            onClick={() => interactive && onRatingChange && onRatingChange(i + 1)}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : ''} transition-transform`}
          >
            <FaStar className={`${iconSize} text-yellow-400`} />
          </button>
        );
      } else if (i === fullStars && hasHalf) {
        stars.push(
          <button
            key={i}
            onClick={() => interactive && onRatingChange && onRatingChange(i + 0.5)}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : ''} transition-transform`}
          >
            <FaStarHalfAlt className={`${iconSize} text-yellow-400`} />
          </button>
        );
      } else {
        stars.push(
          <button
            key={i}
            onClick={() => interactive && onRatingChange && onRatingChange(i + 1)}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : ''} transition-transform`}
          >
            <FaRegStar className={`${iconSize} text-gray-300`} />
          </button>
        );
      }
    }
    return stars;
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`flex gap-1 ${sizeClass}`}>{renderStars()}</div>
      <span className="text-sm text-gray-600 font-semibold">
        {rating.toFixed(1)}
        {reviewCount && ` (${reviewCount} reviews)`}
      </span>
    </div>
  );
};
