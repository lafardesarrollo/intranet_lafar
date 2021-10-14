import { Component, OnInit } from '@angular/core';
import { SolicitudService } from '../solicitud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MzToastService } from 'ngx-materialize';
import { Solicitudcompralistado, RequestAnulacionSolicitud, SolicitudCompra, RequestAutorizacionSolicitud,
  RequestEstadoAutorizador } from '../solicitud';
import { Router } from '@angular/router';
import { Globals } from '../../../globals';

@Component({
  selector: 'app-listscsup',
  templateUrl: './listscsup.component.html',
  styleUrls: ['./listscsup.component.scss'],
})
export class ListscsupComponent implements OnInit {
  // Variables de Paginación
  p: number = 1;
  // vARIABLES DE BUSQUEDA
  term: string = '';
  estado_autorizacion: string;
  // end variables de busqueda
  lsolicitud: Array<Solicitudcompralistado> = new Array<Solicitudcompralistado>();
  solicitud: SolicitudCompra = new SolicitudCompra();

  // Anulacion de Solicitud
  asolicitud: RequestAnulacionSolicitud = new RequestAnulacionSolicitud();
  // Autorizar Aprobar o Rechazar solicitud
  autorizarsolcitud: RequestAutorizacionSolicitud = new RequestAutorizacionSolicitud();


  constructor(private global: Globals, private servSC: SolicitudService, private toast: MzToastService, private router: Router) { }

  ngOnInit() {
    this.estado_autorizacion = "P";
    // this.onGetSolicitudes();
    this.onLoadListado();
  }

  imprimirSolicitud(codigo_solicitud: string){
    window.open(this.global.urlAPICORE + 'imprimirsolicitudcompra/' + codigo_solicitud);
  }

  // Esta funcion obtiene las solicitudes del Solicitante
  onGetSolicitudes(): void {
    this.lsolicitud = new Array<Solicitudcompralistado>();
    this.openLoading();
    let username = localStorage.getItem('username');
    this.servSC.getListadoSolicitudXAutorizador(username).subscribe(
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
        this.closeLoading();
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
    this.router.navigate(['/sc/solicitud/detailsup/' + codigo_solicitud]);
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
    this.servSC.saveAnularSolicitud(this.asolicitud).subscribe(
      data => {
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
    this.openLoading(); 
    let tipo_autorizacion: string = '';
    if (this.autorizarsolcitud.estado_autorizacion == 'A') {
      tipo_autorizacion = 'aprobo';
    } else {
      tipo_autorizacion = 'rechazo';
    }
    this.servSC.saveAutorizarSolicitud(this.autorizarsolcitud).subscribe(
      data => {
        this.closeLoading();
        this.toast.show('Se ' + tipo_autorizacion + ' la solicitud!', 1000, 'green');
        this.onGetSolicitudes();
      },
      (err: HttpErrorResponse) => {
        this.closeLoading();
        this.toast.show('Ocurrio un error al ' + tipo_autorizacion + ' la solicitud. Intente nuevamente!', 1000, 'red');
        if (err.error instanceof Error) {
          // console.log('Ocurrio un error:', err.error.message);
        } else {
          // console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }

  // Opciones para filtrado de Listado

  onLoadListado() {
    this.lsolicitud = [];
    let id_autorizador: string = localStorage.getItem('username');
    let eautorizacion: RequestEstadoAutorizador = new RequestEstadoAutorizador();
    eautorizacion.id_superior = id_autorizador;
    eautorizacion.estado_autorizacion = this.estado_autorizacion;
    this.servSC.getListadoSolicitudXEstadoForAutorizador(eautorizacion).subscribe(
      data => {
        if (data['length'] > 0) {
          this.lsolicitud = data['body'];
          // this.toast.show('Se trajo ' + data['length'] + ' solicitudes', 2000, 'green');
        }else {
          this.toast.show('No tiene solicitudes de este tipo!', 1000, 'red');
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
