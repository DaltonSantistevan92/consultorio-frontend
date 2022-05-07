import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../servicios/menu.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-usuario-component',
  templateUrl: './usuario-component.component.html',
  styleUrls: ['./usuario-component.component.scss']
})
export class UsuarioComponentComponent implements OnInit {

  public mas = false;
  public menusHijos:any = {};
  public usuario: Usuario;

  public menuPadre = 3;


  constructor(
    private _menuService: MenuService,
  ) { 
    this.usuario = new Usuario;
  }

  ngOnInit(): void {
    this.getMenu();
  }

  getMenu(){
    let data:any = localStorage.getItem('usuario');
    this.usuario = JSON.parse(data);

    this._menuService.mostrarMenu(this.usuario.rol_id,this.menuPadre)
    .subscribe((res:any)=>{
      //console.log(res);
      this.menusHijos=res;
    });
    

  }

}
