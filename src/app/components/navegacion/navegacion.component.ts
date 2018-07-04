import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {

  sesionCerrada:boolean = true;
  inicio:string;

  constructor() {
    this.inicio = localStorage.getItem('loginExitoso');
      if(this.inicio == "false"){
        this.sesionCerrada = true;
      }else{
        this.sesionCerrada = false;
      }
  }

  ngOnInit() {
  }

  cerrar(){
    //Asigna las variables de sesion como falsas cuando el usuario quiera cerrar sesion
    localStorage.setItem("alumno", "false");
    localStorage.setItem("loginExitoso", "false");
    location.href="http://localhost:4200";
  }


}
