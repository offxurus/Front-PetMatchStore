import { HttpClient, HttpHeaders }                             from '@angular/common/http';
import { Injectable }                             from '@angular/core';
import { Observable }                             from 'rxjs';
import { environment }                            from 'src/environments/environment';
import { ListUser, User, UserSignIn}  from '../interfaces/user';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private sessionStorage: Storage; 

  constructor(
    private http: HttpClient,   
  ) {this.sessionStorage= window.localStorage}

  getUsers(): Observable<ListUser>{
    return new Observable<ListUser>((observer)=> {
      this.http.get<ListUser>(`${environment.apiUrl}/users`).subscribe(
        (users) => {
          observer.next(users);
          observer.complete();
        },
        () => {
          observer.error('error_list_users');
          observer.complete();
        }
      )
    })
  }

  userSingIn(userParams: User): Observable<UserSignIn> {
    return new Observable<UserSignIn>((observer) => {
      this.http
        .post<UserSignIn>(`${environment.apiUrl}/user-sign-in`, userParams)
        .subscribe(
          (user) => {
            localStorage.setItem('currentUser', JSON.stringify(user));
            observer.next(user);
            observer.complete();
          },
          () => {
            observer.error('error_on_get_user');
            observer.complete();
          }
        );
    });
  }

  getCurrentUser(): User | null {
    const userData = this.sessionStorage.getItem('currentUser');
    if(userData){
      return JSON.parse(userData);
    } else {
      return null;
    }
  }

  createUser(userParams: User): Observable<User> {
    return new Observable<User>((observer) => {
      this.http.post<User>(`${environment.apiUrl}/users`, userParams).subscribe(
        (user) => {
          observer.next(user);
          observer.complete();
        },
        () => {
          observer.error('error_on_create_user');
          observer.complete();
        }
      );
    });
  }
  updateUser(userParams: User): Observable<User> {
    return new Observable<User>((observer) => {
      this.http.post<User>(`${environment.apiUrl}/user/${userParams.id}`, userParams, this.httpOptions).subscribe(
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
  getUsersbyName(name: string): Observable<any>{
    return new Observable<any>((observer)=> {
      this.http.get<any>(`${environment.apiUrl}/search?name=${name}`).subscribe(
        (users) => {
          observer.next(users);
          observer.complete();
        },
        () => {
          observer.error('error_list_users');
          observer.complete();
        }
      )
    })
  }
}
