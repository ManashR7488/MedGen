import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../Store/useCartStore';
import { Breadcrumb } from '../../components/Breadcrumb/Breadcrumb';
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner';
import Footer  from '../../components/Footer/Footer';
import { showSuccess, showError } from '../../lib/toast';

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, getTax, getGrandTotal, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    paymentMethod: 'cod'
  });
  const [prescriptionFile, setPrescriptionFile] = useState(null);
  const [orderNotes, setOrderNotes] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Medicine Store', path: '/store' },
    { label: 'Checkout', path: '#' }
  ];

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Breadcrumb items={breadcrumbItems} />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Checkout</h1>
            <p className="text-gray-600 mb-6">Your cart is empty</p>
            <button onClick={() => navigate('/store')} className="btn btn-primary">
              Continue Shopping
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setPrescriptionFile(e.target.files?.[0] || null);
  };

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.address1 ||
      !formData.city ||
      !formData.state ||
      !formData.zip
    ) {
      showError('Please fill all required fields');
      return false;
    }

    const hasRxMedicine = cartItems.some((item) => item.prescription_required);
    if (hasRxMedicine && !prescriptionFile) {
      showError('Please upload prescription for prescription medicines');
      return false;
    }

    if (!acceptTerms) {
      showError('Please accept terms and conditions');
      return false;
    }

    return true;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    // Simulate order processing
    setTimeout(() => {
      const orderId = `ORD${Date.now()}`;
      
      // Build order summary before clearing cart
      const orderSummary = {
        items: cartItems,
        subtotal: getCartTotal(),
        tax: getTax(),
        total: getGrandTotal(),
        deliveryAddress: formData,
        paymentMethod: formData.paymentMethod,
        prescriptionFile: prescriptionFile?.name || null,
        orderNotes
      };

      clearCart();
      setLoading(false);
      showSuccess('Order placed successfully!');
      navigate('/store/order-confirmation', { state: { orderId, orderSummary } });
      window.scrollTo(0, 0);
    }, 2000);
  };

  const hasRxMedicine = cartItems.some((item) => item.prescription_required);

  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumb items={breadcrumbItems} />

      {loading && <LoadingSpinner fullScreen message="Processing your order..." />}

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handlePlaceOrder}>
              {/* Delivery Address */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-6">Delivery Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                      placeholder="+1 (555) 123-4567"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2">Address Line 1 *</label>
                    <input
                      type="text"
                      name="address1"
                      value={formData.address1}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                      placeholder="123 Main Street"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2">Address Line 2</label>
                    <input
                      type="text"
                      name="address2"
                      value={formData.address2}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                      placeholder="Apartment, suite, etc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                      placeholder="New York"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">State/Province *</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                      placeholder="NY"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">ZIP/Postal Code *</label>
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                      placeholder="10001"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Country *</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="select select-bordered w-full"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                      <option>Australia</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-6">Payment Method</h2>
                <div className="space-y-3">
                  {[
                    { value: 'cod', label: 'Cash on Delivery (COD)', icon: '💰' },
                    { value: 'card', label: 'Credit/Debit Card', icon: '💳' },
                    { value: 'upi', label: 'UPI', icon: '📱' },
                    { value: 'paypal', label: 'PayPal', icon: '🌐' }
                  ].map((method) => (
                    <label key={method.value} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.value}
                        checked={formData.paymentMethod === method.value}
                        onChange={handleInputChange}
                        className="radio"
                      />
                      <span>{method.icon}</span>
                      <span className="font-semibold">{method.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Prescription Upload */}
              {hasRxMedicine && (
                <div className="bg-warning bg-opacity-10 border border-warning rounded-lg p-6">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    💊 Prescription Required
                  </h2>
                  <p className="text-sm text-gray-700 mb-4">
                    Your order contains prescription medicines. Please upload a valid prescription.
                  </p>
                  <div className="space-y-3">
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileChange}
                      className="file-input file-input-bordered w-full"
                      required
                    />
                    {prescriptionFile && (
                      <p className="text-sm text-success">✓ File selected: {prescriptionFile.name}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Order Notes */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-6">Order Notes (Optional)</h2>
                <textarea
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  className="textarea textarea-bordered w-full"
                  placeholder="Add any special instructions..."
                  rows="4"
                />
              </div>

              {/* Terms & Conditions */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="checkbox checkbox-lg mt-1"
                    required
                  />
                  <span className="text-sm">
                    I agree to the <a href="#" className="link link-primary">Terms & Conditions</a> and <a href="#" className="link link-primary">Privacy Policy</a>
                  </span>
                </label>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                disabled={loading || !acceptTerms}
                className="btn btn-primary btn-lg w-full gap-2"
              >
                Place Order
              </button>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 pb-6 border-b max-h-96 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.medicineId} className="flex justify-between text-sm">
                    <div>
                      <p className="font-semibold line-clamp-1">{item.name}</p>
                      <p className="text-gray-600">x{item.quantity}</p>
                    </div>
                    <p className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold">${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%):</span>
                  <span className="font-semibold">${getTax().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-success">
                  <span>Delivery:</span>
                  <span className="font-semibold">FREE</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="font-bold">Grand Total:</span>
                <span className="text-2xl font-bold text-primary">
                  ${getGrandTotal().toFixed(2)}
                </span>
              </div>

              <p className="text-xs text-gray-600 text-center">
                Your order is secure and encrypted
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
