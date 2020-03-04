import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http: HttpClient, private router: Router) {
  }
  private userUrl = environment.API_ENDPOINT + 'users';
  signUp(user): Observable<any> {
    return this.http.post(`${this.userUrl + '/register'}`, user)
      .pipe(
        catchError(this.handleError('getData', []))
      );
  }

  loginUser(user): Observable<any> {
    return this.http.post(`${this.userUrl + '/login'}`, user)
      .pipe(
        catchError(this.handleError('getData', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
  
}




