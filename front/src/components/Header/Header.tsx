/* eslint-disable @next/next/no-img-element */
"use client";

import { useCartStore, useFavStore, useUserStore } from "@/store";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import styles from "./header.module.css";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  const { userData, clearUserData } = useUserStore();
  const { clearCart } = useCartStore();
  const { clearFav } = useFavStore();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => setViewportWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const shortenUsername = (username: string) => {
    if (username.length > 10) {
      return username.substring(0, 7) + "...";
    } else {
      return username;
    }
  };

  const avatarName = userData ? shortenUsername(userData.name) : undefined;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCloseMenu2 = () => {
    setIsOpen(false);
  };

  return (
    <div
      className={`flex items-center justify-around md:justify-evenly lg:text-lg pt-3 pb-4 bg-customDarkBlue ${styles.gradientBorderBottom}`}
    >
      <Link
        href="/"
        className="p-1 sm:pr-5 sm:pl-2 sm:py-1 bg-gray-100 rounded-full shadow-inset-lg"
      >
        {viewportWidth > 639 ? (
          <img
            className="w-40 lg:w-56 xl:w-64"
            src="/images/logo.png"
            alt="Logo"
          />
        ) : (
          <img className="w-12" src="/favicon.png" alt="Logo" />
        )}
      </Link>

      <div className="flex items-center gap-5">
        <Link
          href="/"
          className="flex gap-2 items-center hover:text-customGreen transition duration-300 ease-in-out"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          {viewportWidth > 640 ? <p>Home</p> : null}
        </Link>
      </div>

      {userData?.token ? (
        <>
          <div className="flex items-center gap-4">
            <Link
              href="/favorites"
              className="hover:scale-125 transition-transform duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#e66d85"
                stroke="#none"
                className="w-7 h-7"
                strokeWidth="1.5"
              >
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
              </svg>
            </Link>
            <Link
              href="/cart"
              className="hover:scale-125 transition-transform duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#81aaa2"
                className="w-7 h-7"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </Link>
          </div>

          <div className="inline-block relative text-left " ref={menuRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`
                pl-3
                ${isOpen ? "bg-customGreen" : "bg-customBlue"}
                hover:bg-customGreen
                transition duration-300 ease-in-out
                rounded-full
                flex items-center
              `}
            >
              <p className="px-1">{avatarName}</p>
              <img
                src="/images/avatar.png"
                className="w-12 lg:w-14 xl:w-16"
                alt="Usuario"
              />
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 z-10 text-customBlue bg-gray-100  rounded-xl shadow-lg">
                <Link
                  href="/user-dashboard"
                  className="block px-4 py-2  hover:bg-customGreen transition duration-300 ease-in-out rounded-t-xl"
                  onClick={handleCloseMenu2}
                >
                  Perfil
                </Link>
                <Link
                  href="/orders"
                  className="block px-4 py-2 hover:bg-customGreen transition duration-300 ease-in-out "
                  onClick={handleCloseMenu2}
                >
                  Mis Compras
                </Link>

                <button
                  className="w-full text-start px-4 py-2 hover:bg-customGreen transition duration-300 ease-in-out rounded-b-xl"
                  onClick={() => {
                    handleCloseMenu2();

                    Swal.fire({
                      title: "Estas seguro que quieres salir?",
                      text: "Tu carrito de compras y tu lista de favoritos se perderán.",
                      icon: "question",
                      showCancelButton: true,
                      showCloseButton: true,
                      confirmButtonText: "Cerrar Sesión",
                      cancelButtonText: "Permanecer",
                      reverseButtons: true,
                    }).then((result) => {
                      if (result.isConfirmed) {
                        router.push("/login");
                        clearUserData();
                        clearCart();
                        clearFav();
                      }
                    });
                  }}
                >
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex items-center gap-3 md:gap-5">
          {pathname !== "/register" && (
            <Link
              href="/register"
              className="bg-customBlue
              hover:bg-customGreen
              transition duration-300 ease-in-out
              rounded-full px-3 py-2"
            >
              Crear cuenta
            </Link>
          )}
          {pathname !== "/login" && (
            <Link
              href="/login"
              className=" bg-customBlue
              hover:bg-customGreen
              transition duration-300 ease-in-out
              rounded-full px-3 py-2"
            >
              Iniciar sesión
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
