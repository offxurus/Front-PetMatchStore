import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/interfaces/client';
import { CepService } from 'src/app/services/cep.service';

@Component({
  selector: 'app-sign-in-client',
  templateUrl: './sign-in-client.component.html',
  styleUrls: ['./sign-in-client.component.scss']
})
export class SignInClientComponent implements OnInit {

  public hide: boolean = true;
  public userParams: Client = {
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
    }, delivery_address: []};
  public isUpdating: boolean = false;
  public confirmation:boolean = true;
  public oldPassword: string = '';
  public showLoading: boolean = false;
  

  constructor(
    private _userService: UserService,
    private _clientService: ClientService,
    private _router: Router,
    private cepService: CepService
  ) { }

  ngOnInit(): void {
    if(this._userService.getCurrentUser()){
      this._router.navigate(['/dashboard']);
    }
  }

  useSameAddress: boolean = false;

  copyBillingAddress(event: any) {
    if (event.checked) {
      if (this.userParams && this.userParams.billing_address) {
        if (this.userParams.delivery_address) {
          this.userParams.delivery_address.forEach(address => {
            address.cep = this.userParams.billing_address?.cep;
            address.logradouro = this.userParams.billing_address?.logradouro;
            address.numero = this.userParams.billing_address?.numero;
            address.complemento = this.userParams.billing_address?.complemento;
            address.bairro = this.userParams.billing_address?.bairro;
            address.cidade = this.userParams.billing_address?.cidade;
            address.uf = this.userParams.billing_address?.uf;
          });
        }
      }
    } else {
      if (this.userParams && this.userParams.delivery_address) {
        this.userParams.delivery_address.forEach(address => {
          address.cep = '';
          address.logradouro = '';
          address.numero = '';
          address.complemento = '';
          address.bairro = '';
          address.cidade = '';
          address.uf = '';
        });
      }
    }
  }

  toggleUseSameAddress() {
    this.useSameAddress = !this.useSameAddress;
    this.copyBillingAddress({ checked: this.useSameAddress });
  }

  onSubmit() {
    if(this.confirmation) {
      this.showLoading = true;
      if (this.isUpdating) {
        if(this.userParams.password == this.oldPassword)
          this.userParams.password = '';
        this._clientService.updateClient(this.userParams).subscribe(
          () => {
            this.showLoading = false;
            this._router.navigate(['/dashboard']);
          },
          (error) => {
            this.showLoading = false;
            console.error('Erro ao atualizar usuário:', error);
          }
        );
      } else {
        this._clientService.createClient(this.userParams).subscribe(
          (response) => {
            this.showLoading = false;
            if (response.id)
              this._router.navigate(['/dashboard'], { state: { id: response.id } });
            else
              alert('Usuário não encontrado');
          },
          (error) => {
            this.showLoading = false;
            console.error('Erro ao criar usuário:', error);
          }
        );
      }
    } else {
      alert('Erro ao logar: Senhas são diferentes')
    }
  }

  consultaCep(cepInput: HTMLInputElement) {
    const cep = cepInput.value;
    this.cepService.buscar(cep).subscribe((dados: any) => {
      this.populaForm(dados);
      this.userParams.billing_address = { ...this.userParams.billing_address, ...dados };
    });
  }
  

  populaForm(dados: any) {
    const logradouroInput = (document.querySelector('[name="deliveryLogradouro"]') as HTMLInputElement);
    const bairroInput = (document.querySelector('[name="deliveryBairro"]') as HTMLInputElement);
    const cidadeInput = (document.querySelector('[name="deliveryCidade"]') as HTMLInputElement); 
    const ufInput = (document.querySelector('[name="deliveryUf"]') as HTMLInputElement);
  
    if (logradouroInput) {
      logradouroInput.value = dados.logradouro;
    }
  
    if (bairroInput) {
      bairroInput.value = dados.bairro;
    }
  
    if (cidadeInput) {
      cidadeInput.value = dados.localidade;
    }
  
    if (ufInput) {
      ufInput.value = dados.uf;
    }
  }
  
  
  addAddress(){
    if(this.userParams.delivery_address)
      this.userParams.delivery_address.push({
        cep: '',
        logradouro:'',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        uf: ''
      });
  }

  removeAddress(index: number){
    this.userParams.delivery_address?.splice(index, 1);
  }
}
