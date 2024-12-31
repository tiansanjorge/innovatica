/* eslint-disable @next/next/no-img-element */
import styled from "styled-components";
import React from "react";
import { Order } from "../userDashboardComponent/interfaces";
import { GlassEffectDiv } from "../OrdersComponent/GlassEffectDiv";

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  max-height: 95vh;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #34394f;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #81aaa2;
  }

  scrollbar-width: thin;
  scrollbar-color: #81aaa2 #34394f;
`;

interface OrderModalProps {
  order: Order | null;
  onClose: () => void;
}

export function OrderModal({ order, onClose }: OrderModalProps) {
  if (!order) return null;

  const total = order.products.reduce(function (accumulator, product) {
    return accumulator + product.price;
  }, 0);

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent
        className="w-1/2 shadow-xl bg-gradient-to-b from-customGreen to-customPink rounded-2xl p-1"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-customBlue rounded-xl">
          <div className="flex justify-end pt-2 pe-3 ">
            <button onClick={onClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#e66d85"
                className="size-6 hover:scale-125 transition-transform duration-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex justify-evenly mb-2">
            <p className="font-bold text-xl">
              {new Date(order.date).toLocaleDateString()}
            </p>
            <p className="font-bold text-xl">
              Estado:{" "}
              <span className="text-customGreen">
                {order.status === "approved" ? "Aceptada" : "Fallida"}
              </span>
            </p>
            <p className="font-bold text-xl">${total}</p>
          </div>

          <div className="py-3 flex justify-evenly flex-wrap p-5">
            {order.products.map((product, index) => (
              <GlassEffectDiv
                key={index}
                className=" rounded-xl flex items-center w-5/12 mb-3"
              >
                <img
                  className="w-1/2"
                  src={product.image}
                  alt="imagen del producto"
                />
                <div className="w-1/2 text-start p-2">
                  <p className="font-bold">{product.name}</p>
                  <p>${product.price}</p>
                </div>
              </GlassEffectDiv>
            ))}
          </div>
          <p className="font-bold text-xl pb-5">ID de la compra: {order.id}</p>
        </div>
      </ModalContent>
    </ModalBackdrop>
  );
}
