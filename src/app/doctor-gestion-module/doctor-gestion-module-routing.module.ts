import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//mis importaciones
import { DoctorHorarioComponent } from './doctor-horario/doctor-horario.component';

const routes: Routes = [
  {
    path: '',
    component: DoctorHorarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorGestionModuleRoutingModule { }
