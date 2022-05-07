import { Component, OnInit } from '@angular/core';

/* Mis Importaciones */
import { Usuario } from '../../models/usuario.model';
import { SnackbarService } from '../../servicios/snackbar.service';
import { UsuarioService } from '../../servicios/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public usuarioLogin: Usuario;
  public spinnerButton = false; 

  constructor(
    private _snackbarService : SnackbarService,
    private _usuarioService : UsuarioService,
    private router : Router

  ) { 
    this.usuarioLogin = new Usuario();
  }

  ngOnInit(): void {
  }

  login(){
    if(this.usuarioLogin.usuario.length == 0){
      this._snackbarService.open('Ingrese el Usuario ...!', 'text-danger');
      return;
    }else if(this.usuarioLogin.password.length == 0){
      this._snackbarService.open('Ingrese la Contraseña ...!', 'text-danger');
      return;
    }else{
      this.spinnerButton = true;
      let json = { usuario: this.usuarioLogin }

      this._usuarioService.login(json).subscribe((res:any) => {
        if(res.status){
          this._snackbarService.open('Bienvenido al Sistema');
          this.router.navigateByUrl('/dashboard');
          localStorage.setItem('usuario', JSON.stringify(res.data));
        }else{
          this._snackbarService.open(res.mensaje, 'text-danger');
          this.spinnerButton = false;
        }
      });
      
      
    }
    
  }

}
