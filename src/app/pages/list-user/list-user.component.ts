import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  public users: Array<User> = [];
  public originalUsers: Array<User> = []; // Mantém a lista original de usuários
  public hide: boolean = true;
  public userParams: User = { email: '', password: '', name: '', cpf: '', group: '', active: true};
  public currentUserId: string = '';
  public showLoading: boolean = false;

  constructor(
    private userService: UserService,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    if(!this.userService.getCurrentUser()){
      this._router.navigate(['/']);
    }
    this.getUsers();
    if(history.state){
      this.currentUserId = history.state.id;
    }
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(listUser => {
        this.users = listUser.users;
        this.originalUsers = [...this.users];
      });
  }

  updateUser(user: User) {
    this.showLoading = true;
    this._router.navigate(['/sign-in'], {state: {user: user, id:this.currentUserId}});
  }

  search(name: string): void {
    if (!name || name === '') {
      this.users = [...this.originalUsers];
    } else {
      this.users = this.originalUsers.filter(user => user.name && user.name.toLowerCase().includes(name.toLowerCase()));
    }
  }

  activeUser(active: boolean = true, user: User): void {
    if(confirm("Confirma a alteração de status")){
      this.userParams = user
      this.userParams.active = !active
      this.showLoading = true;
      this.userService.updateUser(this.userParams).subscribe(
        () => {
          this.showLoading = false;
          this.getUsers();
        },
        (error) => {
          this.showLoading = false;
          alert(error);
        }
      );
    }
  }

  createUser(): void {
    this.showLoading = true;
    this._router.navigate(['/sign-in'],);
  }
}
