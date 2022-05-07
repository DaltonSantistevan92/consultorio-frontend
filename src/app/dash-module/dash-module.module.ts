import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashModuleRoutingModule } from './dash-module-routing.module';
import { BaseDashComponent } from './pagina/base-dash/base-dash.component';
import { NuevoDashboardComponent } from './componetes/nuevo-dashboard/nuevo-dashboard.component';


@NgModule({
  declarations: [
    BaseDashComponent,
    NuevoDashboardComponent
  ],
  imports: [
    CommonModule,
    DashModuleRoutingModule
  ]
})
export class DashModuleModule { }
