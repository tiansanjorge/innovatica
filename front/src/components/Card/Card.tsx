interface IProduct {
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  categoryId: number;
}

interface cardProps {
  product: IProduct;
  itemKey: number;
}

export function Card({
  product: { name, description, price, stock, categoryId, image },
  itemKey,
}: cardProps) {
  return (
    <div>
      <h1>{name}</h1>
      <p>{description}</p>
      <p>{itemKey}</p>
      <p>${price}</p>
      <p>{stock}</p>
      <p>{categoryId}</p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt=""></img>
    </div>
  );
}
