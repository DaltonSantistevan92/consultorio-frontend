import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class DashboardGuard implements CanActivate{

    constructor(private router: Router){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
        | boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
        let user:any = localStorage.getItem('usuario');
        //console.log(user);
        
        if(user){
            return true;
          }else{
            this.router.navigateByUrl('/login');
            return false;
          }
    }


}