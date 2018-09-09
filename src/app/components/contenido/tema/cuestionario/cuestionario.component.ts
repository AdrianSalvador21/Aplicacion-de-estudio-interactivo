import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {SeuService} from '../../../../servicios/seu.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cuestionario',
  templateUrl: './cuestionario.component.html',
  styleUrls: ['./cuestionario.component.css']
})
export class CuestionarioComponent implements OnInit {

  puntaje:number = 0;

  id_unidad:any;

  preguntas:any[] = [];

  objetoPregunta:any;
  bodyPreguntas:any;

  objetoIncisos:any;
  bodyIncisos:any;

  longitudPreguntas:number;
  inicio:number = 0;

  preguntaActual:Object;

  id_pregunta:any;

  respuestas:any[] = [];
  respuestaCorrecta:string;

  respuestaUsuario:string;

  correctas:number = 0;

  btnResultado:boolean = false;

  constructor(private activatedRoute:ActivatedRoute, private _seuService:SeuService, private router:Router) { 
    this.activatedRoute.parent.params.subscribe(parametros => {
        this.id_unidad = parametros['id'];
        
          //Obtener preguntas | Posterios obtener incisos de esa pregunta
          this.objetoPregunta = {id_unidad: this.id_unidad};
          this.bodyPreguntas = 'data=' + JSON.stringify(this.objetoPregunta);
          //Obtenemos preguntas y las asignamos a un arreglo
          this._seuService.obtenerPreguntas(this.bodyPreguntas).subscribe(preguntas => {
              console.log(preguntas);

              for (let p of preguntas) {
                //console.log(p);
                if(p.tipo_pregunta == 'A'){
                  this.preguntas.push(p);
                  console.log(this.preguntas);
                  
                }
              }
              this.longitudPreguntas = this.preguntas.length;
              console.log(this.longitudPreguntas);
              

              if(this.longitudPreguntas > this.inicio){
                    this.preguntaActual = this.preguntas[this.inicio];
                    this.inicio += 1;
              }

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
          })
        
    });
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
      this.preguntaActual = this.preguntas[this.inicio];
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

      this.puntaje = this.correctas * 10;
      this.btnResultado = true;
      
    }

    


  }

  resultado(){

  }

}
