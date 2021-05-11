import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RequestOptions } from '@angular/http';
import { Globals } from '../globals';

@Injectable()
export class EtapasProcesoService {
  private headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
  constructor(private http: HttpClient, private global: Globals ) { }

  getEtapasProceso(): Observable<any> {
    return this.http.get(this.global.urlAPI + 'etapaproceso/get');
  }


  getEtapaLote(data): Observable<any> {
    return this.http.get(this.global.urlAPI + 'etapaproceso/getforlote/'+ data);
  }

  getMonitoreoForLote(data): Observable<any> {
    return this.http.get(this.global.urlAPI + 'etapaproceso/getmonitoreoforlote/'+ data);
  }
  
  getthretapalote(data): Observable<any> {
    return this.http.post(this.global.urlAPI + 'etapaproceso/getthretapalote/', data);
  }

  getEtapaProceso(data): Observable<any> {
    return this.http.post(this.global.urlAPI + 'etapaproceso/getEtapaForProceso/', data);
  }

  saveTHRProceso(data): Observable<any> {
    return this.http.post(this.global.urlAPI + 'etapaproceso/save', data);
  }
}
