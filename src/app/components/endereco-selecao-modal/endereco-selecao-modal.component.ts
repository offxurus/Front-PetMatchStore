import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ClientAddress } from 'src/app/interfaces/client';
import { UserService } from 'src/app/services/user.service';
import { AddressService } from 'src/app/services/select-address.service';
import { CepService } from 'src/app/services/cep.service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-endereco-selecao-modal',
  templateUrl: './endereco-selecao-modal.component.html',
  styleUrls: ['./endereco-selecao-modal.component.scss']
})
export class EnderecoSelecaoModalComponent implements OnInit {

  currentUser: any;
  newDeliveryAddress: any;

  constructor(
    private dialogRef: MatDialogRef<EnderecoSelecaoModalComponent>,
     private userService: UserService,
      private addressService: AddressService,
      private cepService: CepService,
      private _clientService: ClientService
    ) { }

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
  }
  consultaCepEntrega(cep: string) {
    this.cepService.buscar(cep).subscribe((dados: any) => {
      if (this.newDeliveryAddress) {
        this.newDeliveryAddress.cidade = dados.localidade
        this.newDeliveryAddress.bairro = dados.bairro
        this.newDeliveryAddress.logradouro= dados.logradouro
        this.newDeliveryAddress.uf = dados.uf
        console.log("aqui",this.newDeliveryAddress)
      }
    });
  }

  saveNewDeliveryAddress() {
    this.currentUser.delivery_address.push(this.newDeliveryAddress);
    this.newDeliveryAddress = null;
    this.currentUser.delivery_address.isDefault = false;
    this._clientService.updateClient(this.currentUser).subscribe(
      (client) => {
        localStorage.setItem('currentUser', JSON.stringify(client));
      },
      (error) => {
        console.error('Erro ao atualizar cliente:', error);
      }
    );
  }

  addNewDeliveryAddress() {
    this.newDeliveryAddress = {
      cep: '',
      logradouro: '',
      bairro: '',
      cidade: '',
      uf: '',
      numero: '',
      complemento: '',
      editMode: true,
      new_address: true,
      active: true
    };
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
