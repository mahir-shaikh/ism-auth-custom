import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userObj: any = {};

  constructor(
    private http: HttpClient
  ) { }

  login(username, password) {
    return this.http.post(environment.serverURL + "/login", { username, password }).pipe(
      map((response: any) => {
        // login successful if there's a response cookie in the response
        if (response.success) {
          if (response.LoginResult) {
            // store user details and cookies in local storage to keep user logged in between page refreshes
            this.userObj = JSON.stringify(response.LoginResult);
            localStorage.setItem('currentUser', this.userObj);
          }
        } 
        return response;
      }),
      catchError((err) => {
        return throwError('Something went wrong!')
      })
    )
  }

  getToken() {
    let user = localStorage.getItem("currentUser");
    let token;
    if (user) {
      token = JSON.parse(user).JWT;
    }
    return token;
  }

  isLoggedIn() {
    return (this.getToken()) ? true : false;
  }

  logout() {
    localStorage.clear();
  }

  getAuthorizationHeader() {
    return new Headers({ 'Authorization': 'Bearer ' + this.getToken() });
  }

  getName() {
    let user = localStorage.getItem("currentUser");
    if (user) {
      return JSON.parse(user).user.name;
    }
    return null;
  }

  getActiveUser() {
    let user = localStorage.getItem("currentUser");
    if (user) {
      return JSON.parse(user).user;
    }
    return null;
  }
}
