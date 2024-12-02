"use client";

import { IUserData } from "@/Interfaces/user";
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
        {/* <div className="mt-1 text-sm text-red-500">
          <label
            className="block mb-2 text-sm font-medium text-gray-700"
            htmlFor="name"
          >
            Nombre:
            <input
              className="block w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              name="name"
              type="string"
              value={newUserData.name}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
          </label>
          {touched.name && errors.name && <p> {errors.name} </p>}
        </div>
        <div className="mt-1 text-sm text-red-500">
          <label
            className="block mb-2 text-sm font-medium text-gray-700"
            htmlFor="name"
          >
            Dirección:
            <input
              className="block w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              name="address"
              type="string"
              value={newUserData.address}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
          </label>
          {touched.address && errors.address && <p> {errors.address} </p>}
        </div>
        <div className="mt-1 text-sm text-red-500">
          <label
            className="block mb-2 text-sm font-medium text-gray-700"
            htmlFor="phone"
          >
            Teléfono:
            <input
              className="block w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              name="phone"
              type="number"
              value={newUserData.phone ?? ""}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
          </label>
          {touched.phone && errors.phone && <p> {errors.phone} </p>}
        </div>
        <div className="mt-1 text-sm text-red-500">
          <label
            className="block mb-2 text-sm font-medium text-gray-700"
            htmlFor="email"
          >
            Email:
            <input
              className="block w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              name="email"
              type="string"
              value={newUserData.email}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
          </label>
          {touched.email && errors.email && <p> {errors.email} </p>}
        </div>
        <div className="mt-1 text-sm text-red-500">
          <label
            className="block mb-2 text-sm font-medium text-gray-700"
            htmlFor="password"
          >
            Contraseña:
            <input
              className="block w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              name="password"
              type="password"
              value={newUserData.password}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
          </label>
          {touched.password && errors.password && <p> {errors.password} </p>}
        </div>
        <div className="mt-1 text-sm text-red-500">
          <label
            className="block mb-2 text-sm font-medium text-gray-700"
            htmlFor="repeatPassword"
          >
            Repetir contraseña:
            <input
              className="block w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              name="repeatPassword"
              type="password"
              value={newUserData.repeatPassword}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
          </label>
          {touched.repeatPassword && errors.repeatPassword && (
            <p> {errors.repeatPassword} </p>
          )}
        </div> */}
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
