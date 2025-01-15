import { IUserCredentials } from "@/interfaces/interfaces";

interface IErrors {
  [key: string]: string;
}

export const validateLoginForm = (user: IUserCredentials) => {
  const errors: IErrors = {};

  if (!user.email) {
    errors.email = "Campo Obligatorio";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
    errors.email = "Ingrese un email válido";
  }
  if (!user.password) {
    errors.password = "Campo Obligatorio";
  }

  return errors;
};
