import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/* Mis Importaciones */
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Rol } from '../../../../models/rol.model';
import { Persona } from '../../../../models/persona.model';
import { IUsuarios } from '../../../../models/usuario.model';
import { SnackbarService } from '../../../../servicios/snackbar.service';
import { UsuarioService } from '../../../../servicios/usuario.service';
import { ValidacionService } from '../../../../servicios/validacion.service';
import { RolService } from '../../../../servicios/rol.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent implements OnInit {

  public listarUsuario:any = {
    data:[]
  };

  public formulario!: FormGroup;
  public nombreValid = true;
  public emailValid = true;
  public apellidoValid = true;
  public telefonoValid = true;
  public usuarioValid = true;
  public okButton = true;
  public submitted = false;

  public persona!: Persona;
  public usuario!: IUsuarios;
  public roles: Observable<Rol[]> | undefined;

  public personaId: any;

  constructor(
    public dialogo: MatDialogRef<EditarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _usuarioService: UsuarioService,
    private _validacionService: ValidacionService,
    private _snackBarService: SnackbarService,
    private formBuiler: FormBuilder,
    private _rolService: RolService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.mostrarUsuario();
    this.initPersona();
    this.initUsuario();
    this.iniciarFormularios();
    this.mostrarRoles();
  }

  initPersona() {
    this.persona = {
      id: 0,
      cedula: '',
      nombre: '',
      apellido: '',
      telefono: '',
      direccion: '',
      estado: '',
      created_at: '',
      updated_at: '',
    }
  }

  initUsuario() {
    this.usuario = {
      id: 0,
      persona_id: 0,
      rol_id: 0,
      correo: '',
      usuario: '',
      img: '',
      password: ''
    }
  }

  mostrarUsuario(){ 
    let usuarioId:any = this.data.id; 
  
    this._usuarioService.listarUsuarioxId(usuarioId)
    .subscribe((res:any)=>{
      this.listarUsuario = res;

      let data = this.listarUsuario.data;
      data.forEach((element:any) => {
        let persona_id = element.persona_id;
        this.personaId = persona_id;
      }); 
    });
  }

  cancelar() {
    this.dialogo.close();
  }

  iniciarFormularios() {
    this.formulario = this.formBuiler.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      telefono: ['', [Validators.required, Validators.minLength(10)]],
      direccion: [''],
      rol_id: ['0'], 
      email:['', [Validators.required, Validators.email]],
      usuario: ['', [Validators.required, Validators.minLength(3)]],
      password: ['',[Validators.required, Validators.minLength(3)]],
    });
  }

  validarNumero(event: any) {
    return this._validacionService.validateNumber(event);
  }

  validarLetras(event:any) {
    return this._validacionService.validateLetters(event);
  }

  validarCorreo(event: any) {
    this.emailValid = this._validacionService.validarEmail(event);
  }

  validarAlfaNumerico(event: any) {
    return this._validacionService.validateAphaNumeric(event);
  }

  selectChangeRoles(event:any) {
    let id = parseInt(event.target.value);  
    this.usuario.rol_id = id > 0 ? id : 0;
    //console.log(this.usuario.rol_id);
      
  }

  mostrarRoles() {
    this.roles = this._rolService.selectRoles();
  }

  validarCombos(form:any){
    if(form.rol_id == 0 || form.rol_id == null){
      return false;
    }else{ return true; } 
  }

  validacionFormularioUsuario(form:any){
    var caract = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);

    if(form.nombre == 0 || form.nombre == null){
      this._snackBarService.open('Complete el campo nombre','text-warning');
      return false;
    }else if(form.nombre.length < 3){
      this._snackBarService.open('Ingrese 3 caracter minimo en el campo nombre','text-warning');
      return false;
    }else if(form.apellido == 0 || form.apellido == null){
      this._snackBarService.open('Complete el campo apellido','text-warning');
      return false;
    }else if(form.apellido.length < 3){
      this._snackBarService.open('Ingrese 3 caracter minimo en el campo apellido','text-warning');
      return false;
    }else if(form.telefono == 0 || form.telefono == null){
      this._snackBarService.open('Complete el campo télefono','text-warning');
      return false;
    }else if(form.telefono.length < 10){
      this._snackBarService.open('Ingrese 10 dígitos en el campo télefono','text-warning');
      return false;
    }else if(form.email == 0 || form.email == null){
      this._snackBarService.open('Complete el campo correo','text-warning');
      return false;
    }else if(form.usuario == 0 || form.usuario == null){
      this._snackBarService.open('Complete el campo usuario','text-warning');
      return false;
    }else if(form.usuario.length < 3){
      this._snackBarService.open('Ingrese 3 caracter minimo en el campo usuario','text-warning');
      return false;
    }else if(form.email == 0 || form.email == null){
      this._snackBarService.open('Complete el campo correo','text-warning');
      return false;
    }else if(caract.test(form.email) == false){
      this._snackBarService.open('Correo Invalido','text-warning');
      return false;
    }else { return true; }
  }

  actualizarUsuario(){
    this.submitted = true;
    const form = this.formulario.value;

      if(form){
        if(this.validarCombos(form)){
          this.submitted = false;  this.okButton = true;  this.emailValid = true;
          let usuario_id:any = this.data.id;
          let persona_id:any = this.personaId;

          if(this.validacionFormularioUsuario(form) == true){
            let json:any = {
              usuario: {
                  id:usuario_id,
                  persona_id: persona_id,
                  nombre: form.nombre,
                  apellido: form.apellido,
                  telefono: form.telefono,
                  direccion: form.direccion,
                  rol_id: form.rol_id,
                  usuario: form.usuario,
                  correo: form.email,
              }
            }
              //contruir el servicio para actualizar el usuario :)
              this.serviceEdithUser(json);
          }else{
            console.log('Ups...!! Verifique su formulario de usuario');
          }
        }else{
          this._snackBarService.open('Seleccione un rol','text-warning');
        }
      }else{
        this._snackBarService.open('No ahi datos','text-danger');
        this.okButton = true;
        this.emailValid = true;
      } 
  }

  serviceEdithUser(json:any): void{
    this._usuarioService.editarUsuario(json).subscribe((res:any) =>{
      if(res){
        this._snackBarService.open(res.mensaje, 'text-primary');
        this.formulario.reset();
        this.dialogo.close(true);
      }else{
        this._snackBarService.open(res.mensaje, 'text-danger');
      }
    });
  }

  get f() {
    return this.formulario.controls;
  }

}
