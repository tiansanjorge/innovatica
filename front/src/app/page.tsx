import { Card } from "../components/Card/Card";
import { productsToPreLoad } from "../utils/preLoadProducts";

export default function Index() {
  return (
    <>
      <div>
        {productsToPreLoad.map((product, index) => (
          <Card key={index} itemKey={index} product={product} />
        ))}
      </div>
    </>
  );
}
