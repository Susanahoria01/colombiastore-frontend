import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Producto, ApiResponse } from '../models/producto.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = `${environment.apiUrl}/productos`;
  private productosSubject = new BehaviorSubject<Producto[]>([]);
  private refreshProductosSubject = new Subject<void>();

  // Observable público para que los componentes se suscriban
  productos$ = this.productosSubject.asObservable();
  refreshProductos$ = this.refreshProductosSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Obtener todos los productos
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl)
      .pipe(
        tap(productos => this.productosSubject.next(productos)),
        catchError(this.handleError)
      );
  }

  // Obtener un producto por ID
  getProducto(id: string): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Crear un nuevo producto
  createProducto(producto: Producto): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl, producto)
      .pipe(
        tap(() => this.refreshProductosSubject.next()),
        catchError(this.handleError)
      );
  }

  // Actualizar un producto
  updateProducto(id: string, producto: Producto): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.apiUrl}/${id}`, producto)
      .pipe(
        tap(() => this.refreshProductosSubject.next()),
        catchError(this.handleError)
      );
  }

  // Eliminar un producto
  deleteProducto(id: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/${id}`)
      .pipe(
        tap(() => this.refreshProductosSubject.next()),
        catchError(this.handleError)
      );
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ha ocurrido un error desconocido';
    
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Código de error: ${error.status}\nMensaje: ${error.message}`;
    }
    
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
