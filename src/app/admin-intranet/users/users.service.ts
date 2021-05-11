import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RequestOptions } from '@angular/http';
import { Globals } from '../../globals';

@Injectable()
export class UsersService {
  private headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
  constructor(private http: HttpClient, private global: Globals ) { }

  getUsers(): Observable<any> {
    return this.http.get(this.global.urlAPI + 'usuario/get');
  }

  getUsersCompleter(): Observable<any> {
    return this.http.get(this.global.urlAPI + 'usuario/getc');
  }


  getUser(username: string): Observable<any> {
    return this.http.get(this.global.urlAPI + 'usuario/get/' + username);
  }
  getCountUsersByUsername(username: string): Observable<any> {
    return this.http.get(this.global.urlAPI + 'usuario/countbyusername/' + username);
  }
  setUser(data): Observable<any> {
    return this.http.post(this.global.urlAPI + 'usuario/save', data);
  }

  changePassword (data): Observable<any> {
    return this.http.put(this.global.urlAPI + 'usuario/changePassword', data);
  }

  changePasswordForUser (data): Observable<any> {
    return this.http.put(this.global.urlAPI + 'usuario/changePasswordForUser', data);
  }

  updateUserInformationGeneral(data): Observable<any> {
    return this.http.put(this.global.urlAPI + 'usuario/updateInformationGeneral', data);
  }

  updateUserInformationLaboral(data): Observable<any> {
    return this.http.put(this.global.urlAPI + 'usuario/updateInformationLaboral', data);
  }

  updateUserImage(data): Observable<any> {
    return this.http.post(this.global.urlAPI + 'usuario/updateImage', data);
  }

  deleteUser(data): Observable<any> {
    return this.http.put(this.global.urlAPI + 'usuario/delete', data);
  }

  resetPassword (data): Observable<any> {
    return this.http.put(this.global.urlAPI + 'usuario/resetPassword', data);
  }

  updateSuperiorForUser(data): Observable<any> {
    return this.http.put(this.global.urlAPI + 'usuario/updateSuperiorForUser', data);
  }

  // Actualiza los autorizadores en las dos base de datos
  updateAutorizadorPorUsuario(data): Observable<any> {
    return this.http.put(this.global.urlAPI + 'usuario/updateAutorizadorPorUsuario', data);
  }

  updateSuperAreaForUser(data): Observable<any> {
    return this.http.put(this.global.urlAPI + 'usuario/updateSuperAreaForUser', data);
  }

  // Servicio para bloquear un usuario
  bloquearUsuario(username): Observable<any> {
    return this.http.delete(this.global.urlAPICORE + 'usuarios/' + username);
  }
}
