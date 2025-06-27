export interface Producto {
  _id?: string;
  nombre: string;
  precio: number;
  descripcion: string;
  categoria: string;
  stock: number;
}

export interface ApiResponse {
  message: string;
  producto?: Producto;
  error?: string;
}
