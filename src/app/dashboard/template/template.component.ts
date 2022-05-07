import { Component, OnInit, ViewChild } from '@angular/core';

/* Mis Importaciones */
import { MenuService } from '../../servicios/menu.service';
import { Menu } from '../../models/menu.model';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario.model';
import { ToolService } from '../../servicios/tool.service';


@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {
  @ViewChild('drawer') matDrawer:any;

  nombreCompleto: string = '';
  cargo : string = '';
  img: string = '';

  public usuario:Usuario;
  public objMenu:any = {};
  public menus:Menu[]=[];

  constructor(private _menuService:MenuService,private router: Router,private _toolService:ToolService) {
      this.usuario = new Usuario();
    }

  ngOnInit(): void {
    this.getMenus();
  }

  getMenus(){
    let data:any = localStorage.getItem('usuario');
    this.usuario = JSON.parse(data);

    this.nombreCompleto = `${this.usuario.persona.nombre} ${this.usuario.persona.apellido}`; 
    this.cargo = `${this.usuario.rol.cargo}`;
    this.img = `${this.usuario.img}`;

    this.img = this._toolService.mostrarArchivo('usuarios',this.img);
    
    this._menuService.mostrarMenu(this.usuario.rol_id).subscribe((res:any) =>{
      this.objMenu = res;
      this.menus = res.data;
    });
  }

  cerrarMenu(event:any){
    this.matDrawer.close();
  }

  salir(){
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  

  



}
