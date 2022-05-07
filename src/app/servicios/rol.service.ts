import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { Rol } from '../models/rol.model';

@Injectable({
  providedIn: 'root'
})
export class RolService {

    constructor(
      private _baseServicio: BaseService,
      private http: HttpClient,) { }

    countRoles(){
      let url = this._baseServicio.getUrlApi() + 'rol/listar';
      return this.http.get(url);     
    }

    selectRoles(): Observable<any>{
      let url = this._baseServicio.getUrlApi() + 'rol/select';
      return this.http.get<Rol[]>(url);
    }
}
