import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RequestOptions } from '@angular/http';
import { Globals } from '../../globals';

@Injectable()
export class SuperareaService {
  private headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
  constructor(private http: HttpClient, private global: Globals ) { }

  getSuperArea(): Observable<any> {
    return this.http.get(this.global.urlAPI + 'superarea/get');
  }

  /*getSeccionForArea(data) {
    return this.http.get(this.global.urlAPI + 'seccion/get/' + data);
  }*/

}

