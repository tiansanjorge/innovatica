export interface IUserRegisterData {
  name: string;
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

export interface IUserData {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
}

export interface ILoginResponse {
  login: boolean;
  token: string;
  user: IUserData;
}
