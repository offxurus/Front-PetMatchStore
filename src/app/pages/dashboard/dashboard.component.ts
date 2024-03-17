import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public userGroup: string = '';

  constructor(
    private _userService: UserService,
    private _router: Router
  ) {}

  ngOnInit() {
    // Obter o usuário logado
    const currentUser = this._userService.getCurrentUser();

    // Verificar se o usuário está logado e obter o grupo
    if (currentUser && currentUser.group) {
      this.userGroup = currentUser.group;
    }
  }
}
