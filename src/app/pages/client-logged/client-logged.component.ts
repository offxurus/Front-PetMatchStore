import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { Client } from 'src/app/interfaces/client';
import { User } from 'src/app/interfaces/user';
import { CepService } from 'src/app/services/cep.service';
import { ClientService } from 'src/app/services/client.service';
import { UserService } from 'src/app/services/user.service';
import { ClientAddress } from 'src/app/interfaces/client'

@Component({
  selector: 'app-client-logged',
  templateUrl: './client-logged.component.html',
  styleUrls: ['./client-logged.component.scss']
})
export class ClientLoggedComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  public currentUser: any = {
    email: '', password: '', name: '', cpf: '',
    group: 'cliente', active: true, birth_date: new Date(), gender: '',
    billing_address: {
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      uf: ''
    }, delivery_address: []
  };
  editBillingMode: boolean = false;
  billingAddress: any;
  public confirmation: boolean = true;
  public oldPassword: string = '';
  newDeliveryAddress: any;

  constructor(
    private _userService: UserService,
    private _clientService: ClientService,
    private _router: Router,
    private cepService: CepService
  ) { }

  ngOnInit(): void {
    if (!this._userService.getCurrentUser()) {
      this._router.navigate(['/']);
    }
    this.currentUser = this._userService.getCurrentUser();
    console.log(this.currentUser);
    this.billingAddress = { ...this.currentUser.billing_address };
  }

  toggleEditBillingAddress() {
    this.editBillingMode = !this.editBillingMode;
  }

  toggleEditDeliveryAddress(address: any) {
    address.editMode = !address.editMode;
  }

  deleteDeliveryAddress(addressIndex: number) {
    if(addressIndex >= 0 && addressIndex< this.currentUser.delivery_address.length) {
      this.currentUser.delivery_address.splice(addressIndex, 1);
    }
  }

  setAsDefaultDeliveryAddress(address: ClientAddress) {
    this.currentUser.delivery_address.forEach((addr: ClientAddress) => {
      addr.isDefault = false;
    });
    address.isDefault = true;
  }

  saveChanges(address: any){
    address.editMode = false;
  }

  toggleEditMode(address: any) {
    address.editMode = !address.editMode;
  }
  
  addNewDeliveryAddress() {
    const newAddress = {
      cep: '',
      logradouro: '',
      bairro: '',
      cidade: '',
      uf: '',
      numero: '',
      complemento: '',
      editMode: true
    };
    this.currentUser.delivery_address.push(newAddress);
  }

  changeConfirm(event: any) {
    if(event.target.value) {
      const confirmPassword = event.target.value;
      this.confirmation = (this.currentUser.password === confirmPassword);
    }
    else {
      this.confirmation = false;
    }
  }

  // Verifique se um endereço está preenchido se tiver irá setar o editMode para false depois
  addressIsFilled(address: any): boolean {
    return address.cep || address.logradouro || address.bairro || address.cidade || address.uf || address.numero || address.complemento;
  }

  onSubmit() {
    if (this.confirmation) {
        if (this.currentUser.password == this.oldPassword)
          this.currentUser.password = '';
        //Aqui defino o editMode para false, assim apenas novos endereços podem ser editados direto
        this.currentUser.delivery_address.forEach((address: any) => {
          if (this.addressIsFilled(address)) {
            address.editMode = false;
          }
        });
        //Atualiza cliente
        this._clientService.updateClient(this.currentUser).subscribe(
          (client) => {
            localStorage.setItem('currentUser', JSON.stringify(client));
            this._router.navigate(['/']);
          },
          (error) => {
            console.error('Erro ao atualizar usuário:', error);
          }
        );
    }
  }

  get isClientGroup(): boolean {
    return this.currentUser?.group === 'cliente';
  }
}
