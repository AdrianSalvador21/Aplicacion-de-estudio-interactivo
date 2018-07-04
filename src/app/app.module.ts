import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavegacionComponent } from './components/navegacion/navegacion.component';

//Rutas
import {APP_ROUTING} from './app.routes';

//Servicios
import {SeuService} from './servicios/seu.service';
import {AuthGuardService} from "./servicios/auth-guard.service";


//Componentes
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/inicio/login/login.component';
import { RegistroComponent } from './components/inicio/registro/registro.component';
import { PerfilComponent } from './components/inicio/perfil/perfil.component';
import { ContenidoComponent } from './components/contenido/contenido.component';
import { EjerciciosComponent } from './components/ejercicios/ejercicios.component';
import { AmigosComponent } from './components/amigos/amigos.component';
import { ChatComponent } from './components/chat/chat.component';
import { AdminComponent } from './components/admin/admin.component';


@NgModule({
  declarations: [
    AppComponent,
    NavegacionComponent,
    InicioComponent,
    LoginComponent,
    RegistroComponent,
    PerfilComponent,
    ContenidoComponent,
    EjerciciosComponent,
    AmigosComponent,
    ChatComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    SeuService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
