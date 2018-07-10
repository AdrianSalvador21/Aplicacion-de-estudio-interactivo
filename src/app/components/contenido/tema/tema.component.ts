import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {SeuService} from '../../../servicios/seu.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  id_leccion:any;

  //formara parte del cuerpo de la solicitud de recursos
  objetoRecursos:any;
  bodyRecursos:any;


  //guardará las rutas
  rutaImagen:any;
  rutaImagen2:any;
  rutaInfo:any;

  //Almacenará el texto completo, toda la informacion
  textoCompleto:string = "";

  //Texto separado por parrafos
  textoSeparado:string[] = [];

  //titulo leccion
  titulo:string;
  tutuloUnidad:string;

  //formara parte del cuerpo de la solicitud de leccion
  objetoLeccion:any;
  bodyLeccion:any;

  //id unidad
  idUnidad:any;

  //formara parte del cuerpo de la solicitud de leccion
  objetoUnidad:any;
  bodyUnidad:any;




  constructor(private activatedRoute:ActivatedRoute, private _seuService:SeuService) {
      this.activatedRoute.params.subscribe(parametros =>{
        //Asignamos el id de la leccion a una variable
        this.id_leccion = parametros["id"];

        //Obtenemos informacion de los recursos de esa leccion
        this.objetoRecursos = {id_leccion: this.id_leccion};
        this.bodyRecursos = 'data=' + JSON.stringify(this.objetoRecursos);

        this._seuService.obtenerRecursos(this.bodyRecursos).subscribe(recursos =>{
          console.log(recursos);
          this.rutaImagen = recursos[0].ruta_imagen;
          this.rutaInfo = recursos[0].ruta_informacion;
          this.rutaImagen2 = recursos[0].ruta_imagen2;

          //Obtenemos informacion de la ruta solicitada
          this._seuService.obtenerTexto(this.rutaInfo).subscribe(texto => {
             this.textoCompleto = texto.text();
             this.textoSeparado = this.textoCompleto.split("/");
             console.log(this.textoSeparado);
          })
        });

        //Obtenemos informacion de la Leccion
        this.objetoLeccion = {id: this.id_leccion};
        this.bodyLeccion = 'data=' + JSON.stringify(this.objetoLeccion);
        this._seuService.obtenerLeccionId(this.bodyLeccion).subscribe(leccion =>{
          console.log(leccion);
          this.titulo = leccion[0].nombre;
          this.idUnidad = leccion[0].unidad_id;

          this.objetoUnidad = {id: this.idUnidad};
          this.bodyUnidad = 'data=' + JSON.stringify(this.objetoUnidad);
          this._seuService.obtenerUnidad(this.bodyUnidad).subscribe(unidad =>{
            console.log(unidad);
            this.tutuloUnidad = unidad[0].nombre;
          });
        });
      })


  }

  ngOnInit() {
  }

}
