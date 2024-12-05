"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { CardProduct } from "@/components/CardProduct/CardProduct";

interface IProduct {
  id: number; // Incluye 'id'
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  categoryId: number;
}

export default function AllProducts() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/products`);
        setProducts(res.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert(error.response?.data?.error || "Error fetching products");
        } else {
          alert("An unexpected error occurred");
        }
      }
    };

    fetchProducts();
  }, []);
  return (
    <>
      <div>
        <h3>TODOS LOS PRODUCTOS</h3>
      </div>
      <div className="flex w-full">
        {products.map((product) => (
          <CardProduct key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
