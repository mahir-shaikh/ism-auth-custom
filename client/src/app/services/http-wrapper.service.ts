import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/catch';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

/**
 * HttpWrapper service used for sending Get/ Post requests to pulse server
 *
 */
@Injectable({
  providedIn: 'root'
})
export class HttpWrapperService {

  private hostname: string = environment.serverURL

  private userObj: any = {};

  private static unwrapBody(response: any) {
    try {
      return response;
    } catch (e) {
      return null;
    }
  }

  constructor(private http: HttpClient, private authService: AuthService) { }

  postJsonWithNakedResponse(relativeUrl: string, body): Observable<any> {
    return this.http.post(this.hostname + relativeUrl, body).pipe(
      map((data) => data),
      catchError((error: any) => error));
  }

  postJson(relativeUrl: string, body, optionalHeaders = {}): Promise<any> {
    let req: any;

    const token = this.authService.getToken();
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': token,
      ...optionalHeaders
    });
    req = this.http.post(this.hostname + relativeUrl, body, { headers: headers }).pipe(map((res) => res));
    

    return req.toPromise().then(HttpWrapperService.unwrapBody);
  }

  getJson(relativeUrl: string, params): Promise<any> {
    let req: any;

      const token = this.authService.getToken();
      let headers: HttpHeaders;
      if(token){
        headers = new HttpHeaders({
          'Authorization': token
        });
      }else{
        headers = new HttpHeaders();
      }
      req = this.http.get(this.hostname + relativeUrl + (params ? '?' + params : ''), { headers: headers }).pipe(map((res) => res));
    
    return req.toPromise();
  }

  delete(relativeUrl: string, addToken = true){
    let req: any;

    const token = this.authService.getToken();
    let headers: HttpHeaders;
    if(addToken){
      headers = new HttpHeaders({
        'Authorization': token
      });
    }else{
      headers = new HttpHeaders();
    }
    req = this.http.delete(this.hostname + relativeUrl, { headers: headers }).pipe(map((res) => res));
  
    return req.toPromise();
  }
}
