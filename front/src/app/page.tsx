import { Card } from "./components/Card/Card";
import { productsToPreLoad } from "./helpers/preLoadProducts";

export default function Home() {
  return (
    <div>
      {productsToPreLoad.map((product, index) => (
        <Card key={index} itemKey={index} product={product} />
      ))}
    </div>
  );
}
