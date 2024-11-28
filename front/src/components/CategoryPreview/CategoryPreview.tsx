import { productsToPreLoad } from "@/utils/preLoadProducts";
import { CardPreview } from "../CardPreview/CardPreview";

interface CategoryPreviewProps {
  category: string;
}

export function CategoryPreview({ category }: CategoryPreviewProps) {
  return (
    <div className="flex w-full px-2">
      {productsToPreLoad.map((product, index) => (
        <CardPreview key={index} product={product} />
      ))}
      <div className="">
        <div>
          <h3>{category}</h3>
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
