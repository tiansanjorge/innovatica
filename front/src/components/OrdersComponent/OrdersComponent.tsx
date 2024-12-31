/* eslint-disable @next/next/no-img-element */
"use client";

import { getOrdersService } from "@/services/services";
import { useUserStore } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Order } from "../userDashboardComponent/interfaces";
import { OrderModal } from "../OrderModal/OrderModal";

export function OrdersComponent() {
  const router = useRouter();
  const { userData } = useUserStore();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

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
      }
      getOrders();
    }, 200);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [userData?.token]);

  const getOrders = async () => {
    if (!userData) {
      Swal.fire({
        title: "Error",
        text: "Usuario no autenticado o ID del usuario no definido.",
        icon: "warning",
        showCloseButton: true,
        confirmButtonText: "Volver",
        allowOutsideClick: true,
      });
      return;
    }
    setIsLoading(true);
    const res = await getOrdersService(userData?.token);
    console.log(res);
    setOrders(res);
    setIsLoading(false);
  };

  const viewOrder = (order: Order) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null); // Cierra el modal
  };

  return (
    <>
      {isLoading ? (
        <div className="text-center text-2xl pt-10 ">
          Cargando tus compras...
        </div>
      ) : (
        <div className="flex flex-col items-center text-center py-5 bg-customBlue">
          <div className="px-3 py-1 bg-slate-900 text-gray-100 rounded-2xl shadow-lg w-1/4 mb-5">
            <h1>MIS COMPRAS</h1>
          </div>

          <div className="flex justify-evenly flex-wrap w-2/3">
            {orders.length > 0 ? (
              orders.map((order: Order) => (
                <div
                  key={order.id}
                  className="bg-gradient-to-b from-customGreen to-customPink w-5/12 py-4 px-5 rounded-2xl shadow mb-4"
                >
                  <div className="flex justify-evenly w-full border p-4 rounded-2xl bg-gray-100 shadow-xl hover:scale-105 transition-transform duration-300">
                    <div className="w-1/3">
                      <img src={order.products[0].image} alt="" />
                    </div>
                    <div className="flex flex-col gap-3 justify-center">
                      <p className="font-bold">Orden n° {order.id}</p>
                      <p>Fecha: {new Date(order.date).toLocaleDateString()}</p>
                      <p>
                        {order.status === "approved" ? "En proceso" : "Fallida"}
                      </p>
                      <button
                        onClick={() => viewOrder(order)}
                        className="px-4 py-2 text-gray-100  bg-customBlue hover:bg-customGreen rounded-full transition duration-300 ease-in-out"
                      >
                        Ver Detalle
                      </button>
                    </div>
                  </div>
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
