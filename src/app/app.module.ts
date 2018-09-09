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
import {AuthGuardServiceInicio} from "./servicios/auth-guard-inicio.service";
import {ChatService} from "./servicios/chat.service";


//Angular firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';

//pipe
import { KeysPipe } from './pipes/keys.pipe';

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

import { environment } from '../environments/environment';
import { MateriasComponent } from './components/contenido/materias/materias.component';
import { LeccionesComponent } from './components/contenido/lecciones/lecciones.component';
import { PrincipalComponent } from './components/amigos/principal/principal.component';
import { EstadisticasComponent } from './components/amigos/estadisticas/estadisticas.component';
import { TemaComponent } from './components/contenido/tema/tema.component';
import { LecturaComponent } from './components/contenido/tema/lectura/lectura.component';
import { TrabajoComponent } from './components/contenido/tema/trabajo/trabajo.component';
import { CuestionarioComponent } from './components/contenido/tema/cuestionario/cuestionario.component';
import { ConceptosComponent } from './components/contenido/tema/conceptos/conceptos.component';
import { TruefalseComponent } from './components/contenido/tema/truefalse/truefalse.component';
import { AleatorioComponent } from './components/contenido/tema/aleatorio/aleatorio.component';


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
    AdminComponent,
    MateriasComponent,
    KeysPipe,
    LeccionesComponent,
    PrincipalComponent,
    EstadisticasComponent,
    TemaComponent,
    LecturaComponent,
    TrabajoComponent,
    CuestionarioComponent,
    ConceptosComponent,
    TruefalseComponent,
    AleatorioComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule
  ],
  providers: [
    SeuService,
    AuthGuardService,
    AuthGuardServiceInicio,
    ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
