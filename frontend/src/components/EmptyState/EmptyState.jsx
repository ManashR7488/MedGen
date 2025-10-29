import { useNavigate } from 'react-router-dom';

export const EmptyState = ({ icon: Icon, title, message, actionLabel, onAction }) => {
  const navigate = useNavigate();

  const handleAction = () => {
    if (onAction) {
      onAction();
    } else if (actionLabel === 'Continue Shopping' || actionLabel === 'Start Shopping' || actionLabel === 'Browse Products') {
      navigate('/store');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {Icon && (
        <div className="text-6xl mb-6 opacity-50">
          <Icon />
        </div>
      )}
      <h3 className="text-2xl font-bold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 text-center mb-8 max-w-md">{message}</p>
      {actionLabel && (
        <button
          onClick={handleAction}
          className="btn btn-primary gap-2"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
