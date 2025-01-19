import { SliderHome } from "@/components/SliderHome/SliderHome";
import { Products } from "@/components/Products/Products";
import { getProducts } from "@/services/services";

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      <SliderHome />
      <Products products={products} />
    </>
  );
}
