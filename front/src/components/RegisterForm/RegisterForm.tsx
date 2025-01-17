"use client";

import { IUserRegisterData } from "@/services/interfaces";
import { validateRegisterForm } from "@/helpers/validateRegisterForm";
import Link from "next/link";
import { ChangeEvent, FocusEvent, FormEvent, useEffect, useState } from "react";
import { FormField } from "./FormField";
import Swal from "sweetalert2";
import { RegisterUser } from "@/services/services";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store";

export function RegisterForm() {
  const router = useRouter();
  const { userData, clearUserData } = useUserStore();

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
    if (userData?.token) {
      Swal.fire({
        title: "Ya iniciaste sesión",
        text: "Debes cerrar sesión para registrar una nueva cuenta",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Cerrar Sesión",
        cancelButtonText: "Volver a inicio",
        reverseButtons: true,
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          clearUserData();
          router.push("/register");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          router.push("/");
        }
      });
    }
  }, [userData?.token]);

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
        allowOutsideClick: false,
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
    <div className="flex flex-col items-center w-full p-6 text-center bg-gradient-to-b from-customBlue to-customPink">
      <form
        className="flex flex-col items-center w-1/2 max-w-md mx-auto bg-customGreen p-4 rounded-2xl shadow-lg"
        onSubmit={handleSubmit}
      >
        <div className="w-full px-3 py-1 rounded-2xl  bg-slate-900 shadow-lg mb-5">
          <h1>CREAR CUENTA</h1>
        </div>

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
          className={`w-fit mt-3 px-3 py-1 rounded-2xl focus:outline-none focus:ring-2 ${
            isFormValid
              ? "bg-customBlue hover:bg-customPink "
              : "bg-gray-300 cursor-not-allowed"
          }`}
          type="submit"
          disabled={!isFormValid}
        >
          Registrarse
        </button>
      </form>
      <div className="flex flex-col items-center mt-5 w-fit">
        <p>Si ya tienes una cuenta</p>
        <Link
          href="/login"
          className="w-fit text-lg underline text-customBlue hover:text-teal-800 transition duration-300"
        >
          Inicia sesión
        </Link>
      </div>
    </div>
  );
}
