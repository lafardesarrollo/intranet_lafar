import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RequestOptions } from '@angular/http';
import { Globals } from '../../globals';
import { RequestItemsAppsAsignado, ItemApps, ItemAppsChildren } from './itemapps';


@Injectable()
export class ItemsService {
    private headers = new HttpHeaders().set('Content-Type', 'application/json');
    private headers2 = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  constructor(private http: HttpClient, private global: Globals ) { }

  getItemAsignadas(data: RequestItemsAppsAsignado): Observable<any> {
    return this.http.post(this.global.urlAPICORE + 'itemappsasignado/', data);
  }

  modificarAsignacionItemsRol (id_rol: number, litems: Array<ItemApps>): Observable<any> {
    return this.http.put(this.global.urlAPICORE + 'itemappsasignado/' + id_rol, litems);
  }

  getItemsPorAplicacion (id_app: number): Observable<any> {
    return this.http.get(this.global.urlAPICORE +  'items/' + id_app);
  }

  getItemsMotherPorIdApp (id_app: number): Observable<any> {
    return this.http.get(this.global.urlAPICORE + 'itemmother/' + id_app);
  }

  saveItemsApp (item: ItemAppsChildren): Observable<any> {
    return this.http.post(this.global.urlAPICORE + 'items/', item);
  }
}
