import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/interfaces/client';
import { CepService } from 'src/app/services/cep.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-in-client',
  templateUrl: './sign-in-client.component.html',
  styleUrls: ['./sign-in-client.component.scss']
})
export class SignInClientComponent implements OnInit {

  public hide: boolean = true;
  public useSameAddress: boolean = false;
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
    }, delivery_address: []
  };
  public isUpdating: boolean = false;
  public confirmation: boolean = true;
  public oldPassword: string = '';
  public showLoading: boolean = false;

  constructor(
    private _userService: UserService,
    private _clientService: ClientService,
    private _router: Router,
    private cepService: CepService
  ) { }

  ngOnInit(): void {
    if (this._userService.getCurrentUser()) {
      this._router.navigate(['/dashboard']);
    }
  }

  toggleUseSameAddress(): void {
    if (this.useSameAddress) {
      this.userParams.delivery_address = [Object.assign({}, this.userParams.billing_address)];
      console.log('Checkbox 1!');
    } else {
      this.userParams.delivery_address = [];
      console.log('Checkbox 2!');
    }
  }

  changeConfirm(event: any) {
    if (event.target.value) {
      const confirmPassword = event.target.value;
      this.confirmation = (this.userParams.password === confirmPassword);
    }
    else {
      this.confirmation = false;
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      alert("Formulário inválido")
      return
    }
    if (!this.validarCPF(this.userParams.cpf || '')) {
      alert("CPF inválido");
      return;
    }
    if (this.confirmation) {
      if (this.userParams.delivery_address) {
        this.userParams.delivery_address.forEach((address) => {
          address.active = true;
        });
      }
      this._clientService.createClient(this.userParams).subscribe(
        (response) => {
          this.showLoading = false;
          if (response.id)
            this._router.navigate(['/login'], { state: { id: response.id } });
          else
            alert('Usuário não encontrado');
        },
        (error) => {
          console.log(error)
          this.showLoading = false;
          alert('Erro ao criar usuário: ' + error.error.message);
        }
      );
    } else {
      alert('Erro ao logar: Senhas são diferentes')
    }
  }

  consultaCep(cepInput: HTMLInputElement) {
    const cep = cepInput.value;
    this.cepService.buscar(cep).subscribe((dados: any) => {
      this.populaFormBilling(dados);
      this.userParams.billing_address = { ...this.userParams.billing_address, ...dados };
    });
  }

  consultaCepEntrega(cep: string, index: number) {
    this.cepService.buscar(cep).subscribe((dados: any) => {
      if (this.userParams.delivery_address) {
        this.userParams.delivery_address[index] = dados
        this.userParams.delivery_address[index].cidade = dados.localidade
      }
    });
  }

  populaFormBilling(dados: any) {
    const logradouroInput = (document.querySelector('[name="BillingLogradouro"]') as HTMLInputElement);
    const bairroInput = (document.querySelector('[name="BillingBairro"]') as HTMLInputElement);
    const cidadeInput = (document.querySelector('[name="BillingCidade"]') as HTMLInputElement);
    const ufInput = (document.querySelector('[name="BillingUf"]') as HTMLInputElement);

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

  addAddress() {
    if (this.userParams.delivery_address)
      this.userParams.delivery_address.push({
        cep: '',
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        uf: '',
      });
  }

  removeAddress(index: number) {
    this.userParams.delivery_address?.splice(index, 1);
  }

  // Função para validar o CPF
  validarCPF(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]+/g,'');
    if(cpf == '') return false;
  
    if (cpf.length !== 11) return false;
    
    if (cpf === "00000000000" || cpf === "11111111111" || cpf === "22222222222" ||
        cpf === "33333333333" || cpf === "44444444444" || cpf === "55555555555" ||
        cpf === "66666666666" || cpf === "77777777777" || cpf === "88888888888" ||
        cpf === "99999999999") {
        return false;
    }
   
    let add = 0;
    for (let i = 0; i < 9; i++) {
        add += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(9))) return false;
    
    add = 0;
    for (let i = 0; i < 10; i++) {
        add += parseInt(cpf.charAt(i)) * (11 - i);
    }
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(10))) return false;
    return true;
  }
}

