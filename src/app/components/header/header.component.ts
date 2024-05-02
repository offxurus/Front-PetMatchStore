import { Component, Inject, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { MatDialog } from '@angular/material/dialog';
import { DialogLogoutComponent } from '../dialog-logout/dialog-logout.component';
import { ClientService } from 'src/app/services/client.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser!: User | null;
  cartItemCount: number = 0;

  constructor(
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
    this.countItemCart();
  }

  countItemCart(){
    this.cartItemCount = this.cartService.getCarrinho().length;
  }

  logout(): void {
    this.userService.logout();
    this.currentUser = null;

    this.router.navigate(['/']);
  }

  goToShoppingCart() {
    this.router.navigate(['/shopping-cart']);
  }

  
  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(DialogLogoutComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.logout();
      }
    });
  }
}