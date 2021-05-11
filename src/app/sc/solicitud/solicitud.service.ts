import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RequestOptions } from '@angular/http';
import { Globals } from '../../globals';


@Injectable()
export class SolicitudService {
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  private headerspdf = new HttpHeaders().set('Content-Type', 'application/json');
  private headers2 = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  constructor(private http: HttpClient, private _http: Http, private global: Globals) { }

  getCodigoGeneradoSC() {
    return this.http.get(this.global.urlAPICORE + 'scsolicitud/');
  }

  getDepartamentoCompra(): any {
    return this.http.get(this.global.urlAPICORE + 'departamentocompra/');
  }

  obtenerAlmacenItem(CodigoItem: string): any {
    return this.http.get(this.global.urlAPICORE + 'almacenitem/' + CodigoItem);
  }


  getProveedoresSC() {
    return this.http.get(this.global.urlAPICORE + 'scproveedor/');
  }

  getProveedoresPorCodigo(codigo: string) {
    return this.http.get(this.global.urlAPICORE + 'scproveedor/' + codigo);
  }

  getItemArticuloSC(tipo: string) {
    return this.http.get(this.global.urlAPICORE + 'scitemarticulo/' + tipo);
  }

  getSolicitudCompraSolicitante(username) {
    return this.http.get(this.global.urlAPICORE + 'certificadoanalisismp/' + username);
  }

  getSolicitudXCodigo(data) {
    return this.http.get(this.global.urlAPICORE + 'scsolicitud/' + data);
  }

  saveSolicitudCompra(data): Observable<any> {
    return this.http.post(this.global.urlAPICORE + 'solicitudcompra/', data);
  }

  // Cerrar las solicitudes
  cerrarSolicitudCompra(data): Observable<any> {
    return this.http.post(this.global.urlAPICORE + 'cerrarsolicitud/', data);
  }

  editarSolicitudCompra(data): Observable<any> {
    return this.http.put(this.global.urlAPICORE + 'solicitudcompra/0', data);
  }

  eliminaSolicitudCompra(data): Observable<any> {
    return this.http.delete(this.global.urlAPICORE + 'solicitudcompra/' + data);
  }

  // Funciones Guardar Detalle de Solicitud de Compra
  saveDetalleSolicitudCompra(data): Observable<any> {
    return this.http.post(this.global.urlAPICORE + 'scdetallesolicitud/', data);
  }

  getDetalleSolicitudXCodigo(data) {
    return this.http.get(this.global.urlAPICORE + 'scdetallesolicitud/' + data);
  }

  // Funciones para Listado de Solicitud por usuario
  getListadoSolicitudXUsuario(data: string) {
    return this.http.get(this.global.urlAPICORE + 'solicitudcompra/' + data.replace('.','|'));
  }

  // Funciones para Listado de Solicitud por autorizador
  getListadoSolicitudXAutorizador(data: string) {
    return this.http.get(this.global.urlAPICORE + 'scsolicitudautorizador/' + data.replace('.','|'));
  }
  getListadoSolicitudXEstadoForAutorizador(data) {
    return this.http.post(this.global.urlAPICORE + 'scsolicitudautorizador/', data);
  }

  // Funciones para Listado de Solicitud para convertir en Orden de Compra
  getListadoSolicitudXAbastecimiento(data) {
    return this.http.get(this.global.urlAPICORE + 'scsolicitudabastecimiento/');
  }

  getListadoSolicitudXEstado(data) {
    return this.http.get(this.global.urlAPICORE + 'scsolicitudabastecimiento/' + data);
  }

  // Subir archivos adjuntos para la solicitud
  uploadFilesSolicitud(data) {
    return this.http.post(this.global.urlAPICORE + 'scfilessolicitudcompra', data);
  }

  saveUploadFilesSolicitud(data, codigo) {
    return this.http.put(this.global.urlAPICORE + 'scfilessolicitudcompra/' + codigo, data);
  }

  getUploadFilesSolicitud(codigo) {
    return this.http.get(this.global.urlAPICORE + 'scfilessolicitudadjunto/' + codigo);
  }

  // Obtener conversaciones de la solicitud
  getConversacionesXSolicitud(data) {
    return this.http.get(this.global.urlAPICORE + 'scconversacionsolicitud/' + data);
  }
  // Enviar mensaje (Guardar conversación)
  saveConversacionSolicitud(data) {
    return this.http.post(this.global.urlAPICORE + 'scconversacionsolicitud/', data);
  }


  // Anular la solicitud
  saveAnularSolicitud(data) {
    return this.http.post(this.global.urlAPICORE + 'anularsolicitud/', data);
  }

  // Autorizar la solicitud
  saveAutorizarSolicitud(data) {
    return this.http.post(this.global.urlAPICORE + 'autorizarsolicitud/', data);
  }

  // Cambiar el estado del Detalle de Solicitud
  updateEstadoDetalleSolicitud(data) {
    return this.http.put(this.global.urlAPICORE + 'scdetallesolicitud/1', data);
  }

  // Obtener la fecha de arte
  getFechaArte(data) {
    return this.http.post(this.global.urlAPICORE + 'sccomunessolicitudcompra/', data);
  }
}






