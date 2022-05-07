import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { RolService } from '../../servicios/rol.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  
  public nameUsuario: string = '';
  public countUsuario: number = 0;

  public nameRol: string = '';
  public countRol: number = 0;


  constructor(
    private _usuarioService: UsuarioService,
    private _rolService:RolService) {

  }

  ngOnInit(): void {
    this.cardUsuario();
    this.cardRol();
  }

  cardUsuario(){
    this._usuarioService.countUsuario().subscribe((res:any)=>{
      if(res.status){ this.nameUsuario = res.nombre;  this.countUsuario = res.cantidad; }  
    });
  }

  cardRol(){
    this._rolService.countRoles().subscribe((res:any) =>{
      if(res.status){ this.nameRol = res.nombre; this.countRol = res.cantidad; }
    });
  }


}
