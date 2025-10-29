export const QuantitySelector = ({ quantity, onQuantityChange, min = 1, max = 100, disabled = false }) => {
  const handleDecrement = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleInputChange = (e) => {
    let value = parseInt(e.target.value);
    
    // Handle non-numeric input
    if (isNaN(value)) {
      return; // Don't update on invalid input
    }

    // Clamp value to min-max bounds
    value = Math.max(min, Math.min(value, max));
    onQuantityChange(value);
  };

  return (
    <div className="flex items-center gap-3 border border-gray-300 rounded-lg p-2 w-fit">
      <button
        onClick={handleDecrement}
        disabled={disabled || quantity <= min}
        className="btn btn-sm btn-ghost disabled:opacity-50 disabled:cursor-not-allowed"
      >
        −
      </button>
      <input
        type="number"
        value={quantity}
        onChange={handleInputChange}
        onBlur={(e) => {
          // If input is cleared or invalid, reset to min
          if (e.target.value === '' || isNaN(parseInt(e.target.value))) {
            onQuantityChange(min);
          }
        }}
        disabled={disabled}
        min={min}
        max={max}
        className="input input-sm w-16 text-center disabled:bg-gray-100"
      />
      <button
        onClick={handleIncrement}
        disabled={disabled || quantity >= max}
        className="btn btn-sm btn-ghost disabled:opacity-50 disabled:cursor-not-allowed"
      >
        +
      </button>
      {quantity >= max && (
        <span className="text-xs text-warning ml-2">Max stock reached</span>
      )}
    </div>
  );
};
