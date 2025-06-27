import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <a class="navbar-brand" routerLink="/">
          <i class="fas fa-store me-2"></i>
          ColombiaStore
        </a>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
                data-bs-target="#navbarNav" aria-controls="navbarNav" 
                aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">
                <i class="fas fa-home me-1"></i>
                Inicio
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/productos" routerLinkActive="active">
                <i class="fas fa-box me-1"></i>
                Productos
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/crear-producto" routerLinkActive="active">
                <i class="fas fa-plus me-1"></i>
                Agregar Producto
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar-brand {
      font-size: 1.8rem;
      font-weight: bold;
    }
    
    .nav-link {
      transition: all 0.3s ease;
      border-radius: 8px;
      margin: 0 4px;
      padding: 8px 16px !important;
    }
    
    .nav-link:hover {
      background-color: rgba(255, 255, 255, 0.1);
      transform: translateY(-1px);
    }
    
    .nav-link.active {
      background-color: rgba(255, 255, 255, 0.2);
      font-weight: 600;
    }
  `]
})
export class NavbarComponent { }
