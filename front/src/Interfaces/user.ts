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
