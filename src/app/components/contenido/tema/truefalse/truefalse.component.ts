import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {SeuService} from '../../../../servicios/seu.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-truefalse',
  templateUrl: './truefalse.component.html',
  styleUrls: ['./truefalse.component.css']
})
export class TruefalseComponent implements OnInit {

  puntaje:number = 0;

  longitudPreguntas:number;
  inicio:number = 0;

  arregloPreguntas:any = [];
  idUnidad: any;

  preguntaActual:Object;
  incisosActuales:any = [];

  objetoPregunta:any;
  bodyPreguntas:any;

  respuestas:any[] = [];
  respuestaCorrecta:string;

  objetoIncisos:any;
  bodyIncisos:any;

  respuestaUsuario:string;

  btnResultado:boolean = false;

  correctas:number = 0;







  constructor(private activatedRoute:ActivatedRoute, private _seuService:SeuService, private router:Router) { 

      this.activatedRoute.parent.params.subscribe(parametros => {
         this.idUnidad = parametros["id"];
         console.log(this.idUnidad);

         //Obtener preguntas | Posterios obtener incisos de esa pregunta
        this.objetoPregunta = {id_unidad: this.idUnidad};
        this.bodyPreguntas = 'data=' + JSON.stringify(this.objetoPregunta);
        //Obtenemos preguntas y las asignamos a un arreglo
        this._seuService.obtenerPreguntas(this.bodyPreguntas).subscribe(preguntas => {
            console.log(preguntas);

            for (let p of preguntas) {
              //console.log(p);
              if(p.tipo_pregunta == 'C'){
                this.arregloPreguntas.push(p);
                console.log(this.arregloPreguntas);
              }
            }

            this.longitudPreguntas = this.arregloPreguntas.length;
              console.log(this.longitudPreguntas);

            if(this.longitudPreguntas > this.inicio){
               this.preguntaActual = this.arregloPreguntas[this.inicio];
               this.inicio += 1;
            }

            this.objetoIncisos = {id_pregunta: this.preguntaActual['pregunta_id'], tipo_pregunta: 'C'};
              this.bodyIncisos = 'data=' + JSON.stringify(this.objetoIncisos);

            this._seuService.obtenerInciso(this.bodyIncisos).subscribe(incisos => {
              console.log(incisos);

              for (const pregunta of incisos) {
                  if(pregunta.correcta == "1"){
                      this.respuestaCorrecta = pregunta.inciso_nombre;
                  }
                  this.respuestas.push(pregunta.inciso_nombre);
              }

              console.log(this.respuestaCorrecta);
              console.log(this.respuestas);
              
          });

            
            
        })
         
      })

  }

  ngOnInit() {
  }

  asignarRespuesta(respuestaUsuario){
    this.respuestaUsuario = respuestaUsuario;
  }


  siguiente(){

   

    //Si existe correcta 
    if(this.respuestaUsuario == this.respuestaCorrecta){
      this.correctas += 1;
      console.log(this.correctas);
    }

    console.log(this.longitudPreguntas);
    console.log(this.inicio);
    
    

    if(this.longitudPreguntas > this.inicio){
      this.respuestas = [];
      console.log('hola');
      this.preguntaActual = this.arregloPreguntas[this.inicio];
      this.inicio += 1;

      console.log(this.preguntaActual);
      this.objetoIncisos = {id_pregunta: this.preguntaActual['pregunta_id'], tipo_pregunta: 'A'};
      this.bodyIncisos = 'data=' + JSON.stringify(this.objetoIncisos);
  
      this._seuService.obtenerInciso(this.bodyIncisos).subscribe(incisos => {
          console.log(incisos);
  
          for (const pregunta of incisos) {
              if(pregunta.correcta == "1"){
                  this.respuestaCorrecta = pregunta.inciso_nombre;
              }
              this.respuestas.push(pregunta.inciso_nombre);
          }
  
          console.log(this.respuestaCorrecta);
          console.log(this.respuestas);
        
        });
    }else{
      this.btnResultado = true;
      this.puntaje *= this.correctas;
    }

    


  }

}
