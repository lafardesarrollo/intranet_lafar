import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RequestOptions } from '@angular/http';
import { Globals } from '../globals';

@Injectable()
export class HigrotermometroService {
  private headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
  constructor(private http: HttpClient, private global: Globals ) { }

  /*getEtapasProceso(): Observable<any> {
    return this.http.get(this.global.urlAPI + 'etapaproceso/get');
  }*/

  getHigrotermometro(data): Observable<any> {
    return this.http.get(this.global.urlAPI + 'higrotermometro/get/' + data);
  }

}
