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
  public userParams: User = { cpf: '', password: '' };
  public showLoading: boolean = false;
  public cpfInvalid: boolean = false;

  constructor(
    private _router: Router,
    private _userService: UserService,
    private dialog: MatDialog,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    if(!this.userService.getCurrentUser()){
      this._router.navigate(['/']);
    }
  }

  changeCpf(event: any) {
    const cpf = event.target.value.replace(/\D/g, '');
    this.userParams.cpf = cpf;

   
    this.cpfInvalid = !this.isValidCPF(cpf);
  }

  changePassword(event: any) {
    this.userParams.password = event.target.value;
  }

  loginIn() {
    this.showLoading = true;
  
    
    this._userService.userSingIn(this.userParams).subscribe(
      (response: any) => {
        if (response.id) {
          if (!response.active) {
            alert('Usuário Inativo');
          } else if (response.group !== 'cliente') {
            this._router.navigate(['/dashboard']);
          } else {
            if (response.cpf === this.userParams.cpf && response.password === this.userParams.password) {
              this._router.navigate(['/home']);
            } else {
              alert('CPF ou senha incorretos');
              console.log('CPF do usuário:', response.cpf);
              console.log('CPF no formulário:', this.userParams.cpf);
              console.log('Senha do usuário:', response.password);
              console.log('Senha no formulário:', this.userParams.password);
            }
          }
        } else {
          alert('Usuário não encontrado, verifique o CPF e a senha.');
        }
        this.showLoading = false;
      },
      () => {
        alert('Erro ao realizar login.');
        this.showLoading = false;
      }
    );
  }

  isValidCPF(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]+/g,'');
    if(cpf == '') return false;
  
    if (cpf.length !== 11) return false;
    
    if (cpf === "00000000000" || cpf === "11111111111" || cpf === "22222222222" ||
        cpf === "33333333333" || cpf === "44444444444" || cpf === "55555555555" ||
        cpf === "66666666666" || cpf === "77777777777" || cpf === "88888888888" ||
        cpf === "99999999999") {
        return false;
    }
   
    let add = 0;
    for (let i = 0; i < 9; i++) {
        add += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(9))) return false;
    
    add = 0;
    for (let i = 0; i < 10; i++) {
        add += parseInt(cpf.charAt(i)) * (11 - i);
    }
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(10))) return false;
    return true;
}
}
