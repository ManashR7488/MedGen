export const DiscountBadge = ({ discount, size = 'md' }) => {
  if (!discount || discount <= 0) return null;

  const sizeClass = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2'
  }[size];

  return (
    <div
      className={`badge badge-accent text-white font-bold animate-pulse ${sizeClass}`}
    >
      {discount}% OFF
    </div>
  );
};
