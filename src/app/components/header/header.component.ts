import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser!: User | null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
  }

  logout(): void {
    this.userService.logout();
    this.currentUser = null;

    this.router.navigate(['/']);
  }
}