import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto.model';

@Component({
  selector: 'app-producto-lista',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mt-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <i class="fas fa-box me-2 text-primary"></i>
          Lista de Productos
        </h2>
        <a routerLink="/crear-producto" class="btn btn-primary">
          <i class="fas fa-plus me-2"></i>
          Nuevo Producto
        </a>
      </div>

      <!-- Loading -->
      <div *ngIf="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Cargando...</span>
        </div>
        <p class="mt-2">Cargando productos...</p>
      </div>

      <!-- Error -->
      <div *ngIf="error" class="alert alert-danger" role="alert">
        <i class="fas fa-exclamation-triangle me-2"></i>
        {{ error }}
        <button (click)="loadProductos()" class="btn btn-sm btn-outline-danger ms-2">
          <i class="fas fa-redo me-1"></i>
          Reintentar
        </button>
      </div>

      <!-- Sin productos -->
      <div *ngIf="!loading && !error && productos && productos.length === 0" class="text-center py-5">
        <i class="fas fa-box-open fa-4x text-muted mb-3"></i>
        <h4 class="text-muted">No hay productos</h4>
        <p class="text-muted">Comienza agregando tu primer producto</p>
        <a routerLink="/crear-producto" class="btn btn-primary">
          <i class="fas fa-plus me-2"></i>
          Agregar Primer Producto
        </a>
      </div>

      <!-- Confirmación de eliminación -->
      <div *ngIf="mostrarConfirmacion && productoAEliminar" class="alert alert-warning alert-dismissible" role="alert">
        <div class="d-flex align-items-center">
          <i class="fas fa-exclamation-triangle me-3 text-warning fs-4"></i>
          <div class="flex-grow-1">
            <strong>¿Confirmar eliminación?</strong>
            <p class="mb-0">¿Estás seguro de que deseas eliminar "{{ productoAEliminar.nombre }}"?</p>
          </div>
          <div class="ms-3">
            <button class="btn btn-sm btn-danger me-2" (click)="confirmarEliminacion()">
              <i class="fas fa-trash me-1"></i>
              Eliminar
            </button>
            <button class="btn btn-sm btn-secondary" (click)="cancelarEliminacion()">
              Cancelar
            </button>
          </div>
        </div>
      </div>

      <!-- Tabla de productos -->
      <div *ngIf="!loading && !error && productos && productos.length > 0" class="card shadow">
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-hover mb-0">
              <thead class="table-primary">
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Categoría</th>
                  <th scope="col">Precio</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Descripción</th>
                  <th scope="col" class="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let producto of productos">
                  <td class="fw-semibold">{{ producto.nombre }}</td>
                  <td>
                    <span class="badge bg-secondary">{{ producto.categoria }}</span>
                  </td>
                  <td class="fw-bold text-success">
                    {{ producto.precio | currency:'USD':'symbol':'1.2-2' }}
                  </td>
                  <td>
                    <span class="badge" 
                          [class]="producto.stock > 10 ? 'bg-success' : 
                                   producto.stock > 0 ? 'bg-warning' : 'bg-danger'">
                      {{ producto.stock }} unidades
                    </span>
                  </td>
                  <td>
                    <span [title]="producto.descripcion || ''">
                      {{ (producto.descripcion && producto.descripcion.length > 50) ? 
                         (producto.descripcion | slice:0:50) + '...' : 
                         (producto.descripcion || 'Sin descripción') }}
                    </span>
                  </td>
                  <td class="text-center">
                    <div class="btn-group" role="group">
                      <a [routerLink]="['/editar-producto', producto._id]" 
                         class="btn btn-sm btn-outline-primary" 
                         title="Editar">
                        <i class="fas fa-edit"></i>
                      </a>
                      <button (click)="eliminarProducto(producto)" 
                              class="btn btn-sm btn-outline-danger" 
                              title="Eliminar"
                              type="button"
                              [disabled]="loading">
                        <i class="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Modal de confirmación -->
      <div class="modal fade" id="deleteModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Confirmar Eliminación</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <p>¿Estás seguro de que deseas eliminar el producto?</p>
              <div *ngIf="productoAEliminar" class="alert alert-warning">
                <strong>{{ productoAEliminar.nombre }}</strong>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Cancelar
              </button>
              <button type="button" class="btn btn-danger" (click)="confirmarEliminacion()">
                <i class="fas fa-trash me-2"></i>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .table th {
      border-top: none;
      font-weight: 600;
      color: #495057;
      background-color: #f8f9fa;
    }
    
    .btn-group .btn {
      margin: 0 2px;
    }
    
    .table tbody tr:hover {
      background-color: #f8f9fa;
    }
    
    .card {
      border: none;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
  `]
})
export class ProductoListaComponent implements OnInit, OnDestroy {
  productos: Producto[] = [];
  loading = false;
  error: string | null = null;
  productoAEliminar: Producto | null = null;
  mostrarConfirmacion = false;
  private subscriptions = new Subscription();

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.loadProductos();
    
    // Suscribirse a los cambios para actualizar automáticamente
    this.subscriptions.add(
      this.productoService.refreshProductos$.subscribe(() => {
        this.loadProductos();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadProductos(): void {
    this.loading = true;
    this.error = null;
    
    this.productoService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar los productos. Verifica que la API esté funcionando.';
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }

  eliminarProducto(producto: Producto): void {
    console.log('Preparando eliminación de producto:', producto);
    this.productoAEliminar = producto;
    this.mostrarConfirmacion = true;
  }

  cancelarEliminacion(): void {
    this.productoAEliminar = null;
    this.mostrarConfirmacion = false;
  }

  confirmarEliminacion(): void {
    if (this.productoAEliminar && this.productoAEliminar._id) {
      console.log('Confirmando eliminación del producto:', this.productoAEliminar);
      this.loading = true;
      this.mostrarConfirmacion = false;
      
      this.productoService.deleteProducto(this.productoAEliminar._id).subscribe({
        next: (response) => {
          console.log('Producto eliminado exitosamente:', response);
          this.loadProductos();
          this.productoAEliminar = null;
          this.error = null;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error al eliminar el producto:', error);
          this.error = 'Error al eliminar el producto: ' + (error.message || 'Error desconocido');
          this.productoAEliminar = null;
          this.loading = false;
        }
      });
    } else {
      console.error('No se puede eliminar: producto o ID no válido');
      this.error = 'Error: No se puede eliminar el producto (ID no válido)';
      this.mostrarConfirmacion = false;
    }
  }
}
