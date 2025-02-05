import { IProduct } from "@/Interfaces/interfaces";
import { getProducts } from "@/services/services";

export default async function Prueba() {
  const products = await getProducts();

  return (
    <>
      <ul>
        {products.map((product: IProduct, index: number) => (
          <div key={index} className="">
            <p>{product.name}</p>
          </div>
        ))}
      </ul>
    </>
  );
}
