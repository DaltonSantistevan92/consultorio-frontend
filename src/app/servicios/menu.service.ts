import { Injectable } from '@angular/core';

/* Mis Importaciones */
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    private _baseService: BaseService,
    private http: HttpClient) { }

    mostrarMenu(rol_id: number, sesionPadre:any = 0){
      let url = this._baseService.getUrlApi()+  `menu/${rol_id}/${sesionPadre}`;
      return this.http.get(url);
    }
}
