import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Mis importaciones */
import { AutenticacionGuard } from './guards/autenticacion.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [AutenticacionGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
