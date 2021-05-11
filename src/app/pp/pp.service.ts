import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RequestOptions } from '@angular/http';
import { Globals } from '../globals';

@Injectable()
export class PpService {
  private headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
  constructor(private http: HttpClient, private global: Globals ) { }

  /*getEtapasProceso(): Observable<any> {
    return this.http.get(this.global.urlAPI + 'etapaproceso/get');
  }*/

  getProductoForLote(data): Observable<any> {
    return this.http.get(this.global.urlAPISAP + 'procesoproducto/' + data);
  }

  getProductoForTipoLote(data): Observable<any> {
    return this.http.post(this.global.urlAPISAP + 'procesoproducto', data);
  }

}
