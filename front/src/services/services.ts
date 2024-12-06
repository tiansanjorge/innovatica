import { IProduct } from "@/Interfaces/interfaces";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export async function getProducts(): Promise<IProduct[]> {
  try {
    const res = await fetch(`${apiURL}/products`, {
      method: "GET",
      next: { revalidate: 3600 },
    });

    const products: IProduct[] = await res.json();

    return products;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(String(error));
  }
}

export async function getProductById(id: string): Promise<IProduct> {
  try {
    const products = await getProducts();
    console.log(products);
    console.log(id);
    const product = products.find((product) => product.id.toString() === id);
    if (!product) {
      throw new Error("Product not found.");
    }

    return product;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(String(error));
  }
}
