import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";

import { Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs';

@Injectable()
export class SeuService {

  verificarUsuarioUrl:string = "http://localhost:8080/sei/db/verificarUsuario.php";
  registrarUsuarioUrl:string = "http://localhost:8080/sei/db/registrarUsuario.php";


  constructor(private http:Http) {
    console.log('servicio listo para usarse');
  }


  //Funcion que verifica si el usuario ingresado existe, y la contraseña es correcta
  verificarUsuario(usuario){
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.verificarUsuarioUrl, usuario, {
      headers: headers
    }).map(res => res.json());
  }

  registrarUsuario(usuario){
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.registrarUsuarioUrl, usuario, {
      headers: headers
    }).map(res => res.json());
  }





}
