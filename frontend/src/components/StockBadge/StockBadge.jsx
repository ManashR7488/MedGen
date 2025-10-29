export const StockBadge = ({ stock, lowStockThreshold = 10 }) => {
  if (stock > lowStockThreshold) {
    return <div className="badge badge-success text-white">In Stock</div>;
  } else if (stock > 0) {
    return (
      <div className="badge badge-warning text-black">
        Low Stock ({stock})
      </div>
    );
  } else {
    return <div className="badge badge-error text-white">Out of Stock</div>;
  }
};
