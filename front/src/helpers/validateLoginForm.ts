import { IUserCredentials } from "@/Interfaces/user";

interface IErrors {
  [key: string]: string;
}

export const validateLoginForm = (user: IUserCredentials) => {
  const errors: IErrors = {};

  if (!user.email) {
    errors.email = "Campo Obligatorio";
  }
  if (!user.password) {
    errors.password = "Campo Obligatorio";
  }

  return errors;
};
