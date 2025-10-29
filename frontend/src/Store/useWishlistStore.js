import { create } from 'zustand';

const STORAGE_KEY = 'medicine_wishlist';

export const useWishlistStore = create((set, get) => ({
  wishlistItems: (() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to load wishlist from localStorage:', error);
      return [];
    }
  })(),

  addToWishlist: (medicine) => {
    set((state) => {
      const exists = state.wishlistItems.some((item) => item.medicineId === medicine.id);
      if (exists) return state;

      const updatedItems = [
        ...state.wishlistItems,
        {
          medicineId: medicine.id,
          name: medicine.name,
          price: medicine.price,
          image: medicine.image,
          addedAt: new Date().toISOString()
        }
      ];

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
      return { wishlistItems: updatedItems };
    });
  },

  removeFromWishlist: (medicineId) => {
    set((state) => {
      const updatedItems = state.wishlistItems.filter((item) => item.medicineId !== medicineId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
      return { wishlistItems: updatedItems };
    });
  },

  isInWishlist: (medicineId) => {
    return get().wishlistItems.some((item) => item.medicineId === medicineId);
  },

  toggleWishlist: (medicine) => {
    if (get().isInWishlist(medicine.id)) {
      get().removeFromWishlist(medicine.id);
    } else {
      get().addToWishlist(medicine);
    }
  },

  clearWishlist: () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    set({ wishlistItems: [] });
  },

  getWishlistCount: () => {
    return get().wishlistItems.length;
  }
}));
