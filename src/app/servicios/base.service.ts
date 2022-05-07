import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private url:string = '';

  constructor() {
    this.url = environment.url;
  }

  getUrlApi(){
    return this.url;
  }
}
