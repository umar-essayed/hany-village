import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      userInfo: { customerName: '', customerPhone: '', deliveryAddress: '' },

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      setUserInfo: (info) => set({ userInfo: { ...get().userInfo, ...info } }),

      addItem: (item) => {
        const { items } = get();
        const existingItem = items.find((i) => i.id === item.id);
        if (existingItem) {
          set({
            items: items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
            isOpen: true,
          });
        } else {
          set({
            items: [...items, { ...item, quantity: 1 }],
            isOpen: true,
          });
        }
      },

      removeItem: (itemId) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== itemId),
        })),

      increaseQuantity: (itemId) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === itemId ? { ...i, quantity: i.quantity + 1 } : i
          ),
        })),

      decreaseQuantity: (itemId) => {
        const { items } = get();
        const item = items.find((i) => i.id === itemId);
        if (item && item.quantity === 1) {
          set({ items: items.filter((i) => i.id !== itemId) });
        } else {
          set({
            items: items.map((i) =>
              i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
            ),
          });
        }
      },

      clearCart: () => set({ items: [] }),

      getTotalPrice: () => {
        const { items } = get();
        return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      },

      getTotalItems: () => {
        const { items } = get();
        return items.reduce((acc, item) => acc + item.quantity, 0);
      },
    }),
    {
      name: 'hany-village-cart',
    }
  )
);

export const useOrderStore = create(
  persist(
    (set, get) => ({
      lastOrder: null,

      setLastOrder: (order) => set({ lastOrder: order }),
      clearLastOrder: () => set({ lastOrder: null }),
    }),
    {
      name: 'hany-village-orders',
    }
  )
);
