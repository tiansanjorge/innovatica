import { create } from "zustand";
import { Order } from "./interfaces";

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
    password: string; // Considera solo incluirlo si es absolutamente necesario
  };
  orders?: Order[];
}

interface UserState {
  userData: IUserStored | null;
  setUserData: (newData: IUserStored) => void;
  clearUserData: () => void;
}

const savedUserData = localStorage.getItem("user");
const token = localStorage.getItem("token");
const initialState =
  savedUserData && token ? { ...JSON.parse(savedUserData), token } : null;

export const useStore = create<UserState>((set) => ({
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
