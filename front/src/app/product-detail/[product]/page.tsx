/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-comment-textnodes */
// import axios from "axios";
// import { useEffect, useState } from "react";

// interface ProductDetailParams {
//   params: {
//     product: string;
//   };
// }

// interface IProduct {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   stock: number;
//   image: string;
//   categoryId: number;
// }

// export default async function ProductDetail({ params }: ProductDetailParams) {
//   const [product, setProduct] = useState<IProduct>([]);

//   const productId = params.product;
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:3001/products/${productId}`
//         );
//         setProduct(res.data);
//       } catch (error) {
//         if (axios.isAxiosError(error)) {
//           alert(error.response?.data?.error || "Error fetching products");
//         } else {
//           alert("An unexpected error occurred");
//         }
//       }
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <>
//       <div>
//         <h1>Product {product.id} detail</h1>
//       </div>
//     </>
//   );
// }

import axios from "axios";

interface ProductDetailParams {
  params: {
    product: string; // Este será el ID del producto desde la URL
  };
}

interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  categoryId: number;
}

export default async function ProductDetail({ params }: ProductDetailParams) {
  const { product: productId } = params;

  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/products/${productId}`
      );
      return res.data;
    } catch (error) {
      console.error("Error fetching product:", error);
      return null;
    }
  };

  const product: IProduct | null = await fetchProduct();

  if (!product) {
    return (
      <div>
        <h1>Producto no encontrado</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Detalle del Producto</h1>

      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Precio: ${product.price}</p>
      <p>Stock: {product.stock}</p>
    </div>
  );
}
