import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';


@Injectable({
    providedIn: 'root'
})

export class SnackbarService{
    private horizontalPosition: MatSnackBarHorizontalPosition = 'end'; //'start' | 'center' | 'end' | 'left' | 'right'
    private verticalPosition: MatSnackBarVerticalPosition = 'top';

    constructor(
        private snackbar: MatSnackBar,
        private _snack : MatSnackBar
    ){ }

    open(message:string, color:string = 'text-gris', time:number = 2){
        return this.snackbar.open(message," ", {
            duration:(time * 1000),
            horizontalPosition:this.horizontalPosition,
            verticalPosition:this.verticalPosition,
            panelClass:color
        });
    }

   /*  openSnack(data:any = null){
        this._snack.openFromComponent({
            
        });

    } */

}