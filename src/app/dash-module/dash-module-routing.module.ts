import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Mis Importaciones */
import { BaseDashComponent } from './pagina/base-dash/base-dash.component';
import { NuevoDashboardComponent } from './componetes/nuevo-dashboard/nuevo-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: BaseDashComponent,
    children: [
      {
        path: 'nuevo',
        component: NuevoDashboardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashModuleRoutingModule { }
