import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { ICartState, IUserStored, IUserState, IFavState } from "./interfaces";
import Swal from "sweetalert2";
import { IProduct } from "@/Interfaces/interfaces";

// USER

export const useUserStore = create<IUserState>()(
  devtools(
    persist(
      (set) => ({
        userData: null,

        setUserData: (newData: IUserStored) => {
          set({ userData: newData });
        },

        clearUserData: () => {
          set({ userData: null });
        },
      }),
      {
        name: "user-data",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);

// CART

export const useCartStore = create<ICartState>()(
  devtools(
    persist(
      (set) => ({
        cart: [],

        addToCart: (product: IProduct) =>
          set((state) => {
            const existingItem = state.cart.find((i) => i.id === product.id);
            if (existingItem) {
              Swal.fire({
                icon: "warning",
                title: "Producto ya en el carrito",
                text: "Este producto ya está en tu carrito. No puedes agregarlo nuevamente.",
                confirmButtonText: "Entendido",
              });
              console.log(state.cart);
              return { cart: state.cart };
            } else {
              const newCart = [...state.cart, product];
              console.log(newCart);
              return { cart: newCart };
            }
          }),

        removeFromCart: (productId: number) =>
          set((state) => {
            const updatedCart = state.cart.filter(
              (product) => product.id !== productId
            );
            console.log(updatedCart);
            return { cart: updatedCart };
          }),

        clearCart: () => {
          set(() => ({ cart: [] }));
        },
      }),
      {
        name: "cart-data",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);

export const useFavStore = create<IFavState>()(
  devtools(
    persist(
      (set) => ({
        fav: [],

        setFav: (product: IProduct) =>
          set((state) => {
            const existingItem = state.fav.find((i) => i.id === product.id);
            if (existingItem) {
              const updatedFav = state.fav.filter(
                (product) => product.id !== existingItem.id
              );
              console.log(updatedFav);
              return { fav: updatedFav };
            } else {
              const newFav = [...state.fav, product];
              console.log(newFav);
              return { fav: newFav };
            }
          }),

        clearFav: () => {
          set(() => ({ fav: [] }));
        },
      }),
      {
        name: "fav-data",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
