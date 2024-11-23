"use client";

import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-gray-100">
      {/* Logo */}
      <div className="mr-10">
        <img src="null" alt="Logo" />
      </div>

      {/* Navegación principal */}
      <div className="flex items-center gap-10">
        <Link href="/home">Home</Link>
        <div className="relative inline-block text-left">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Categorías
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow">
              <Link
                href="/recomended"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Recomendados
              </Link>
              <Link
                href="/cellphones"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Celulares
              </Link>
              <Link
                href="/televisions"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Televisores
              </Link>
            </div>
          )}
        </div>
        <Link href="/orders">Compras</Link>
      </div>

      {/* Favoritos y Carrito */}
      <div className="flex items-center gap-10">
        <Link href="/favorites">
          <img src="null" alt="Favoritos" />
        </Link>
        <Link href="/cart">
          <img src="null" alt="Carrito" />
        </Link>
      </div>

      {/* Menú del usuario */}
      <div className="relative inline-block text-left">
        <button
          onClick={() => setIsOpen2(!isOpen2)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          <img src="null" alt="Usuario" />
        </button>
        {isOpen2 && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow">
            <Link
              href="/user-dashboard"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              Perfil
            </Link>
            <Link
              href="/orders"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              Compras
            </Link>
            <Link
              href="/help"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              Ayuda
            </Link>
            <Link
              href="/logout"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              Salir
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
