// interfaces.ts

export interface Category {
  id: number;
  name: string;
  products: Product[]; // Referencia circular opcional, puedes omitirla si no la necesitas en el frontend
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  categoryId: number;
  category: Category;
}

export interface Order {
  id: number;
  status: string;
  date: Date;
  userId: number;
  products: Product[];
}
