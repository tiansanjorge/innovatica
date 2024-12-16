import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { ICartState, IUserStored, IUserState } from "./interfaces";
import Swal from "sweetalert2";
import { IProduct } from "@/Interfaces/interfaces";

// USER

export const useUserStore = create<IUserState>()(
  devtools(
    persist(
      (set) => ({
        userData: null,
        isUserLoaded: false, // estado inicial para isUserLoaded

        // Definición de setUserData
        setUserData: (newData: IUserStored) => {
          set({ userData: newData, isUserLoaded: true }); // Actualiza userData y marca como cargado
        },

        // Definición de clearUserData
        clearUserData: () => {
          set({ userData: null, isUserLoaded: true }); // Limpia userData y marca como cargado
        },
      }),
      {
        name: "user-data", // Nombre bajo el cual se guardará el estado en el almacenamiento
        storage: createJSONStorage(() => localStorage), // Define dónde se guardará el estado
        onRehydrateStorage: () => (_, error) => {
          // Manejo de error al rehidratar
          if (error) {
            console.error("Failed to rehydrate:", error);
          }
        },
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
