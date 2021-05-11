import { Component, OnInit } from '@angular/core';
import { SolicitudService } from '../solicitud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MzToastService } from 'ngx-materialize';
import { Solicitudcompralistado, SolicitudCompra, RequestAnulacionSolicitud, RequestAutorizacionSolicitud } from '../solicitud';
import { Router } from '@angular/router';
import { Globals } from '../../../globals';

@Component({
  selector: 'app-listscabas',
  templateUrl: './listscabas.component.html',
  styleUrls: ['./listscabas.component.scss'],
})
export class ListscabasComponent implements OnInit {
  // Variables de Paginación
  p: number = 1;
// vARIABLES DE BUSQUEDA
  term: string = '';
  estado_autorizacion: string;
// END VARIABLES DE BUSQUEDA

  lsolicitud: Array<Solicitudcompralistado> = new Array<Solicitudcompralistado>();
  solicitud: SolicitudCompra = new SolicitudCompra();

  // Anulacion de Solicitud
  asolicitud: RequestAnulacionSolicitud = new RequestAnulacionSolicitud();
  // Autorizar Aprobar o Rechazar solicitud
  autorizarsolcitud: RequestAutorizacionSolicitud = new RequestAutorizacionSolicitud();


  constructor(private global: Globals, private servSC: SolicitudService, private toast: MzToastService, private router: Router) { }

  ngOnInit() {
    this.onGetSolicitudes();
  }

  imprimirSolicitud(codigo_solicitud: string){
    window.open(this.global.urlAPICORE + 'imprimirsolicitudcompra/' + codigo_solicitud);
  }

  // Esta funcion obtiene las solicitudes del Solicitante
  onGetSolicitudes(): void {
    this.openLoading();
    let username = localStorage.getItem('username');
    this.servSC.getListadoSolicitudXAbastecimiento(username).subscribe(
      data => {
        this.closeLoading();
        if (data['length'] > 0) {
          this.lsolicitud = data['body'];
          // this.toast.show('Se trajo ' + data['length'] + ' solicitudes', 2000, 'green');
        }else {
          this.toast.show('No tiene solicitudes!', 1000, 'red');
        }
        // console.log(data);
      },
      (err: HttpErrorResponse) => {
        this.toast.show('Ocurrio un error al obtener las solicitudes!', 1000, 'red');
        if (err.error instanceof Error) {
          // console.log('Ocurrio un error:', err.error.message);
        } else {
          // console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }

  // Esta funcion obtiene una solicitud por su codigo
  onOpenSolicitud(codigo_solicitud: string): void {
    this.router.navigate(['/sc/solicitud/detailabas/' + codigo_solicitud]);
    // alert(codigo_solicitud);
  }

  irAConversaciones(codigo_solicitud: string): void {
    this.router.navigate(['/sc/solicitud/notify/' + codigo_solicitud]);
  }


  //#region Funciones para anular la solicitud

  onLoadAnularSolicitud(codigo_solicitud: string): void {
    this.asolicitud = new RequestAnulacionSolicitud();
    this.asolicitud.codigo_solicitud = codigo_solicitud;
    this.asolicitud.usuario_anulacion = localStorage.getItem('username');
  }

  onGuardarAnularSolicitud() {
    this.openLoading();
    this.servSC.saveAnularSolicitud(this.asolicitud).subscribe(
      data => {
        this.closeLoading();
        this.onGetSolicitudes();
        this.toast.show('Se anulo la solicitud!', 1000, 'green');
      },
      (err: HttpErrorResponse) => {
        this.toast.show('Ocurrio un error al anular la solicitud. Intente nuevamente!', 1000, 'red');
        if (err.error instanceof Error) {
          // console.log('Ocurrio un error:', err.error.message);
        } else {
          // console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }
  //#endregion

  onLoadAutorizarSolicitud(codigo_solicitud: string, estado_autorizacion_superior: string): void {
    this.autorizarsolcitud = new RequestAutorizacionSolicitud();
    this.autorizarsolcitud.codigo_solicitud = codigo_solicitud;
    this.autorizarsolcitud.autorizador = localStorage.getItem('username');
    this.autorizarsolcitud.estado_autorizacion = estado_autorizacion_superior;
    // this.onGuardarAutorizarSolicitud(estado_autorizacion_superior);
  }

  onLoadAprobarSolicitud(codigo_solicitud: string, estado_autorizacion_superior: string): void {
    this.autorizarsolcitud = new RequestAutorizacionSolicitud();
    this.autorizarsolcitud.codigo_solicitud = codigo_solicitud;
    this.autorizarsolcitud.autorizador = localStorage.getItem('username');
    this.autorizarsolcitud.estado_autorizacion = estado_autorizacion_superior;
    this.onGuardarAutorizarSolicitud();
  }

  onGuardarAutorizarSolicitud() {
    let tipo_autorizacion: string = '';
    if (this.autorizarsolcitud.estado_autorizacion == 'A') {
      tipo_autorizacion = 'aprobo';
    } else {
      tipo_autorizacion = 'rechazo';
    }
    this.servSC.saveAutorizarSolicitud(this.autorizarsolcitud).subscribe(
      data => {
        this.toast.show('Se ' + tipo_autorizacion + ' la solicitud!', 1000, 'green');
        this.onGetSolicitudes();
      },
      (err: HttpErrorResponse) => {
        this.toast.show('Ocurrio un error al ' + tipo_autorizacion + ' la solicitud. Intente nuevamente!', 1000, 'red');
        if (err.error instanceof Error) {
          // console.log('Ocurrio un error:', err.error.message);
        } else {
          // console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }

  // Esta funcion te envia al formulario de Nueva Orden de Compra
  onOpenAddOrden(codigo_solicitud: string): void {
    // alert(codigo_solicitud);
    this.router.navigate(['/sc/orden/add/' + codigo_solicitud]);
  }

  // Opciones para filtrado de Listado

  onLoadListado() {
    this.lsolicitud = [];
    this.openLoading();
    this.servSC.getListadoSolicitudXEstado(this.estado_autorizacion).subscribe(
      data => {
        this.closeLoading();
        if (data['length'] > 0) {
          this.lsolicitud = data['body'];
          // this.toast.show('Se trajo ' + data['length'] + ' solicitudes', 2000, 'green');
        }else {
          this.toast.show('No tiene solicitudes!', 1000, 'red');
        }
        // console.log(data);
      },
      (err: HttpErrorResponse) => {
        this.toast.show('Ocurrio un error al obtener las solicitudes!', 1000, 'red');
        if (err.error instanceof Error) {
          // console.log('Ocurrio un error:', err.error.message);
        } else {
          // console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }

  actualizarListado(){
    this.onGetSolicitudes();
  }

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
