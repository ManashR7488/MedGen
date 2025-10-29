import { create } from 'zustand';
import { showError } from '../lib/toast';

const STORAGE_KEY = 'medicine_cart';

export const useCartStore = create((set, get) => ({
  cartItems: (() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
      return [];
    }
  })(),
  isCartOpen: false,

  addToCart: (medicine, quantity = 1) => {
    set((state) => {
      const existingItem = state.cartItems.find((item) => item.medicineId === medicine.id);
      let updatedItems;

      if (existingItem) {
        // Check if adding more items exceeds stock
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > medicine.stock) {
          showError(`Cannot add more than ${medicine.stock} units of ${medicine.name}`);
          return state;
        }
        updatedItems = state.cartItems.map((item) =>
          item.medicineId === medicine.id ? { ...item, quantity: newQuantity } : item
        );
      } else {
        // Check stock availability
        if (quantity > medicine.stock) {
          showError(`Only ${medicine.stock} units of ${medicine.name} available`);
          return state;
        }
        updatedItems = [
          ...state.cartItems,
          {
            medicineId: medicine.id,
            name: medicine.name,
            price: medicine.price,
            quantity,
            image: medicine.image,
            stock: medicine.stock,
            prescription_required: medicine.prescription_required
          }
        ];
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
      return { cartItems: updatedItems };
    });
  },

  removeFromCart: (medicineId) => {
    set((state) => {
      const updatedItems = state.cartItems.filter((item) => item.medicineId !== medicineId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
      return { cartItems: updatedItems };
    });
  },

  updateQuantity: (medicineId, quantity) => {
    set((state) => {
      const item = state.cartItems.find((item) => item.medicineId === medicineId);
      if (!item) return state;

      // Validate quantity against stock
      if (quantity > item.stock) {
        showError(`Cannot add more than ${item.stock} units of this item`);
        return state;
      }
      
      if (quantity < 1) {
        showError('Quantity must be at least 1');
        return state;
      }

      const updatedItems = state.cartItems.map((item) =>
        item.medicineId === medicineId ? { ...item, quantity } : item
      );

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
      return { cartItems: updatedItems };
    });
  },

  clearCart: () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    set({ cartItems: [] });
  },

  toggleCart: () => {
    set((state) => ({ isCartOpen: !state.isCartOpen }));
  },

  getCartTotal: () => {
    return get().cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  },

  getTax: () => {
    return parseFloat((get().getCartTotal() * 0.1).toFixed(2));
  },

  getGrandTotal: () => {
    return parseFloat((get().getCartTotal() + get().getTax()).toFixed(2));
  },

  getCartCount: () => {
    return get().cartItems.length;
  },

  getCartItemCount: () => {
    return get().cartItems.reduce((count, item) => count + item.quantity, 0);
  }
}));
