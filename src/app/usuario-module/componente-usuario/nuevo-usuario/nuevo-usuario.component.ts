import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { RolService } from '../../../servicios/rol.service';
import { SnackbarService } from '../../../servicios/snackbar.service';
import { ToolService } from '../../../servicios/tool.service';
import { UsuarioService } from '../../../servicios/usuario.service';
import { ValidacionService } from '../../../servicios/validacion.service';
import { Persona } from '../../../models/persona.model';
import { Rol } from '../../../models/rol.model';
import { IUsuarios } from '../../../models/usuario.model';
 
@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.scss']
})
export class NuevoUsuarioComponent implements OnInit {

  public files: File[] = [];
  public activeImage: Boolean = false;
  private foto_default = "user-default.jpg";

  public formulario!: FormGroup;
  public submitted = false;
  public emailValid = false;
  public okButton = false;
  public cedulaValid = false;

  public persona!: Persona;
  public usuario!: IUsuarios;

  public roles: Observable<Rol[]> | undefined;

  constructor(
    private formBuiler: FormBuilder,
    private _validacionService: ValidacionService,
    private _snackBarService: SnackbarService,
    private _rolService: RolService,
    private _usuarioService: UsuarioService,
    private _toolService: ToolService,
  ) { }

  ngOnInit(): void {
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

  iniciarFormularios() {
    this.formulario = this.formBuiler.group({
      cedula: ['', [Validators.required, Validators.minLength(10)]],
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

  validarLetras(event: any) {
    return this._validacionService.validateLetters(event);
  }

  validarAlfaNumerico(event: any) {
    return this._validacionService.validateAphaNumeric(event);
  }

  validarCorreo(event: any) {
    this.emailValid = this._validacionService.validarEmail(event);
  }

  validarCedula(event:any){                
    this.persona.cedula = event.target.value;            
    this.cedulaValid = this._validacionService.validateCedulaEcuatoriana(this.persona.cedula);
    
    if(!this.cedulaValid){  
      this._snackBarService.open('La Cédula es Incorrecta', 'text-danger');
      return false; 
    } else {
      this._snackBarService.open('La Cédula es Correcta', 'text-primary')
      return true;
    };
  }

  mostrarRoles() {
    this.roles = this._rolService.selectRoles();
  }

  selectChangeRoles(event:any) {
    let id = parseInt(event.target.value);  
    this.usuario.rol_id = id > 0 ? id : 0;  
  }

  onSelect(event: any) {
    if (!this.activeImage) {
      this.files.push(...event.addedFiles);
      this.activeImage = true;
    } else {
      this._snackBarService.open("Solo sube 1 imagen !!", "text-primary");
    }
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
    this.activeImage = false;
    this.usuario.img = '';
  }
  
  validarCombos(form:any){
    if(form.rol_id == 0 || form.rol_id == null){
      return false;
    }else return true;
  }

  guardarDatos(){
    this.submitted = true; 
    const form = this.formulario.value;

    if(this.formulario.valid){
      if(this.validarCombos(form)){
        this.submitted = false;  this.okButton = true;  this.cedulaValid = false;
          
       let json:any = {
          usuario:{
            rol_id:form.rol_id,
            correo: form.email,
            usuario: form.usuario,
            img: (this.activeImage) ? this.files[0].name : 'user-default.jpg',
            password: form.password,
          },
          persona:{
            cedula: form.cedula,
            nombre: form.nombre,
            apellido: form.apellido,
            telefono: form.telefono,
            direccion: form.direccion,
          },
          doctor:{ }
        }

        //subir la img al backend
        let imgdelUsuario = json.usuario.img;

        if(imgdelUsuario == this.foto_default){
          //guardar el usuario con img defaul en el backend
          this.crearUsuarioService(json);
        }else{
          //servicio para guardar el usuario con img real en el backend
          this._toolService.subirArchivo(this.files, 'img_user', 'subirArchivo').subscribe((res:any) => {
            if(res.status){  
              this.usuario.img = res.imagen; 
              this.crearUsuarioService(json);

              const index = this.files[0].name.indexOf(imgdelUsuario,1);
              this.files.splice(index, 1);
              this.activeImage = false;
            }
          }); 
        }
      }else{
        this._snackBarService.open('Seleccione un rol','text-warning');
      } 
    }else{
      alert("formulario invalido");
      this.okButton = true;
    }
  }

  crearUsuarioService(json:any){
    this._usuarioService.guardandoUsuarioPersona(json).subscribe((res:any)=>{
      if(res.status){
        this._snackBarService.open(res.mensaje, 'text-primary');
        this.initUsuario();
        this.formulario.reset();
      }else{
        this._snackBarService.open(res.mensaje, 'text-danger');
        this.formulario.reset();
      }
    });
    this.okButton = false;
  }

  get f() {
    return this.formulario.controls;
  }


}
