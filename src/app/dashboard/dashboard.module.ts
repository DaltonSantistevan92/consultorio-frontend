import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Mis Importaciones */
import { DashboardRoutingModule } from './dashboard-routing.module';
import { TemplateComponent } from './template/template.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule  } from '@angular/material/card';

import { MatMenuModule } from '@angular/material/menu';
import { AdminModule } from '../admin/admin.module';

@NgModule({
  declarations: [
    TemplateComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    AdminModule
  ],
  exports: [
    TemplateComponent
  ]
})
export class DashboardModule { }
