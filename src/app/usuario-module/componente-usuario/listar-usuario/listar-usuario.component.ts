import { Component, Inject, OnInit } from '@angular/core';
import { UsuarioService } from '../../../servicios/usuario.service';
import { ToolService } from '../../../servicios/tool.service';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditarUsuarioComponent } from '../modales/editar-usuario/editar-usuario.component';
import { SnackbarService } from '../../../servicios/snackbar.service';


@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.scss']
})
export class ListarUsuarioComponent implements OnInit {

  public usuarioData:any = {
    cantidad: 0,
    data: []
  }; 

  public json:any = {
    usuario:{
      id: '',
      persona_id: '',
      rol_id:'',
      correo: '',
      usuario: '',
      img: '',
      password: '',
    },
    persona:{
      id:'',
      cedula: '',
      nombre: '',
      apellido:'',
      telefono: '',
      direccion: '',
    }
  }

  constructor(
    private _usuarioService:UsuarioService,
    private _toolService:ToolService,
    private dialog:MatDialog,
    private _snackService: SnackbarService
  ) { 
    this.listUsuario();
  }

  ngOnInit(): void {
    this.listUsuario();
  }

  listUsuario(){
    this._usuarioService.listCantUsuario()
    .subscribe((res:any) => {
      this.usuarioData = res;  
    });
  }

  verimg(image:string):string{
    return this._toolService.mostrarArchivo('usuarios', image);
  }


  editar(id:string){
    const referencia = this.dialog.open(EditarUsuarioComponent,{
      data: {id},
      width:'620px',
    });

    referencia.afterClosed().subscribe((res:any) => {
      if(res){
        //console.log(res);
        this.listUsuario(); 
      }
    });  
  }

  eliminar(id:string){
    let json:any = {
      usuario: {
          id: id,
      }
    };
    this._usuarioService.eliminarUsuario(json).subscribe((res:any)=>{
      if(res.status){
        this._snackService.open(res.mensaje, 'text-primary');
        this.listUsuario();
      }else{
        this._snackService.open(res.mensaje, 'text-danger');
      }
    });  
  }

}
