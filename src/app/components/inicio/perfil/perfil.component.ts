import { Component, OnInit } from '@angular/core';
import {SeuService} from '../../../servicios/seu.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  idUsuario:any;
  
  objetoClave:any;
  bodyClave:any;

  objetoUsuario:any;
  bodyUsuario:any;

  claveUsuario:any;

  puntajeUsuario:any;
  nombreNivel:any = 'Nivel';
  porcentajeAvance:any;

  infoUsuario:any;
  nombre:any;

  constructor(private _seuService:SeuService) {

    this.idUsuario = localStorage.getItem('id');

    this.claveUsuario = localStorage.getItem('clave');
    console.log(this.claveUsuario);

    this.objetoClave = {clave: this.claveUsuario};
    this.bodyClave = 'data=' + JSON.stringify(this.objetoClave);

    this._seuService.buscarPuntaje(this.bodyClave).subscribe(puntaje => {
        console.log(puntaje);
        this.puntajeUsuario = puntaje;
        this.nombreNivel = this.puntajeUsuario[0].nombre_nivel;
        this.porcentajeAvance = (100/(this.puntajeUsuario[0].fin_nivel - this.puntajeUsuario[0].inicio_nivel))* this.puntajeUsuario[0].puntaje;

        console.log(this.porcentajeAvance);
    });


    this.objetoUsuario = {id: this.idUsuario};
    this.bodyUsuario = 'data=' + JSON.stringify(this.objetoUsuario);

    this._seuService.obtenerUsuarioId(this.bodyUsuario).subscribe(usuario => {
        console.log(usuario);
        this.infoUsuario = usuario;
        this.nombre = `${this.infoUsuario[0].nombre} ${this.infoUsuario[0].ap_paterno}`
    });

  }

  ngOnInit() {
  }

}
