import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})

export class AutenticacionGuard implements CanActivate{

    constructor(private router:Router){ }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
    | boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        
        let dataUsuario: any = localStorage.getItem('usuario');
        //console.log(dataUsuario);
        
        if(dataUsuario){
            dataUsuario = JSON.parse(dataUsuario);

            if(dataUsuario.rol_id == 1){//administrador
                this.router.navigateByUrl('/dashboard/home');
            }else if (dataUsuario.rol_id == 2){ //doctor
                this.router.navigateByUrl('/dashboard/home');
            }else if(dataUsuario.rol_id == 3){//recepcionista
                this.router.navigateByUrl('/dashboard/home');
            }
            return false;
        }else{
            return true;  //No hay sesion activa
        }
    }
}