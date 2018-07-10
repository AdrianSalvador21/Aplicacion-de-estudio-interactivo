import { Component, OnInit } from '@angular/core';
import { ChatService } from "../../servicios/chat.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  mensaje:string = "";
  elemento: any;
  usuario:string = "";

  constructor(public _cs:ChatService) {
    this._cs.cargarMensajes().subscribe( ()=>{
      setTimeout(()=>{
          this.elemento.scrollTop = this.elemento.scrollHeight;
      },20);
    });

    this.usuario = localStorage.getItem("alumno"); 
  }

  ngOnInit(){
    this.elemento = document.getElementById('app-mensajes');
  }

  enviar_mensaje(){
    console.log(this.mensaje);
    if(this.mensaje.length == 0 ){
      return;
    }
    else{
      this._cs.agregarMensaje(this.mensaje)
               .then(()=>this.mensaje = "")
               .catch((err)=>console.error('Error al enviar', err));
    }
  }

}
