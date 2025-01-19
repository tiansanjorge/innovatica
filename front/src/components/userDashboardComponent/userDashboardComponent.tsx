"use client";

import Swal from "sweetalert2";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore, useFavStore, useUserStore } from "@/store";
import Link from "next/link";

export function UserDashboardComponent() {
  const router = useRouter();
  const { userData, clearUserData } = useUserStore();
  const { clearCart } = useCartStore();
  const { clearFav } = useFavStore();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!userData?.token) {
        Swal.fire({
          title: "",
          text: "Debes iniciar sesión para acceder a tu perfil.",
          icon: "warning",
          confirmButtonText: "Iniciar sesión",
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/login");
          }
        });
      }
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [userData?.token]);

  return (
    <div className="w-full flex-grow  px-5 py-10 bg-gradient-to-b from-customBlue to-customGreen">
      <div className="w-3/4 flex justify-evenly mx-auto">
        <div className="w-1/3 flex flex-col items-center">
          <div className="bg-gradient-to-b from-customGreen to-customPink rounded-full mb-5">
            <img src="/images/avatar.png" className="w-64" alt="Usuario" />
          </div>

          <p className="text-lg">{userData?.name}</p>
        </div>
        <div className="w-2/3 flex flex-col items-center">
          <div className="px-3 py-1 rounded-2xl bg-customDarkBlue shadow-lg w-1/2 text-center mb-5">
            <h1>PERFIL</h1>
          </div>
          <div className="w-3/4 flex flex-col p-5 mb-5">
            <p className="flex justify-between">
              Email: <span>{userData?.email}</span>
            </p>
            <p className="flex justify-between">
              Dirección: <span>{userData?.address}</span>
            </p>
            <p className="flex justify-between">
              Teléfono: <span>{userData?.phone}</span>
            </p>

            {userData?.credential && (
              <>
                <p className="flex justify-between">
                  ID de Usuario: <span>{userData?.credential.id}</span>
                </p>
              </>
            )}
          </div>
          <div className="w-full flex justify-evenly">
            <Link
              href="/orders"
              className="w-fit px-3 py-1 rounded-2xl bg-customGreen hover:bg-teal-800 transition duration-300 ease-in-out"
            >
              Mis Compras
            </Link>
            <button
              className="w-fit px-3 py-1 rounded-2xl bg-customPink hover:bg-red-800 transition duration-300 ease-in-out"
              onClick={() => {
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
        </div>
      </div>
    </div>
  );
}
