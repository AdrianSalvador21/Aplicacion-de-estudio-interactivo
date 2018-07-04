import { RouterModule, Routes } from '@angular/router';
import {InicioComponent} from './components/inicio/inicio.component';
import {LoginComponent} from './components/inicio/login/login.component';
import {PerfilComponent} from './components/inicio/perfil/perfil.component';
import {RegistroComponent} from './components/inicio/registro/registro.component';

import {AdminComponent} from './components/admin/admin.component';
import {AmigosComponent} from './components/amigos/amigos.component';
import {ChatComponent} from './components/chat/chat.component';
import {ContenidoComponent} from './components/contenido/contenido.component';
import {EjerciciosComponent} from './components/ejercicios/ejercicios.component';

//Bloqueo de rutas
import {AuthGuardService} from "./servicios/auth-guard.service";




const APP_ROUTES: Routes = [
  { path: 'inicio', component: InicioComponent},
  { path: 'login', component: LoginComponent },
  { path: 'perfil', component: PerfilComponent, canActivate:[AuthGuardService] },
  { path: 'contenido', component: ContenidoComponent, canActivate:[AuthGuardService] },
  { path: 'ejercicios', component: EjerciciosComponent, canActivate:[AuthGuardService] },
  { path: 'chat', component: ChatComponent, canActivate:[AuthGuardService] },
  { path: 'admin', component: PerfilComponent, canActivate:[AuthGuardService] },
  { path: 'amigos', component: AmigosComponent, canActivate:[AuthGuardService] },

  //{ path: 'comprar/:id', component: ComprarComponent },
  //{ path: 'about', component: AboutComponent, canActivate:[AuthGuardService],
    //children:[
      //{ path: 'proveedores', component: ProveedoresComponent },
      //{ path: 'pedidos', component: PedidosComponent },
      //{ path: 'clientes', component: ClientesComponent },
      //{ path: 'inventario', component: InventarioComponent },
      //{ path: '**', pathMatch: 'full', redirectTo: 'proveedores' }
    //]
  //},
  //{ path: 'heroes', component: HeroesComponent },
  //{ path: 'heroe/:id', component: HeroeComponent },
  //{ path: 'buscar/:termino', component: BuscadorComponent },
  //{ path: 'inicio', component: InicioComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
