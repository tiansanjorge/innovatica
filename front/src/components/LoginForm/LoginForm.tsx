"use client";

import { validateLoginForm } from "@/helpers/validateLoginForm";
import Link from "next/link";
import { ChangeEvent, FocusEvent, FormEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { loginUser } from "@/services/services";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store";
import { IUserCredentials } from "@/Interfaces/interfaces";

export function LoginForm() {
  const router = useRouter();
  const { userData, setUserData, clearUserData } = useUserStore();

  const [userCredentials, setUserCredentials] = useState<IUserCredentials>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (!submit && userData?.token) {
      Swal.fire({
        title: "Ya iniciaste sesión",
        text: "Debes cerrar sesión para iniciar sesion en otra cuenta",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Cerrar Sesión",
        cancelButtonText: "Volver a inicio",
        reverseButtons: true,
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          clearUserData();
          router.push("/login");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          router.push("/");
        }
      });
    }
  }, [userData?.token]);

  useEffect(() => {
    setErrors(validateLoginForm(userCredentials));
  }, [userCredentials]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserCredentials({
      ...userCredentials,
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
      const data = await loginUser(userCredentials);
      setUserData({ ...data.user, token: data.token });
      setSubmit(true);

      Swal.fire({
        title: "Iniciaste sesión",
        text: "Bienvenido",
        icon: "success",
        confirmButtonText: "Ir al inicio",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/");
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
    userCredentials.email &&
    userCredentials.password;

  return (
    <div className="flex flex-grow flex-col items-center w-full p-6 text-center bg-gradient-to-b from-customBlue to-customPink">
      <form
        className="flex flex-col items-center w-1/2 max-w-md mx-auto bg-customGreen p-4 rounded-2xl shadow-lg"
        onSubmit={handleSubmit}
      >
        <div className="w-full px-3 py-1 rounded-2xl bg-customDarkBlue shadow-lg mb-5">
          <h1>INICIAR SESIÓN</h1>
        </div>
        <div className="w-3/4 mb-3 text-sm text-red-800">
          <label
            className="block mb-1 text-sm font-medium text-customDarkBlue"
            htmlFor="email"
          >
            <p className="mb-1">Email:</p>
            <input
              className="block w-full px-4 py-2 text-sm border border-gray-300 rounded-2xl focus:ring-2 focus:ring-customPink text-customBlue focus:outline-none"
              name="email"
              type="string"
              value={userCredentials.email}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
          </label>
          {touched.email && errors.email && <p> {errors.email} </p>}
        </div>
        <div className="w-3/4 mb-3 text-sm text-red-800">
          <label
            className="block mb-1 text-sm font-medium text-customDarkBlue"
            htmlFor="password"
          >
            <p className="mb-1">Contraseña:</p>
            <input
              className="block w-full px-4 py-2 text-sm border border-gray-300 rounded-2xl focus:ring-2 focus:ring-customPink text-customBlue focus:outline-none"
              name="password"
              type="password"
              value={userCredentials.password}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
          </label>
          {touched.password && errors.password && <p> {errors.password} </p>}
        </div>
        <button
          className={`w-fit mt-3 px-3 py-1 rounded-2xl ${
            isFormValid
              ? "bg-customBlue hover:bg-customPink transition duration-300"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          type="submit"
          disabled={!isFormValid}
        >
          Ingresar
        </button>
      </form>
      <div className="flex flex-col items-center mt-5 w-fit">
        <p>Si aún no tienes una cuenta</p>
        <Link
          href="/register"
          className="w-fit text-lg hover:underline text-customBlue hover:text-teal-800 transition duration-300"
        >
          Registrate
        </Link>
      </div>
    </div>
  );
}
