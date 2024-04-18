import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-logout',
  templateUrl: './dialog-logout.component.html',
  styleUrls: ['./dialog-logout.component.scss']
})
export class DialogLogoutComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogLogoutComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  confirm(): void {
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

}
