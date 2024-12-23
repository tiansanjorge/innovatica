import { IProduct } from "@/Interfaces/interfaces";
import { CardProduct } from "../CardProduct/CardProduct";

export function Products({ products }: { products: IProduct[] }) {
  return (
    <div className="flex w-full flex-wrap p-10">
      {products.map((product, index) => (
        <CardProduct key={index} product={product} />
      ))}
    </div>
  );
}
