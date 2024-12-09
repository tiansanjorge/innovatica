interface User {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
}

// Definir la interfaz para la respuesta de la API de login
export interface LoginResponse {
  login: boolean;
  token: string;
  user: User;
}
