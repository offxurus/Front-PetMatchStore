import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private dialog: MatDialog) { }

  openModal(component: any, config: any) {
    const dialogRef = this.dialog.open(component, config);
    dialogRef.afterClosed().subscribe(() => {
    });
  }
}
