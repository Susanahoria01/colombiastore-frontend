import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto.model';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="container mt-4">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="card shadow">
            <div class="card-header bg-primary text-white">
              <h4 class="mb-0">
                <i class="bi bi-box me-2"></i>
                {{ isEditMode ? 'Editar Producto' : 'Nuevo Producto' }}
              </h4>
            </div>
            <div class="card-body p-4">
              
              <!-- Loading -->
              <div *ngIf="loading" class="text-center py-3">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Cargando...</span>
                </div>
              </div>

              <!-- Error -->
              <div *ngIf="error" class="alert alert-danger" role="alert">
                <i class="bi bi-exclamation-triangle me-2"></i>
                {{ error }}
              </div>

              <!-- Success -->
              <div *ngIf="success" class="alert alert-success" role="alert">
                <i class="bi bi-check-circle me-2"></i>
                {{ success }}
              </div>

              <!-- Formulario -->
              <form *ngIf="!loading" (ngSubmit)="onSubmit()" #productForm="ngForm">
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="nombre" class="form-label">
                      <i class="fas fa-tag me-1"></i>
                      Nombre del Producto *
                    </label>
                    <input 
                      type="text" 
                      class="form-control" 
                      id="nombre"
                      name="nombre"
                      [(ngModel)]="producto.nombre"
                      required
                      #nombre="ngModel"
                      placeholder="Ej: Laptop Dell XPS">
                    <div *ngIf="nombre.invalid && nombre.touched" class="text-danger small mt-1">
                      El nombre es requerido
                    </div>
                  </div>

                  <div class="col-md-6 mb-3">
                    <label for="categoria" class="form-label">
                      <i class="fas fa-list me-1"></i>
                      Categoría *
                    </label>
                    <select 
                      class="form-select" 
                      id="categoria"
                      name="categoria"
                      [(ngModel)]="producto.categoria"
                      required
                      #categoria="ngModel">
                      <option value="">Seleccionar categoría</option>
                      <option value="Electrónicos">Electrónicos</option>
                      <option value="Ropa">Ropa</option>
                      <option value="Hogar">Hogar</option>
                      <option value="Deportes">Deportes</option>
                      <option value="Libros">Libros</option>
                      <option value="Juguetes">Juguetes</option>
                      <option value="Otros">Otros</option>
                    </select>
                    <div *ngIf="categoria.invalid && categoria.touched" class="text-danger small mt-1">
                      La categoría es requerida
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="precio" class="form-label">
                      <i class="fas fa-dollar-sign me-1"></i>
                      Precio *
                    </label>
                    <div class="input-group">
                      <span class="input-group-text">$</span>
                      <input 
                        type="number" 
                        class="form-control" 
                        id="precio"
                        name="precio"
                        [(ngModel)]="producto.precio"
                        required
                        min="0"
                        step="0.01"
                        #precio="ngModel"
                        placeholder="0.00">
                    </div>
                    <div *ngIf="precio.invalid && precio.touched" class="text-danger small mt-1">
                      <span *ngIf="precio.errors?.['required']">El precio es requerido</span>
                      <span *ngIf="precio.errors?.['min']">El precio debe ser mayor a 0</span>
                    </div>
                  </div>

                  <div class="col-md-6 mb-3">
                    <label for="stock" class="form-label">
                      <i class="fas fa-cubes me-1"></i>
                      Stock *
                    </label>
                    <input 
                      type="number" 
                      class="form-control" 
                      id="stock"
                      name="stock"
                      [(ngModel)]="producto.stock"
                      required
                      min="0"
                      #stock="ngModel"
                      placeholder="0">
                    <div *ngIf="stock.invalid && stock.touched" class="text-danger small mt-1">
                      <span *ngIf="stock.errors?.['required']">El stock es requerido</span>
                      <span *ngIf="stock.errors?.['min']">El stock debe ser mayor o igual a 0</span>
                    </div>
                  </div>
                </div>

                <div class="mb-4">
                  <label for="descripcion" class="form-label">
                    <i class="fas fa-align-left me-1"></i>
                    Descripción *
                  </label>
                  <textarea 
                    class="form-control" 
                    id="descripcion"
                    name="descripcion"
                    [(ngModel)]="producto.descripcion"
                    required
                    rows="4"
                    #descripcion="ngModel"
                    placeholder="Describe las características principales del producto..."></textarea>
                  <div *ngIf="descripcion.invalid && descripcion.touched" class="text-danger small mt-1">
                    La descripción es requerida
                  </div>
                </div>

                <div class="d-flex justify-content-between">
                  <a routerLink="/productos" class="btn btn-secondary">
                    <i class="fas fa-arrow-left me-2"></i>
                    Volver
                  </a>
                  <div>
                    <button 
                      type="button" 
                      class="btn btn-light me-2"
                      (click)="resetForm(productForm)">
                      <i class="fas fa-undo me-2"></i>
                      Limpiar
                    </button>
                    <button 
                      type="submit" 
                      class="btn btn-primary"
                      [disabled]="productForm.invalid || submitting">
                      <span *ngIf="submitting" class="spinner-border spinner-border-sm me-2"></span>
                      <i *ngIf="!submitting" class="fas fa-save me-2"></i>
                      {{ isEditMode ? 'Actualizar' : 'Guardar' }} Producto
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      border: none;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .form-control:focus, .form-select:focus {
      border-color: #667eea;
      box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
    }
    
    .btn {
      border-radius: 8px;
      transition: all 0.3s ease;
    }
    
    .btn:hover {
      transform: translateY(-1px);
    }
    
    .input-group-text {
      background-color: #f8f9fa;
      border-color: #ced4da;
    }
  `]
})
export class ProductoFormComponent implements OnInit {
  producto: Producto = {
    nombre: '',
    precio: 0,
    descripcion: '',
    categoria: '',
    stock: 0
  };
  
  isEditMode = false;
  loading = false;
  submitting = false;
  error: string | null = null;
  success: string | null = null;
  productoId: string | null = null;

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.productoId = this.route.snapshot.paramMap.get('id');
    if (this.productoId) {
      this.isEditMode = true;
      this.loadProducto(this.productoId);
    }
  }

  loadProducto(id: string): void {
    this.loading = true;
    this.productoService.getProducto(id).subscribe({
      next: (data) => {
        this.producto = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar el producto';
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }

  onSubmit(): void {
    this.submitting = true;
    this.error = null;
    this.success = null;

    if (this.isEditMode && this.productoId) {
      // Actualizar producto existente
      this.productoService.updateProducto(this.productoId, this.producto).subscribe({
        next: (response) => {
          this.success = 'Producto actualizado exitosamente';
          this.submitting = false;
          setTimeout(() => {
            this.router.navigate(['/productos']);
          }, 1500);
        },
        error: (error) => {
          this.error = 'Error al actualizar el producto';
          this.submitting = false;
          console.error('Error:', error);
        }
      });
    } else {
      // Crear nuevo producto
      this.productoService.createProducto(this.producto).subscribe({
        next: (response) => {
          this.success = 'Producto creado exitosamente';
          this.submitting = false;
          setTimeout(() => {
            this.router.navigate(['/productos']);
          }, 1500);
        },
        error: (error) => {
          this.error = 'Error al crear el producto';
          this.submitting = false;
          console.error('Error:', error);
        }
      });
    }
  }

  resetForm(form: any): void {
    form.resetForm();
    this.producto = {
      nombre: '',
      precio: 0,
      descripcion: '',
      categoria: '',
      stock: 0
    };
    this.error = null;
    this.success = null;
  }
}
