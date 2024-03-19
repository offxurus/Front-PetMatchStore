import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UploadFilesService } from 'src/app/services/upload-files.service';
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
    private _router: Router,
    private uploadService: UploadFilesService
  ) {}

  ngOnInit() {
    // Obter o usuário logado
    this.currentUser = this._userService.getCurrentUser();

    // Verificar se o usuário está logado e obter o grupo
    if (this.currentUser && this.currentUser.group) {
      this.userGroup = this.currentUser.group;
    }
  }

  listProducts(){
    this._router.navigate(['/products'], {state: {user: this.currentUser}});
  }


  uploadFile(event: any) {
    const file: File = event?.target.files[0]
    console.log("file_dashboard:",file)
    if(file){
      this.uploadService.uploadFile(file).subscribe(
        response => {
          console.log(response);
        }
      )
    }
  }
}
