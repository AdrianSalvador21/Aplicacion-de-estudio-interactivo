import { Component, OnInit } from '@angular/core';
import {SeuService} from '../../../servicios/seu.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  //La variable guardará el texto del input
  amigo:string = "";
  //Arreglo que almacenará a los usuarios encontrados
  amigos:any[] = [];

  //Forma parte del cuerpo de la consulta de busqueda
  body:any;
  objeto:any;

  //Forma parte del cuerpo de la solicitud de amistad
  bodySolicitud:any;
  objetoSolicitud:any;

  //Variable que almacenará la clave del usuario actual
  usuarioActual:string;

  //Formará parte del cuepo de solicitudes recibidas
  bodySolicitudes:any;
  objetoSolicitudes:any;

  //Formará parte del cuepo de nombre de usuarios
  bodyNombres:any;
  objetoNombres:any;

  mostrar:boolean = true;

  //almacenará las solicitudes recibidas ya con el nombre de usuario
  solicitudesRecibidasNombres:any[] = [];

  //almacenará el id temporal y la fecha temporal
  idActual:any;
  fecha:Date;
  id_solicitud:any;

  //Formará parte del cuerpo de aceptar o rechazar solicitud
  bodyConfirmar:any;
  objetoConfirmar:any;

  //formará parte del cuerpo para obtener amigos
  bodyAllAmigos:any;
  objetoAllAmigos:any;

  //almacenará el id y ña fecha de cada amigo
  idAmigoActual:any;
  fechaAmigoActual:any;

  //objetoAmigos
  bodyAmigos:any;
  objetoAmigos:any;

  //todos los Amigos
  allAmigos:any[] = [];

  constructor(private _seuService:SeuService) {
    this.usuarioActual = localStorage.getItem("clave");

    //Obtener las solicitudes de amistad
    this.obtenerSolicitudes(this.usuarioActual);
    this.obtenerAmigos(this.usuarioActual);
  }

  ngOnInit() {
  }

  buscar(){
    console.log(this.amigo);
    this.objeto = {amigo: this.amigo};
    this.body = 'data=' + JSON.stringify(this.objeto)
    this._seuService.buscarAmigos(this.body).subscribe(amigos=>{
      console.log(amigos);
      this.amigos = amigos;
      let n = this.amigo.length;
      if(n == 0){
        this.mostrar = false;
      }
      else{
        this.mostrar = true;
      }
    });
  }

  //Funcion agregará un amigo
  agregar(id){
      //El id es a quien le quieré enviar invitacion
      //Usuario actual almacena la clave de la persona que envia la solicitud
      console.log(this.usuarioActual);
      console.log(id);

      this.objetoSolicitud = {claveUsuario: this.usuarioActual, idAmigo: id};
      this.bodySolicitud = 'data=' + JSON.stringify(this.objetoSolicitud);

      this._seuService.solicitudAmigo(this.bodySolicitud).subscribe(res =>{
        console.log(res);

        if(res.length == 0){
          Swal({
            type: 'success',
            title: 'La solicitud fue enviada correctamente!',
            showConfirmButton: false,
            timer: 1500
          });
        }
        else if(res.length >=2){
          Swal({
            type: 'success',
            title: 'Ya son amigos!',
            showConfirmButton: false,
            timer: 1500
          });
        }
        else{
          Swal({
              type: 'error',
              title: 'La solicitud ya fue enviada!!',
              showConfirmButton: false,
              timer: 1500
            });
        }
      });
  }

  obtenerSolicitudes(usuarioActual){
    this.objetoSolicitudes = {clave: usuarioActual};
    this.bodySolicitudes = 'data=' + JSON.stringify(this.objetoSolicitudes);
    this._seuService.solicitudesRecibidas(this.bodySolicitudes).subscribe(solicitudes => {
      console.log(solicitudes);
      for(let i = 0; i<solicitudes.length; i++){
         console.log(solicitudes[i].usuario_id);

         this.idActual = solicitudes[i].usuario_id;
         this.fecha = solicitudes[i].fecha_amigos;
         this.id_solicitud = solicitudes[i].usuario_amigo_id;


         this.objetoNombres = {id: solicitudes[i].usuario_id};
         this.bodyNombres = 'data=' + JSON.stringify(this.objetoNombres);
         this._seuService.obtenerUsuarioId(this.bodyNombres).subscribe(usuario =>{
           console.log(usuario[0].nombre);
           let solicitudCompleta = {nombre: usuario[0].nombre,apellido:usuario[0].ap_paterno,correo:usuario[0].correo, id_envio: this.idActual, fecha: this.fecha, idSolicitud: this.id_solicitud};
           this.solicitudesRecibidasNombres.push(solicitudCompleta);
           console.log(this.solicitudesRecibidasNombres);
         });
      }
    });
  }


  confirmarSolicitud(id){
      console.log(id);
      this.objetoConfirmar = {id_solicitud: id};
      this.bodyConfirmar = 'data=' + JSON.stringify(this.objetoConfirmar);
      this._seuService.aceptarSolicitud(this.bodyConfirmar).subscribe(res => {
        console.log(res);
        if(res.length == 1){
          Swal({
            type: 'success',
            title: 'Solicitud aceptada!',
            showConfirmButton: false,
            timer: 1500
          });
        }
        this.solicitudesRecibidasNombres = [];
        this.obtenerSolicitudes(this.usuarioActual);
        this.allAmigos = [];
        this.obtenerAmigos(this.usuarioActual);
      });
  }



  eliminarSolicitud(id){
      console.log(id);
      this.objetoConfirmar = {id_solicitud: id};
      this.bodyConfirmar = 'data=' + JSON.stringify(this.objetoConfirmar);
      this._seuService.rechazarSolicitud(this.bodyConfirmar).subscribe(res =>{
        console.log(res);
        if(res.length == 1){
          Swal({
            type: 'success',
            title: 'Solicitud rechazada!',
            showConfirmButton: false,
            timer: 1500
          });
        }
        this.solicitudesRecibidasNombres = [];
        this.obtenerSolicitudes(this.usuarioActual);
      });
  }


  obtenerAmigos(usuarioActual){
    this.objetoAllAmigos = {clave: usuarioActual};
    this.bodyAllAmigos = 'data=' + JSON.stringify(this.objetoSolicitudes);
    this._seuService.obtenerAmigos(this.bodyAllAmigos).subscribe(amigos => {
      console.log(amigos);
      for(let i=0; i<amigos.length; i++){

        this.idAmigoActual = amigos[i].usuario_id;
        this.fechaAmigoActual = amigos[i].fecha_registro;

        let amigoCompleto = {nombreAmigo: amigos[i].nombre, apellidoAmigo: amigos[i].ap_paterno, correoAmigo: amigos[i].correo, idAmigo: amigos[1].usuario_id};
        this.allAmigos.push(amigoCompleto);
        console.log(this.allAmigos);
      }
    });
  }



}
