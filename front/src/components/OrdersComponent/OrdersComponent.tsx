/* eslint-disable @next/next/no-img-element */

"use client";

import { getOrdersService } from "@/services/services";
import { useUserStore } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { OrderModal } from "../OrderModal/OrderModal";
import { GlassEffectDiv } from "../UI/GlassEffectDiv";
import { IOrder } from "@/store/interfaces";
import { OptimizedImage } from "../OtimizedImage/optimizedImage";

export function OrdersComponent() {
  const router = useRouter();
  const { userData } = useUserStore();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!userData?.token) {
        Swal.fire({
          title: "",
          text: "Debes iniciar sesión para acceder a tus compras.",
          icon: "warning",
          confirmButtonText: "Iniciar sesión",
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/login");
          }
        });
      } else {
        loadOrders();
      }
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [userData?.token]);

  const loadOrders = async () => {
    if (!userData || !userData.token) {
      Swal.fire({
        title: "Error",
        text: "Usuario no autenticado o ID del usuario no definido.",
        icon: "warning",
        showCloseButton: true,
        confirmButtonText: "Volver",
        allowOutsideClick: true,
      });
    } else {
      setIsLoading(true);
      try {
        const res = await getOrdersService(userData.token);
        setOrders(res);
      } catch (error) {
        console.error("Error fetching orders:", error);
        Swal.fire({
          title: "Error al cargar las órdenes",
          text: "No se pudieron cargar tus compras.",
          icon: "error",
          confirmButtonText: "OK",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const viewOrder = (order: IOrder) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  return (
    <>
      {isLoading ? (
        <div className="text-center text-2xl pt-10 ">
          Cargando tus compras...
        </div>
      ) : (
        <div className="flex flex-col items-center text-center py-10">
          <div className="px-3 py-1  rounded-2xl  bg-customDarkBlue shadow-lg min-w-fit w-1/4 mb-5">
            <h1>MIS COMPRAS</h1>
          </div>

          <div className="flex justify-evenly flex-wrap md:w-3/4 lg:w-2/3">
            {orders.length > 0 ? (
              orders.map((order: IOrder) => (
                <div
                  key={order.id}
                  className="bg-gradient-to-b from-customGreen to-customPink w-3/4 sm:w-5/12 py-4 px-5 rounded-2xl shadow mb-4"
                >
                  <GlassEffectDiv className="flex justify-evenly items-center w-full border p-4 rounded-xl shadow-xl hover:scale-105 transition-transform duration-300">
                    <div className="w-1/3">
                      <OptimizedImage
                        src={order.products[0].image}
                        alt="imagen del producto"
                        className=""
                      />
                    </div>
                    <div className="flex flex-col gap-3 justify-center">
                      <p className="font-bold text-lg">Compra N° {order.id}</p>
                      <p>
                        {new Date(order.date).toLocaleDateString()} <br />
                        <span className="text-customBlue">
                          {order.status === "approved" ? "Aceptada" : "Fallida"}
                        </span>
                      </p>
                      <button
                        onClick={() => viewOrder(order)}
                        className="px-4 py-2 bg-customBlue hover:bg-customGreen rounded-full transition duration-300 ease-in-out"
                      >
                        Ver Detalle
                      </button>
                    </div>
                  </GlassEffectDiv>
                </div>
              ))
            ) : (
              <div className="text-center">
                <p>No has realizado ninguna compra aún.</p>
              </div>
            )}
          </div>
          <OrderModal order={selectedOrder} onClose={closeModal} />
        </div>
      )}
    </>
  );
}
