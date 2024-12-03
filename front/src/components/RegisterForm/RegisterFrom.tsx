"use client";

import { IUserData } from "@/Interfaces/interfaces";
import { validateRegisterForm } from "@/helpers/validateRegisterForm";
import Link from "next/link";
import { ChangeEvent, FocusEvent, FormEvent, useEffect, useState } from "react";
import { FormField } from "./FormField";

export function RegisterForm() {
  const [newUserData, setNewUserData] = useState<IUserData>({
    username: "",
    address: "",
    phone: undefined,
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setErrors(validateRegisterForm(newUserData));
  }, [newUserData]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewUserData({
      ...newUserData,
      [name]: value,
    });
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setTouched({
      ...touched,
      [name]: true,
    });
    console.log(errors);
  };

  const submitRegisterForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("submit OK");
  };

  const isFormValid =
    Object.keys(errors).length === 0 &&
    Object.values(newUserData).every((value) => value.trim() !== "");

  return (
    <div className="w-full bg-gray-100 p-6 text-center">
      <form
        className="w-1/2 max-w-md mx-auto bg-white p-4 rounded-lg shadow-lg"
        onSubmit={submitRegisterForm}
      >
        <h1>Registro</h1>

        <FormField
          label="Nombre"
          name="username"
          type="string"
          value={newUserData.username}
          error={errors.username}
          touched={touched.username}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
        <FormField
          label="Dirección"
          name="address"
          type="string"
          value={newUserData.address}
          error={errors.address}
          touched={touched.address}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
        <FormField
          label="Teléfono"
          name="phone"
          type="number"
          value={newUserData.phone}
          error={errors.phone}
          touched={touched.phone}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
        <FormField
          label="Email"
          name="email"
          type="string"
          value={newUserData.email}
          error={errors.email}
          touched={touched.email}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
        <FormField
          label="Contraseña"
          name="password"
          type="password"
          value={newUserData.password}
          error={errors.password}
          touched={touched.password}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
        <FormField
          label="Repetir contraseña"
          name="repeatPassword"
          type="password"
          value={newUserData.repeatPassword}
          error={errors.repeatPassword}
          touched={touched.repeatPassword}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
        <button
          className={`px-6 py-2 text-white rounded-lg focus:outline-none focus:ring-2 ${
            isFormValid
              ? "bg-blue-500 hover:bg-blue-600 focus:ring-blue-400"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          type="submit"
          disabled={!isFormValid}
        >
          Ingresar
        </button>
      </form>
      <p>Si ya tienes una cuenta</p>
      <Link href="/login">
        <button>Inicia sesión</button>
      </Link>
    </div>
  );
}
