export const CategoryBadge = ({ category, icon: Icon, onClick, active }) => {
  const categoryColors = {
    'Pain Relief': 'badge-error',
    'Antibiotics': 'badge-info',
    'Vitamins & Supplements': 'badge-success',
    'Cold & Flu': 'badge-warning',
    'Digestive Health': 'badge-success',
    'First Aid': 'badge-info',
    'Diabetes Care': 'badge-warning',
    'Heart Health': 'badge-error',
    'Skin Care': 'badge-accent',
    'Baby Care': 'badge-info'
  };

  const badgeClass = categoryColors[category] || 'badge-neutral';

  return (
    <button
      onClick={onClick}
      className={`badge gap-2 px-4 py-2 cursor-pointer transition-all ${
        active ? `${badgeClass}` : 'badge-outline'
      } hover:scale-105`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {category}
    </button>
  );
};

export default CategoryBadge;
