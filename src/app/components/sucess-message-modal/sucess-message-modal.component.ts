import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sucess-message-modal',
  templateUrl: './sucess-message-modal.component.html',
  styleUrls: ['./sucess-message-modal.component.scss']
})
export class SuccessMessageModalComponent {
  constructor(
    public dialogRef: MatDialogRef<SuccessMessageModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) {}

  goToMyOrders() {
    this.dialogRef.close();
    this.router.navigate(['/my-orders']);
  }

  returnToHome() {
    this.dialogRef.close();
    this.router.navigate(['/']);
  }
}
