import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogLoginClientComponent } from 'src/app/components/dialog-login-client/dialog-login-client.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public hide: boolean = true;
  public userParams: User = { email: '', password: '' };
  public showLoading: boolean = false;

  constructor(
    private _router: Router,
    private _userService: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if(this._userService.getCurrentUser()){
      this._router.navigate(['/dashboard']);
    }
  }

  changeEmail(event: any) {
    this.userParams.email = event.target.value;
  }

  changePassword(event: any) {
    this.userParams.password = event.target.value;
  }

  loginIn() {
    this.showLoading = true;
    if (this.userParams && this.userParams.email && this.userParams.password) {
      this._userService.userSingIn(this.userParams).subscribe(
        (response) => {
          if (!response.id) {
            alert('Usuário não encontrado, verifique o e-mail e a senha.');
            this.showLoading = false;
          } else {
            if (!response.active) {
              alert('Usuário Inativo');
            } else if (response.group !== 'cliente') {
              this._router.navigate(['/dashboard']);
            } else {
              this.openDialog();
              this.showLoading = false;
            }
          }
        },
        () => (this.showLoading = false)
      );
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogLoginClientComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
