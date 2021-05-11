import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RequestOptions } from '@angular/http';
import { Globals } from '../../globals';
import { AdjuntoOrdenCompra } from './adjunto_orden_compra';


@Injectable()
export class OrdenService {
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  private headerspdf = new HttpHeaders().set('Content-Type', 'application/json');
  private headers2 = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  constructor(private http: HttpClient, private _http: Http, private global: Globals) { }

  // Obtener Listado de Ordenes de Compra para Abastecimiento
  getOrdenCompraAbastecimiento() {
    return this.http.get(this.global.urlAPICORE + 'scordencomprax/');
  }

  // Obtener archivos adjuntos por tipo de adjunto ORDEN DE COMPRA
  obtenerArchivosAdjuntosOrdenCompra(codigo_orden: string, tipo_adjunto: string) {
    return this.http.get(this.global.urlAPICORE + 'obteneradjuntosordencompra/' + codigo_orden + '_' + tipo_adjunto);
  }

  // Obtener Listado de Ordenes de Compra para Abastecimiento
  getOrdenCompraAutorizadorSubGerencia() {
    return this.http.get(this.global.urlAPICORE + 'scordencomprax/');
  }

  // Guardar Orden de Compra
  saveOrdenCompra(data) {
    return this.http.post(this.global.urlAPICORE + 'scordencomprax/', data);
  }

  // Modificar Orden de Compra
  editOrdenCompra(data) {
    return this.http.put(this.global.urlAPICORE + 'scordencomprax/0', data);
  }

  // Guardar Detalle Orden de Compra
  saveDetalleOrdenCompra(data) {
    return this.http.post(this.global.urlAPICORE + 'scdetalleordencompra/', data);
  }

  // Modificar Detalle Orden de Compra
  editDetalleOrdenCompra(data) {
    return this.http.put(this.global.urlAPICORE + 'scdetalleordencompra/0', data);
  }

  // Obtener Listado de Tipo de Compra y el nombre del Encargado
  getTipoOrdenCompraEncargado() {
    return this.http.get(this.global.urlAPICORE + 'sctipocompraencargado/');
  }

  getTipoOrdenCompraEncargadoSingle(data) {
    return this.http.get(this.global.urlAPICORE + 'sctipocompraencargado/' + data);
  }

  // Obtener conversaciones de la solicitud
  getConversacionesXOrden(data) {
    return this.http.get(this.global.urlAPICORE + 'scconversacionorden/' + data);
  }

  // Enviar mensaje (Guardar conversación)
  saveConversacionOrden(data) {
    return this.http.post(this.global.urlAPICORE + 'scconversacionorden/', data);
  }

  // Obtener orden de compra por codigo de orden
  getOrdenXCodigo(data) {
    return this.http.get(this.global.urlAPICORE + 'scordencomprax/' + data);
  }

  // Obtener detalle de orden de compra por codigo de orden
  getDetalleOrdenXCodigo(data) {
    return this.http.get(this.global.urlAPICORE + 'scdetalleordencompra/' + data);
  }

  eliminaOrdenCompra(data) {
    return this.http.delete(this.global.urlAPICORE + 'scordencomprax/' + data);
  }

  // Anular Orden de Compra
  saveAnularOrden(data) {
    return this.http.post(this.global.urlAPICORE + 'anularorden/', data);
  }

  // Autorizar la Orden de Compra
  saveAutorizarOrden(data) {
    return this.http.post(this.global.urlAPICORE + 'scordenautorizadorsg/', data);
  }

  // Autorizar la Orden de Compra
  saveAutorizarOrdenCostos(data) {
    return this.http.post(this.global.urlAPICORE + 'scordenautorizadorcostos/', data);
  }

  // Autorizar la Orden de Compra
  saveAutorizarOrdenG(data) {
    return this.http.post(this.global.urlAPICORE + 'scordenautorizadorg/', data);
  }

  // Listado para Abastecimiento
  getListadoOrdenXEstadoSG(data) {
    return this.http.get(this.global.urlAPICORE + 'scordenabastecimiento/' + data);
  }

  // Listado de Orden para Costos
  getListadoOrdenCostos(data) {
    return this.http.get(this.global.urlAPICORE + 'scordenautorizadorcostos/' + data);
  }

  // Listado por Autorizadores
  getListadoOrdenXAutorizador(data) {
    return this.http.get(this.global.urlAPICORE + 'scordenautorizadorsg/' + data);
  }

  // Listado por Autorizadores
  getListadoOrdenXAutorizadorG(data) {
    return this.http.get(this.global.urlAPICORE + 'scordenautorizadorg/' + data);
  }

  // Enviar Email como notificación de creación de orden de compra
  getEnviarEmailOrdenSolicitantes(data) {
    return this.http.get(this.global.urlAPICORE + 'notificacionorden/' + data);
  }

  // Enviar Email como notificación de creación de orden de compra
  getVerificaEstadoTransferenciaOC() {
    return this.http.get(this.global.urlAPICORE + 'scnumeroordencompra');
  }

  // Generar archivos para subir ordenes de compra al SAP
  generarArchivosParaSAP() {
    return this.http.get(this.global.urlAPICORE + 'scgeneraordencompra');
  }

  // Funcion para obtener el ultimo proveedor del producto
  getUltimoProveedor(data) {
    return this.http.get(this.global.urlAPICORE + 'ultimoproveedor/' + data);
  }

  // Funcion para Enviar datos y escribir en el SAP
  guardarOCSAP(data: any) {
    return this.http.post(this.global.urlSAP + 'ordencompra/', data);
  }

  getCodigoGeneradoOC() {
    return this.http.get(this.global.urlAPICORE + 'scorden/');
  }

  actualizaEstadoSincronizacionOC(data: any) {
    return this.http.post(this.global.urlAPICORE + 'scorden/', data);
  }

  obtenerAdjuntosNecesariosOC(tipo_compra: string){
    return this.http.get(this.global.urlAPICORE + 'adjuntornecesarios/' + tipo_compra);
  }

  obtenerAdjuntosOrdenCompra(codigo_orden: string){
    return this.http.get(this.global.urlAPICORE + 'adjuntoordencompra/' + codigo_orden);
  }
  // Adjuntos de Orden de Compra
  UploadAdjuntoOrdenCompra(datos: any, codigo_orden: string){
    return this.http.put(this.global.urlAPICORE + 'adjuntornecesarios/' + codigo_orden, datos);
  }

  // Guardar Adjuntos de Orden de Compra
  guardarAdjuntosOrdenCompra(datos: Array<AdjuntoOrdenCompra>) {
    return this.http.post(this.global.urlAPICORE + 'adjuntornecesarios/', datos);
  }
}






