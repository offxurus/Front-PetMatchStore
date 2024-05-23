import { Component, OnInit, HostListener } from '@angular/core';
import { navbarData } from './nav-data';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit{

  collapsed= false;
  navData= navbarData;
  scrolled = false;
  userName: string = '';


  constructor(
    private userService: UserService){}

    ngOnInit(): void {
      const currentUser = this.userService.getCurrentUser();
      if (currentUser) {
        this.userName = currentUser.name || '';
      }
    }

  toggleCollapse(): void{
    this.collapsed = !this.collapsed;
  }

  closeSidenav(): void{
    this.collapsed= false
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.scrolled = offset > 0;
  }

}
