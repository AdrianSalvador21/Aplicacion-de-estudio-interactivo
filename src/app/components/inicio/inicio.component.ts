import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  usuario:any;
  local: any;
  mostrarNombre:boolean = false;

  constructor() {
      this.local = localStorage.getItem("alumno");
      if(this.local == "false"){
        console.log("Usuario sin registrar");
        this.mostrarNombre = false;
      }else{
        console.log("usuario ya registrado")
        this.mostrarNombre = true;
        this.usuario = this.local;
      }
  }

  ngOnInit() {
  }

}
