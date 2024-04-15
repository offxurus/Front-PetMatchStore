import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/interfaces/client';

@Component({
  selector: 'app-sign-in-client',
  templateUrl: './sign-in-client.component.html',
  styleUrls: ['./sign-in-client.component.scss']
})
export class SignInClientComponent implements OnInit {

  public hide: boolean = true;
  public userParams: Client = { email: '', password: '', name: '', cpf: '', group: 'cliente', active: true, birth_date: new Date(), gender: '', billing_address: '', delivery_address: []};
  public isUpdating: boolean = false;
  public confirmation:boolean = true;
  public oldPassword: string = '';
  public showLoading: boolean = false;
  

  constructor(
    private _userService: UserService,
    private _clientService: ClientService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    if(this._userService.getCurrentUser()){
      this._router.navigate(['/dashboard']);
    }
  }

  onSubmit() {
    if(this.confirmation) {
      this.showLoading = true;
      if (this.isUpdating) {
        if(this.userParams.password == this.oldPassword)
          this.userParams.password = '';
        this._clientService.updateClient(this.userParams).subscribe(
          () => {
            this.showLoading = false;
            this._router.navigate(['/dashboard']);
          },
          (error) => {
            this.showLoading = false;
            console.error('Erro ao atualizar usuário:', error);
          }
        );
      } else {
        this._clientService.createClient(this.userParams).subscribe(
          (response) => {
            this.showLoading = false;
            if (response.id)
              this._router.navigate(['/dashboard'], { state: { id: response.id } });
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
