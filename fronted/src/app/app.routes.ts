import { Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component"
import{RegisterComponent} from "./pages/register/register.component"
import{TaskComponent} from "./pages/task/task.component"
import { authGuard } from './guards/auth.guard';
import { CrearProductoComponent } from './pages/crear-producto/crear-producto.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { EditarProductoComponent } from './pages/editar-producto/editar-producto.component';

export const routes: Routes = [
    {
        path:"",
        redirectTo:"login",
        pathMatch:"full"
    },
    {
        path:"login",
        component: LoginComponent
    },
     {
        path:"register",
        component: RegisterComponent
    },
     {
        path:"task",
        component: TaskComponent,
        canActivate: [authGuard]
    },
    {
    path: 'productos',
    component: ProductosComponent,
    canActivate: [authGuard]
    
  },
  {
    path: 'crear-producto',
    component: CrearProductoComponent,
    canActivate: [authGuard]
  },
  {
    path: 'editar-producto/:id',
    component: EditarProductoComponent,
    canActivate: [authGuard]
  }

];
