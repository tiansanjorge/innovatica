"use client";

import { IUserRegisterData } from "@/Interfaces/interfaces";
import { validateRegisterForm } from "@/helpers/validateRegisterForm";
import Link from "next/link";
import { ChangeEvent, FocusEvent, FormEvent, useEffect, useState } from "react";
import { FormField } from "./FormField";
import Swal from "sweetalert2";
import { RegisterUser } from "@/services/services";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const router = useRouter();

  const [newUserData, setNewUserData] = useState<IUserRegisterData>({
    name: "",
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
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = await RegisterUser(newUserData);
      console.log(data);
      Swal.fire({
        title: "Exito!",
        text: "Te has registrado correctamente.",
        icon: "success",
        confirmButtonText: "Iniciar Sesión",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/login");
        }
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Ocurrió un error desconocido";
      Swal.fire({
        title: "Algo salió mal",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  const isFormValid =
    Object.keys(errors).length === 0 &&
    Object.values(newUserData).every((value) => value.trim() !== "");

  return (
    <div className="w-full bg-gray-100 p-6 text-center">
      <form
        className="w-1/2 max-w-md mx-auto bg-white p-4 rounded-lg shadow-lg"
        onSubmit={handleSubmit}
      >
        <h1>Registro</h1>

        <FormField
          label="Nombre"
          name="name"
          type="string"
          value={newUserData.name}
          error={errors.name}
          touched={touched.name}
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
