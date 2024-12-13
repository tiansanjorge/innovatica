export interface Category {
  id: number;
  name: string;
  products: Product[];
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  categoryId: number;
  category: Category;
}

export interface Order {
  id: number;
  status: string;
  date: Date;
  userId: number;
  products: Product[];
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
  orders?: Order[];
}

export interface UserState {
  userData: IUserStored | null;
  setUserData: (newData: IUserStored) => void;
  clearUserData: () => void;
}

export interface ICartItem {
  productId: number;
}

export interface CartState {
  cart: ICartItem[];
  addToCart: (item: ICartItem) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
}
