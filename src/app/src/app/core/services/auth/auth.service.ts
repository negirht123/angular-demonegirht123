import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http : HttpClient
  ) { }

  verifyUser(): Observable<any> {
    return this.http.get("/users/checkUser");
  }

  login(data: any): Observable<any> {
    return this.http.post("/users/login", data).pipe(
      map((res: any) => {
        let body = res;
        let accessData = [];
        if (body.code == 200) {
          // accessData.push(body.data.sideModules);
          // this.storage.localStore("token", body.data.token);
          // this.storage.setUserDetails(body.data.user);
          // this.storage.localStore("role", body.data.user.role);
          // this.storage.localStore("sideModule", JSON.stringify(accessData));
        }
        return body;
      })
    );
  }

  logout(): Observable<any> {
    // this.storage.clear("token");
    // this.storage.clear("user");
    // this.storage.clear("role");
    // this.isLoggedIn = false;
    return of({ status: true });
  }
}
