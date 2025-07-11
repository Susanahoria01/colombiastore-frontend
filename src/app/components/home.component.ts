import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="hero-section">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <h1 class="display-4 fw-bold mb-4">
              Bienvenido a ColombiaStore
            </h1>
            <p class="lead mb-4">
              Gestiona tu inventario de productos de manera eficiente y moderna. 
              Crea, edita, elimina y visualiza todos tus productos desde una interfaz intuitiva.
            </p>
            <div class="d-flex gap-3">
              <a routerLink="/productos" class="btn btn-light btn-lg">
                <i class="bi bi-box me-2"></i>
                Ver Productos
              </a>
              <a routerLink="/crear-producto" class="btn btn-outline-light btn-lg">
                <i class="bi bi-plus me-2"></i>
                Agregar Producto
              </a>
            </div>
          </div>
          <div class="col-lg-6 text-center">
            <div class="store-icon-container">
              <img src="shop.png" alt="ColombiaStore" class="store-image mb-4" title="ColombiaStore">
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container my-5">
      <div class="row text-center">
        <div class="col-md-4 mb-4">
          <div class="card h-100 border-0 shadow">
            <div class="card-body p-4">
              <div class="mb-3">
                <i class="bi bi-plus-circle fa-3x text-primary"></i>
              </div>
              <h5 class="card-title">Agregar Productos</h5>
              <p class="card-text">
                Añade nuevos productos a tu inventario con información detallada 
                como nombre, precio, descripción y stock.
              </p>
              <a routerLink="/crear-producto" class="btn btn-primary">
                Comenzar
              </a>
            </div>
          </div>
        </div>

        <div class="col-md-4 mb-4">
          <div class="card h-100 border-0 shadow">
            <div class="card-body p-4">
              <div class="mb-3">
                <i class="bi bi-list fa-3x text-success"></i>
              </div>
              <h5 class="card-title">Gestionar Inventario</h5>
              <p class="card-text">
                Visualiza todos tus productos en una tabla organizada. 
                Edita información y controla el stock de manera sencilla.
              </p>
              <a routerLink="/productos" class="btn btn-success">
                Ver Lista
              </a>
            </div>
          </div>
        </div>

        <div class="col-md-4 mb-4">
          <div class="card h-100 border-0 shadow">
            <div class="card-body p-4">
              <div class="mb-3">
                <i class="bi bi-bar-chart fa-3x text-info"></i>
              </div>
              <h5 class="card-title">Control Total</h5>
              <p class="card-text">
                Elimina productos obsoletos, actualiza precios y mantén 
                tu catálogo siempre actualizado y organizado.
              </p>
              <a routerLink="/productos" class="btn btn-info">
                Administrar
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-5">
        <div class="col-12 text-center">
          <h3 class="mb-4">Características Principales</h3>
          <div class="row">
            <div class="col-md-3 mb-3">
              <i class="bi bi-phone fa-2x text-primary mb-2"></i>
              <h6>Responsive</h6>
              <small class="text-muted">Funciona en todos los dispositivos</small>
            </div>
            <div class="col-md-3 mb-3">
              <i class="bi bi-lightning fa-2x text-warning mb-2"></i>
              <h6>Rápido</h6>
              <small class="text-muted">Carga instantánea de datos</small>
            </div>
            <div class="col-md-3 mb-3">
              <i class="bi bi-shield-check fa-2x text-success mb-2"></i>
              <h6>Seguro</h6>
              <small class="text-muted">Datos protegidos y seguros</small>
            </div>
            <div class="col-md-3 mb-3">
              <i class="bi bi-heart fa-2x text-info mb-2"></i>
              <h6>Intuitivo</h6>
              <small class="text-muted">Fácil de usar y aprender</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .hero-section {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 5rem 0;
      margin-top: -56px;
      padding-top: 8rem;
    }
    
    .store-icon-container {
      position: relative;
    }
    
    .store-image {
      width: calc(200px + 15vw);
      height: calc(200px + 15vw);
      max-width: 400px;
      max-height: 400px;
      min-width: 180px;
      min-height: 180px;
      object-fit: contain;
      opacity: 0.75;
      filter: brightness(1.2);
    }
    
    @media (max-width: 768px) {
      .store-image {
        width: calc(150px + 6vw);
        height: calc(150px + 6vw);
        max-width: 250px;
        max-height: 250px;
      }
    }
    
    .card {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
    }
    
    .btn {
      transition: all 0.3s ease;
    }
    
    .btn:hover {
      transform: translateY(-1px);
    }
  `]
})
export class HomeComponent { }
