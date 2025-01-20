import { IProduct } from "@/Interfaces/interfaces";
import { CardProduct } from "../CardProduct/CardProduct";

export function Products({ products }: { products: IProduct[] }) {
  return (
    <div className="flex justify-evenly  flex-wrap xl:flex-nowrap my-5 lg:w-3/4 self-center p-4 bg-customGreen rounded-xl">
      {products.map((product, index) => (
        <CardProduct key={index} product={product} />
      ))}
    </div>
  );
}
