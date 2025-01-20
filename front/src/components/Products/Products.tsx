import { IProduct } from "@/Interfaces/interfaces";
import { CardProduct } from "../CardProduct/CardProduct";

export function Products({ products }: { products: IProduct[] }) {
  return (
    <div className="flex justify-evenly flex-wrap xl:flex-nowrap m-4 xl:mx-0 xl:my-4 py-3 lg:px-8 xl:px-4 xl:w-11/12 self-center bg-customGreen rounded-xl">
      {products.map((product, index) => (
        <CardProduct key={index} product={product} />
      ))}
    </div>
  );
}
