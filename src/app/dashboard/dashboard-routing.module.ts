import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Mis Importaciones */
import { DashboardGuard } from './guards/dashboard.guard';
import { TemplateComponent } from './template/template.component';
import { HomeComponent } from '../admin/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: TemplateComponent, //menu
    canActivate: [DashboardGuard],
    children: [
      {
        path: '',
        redirectTo: 'home', //contenido
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent //contenido
      },
      {
        path: 'dash',
        loadChildren: () => import('./../dash-module/dash-module.module').then( m => m.DashModuleModule)
      },
      {
        path: 'usuario',
        loadChildren: () => import('./../usuario-module/usuario-module.module').then(m => m.UsuarioModuleModule)
      },
      {
        path: 'gestion',
        loadChildren: () => import('./../doctor-gestion-module/doctor-gestion-module.module').then(m => m.DoctorGestionModuleModule)
      }


    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
