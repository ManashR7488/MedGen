export const PrescriptionBadge = ({ required, size = 'md' }) => {
  if (!required) return null;

  const sizeClass = {
    sm: 'badge-sm text-xs',
    md: 'badge text-sm',
    lg: 'badge-lg text-base'
  }[size];

  return (
    <div
      className={`badge badge-warning ${sizeClass} gap-1`}
      title="Prescription required to purchase this medicine"
    >
      💊 Rx
    </div>
  );
};
