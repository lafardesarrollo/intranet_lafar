import { Component, OnInit } from '@angular/core';
import { Solicitudcompralistado, SolicitudCompra, RequestAnulacionSolicitud,
  RequestAutorizacionSolicitud } from '../../solicitud/solicitud';
import { SolicitudService } from '../../solicitud/solicitud.service';
import { MzToastService } from 'ngx-materialize';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { OrdenService } from '../orden.service';
import { OrdenCompraListAbastecimiento, OCOrdenCompra } from '../orden';

@Component({
  selector: 'app-listsupoc',
  templateUrl: './listsupoc.component.html',
  styleUrls: ['./listsupoc.component.scss'],
})
export class ListsupocComponent implements OnInit {
  // Variables de Paginación
  p: number = 1;
  
  // Anulacion de Orden de Compra
  aorden: RequestAnulacionSolicitud = new RequestAnulacionSolicitud();

  // Autorización de Orden de Compra
  autorizarorden: RequestAutorizacionSolicitud = new RequestAutorizacionSolicitud();

  // vARIABLES DE BUSQUEDA
  term: string = '';
  estado_autorizacion_subgerencia: string;
  // END VARIABLES DE BUSQUEDA

  lorden: Array<OrdenCompraListAbastecimiento> = new Array<OrdenCompraListAbastecimiento>();
  orden: OCOrdenCompra = new OCOrdenCompra();

  constructor(private servSC: SolicitudService, private servOC: OrdenService, private toast: MzToastService, private router: Router) { }

  ngOnInit() {
    this.onGetOrdenesCompra();
  }

  // Esta funcion obtiene las ordenes para el autorizador
  onGetOrdenesCompra(): void {
    this.estado_autorizacion_subgerencia = 'T';
    this.openLoading();
    this.servOC.getListadoOrdenXAutorizador(localStorage.getItem('username') + '_' + this.estado_autorizacion_subgerencia).subscribe(
      data => {
        this.closeLoading();
        if (data['length'] > 0) {
          this.lorden = data['body'];
          // this.toast.show('Se trajo ' + data['length'] + ' solicitudes', 2000, 'green');
        } else {
          this.toast.show('No existen Ordenes de Compra!', 1000, 'red');
        }
        // console.log(data);
      },
      (err: HttpErrorResponse) => {
        this.closeLoading();
        this.toast.show('Ocurrio un error al obtener las Ordenes de Compra!', 1000, 'red');
        if (err.error instanceof Error) {
          // console.log('Ocurrio un error:', err.error.message);
        } else {
          // console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }

  // Esta funcion obtiene una solicitud por su codigo
  onOpenOrden(codigo_orden: string): void {
    this.router.navigate(['/sc/orden/detailocsg/' + codigo_orden]);
    // alert(codigo_solicitud);
  }

  irAConversaciones(codigo_orden: string): void {
    this.router.navigate(['/sc/orden/notify/' + codigo_orden]);
  }


  // Esta funcion te envia al formulario de Nueva Orden de Compra
  onOpenAddOrden(codigo_solicitud: string): void {
    // alert(codigo_solicitud);
    this.router.navigate(['/sc/orden/add/' + codigo_solicitud]);
  }

  // Opciones para filtrado de Listado

  onLoadListado() {
    this.openLoading();
    this.lorden = [];
    this.servOC.getListadoOrdenXAutorizador(localStorage.getItem('username') + '_' + this.estado_autorizacion_subgerencia).subscribe(
      data => {
        this.closeLoading();
        if (data['length'] > 0) {
          this.lorden = data['body'];
          // this.toast.show('Se trajo ' + data['length'] + ' solicitudes', 2000, 'green');
        }else {
          this.toast.show('No tiene Ordenes de Compra! para aprobar', 1000, 'red');
        }
        // console.log(data);
      },
      (err: HttpErrorResponse) => {
        this.closeLoading();
        this.toast.show('Ocurrio un error al obtener las ordenes de compra!', 1000, 'red');
        if (err.error instanceof Error) {
          // console.log('Ocurrio un error:', err.error.message);
        } else {
          // console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }

  //#region Funciones para anular la solicitud
  onLoadAnularOrden(codigo_orden: string): void {
    this.aorden = new RequestAnulacionSolicitud();
    this.aorden.codigo_solicitud = codigo_orden;
    this.aorden.usuario_anulacion = localStorage.getItem('username');
    // this.onGuardarAnularOrden();
  }

  onGuardarAnularOrden() {
    this.openLoading();
    this.servOC.saveAnularOrden(this.aorden).subscribe(
      data => {
        this.closeLoading();
        this.toast.show('Se anulo la orden!', 1000, 'green');
        this.estado_autorizacion_subgerencia = 'T';
        this.onLoadListado();
      },
      (err: HttpErrorResponse) => {
        this.closeLoading();
        this.toast.show('Ocurrio un error al anular la orden. Intente nuevamente!', 1000, 'red');
        if (err.error instanceof Error) {
          // console.log('Ocurrio un error:', err.error.message);
        } else {
          // console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }
  //#endregion

  //#region AUTORIZACION SUG_GERENCIA
  onLoadAutorizarOrden(codigo_orden: string, estado_autorizacion_subgerencia: string): void {
    this.autorizarorden = new RequestAutorizacionSolicitud();
    this.autorizarorden.codigo_solicitud = codigo_orden;
    this.autorizarorden.autorizador = localStorage.getItem('username');
    this.autorizarorden.estado_autorizacion = estado_autorizacion_subgerencia;
    // this.onGuardarAutorizarSolicitud(estado_autorizacion_superior);
  }

  onLoadAprobarOrden(codigo_orden: string, estado_autorizacion_subgerencia: string): void {
    this.autorizarorden = new RequestAutorizacionSolicitud();
    this.autorizarorden.codigo_solicitud = codigo_orden;
    this.autorizarorden.autorizador = localStorage.getItem('username');
    this.autorizarorden.estado_autorizacion = estado_autorizacion_subgerencia;
    this.onGuardarAutorizarSGOrden();
  }

  onGuardarAutorizarSGOrden() {
    this.openLoading();
    let tipo_autorizacion: string = '';
    if (this.autorizarorden.estado_autorizacion == 'A') {
      tipo_autorizacion = 'aprobar';
    } else {
      tipo_autorizacion = 'rechazar';
    }
    this.servOC.saveAutorizarOrden(this.autorizarorden).subscribe(
      data => {
        this.closeLoading();
        this.toast.show('Se ' + tipo_autorizacion + ' la orden de compra!', 500, 'green');
        this.onGetOrdenesCompra();
      },
      (err: HttpErrorResponse) => {
        this.closeLoading();
        this.toast.show('Ocurrio un error al ' + tipo_autorizacion + ' la orden de compra. Intente nuevamente!', 1000, 'red');
        if (err.error instanceof Error) {
          // console.log('Ocurrio un error:', err.error.message);
        } else {
          // console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }
  //#endregion

  // Funciones Loading
  openLoading() {
    const loading = $('#loading');
    loading.fadeIn();
  }

  closeLoading() {
      const loading = $('#loading');
      loading.fadeOut();
  }
}
