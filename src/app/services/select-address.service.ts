import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ClientAddress } from 'src/app/interfaces/client';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private selectedAddressSubject = new Subject<ClientAddress>();
  selectedAddress$ = this.selectedAddressSubject.asObservable();

  constructor() { }

  setSelectedAddress(address: ClientAddress): void {
    this.selectedAddressSubject.next(address);
  }
}
