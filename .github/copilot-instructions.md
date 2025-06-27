<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# ProductStore Frontend - Angular Application

Esta es una aplicación Angular que proporciona un frontend completo para gestionar productos a través de una API REST.

## Estructura del Proyecto

- **Componentes**: Navbar, Footer, Home, ProductoLista, ProductoForm
- **Servicios**: ProductoService para conectar con API REST
- **Modelos**: Interfaces TypeScript para Producto y ApiResponse
- **Estilos**: Bootstrap 5 con estilos personalizados

## API Conexión

La aplicación se conecta a una API REST en `http://localhost:3000/api/productos` con operaciones CRUD completas:

- GET `/` - Obtener todos los productos
- GET `/:id` - Obtener producto por ID
- POST `/` - Crear nuevo producto
- PUT `/:id` - Actualizar producto
- DELETE `/:id` - Eliminar producto

## Funcionalidades

1. **Página de Inicio**: Hero section con información de la aplicación
2. **Lista de Productos**: Tabla responsiva con acciones de editar/eliminar
3. **Formulario de Producto**: Crear y editar productos con validación
4. **Navegación**: Navbar responsivo y footer informativo
5. **Notificaciones**: Manejo de errores y mensajes de éxito

## Tecnologías

- Angular 18+ (Standalone Components)
- Bootstrap 5
- Font Awesome
- RxJS para manejo de estado
- TypeScript
