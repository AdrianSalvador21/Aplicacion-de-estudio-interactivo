import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {SeuService} from '../../../servicios/seu.service';

@Component({
  selector: 'app-lecciones',
  templateUrl: './lecciones.component.html',
  styleUrls: ['./lecciones.component.css']
})
export class LeccionesComponent implements OnInit {

  listaEjercicios:any[] = [{'ejercicio': 'Cuestionario', 'clave': 'preguntas'},
                            {'ejercicio': 'Relación de conceptos', 'clave': 'conceptos'},
                            {'ejercicio': 'Verdadero o falso', 'clave': 'falsoverdadero'}];

  leccionesCompletadas:any[] = []

  //Almacenará el id de la materia a mostrar
  idMateria:any;
  //Guargará la informacion del id en un objeto
  objetoMateria:any;
  bodyMateria:any;
  //Almacenará el nombre de la materia actual
  materia:any = "";

  //Guardará la informacion del idMateria a enviar
  objetoUnidades:any;
  bodyUnidades:any;

  //Almacenará la informacion de las unidades recuperadas
  unidades:any[] = [];

  //Guardará la informacion del idUnidad a enviar
  objetoLecciones:any;
  bodyLecciones:any;

  //Almacenará la informacion de las lecciones recuperadas
  lecciones:any[] = [];

  //Guardará la informacion del idUnidad a enviar (una unidad)
  objetoUnidad:any;
  bodyUnidad:any;

  //Almacenará la informacion de las lecciones recuperadas
  unidadNombre:any = "";
  unidadId:any = "";

  //mostrar boton de ir a ejercicios
  botonEjercicios:boolean = false;


  claveUsuario:string;
  objetoCompletadas:any;
  bodyCompletadas:any;


  constructor(private _seuService:SeuService, private router:Router,
              private activatedRoute:ActivatedRoute) {

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

                  //Obtenemos el parametro recibido por la url
                  this.activatedRoute.params.subscribe(parametro =>{
                     this.idMateria = parametro["id"];
                     console.log(this.idMateria);

                     //(MATERIAS) Formamos el objeto y hacemos la peticion al servicio
                     this.objetoMateria = {id:this.idMateria};
                     this.bodyMateria = 'data=' + JSON.stringify(this.objetoMateria);
                     this._seuService.obtenerMateria(this.bodyMateria).subscribe(materia =>{
                       console.log(materia);
                       this.materia = materia[0].nombre;
                     });

                     //(UNIDADES) Formamos el objeto y hacemos la peticion al servicio
                     this.objetoUnidades = {idMateria: this.idMateria};
                     this.bodyUnidades = 'data=' + JSON.stringify(this.objetoUnidades);
                     this._seuService.obtenerUnidades(this.bodyUnidades).subscribe(unidades =>{
                        console.log(unidades);
                        this.unidades = unidades;
                     });

                  });

               }

  ngOnInit() {
  }

  mostrarLecciones(idUnidad){

    this.botonEjercicios = true;

    this.unidadId = idUnidad;
    console.log(idUnidad);
    console.log(this.idMateria);
    //En este punto, se tiene el id de la leccion, y el id de la materia
    //Hacemos una consulta de las lecciones a la tabla de lecciones

    this.objetoLecciones = {idUnidad: idUnidad};
    this.bodyLecciones = 'data=' + JSON.stringify(this.objetoLecciones);
    this._seuService.obtenerLecciones(this.bodyLecciones).subscribe(lecciones => {
      console.log(lecciones);
        //Obtenemos las lecciones de la respuesta
        this.lecciones = [];
        this.lecciones = lecciones;
    });



    this.objetoUnidad = {id: idUnidad};
    this.bodyUnidad = 'data=' + JSON.stringify(this.objetoUnidad);
    this._seuService.obtenerUnidad(this.bodyUnidad).subscribe(unidad =>{
      console.log(unidad);
      this.unidadNombre = unidad[0].nombre;
      
    });
  }


  irLeccion(id_leccion){
    //Nos lleva al componente del tema
    console.log(id_leccion);
    this.router.navigate(['/contenido/tema', id_leccion]);
  }

}
