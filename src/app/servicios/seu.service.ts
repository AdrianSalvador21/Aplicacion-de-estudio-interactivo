import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";

import { Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs';

@Injectable()
export class SeuService {

  verificarUsuarioUrl:string = "http://localhost/sei/db/verificarUsuario.php";
  registrarUsuarioUrl:string = "http://localhost/sei/db/registrarUsuario.php";
  allMateriasUrl:string = "http://localhost/sei/db/allMaterias.php";
  allUnidadesUrl:string = "http://localhost/sei/db/allUnidades.php";
  allLeccionesUrl:string = "http://localhost/sei/db/allLecciones.php";
  obtenerMateriaUrl:string = "http://localhost/sei/db/obtenerMateria.php";
  obtenerUnidadUrl:string = "http://localhost/sei/db/obtenerUnidad.php";
  obtenerLeccionIdUrl:string = "http://localhost/sei/db/obtenerLeccionId.php";
  obtenerUsuarioIdUrl:string = "http://localhost/sei/db/obtenerUsuarioId.php";
  buscarAmigosUrl:string = "http://localhost/sei/db/buscarAmigos.php";
  solicitudAmigoUrl:string = "http://localhost/sei/db/solicitudAmigo.php";
  solicitudesRecibidasUrl:string = "http://localhost/sei/db/solicitudesRecibidas.php";
  aceptarSolicitudUrl:string = "http://localhost/sei/db/aceptarSolicitud.php";
  rechazarSolicitudUrl:string = "http://localhost/sei/db/rechazarSolicitud.php";
  allAmigosIdUrl:string = "http://localhost/sei/db/allAmigosId.php";
  obtenerRecursosUrl:string = "http://localhost/sei/db/obtenerRecursos.php";
  obtenerPreguntasUrl:string = "http://localhost/sei/db/obtenerPreguntas.php";
  obtenerCompletadasUrl:string = "http://localhost/sei/db/obtenerCompletadas.php";
  insertarCompletadaUrl:string = "http://localhost/sei/db/insertarCompletada.php";
  //pruebaTextoUrl:string = "http://localhost:8080/sei/info/prueba.php";
  obtenerIncisoUrl:string = "http://localhost/sei/db/obtenerinciso.php";
  guardaPuntajeUrl:string = "http://localhost/sei/db/guardaPuntaje.php";
  buscaPuntajeUrl:string = "http://localhost/sei/db/buscaPuntaje.php";

  //pruebaTextoUrl:string = "assets/info/texto.txt";





  constructor(private http:Http) {
    console.log('servicio listo para usarse');
  }

  //Funcion que obtiene todas las materias
  obtenerAllMaterias(){
  return this.http.get(this.allMateriasUrl)
         .map(res => res.json());
  }

  //Funcion que verifica si el usuario ingresado existe, y la contraseña es correcta
  verificarUsuario(usuario){
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.verificarUsuarioUrl, usuario, {
      headers: headers
    }).map(res => res.json());
  }

  //Funcion que envia los valores del formulario a la base de datos
  registrarUsuario(usuario){
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.registrarUsuarioUrl, usuario, {
      headers: headers
    }).map(res => res.json());
  }

  //Funcion que obtiene solo una materia, mediante su id
  obtenerMateria(id){
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.obtenerMateriaUrl, id, {
      headers: headers
    }).map(res => res.json());
  }

  //Funcion que obtiene solo un usuario, mediante su id
  obtenerUsuarioId(id){
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.obtenerUsuarioIdUrl, id, {
      headers: headers
    }).map(res => res.json());
  }

  //funcion que obtiene todas las unidades, mediante un id de la materia
  obtenerUnidades(idMateria){
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.allUnidadesUrl, idMateria, {
      headers: headers
    }).map(res => res.json());
  }

  //funcion que obtiene todas las lecciones, mediante un id de la unidad
  obtenerLecciones(idUnidad){
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.allLeccionesUrl, idUnidad, {
      headers: headers
    }).map(res => res.json());
  }

  //funcion que obtiene todas las preguntas, mediante un id de la leccion
  obtenerPreguntas(idLeccion){
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.obtenerPreguntasUrl, idLeccion, {
      headers: headers
    }).map(res => res.json());
  }

  //Funcion que obtiene una unidad mediante su id
  obtenerUnidad(id){
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.obtenerUnidadUrl, id, {
      headers: headers
    }).map(res => res.json());
  }

  //Funcion que buscará amigos por correo o nombre
  buscarAmigos(amigo){
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.buscarAmigosUrl, amigo, {
      headers: headers
    }).map(res => res.json());
  }

  //Esta funcion enviará una solicitud de amistad
  solicitudAmigo(solicitud){
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.solicitudAmigoUrl, solicitud, {
      headers: headers
    }).map(res => res.json());
  }

  //Esta funcion retornará las solicitudes de amistad recibidas.
  solicitudesRecibidas(clavePersonal){
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.solicitudesRecibidasUrl, clavePersonal, {
      headers: headers
    }).map(res => res.json());
  }

  //Esta funcion acepta solicitud de amistad
  aceptarSolicitud(id_solicitud){
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.aceptarSolicitudUrl, id_solicitud, {
      headers: headers
    }).map(res => res.json());
  }

  //Esta funcion rechaza solicitud de amistad
  rechazarSolicitud(id_solicitud){
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.rechazarSolicitudUrl, id_solicitud, {
      headers: headers
    }).map(res => res.json());
  }

  //Esta funcion obtiene todos los amigos de un id
  obtenerAmigos(clavePersonal){
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.allAmigosIdUrl, clavePersonal, {
      headers: headers
    }).map(res => res.json());
  }

  //Esta funcion obtiene la informacion de los recursos de una leccion
  obtenerRecursos(id_leccion){
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.obtenerRecursosUrl, id_leccion, {
      headers: headers
    }).map(res => res.json());
  }

  obtenerLeccionId(id){
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.obtenerLeccionIdUrl, id, {
      headers: headers
    }).map(res => res.json());
  }

  obtenerCompletadas(clave){
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.obtenerCompletadasUrl, clave, {
      headers: headers
    }).map(res => res.json());
  }

  obtenerInciso(pregunta){
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.obtenerIncisoUrl, pregunta, {
      headers: headers
    }).map(res => res.json());
  }

  insertarCompletada(leccion){
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.insertarCompletadaUrl, leccion, {
      headers: headers
    });
  }

  guardaPuntaje(puntaje){
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.guardaPuntajeUrl, puntaje, {
      headers: headers
    });
  }

  buscarPuntaje(clave){
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.buscaPuntajeUrl, clave, {
      headers: headers
    }).map(res => res.json());
  }

  //prueba texto
  obtenerTexto(ruta){
      return this.http.get(ruta);
  }

}
