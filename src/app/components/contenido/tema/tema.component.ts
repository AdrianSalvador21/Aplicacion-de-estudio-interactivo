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
  allPreguntas:any[] = [];

  aleatorio:number;

  preguntaActual:Object;

  indexActual:any;

  /*//formara parte del cuerpo de la solicitud de recursos
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

  */

  //titulo leccion
  //titulo:string;
  tutuloUnidad:string;

  //formara parte del cuerpo de la solicitud de leccion
  objetoPreguntas:any;
  bodyPreguntas:any;

  //id unidad
  idUnidad:any;

  //formara parte del cuerpo de la solicitud de leccion
  objetoUnidad:any;
  bodyUnidad:any;

  objetoIncisos:any;
  bodyIncisos:any;


  /*RELACION DE CONCEPTOS*/
  boton: boolean = true;

  arregloDatos: any = [{'concepto': 'pollo', 'definicion': 'animal'}, 
                       {'concepto': 'arroz', 'definicion': 'comida'},
                       {'concepto': 'manzana', 'definicion': 'fruta'},
                       {'concepto': 'arbol', 'definicion': 'planta'}];

  arregloConceptosOrd: any[] = [];
  arregloDefinicionesOrd: any[] = [];
  
  concepto: any[] = [];
  definicion: any[] = [];
  arregloRespuestas: any[];
  calificacion: number = 0;
  titulo:string = "Titulo"






  constructor(private activatedRoute:ActivatedRoute, private _seuService:SeuService) {
      this.activatedRoute.params.subscribe(parametros =>{
        //Asignamos el id de la leccion a una variable
        this.idUnidad = parametros["id"];
        console.log(this.idUnidad);

        this.objetoPreguntas = {id_unidad: this.idUnidad};
        this.bodyPreguntas = 'data=' + JSON.stringify(this.objetoPreguntas);
        this._seuService.obtenerPreguntas(this.bodyPreguntas).subscribe(preguntas => {
            console.log(preguntas);
            this.allPreguntas = preguntas;
            this.aleatorio = Math.floor(Math.random()*(this.allPreguntas.length - 1));
            this.preguntaActual = this.allPreguntas[this.aleatorio];

            this.indexActual = this.allPreguntas.indexOf(this.preguntaActual);

            console.log(this.indexActual);

            //console.log(this.preguntaActual['pregunta_id']);




            //Obtener incisos
            this.objetoIncisos = {id_pregunta: this.preguntaActual['pregunta_id'], tipo_pregunta: this.preguntaActual['tipo_pregunta']};
            this.bodyIncisos = 'data=' + JSON.stringify(this.objetoIncisos);
            this._seuService.obtenerInciso(this.bodyIncisos).subscribe(incisos => {
              console.log(incisos);
              
            })
        });

        /*//Obtenemos informacion de los recursos de esa leccion
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
        });*/

        //Obtenemos informacion de la Leccion
        // this.objetoLeccion = {id: this.id_leccion};
        // this.bodyLeccion = 'data=' + JSON.stringify(this.objetoLeccion);
        // this._seuService.obtenerLeccionId(this.bodyLeccion).subscribe(leccion =>{
        //   console.log(leccion);
        //   this.titulo = leccion[0].nombre;
        //   this.idUnidad = leccion[0].unidad_id;

        //   //obtenemos la informacion de la unidad

        //   this.objetoUnidad = {id: this.idUnidad};
        //   this.bodyUnidad = 'data=' + JSON.stringify(this.objetoUnidad);
        //   this._seuService.obtenerUnidad(this.bodyUnidad).subscribe(unidad =>{
        //     console.log(unidad);
        //     this.tutuloUnidad = unidad[0].nombre;
        //   });
        // });

      })


      /*RELACION DE CONCEPTOS*/
      this.arregloRespuestas = [];


      


  }

  ngOnInit() {
  }


  //FUNCIONES RELACION DE CONCEPTOS
  respuestas(valor: string, tipo: string) {

    if (tipo == 'concepto') {
      if(this.concepto.length > 0) {
        this.concepto = [];
      }
      this.concepto.push(valor);
    } else if( tipo == 'definicion') {
      if(this.definicion.length > 0) {
        this.definicion = [];
      }
      this.definicion.push(valor);
    }

    if(this.concepto.length != 0 && this.definicion.length != 0) {

      let concepto = this.concepto[0];
      let definicion = this.definicion[0];

      if(this.arregloRespuestas.length >= 0) {
        
        for (const respuesta of this.arregloRespuestas) {
          console.log(respuesta);
          
          if(respuesta.concepto == concepto) {
            respuesta.definicion = definicion;
          }          
        }
      }

      this.concepto = [];
      this.definicion = [];

    }

    this.desbloquearBoton();

    console.log(this.arregloRespuestas);
  }

  verCalificacion() {
    console.log('xd');
    for (const dato of this.arregloDatos) {
      for (const datoResp of this.arregloRespuestas) {
        if(dato.concepto === datoResp.concepto) {
          if (dato.definicion === datoResp.definicion) {
            this.calificacion += 1;
          }     
        }
      }
    }
    console.log(this.calificacion);
    
  }

  desbloquearBoton() {
    let indice:number = 0;
      for (const respuesta of this.arregloRespuestas) {
        if(respuesta.definicion !== '') {
          indice += 1;
          console.log(indice);
          
          if(indice === 4) {
            this.boton = false;
          }
        }
      }
  }

  reiniciar() {
    this.arregloRespuestas = [{'concepto': 'pollo', 'definicion': ''}, 
    {'concepto': 'arroz', 'definicion': ''},
    {'concepto': 'manzana', 'definicion': ''},
    {'concepto': 'arbol', 'definicion': ''}];
    this.boton = true;
    this.calificacion = 0;
  }



  /*Boton para cambiar pregunta*/
  siguiente(){

    if(this.allPreguntas.length >= 1){
        //Aun hay preguntas en el arreglo
        this.allPreguntas.splice(this.indexActual, 1);
        console.log(this.allPreguntas);
  
        //Asignar la nueva pregunta
        this.aleatorio = Math.floor(Math.random()*(this.allPreguntas.length - 1));
        this.preguntaActual = this.allPreguntas[this.aleatorio];
  
        this.objetoIncisos = {id_pregunta: this.preguntaActual['pregunta_id'], tipo_pregunta: this.preguntaActual['tipo_pregunta']};
        this.bodyIncisos = 'data=' + JSON.stringify(this.objetoIncisos);
        this._seuService.obtenerInciso(this.bodyIncisos).subscribe(incisos => {
            console.log(incisos);
            if(this.preguntaActual['tipo_pregunta'] == 'A'){

            }
            else if(this.preguntaActual['tipo_pregunta'] == 'B'){
                console.log('En b')
                this.arregloDatos = incisos;
                console.log(this.arregloDatos);
                for (let respuesta in this.arregloDatos) {
                    this.arregloRespuestas.push({'concepto': respuesta['concepto_nombre'], 'definicion': '' })
                }

                let arregloConceptos:any[] = [];
                let arregloDefiniciones:any[] = [];
                for (const dato of this.arregloDatos) {
                   arregloConceptos.push(dato.concepto_nombre);  
                   arregloDefiniciones.push(dato.definicion);       
                }
                this.arregloConceptosOrd = arregloConceptos.sort();
                this.arregloDefinicionesOrd = arregloDefiniciones.sort();
            }
            else{

            }
        })

    }
      
  }

}
