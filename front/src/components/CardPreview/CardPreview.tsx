interface IProduct {
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  categoryId: number;
}

export function CardPreview({ product }: { product: IProduct }) {
  const { name, price, image } = product;
  return (
    <div className="w-1/4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt=""></img>
      <h1>{name}</h1>
      <p>${price}</p>
    </div>
  );
}
