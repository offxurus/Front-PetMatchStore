import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ClientAddress } from 'src/app/interfaces/client';
import { UserService } from 'src/app/services/user.service';
import { AddressService } from 'src/app/services/select-address.service';

@Component({
  selector: 'app-endereco-selecao-modal',
  templateUrl: './endereco-selecao-modal.component.html',
  styleUrls: ['./endereco-selecao-modal.component.scss']
})
export class EnderecoSelecaoModalComponent implements OnInit {

  currentUser: any;

  constructor(private dialogRef: MatDialogRef<EnderecoSelecaoModalComponent>, private userService: UserService, private addressService: AddressService) { }

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
  }

  selecionarEndereco(endereco: ClientAddress): void {
    console.log('Endereço selecionado:', endereco);
    this.addressService.setSelectedAddress(endereco);
    this.dialogRef.close();
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
