// carrinho.service.ts

import { Injectable } from '@angular/core';
import { Product } from '../interfaces/products';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private carrinho: Product[] = [];

  constructor() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.carrinho = JSON.parse(storedCart);
    }
  }

  adicionarAoCarrinho(produto: Product): void {
    const itemIndex = this.carrinho.findIndex(item => item.id === produto.id);
    if (itemIndex !== -1) {
      this.carrinho[itemIndex].quantity++;
    } else {
      produto.quantity = 1;
      this.carrinho.push(produto);
    }
    this.salvarCarrinho();
  }

  salvarCarrinho(): void {
    localStorage.setItem('cart', JSON.stringify(this.carrinho));
  }

  limparCarrinho(): void {
    this.carrinho = [];
    localStorage.removeItem('cart');
  }

  getCarrinho(): Product[] {
    return this.carrinho;
  }

  calcularTotal(): number {
    let total = 0;
    for (const item of this.carrinho) {
      total += item.price * item.quantity;
    }
    return total;
  }

  atualizarCarrinho(): void {
    localStorage.setItem('cart', JSON.stringify(this.carrinho));
  }

  removerDoCarrinho(produto: Product): void{
    const index = this.carrinho.findIndex(item => item.id === produto.id);
    if (index !== -1) {
      this.carrinho.splice(index, 1);
      this.atualizarCarrinho();
    }
  }
}
