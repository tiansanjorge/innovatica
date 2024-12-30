"use client";

import { getOrdersService } from "@/services/services";
import { useUserStore } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Order } from "../userDashboardComponent/interfaces";

export function OrdersComponent() {
  const router = useRouter();
  const { userData } = useUserStore();
  const [orders, setOrders] = useState([]);

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
    const res = await getOrdersService(userData?.token);
    console.log(res);
    setOrders(res);
  };

  const viewOrder = (order: Order) => {
    Swal.fire({
      title: `Detalles de la orden #${order.id}`,
      html: `<div >${order.products
        .map(
          (product) =>
            `<div class="text-start">
              <p>${product.name}</p>
              <p>$${product.price}</p>
              <img class="w-1/3" src=${product.image} alt="imagen del producto"/>
            </div>`
        )
        .join("")}</div>`,
      showCloseButton: true,
      width: "800px",
      confirmButtonText: "Cerrar",
      allowOutsideClick: true,
    });
  };

  return (
    <div>
      {orders.length > 0 ? (
        orders.map((order: Order) => (
          <div key={order.id} className="border p-4 mb-4">
            <p>Fecha: {new Date(order.date).toLocaleDateString()}</p>
            <p>{order.status === "approved" ? "En proceso" : "Fallida"}</p>
            <button onClick={() => viewOrder(order)}>Ver Detalle</button>
          </div>
        ))
      ) : (
        <div className="text-center">
          <p>No has realizado ninguna compra aún</p>
        </div>
      )}
    </div>
  );
}
