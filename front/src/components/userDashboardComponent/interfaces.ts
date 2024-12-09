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

export interface User {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
  role: string;
  credential: {
    id: number;
    password: string; // Considera solo incluirlo si es absolutamente necesario
  };
  orders: Order[];
}
