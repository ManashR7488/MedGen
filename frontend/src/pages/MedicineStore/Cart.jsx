import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../Store/useCartStore';
import { useMedicineStore } from '../../Store/useMedicineStore';
import { Breadcrumb } from '../../components/Breadcrumb/Breadcrumb';
import { QuantitySelector } from '../../components/QuantitySelector/QuantitySelector';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import Footer  from '../../components/Footer/Footer';
import { FiTrash2, FiShoppingBag } from 'react-icons/fi';
import { showSuccess } from '../../lib/toast';

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal, getTax, getGrandTotal } =
    useCartStore();
  const { getMedicineById } = useMedicineStore();

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Medicine Store', path: '/store' },
    { label: 'Shopping Cart', path: '#' }
  ];

  const handleApplyCoupon = () => {
    showSuccess('Coupon applied! (Mock)');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumb items={breadcrumbItems} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <EmptyState
            icon={FiShoppingBag}
            title="Your cart is empty"
            message="Start shopping to add medicines to your cart"
            actionLabel="Browse Products"
            onAction={() => navigate('/store')}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Table Header */}
                <div className="hidden md:grid md:grid-cols-5 gap-4 p-4 bg-gray-100 font-bold border-b">
                  <div>Product</div>
                  <div>Price</div>
                  <div>Quantity</div>
                  <div>Subtotal</div>
                  <div></div>
                </div>

                {/* Cart Items List */}
                <div className="divide-y">
                  {cartItems.map((item) => (
                    <div
                      key={item.medicineId}
                      className="p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex flex-col md:grid md:grid-cols-5 gap-4 items-start md:items-center">
                        {/* Product */}
                        <div className="flex gap-4 col-span-2 w-full">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 rounded object-cover flex-shrink-0"
                          />
                          <div className="flex-1">
                            <button
                              onClick={() => navigate(`/store/product/${item.medicineId}`)}
                              className="font-semibold text-gray-800 hover:text-primary transition-colors line-clamp-2"
                            >
                              {item.name}
                            </button>
                            {item.prescription_required && (
                              <p className="text-xs text-warning font-semibold mt-1">
                                💊 Prescription required
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Price */}
                        <div className="text-gray-800 font-semibold">
                          ${item.price.toFixed(2)}
                        </div>

                        {/* Quantity */}
                        <div>
                          <QuantitySelector
                            quantity={item.quantity}
                            onQuantityChange={(qty) => updateQuantity(item.medicineId, qty)}
                            max={item.stock}
                          />
                        </div>

                        {/* Subtotal */}
                        <div className="text-lg font-bold text-primary">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.medicineId)}
                          className="btn btn-ghost btn-sm text-error w-full md:w-auto"
                        >
                          <FiTrash2 size={18} />
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coupon Section */}
              <div className="mt-6 bg-white rounded-lg shadow-md p-6">
                <h3 className="font-bold text-lg mb-4">Apply Coupon Code</h3>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    className="input input-bordered flex-1"
                  />
                  <button onClick={handleApplyCoupon} className="btn btn-outline">
                    Apply
                  </button>
                </div>
              </div>
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h3 className="text-lg font-bold mb-6">Order Summary</h3>

                <div className="space-y-3 mb-6 pb-6 border-b">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal:</span>
                    <span className="font-semibold">${getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Tax (10%):</span>
                    <span className="font-semibold">${getTax().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Delivery:</span>
                    <span className="font-semibold text-success">FREE</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <span className="font-bold text-lg">Grand Total:</span>
                  <span className="text-2xl font-bold text-primary">
                    ${getGrandTotal().toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => navigate('/store/checkout')}
                  className="btn btn-primary btn-block mb-3 gap-2"
                >
                  Proceed to Checkout
                </button>

                <button
                  onClick={() => navigate('/store')}
                  className="btn btn-outline btn-block"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
