import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer mt-5 py-4">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <h5 class="mb-3">
              <i class="fas fa-store me-2"></i>
              ColombiaStore
            </h5>
            <p class="mb-0">
              Sistema de gestión de productos desarrollado con Angular y Node.js.
              Una solución moderna y eficiente para tu negocio.
            </p>
          </div>
          <div class="col-md-3">
            <h6 class="mb-3">Enlaces Rápidos</h6>
            <ul class="list-unstyled">
              <li><a href="#" class="text-light text-decoration-none">Inicio</a></li>
              <li><a href="#" class="text-light text-decoration-none">Productos</a></li>
              <li><a href="#" class="text-light text-decoration-none">Agregar Producto</a></li>
            </ul>
          </div>
          <div class="col-md-3">
            <h6 class="mb-3">Contacto</h6>
            <p class="mb-1"><i class="fas fa-envelope me-2"></i>info&#64;productstore.com</p>
            <p class="mb-1"><i class="fas fa-phone me-2"></i>+57 3125048481</p>
            <div class="mt-3">
              <a href="#" class="text-light me-3"><i class="fab fa-facebook-f"></i></a>
              <a href="#" class="text-light me-3"><i class="fab fa-twitter"></i></a>
              <a href="#" class="text-light me-3"><i class="fab fa-instagram"></i></a>
              <a href="#" class="text-light"><i class="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>
        <hr class="my-4">
        <div class="row align-items-center">
          <div class="col-md-6">
            <p class="mb-0">&copy; 2025 ProductStore. Todos los derechos reservados.</p>
          </div>
          <div class="col-md-6 text-md-end">
            <p class="mb-0">Desarrollado con ❤️ usando Angular y Node.js</p>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      margin-top: auto;
    }
    
    .footer a {
      transition: all 0.3s ease;
    }
    
    .footer a:hover {
      transform: translateY(-2px);
      opacity: 0.8;
    }
    
    .footer hr {
      border-color: rgba(255, 255, 255, 0.2);
    }
  `]
})
export class FooterComponent { }
