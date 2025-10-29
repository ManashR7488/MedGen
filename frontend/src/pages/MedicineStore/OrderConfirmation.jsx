import { useLocation, useNavigate } from 'react-router-dom';
import { useCartStore } from '../../Store/useCartStore';
import Footer  from '../../components/Footer/Footer';
import { FiDownload, FiTruck, FiCheckCircle } from 'react-icons/fi';

export default function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const orderId = location.state?.orderId || `ORD${Date.now()}`;
  const orderSummary = location.state?.orderSummary;

  // Calculate dates
  const orderDate = new Date().toLocaleDateString();
  const estimatedDelivery = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString();

  // Fallback to empty state if no order summary
  if (!orderSummary) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-bold mb-4">No order found</h1>
          <p className="text-gray-600 mb-6">The order details are not available.</p>
          <button
            onClick={() => navigate('/store')}
            className="btn btn-primary"
          >
            Back to Store
          </button>
        </div>
      </div>
    );
  }

  const { items, subtotal, tax, total, deliveryAddress, paymentMethod } = orderSummary;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Success Animation */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 bg-success bg-opacity-10 rounded-full flex items-center justify-center">
              <FiCheckCircle size={60} className="text-success animate-bounce" />
            </div>
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">Order Placed Successfully!</h1>
          <p className="text-lg text-gray-600">
            Thank you for your purchase. Your order has been confirmed.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b">
            <div>
              <p className="text-gray-600 text-sm font-semibold mb-1">Order ID</p>
              <p className="text-2xl font-bold text-primary">{orderId}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-semibold mb-1">Order Date</p>
              <p className="text-lg font-semibold">{orderDate}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-semibold mb-1">Estimated Delivery</p>
              <p className="text-lg font-semibold text-success flex items-center gap-2">
                <FiTruck size={20} />
                {estimatedDelivery}
              </p>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="mb-8 pb-8 border-b">
            <h2 className="text-lg font-bold mb-4">Delivery Address</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="font-semibold text-gray-800">{deliveryAddress?.name || 'N/A'}</p>
              <p className="text-gray-600">{deliveryAddress?.address1}</p>
              {deliveryAddress?.address2 && <p className="text-gray-600">{deliveryAddress.address2}</p>}
              <p className="text-gray-600">
                {deliveryAddress?.city}, {deliveryAddress?.state} {deliveryAddress?.zip}
              </p>
              <p className="text-gray-600">{deliveryAddress?.country}</p>
              <p className="text-gray-600 mt-2">📞 {deliveryAddress?.phone}</p>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-8 pb-8 border-b">
            <h2 className="text-lg font-bold mb-4">Order Items</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.medicineId} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                    <p className="text-gray-600 text-sm">${item.price.toFixed(2)} each</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Summary */}
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4">Payment Summary</h2>
            <div className="space-y-3 text-gray-800">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (10%):</span>
                <span className="font-semibold">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges:</span>
                <span className="font-semibold text-success">FREE</span>
              </div>
              <div className="border-t pt-3 flex justify-between">
                <span className="font-bold text-lg">Total Amount Paid:</span>
                <span className="font-bold text-2xl text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Payment Method:</strong> {paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : paymentMethod.toUpperCase()}
              </p>
              {paymentMethod === 'cod' && (
                <p className="text-sm text-blue-800 mt-1">
                  You'll pay ${total.toFixed(2)} when your order arrives.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
          <p className="text-sm text-green-800">
            ✓ A confirmation email has been sent to your registered email address. Please check your inbox and spam folder.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => navigate('/store')}
            className="btn btn-outline btn-lg gap-2"
          >
            Continue Shopping
          </button>
          <button className="btn btn-ghost btn-lg gap-2">
            <FiDownload size={20} />
            Download Invoice
          </button>
          <button className="btn btn-primary btn-lg gap-2">
            <FiTruck size={20} />
            Track Order
          </button>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-lg font-bold mb-6">What's Next?</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="badge badge-primary badge-lg">1</div>
              <div>
                <h3 className="font-semibold text-gray-800">Order Confirmation</h3>
                <p className="text-gray-600 text-sm">You'll receive an email shortly with your order details.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="badge badge-primary badge-lg">2</div>
              <div>
                <h3 className="font-semibold text-gray-800">Preparation</h3>
                <p className="text-gray-600 text-sm">We'll prepare your medicines for shipment.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="badge badge-primary badge-lg">3</div>
              <div>
                <h3 className="font-semibold text-gray-800">Shipped</h3>
                <p className="text-gray-600 text-sm">Your order will be shipped and you'll get tracking details.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="badge badge-primary badge-lg">4</div>
              <div>
                <h3 className="font-semibold text-gray-800">Delivery</h3>
                <p className="text-gray-600 text-sm">Receive your order at the address provided.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
