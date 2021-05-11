import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RequestOptions } from '@angular/http';
import { Globals } from '../../globals';

@Injectable()
export class HomeService {
  private headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
  constructor(private http: HttpClient, private global: Globals) { }

  upload(data): Observable<any> {
    // return this.http.post('http://localhost:8888/script.php', data);
    return this.http.post(this.global.urlAPI + 'publicacion/upload', data);
  }

  getPublications(): Observable<any> {
    return this.http.get(this.global.urlAPI + 'publicacion/get');
  }

  deletePublications(id: any): Observable<any> {
    return this.http.delete(this.global.urlAPI + 'publicacion/delete/' + id);
  }
}
