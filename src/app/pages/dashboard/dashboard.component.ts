import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public userGroup: string = '';
  public currentUser: User | null = { email: '', password: '', name: '', cpf: '', group: '', active: true};

  constructor(
    private _userService: UserService,
    private _router: Router
  ) {}

  ngOnInit() {
    // Obter o usuário logado
    if(!this._userService.getCurrentUser()){
      this._router.navigate(['/']);
    }
    this.currentUser = this._userService.getCurrentUser();
    // Verificar se o usuário está logado e obter o grupo
    if (this.currentUser && this.currentUser.group) {
      this.userGroup = this.currentUser.group;
    }
  }

  listProducts(){
    this._router.navigate(['/products'], {state: {user: this.currentUser}});
  }
}
