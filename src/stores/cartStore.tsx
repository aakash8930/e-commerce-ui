// cartStore.tsx

import { CartStoreActionsType, CartStoreStateType } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useCartStore = create<CartStoreStateType & CartStoreActionsType>()(
  persist(
    (set) => ({
      cart: [],
      hasHydrated: false,
      addToCart: (product) =>
        set((state) => {
          const existingIndex = state.cart.findIndex(
            (p) =>
              p.id === product.id &&
              p.selectedSize === product.selectedSize &&
              p.selectedColor === product.selectedColor
          );

          if (existingIndex !== -1) {
            const updatedCart = [...state.cart];
            updatedCart[existingIndex].quantity += product.quantity || 1;
            return { cart: updatedCart };
          }

          return {
            cart: [
              ...state.cart,
              {
                ...product,
                quantity: product.quantity || 1,
                selectedSize: product.selectedSize,
                selectedColor: product.selectedColor,
              },
            ],
          };
        }),
      removeFromCart: (product) =>
        set((state) => ({
          cart: state.cart.filter(
            (p) =>
              !(
                p.id === product.id &&
                p.selectedSize === product.selectedSize &&
                p.selectedColor === product.selectedColor
              )
          ),
        })),

      // --- NEW FUNCTIONS ADDED ---
      increaseQuantity: (product) =>
        set((state) => ({
          cart: state.cart.map((p) =>
            p.id === product.id &&
            p.selectedSize === product.selectedSize &&
            p.selectedColor === product.selectedColor
              ? { ...p, quantity: p.quantity + 1 } // Increase quantity by 1
              : p
          ),
        })),

      decreaseQuantity: (product) =>
        set((state) => {
          const productInCart = state.cart.find(
            (p) =>
              p.id === product.id &&
              p.selectedSize === product.selectedSize &&
              p.selectedColor === product.selectedColor
          );

          // If quantity is 1, filter it out (remove it)
          if (productInCart?.quantity === 1) {
            return {
              cart: state.cart.filter(
                (p) =>
                  !(
                    p.id === product.id &&
                    p.selectedSize === product.selectedSize &&
                    p.selectedColor === product.selectedColor
                  )
              ),
            };
          }

          // Otherwise, just decrease quantity by 1
          return {
            cart: state.cart.map((p) =>
              p.id === product.id &&
              p.selectedSize === product.selectedSize &&
              p.selectedColor === product.selectedColor
                ? { ...p, quantity: p.quantity - 1 }
                : p
            ),
          };
        }),
      // --- END OF NEW FUNCTIONS ---

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hasHydrated = true;
        }
      },
    }
  )
);

export default useCartStore;