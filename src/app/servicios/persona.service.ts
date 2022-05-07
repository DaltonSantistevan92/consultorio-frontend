import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(
    private _baseService: BaseService,
    private http: HttpClient
  ) { }

  

  
}
