import { Component, OnInit } from '@angular/core';
import {SeuService} from '../../../servicios/seu.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(private _seuService:SeuService) {

        //this._seuService.obtenerTexto().subscribe(data =>{
          //console.log(data.text());
        //})

  }

  ngOnInit() {
  }

}
