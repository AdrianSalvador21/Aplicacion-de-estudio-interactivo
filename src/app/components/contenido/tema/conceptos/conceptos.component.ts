import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {SeuService} from '../../../../servicios/seu.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-conceptos',
  templateUrl: './conceptos.component.html',
  styleUrls: ['./conceptos.component.css']
})
export class ConceptosComponent implements OnInit {

  id_unidad:any;

  preguntas:any[] = [];
  arregloDatos:any[] = [];

  objetoPregunta:any;
  bodyPreguntas:any;

  objetoIncisos:any;
  bodyIncisos:any;

  id_pregunta:any;

  //----------------------
  boton: boolean = true;

  arregloConceptosOrd: any[] = [];
  arregloDefinicionesOrd: any[] = [];
  
  concepto: any[] = [];
  definicion: any[] = [];
  arregloRespuestas: any[] = [];
  calificacion: number = 0;
  titulo:string = "Titulo"

  constructor(private activatedRoute:ActivatedRoute, private _seuService:SeuService, private router:Router) { 
    //Obtener parametro de la ruta padre, la cual será el id de la unidad
    this.activatedRoute.parent.params.subscribe(parametros => {
        this.id_unidad = parametros['id'];
        console.log(this.id_unidad);
        this.objetoPregunta = {id_unidad: this.id_unidad};
        this.bodyPreguntas = 'data=' + JSON.stringify(this.objetoPregunta);
        //Obtenemos preguntas y las asignamos a un arreglo
        this._seuService.obtenerPreguntas(this.bodyPreguntas).subscribe(preguntas => {
            for (let p of preguntas) {
              //console.log(p);
              if(p.tipo_pregunta == 'B'){
                this.preguntas.push(p);
              }
            }
            console.log(this.preguntas);
            //Almacena el id de la pregunta y realiza la consulta de incisos
            this.id_pregunta = this.preguntas[0].pregunta_id;
            console.log(this.id_pregunta);
            
            this.objetoIncisos = {id_pregunta: this.id_pregunta, tipo_pregunta: "B"};
            this.bodyIncisos = 'data=' + JSON.stringify(this.objetoIncisos);
            this._seuService.obtenerInciso(this.bodyIncisos).subscribe(incisos => {
              //Obteneos los incisos y los almacenamos
              console.log(incisos);
              this.arregloDatos = incisos;
              for (let respuesta in this.arregloDatos) {
                  this.arregloRespuestas.push({'concepto': this.arregloDatos[respuesta].concepto_nombre, 'definicion': '' })
              }
              console.log(this.arregloRespuestas);
              

  
              let arregloConceptos:any[] = [];
              let arregloDefiniciones:any[] = [];
              for (const dato of this.arregloDatos) {
                 arregloConceptos.push(dato.concepto_nombre);  
                 arregloDefiniciones.push(dato.definicion);       
              }
              this.arregloConceptosOrd = arregloConceptos.sort();
              this.arregloDefinicionesOrd = arregloDefiniciones.sort();
              })
        });
    });
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
         if(dato.concepto_nombre === datoResp.concepto) {
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

}
