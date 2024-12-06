export interface IUserData {
  username: string;
  address: string;
  phone: number | undefined;
  email: string;
  password: string;
  repeatPassword: string;
}

export interface IUserCredentials {
  email: string;
  password: string;
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  categoryId: number;
}
