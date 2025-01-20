import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { ICartState, IUserStored, IUserState, IFavState } from "./interfaces";
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
        addToCart: (
          product: IProduct,
          callback: (isAdded: boolean) => void
        ) => {
          set((state) => {
            const existingItem = state.cart.find(
              (item) => item.id === product.id
            );
            if (existingItem) {
              callback(false);
              return { cart: state.cart };
            } else {
              const newCart = [...state.cart, product];
              callback(true);
              return { cart: newCart };
            }
          });
        },
        removeFromCart: (productId: number) => {
          set((state) => ({
            cart: state.cart.filter((product) => product.id !== productId),
          }));
        },
        clearCart: () => {
          set({ cart: [] });
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
              return { fav: updatedFav };
            } else {
              const newFav = [...state.fav, product];
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
