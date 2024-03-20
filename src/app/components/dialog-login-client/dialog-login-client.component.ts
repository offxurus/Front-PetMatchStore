import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-login-client',
  templateUrl: './dialog-login-client.component.html',
  styleUrls: ['./dialog-login-client.component.scss']
})
export class DialogLoginClientComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DialogLoginClientComponent>) { }

  ngOnInit(): void {
  }

  closePopup(): void {
    this.dialogRef.close();
  }

}
