import { Injectable } from '@angular/core';
import {Router,
        ActivatedRouteSnapshot,
        RouterStateSnapshot,
        CanActivate} from '@angular/router';


@Injectable()
export class AuthGuardService implements CanActivate {

  sesion:any;

  constructor() {
      this.sesion = localStorage.getItem('loginExitoso');
  }

  canActivate(next:ActivatedRouteSnapshot, state:RouterStateSnapshot){


    console.log(next);

    if(this.sesion === 'false'){
      console.log("Bloqueado por el guard");
      return false;
    }
    else{
      return true;
    }

  }
}
