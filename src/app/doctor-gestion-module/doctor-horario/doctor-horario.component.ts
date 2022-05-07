import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { HorariosAtencionService } from 'src/app/servicios/horarios-atencion.service';
import { SnackbarService } from 'src/app/servicios/snackbar.service';
import { ValidacionService } from 'src/app/servicios/validacion.service';

@Component({
  selector: 'app-doctor-horario',
  templateUrl: './doctor-horario.component.html',
  styleUrls: ['./doctor-horario.component.scss']
})
export class DoctorHorarioComponent implements OnInit {

  f:Date = new Date();
  dateHoy:string = `${this.f.getFullYear()}-${(this.f.getMonth() + 1)}-${this.f.getDate()}`;

  min:string = `${this.dateHoy}`;
  //max:string = "2022-5-31";

  public formulario!: FormGroup;
  public submitted = false;
  public okButton = false;

  public doctor_json:any;
  public doctor_id:any;

  public horarioData:any = {
    doctor_horario: []
  }; 

  public pageSize = 5;
  public pageNumber = 1;

  public horariosAtencionIdArray = [];

  constructor(
    private _validacionService: ValidacionService,
    private formBuiler: FormBuilder,
    private _horarioAtencionService: HorariosAtencionService,
    private _snackBarService: SnackbarService
  ) { }

  ngOnInit(): void {   
    this.iniciarFormulario();
    this.mostrarDoctor();
    this.listHorario(this.doctor_id);
  }

  mostrarDoctor() {
    let data:any = localStorage.getItem('usuario');
    this.doctor_json = JSON.parse(data);
    let doctorArray = this.doctor_json.persona.doctor;
    doctorArray.forEach((element:any) => {
      this.doctor_id = element.id;
    });
  }

  iniciarFormulario(){
    this.formulario = this.formBuiler.group({
      entrada: ['',[Validators.required]],
      salida: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      intervalo: ['', [Validators.required]]
    });
  }

  validarNumero(event: any) {
    return this._validacionService.validateNumber(event);
  }

  guardarDatosHorarios(){
    this.submitted = true; 
    const form = this.formulario.value;
    //console.log(form);

    if(this.formulario.valid){
      this.submitted = false;  this.okButton = true;

      let json:any = {
        horarios_atencion:{
          hora_entrada: form.entrada,
          hora_salida: form.salida,
          fecha: form.fecha,
          intervalo: form.intervalo,
        },
        doctor:{
          doctor_id:this.doctor_id
        }
      }
      //console.log(json);
      
      this.crearHorarioAtencion(json);
    }else{
      alert("formulario invalido");
      this.okButton = true;
    }
  }

  crearHorarioAtencion(json:any){
    this._horarioAtencionService.guardarHorarioAtencion(json).subscribe((res:any) => {
      if(res.status){
        this._snackBarService.open(res.mensaje, 'text-primary');
        
        this.formulario.reset();
      }else{
        this._snackBarService.open(res.mensaje, 'text-danger');
        this.formulario.reset();
      }
    })
  }

  get fo() {
    return this.formulario.controls
  }

  eliminar_doctor_horario(horarios_atencion_id:string){
    
    this._horarioAtencionService.eliminarHorarioAtencion(horarios_atencion_id)
    .subscribe((res:any) => {
      if(res.status){
        this._snackBarService.open(res.mensaje, 'text-primary');
        this.listHorario(this.doctor_id);
      }else{
        this._snackBarService.open(res.mensaje, 'text-danger');
      }
    });
  }

  listHorario(doctor_id:string){
    this.doctor_id = doctor_id;
    this._horarioAtencionService.listarHorarios(doctor_id)
    .subscribe((res:any) => {
      this.horarioData = res;
    });
  }

  
  handlePage(event:PageEvent){
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex + 1;
  }


}


