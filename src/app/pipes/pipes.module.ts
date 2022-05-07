import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginacionPipe } from './paginacion/paginacion.pipe';



@NgModule({
  declarations: [
    PaginacionPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PaginacionPipe
  ]
})
export class PipesModule { }
