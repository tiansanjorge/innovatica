"use client";

import { IUserData } from "@/Interfaces/interfaces";
import { validateRegisterForm } from "@/helpers/validateRegisterForm";
import Link from "next/link";
import { ChangeEvent, FocusEvent, FormEvent, useEffect, useState } from "react";
import { FormField } from "./FormField";
import Swal from "sweetalert2";

export function RegisterForm() {
  const [newUserData, setNewUserData] = useState<IUserData>({
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
      const response = await fetch("http://localhost:3001/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(
          "Form submitted successfully - Respuesta del servidor:",
          data
        );
        setNewUserData({
          name: "",
          address: "",
          phone: undefined,
          email: "",
          password: "",
          repeatPassword: "",
        });
        setErrors({});
        setTouched({});
        Swal.fire({
          title: "Exito!",
          text: "Te has registrado correctamente.",
          icon: "success",
          confirmButtonText: "Iniciar Sesión",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/login"; // Redirige a /login
          }
        });
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error("Failed to submit form", error);
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
