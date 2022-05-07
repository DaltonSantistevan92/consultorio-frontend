import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';

/* Mis importaciones */
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarService } from '../servicios/snackbar.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RegistroComponent } from './registro/registro.component';




@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  providers:[ 
    SnackbarService,
  ]
})
export class AuthModule { }
