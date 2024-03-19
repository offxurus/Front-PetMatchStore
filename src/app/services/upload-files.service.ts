import { HttpClient }   from '@angular/common/http';
import { Injectable }   from '@angular/core';
import { Observable }   from 'rxjs';
import { environment }  from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
  })
  export class UploadFilesService{
    constructor(private http: HttpClient){}

    uploadFile(file: File): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);

        return new Observable<any>((observer) => {
            this.http.post<any>(`${environment.apiUrl}/upload`, formData).subscribe(
              (filename) => {
                console.log("filename:",filename)
                observer.next(filename);
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