import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class HorariosAtencionService {

  constructor(
    private _baseService: BaseService,
    private http: HttpClient
  ) { }

  guardarHorarioAtencion(data:any){
    let url = this._baseService.getUrlApi() + 'horariosAtencion/guardar';
    return this.http.post(url,data);
  }

  listarHorarios(id:string){
    let url = this._baseService.getUrlApi() + `horariosAtencion/mostrarHorarioDoctor/${id}`;
    return this.http.get(url);
  }

  eliminarHorarioAtencion(horarios_atencion_id:string){
    let url = this._baseService.getUrlApi() + `eliminarDoctorHorarioAtencion/${horarios_atencion_id}`;
    return this.http.delete(url);
  }
}
