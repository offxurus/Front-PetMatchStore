import { HttpClient, HttpHeaders }                             from '@angular/common/http';
import { Injectable }                             from '@angular/core';
import { Observable }                             from 'rxjs';
import { environment }  from 'src/environments/environment';
import { Client, ClientSignIn}  from '../interfaces/client';
@Injectable({
    providedIn: 'root',
  })
export class ClientService {
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    private sessionStorage: Storage;

    constructor(
        private http: HttpClient,   
      ) {this.sessionStorage= window.localStorage}

      logout(): void {
        localStorage.removeItem('currentUser');
      }

      createClient(clientParams: Client): Observable<Client> {
        return new Observable<Client>((observer) => {
          this.http.post<Client>(`${environment.apiUrl}/clients`, clientParams).subscribe(
            (user) => {
              observer.next(user);
              observer.complete();
            },
            () => {
              observer.error('error_on_create_client');
              observer.complete();
            }
          );
        });
      }

      getUser(clientParams: Client): Observable<Client>{
        return new Observable<Client>((observer)=> {
          this.http.get<Client>(`${environment.apiUrl}/client/${clientParams.id}`).subscribe(
            (client) => {
              observer.next(client);
              observer.complete();
            },
            () => {
              observer.error('error_get_client');
              observer.complete();
            }
          )
        })
      }

      updateClient(clientParams: Client): Observable<Client> {
        return new Observable<Client>((observer) => {
          this.http.post<Client>(`${environment.apiUrl}/client/${clientParams.id}`, clientParams, this.httpOptions).subscribe(
            (user) => {
              observer.next(user);
              observer.complete();
            },
            (error) => {
              observer.error(error);
              observer.complete();
            }
          );
        });
      }
    

    }

    
