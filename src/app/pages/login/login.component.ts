import { Component, OnInit }  from '@angular/core';
import { Router }             from '@angular/router';
import { User }               from 'src/app/interfaces/user';
import { UserService }        from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public hide: boolean = true;
  public userParams: User = { email: '', password: '', cpf: ''};
  public showLoading: boolean = false;
  public userGroup: string = '';


  constructor(private _router: Router, private _userService: UserService) {}

  ngOnInit() {
    const currentUser = this._userService.getCurrentUser();

    // Verificar se o usuário está logado e obter o grupo
    if (currentUser && currentUser.group) {
      this.userGroup = currentUser.group;
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
        this._userService.userSingIn(this.userParams).subscribe((response) => {
            if (!response.id) {
                alert('Usuário não encontrado, verifique o e-mail e a senha.');
                this.showLoading = false;
            } else {
                if (!response.active) {
                    alert('Usuário Inativo');
                } else if (response.group !== 'cliente') {
                    this._router.navigate(['/dashboard']);
                } else {
                    alert('Você não tem permissão para acessar o backoffice.');
                    this.showLoading = false;
                }
            }
        }, () => this.showLoading = false);
    }
}
}
