import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import {Router, ActivatedRoute} from "@angular/router";
import {SeuService} from '../../../servicios/seu.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //Variables que guardarán los datos del formulario inicio de sesion
  correo:string;
  contrasenia:string;

  //Formaran parte del cuerpo de la peticion a http
  body:any;
  objeto:any;

  //Variables para mostrar mensajes de error en el html validad usuario
  inicioIncorrecto:boolean = false;


  //Objeto que guardará los valores del form de registro de usuario
  usuarioRegistrar:Object = {
     nombre: "",
     edad: "",
     correo: "",
     contrasenia: ""
  }

  //Formaran parte del cuerpo de la peticion a http registro
  bodyRegistro:any;


  //Variables para mostrar mensaje de registrado, correo no valido, y usuario ya existente
  correoNoValido:boolean = false;
  usuarioRegistrado:boolean = false;
  usuarioYaExistente:boolean = false;

  constructor(private _seuService:SeuService) { }

  ngOnInit() {
  }




  confirmarInicio(forma:NgForm){
    console.log(forma);
    this.objeto = {correo: this.correo, contrasenia: this.contrasenia};
    this.body = 'data=' + JSON.stringify(this.objeto)
    this._seuService.verificarUsuario(this.body).subscribe(respuesta => {

      console.log(respuesta);
      //Si la respuesta tiene una longitud de 1, el usuario si existe
      if(respuesta.length == 1){
          console.log("usuario correcto");
          console.log(respuesta[0].nombre);
          localStorage.setItem("alumno", respuesta[0].nombre);
          localStorage.setItem("loginExitoso", "true");

          location.href="http://localhost:4200/";
      //Si la longitud es 0, el usuario no existe
      }else{
          console.log("usuario incorrecto");
          this.inicioIncorrecto = true;
          setTimeout(()=>{
            this.inicioIncorrecto = false;
          }, 3000);
      }
    });
  } //Fin de funcion confirmarInicio



  registrarUsuario(forma:NgForm){
    console.log(forma);
    console.log(this.usuarioRegistrar);

    this.bodyRegistro = 'data=' + JSON.stringify(this.usuarioRegistrar);
    this._seuService.registrarUsuario(this.bodyRegistro).subscribe(respuesta =>{
      console.log(respuesta);

      if(respuesta.length == 1){
        //Usuario ya existe, error
        this.usuarioYaExistente = true;
        setTimeout(()=>{
          this.usuarioYaExistente = false;
        }, 3000);
      }else if(respuesta.length >= 1){
        this.correoNoValido = true;
        setTimeout(()=>{
          this.correoNoValido = false;
        }, 3000);
      }else{
        this.usuarioRegistrado = true;
        setTimeout(()=>{
          this.usuarioRegistrado = false;
        }, 3000);
      }


    });

  }

}
