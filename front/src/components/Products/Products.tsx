import { IProduct } from "@/Interfaces/interfaces";
import { CardProduct } from "../CardProduct/CardProduct";

export function Products({ products }: { products: IProduct[] }) {
  return (
    <div className="flex w-full flex-wrap p-10">
      {products.map((product, index) => (
        <CardProduct key={index} product={product} />
      ))}
      <div className="">
        <div>
          <h3>Productos</h3>
        </div>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
