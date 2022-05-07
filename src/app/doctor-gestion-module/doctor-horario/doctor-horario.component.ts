import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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


  constructor(
    private _validacionService: ValidacionService,
    private formBuiler: FormBuilder,


  ) { }

  ngOnInit(): void {   
    console.log(this.dateHoy);
    this.iniciarFormulario();
    
  }

  iniciarFormulario(){
    this.formulario = this.formBuiler.group({
      entrada: ['',[Validators.required]],
      salida: ['', [Validators.required]],
      fecha: [''],
      intervalo: ['', [Validators.required]]
    });
  }

  validarNumero(event: any) {
    return this._validacionService.validateNumber(event);
  }

  guardarDatosHorarios(){
    const form = this.formulario.value;
    console.log(form);
    

  }

}
