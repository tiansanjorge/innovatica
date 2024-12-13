import { IProduct, IUserCredentials } from "@/Interfaces/interfaces";
import {
  ILoginResponse,
  IUserData,
  IUserRegisterData,
} from "@/services/interfaces";

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

export async function loginUser(
  userCredentials: IUserCredentials
): Promise<ILoginResponse> {
  try {
    const response = await fetch(`${apiURL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCredentials),
    });

    if (!response.ok) {
      throw new Error("Error al enviar formulario de inicio de sesión");
    }

    const data: ILoginResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Ocurrió un error desconocido");
  }
}

export async function RegisterUser(
  newUserData: IUserRegisterData
): Promise<IUserData> {
  try {
    const response = await fetch(`${apiURL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserData),
    });

    if (!response.ok) {
      throw new Error("Error al enviar formulario de registro.");
    }

    const data: IUserData = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Ocurrió un error desconocido");
  }
}
