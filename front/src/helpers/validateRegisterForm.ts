import { IUserData } from "@/Interfaces/interfaces";

interface IErrors {
  [key: string]: string;
}

export const validateRegisterForm = (newUserData: IUserData) => {
  const errors: IErrors = {};

  if (!newUserData.name) {
    errors.name = "Campo Obligatorio";
  }
  if (!newUserData.address) {
    errors.address = "Campo Obligatorio";
  }
  if (!newUserData.phone && newUserData.phone !== 0) {
    errors.phone = "Campo Obligatorio";
  }
  if (!newUserData.email) {
    errors.email = "Campo Obligatorio";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUserData.email)) {
    errors.email = "Ingrese un email válido";
  }
  if (!newUserData.password) {
    errors.password = "Campo Obligatorio";
  }
  if (!newUserData.repeatPassword) {
    errors.repeatPassword = "Campo Obligatorio";
  } else if (newUserData.password != newUserData.repeatPassword) {
    errors.repeatPassword = "Las contraseñas no coinciden.";
  }

  return errors;
};
