import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {SeuService} from '../../../../servicios/seu.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-aleatorio',
  templateUrl: './aleatorio.component.html',
  styleUrls: ['./aleatorio.component.css']
})
export class AleatorioComponent implements OnInit {

  claveUsuario:any;

  arreglo_preguntas:any[] = [];
  id_unidad:any;

  objetoPregunta:any;
  bodyPreguntas:any;

  longitudPreguntas:number;
  inicio:number = 0;

  objetoIncisos:any;
  bodyIncisos:any;

  respuestas:any[] = [];
  respuestasCorrectas:any[] = [];

  preguntaActual:Object;

  respuestasUsuarios:any[] = [];


  correctas:number = 0;

  btnResultado:boolean = false;
  puntaje:number = 0;

  mostrarError:boolean = false;

  constructor(private activatedRoute:ActivatedRoute, private _seuService:SeuService, private router:Router) { 
      
    this.claveUsuario = localStorage.getItem('clave');

      this.activatedRoute.parent.params.subscribe(parametro => {
          this.id_unidad = parametro['id'];

          this.objetoPregunta = {id_unidad: this.id_unidad};
          this.bodyPreguntas = 'data=' + JSON.stringify(this.objetoPregunta);

          this._seuService.obtenerPreguntas(this.bodyPreguntas).subscribe(preguntas => {
            for (let p of preguntas) {
              //console.log(p);
              if(p.tipo_pregunta == 'D'){
                this.arreglo_preguntas.push(p);
              }
            }

            console.log(this.arreglo_preguntas);
            this.longitudPreguntas = this.arreglo_preguntas.length;
            console.log(this.longitudPreguntas);

            if(this.longitudPreguntas > this.inicio){
              this.preguntaActual = this.arreglo_preguntas[this.inicio];
              this.inicio += 1;
            }

            console.log(this.preguntaActual);
            this.objetoIncisos = {id_pregunta: this.preguntaActual['pregunta_id'], tipo_pregunta: 'A'};
            this.bodyIncisos = 'data=' + JSON.stringify(this.objetoIncisos);

            
            this._seuService.obtenerInciso(this.bodyIncisos).subscribe(incisos => {
              console.log(incisos);

            for (const pregunta of incisos) {
                 if(pregunta.correcta == "1"){
                    this.respuestasCorrectas.push(pregunta.inciso_nombre);
                 }
                this.respuestas.push(pregunta.inciso_nombre);
            }

            console.log(this.respuestasCorrectas);
            console.log(this.respuestas);
              
          });

          });
      });
  }

  ngOnInit() {
  }

  asignarRespuesta(respuestaUsuario){
    this.respuestasUsuarios.push(respuestaUsuario);
  }


  siguiente(){

    if(this.respuestasUsuarios.length >= this.respuestas.length){
      //Usuario selecciono todas las opciones! Mostar alerta
      //Volvemos a inicializar la variable
      this.mostrarError = true;
      this.respuestasUsuarios = [];
    }else{
       //Caso contrario se contabilizan las correctas
        for (const res of this.respuestasUsuarios) {
          if(this.respuestasCorrectas.includes(res)){
            this.correctas += 0.5;
          }else{
            //Una respuesta no pertenece
            if(this.correctas <= 0){
              this.correctas = 0;
            }else{
              this.correctas += 0.5;
            }
          }
        }
    
        console.log(this.correctas);
        
    
        console.log(this.longitudPreguntas);
        console.log(this.inicio);
        }

    

    if(this.longitudPreguntas > this.inicio){
      //this.respuestas = [];
      console.log('hola');
      this.preguntaActual = this.arreglo_preguntas[this.inicio];
      this.inicio += 1;

      console.log(this.preguntaActual);
      this.objetoIncisos = {id_pregunta: this.preguntaActual['pregunta_id'], tipo_pregunta: 'D'};
      this.bodyIncisos = 'data=' + JSON.stringify(this.objetoIncisos);
  
      this._seuService.obtenerInciso(this.bodyIncisos).subscribe(incisos => {
          console.log(incisos);
  
          for (const pregunta of incisos) {
            if(pregunta.correcta == "1"){
               this.respuestasCorrectas.push(pregunta.inciso_nombre);
            }
           this.respuestas.push(pregunta.inciso_nombre);
          }
  
          console.log(this.respuestasCorrectas);
          console.log(this.respuestas);
        
        });
    }else{

      this.puntaje = this.correctas * 10;
      this.btnResultado = true;
      
    }

  }

}
