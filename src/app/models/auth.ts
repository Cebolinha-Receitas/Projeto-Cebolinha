// Corpo enviado para POST /auth/login
export interface LoginRequest {
  email: string;
  password: string;
}

// Resposta de POST /auth/login
export interface LoginResponse {
  token: string;
  expiresIn: number;
}

// Corpo enviado para POST /users (cadastro)
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

// Formato do erro 400 devolvido pela API
export interface ApiError {
  status: number;
  message: string;
  errors?: { field: string; error: string }[];
}