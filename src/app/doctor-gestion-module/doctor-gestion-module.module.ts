import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//mis importaciones
import { DoctorGestionModuleRoutingModule } from './doctor-gestion-module-routing.module';
import { DoctorHorarioComponent } from './doctor-horario/doctor-horario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PipesModule } from '../pipes/pipes.module';



@NgModule({
  declarations: [
    DoctorHorarioComponent
  ],
  imports: [
    CommonModule,
    DoctorGestionModuleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    PipesModule
  ]
})
export class DoctorGestionModuleModule { }
