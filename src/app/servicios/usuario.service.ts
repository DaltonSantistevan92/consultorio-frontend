import { Injectable } from '@angular/core';
/* Mis Importaciones */
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private _baseServicio: BaseService,
    private http: HttpClient,
  ) { }


  login(data: any){
    let url = this._baseServicio.getUrlApi() + 'usuario/login';
    return this.http.post(url,data); 
  }

  countUsuario(){
    let url = this._baseServicio.getUrlApi() + 'usuario/listar'
    return this.http.get(url);     
  }

  guardandoUsuarioPersona(data:any){
    let url = this._baseServicio.getUrlApi() + 'usuario/save';
    return this.http.post(url,data);
  }

  listCantUsuario(){
    let url = this._baseServicio.getUrlApi() + 'usuario/listcant'
    return this.http.get(url);     
  }

  listarUsuarioxId(id:string){
    let url = this._baseServicio.getUrlApi() + `usuario/listar/${id}`;
    return this.http.get(url);
  }

  editarUsuario(data:any){
    let url = this._baseServicio.getUrlApi() + 'usuario/editar';
    return this.http.post(url,data);
  }

  eliminarUsuario(data:any){
    let url = this._baseServicio.getUrlApi() + 'usuario/eliminar';
    return this.http.post(url,data);
  }
  
}
