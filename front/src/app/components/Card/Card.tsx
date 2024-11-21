import { IProduct } from "@/app/Interfaces/types";

export const Card: React.FC<{ product: IProduct; itemKey: number }> = ({
  product: { name, description, price, stock, image, categoryId },
  itemKey,
}) => {
  return (
    <div>
      <h1>{name}</h1>
      <p>{description}</p>
      <p>{itemKey}</p>
      <p>${price}</p>
      <p>{stock}</p>
      <p>{categoryId}</p>
      <img src={image} alt=""></img>
    </div>
  );
};
