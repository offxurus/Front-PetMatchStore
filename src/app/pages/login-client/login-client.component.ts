import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login-client.component.html',
  styleUrls: ['./login-client.component.scss'],
})
export class LoginClientComponent implements OnInit {
  public hide: boolean = true;
  public userParams: User = { email: '', password: '' };
  public showLoading: boolean = false;

  constructor(
    private _router: Router,
    private _userService: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  changeCpf(event: any) {
    this.userParams.cpf = event.target.value;
  }

  changePassword(event: any) {
    this.userParams.password = event.target.value;
  }

  loginIn() {
    this.showLoading = true;
    if (this.userParams && this.userParams.cpf && this.userParams.password) {
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
            } 
          }
        },
        () => (this.showLoading = false)
      );
    }
  }
}
