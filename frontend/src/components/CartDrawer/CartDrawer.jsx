import { FiX, FiTrash2 } from 'react-icons/fi';
import { useCartStore } from '../../Store/useCartStore';
import { useNavigate } from 'react-router-dom';
import { QuantitySelector } from '../QuantitySelector/QuantitySelector';
import { EmptyState } from '../EmptyState/EmptyState';
import { FiShoppingCart } from 'react-icons/fi';

export const CartDrawer = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, toggleCart, getCartTotal, getTax, getGrandTotal } =
    useCartStore();
  const navigate = useNavigate();

  const handleCheckout = () => {
    toggleCart();
    navigate('/store/checkout');
    window.scrollTo(0, 0);
  };

  const handleViewCart = () => {
    toggleCart();
    navigate('/store/cart');
    window.scrollTo(0, 0);
  };

  const handleContinueShopping = () => {
    toggleCart();
    navigate('/store');
    window.scrollTo(0, 0);
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full md:w-96 bg-base-100 shadow-2xl z-50 flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold">Shopping Cart</h2>
          <div className="flex items-center gap-3">
            {cartItems.length > 0 && (
              <span className="badge badge-primary">{cartItems.length}</span>
            )}
            <button onClick={onClose} className="btn btn-ghost btn-sm btn-circle">
              <FiX size={20} />
            </button>
          </div>
        </div>

        {/* Cart Items */}
        {cartItems.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-4">
            <EmptyState
              icon={FiShoppingCart}
              title="Your cart is empty"
              message="Add some medicines to get started!"
              actionLabel="Continue Shopping"
              onAction={handleContinueShopping}
            />
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cartItems.map((item) => (
                <div key={item.medicineId} className="flex gap-3 pb-4 border-b border-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 line-clamp-2 cursor-pointer hover:text-primary">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">${item.price.toFixed(2)}</p>
                    <div className="flex items-center justify-between mt-2">
                      <QuantitySelector
                        quantity={item.quantity}
                        onQuantityChange={(qty) => updateQuantity(item.medicineId, qty)}
                        max={item.stock}
                      />
                      <button
                        onClick={() => removeFromCart(item.medicineId)}
                        className="btn btn-ghost btn-sm text-error"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                    <p className="text-sm font-semibold text-primary mt-2">
                      Subtotal: ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-4 space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold">${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%):</span>
                  <span className="font-semibold">${getTax().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-primary pt-2 border-t">
                  <span>Grand Total:</span>
                  <span>${getGrandTotal().toFixed(2)}</span>
                </div>
              </div>

              <button onClick={handleViewCart} className="btn btn-outline btn-block">
                View Cart
              </button>
              <button onClick={handleCheckout} className="btn btn-primary btn-block">
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};
