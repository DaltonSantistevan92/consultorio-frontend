import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioModuleRoutingModule } from './usuario-module-routing.module';
import { UsuarioComponentComponent } from './usuario-component/usuario-component.component';
import { UsuarioTemplateComponent } from './usuario-template/usuario-template.component';
//importaciones 
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  MatButtonModule } from '@angular/material/button';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { SnackbarService } from '../servicios/snackbar.service';
import { AdminModule } from '../admin/admin.module';
import { NuevoUsuarioComponent } from './componente-usuario/nuevo-usuario/nuevo-usuario.component';
import { ListarUsuarioComponent } from './componente-usuario/listar-usuario/listar-usuario.component';
import { EditarUsuarioComponent } from './componente-usuario/modales/editar-usuario/editar-usuario.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    UsuarioComponentComponent,
    UsuarioTemplateComponent,
    NuevoUsuarioComponent,
    ListarUsuarioComponent,
    EditarUsuarioComponent, 
  ],
  imports: [
    CommonModule,
    UsuarioModuleRoutingModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    AdminModule,
    MatDialogModule,
     
    
  ],
  providers:[ 
    SnackbarService,
  ],
  exports: [],
  entryComponents: [
    EditarUsuarioComponent
  ]
})
export class UsuarioModuleModule { }
