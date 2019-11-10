import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { retry, catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    let params = new HttpParams();
    params = params.append('username', username).append('password', password);
    const authdata = window.btoa('admin' + ':' + 'Boletoflex!');

    const headers = new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest', authorization : 'Basic ' + authdata
    });

    return this.http.post(`${environment.serverUrl}/user/login`, params, {headers: headers}).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // window.alert(errorMessage);
    console.log(errorMessage);
    return throwError(errorMessage);
 }
}
