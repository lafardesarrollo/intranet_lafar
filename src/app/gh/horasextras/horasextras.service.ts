import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RequestOptions } from '@angular/http';
import { Globals } from '../../globals';
import { SolicitudHoraExtra, HoraExtra } from '../models/horaextra';
import { RequestReporteSemanal } from '../models/reporte.model';
import { ItemSolicitudHoraExtraGG } from '../models/itemsolicitudhoraextragg.model';

@Injectable()
export class HorasExtrasService {
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient, private global: Globals) { }

  getFechaHoraActual():Observable<any> {
    return this.http.get(this.global.urlAPICORE + 'horaactual');
  }

  getTurno(): Observable<any> {
    return this.http.get(this.global.urlAPI + 'turno/get');
  }

  DependienteSupervisor(data): Observable<any> {
    return this.http.get(this.global.urlAPI + 'dependientesupervisor/get/' + data);
  }

  ItemForApps(data): Observable<any> {
    return this.http.post(this.global.urlAPI + 'itemapps/getitemforapps', data);
  }

  saveHE(data): Observable<any> {
    return this.http.post(this.global.urlAPI + 'he/save', data);
  }

  getHE(): Observable<any> {
    return this.http.get(this.global.urlAPI + 'he/get');
  }

  getTurnos(): Observable<any> {
    return this.http.get(this.global.urlAPICORE + 'turno');
  }

  getTurnosPorId(Id: number): Observable<any> {
    return this.http.get(this.global.urlAPICORE + 'turno/' + Id);
  }

  // Obtiene usuarios dependientes
  getDependientesPorUsername(Username: String): Observable<any> {
    let usuario: string = '';
    usuario = Username.replace('.', '|');
    return this.http.get(this.global.urlAPICORE + 'userdependiente/' + usuario);
  }

  // Obtiene todos los usuarios dependientes
  getDependientesAll(): Observable<any> {
    return this.http.get(this.global.urlAPICORE + 'userdependiente');
  }

  // Obtiene la planilla por CodigoSAP
  getPlanillaPorCodigoSap(CodigoSap: number): Observable<any> {
    return this.http.get(this.global.urlAPICORE + 'planillaempleado/' + CodigoSap);
  }

  // Obtener Areas
  getAreas(): Observable<any> {
    return this.http.get(this.global.urlAPICORE + 'area');
  }

  // Obtener Gestiones
  getGestiones(): Observable<any> {
    return this.http.get(this.global.urlAPICORE + 'gestionhe');
  }

  // Obtener Meses
  getMeses(gestion: string): Observable<any> {
    return this.http.get(this.global.urlAPICORE + 'gestionhe/' + gestion);
  }

  guardarSolicitudHorasExtras(solicitud: SolicitudHoraExtra): Observable<any> {
    return this.http.post(this.global.urlAPICORE + 'solicitudhorasextras/', solicitud);
  }

  //Obtiene las todas los items de las solicitudes por dia
  obtenerSolicitudes(): Observable<any> {
    return this.http.get(this.global.urlAPICORE +'solicitudhorasextras/'); 
  }

  // Obtiene las todas las solicitudes realizadas 
  cambiarEstadoItemSolicitud(id: number): Observable<any> {
    return this.http.get(this.global.urlAPICORE +'updateitemsolicitud/' + id.toString()); 
  }

  cambiarEstadoItemSolicitudRestandoCosto(item: ItemSolicitudHoraExtraGG): Observable<any> {
    return this.http.post(this.global.urlAPICORE + 'updateitemsolicitud/', item);
  }

  cambiarEstadoItemSolicitudPorFecha(item: ItemSolicitudHoraExtraGG): Observable<any> {
    return this.http.post(this.global.urlAPICORE + 'updateitemsolicitud/', item);
  }

  // Realiza cambios en las solicitudes de acuerdo a fechas asi como en sus detalles 
  cambiarEstadoSolicitudesPorfechaGG(item: string): Observable<any> {
    return this.http.put(this.global.urlAPICORE + 'updateitemsolicitud/' + item, {"id":"123123"});
  }


  //Obtiene las todas las solicitudes para GG 
  obtenerSolicitudesGG(estado: string): Observable<any> {
    return this.http.get(this.global.urlAPICORE +'procesarsolicitudgg/' + estado); 
  }

  //Obtiene las todas las solicitudes para GG 
  obtenerItemsSolicitudesGG(fecha: string): Observable<any> {
    return this.http.get(this.global.urlAPICORE +'itemsolicitudhoraextragg/' + fecha); 
  }

  //Obtiene las solicitudes realizadas por el jefe de area
  obtenerSolicitudesPorUsername(username: string): Observable<any> {
    return this.http.get(this.global.urlAPICORE +'solicitudhorasextras/' + username.replace('.','_')); 
  }

  // Cambiar el estado de las solicitudes de horas extras
  cambiarEstadoSolicitud(estado: string, id: number): Observable<any> {
    return this.http.put(this.global.urlAPICORE + 'cambiarestadosolicitud/' + estado, id);
  }

  //Obtiene el detalle de solicitud por Id 
  obtenerDetalleSolicitud(IdSolicitud: number): Observable<any> {
    return this.http.get(this.global.urlAPICORE +'detallesolicitudhorasextras/' + IdSolicitud); 
  }

  // Generar reporte semanal
  generarReporteSemanal(request: RequestReporteSemanal): Observable<any> {
    return this.http.post(this.global.urlAPICORE + 'reportesemanal', request);
  }

  // Descargar reporte semanal en excel
  descargarReporteSemanal(request: RequestReporteSemanal): Observable<any> {
    return this.http.post(this.global.urlAPICORE + 'descargarreportesemanal', request, 
      { 
        responseType: 'blob',
        headers: new HttpHeaders().append('Content-Type', 'application/json')
      });
  }
}
