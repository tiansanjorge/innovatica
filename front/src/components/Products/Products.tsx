import { IProduct } from "@/interfaces/interfaces";
import { CardProduct } from "../CardProduct/CardProduct";

export function Products({ products }: { products: IProduct[] }) {
  return (
    <div className="flex justify-evenly  flex-wrap xl:flex-nowrap mx-32 my-5 p-4 bg-customGreen rounded-xl">
      {products.map((product, index) => (
        <CardProduct key={index} product={product} />
      ))}
    </div>
  );
}
