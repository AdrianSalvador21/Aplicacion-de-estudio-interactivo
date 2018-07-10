import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {SeuService} from '../../../servicios/seu.service';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit {

  materias:any[] = [];

  //En el constructor, se hará la consulta http, para obtener el listado de materias
  constructor(private _seuService:SeuService, private router:Router) {
      this._seuService.obtenerAllMaterias().subscribe(materias =>{
        console.log(materias);
        this.materias = materias;
        console.log(this.materias);
      });
  }

  ngOnInit() {
  }

  //Redireccionará al componente de lecciones, enviando el id de la materia
  //seleccionada por el usuario
  irLecciones(idMateria){
      console.log(idMateria);
      this.router.navigate(['/contenido/lecciones', idMateria]);
  }

}
