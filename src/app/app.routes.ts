import { Routes } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { ProductoListaComponent } from './components/producto-lista.component';
import { ProductoFormComponent } from './components/producto-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'productos', component: ProductoListaComponent },
  { path: 'crear-producto', component: ProductoFormComponent },
  { path: 'editar-producto/:id', component: ProductoFormComponent },
  { path: '**', redirectTo: '' }
];
