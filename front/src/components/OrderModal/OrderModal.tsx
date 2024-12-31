import styled from "styled-components";
import React from "react";
import { Order } from "../userDashboardComponent/interfaces";

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
  width: 50%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ProductDetails = styled.div`
  margin-bottom: 10px;
`;

const ProductImage = styled.img`
  width: 100px;
`;

interface OrderModalProps {
  order: Order | null;
  onClose: () => void;
}

export function OrderModal({ order, onClose }: OrderModalProps) {
  if (!order) return null;

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent
        className=" bg-customGreen rounded-2xl p-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gray-100 p-3 rounded-xl">
          <h4>Detalles de la orden #{order.id}</h4>
          <div>
            {order.products.map((product, index) => (
              <ProductDetails key={index}>
                <p>{product.name}</p>
                <p>${product.price}</p>
                <ProductImage src={product.image} alt="imagen del producto" />
              </ProductDetails>
            ))}
          </div>
        </div>
        <button onClick={onClose}>Cerrar</button>
      </ModalContent>
    </ModalBackdrop>
  );
}
