import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AdminRoutingModule } from "./admin-routing.module";
import { HomeComponent } from './home/home.component';

/* Mis importaciones */
import { MatIconModule } from '@angular/material/icon';
import { NavComponent } from './nav/nav.component';


@NgModule({
    declarations:[
    HomeComponent,
    NavComponent,

  ],
    imports:[
    CommonModule,
    AdminRoutingModule,
    MatIconModule

    ],
    exports:[
        HomeComponent
    ]

})

export class AdminModule { }