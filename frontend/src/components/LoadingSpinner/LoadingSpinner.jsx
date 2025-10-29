export const LoadingSpinner = ({ size = 'md', fullScreen = false, message = '' }) => {
  const sizeClass = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }[size];

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-4">
      <span className={`loading loading-spinner loading-${size === 'sm' ? 'xs' : size === 'md' ? 'md' : 'lg'} text-primary`}></span>
      {message && <p className="text-gray-600 text-center">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8">
          {spinner}
        </div>
      </div>
    );
  }

  return spinner;
};
