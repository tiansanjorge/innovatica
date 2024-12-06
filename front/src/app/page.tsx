import { SliderHome } from "@/components/SliderHome/SliderHome";
import { HelpBanner } from "@/components/HelpBanner/HelpBanner";
import { Products } from "@/components/Products/Products";
import { getProducts } from "@/services/services";

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      <div>
        <SliderHome />
        <Products products={products} />
        <HelpBanner />
      </div>
    </>
  );
}
