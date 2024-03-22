import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/products';
import { UserService } from 'src/app/services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-preview',
  templateUrl: './dialog-preview.component.html',
  styleUrls: ['./dialog-preview.component.scss']
})
export class DialogPreviewComponent implements OnInit {

  public product: Product = {name: '', price: 0, quantity: 0, active: true };

  constructor(
    public dialogRef: MatDialogRef<DialogPreviewComponent>,
    private _userService: UserService,
    private _router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    if(!this._userService.getCurrentUser()){
      this._router.navigate(['/']);
    }
    if (this.data) {
      this.product = this.data;
    }
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
