import { IProduct } from "@/Interfaces/interfaces";

export interface IOrder {
  id: number;
  status: string;
  date: Date;
  userId: number;
  products: IProduct[];
}

export interface IUserStored {
  token: string;
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
  role?: string;
  credential?: {
    id: number;
  };
  orders?: IOrder[];
}

export interface IUserState {
  userData: IUserStored | null;
  setUserData: (newData: IUserStored) => void;
  clearUserData: () => void;
}

// export interface ICartState {
//   cart: IProduct[];
//   addToCart: (item: IProduct) => void;
//   removeFromCart: (productId: number) => void;
//   clearCart: () => void;
// }

export interface ICartState {
  cart: IProduct[];
  addToCart: (product: IProduct, callback: (isAdded: boolean) => void) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
}

export interface IFavState {
  fav: IProduct[];
  setFav: (item: IProduct) => void;
  clearFav: () => void;
}
