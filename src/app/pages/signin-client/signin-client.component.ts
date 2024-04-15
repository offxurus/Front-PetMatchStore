import { Component, OnInit } from '@angular/core';
import { CepService } from 'src/app/services/cep.service';

@Component({
  selector: 'app-signin-client',
  templateUrl: './signin-client.component.html',
  styleUrls: ['./signin-client.component.scss']
})
export class SigninClientComponent implements OnInit {

  constructor(private cepService: CepService) { }

  consultaCep(cepInput: HTMLInputElement) {
    const cep = cepInput.value;
    this.cepService.buscar(cep).subscribe((dados: any) => this.populaForm(dados));
  }

  populaForm(dados: any) {
    const logradouroInput = document.getElementById('logradouro') as HTMLInputElement;
    const bairroInput = document.getElementById('bairro') as HTMLInputElement;
    const cidadeInput = document.getElementById('cidade') as HTMLInputElement;
    const ufInput = document.getElementById('uf') as HTMLInputElement;

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

  ngOnInit(): void {
  }
}
