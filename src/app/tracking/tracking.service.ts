import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Globals } from '../globals';

@Injectable()
export class TrackingService {
  private headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
  constructor(private http: HttpClient, private global: Globals ) { }

  getEmpleados(): Observable<any> {
    return this.http.get(this.global.urlAPI + 'seguimiento/getusers');
  }

  getDetalleTareasEmpleados(data: any): Observable<any> {
    return this.http.post(this.global.urlAPI + 'seguimiento/getdetalletareas', data);
  }
  
}
