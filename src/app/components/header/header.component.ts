import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { MatDialog } from '@angular/material/dialog';
import { DialogLogoutComponent } from '../dialog-logout/dialog-logout.component';
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
    if (this.userService.getCurrentUser()) {
      this.currentUser = this.userService.getCurrentUser();
    }
    this.countItemCart();
    // Subscribe to cart updates
    this.cartService.getCartUpdates().subscribe(count => {
      this.cartItemCount = count;
    });
  }

  countItemCart() {
    this.cartItemCount = this.cartService.getCarrinho().reduce((total, item) => total + item.quantity, 0);
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
