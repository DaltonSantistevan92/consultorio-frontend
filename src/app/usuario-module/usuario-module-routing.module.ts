import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarUsuarioComponent } from './componente-usuario/listar-usuario/listar-usuario.component';
import { NuevoUsuarioComponent } from './componente-usuario/nuevo-usuario/nuevo-usuario.component';
import { UsuarioTemplateComponent } from './usuario-template/usuario-template.component';

const routes: Routes = [
  {
    path: '',
    component: UsuarioTemplateComponent,//nav  
    children: [
      {
        path: 'nuevo', component: NuevoUsuarioComponent
      },
      {
        path: 'listar', component: ListarUsuarioComponent
      }
      
    ],
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioModuleRoutingModule { }
