import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RequestOptions } from '@angular/http';
import { Globals } from '../globals';

@Injectable()
export class LoginService {
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  private headers2 = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  constructor(private http: HttpClient, private global: Globals) { }

  getUsuario() {
    return this.http.get(this.global.urlAPI + 'usuario/get').toPromise();
  }

  getUsuarioForEmail(email): Observable<any> {
    return this.http.get(this.global.urlAPI + 'usuario/getforemail/' + email);
  }

  getUsuarios(): Observable<any> {
    return this.http.get(this.global.urlAPI + 'usuario/get');
  }

  login(data): Observable<any> {
    return this.http.post(this.global.urlAPI + 'usuario/login', data);
  }

  loginOLD(data): Observable<any> {
    return this.http.get(this.global.urlIntranet + 'sesionactiva.php' + '?username=' + data.userid + '&password=' + data.password);
  }

  sendEmail(data): Observable<any> {
    return this.http.post(this.global.urlAPI + 'usuario/recovery', data);
  }
}
