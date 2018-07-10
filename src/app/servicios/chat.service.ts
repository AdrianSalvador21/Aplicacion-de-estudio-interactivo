import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import {Mensaje} from "../interface/mensaje.interface";
import { Observable} from 'rxjs';
import 'rxjs/add/operator/map';

import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<any>;
  public chats:any[] = [];
  public usuario:string;

  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth) {

        //this.afAuth.authState.subscribe( user =>{
          // console.log("Estado del usuario: " + user);
           //console.log(user);

           //if(!user){
             //return;
           //}

           //this.usuario.nombre = user.displayName;
           //this.usuario.uid = user.uid;
        //});

        this.usuario = localStorage.getItem("alumno");

  }

  //login(proveedor:string) {
    //if(proveedor == 'google'){
      //  this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    //}else{
      //this.afAuth.auth.signInWithPopup(new auth.TwitterAuthProvider());
    //}

  //}

  //logout() {
    //this.usuario = {};
    //this.afAuth.auth.signOut();
  //}

  cargarMensajes(){
    this.itemsCollection = this.afs.collection<any>('chats', ref => ref.orderBy('fecha', 'desc')
                                                                            .limit(5));

    return this.itemsCollection.valueChanges()
                               .map((mensajes: any[]) => {
                                 console.log(mensajes);
                                 this.chats = [];
                                 for(let mensaje of mensajes){
                                   this.chats.unshift(mensaje);
                                 }
                                 console.log(this.chats);
                                 return this.chats;
                               });
  }

  agregarMensaje(texto:string){
      //TODO falsa el UID del usuario
      let mensaje = {
        nombre:this.usuario,
        mensaje: texto,
        fecha: new Date().getTime(),
        uid: 1
      }

      return this.itemsCollection.add(mensaje);
  }

}
