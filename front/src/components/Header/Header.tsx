/* eslint-disable @next/next/no-img-element */
"use client";

import { useCartStore, useUserStore } from "@/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

export function Header() {
  const router = useRouter();
  const menu1Ref = useRef<HTMLDivElement>(null);
  const menu2Ref = useRef<HTMLDivElement>(null);

  const { userData, clearUserData } = useUserStore();
  const { clearCart } = useCartStore();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpen2, setIsOpen2] = useState<boolean>(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menu1Ref.current &&
        !menu1Ref.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
      if (
        menu2Ref.current &&
        !menu2Ref.current.contains(event.target as Node)
      ) {
        setIsOpen2(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCloseMenu1 = () => {
    setIsOpen(false);
  };

  const handleCloseMenu2 = () => {
    setIsOpen2(false);
  };

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-gray-100">
      <div className="mr-10">
        <img className="w-64" src="/images/logo.png" alt="Logo" />
      </div>

      <div className="flex items-center gap-10">
        <Link href="/">Home</Link>
        <div className="relative inline-block text-left" ref={menu1Ref}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="pl-4 pr-3 py-2 bg-customGreen text-white rounded-2xl flex"
          >
            <p className="mr-2">Categorías</p>
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
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 z-10 bg-white rounded shadow">
              <Link
                href="/recomended"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                onClick={handleCloseMenu1}
              >
                Recomendados
              </Link>
              <Link
                href="/cellphones"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                onClick={handleCloseMenu1}
              >
                Celulares
              </Link>
              <Link
                href="/televisions"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                onClick={handleCloseMenu1}
              >
                Televisores
              </Link>
            </div>
          )}
        </div>
        {userData?.token && <Link href="/orders">Mis Compras</Link>}
      </div>

      {userData?.token ? (
        <>
          <div className="flex items-center gap-10">
            <Link href="/favorites">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
              </svg>
            </Link>
            <Link href="/cart">
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
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </Link>
          </div>

          <div className="relative inline-block text-left" ref={menu2Ref}>
            <button
              onClick={() => setIsOpen2(!isOpen2)}
              className="px-4 py-2 bg-blue-500 text-white rounded-full"
            >
              <img src="/images/avatar.png" className="w-16" alt="Usuario" />
            </button>
            {isOpen2 && (
              <div className="absolute right-0 mt-2 w-48 z-10 bg-white rounded shadow">
                <Link
                  href="/user-dashboard"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  onClick={handleCloseMenu2}
                >
                  Perfil
                </Link>
                <Link
                  href="/orders"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  onClick={handleCloseMenu2}
                >
                  Mis Compras
                </Link>
                <Link
                  href="/help"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  onClick={handleCloseMenu2}
                >
                  Ayuda
                </Link>
                <button
                  className="w-full text-start px-4 py-2 text-gray-800 hover:bg-gray-200"
                  onClick={() => {
                    handleCloseMenu2();

                    Swal.fire({
                      title: "Estas seguro que quieres salir?",
                      text: "Tu carrito de compras se perderá.",
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
                      }
                    });
                  }}
                >
                  Salir
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-10">
            <Link href="/register">Crear cuenta</Link>
            <Link href="/login">Ingresar</Link>
            <Link href="/help">Ayuda</Link>
          </div>
        </>
      )}
    </div>
  );
}
