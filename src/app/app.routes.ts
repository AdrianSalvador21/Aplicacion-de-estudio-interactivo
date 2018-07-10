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
import {MateriasComponent} from './components/contenido/materias/materias.component';
import {LeccionesComponent} from './components/contenido/lecciones/lecciones.component';
import {PrincipalComponent} from './components/amigos/principal/principal.component';
import {EstadisticasComponent} from './components/amigos/estadisticas/estadisticas.component';
import {TemaComponent} from './components/contenido/tema/tema.component';

//Bloqueo de rutas
import {AuthGuardService} from "./servicios/auth-guard.service";
import {AuthGuardServiceInicio} from "./servicios/auth-guard-inicio.service";




const APP_ROUTES: Routes = [
  { path: 'inicio', component: LoginComponent, canActivate:[AuthGuardServiceInicio] },
  { path: 'perfil', component: PerfilComponent, canActivate:[AuthGuardService] },
  { path: 'contenido', component: ContenidoComponent, canActivate:[AuthGuardService],
          children:[
              { path: 'mat', component: MateriasComponent},
              { path: 'lecciones/:id', component: LeccionesComponent},
              { path: 'tema/:id', component: TemaComponent},
              { path: '**', pathMatch: 'full', redirectTo: 'mat' }
          ]},
  { path: 'ejercicios', component: EjerciciosComponent, canActivate:[AuthGuardService] },
  { path: 'chat', component: ChatComponent, canActivate:[AuthGuardService] },
  { path: 'admin', component: PerfilComponent, canActivate:[AuthGuardService] },
  { path: 'amigos', component: AmigosComponent, canActivate:[AuthGuardService],
          children:[
              { path: 'principal', component: PrincipalComponent},
              { path: 'status', component: EstadisticasComponent},
              { path: '**', pathMatch: 'full', redirectTo: 'principal' }

          ]},
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
