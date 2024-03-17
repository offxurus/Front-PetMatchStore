import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  public hide: boolean = true;
  public userParams: User = { email: '', password: '', name: '', cpf: '', group: '', active: true};
  public showLoading: boolean = false;
  public isUpdating: boolean = false;
  public confirmation:boolean = true;
  public oldPassword: string = '';
  public currentUserId: string = '';
  public currentUser: User= { email: '', password: '', name: '', cpf: '', group: '', active: true};

  constructor(
    private _userService: UserService,
    private _router: Router,
  ) {}

  ngOnInit() {
    
    if(history.state && history.state.user){
      this.currentUser = history.state.user;
      if (this.currentUser && this.currentUser.id) {
        this.oldPassword = this.currentUser.password ? this.currentUser.password : '';
        this.userParams = this.currentUser;
        this.userParams.confirmPassword = this.userParams.password
        this.isUpdating = true;
      }
    }
    if(history.state.id && history.state){
      this.currentUserId = history.state.id;
    }
  }

  changeName(event: any) {
    this.userParams.name = event.target.value;
  }

  changeEmail(event: any) {
    this.userParams.email = event.target.value;
  }

  changePassword(event: any) {
    this.userParams.password = event.target.value;
  }

  changeCPF(event: any) {
    this.userParams.cpf = event.target.value;
  }

  changeGroup(selectedGroup: string): void {
    this.userParams.group = selectedGroup;
  }

  changeConfirm(event: any) {
    if(event.target.value){
    const confirmPassword = event.target.value;
    this.confirmation = (this.userParams.password === confirmPassword);
    }
    else{
      this.confirmation = false;
    }
  }

  onSubmit() {
    if(this.confirmation) {
      this.showLoading = true;
      if (this.isUpdating) {
        if(this.userParams.password == this.oldPassword)
          this.userParams.password = '';
        this._userService.updateUser(this.userParams).subscribe(
          () => {
            this.showLoading = false;
            this._router.navigate(['/list-user']);
          },
          (error) => {
            this.showLoading = false;
            console.error('Erro ao atualizar usuário:', error);
          }
        );
      } else {
        this._userService.createUser(this.userParams).subscribe(
          (response) => {
            this.showLoading = false;
            if (response.id)
              this._router.navigate(['/list-user'], { state: { id: response.id } });
            else
              alert('Usuário não encontrado');
          },
          (error) => {
            this.showLoading = false;
            console.error('Erro ao criar usuário:', error);
          }
        );
      }
    } else {
      alert('Erro ao logar: Senhas são diferentes')
    }
  }
}
