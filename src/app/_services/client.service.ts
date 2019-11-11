import { Injectable } from '@angular/core';
import { Client } from '../_models/client';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { retry, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private authdata = window.btoa('admin' + ':' + 'Boletoflex!');

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:ban-types
  add( client: Client): Observable<Object> {
    const params = new FormData();


    // let params = new HttpParams();
    params.append('name', client.name);
    params.append('identify', client.identify);
    params.append('orgIdentify', client.orgIdentify);
    params.append('document', client.document);
    params.append('nationality', client.nationality);
    params.append('naturalness', client.naturalness);
    params.append('address', client.address);
    params.append('addressNumber', client.addressNumber.toString());
    params.append('cep', client.cep);
    params.append('city', client.city);
    params.append('state', client.state);
    params.append('birth', client.birth);
    params.append('gender', client.gender);
    params.append('celNumber', client.celNumber);
    params.append('telNumber', client.telNumber);
    params.append('comNumber', client.comNumber);
    params.append('email', client.email);
    params.append('image', client.image);

    const headers = new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest', authorization : 'Basic ' + this.authdata
    });

    // tslint:disable-next-line:object-literal-shorthand
    return this.http.post(`${environment.serverUrl}/client/`, params, {headers: headers}).pipe(
      catchError(this.handleError)
    );
  }

  getAllClients(): Observable<any> {
    const headers = new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest', authorization : 'Basic ' + this.authdata
    });


    // tslint:disable-next-line:object-literal-shorthand
    return this.http.get<any>(`${environment.serverUrl}/client`, {headers: headers}).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  approved(id: string, approved: string) {
    const params = new FormData();
    params.append('id', id);
    params.append('approved', approved);

    console.log(params);

    const headers = new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest', authorization : 'Basic ' + this.authdata
    });

    // tslint:disable-next-line:object-literal-shorthand
    return this.http.post(`${environment.serverUrl}/client/approved`, params, {headers: headers}).pipe(
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
