import { create } from "zustand";
import { CartState, ICartItem, IUserStored, UserState } from "./interfaces";

// USER

const savedUserData = localStorage.getItem("user");
const token = localStorage.getItem("token");
const initialState =
  savedUserData && token ? { ...JSON.parse(savedUserData), token } : null;

export const useUserStore = create<UserState>((set) => ({
  userData: initialState,
  setUserData: (newData: IUserStored) => {
    set({ userData: newData });
    localStorage.setItem("token", newData.token);
    localStorage.setItem("user", JSON.stringify(newData));
  },
  clearUserData: () => {
    set({ userData: null });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
}));

// CART

const getSavedCart = () => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : [];
};

export const useCartStore = create<CartState>((set) => ({
  cart: getSavedCart(),

  addToCart: (item: ICartItem) =>
    set((state) => {
      const newCart = [...state.cart, item];
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { cart: newCart };
    }),
  removeFromCart: (productId: number) =>
    set((state) => {
      const updatedCart = state.cart.filter(
        (item) => item.productId !== productId
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),

  clearCart: () =>
    set(() => {
      localStorage.removeItem("cart");
      return { cart: [] };
    }),
}));
