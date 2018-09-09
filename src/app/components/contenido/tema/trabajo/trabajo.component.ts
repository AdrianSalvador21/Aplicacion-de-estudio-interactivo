import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {SeuService} from '../../../../servicios/seu.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trabajo',
  templateUrl: './trabajo.component.html',
  styleUrls: ['./trabajo.component.css']
})
export class TrabajoComponent implements OnInit {

  //formara parte del cuerpo de la solicitud de preguntas
  objetoCompletadas:any;
  bodyCompletadas:any;
  claveUsuario:string;

  leccionesCompletadas:any[] = []

  id_leccion:any;
  //formara parte del cuerpo de la solicitud de preguntas
  objetoPreguntas:any;
  bodyPreguntas:any;
  //numero de preguntas
  noPreguntas:any;
  //todas las preguntas
  allPreguntas:any[] = [];

  //respuesta correcta
  respuestaCorrecta:string;
  //almacenamos todas las respuestas
  respuestas:any[] = [];

  contador:any;

  preguntaActual:any;

  descripcionError:any;

  mostrarError:boolean = false;
  mostrarCorrecto:boolean = false;
  mostrarVerificar:boolean = true;
  mostrarSiguiente:boolean = false;

  respuestaActual:any = "";


  respuestasCorrectas:number = 0;

  terminado:boolean = false;


  //formara parte del cuerpo de la solicitud de insercion
  objetoInsertar:any;
  bodyInsertar:any;





  constructor(private activatedRoute:ActivatedRoute, private _seuService:SeuService, private router:Router) {

        this.contador = 1;
        //obtener completadas
        this.claveUsuario = localStorage.getItem("clave");
        this.objetoCompletadas = {clave: this.claveUsuario};
        this.bodyCompletadas = 'data=' + JSON.stringify(this.objetoCompletadas);
        this._seuService.obtenerCompletadas(this.bodyCompletadas).subscribe(completadas =>{
          console.log(completadas);
          for(let i = 0; i<completadas.length; i++){
            this.leccionesCompletadas.push(completadas[i].leccion_id);
          }
          console.log(this.leccionesCompletadas);
        });


        this.activatedRoute.parent.params.subscribe(parametros => {
          console.log(parametros["id"]);
          this.id_leccion = parametros["id"];

          //Obtenemos informacion de las preguntas de esa leccion
          this.objetoPreguntas = {id_leccion: this.id_leccion};
          this.bodyPreguntas = 'data=' + JSON.stringify(this.objetoPreguntas);
          this._seuService.obtenerPreguntas(this.bodyPreguntas).subscribe(preguntas =>{
            console.log(preguntas);
            this.allPreguntas = preguntas;
            this.noPreguntas = preguntas.length;
            console.log(this.noPreguntas);
            //almacenamos la primera respuesta correcta
            this.respuestaCorrecta = this.allPreguntas[0].correcta;
            //almacenamos todas las respuestas
            this.respuestas.push(this.allPreguntas[0].correcta);
            this.respuestas.push(this.allPreguntas[0].incorrectaUno);
            this.respuestas.push(this.allPreguntas[0].incorrectaDos);
            this.respuestas.push(this.allPreguntas[0].incorrectaTres);
            console.log(this.respuestas);
            this.respuestas = this.respuestas.sort();

            this.preguntaActual = this.allPreguntas[0].pregunta;
            this.descripcionError = this.allPreguntas[0].descripcion;

          });

        });

  }

  ngOnInit() {
  }

  obtenerRespuesta(respuesta){
    this.respuestaActual = respuesta;
  }



  verificar(){
      if(this.respuestaActual == this.respuestaCorrecta){
        console.log("respues correcta");
        this.mostrarCorrecto = true;
        this.mostrarSiguiente = true;
        this.mostrarVerificar = false;
        this.respuestasCorrectas += 1;
      }else{
        console.log("respues incorrecta")
        this.mostrarError = true;
        this.mostrarSiguiente = true;
        this.mostrarVerificar = false;
      }
  }

  siguiente(){
    this.mostrarError = false;
    this.contador = this.contador + 1;
    this.respuestaActual = '';
      this.mostrarCorrecto = false;
      this.mostrarSiguiente = false;
      this.mostrarVerificar = true;
      if(this.contador > this.noPreguntas){
        console.log("terminado");
        this.terminado = true;


      }else{
        //
        this.respuestaCorrecta = this.allPreguntas[this.contador-1].correcta;
        this.respuestas = [];
        this.respuestas.push(this.allPreguntas[this.contador-1].correcta);
        this.respuestas.push(this.allPreguntas[this.contador-1].incorrectaUno);
        this.respuestas.push(this.allPreguntas[this.contador-1].incorrectaDos);
        this.respuestas.push(this.allPreguntas[this.contador-1].incorrectaTres);
        this.respuestas = this.respuestas.sort();

        this.preguntaActual = this.allPreguntas[this.contador-1].pregunta;
        this.descripcionError = this.allPreguntas[this.contador-1].descripcion;

      }
  }


  reintentar(){
    this.respuestasCorrectas = 0;
    this.terminado = false;
    this.contador = 1;
    this.respuestas = [];
    //almacenamos la primera respuesta correcta
    this.respuestaCorrecta = this.allPreguntas[0].correcta;
    //almacenamos todas las respuestas
    this.respuestas.push(this.allPreguntas[0].correcta);
    this.respuestas.push(this.allPreguntas[0].incorrectaUno);
    this.respuestas.push(this.allPreguntas[0].incorrectaDos);
    this.respuestas.push(this.allPreguntas[0].incorrectaTres);
    console.log(this.respuestas);
    this.respuestas = this.respuestas.sort();

    this.preguntaActual = this.allPreguntas[0].pregunta;
    this.descripcionError = this.allPreguntas[0].descripcion;
    this.mostrarError = false;
  }



  completado(){
      //leccion ya fue completada alguna vez
      if(this.leccionesCompletadas.includes(this.id_leccion)){

        //this.router.navigate(['/heroes']);
        Swal({
          title: '¡Completada!',
          text: "Leccion completada con exito",
          type: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Continuar!'
        }).then((result) => {
          if (result.value) {
            location.reload();
          }
        });

      }else{
        //incluir la leccion a la base de datos
        this.objetoInsertar = {leccion_id:this.id_leccion, clave: this.claveUsuario};
        this.bodyInsertar = 'data=' + JSON.stringify(this.objetoInsertar);
        this._seuService.insertarCompletada(this.bodyInsertar).subscribe(completada =>{
          console.log(completada);
          Swal({
            title: '¡Completada!',
            text: "Leccion completada con exito",
            type: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar!'
          }).then((result) => {
            if (result.value) {
              location.reload();
            }
          });
        });


      }
  }

}
